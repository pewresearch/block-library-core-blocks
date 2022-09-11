import './index.scss';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	CardDivider,
} from '@wordpress/components';

const BLOCKNAME = 'core/columns';
const BLOCKIDENTIFIER = 'prc-block-library/columns';

console.log('Hello World -> src/columns/edit.js');

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

				return (
					<Fragment>
						<BlockEdit {...props} />
						<InspectorControls>
							<PanelBody title="CSS Grid">
								<ToggleControl
									label={__('Enable CSS Grid')}
									checked={useCSSGrid}
									onChange={() => {
										const newClassNames = classes;
										// If useeCSSGrid is true, remove the class
										if (useCSSGrid) {
											const index = newClassNames.indexOf(
												'is-css-grid',
											);
											if (index > -1) {
												newClassNames.splice(index, 1);
											}
										} else {
											newClassNames.push('is-css-grid');
										}
										setAttributes({
											useCSSGrid: !useCSSGrid,
											className: newClassNames.join(' '),
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

