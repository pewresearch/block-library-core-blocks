/**
 * WordPress Dependencies
 */
import { select, dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */

function getColumnBlocks( currentBlocks, previous, columns ) {
	if ( columns > previous ) {
		// Add new blocks to the end
		return [
			...currentBlocks,
			...Array.from( { length: columns - previous }, () =>
				createBlock( 'prc-block/layout-grid-column' )
			),
		];
	}

	// A little ugly but... ideally we remove empty blocks first, and then anything with content from the end
	let cleanedBlocks = [ ...currentBlocks ];
	let totalRemoved = 0;

	// Reverse the blocks so we start at the end. This happens in-place
	cleanedBlocks.reverse();

	// Remove empty blocks
	cleanedBlocks = cleanedBlocks.filter( ( block ) => {
		if (
			totalRemoved < previous - columns &&
			block.innerBlocks.length === 0
		) {
			totalRemoved++;
			return false;
		}

		return true;
	} );

	// If we still need to remove blocks then do them from the beginning before flipping it back round
	return cleanedBlocks
		.slice( Math.max( 0, previous - columns - totalRemoved ) )
		.reverse();
}

export function initGrid(initialCount = 2) {
	if ( 2 === initialCount ) {
		return [
			{
				columnStart: 0,
				columnSpan: 6,
			},
			{
				columnStart: 7,
				columnSpan: 6,
			},
		]
	}

	if ( 3 === initialCount ) {
		return [
			{
				columnStart: 0,
				columnSpan: 4,
			},
			{
				columnStart: 5,
				columnSpan: 4,
			},
			{
				columnStart: 9,
				columnSpan: 4,
			},
		]
	}

	if ( 4 === initialCount ) {
		return [
			{
				columnStart: 0,
				columnSpan: 3,
			},
			{
				columnStart: 4,
				columnSpan: 3,
			},
			{
				columnStart: 7,
				columnSpan: 3,
			},
			{
				columnStart: 10,
				columnSpan: 3,
			},
		]
	}

	return [
		null
	];
}

export function updateColumns( attributes, clientId, previous, columns, columnValues ) {
	const { replaceBlock } = dispatch( 'core/block-editor' );
	const { getBlocks } =  select( 'core/block-editor' );
	const innerBlocks = getColumnBlocks(
		getBlocks( clientId ),
		previous,
		columns
	);

	// Go through each innerBlocks object and set attributes equal to initGrid();
	innerBlocks.forEach( ( block, index ) => {
		const grid = initGrid(columns);
		block.attributes = {
			...block.attributes,
			...grid[index],
		};
		console.log(block);
	} );

	console.log("updateColumns...", innerBlocks, attributes, columnValues);

	// Replace the whole block with a new one so that our changes to both the attributes and innerBlocks are atomic
	// This ensures that the undo history has a single entry, preventing traversing to a 'half way' point where innerBlocks are changed
	// but the column attributes arent
	const blockCopy = createBlock(
		'prc-block/layout-grid',
		{
			...attributes,
		},
		innerBlocks
	);

	console.log("... updateColumns...", blockCopy);

	replaceBlock( clientId, blockCopy );
}
