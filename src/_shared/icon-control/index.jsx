/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, CardDivider } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import MediaDropZone from '../media-dropzone';

// @TODO: Slot fill to allow for a icon slug to be rendered by some icon library...

function IconControl({ attributes, setAttributes }) {
	const { iconId, iconSlug } = attributes;
	return (
		<Fragment>
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
					setAttributes({iconId: null});
				}}
				mediaType={['image']}
				mediaSize="thumbnail"
				singularLabel="Icon File"
			/>
			<CardDivider />
		</Fragment>
	);
}

export default IconControl;
