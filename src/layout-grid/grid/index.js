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
import {
	getSpanForDevice,
	getOffsetForDevice,
	DEVICE_BREAKPOINTS,
	MAX_COLUMNS,
} from '../constants';
import { GridIcon } from '../icons';

import './css/style.scss';

const { name, attributes } = metadata;

// Add dynamicly generated attributes to support responsive grid options to the block.
function getColumnAttributes(total, breakpoints) {
	const attr = {};

	for (let index = 0; index < total; index++) {
		breakpoints.map((breakpoint) => {
			attr[getSpanForDevice(index, breakpoint)] = {
				type: 'number',
			};
			attr[getOffsetForDevice(index, breakpoint)] = {
				type: 'number',
				default: 0,
			};
		});
	}

	return attr;
}

const settings = {
	icon: GridIcon,
	attributes: {
		...attributes,
		...getColumnAttributes(MAX_COLUMNS, DEVICE_BREAKPOINTS),
	},
	edit,
	save,
	variations,
};

registerBlockType(name, { ...metadata, ...settings });
