/**
 * External Dependencies
 */

import classnames from 'classnames';

/**
 * WordPress Dependencies
 */

import { InnerBlocks, getColorClassName } from '@wordpress/block-editor';

const save = ({ attributes = {} }) => {
	const {
		className,
		backgroundColor,
		customBackgroundColor,
		padding,
		verticalAlignment,
	} = attributes;
	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor,
	);
	const classes = classnames(className, {
		[`wp-block-prc-block-library-layout-grid__padding-${padding}`]: true,
		'has-background': backgroundColor || customBackgroundColor,
		[backgroundClass]: backgroundClass,
		[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
	});
	const style = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
	};

	return (
		<div className={classes} style={style}>
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
