/* eslint-disable react/jsx-pascal-case */
/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useRef, useEffect, useState } from '@wordpress/element';
import {
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import GridOverlay from './grid-overlay';
import {Controls, LayoutPlaceholder} from './controls';

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

	const blockProps = useBlockProps({
		className: classnames(
			className,
			`is-previewing-device-${previewDeviceType}`,
			// 'wp-block-prc-block-layout-grid__gutter__medium',
		),
	});

	const innerBlocksProps = useInnerBlocksProps({}, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
		template: [
			[ 'prc-block/layout-grid-column', {} ],
		],
		templateLock: 'insert',
	});

	if ( 0 === columns ) {
		return (
			<div {...blockProps}>
				<LayoutPlaceholder {...{attributes, clientId}}/>
			</div>
		);
	}

	return (
		<div {...blockProps}>
			<GridOverlay previewDeviceType={previewDeviceType} ref={overlayRef}/>
			<Controls {...{...attributes, columns, previewDeviceType, clientId}}/>
			<div {...innerBlocksProps} />
		</div>
	);
};

export default edit;
