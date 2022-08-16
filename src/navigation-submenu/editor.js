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

console.log('Hello World -> src/navigation-submenu/index.js');

addFilter(
	'editor.BlockEdit',
	'prc-core-block-library/navigation-submenu',
	createHigherOrderComponent(
		(BlockEdit) =>
			function NavigationSubmenublockAdvancedControls(props) {
				const { name, attributes, setAttributes, clientId } = props;
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
									help="The label to display when the submenu is expanded."
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
