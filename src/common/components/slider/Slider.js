// @flow

import React, { Component, PropTypes, cloneElement } from 'react';
import classNames from 'classnames';
import DefaultHandle from './Handle';
import styles from './style.scss';

class Slider extends Component {
    static defaultProps = {
        handle: <DefaultHandle />,
        min: 0,
        disabled: false,
        initialValue: 0,
        max: 100,
        theme: {}
    };

    static propTypes = {
        handle: PropTypes.element.isRequired,
        max: PropTypes.number.isRequired,
        min: PropTypes.number.isRequired,
        disabled: PropTypes.bool,
        initialValue: PropTypes.number,
        theme: PropTypes.object,
        value: PropTypes.number,
        onChange: PropTypes.func
    };

    state: {
        value: number
    };

    slider: any;
    handle: any;

    constructor (props: Object) {
        super(props);
        this.state = {
            value: props.initialValue
        };
        (this:any).onMouseMove = this.onMouseMove.bind(this);
        (this:any).onMouseDown = this.onMouseDown.bind(this);
        (this:any).end = this.end.bind(this);

        this.slider = <div />;
        this.handle = <div />;
    }

    componentWillReceiveProps (nextProps: Object) {
        if (!isNaN(nextProps.value)) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    onMouseMove (event: Object) {
        this.updateValue(event);
        this.pauseEvent(event);
    }

    onMouseDown (event: Object) {
        const { disabled } = this.props;

        if (!disabled) {
            this.updateValue(event);

            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.end);
            this.pauseEvent(event);
        }
    }

    end () {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.end);
    }

    updateValue (event: Object) {
        const { onChange } = this.props;
        const newValue = this.getClosestValue(event);

        if (newValue !== this.state.value) {
            this.setState({ value: newValue });
            onChange(newValue);
        }
    }

    pauseEvent (event: Object) {
        event.stopPropagation();
        event.preventDefault();
    }

    getClosestValue (event: Object) {
        const { min, max } = this.props;

        const sliderLength = this.getSliderWidth();
        const ratio = (this.getMousePosition(event) - this.getSliderOffset()) / sliderLength;
        let closestValue = (max - min) * ratio + min;
        closestValue = closestValue > max ? max : closestValue;
        closestValue = closestValue < min ? min : closestValue;

        return parseFloat(closestValue.toFixed(2));
    }

    getSliderOffset () {
        const rect = this.slider.getBoundingClientRect();
        const offset = rect.left;

        return offset;
    }

    getSliderWidth () {
        const rect = this.slider.getBoundingClientRect();
        return rect.width;
    }

    getMousePosition (event: Object) {
        return event.clientX;
    }

    render () {
        const { handle, min, max, theme } = this.props;

        const handler = cloneElement(handle, {
            offset: ((this.state.value - min) / (max - min)) * 100,
            className: classNames(styles.handle, theme.handle),
            ref: (handle) => { this.handle = handle; }
        });

        return (
            <div className={classNames(styles.slider, theme.slider)}
                onMouseDown={this.onMouseDown}
                ref={(slider) => { this.slider = slider; }}
            >
                <div className={classNames(styles.rail, theme.rail)} />
                {handler}
            </div>
        );
    }
}

export default Slider;
