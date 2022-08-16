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
import { IconLibrary } from '../_shared';

console.log('Hello World -> src/home-link/index.js');

addFilter(
	'editor.BlockEdit',
	'prc-core-block-library/home-link',
	createHigherOrderComponent(
		(BlockEdit) =>
			function HomeLinkBlockAdvancedControls(props) {
				const { name, attributes, setAttributes } = props;
				if ('core/home-link' !== name) {
					return <BlockEdit {...props} />;
				}

				return (
					<Fragment>
						<InspectorAdvancedControls>
							<IconLibrary
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
