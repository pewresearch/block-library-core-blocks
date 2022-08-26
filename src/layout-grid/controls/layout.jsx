/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect, useState } from '@wordpress/element';
import { PanelBody, IconButton } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { getColumns } from '../../_shared/layout-grid/constants';
import ColumnIcon from '../../_shared/layout-grid/icons';

export function LayoutPanel({columns}) {
	console.log('<LayoutPanel />', columns);
	return(
		<PanelBody title={ __( 'Layout', 'layout-grid' ) }>
			<div className="prc-block-layout-grid__controls__layout block-editor-block-styles">
				{ getColumns().map( ( column ) => (
					<div
						key={ column.value }
						className={ classnames(
							'block-editor-block-styles__item',
							{
								'is-active':
									columns === column.value,
							}
						) }
						onClick={ () =>
							console.log( 'columns', column.value )
						}
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

export function LayoutPlaceholder(){
	console.log('<LayoutPlaceholder />');
	return(
		<Placeholder
			icon="layout"
			label={ __( 'Choose Layout', 'layout-grid' ) }
			instructions={ __(
				'Select a layout to start with:',
				'layout-grid'
			) }
			className={ classes }
		>
			<ul className="block-editor-inner-blocks__template-picker-options">
				{ getColumns().map( ( column ) => (
					<li key={ column.value }>
						<IconButton
							isSecondary
							icon={
								<ColumnIcon columns={ column.value } />
							}
							onClick={ () =>
								console.log("Placeholder", column.value)
							}
							className="block-editor-inner-blocks__template-picker-option"
							label={ column.label }
						/>
					</li>
				) ) }
			</ul>
		</Placeholder>
	);
}
