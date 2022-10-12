/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useRef } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { Button, DropZone, PanelBody, PanelRow } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal Dependencies
 */
import handleCSV from './csv-parser';

const BLOCKNAME = 'core/table';
const BLOCKIDENTIFIER = 'prc-block-library/table';

function CSVImportDropZone(props) {
	const { attributes, setAttributes } = props;

	const hiddenFileInput = useRef(null);

	return (
		<InspectorControls>
			<PanelBody title="CSV Import">
				<PanelRow>
					<Button
						isPrimary
						onClick={() => {
							hiddenFileInput.current.click();
						}}
					>
						{__(`Import CSV to Table`, 'prc-block-library')}
					</Button>
					<input
						ref={hiddenFileInput}
						type="file"
						accept="text/csv"
						onChange={(e) =>
							handleCSV(e.target.files, attributes, setAttributes)
						}
						style={{ display: 'none' }}
					/>
					<DropZone
						onFilesDrop={(droppedFiles) =>
							handleCSV(droppedFiles, attributes, setAttributes)
						}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
}

addFilter(
	'editor.BlockEdit',
	BLOCKIDENTIFIER,
	createHigherOrderComponent(
		(BlockEdit) =>
			function TableUtilities(props) {
				const { name } = props;
				if (BLOCKNAME !== name) {
					return <BlockEdit {...props} />;
				}
				return (
					<Fragment>
						<BlockEdit {...props} />
						<CSVImportDropZone {...props} />
					</Fragment>
				);
			},
		'withTableUtilities',
	),
	21,
);
