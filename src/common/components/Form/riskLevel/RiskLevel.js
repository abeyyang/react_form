import React, { Component, PropTypes } from 'react';
import styles from './style.scss';
class RiskLevel extends Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.colors = ['#6989ab', '#6989ab', '#72a898', '#78bc51', '#f47c2b'];
    }
    render () {
        const { width, height, color } = this.props;
        const mStyle = {
            width,
            height
        };
        if (color && color.length > 0) {
            const key = 'background';
            mStyle[key] = color;
        } else {
            const tmpColor = this.colors[this.props.level];
            const bkey = 'background';
            if (tmpColor !== undefined && tmpColor !== null && tmpColor.length > 0) {
                mStyle[bkey] = tmpColor;
            } else {
                mStyle[bkey] = ['rgb(', [parseInt(Math.random() * 255, 10), parseInt(Math.random() * 255, 10), parseInt(Math.random() * 255, 10)].join(','), ')'].join('');
            }
        }
        if (height > 0) {
            const lKey = 'lineHeight';
            mStyle[lKey] = [height, 'px'].join('');
        }
        return <span className={styles.riskLevel} style={mStyle}>{this.props.level}</span>;
    }
}
RiskLevel.propTypes = {
    level: PropTypes.number.isRequired,
    color: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number
};
RiskLevel.defaultProps = {
    level: 1,
    width: 30,
    height: 30
};

export default RiskLevel;
