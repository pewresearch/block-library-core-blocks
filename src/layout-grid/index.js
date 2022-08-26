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
// import {
// 	getSpanForDevice,
// 	getOffsetForDevice,
// 	DEVICE_BREAKPOINTS,
// 	MAX_COLUMNS,
// } from '../constants';
import { GridIcon } from '../_shared/layout-grid/icons';
import './css/editor.scss';

const { name, attributes } = metadata;

const settings = {
	icon: GridIcon,
	edit,
	save,
	variations,
};

registerBlockType(name, { ...metadata, ...settings });
