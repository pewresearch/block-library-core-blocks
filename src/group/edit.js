/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import {
	__experimentalNumberControl as NumberControl,
	TextControl,
	ToggleControl,
	CardDivider,
} from '@wordpress/components';

const BLOCKNAME = 'core/group';
const BLOCKIDENTIFIER = 'prc-block-library/group';

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

				const { isSticky, responsiveAttachId, responsiveThreshold } =
					attributes;

				return (
					<Fragment>
						<InspectorAdvancedControls>
							<ToggleControl
								label={__('Sticky On Scroll?')}
								checked={isSticky}
								onChange={() => setAttributes({ isSticky: !isSticky })}
								help="Enable sticky on scroll for this group, this will be disabled when you reach the responsive threshold as its intended for desktop only."
							/>
							<TextControl
								label={__('Responsive Attachment ID')}
								value={responsiveAttachId}
								onChange={(val) => setAttributes({ responsiveAttachId: val })}
								placeholder="e.g. #my-id"
							/>
							<NumberControl
								label={__('Responsive Threshold')}
								value={responsiveThreshold}
								onChange={(val) => setAttributes({ responsiveThreshold: val })}
								max={3540}
								min={320}
								isDragEnabled
								help={__(
									`The responsive threshold is the point at which the group block and it's contents will trigger their mobile behavior. The default is 640px (small tablet), but you can change this to any value you like. If you would like to trigger the mobile behavior of a block immediately regardless of device size then use the maximum value of 3540.`,
								)}
							/>
							<CardDivider />
						</InspectorAdvancedControls>
						<BlockEdit {...props} />
					</Fragment>
				);
			},
		'withGroupAdvancedControls',
	),
	21,
);
