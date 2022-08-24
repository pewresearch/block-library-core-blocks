/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { MediaDropZone } from '../_shared';

const BLOCKNAME = 'core/cover';
const BLOCKIDENTIFIER = 'prc-block-library/cover';

console.log('Hello World -> src/cover/index.js');

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function GroupBlockAdvancedControls(props) {
				const { name, attributes, setAttributes } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}
				const { mobileId } = attributes;
				return (
					<Fragment>
						<BlockEdit {...props} />
						<InspectorControls>
							<PanelBody title={__('Media (mobile) settings')}>
								<MediaDropZone
									attachmentId={mobileId}
									label={__('Set Mobile Background')}
									onUpdate={(attachment) => {
										setAttributes({
											mobileId: attachment.id,
											mobileUrl: attachment.source_url,
										});
									}}
								/>
							</PanelBody>
						</InspectorControls>
					</Fragment>
				);
			},
		'withCoverMobileMediaControls',
	),
	21,
);
