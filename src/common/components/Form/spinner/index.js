import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './style.scss';

const FPS = 1 / 25;
const RADIUS_PERCENT = 0.8;

const clamp = (min, max, val) => {
    if (min > val) {
        return min;
    }
    if (max < val) {
        return max;
    }
    return val;
};

export default class Spinner extends Component {

    static propTypes = {
        size: PropTypes.number.isRequired,
        spinnerColor: PropTypes.string.isRequired,
        spinnerWidth: PropTypes.number.isRequired
    };

    static defaultProps = {
        size: 60,
        spinnerColor: '#ffffff',
        spinnerWidth: 4
    }

    constructor (props) {
        super(props);

        const { size } = this.props;

        this.start = 0;
        this.end = Math.PI;
        this.flip = 1;
        this.size = size;

        this.state = {
            animate: false,
            running: false
        };

        this.update = this.update.bind(this);
    }

    componentWillMount () {
        this.setState({ animate: true });
        window.requestAnimationFrame(this.update);
    }

    componentWillUnmount () {
        this.setState({ animate: false });
    }

    update () {
        const { animate } = this.state;
        const { spinnerColor, spinnerWidth } = this.props;
        const node = ReactDOM.findDOMNode(this.spinner);
        if (!node || !animate) return;

        if (this.start >= Math.PI || this.start < 0) {
            this.flip *= -1;
        }

        const step = FPS * this.flip;
        this.start = clamp(-Math.PI, Math.PI, this.start + step);
        this.end = clamp(Math.PI, 2 * Math.PI, this.end - step);

        const ctx = node.getContext('2d');
        ctx.clearRect(0, 0, this.size, this.size);
        ctx.beginPath();
        ctx.arc(this.size / 2, this.size / 2, (this.size / 2) * RADIUS_PERCENT, this.start, this.end);
        ctx.strokeStyle = spinnerColor;
        ctx.lineWidth = spinnerWidth;
        ctx.stroke();

        window.requestAnimationFrame(this.update);
    }

    render () {
        return (
            <canvas
                ref={(self) => { this.spinner = self; }}
                className={classNames(styles.spinner)}
                style={{ display: 'block' }}
                width={this.size} height={this.size}
            >
                Your browser does not support HTML5 canvas elements.
            </canvas>
        );
    }

}
