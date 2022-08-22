/**
 * External Dependencies
 */

import classnames from 'classnames';

/**
 * WordPress Dependencies
 */

import { InnerBlocks } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */

import { getAsCSS, removeGridClasses, getGutterClasses } from './css-classname';

const save = ({ attributes, innerBlocks }) => {
	const { className } = attributes;
	const extra = getAsCSS(innerBlocks.length, attributes);
	const classes = classnames(
		removeGridClasses(className),
		extra,
		getGutterClasses(attributes),
	);

	return (
		<div className={classes}>
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
