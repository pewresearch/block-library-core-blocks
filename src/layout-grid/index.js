/**
 * WordPress Dependencies
 */

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import variations from './variations';
import { GridIcon } from './icons';
import './css/editor.scss';

const { name, attributes } = metadata;

const settings = {
	icon: GridIcon,
	edit,
	save,
	variations,
};

registerBlockType(name, { ...metadata, ...settings });
