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
	RangeControl,
	CardDivider,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import './index.scss';

const BLOCKNAME = 'core/column';
const BLOCKIDENTIFIER = 'prc-block-library/column';

console.log('Hello World -> src/column/edit.js');
// Need to add context to the block also through javascript..

const MARKS = [
	{
		value: 1,
		label: '1',
	},
	{
		value: 2,
		label: '2',
	},
	{
		value: 3,
		label: '3',
	},
	{
		value: 4,
		label: '4',
	},
	{
		value: 5,
		label: '5',
	},
	{
		value: 6,
		label: '6',
	},
	{
		value: 7,
		label: '7',
	},
	{
		value: 8,
		label: '8',
	},
	{
		value: 9,
		label: '9',
	},
	{
		value: 10,
		label: '10',
	},
	{
		value: 11,
		label: '11',
	},
	{
		value: 12,
		label: '12',
	},
];

addFilter(
	'blocks.registerBlockType',
	BLOCKIDENTIFIER,
	(settings) => {
	if ( BLOCKNAME !== settings.name) {
		return settings;
	}

	console.log("Column Block Settings", settings);

	if ('undefined' !== typeof settings.usesContext) {
		// During the group block's development the alignment options have changed, here we are enforcing all alignments to be available.
		// settings.usesContext = ['core/columns/useCSSGrid'];
	}

	return settings;
});

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function ColumnBlockCSSGridControls(props) {
				console.log("Column Edit", props);
				const { name, attributes, setAttributes, clientId, context } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				const { index, useCSSGrid } = useSelect( select => {
					const { getBlockIndex, getBlockAttributes, getBlockRootClientId } = select( 'core/block-editor' );
					return {
						index: getBlockIndex( clientId ) + 1,
						useCSSGrid: getBlockAttributes( getBlockRootClientId( clientId ) ).useCSSGrid,
					};
				});

				const { gridStart, gridSpan, className } = attributes;

				const classes = className ? className.split(' ') : [];

				const handleGridSpanChange = (newGridSpan) => {
					classes.forEach((item, index) => {
						if (item.includes('grid__span-')) {
							classes.splice(index, 1);
						}
					});

					const newGridSpanClassName = `column${index}-grid__span-${newGridSpan}`;
					if ( ! classes.includes( newGridSpanClassName ) ) {
						classes.push(newGridSpanClassName);
					}

					setAttributes({
						gridSpan: newGridSpan,
						className: classes.join(' ')
					});
				}

				const handleGridStartChange = (newGridStart) => {
					classes.forEach((item, index) => {
						if (item.includes('grid__start-')) {
							classes.splice(index, 1);
						}
					});

					const newGridStartClassName = `column${index}-grid__start-${newGridStart}`;
					if ( ! classes.includes( newGridStartClassName ) ) {
						classes.push(newGridStartClassName);
					}

					setAttributes({
						gridStart: newGridStart,
						className: classes.join(' ')
					});
				}

				return (
					<Fragment>
						{useCSSGrid && (
							<InspectorControls>
								<PanelBody title="Grid">
									<div className="css-grid-column-controls">
										<RangeControl
											label="Start"
											value={ gridStart }
											onChange={ ( newStart ) => {
												handleGridStartChange(newStart);
											} }
											withInputField={false}
											min={ 1 }
											max={ 12 }
											marks={MARKS}
											initialPosition={0}
										/>
										<CardDivider/>
										<RangeControl
											label="Span"
											value={ gridSpan }
											onChange={ ( newSpan ) => {
												handleGridSpanChange(newSpan);
											} }
											withInputField={false}
											min={ 1 }
											max={ 12 }
											marks={MARKS}
										/>
									</div>
								</PanelBody>
							</InspectorControls>
						)}
						<BlockEdit {...props} />
					</Fragment>
				);
			},
		'withColumnCSSGridControls',
	),
	21,
);
