// @flow

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './style.scss';

class ProgressCircleChart extends Component {
    static propTypes: Object = {
        max: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,

        barColors: PropTypes.array,
        barPer: PropTypes.array,
        barStartFrom: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        firstRenderAnimationDelay: PropTypes.number,
        precision: PropTypes.number,
        radius: PropTypes.number,
        strokeWidth: PropTypes.number,
        theme: PropTypes.object
    };

    static defaultProps: Object = {
        max: 100,
        value: 0,

        barColors: ['#C5454E','#E9A115','#008580'],
        barPer: [],
        barStartFrom: 'top',
        firstRenderAnimationDelay: 500,
        precision: 0,
        radius: 60,
        strokeWidth: 20,
        theme: {}
    };

    state = {
        value: Number,
        currentBarColor: String || null
    };

    constructor (props: Object) {
        super(props);
        this.state = {
            value: 0,
            currentBarColor: this.getCurrentColor(props)
        };
    }

    componentDidMount () {
        // Do animation
        this.isRendered = true;
        setTimeout(() => {
            if (this.isRendered) {
                this.setState({
                    value: parseFloat(this.props.value)
                });
            }
        }, this.props.firstRenderAnimationDelay);
    }

    componentWillUnmount () {
        this.isRendered = false;
    }

    componentWillReceiveProps (nextProps: Object) {
        const newColor = this.getCurrentColor(nextProps);
        this.setState({
            value: parseFloat(nextProps.value),
            currentBarColor: newColor
        });
    }

    getCurrentColor (props: Object) {
        if (props.barColors.length >= 1) {
            const barColorsLength = props.barColors.length;
            const currentValue = props.value / props.max;
            let step = 1;
            while (currentValue > (props.barPer[step] ? props.barPer[step] : step / barColorsLength) && step < barColorsLength) {
                step++;
            }
            return props.barColors[step - 1];
        }

        return null;
    }

    render () {
        const { max, radius, value, strokeWidth, precision, barStartFrom, theme } = this.props;
        const size = radius * 2;
        const barValue = parseFloat(this.state.value) || 0;
        const arcLength = (size - strokeWidth) * Math.PI;

        return (
            <div className={classNames(styles.chart, theme.chart)}
                style={{
                    width: `${size}px`,
                    height: `${size}px`
                }}
            >
                <svg width={size} height={size}
                    viewBox={`0 0 ${size} ${size}`} version="1.0"
                    className={classNames(styles.chartSvg, theme.chartSvg, styles[`barStartFrom-${barStartFrom}`])}
                >
                    <circle cx={size / 2} cy={size / 2}
                        r={size / 2 - strokeWidth / 2}
                        className={classNames(styles.background, theme.background)}
                        style={{ strokeWidth: `${strokeWidth}px` }}
                    />
                    <circle cx={size / 2} cy={size / 2}
                        r={size / 2 - strokeWidth / 2}
                        className={classNames(styles.bar, theme.bar)}
                        style={{
                            stroke: this.state.currentBarColor,
                            strokeWidth: `${strokeWidth}px`,
                            strokeDasharray: `${arcLength}`,
                            strokeDashoffset: arcLength - arcLength * (barValue / max)
                        }}
                    />
                </svg>
                <div className={classNames(styles.progressText, theme.progressText)}>
                    <span className={classNames(styles.progressTextNumber, theme.progressTextNumber)}>
                        {(value / max * 100).toFixed(precision)}
                    </span>
                    <span className={classNames(styles.progressTextPrecent, theme.progressTextPrecent)}>%</span>
                </div>
            </div>
        );
    }

};

export default ProgressCircleChart;
