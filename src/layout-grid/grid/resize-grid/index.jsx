/**
 * External Dependencies
 */

import classnames from 'classnames';

/**
 * WordPress Dependencies
 */

import { Component, createRef, useState, useEffect } from '@wordpress/element';
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
	const [resizingColumn, setResizingColumn] = useState(-1);
	const [xPos, setXPos] = useState(0);
	const [height, setHeight] = useState(0);
	const [direction, setDirection] = useState('right');
	const [top, setTop] = useState(0);

	const classes = classnames(
		className,
		-1 !== resizingColumn ? 'wp-block-jetpack-layout-grid__resizing' : null,
	);

	// const getNearestColumn = (direction, mouse) => {
	// 	const { totalColumns, layoutGrid } = this.props;
	// 	const start = layoutGrid.getStart(this.state.resizingColumn);
	// 	const span = layoutGrid.getSpan(this.state.resizingColumn);
	// 	const nearest = Math.min(
	// 		totalColumns,
	// 		Math.max(
	// 			0,
	// 			findNearest(
	// 				this.containerRef.current,
	// 				this.getMouseX(mouse),
	// 				direction,
	// 				totalColumns,
	// 			),
	// 		),
	// 	);

	// 	if ('left' === direction) {
	// 		if (nearest === start) {
	// 			// No change
	// 			return null;
	// 		}

	// 		// We're changing the start position - adjust the span
	// 		const diff = Math.abs(nearest - start);
	// 		const adjustment = {
	// 			start: nearest,
	// 			span: nearest > start ? span - diff : span + diff,
	// 			direction,
	// 		};

	// 		// Check we don't go beyond the end
	// 		if (adjustment.start >= start + span) {
	// 			return null;
	// 		}

	// 		// Minimum span of 1
	// 		adjustment.span = Math.max(1, adjustment.span);
	// 		return adjustment;
	// 	}

	// 	// We're changing the span
	// 	// New span is from the new position minus the current start
	// 	return {
	// 		span: Math.max(1, nearest - start),
	// 		direction,
	// 	};
	// };

	// const getMouseX = (event) => {
	// 	const { clientX, targetTouches } = event;

	// 	return clientX || (targetTouches && targetTouches[0].clientX);
	// };

	// const getAdjustedOffset = (offset, optionalWidth = 0) => {
	// 	const { width } = this.state;
	// 	const handleWidth = 0 < optionalWidth ? optionalWidth : width;

	// 	return (
	// 		offset -
	// 		this.containerRef.current.getBoundingClientRect().left -
	// 		handleWidth / 2
	// 	);
	// };

	// const getAdjustedTop = (offset) =>
	// 	offset - this.containerRef.current.getBoundingClientRect().top;

	// const getRestrictedOffset = (offset) => {
	// 	const { direction, max, width } = this.state;

	// 	// Ensure we dont go beyond or before the end of the other side of our block
	// 	if ('left' === direction) {
	// 		return Math.min(max - width, offset);
	// 	}

	// 	return Math.max(max + width, offset);
	// };

	// const getChildPosition = (element) => {
	// 	let pos = 0;

	// 	while (null !== element.previousSibling) {
	// 		element = element.previousSibling;
	// 		pos++;
	// 	}

	// 	return pos;
	// };

	// const onMouseDown = (ev) => {
	// 	const { target } = ev;

	// 	// This is a bit of hardcoded DOM searching - we check if the current click is on a resize handle and then find the column associated with that
	// 	// There may be a better way.
	// 	if (
	// 		(0 === ev.button || ev.touches) &&
	// 		(target.dataset.resizeRight || target.dataset.resizeLeft)
	// 	) {
	// 		this.block = target.closest('.wp-block');

	// 		const { height, right, left, top } = this.block.getBoundingClientRect();
	// 		const { width } = target.getBoundingClientRect();
	// 		const pos = this.getChildPosition(this.block);
	// 		const isLeft = target.dataset.resizeLeft;

	// 		this.setState({
	// 			resizingColumn: pos,
	// 			xPos: this.getAdjustedOffset(this.getMouseX(ev), width),
	// 			height,
	// 			width,
	// 			top: this.getAdjustedTop(top),
	// 			direction: isLeft ? 'left' : 'right',
	// 			max: isLeft
	// 				? this.getAdjustedOffset(right, width)
	// 				: this.getAdjustedOffset(left, width),
	// 		});

	// 		if (0 === ev.button) {
	// 			document.addEventListener('mousemove', this.onMouseMove);
	// 			document.addEventListener('mouseup', this.onMouseUp);

	// 			ev.preventDefault();
	// 		} else {
	// 			document.addEventListener('touchmove', this.onMouseMove);
	// 			document.addEventListener('touchend', this.onMouseUp);
	// 		}

	// 		ev.stopPropagation();
	// 	}
	// };

	// const onMouseMove = (ev) => {
	// 	ev.stopPropagation();

	// 	if (ev.touches === undefined) {
	// 		ev.preventDefault();
	// 	}

	// 	const { height } = this.block.getBoundingClientRect();

	// 	this.setState({
	// 		xPos: this.getRestrictedOffset(
	// 			this.getAdjustedOffset(this.getMouseX(ev)),
	// 		),
	// 		height,
	// 	});

	// 	// Finally pass this up if a grid adjustment has been triggered
	// 	const adjustment = this.getNearestColumn(this.state.direction, ev);
	// 	if (adjustment) {
	// 		this.props.onResize(this.state.resizingColumn, adjustment);
	// 	}
	// };

	// const onMouseUp = (ev) => {
	// 	setResizingColumn(-1);

	// 	document.removeEventListener('mousemove', onMouseMove);
	// 	document.removeEventListener('mouseup', onMouseUp);
	// 	document.removeEventListener('touchmove', onMouseMove);
	// 	document.removeEventListener('touchend', onMouseUp);
	// };

	const blockProps = useBlockProps({
		className: classes,
		// onMouseDown,
		// onTouchStart: onMouseDown,
		ref: containerRef,
	});

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
