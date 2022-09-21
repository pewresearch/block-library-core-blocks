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

				const { useCSSGrid, enableDivider, className } = attributes;

				const classes = className ? className.split(' ') : [];

				return (
					<Fragment>
						<BlockEdit {...props} />
						<InspectorControls>
							<PanelBody title="CSS Grid">
								<ToggleControl
									label={__('Enable CSS Grid')}
									checked={useCSSGrid}
									onChange={val => {
										if (val) {
											if (!classes.includes('is-css-grid')) {
												classes.push('is-css-grid');
											}
										} else {
											classes.splice(classes.indexOf('is-css-grid'), 1);
										}
										setAttributes({
											className: classes.join(' '),
											useCSSGrid: !useCSSGrid,
										});
									}}
									help={__('When this is enabled, columns will be displayed using CSS grid as a result options like "stack on mobile" will be ignored.')}
								/>
								<ToggleControl
									label={__('Enable Divider')}
									disabled={!useCSSGrid}
									checked={enableDivider}
									onChange={val => {
										if (val) {
											if (!classes.includes('has-divider')) {
												classes.push('has-divider');
											}
										} else {
											classes.splice(classes.indexOf('has-divider'), 1);
										}
										setAttributes({
											className: classes.join(' '),
											enableDivider: !enableDivider,
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
	100,
);

/**
 * Grid Block
 */
const gridBlockAttrs = {
	className: 'is-css-grid',
	useCSSGrid: true,
	enableDivider: true,
};
const gridBlockTemplate =  [
	[ 'core/column', { className: 'column1-grid__span-3 column1-tablet-grid__span-2 column1-mobile-grid__span-4', gridSpan: 3, tabletGridSpan: 2, mobileGridSpan: 4, } ],
	[ 'core/column', { className: 'column2-grid__span-6 column2-tablet-grid__span-4 column2-mobile-grid__span-4', gridSpan: 6, tabletGridSpan: 4, mobileGridSpan: 4 } ],
	[ 'core/column', { className: 'column3-grid__span-3 column3-tablet-grid__span-2 column3-mobile-grid__span-4', gridSpan: 3, tabletGridSpan: 2, mobileGridSpan: 4 } ],
];
const gridBlockExample = gridBlockTemplate.map((block) => {
	return {
		name: block[0],
		attributes: {
			...block[1],
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					/* translators: example text. */
					content: __(
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.'
					),
				},
			},
		]
	};
});
registerBlockVariation('core/columns', {
	name: 'css-grid',
	title: __('CSS Grid', 'prc-block-library'),
	icon,
	description: __(
		'A columns block set to use CSS Grid. This block is experimental and may change in the future.',
		'prc-block-library',
	),
	attributes: gridBlockAttrs,
	innerBlocks: [...gridBlockTemplate],
	example: {
		attributes: gridBlockAttrs,
		innerBlocks: gridBlockExample,
		viewportWidth: 1200,
	},
	isActive: (blockAttributes, variationAttributes) =>
		blockAttributes.useCSSGrid === variationAttributes.useCSSGrid,
});
