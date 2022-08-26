/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/** @typedef {import('@wordpress/blocks').WPBlockVariation} WPBlockVariation */

/**
 * Internal Dependencies
 */
import ColumnIcon from '../_shared/layout-grid/icons';

/**
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
const variations = [
	{
		name: 'one-column',
		title: __('One'),
		description: __('One column', 'prc-block-library-primitives'),
		icon: <ColumnIcon columns={1} />,
		isDefault: true,
		innerBlocks: [['prc-block/layout-grid-column']],
		scope: ['block'],
	},
	{
		name: 'two-columns',
		title: __('Two'),
		description: __('Two columns', 'prc-block-library-primitives'),
		icon: <ColumnIcon columns={2} />,
		innerBlocks: [
			['prc-block/layout-grid-column'],
			['prc-block/layout-grid-column'],
		],
		scope: ['block'],
	},
	{
		name: 'three-columns',
		title: __('Three'),
		description: __('Three columns', 'prc-block-library-primitives'),
		icon: <ColumnIcon columns={3} />,
		innerBlocks: [
			['prc-block/layout-grid-column'],
			['prc-block/layout-grid-column'],
			['prc-block/layout-grid-column'],
		],
		scope: ['block'],
	},
	{
		name: 'four-columns',
		title: __('Four'),
		description: __('Four columns', 'prc-block-library-primitives'),
		icon: <ColumnIcon columns={4} />,
		innerBlocks: [
			['prc-block/layout-grid-column'],
			['prc-block/layout-grid-column'],
			['prc-block/layout-grid-column'],
			['prc-block/layout-grid-column'],
		],
		scope: ['block'],
	},
];

export default variations;
