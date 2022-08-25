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
import { Fragment, useRef } from '@wordpress/element';
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

	const { hasChildBlocks, columnInt } = useSelect((select) => {
		const { getBlockOrder, getBlockIndex } = select('core/block-editor');
		return {
			hasChildBlocks: 0 < getBlockOrder(clientId).length,
			columnInt: getBlockIndex(clientId) + 1,
		}
	});

	const {
		columnStart,
		columnSpan
	} = attributes;

	console.log("column className", attributes);

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
					// minHeight="50"
					// minWidth="50"
					showHandle={isSelected}
					enable={ {
						top: false,
						right: true,
						bottom: false,
						left: true,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					onResizeStop={ ( event, direction, elt, delta ) => {
						console.log( 'onResizeStop', event, direction, elt, delta );
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						console.log( 'onResizeStart' );
						toggleSelection( false );
					} }
				/>
				<div {...innerBlocksProps} />
			</div>
		</Fragment>
	);
};

export default edit;
