/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useEffect } from '@wordpress/element';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import {
	SelectControl,
	TextControl,
	ToggleControl,
	CardDivider,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { IconLibrary } from '../_shared';

console.log('Hello World -> src/navigation-link/index.js');

addFilter(
	'editor.BlockEdit',
	'prc-core-block-library/navigation-link',
	createHigherOrderComponent(
		(BlockEdit) =>
			function NavigationLinkBlockAdvancedControls(props) {
				const { name, attributes, setAttributes, clientId } = props;
				if ('core/navigation-link' !== name) {
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
		'withNavigationLinkBlockAdvancedControls',
	),
	21,
);
