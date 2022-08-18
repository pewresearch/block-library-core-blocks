/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorAdvancedControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { IconControl } from '../_shared';

console.log('Hello World -> src/home-link/index.js');

const BLOCKNAME = 'core/home-link';
const BLOCKIDENTIFIER = 'prc-core-block-library/home-link';

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function HomeLinkBlockAdvancedControls(props) {
				const { name, attributes, setAttributes } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}

				return (
					<Fragment>
						<InspectorAdvancedControls>
							<IconControl
								attributes={attributes}
								setAttributes={setAttributes}
							/>
						</InspectorAdvancedControls>
						<BlockEdit {...props} />
					</Fragment>
				);
			},
		'withHomeLinkBlockAdvancedControls',
	),
	21,
);
