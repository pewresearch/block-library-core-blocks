/**
 * External Dependencies
 */

import classnames from 'classnames';

/**
 * WordPress Dependencies
 */

import { createRef, useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */

import findNearest from './nearest';
import ResizeHandle from './resize-handle';

/*
 * The ResizeGrid is responsible for providing resizable grid column handles. It maps absolute mouse positions to grid columns, and then
 * validates that with the LayoutGrid.
 *
 * Due to the way the Gutenberg DOM is laid out, the ResizeGrid doesn't provide the resize handles that surround a column. Instead it
 * listens for mousedown events and when one happens it then displays a 'fake' resize handle that can be dragged. As the fake handle is
 * moved, the underlying grid is updated, giving the appearance it is being directly updated.
 */

function ResizeGrid({
	className,
	onResize,
	totalColumns,
	layoutGrid,
	isSelected,
	children,
}) {
	const containerRef = createRef();
	const [blockElm, setBlockElm] = useState(null);
	const [resizingColumn, setResizingColumn] = useState(-1);
	const [max, setMax] = useState(0);
	const [xPos, setXPos] = useState(0);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [direction, setDirection] = useState('right');
	const [top, setTop] = useState(0);

	const classes = classnames(
		className,
		-1 !== resizingColumn ? 'wp-block-jetpack-layout-grid__resizing' : null,
	);

	const getNearestColumn = (direction, mouse) => {
		const start = layoutGrid.getStart(resizingColumn);
		const span = layoutGrid.getSpan(resizingColumn);
		const nearest = Math.min(
			totalColumns,
			Math.max(
				0,
				findNearest(
					containerRef.current,
					getMouseX(mouse),
					direction,
					totalColumns,
				),
			),
		);

		if ('left' === direction) {
			if (nearest === start) {
				// No change
				return null;
			}

			// We're changing the start position - adjust the span
			const diff = Math.abs(nearest - start);
			const adjustment = {
				start: nearest,
				span: nearest > start ? span - diff : span + diff,
				direction,
			};

			// Check we don't go beyond the end
			if (adjustment.start >= start + span) {
				return null;
			}

			// Minimum span of 1
			adjustment.span = Math.max(1, adjustment.span);
			return adjustment;
		}

		// We're changing the span
		// New span is from the new position minus the current start
		return {
			span: Math.max(1, nearest - start),
			direction,
		};
	};

	const getMouseX = (event) => {
		const { clientX, targetTouches } = event;

		return clientX || (targetTouches && targetTouches[0].clientX);
	};

	const getAdjustedOffset = (offset, optionalWidth = 0) => {
		const handleWidth = 0 < optionalWidth ? optionalWidth : width;

		return (
			offset -
			containerRef.current.getBoundingClientRect().left -
			handleWidth / 2
		);
	};

	const getAdjustedTop = (offset) =>
		offset - containerRef.current.getBoundingClientRect().top;

	const getRestrictedOffset = (offset) => {
		// Ensure we dont go beyond or before the end of the other side of our block
		if ('left' === direction) {
			return Math.min(max - width, offset);
		}

		return Math.max(max + width, offset);
	};

	const getChildPosition = (element) => {
		let pos = 0;

		console.log('getChildPosition', element);

		while (null !== element.previousSibling) {
			element = element.previousSibling;
			pos++;
		}

		return pos;
	};

	const onMouseDown = (ev) => {
		const { target } = ev;

		console.log('onMouseDown', target);

		// This is a bit of hardcoded DOM searching - we check if the current click is on a resize handle and then find the column associated with that
		// There may be a better way.
		if (
			(0 === ev.button || ev.touches) &&
			(target.dataset.resizeRight || target.dataset.resizeLeft)
		) {
			const block = target.closest('.wp-block');

			const { height, right, left, top } = block.getBoundingClientRect();
			const { width } = target.getBoundingClientRect();
			const isLeft = target.dataset.resizeLeft;

			setBlockElm(block);

			setResizingColumn(getChildPosition(block));
			setHeight(height);
			setWidth(width);
			setTop(getAdjustedTop(top));
			setDirection(isLeft ? 'left' : 'right');
			setMax(isLeft ? getAdjustedOffset(left, width) : getAdjustedOffset(right, width));
			setXPos(getAdjustedOffset(getMouseX(ev), width));

			if (0 === ev.button) {
				document.addEventListener('mousemove', onMouseMove);
				document.addEventListener('mouseup', onMouseUp);

				ev.preventDefault();
			} else {
				document.addEventListener('touchmove', onMouseMove);
				document.addEventListener('touchend', onMouseUp);
			}

			ev.stopPropagation();
		}
	};

	const onMouseMove = (ev) => {
		ev.stopPropagation();

		if (ev.touches === undefined) {
			ev.preventDefault();
		}

		const { height } = blockElm.getBoundingClientRect();

		setXPos(getRestrictedOffset(getAdjustedOffset(getMouseX(ev))));
		setHeight(height);

		// Finally pass this up if a grid adjustment has been triggered
		const adjustment = getNearestColumn(direction, ev);
		if (adjustment) {
			onResize(resizingColumn, adjustment);
		}
	};

	const onMouseUp = (ev) => {
		setResizingColumn(-1);

		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
		document.removeEventListener('touchmove', onMouseMove);
		document.removeEventListener('touchend', onMouseUp);
	};

	const blockProps = useBlockProps({
		className: classes,
		onMouseDown,
		onTouchStart: onMouseDown,
		ref: containerRef,
	});

	useEffect(()=>{
		console.log("Resizing...", resizingColumn);
	}, [resizingColumn]);

	return (
		<div {...blockProps}>
			{-1 !== resizingColumn && (
				<ResizeHandle
					direction={direction}
					height={height}
					xPos={xPos}
					top={top}
					isSelected={isSelected}
				/>
			)}
			{children}
		</div>
	);
}

export default ResizeGrid;
