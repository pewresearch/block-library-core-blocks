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

const BLOCKNAME = 'core/navigation-link';
const BLOCKIDENTIFIER = 'prc-block-library-core-blocks/navigation-link';

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function NavigationLinkBlockAdvancedControls(props) {
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
		'withNavigationLinkBlockAdvancedControls',
	),
	21,
);
