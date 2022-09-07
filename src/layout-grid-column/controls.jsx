/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { PanelBody, TextControl, RangeControl, Notice, ToggleControl } from '@wordpress/components';
import {
	InspectorAdvancedControls,
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	JustifyContentControl,
} from '@wordpress/block-editor';

export default function Controls({ attributes, clientId, setAttributes }) {

	const {
		columnStart,
		columnSpan,
	} = attributes;

	return(
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Column Grid Settings')}>
					<TextControl
						label={__('Column Start')}
						value={columnStart}
						onChange={(value) => setAttributes({columnStart: parseInt(value)})}
					/>
					<TextControl
						label={__('Column Span')}
						value={columnSpan}
						onChange={(value) => setAttributes({columnSpan: parseInt(value)})}
					/>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
}
