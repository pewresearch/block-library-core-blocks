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

function edit({
	className,
	attributes,
	setAttributes,
	isSelected,
	clientId,
	toggleSelection,
}) {
	const { hasChildBlocks, columnInt, gridBlockClientId } = useSelect((select) => {
		const { getBlockOrder, getBlockIndex, getBlockRootClientId } = select('core/block-editor');
		return {
			hasChildBlocks: 0 < getBlockOrder(clientId).length,
			columnInt: getBlockIndex(clientId) + 1,
			gridBlockClientId: getBlockRootClientId(clientId)
		}
	});
	const gridBlockEditor = document.querySelector(`.wp-block-prc-block-layout-grid[data-block="${gridBlockClientId}"] > .block-editor-block-list__layout`);
	const [columnWidth, setColumnWidth] = useState(null);
	const [maxColumnWidth, setMaxColumnWidth] = useState(null);

	useEffect(()=>{
		console.log('gridBlockEditor...', gridBlockEditor);
		if (null !== gridBlockEditor) {
			setColumnWidth((gridBlockEditor.clientWidth / 12) - 24);
			setMaxColumnWidth((gridBlockEditor.clientWidth - ((gridBlockEditor.clientWidth / 12) * 2)));
		}
	}, [gridBlockEditor]);

	const {
		columnStart,
		columnSpan
	} = attributes;

	const blockProps = useBlockProps({
		className: classNames(
			className,
			`column${columnInt}`,
		)
	});

	const innerBlocksProps = useInnerBlocksProps({}, {
		orientation: 'vertical',
		renderAppender: hasChildBlocks
			? undefined
			: () => <InnerBlocks.ButtonBlockAppender />
	});

	return (
		<Fragment>
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
