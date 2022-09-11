/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	CardDivider,
	Path,
	SVG
} from '@wordpress/components';
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import './index.scss';

const BLOCKNAME = 'core/columns';
const BLOCKIDENTIFIER = 'prc-block-library/columns';

console.log('Hello World -> src/columns/edit.js');

const icon = (
	<SVG
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
	>
		<Path d="M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7.5 11.5H6c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h5.5v10zm4 0H13v-10h2.5v10zm4-.5c0 .3-.2.5-.5.5h-2v-10h2c.3 0 .5.2.5.5v9z" />
	</SVG>
);

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function ColumnsBlockCSSGridControls(props) {
				const { name, attributes, setAttributes } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				const { useCSSGrid, className } = attributes;

				const classes = className ? className.split(' ') : [];

				useEffect(() => {
					if (useCSSGrid) {
						classes.push('is-css-grid');
					} else {
						classes.splice(classes.indexOf('is-css-grid'), 1);
					}
					setAttributes({ className: classes.join(' ') });
				}, [useCSSGrid]);

				return (
					<Fragment>
						<BlockEdit {...props} />
						<InspectorControls>
							<PanelBody title="CSS Grid">
								<ToggleControl
									label={__('Enable CSS Grid')}
									checked={useCSSGrid}
									onChange={() => {
										setAttributes({
											useCSSGrid: !useCSSGrid,
										});
									}}
								/>
							</PanelBody>
						</InspectorControls>
					</Fragment>
				);
			},
		'withColumnsCSSGridControls',
	),
	21,
);

/**
 * Grid Block
 */
registerBlockVariation('core/columns', {
	name: 'css-grid',
	title: __('CSS Grid'),
	icon,
	description: __(
		'A columns block set to use CSS Grid. This block is experimental and may change in the future.',
	),
	attributes: {
		className: 'is-css-grid',
		useCSSGrid: true,
	},
	innerBlocks: [
		[ 'core/column', { gridStart: 0, gridSpan: 3 } ],
		[ 'core/column', { gridStart: 4, gridSpan: 6 } ],
		[ 'core/column', { gridStart: 9, gridSpan: 3 } ],
	],
	isActive: (blockAttributes, variationAttributes) =>
		blockAttributes.useCSSGrid === variationAttributes.useCSSGrid,
});
