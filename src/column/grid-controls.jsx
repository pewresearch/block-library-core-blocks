/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import {
	BaseControl,
	CardDivider,
	PanelBody,
	RangeControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

const MARKS = [
	{
		value: 1,
		label: '1',
	},
	{
		value: 2,
		label: '2',
	},
	{
		value: 3,
		label: '3',
	},
	{
		value: 4,
		label: '4',
	},
	{
		value: 5,
		label: '5',
	},
	{
		value: 6,
		label: '6',
	},
	{
		value: 7,
		label: '7',
	},
	{
		value: 8,
		label: '8',
	},
	{
		value: 9,
		label: '9',
	},
	{
		value: 10,
		label: '10',
	},
	{
		value: 11,
		label: '11',
	},
	{
		value: 12,
		label: '12',
	},
];

export default function GridControls({ attributes, setAttributes, clientId }) {
	const { index } = useSelect( select => {
		const { getBlockIndex, getBlockAttributes, getBlockRootClientId } = select( 'core/block-editor' );
		return {
			index: getBlockIndex( clientId ) + 1,
		};
	});

	const { gridStart, gridSpan, tabletGridSpan, mobileGridSpan, tabletGridStart, mobileGridStart, className } = attributes;

	const classes = className ? className.split(' ') : [];

	const calculateRatio = (start, span) => {
		return (start + span - 1) / 12;
	}

	const handleGridSpanChange = (newGridSpan, device = 'desktop') => {
		classes.forEach((item, index) => {
			if (item.includes('desktop' !== device ? `${device}-grid__span-` : 'grid__span-')) {
				classes.splice(index, 1);
			}
		});

		const newGridSpanClassName = 'desktop' !== device ? `column${index}-${device}-grid__span-${newGridSpan}` : `column${index}-grid__span-${newGridSpan}`;
		if ( ! classes.includes( newGridSpanClassName ) ) {
			classes.push(newGridSpanClassName);
		}

		const obj = {
			className: classes.join(' '),
		}

		if ( 'desktop' === device ) {
			obj.gridSpan = newGridSpan;
		} else if ( 'tablet' === device ) {
			obj.tabletGridSpan = newGridSpan;
		} else if ( 'mobile' === device ) {
			obj.mobileGridSpan = newGridSpan;
		}

		setAttributes(obj);
	}

	const handleGridStartChange = (newGridStart, device = 'desktop') => {
		classes.forEach((item, index) => {
			if (item.includes('desktop' !== device ? `${device}-grid__start-` : 'grid__start-')) {
				classes.splice(index, 1);
			}
		});

		const newGridStartClassName = 'desktop' !== device ? `column${index}-${device}-grid__start-${newGridStart}` : `column${index}-grid__start-${newGridStart}`;
		if ( ! classes.includes( newGridStartClassName ) ) {
			classes.push(newGridStartClassName);
		}

		const obj = {
			className: classes.join(' '),
		}

		if ( 'desktop' === device ) {
			obj.gridStart = newGridStart;
		} else if ( 'tablet' === device ) {
			obj.tabletGridStart = newGridStart;
		} else if ( 'mobile' === device ) {
			obj.mobileGridStart = newGridStart;
		}

		setAttributes(obj);
	}

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Grid Span">
					<div className="css-grid-column-controls">
						<RangeControl
							label="Desktop Span"
							value={ gridSpan }
							onChange={ ( newSpan ) => {
								handleGridSpanChange(newSpan, 'desktop');
							} }
							withInputField={false}
							min={ 1 }
							max={ 12 }
							marks={MARKS}
						/>
						<CardDivider/>
						<RangeControl
							label="Tablet Span"
							value={ tabletGridSpan }
							onChange={ ( newSpan ) => {
								handleGridSpanChange(newSpan, 'tablet');
							} }
							withInputField={false}
							min={ 1 }
							max={ 8 }
							marks={MARKS.filter((item) => item.value <= 8)}
						/>
						<CardDivider/>
						<RangeControl
							label="Mobile Span"
							value={ mobileGridSpan }
							onChange={ ( newSpan ) => {
								handleGridSpanChange(newSpan, 'mobile');
							} }
							withInputField={false}
							min={ 1 }
							max={ 4 }
							marks={MARKS.filter((item) => item.value <= 4)}
						/>
					</div>
				</PanelBody>

				<PanelBody
					title="Grid (Experimental)"
					initialOpen={false}
				>
					<div className="css-grid-column-controls">
						<BaseControl
							help="These controls are experimental and currently a work-in-progress. Use them at your own risk, no support will be provided."
						>
							<RangeControl
								label="Desktop Start"
								value={ gridStart }
								onChange={ ( newStart ) => {
									handleGridStartChange(newStart, 'desktop');
								} }
								withInputField={false}
								min={ 1 }
								max={ 12 }
								marks={MARKS}
								initialPosition={0}
							/>
							<CardDivider/>
							<RangeControl
								label="Tablet Start"
								value={ tabletGridStart }
								onChange={ ( newStart ) => {
									handleGridStartChange(newStart, 'tablet');
								} }
								withInputField={false}
								min={ 1 }
								max={ 8 }
								marks={MARKS.filter((item) => item.value <= 8)}
								initialPosition={0}
							/>
							<CardDivider/>
							<RangeControl
								label="Mobile Start"
								value={ mobileGridStart }
								onChange={ ( newStart ) => {
									handleGridStartChange(newStart, 'mobile');
								} }
								withInputField={false}
								min={ 1 }
								max={ 4 }
								marks={MARKS.filter((item) => item.value <= 4)}
								initialPosition={0}
							/>
						</BaseControl>
					</div>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
};
