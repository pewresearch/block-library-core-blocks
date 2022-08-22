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
import { GridColumnIcon } from '../icons';

const { name } = metadata;

const settings = {
	icon: GridColumnIcon,
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });
