/**
 * WordPress Dependencies
 */

import { registerBlockType } from '@wordpress/blocks';
import { Path, SVG } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import {
	getSpanForDevice,
	getOffsetForDevice,
	DEVICE_BREAKPOINTS,
	MAX_COLUMNS,
} from '../_shared/layout-grid/constants';

const { name, attributes } = metadata;

// Add dynamicly generated attributes to support responsive grid options to the block.
// function getColumnAttributes(total, breakpoints) {
// 	const attr = {};

// 	for (let index = 0; index < total; index++) {
// 		breakpoints.map((breakpoint) => {
// 			attr[getSpanForDevice(index, breakpoint)] = {
// 				type: 'number',
// 			};
// 		});
// 	}

// 	return attr;
// }

const settings = {
	icon: () => (
		<SVG
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<Path d="M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM5.5 17V8c0-.3.2-.5.5-.5h5.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2v-10h2c.3 0 .5.2.5.5v9z" />
		</SVG>
	),
	// attributes: {
	// 	...attributes,
	// 	...getColumnAttributes(MAX_COLUMNS, DEVICE_BREAKPOINTS),
	// },
	edit,
	save,
};

console.log("Hello World -> src/grid-column/index.js", metadata);

registerBlockType(name, { ...metadata, ...settings });
