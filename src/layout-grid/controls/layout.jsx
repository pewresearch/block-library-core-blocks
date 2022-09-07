/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { IconButton, PanelBody, Placeholder } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { updateColumns } from '../higher-order';
import {
	getColumns,
	getSpanForDevice,
	getOffsetForDevice,
	DEVICE_BREAKPOINTS
} from '../constants';
import { getDefaultSpan } from '../defaults';
import ColumnIcon from '../icons';

/*
* Change the layout (number of columns), resetting everything to the default
*/
const onChangeLayout = ( attributes, clientId, previous, columns ) => {
	const columnValues = {};

	for ( let pos = 0; pos < columns; pos++ ) {
		for (
			let device = 0;
			device < DEVICE_BREAKPOINTS.length;
			device++
		) {
			const defaultSpan = getDefaultSpan(
				DEVICE_BREAKPOINTS[ device ],
				columns,
				pos
			);

			columnValues[
				getSpanForDevice( pos, DEVICE_BREAKPOINTS[ device ] )
			] = defaultSpan;
			columnValues[
				getOffsetForDevice( pos, DEVICE_BREAKPOINTS[ device ] )
			] = 0;
		}
	}

	updateColumns( attributes, clientId, previous, columns, columnValues );
};

export function LayoutPanel({attributes, clientId, columns}) {
	console.log('<LayoutPanel />', attributes, clientId, columns);
	return(
		<PanelBody title={ __( 'Layout', 'layout-grid' ) }>
			<div className="prc-block-layout-grid__controls__layout block-editor-block-styles">
				{ getColumns(true).map( ( column ) => (
					<div
						key={ column.value }
						className={ classnames(
							'block-editor-block-styles__item',
							{
								'is-active':
									columns === column.value,
							}
						) }
						onClick={ () => {
							console.log( 'columns', columns, column.value );
							onChangeLayout( attributes, clientId, columns, column.value );
						}}
						onKeyDown={ ( event ) => {
							if (
								ENTER === event.keyCode ||
								SPACE === event.keyCode
							) {
								event.preventDefault();
								console.log( 'columns', column.value );
							}
						} }
						role="button"
						tabIndex="0"
						aria-label={ column.label }
					>
						<div className="block-editor-block-styles__item-preview">
							<ColumnIcon
								columns={ column.value }
							/>
						</div>
						<div className="editor-block-styles__item-label block-editor-block-styles__item-label">
							{ column.label }
						</div>
					</div>
				) ) }
			</div>

			<p className='prc-block-layout-grid__controls__layout__help'>
				{ __(
					'Changing the number of columns will reset your layout and could remove content.',
					'layout-grid'
				) }
			</p>
		</PanelBody>
	);
}

export function LayoutPlaceholder({attributes, clientId}){
	console.log('<LayoutPlaceholder />');
	return(
		<Placeholder
			icon="layout"
			label={ __( 'Choose Layout', 'layout-grid' ) }
			instructions={ __(
				'Select a layout to start with:',
				'layout-grid'
			) }
		>
			<ul className="block-editor-inner-blocks__template-picker-options">
				{ getColumns().map( ( column ) => (
					<li key={ column.value }>
						<IconButton
							isSecondary
							icon={
								<ColumnIcon columns={ column.value } />
							}
							onClick={() => {
								console.log("Placeholder", column.value);
								onChangeLayout( attributes, clientId, 0, column.value );
							}}
							className="block-editor-inner-blocks__template-picker-option"
							label={ column.label }
						/>
					</li>
				) ) }
			</ul>
		</Placeholder>
	);
}
