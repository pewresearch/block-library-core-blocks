/**
 * External Dependencies
 */
import { times } from 'lodash';

/**
 * Internal Dependencies
 */
import { getGridWidth, getDefaultSpan } from '../defaults';

function GridOverlay({peviewDeviceType, ref}) {
	return(
		<div className="prc-block-layout-grid__overlay" ref={ ref }>
			<div className="prc-block-layout-grid__overlay__inner">
				{ times( getGridWidth( peviewDeviceType ) ).map(
					( item ) => (
						<div
							className="prc-block-layout-grid__overlay__column"
							key={ item }
						/>
					)
				) }
			</div>
		</div>
	);
}

export default GridOverlay;
