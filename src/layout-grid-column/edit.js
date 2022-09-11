/* eslint-disable react/jsx-pascal-case */
/**
 * External Dependencies
 */
import classnames from 'classnames';
import { dropRight, times } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState, useRef } from '@wordpress/element';
import { PanelBody, RangeControl, ResizableBox, Notice, ToggleControl } from '@wordpress/components';
import {
	InnerBlocks,
	InspectorAdvancedControls,
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	JustifyContentControl,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import classNames from 'classnames';

/**
 * Internal Dependencies
 */
import Controls from './controls';
import { use } from '@wordpress/data';

function edit({
	className,
	attributes,
	setAttributes,
	isSelected,
	clientId,
	toggleSelection,
}) {
	const { hasChildBlocks, columnInt, gridBlockClientId, columns } = useSelect((select) => {
		const { getBlockOrder, getBlockIndex, getBlockRootClientId, getBlockCount } = select('core/block-editor');
		const rootClientId = getBlockRootClientId(clientId);
		return {
			hasChildBlocks: 0 < getBlockOrder(clientId).length,
			columnInt: getBlockIndex(clientId) + 1,
			gridBlockClientId: rootClientId,
			columns: getBlockCount(rootClientId)
		}
	});
	const gridBlockEditor = document.querySelector(`.wp-block-prc-block-layout-grid[data-block="${gridBlockClientId}"] > .block-editor-block-list__layout`);
	const [columnWidth, setColumnWidth] = useState(null);
	const [maxColumnWidth, setMaxColumnWidth] = useState(null);
	const [dragStart, setDragStart] = useState(null);
	const [dragStop, setDragStop] = useState(null);

	useEffect(()=>{
		console.log('gridBlockEditor...', gridBlockEditor);
		if (null !== gridBlockEditor) {
			setColumnWidth((gridBlockEditor.clientWidth / (12/columns)) - 24);
			setMaxColumnWidth((gridBlockEditor.clientWidth - ((gridBlockEditor.clientWidth / 12) * 2)));
		}
	}, [gridBlockEditor]);

	useEffect(() => {
		console.log("Drag Start:", dragStart);
		console.log("Drag Stop:", dragStop);
	}, [dragStart, dragStop]);

	const {
		columnStart,
		columnSpan
	} = attributes;

	const blockProps = useBlockProps({
		className: classNames(
			className,
			`column${columnInt}`,
			`column${columnInt}-grid__start-${columnStart}`,
			`column${columnInt}-grid__span-${columnSpan}`,
		)
	});

	const innerBlocksProps = useInnerBlocksProps({}, {
		orientation: 'vertical',
		templateLock: false,
		renderAppender: hasChildBlocks
			? undefined
			: () => <InnerBlocks.ButtonBlockAppender />
	});

	return (
		<Fragment>
			<Controls {... {attributes, clientId, setAttributes}}/>
			<div {...blockProps}>
				<ResizableBox
					// size={}
					minWidth={0}
					maxWidth={maxColumnWidth}
					showHandle={isSelected}
					enable={ {
						top: false,
						right: true,
						bottom: false,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					onResizeStop={ ( event, direction, elm, delta ) => {
						console.log( 'onResizeStop', event, direction, elm, delta );
						toggleSelection( true );
					} }
					onResizeStart={ (event, direction, elm) => {
						console.log( 'onResizeStart', event, direction, elm );
						toggleSelection( false );
					} }
					grid={[columnWidth, 1]}
					snapGap={columnWidth}
					bounds={gridBlockEditor}
				>
					<div {...innerBlocksProps} />
				</ResizableBox>
			</div>
		</Fragment>
	);
};

export default edit;
