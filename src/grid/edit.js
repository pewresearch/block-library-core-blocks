/* eslint-disable react/jsx-pascal-case */
/**
 * External Dependencies
 */
import classnames from 'classnames';
import { dropRight, times } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useRef, useEffect } from '@wordpress/element';
import {
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
// import {
// 	withUpdateAlignment,
// 	withUpdateColumns,
// 	withSetPreviewDeviceType,
// 	withColumns,
// 	withColumnAttributes,
// 	withPreviewDeviceType,
// } from './higher-order';
import GridOverlay from './grid-overlay';
import LayoutGrid from '../_shared/layout-grid/class';

const ALLOWED_BLOCKS = ['prc-block/layout-grid-column'];

function edit({
	className,
	attributes,
	setAttributes,
	isSelected,
	clientId
}) {

	const overlayRef = useRef();

	const {
		presetLayout,
		gutterSize,
		addGutterEnds,
		enableVerticalDivider,
		verticalAlignment
	} = attributes;

	const { columns, previewDeviceType } = useSelect(select => {
		const { getBlockCount } = select( 'core/block-editor' );
		return {
			columns: getBlockCount( clientId ),
			previewDeviceType: select(
				'core/edit-post'
			)?.__experimentalGetPreviewDeviceType(),
		}
	}, []);

	console.log("className", className);

	const blockProps = useBlockProps({
		className: classnames(
			className,
			// 'wp-block-prc-block-layout-grid__gutter__medium',
		),
	});

	const innerBlocksProps = useInnerBlocksProps({}, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
		template: [
			[ 'prc-block/layout-grid-column', {} ],
		],
	});

	useEffect(()=>{
		console.log("previewDeviceType", previewDeviceType);
		console.log("COLUMNS", columns);
		const grid = new LayoutGrid(
			attributes,
			previewDeviceType,
			columns
		);
		console.log("GRID ", grid);
	}, [previewDeviceType]);

	return (
		<div {...blockProps}>
			<GridOverlay previewDeviceType={previewDeviceType} ref={overlayRef}/>
			<div {...innerBlocksProps} />
		</div>
	);
};

export default edit;
