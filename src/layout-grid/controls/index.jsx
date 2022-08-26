/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { PanelBody, RangeControl, Notice, ToggleControl } from '@wordpress/components';
import {
	InspectorAdvancedControls,
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	JustifyContentControl,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { DevicePreviewToolbar } from './device-preview';
import { LayoutPanel } from './layout';

export default function Controls({ previewDeviceType, columns, clientId }) {
	const [viewPort, setViewPort] = useState( null );
	return(
		<Fragment>
			<InspectorControls>
				<LayoutPanel columns={ columns } />
			</InspectorControls>
			<BlockControls>
				<DevicePreviewToolbar {...{
					previewDeviceType,
					viewPort,
					updateViewport: (s) => setViewPort(s)
				}}/>
			</BlockControls>
		</Fragment>
	);
}
