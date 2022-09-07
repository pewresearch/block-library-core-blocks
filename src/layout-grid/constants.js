/**
 * WordPress Dependencies
 */

import { __ } from '@wordpress/i18n';
import { mobile, tablet, desktop } from '@wordpress/icons';

function getSpacingValues() {
	return [
		{ value: 'small', label: __('Small', 'prc-block-library-layout-grid') },
		{ value: 'medium', label: __('Medium', 'prc-block-library-layout-grid') },
		{ value: 'large', label: __('Large', 'prc-block-library-layout-grid') },
		{ value: 'huge', label: __('Huge', 'prc-block-library-layout-grid') },
	];
}

export const getPaddingValues = () =>
	[{ value: 'none', label: __('No padding', 'prc-block-library-layout-grid') }].concat(
		getSpacingValues(),
	);

export const getGutterValues = () =>
	[{ value: 'none', label: __('No gutter', 'prc-block-library-layout-grid') }].concat(
		getSpacingValues(),
	);

export const getColumns = (allowSingleColumn = false) => {
	const toReturn = [
		{
			label: __('2 cols', 'prc-block-library-layout-grid'),
			value: 2,
		},
		{
			label: __('3 cols', 'prc-block-library-layout-grid'),
			value: 3,
		},
		{
			label: __('4 cols', 'prc-block-library-layout-grid'),
			value: 4,
		},
	];
	if ( allowSingleColumn ) {
		toReturn.unshift({
			label: __('1 col', 'prc-block-library-layout-grid'),
			value: 1,
		});
	}
	return toReturn;
};

export const DEVICE_DESKTOP = 'Desktop';
export const DEVICE_TABLET = 'Tablet';
export const DEVICE_MOBILE = 'Mobile';

export const getLayouts = () => [
	{
		value: DEVICE_DESKTOP,
		label: __('Desktop', 'prc-block-library-layout-grid'),
		icon: desktop,
	},
	{
		value: DEVICE_TABLET,
		label: __('Tablet', 'prc-block-library-layout-grid'),
		icon: tablet,
	},
	{
		value: DEVICE_MOBILE,
		label: __('Mobile', 'prc-block-library-layout-grid'),
		icon: mobile,
	},
];

export const MAX_COLUMNS = 4;

export const DEVICE_BREAKPOINTS = [
	DEVICE_DESKTOP,
	DEVICE_TABLET,
	DEVICE_MOBILE,
];

export function getSpanForDevice(column, device) {
	return `column${column + 1}${device}Span`;
}

export function getOffsetForDevice(column, device) {
	return `column${column + 1}${device}Offset`;
}
