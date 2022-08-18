/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import './editor.scss';

/**
 * @NOTE: Modify default settings on core/navigation-submenu block. Sometimes defining attributes via PHP is not enough and this is one of those times.
 * I'm assuming this is because this block is still quite experimental and the API is not fully fleshed out yet, re: Site Editor vs Post Editor.
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
addFilter(
	'blocks.registerBlockType',
	'prc-core-block-library/navigation-submenu',
	(settings, name) => {
		if ('core/navigation-submenu' !== name) {
			return settings;
		}
		const s = settings;
		// if settings object has attributes and attributes has a label property, then add a new property to the label property
		if (settings.attributes && !settings.attributes.subExpandOpenedLabel) {
			s.attributes.subExpandOpenedLabel = {
				type: 'string',
			};
		}
		return {
			...settings,
			...s,
		};
	},
);

addFilter(
	'editor.BlockEdit',
	'prc-core-block-library/navigation-submenu',
	createHigherOrderComponent(
		(BlockEdit) =>
			function NavigationSubmenublockAdvancedControls(props) {
				const { name, attributes, setAttributes } = props;
				if ('core/navigation-submenu' !== name) {
					return <BlockEdit {...props} />;
				}

				const { subExpandOpenedLabel, label, className } = attributes;

				if ('is-style-sub-expand' !== className) {
					return <BlockEdit {...props} />;
				}

				let placeholder =
					'More' === label ? 'Less' : '~ Less or Close or Collapse ~';
				if ('Expand' === label) {
					placeholder = 'Collapse';
				}
				if ('Open' === label) {
					placeholder = 'Close';
				}

				return (
					<Fragment>
						<InspectorControls>
							<PanelBody
								title={__('Sub Expand settings', 'prc-core-block-library')}
							>
								<TextControl
									label={__('Expanded Label', 'prc-core-block-library')}
									help={__(
										'Label for expanded submenu',
										'prc-core-block-library',
									)}
									value={subExpandOpenedLabel}
									onChange={(value) =>
										setAttributes({ subExpandOpenedLabel: value })
									}
									placeholder={placeholder}
								/>
							</PanelBody>
						</InspectorControls>
						<BlockEdit {...props} />
					</Fragment>
				);
			},
		'withNavigationSubmenuBlockAdvancedControls',
	),
	21,
);
