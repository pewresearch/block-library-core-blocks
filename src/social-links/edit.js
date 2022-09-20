/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';


const BLOCKNAME = 'core/social-links';
const BLOCKIDENTIFIER = 'prc-block-library/social-links';

/**
 * Provide centralized info for social links innerblocks.
 */
const SocialLinksControls = createHigherOrderComponent(
	(BlockEdit) =>
		function OverrideEdit(props) {
			const { name, attributes, setAttributes, context } = props;
			if (BLOCKNAME !== name) {
				return <BlockEdit {...props} />;
			}
			const { title, description, url } = attributes;
			return (
				<Fragment>
					<InspectorControls>
						<PanelBody title={__('Social Meta Info', 'prc-block-library')}>
							<TextControl
								label={__('Title', 'prc-block-library')}
								value={title}
								onChange={(value) => setAttributes({ title: value })}
							/>
							<TextControl
								label={__('Description', 'prc-block-library')}
								value={description}
								onChange={(value) => setAttributes({ description: value })}
							/>
							<TextControl
								label={__('URL', 'prc-block-library')}
								help={__(
									'Setting a url here will override any selections on the individual social links.',
									'prc-block-library'
								)}
								value={url}
								onChange={(value) => setAttributes({ url: value })}
							/>
						</PanelBody>
					</InspectorControls>
					<BlockEdit {...props} />
				</Fragment>
			);
		},
	'withSocialLinksExtraControls',
);

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	SocialLinksControls,
	21,
);
