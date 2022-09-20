/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import GridControls from './grid-controls';
import './index.scss';
import { Grid } from 'semantic-ui-react';

const BLOCKNAME = 'core/column';
const BLOCKIDENTIFIER = 'prc-block-library/column';

console.log('Hello World -> src/column/edit.js');

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
				const { name, attributes, setAttributes, clientId } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				const { useCSSGrid } = useSelect( select => {
					const { getBlockAttributes, getBlockRootClientId } = select( 'core/block-editor' );
					return {
						useCSSGrid: getBlockAttributes( getBlockRootClientId( clientId ) ).useCSSGrid,
					};
				});

				return (
					<Fragment>
						{useCSSGrid && (
							<GridControls {...{ attributes, setAttributes, clientId }} />
						)}
						<BlockEdit {...props} />
					</Fragment>
				);
			},
		'withColumnCSSGridControls',
	),
	21,
);
