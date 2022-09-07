/**
 * WordPress Dependencies
 */

import { useEffect, Fragment } from '@wordpress/element';
import { useViewportMatch, useResizeObserver } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	Button,
	ToolbarGroup,
	MenuGroup,
	MenuItemsChoice,
	Dropdown,
} from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */

import { getLayouts } from '../constants';

function isSiteEditor() {
	const siteEditorWrapper = document.querySelector( '.edit-site-visual-editor__editor-canvas' );
	return !! siteEditorWrapper;
}

function getCurrentViewport(isMobile, isTablet) {
	if (isMobile) {
		return 'Mobile';
	}

	if (isTablet) {
		return 'Tablet';
	}

	return 'Desktop';
}

export function DevicePreviewToolbar({previewDeviceType, viewPort, updateViewport}) {
	console.log('<DevicePreviewToolbar />', previewDeviceType, viewPort, isSiteEditor());
	const { __experimentalSetPreviewDeviceType: setPreviewDevice } =
		useDispatch(isSiteEditor() ? 'core/edit-site' : 'core/edit-post');

	const [resizeListener, sizes] = useResizeObserver();
	const isTablet = useViewportMatch('medium', '<');
	const isMobile = useViewportMatch('small', '<');

	useEffect(() => {
		const newPort = getCurrentViewport(isMobile, isTablet);

		if (newPort !== viewPort) {
			updateViewport(newPort);
		}
	}, [sizes]);

	return (
		<Fragment>
			{resizeListener}

			{!isMobile && (
				<BlockControls>
					<Dropdown
						renderToggle={({ isOpen, onToggle }) => (
							<ToolbarGroup>
								<Button
									aria-expanded={isOpen}
									onClick={onToggle}
									icon={
										getLayouts().find(
											(layout) => layout.value === previewDeviceType,
										).icon
									}
								/>
							</ToolbarGroup>
						)}
						renderContent={() => (
							<MenuGroup>
								<MenuItemsChoice
									value={previewDeviceType}
									onSelect={(mode) => setPreviewDevice(mode)}
									choices={getLayouts()}
								/>
							</MenuGroup>
						)}
					/>
				</BlockControls>
			)}
		</Fragment>
	);
}
