/**
 * WordPress Dependencies
 */
import { withDispatch } from '@wordpress/data';

function withUpdateAlignment() {
	return withDispatch((dispatch, ownProps, registry) => ({
		updateAlignment(verticalAlignment) {
			const { clientId, setAttributes } = ownProps;
			const { updateBlockAttributes } = dispatch('core/block-editor');
			const { getBlockRootClientId } = registry.select('core/block-editor');

			// Update own alignment.
			setAttributes({ verticalAlignment });

			// Reset Parent Columns Block
			const rootClientId = getBlockRootClientId(clientId);
			updateBlockAttributes(rootClientId, {
				verticalAlignment: null,
			});
		},
	}));
}

export default withUpdateAlignment;
