/**
 * WordPress Dependencies
 */
import { withSelect } from '@wordpress/data';

function withHasChildBlocks() {
	return withSelect((select, ownProps) => {
		const { clientId } = ownProps;
		const { getBlockOrder } = select('core/block-editor');

		return {
			hasChildBlocks: 0 < getBlockOrder(clientId).length,
		};
	});
}

export default withHasChildBlocks;
