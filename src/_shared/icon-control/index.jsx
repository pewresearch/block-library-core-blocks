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

const { prcCBLIconLibrary } = window;

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
					const tmp = { ...attributes };
					delete tmp.iconId;
					setAttributes({ ...tmp });
				}}
				mediaType={['image']}
				mediaSize="thumbnail"
				singularLabel="Icon File"
			/>
			{undefined !== prcCBLIconLibrary && (
				<Fragment>
					<CardDivider />
					<SelectControl
						label="Icon Slug"
						help="Select an icon from the list above."
						value={iconSlug}
						options={prcCBLIconLibrary}
						onChange={(value) => {
							setAttributes({ iconSlug: value });
						}}
					/>
				</Fragment>
			)}
		</Fragment>
	);
}

export default IconControl;
