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
import { MediaDropZone } from '../_shared';

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

				const { iconId, iconSlug } = attributes;

				const { index, hasChildBlocks, otherNavigationBlocks, rootClientId } =
					useSelect(
						(select) => {
							const {
								getBlocks,
								getBlockIndex,
								getBlockOrder,
								getBlockRootClientId,
								getBlockAttributes,
							} = select('core/block-editor');

							const rootBlockClientId = getBlockRootClientId(clientId);
							// Get attributes from 'core/columns' parent block.
							const rootAttributes = getBlockAttributes(rootBlockClientId);

							const toReturn = {
								index: getBlockIndex(clientId, rootBlockClientId),
								hasChildBlocks: 0 < getBlockOrder(clientId).length,
								otherNavigationBlocks: getBlocks(rootBlockClientId),
								rootClientId: rootBlockClientId,
								rootAttributes,
							};
							console.log('core/navigation-link->advanced', toReturn);
							return toReturn;
						},
						[clientId],
					);

				return (
					<Fragment>
						<BlockEdit {...props} />
						<InspectorAdvancedControls>
							<p>Icon will display on frontend</p>
							<MediaDropZone
								attachmentId={iconId}
								onUpdate={(attachment) => {
									console.warn(
										'Media DropZone Attachment, use onUpdate prop when using <MediaDropZone/>: ',
										attachment,
									);
									setAttributes({ iconId: attachment.id });
								}}
								onClear={() => {
									const tmp = { ...attributes };
									delete tmp.iconId;
									setAttributes({ ...tmp });
								}}
								mediaType={['image']}
								mediaSize="thumbnail"
								singularLabel="Icon File"
							/>
							<CardDivider />
							<SelectControl
								label="Icon Slug"
								help="Select an icon from the list below."
								value={iconSlug}
								options={[
									{ label: 'None', value: '' },
									{ label: 'Home', value: 'home' },
									{ label: 'Menu', value: 'menu' },
									{ label: 'Filter Needed Here', value: 'filter' },
								]}
								onChange={(value) => {
									setAttributes({ iconSlug: value });
								}}
							/>
						</InspectorAdvancedControls>
					</Fragment>
				);
			},
		'withNavigationLinkBlockAdvancedControls',
	),
	21,
);
