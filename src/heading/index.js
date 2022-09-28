/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { registerBlockVariation } from '@wordpress/blocks';
import {
	BlockControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import {
	TextControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';

const BLOCKNAME = 'core/heading';
const BLOCKIDENTIFIER = 'prc-core-block-library/heading';

// Add toolbar to core/heading block with toggle for isChapter attribute.
const HeadingBlockFilter = createHigherOrderComponent(
	(BlockEdit) =>
		function (props) {
			const { name, attributes, setAttributes } = props;
			if (BLOCKNAME !== name) {
				return <BlockEdit {...props} />;
			}
			const { isChapter, altTocText, content } = attributes;
			return (
				<Fragment>
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								icon="book-alt"
								label={isChapter ? 'Remove Chapter' : 'Make Chapter'}
								isActive={isChapter}
								onClick={() => {
									const attrs = {
										isChapter: !isChapter
									};
									setAttributes({ ...attrs });
								}}
							/>
						</ToolbarGroup>
					</BlockControls>
					<InspectorAdvancedControls>
						{isChapter && (
							<TextControl
								label={__('Alternate TOC Text', 'prc-block-library')}
								value={altTocText}
								placeholder={content}
								onChange={(value) => setAttributes({ altTocText: value })}
							/>
						)}
					</InspectorAdvancedControls>
					<BlockEdit {...props} />
				</Fragment>
			);
		},
	'withChapterControls',
);
addFilter('editor.BlockEdit', BLOCKIDENTIFIER, HeadingBlockFilter, 21);

/**
 * Modify default settings on core/heading block. Change the default heading level to 4 and add isChapter attribute to replace prc-block/chapter at a later date.
 *
 * @param {*} settings
 * @param {*} name
 * @returns
 */
function modifyDefaultSettings(settings, name) {
	if (BLOCKNAME !== name) {
		return settings;
	}
	settings.attributes.isChapter = {
		type: 'boolean',
		default: false,
	};
	return settings;
}
addFilter('blocks.registerBlockType', BLOCKIDENTIFIER, modifyDefaultSettings);

registerBlockVariation(BLOCKNAME, {
	name: 'chapter',
	title: __('Chapter'),
	description: __('A chapter heading.'),
	icon: 'editor-ol',
	attributes: {
		isChapter: true,
		level: 3,
	},
});
