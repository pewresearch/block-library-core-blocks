/**
 * Internal Dependencies
 */

import { DEVICE_MOBILE, DEVICE_TABLET } from './constants';

export const getGridWidth = (device) => {
	if (device === DEVICE_TABLET) {
		return 8;
	}
	if (device === DEVICE_MOBILE) {
		return 4;
	}

	return 12;
};

export const getGridRows = (device) => {
	if (device === DEVICE_TABLET) {
		return 2;
	}
	if (device === DEVICE_MOBILE) {
		return 4;
	}

	return 1;
};

export const getGridMax = (device, columns) => {
	if (device === DEVICE_TABLET && 2 < columns) {
		// 2x2 grid
		return getGridWidth(device) * 2;
	}

	if (device === DEVICE_MOBILE) {
		return getGridWidth(device) * columns;
	}

	return getGridWidth(device);
};

// Default spans to fill the device
// 1 column: desktop=1x12x1 tablet=1x8x1 mobile=1x4x1
// 2 column: desktop=2x6x1 tablet=2x4x1 mobile=1x4x2
// 3 column: desktop=3x4x1 tablet=2x4x1 + 1x8x1 mobile=1x4x3
// 4 column: desktop=4x3x1 tablet=2x4x2 mobile=1x4x4
export function getDefaultSpan(device, columns, column) {
	if (device === DEVICE_TABLET) {
		if (3 === columns && 2 === column) {
			return getGridWidth(device);
		}
		if (1 < columns) {
			return getGridWidth(device) / 2;
		}

		return getGridWidth(device);
	}

	if (device === DEVICE_MOBILE) {
		return getGridWidth(device);
	}

	return getGridWidth(device) / columns;
}
