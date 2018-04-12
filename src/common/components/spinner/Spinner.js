// @flow

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { NumericInput } from 'wealth/lib/web/components/ui/form';
import SpinnerButton from './SpinnerButton';
import styles from './style.scss';

class Spinner extends Component {
    static propTypes = {
        value: PropTypes.number.isRequired,
        disabled: PropTypes.bool,
        max: PropTypes.number,
        min: PropTypes.number,
        prefix: PropTypes.string,
        step: PropTypes.number,
        suffix: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        value: 1000,
        step: 500,
        min: 0,
        disabled: false,
        theme: {}
    };

    state: {
        value: number
    }

    constructor (props: Object) {
        super(props);

        (this:any).plus = this.plus.bind(this);
        (this:any).minus = this.minus.bind(this);
        (this:any).handleOnInput = this.handleOnInput.bind(this);
        (this:any).handleChange = this.handleChange.bind(this);

        (this:any).state = {
            value: props.value
        };
    }

    fixFloatPrecision (number: number) {
        const precisionDecimal = 12;
        const decimal = 10;
        return parseFloat(number.toPrecision(precisionDecimal), decimal);
    }

    plus () {
        const value = this.fixFloatPrecision(this.state.value + this.props.step);
        this.updateValueState(value);
    }

    minus () {
        const value = this.fixFloatPrecision(this.state.value - this.props.step);
        this.updateValueState(value);
    }

    handleOnInput (event: Object) {
        const value = Number(event.target.value);
        this.handleChange(value);
    }

    handleChange (value: number) {
        this.updateValueState(value);
    }

    updateValueState (value: number) {
        const { min, max, disabled, onChange } = this.props;

        if (!disabled) {
            let newValue = value;

            if (Number.isInteger(min) && value < min) {
                newValue = min;
            } else if (Number.isInteger(max) && value > max) {
                newValue = max;
            }

            this.setState({
                value: newValue
            });

            typeof onChange === 'function' && onChange(newValue);
        }
    }

    render () {
        const { value } = this.state;
        const { prefix, suffix, disabled, theme } = this.props;
        const disabledStyle = disabled ? `${styles.disabledStyle}` : "";
        return (
            <div className={classNames(styles.spinner, theme.spinner, `${disabledStyle}`)}>
                <SpinnerButton
                    theme={theme} icon="minimize"
                    handleClick={this.minus} handleKeyPress={this.minus}
                />
                <NumericInput
                    prefix={prefix} suffix={suffix} value={value} onChange={this.handleChange} onInput={this.handleOnInput} disabled={disabled} theme={theme}
                />
                <SpinnerButton
                    theme={theme} icon="add"
                    handleClick={this.plus} handleKeyPress={this.plus}
                />
            </div>
        );
    }
}

export default Spinner;
