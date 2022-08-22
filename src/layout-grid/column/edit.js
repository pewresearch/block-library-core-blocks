/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * External Dependencies
 */

import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	withColors,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useState, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { getPaddingValues } from '../constants';
import withUpdateAlignment from './hooks/with-update-alignment';
import withHasChildBlocks from './hooks/with-has-child-blocks';

function Edit({
	className,
	hasChildBlocks,
	backgroundColor,
	setBackgroundColor,
	attributes,
	setAttributes,
	updateAlignment,
}) {
	const { padding, verticalAlignment } = attributes;
	const [direction, setDirection] = useState(null);

	const classes = classnames(className, backgroundColor.class, {
		[`wp-block-jetpack-layout-grid__padding-${padding}`]: true,
		'has-background': backgroundColor.color,
		'components-resizable-box__container': true,
		[backgroundColor.class]: backgroundColor.class,
		'wp-blocks-jetpack-layout-grid__showleft': 'right' === direction,
		'wp-blocks-jetpack-layout-grid__showright': 'left' === direction,
		[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
	});

	const style = {
		backgroundColor: backgroundColor.color,
	};

	const blockProps = useBlockProps({
		className: classes,
		style,
	});

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			templateLock: false,
			renderAppender: hasChildBlocks
				? undefined
				: () => <InnerBlocks.ButtonBlockAppender />,
		},
	);

	const onLeftOut = () => {
		setDirection(null);
		document.removeEventListener('mouseup', onLeftOut);
	};

	const onRightOut = () => {
		setDirection(null);
		document.removeEventListener('mouseup', onRightOut);
	};

	const onLeftIn = () => {
		setDirection('left');
		document.addEventListener('mouseup', onLeftOut);
	};

	const onRightIn = () => {
		setDirection('right');
		document.addEventListener('mouseup', onRightOut);
	};

	// Note we wrap the InnerBlock with 'fake' resize handles. These are here so they always match the current column dimensions. Functionally
	// they do nothing other than disappear when the mouse button is pressed. The real resizing happens in the ResizeGrid component.
	// We identify the left and right handles by data-resize-left and data-resize-right
	return (
		<Fragment>
			<InspectorControls>
				<PanelColorSettings
					title={__('Column Color', 'layout-grid')}
					initialOpen
					colorSettings={[
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __('Background', 'layout-grid'),
						},
					]}
				/>

				<PanelBody title={__('Column Padding', 'layout-grid')}>
					<p>{__('Choose padding for this column:', 'layout-grid')}</p>
					<SelectControl
						value={padding}
						onChange={(newValue) => setAttributes({ padding: newValue })}
						options={getPaddingValues()}
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={updateAlignment}
					value={verticalAlignment}
				/>
			</BlockControls>

			<div {...blockProps}>
				<span className="wp-blocks-jetpack-layout-grid__resize-handles">
					<div
						className="components-resizable-box__handle components-resizable-box__side-handle components-resizable-box__handle-right"
						onMouseDown={onRightIn}
						data-resize-right
					/>
					<div
						className="components-resizable-box__handle components-resizable-box__side-handle components-resizable-box__handle-left"
						onMouseDown={onLeftIn}
						data-resize-left
					/>
				</span>

				<div {...innerBlocksProps} />
			</div>
		</Fragment>
	);
}

export default compose(
	withColors('backgroundColor'),
	withHasChildBlocks(),
	withUpdateAlignment(),
)(Edit);
