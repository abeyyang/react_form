import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import styles from './SpinnerInput.scss';
import {
    toDisplayModeNumberStyle,
    toEditModeNumberStyle,
    subtract,
    add,
    eq
} from './numberUtils';

const toClzNames = (classNamesInStr = '') => {
    const classNameArr = classNamesInStr
        .split(' ')
        .filter((item) => !!item)
        .map((item) => styles[item]);
    return classNames(...classNameArr);
};

export default class SpinnerInput extends Component {
    static defaultProps = {
        increment: 1,
        minVal: 0,
        maxVal: Number.MAX_VALUE,
        decimals: 3,
        currency: '',
        currencyLeft: false,
        currencyRight: false,
        onChange: (val) => {
            console.log(`SpinnerInput.onChange[default] : ${val}`);
        },
        maxIntegerLength: 14
    };

    static propTypes = {
        currency: PropTypes.string,
        currencyLeft: PropTypes.bool,
        currencyRight: PropTypes.bool,
        decimals: PropTypes.number,
        increment: PropTypes.number,
        maxIntegerLength: PropTypes.number,
        maxVal: PropTypes.number,
        minVal: PropTypes.number,
        value: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor (props) {
        super(props);
        console.log(`SpinnerInput.props.value-----${props.value}`);
        this.state = Object.assign({}, this.generateNewState(props.value));
        this.minus = this.minus.bind(this);
        this.plus = this.plus.bind(this);
        this.value = this.value.bind(this);
        this.adjustMinusClassName = this.adjustMinusClassName.bind(this);
        this.handlePrecision = this.handlePrecision.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.generateNewState = this.generateNewState.bind(this);
        this.errorInputStatus = this.errorInputStatus.bind(this);
        this.normalInputStatus = this.normalInputStatus.bind(this);
        this.minusBtnRef = null;
        this.plusBtnRef = null;
        this.inputBoxRef = null;
    }

    handlePrecision (num) {
        return _.ceil(num, this.props.decimals);
    }

    errorInputStatus () {
        this.inputBoxRef.className = toClzNames('num fl error');
    }

    normalInputStatus () {
        this.inputBoxRef.className = toClzNames('num fl');
    }

    minus () {
        const currentValue = this.value();
        const newValue = currentValue <= this.props.increment
            ? currentValue
            : this.handlePrecision(
                  subtract(currentValue, this.props.increment)
              );
        this.handleInputValueChange(newValue, (newState) => {
            this.inputRef.value = newState.displayValue;
        });
    }

    plus () {
        const newValue = this.handlePrecision(
            add(this.value(), this.props.increment)
        );
        this.handleInputValueChange(newValue, (newState) => {
            this.inputRef.value = newState.displayValue;
        });
    }

    /**
   *
   *
   * @param {number|string} newValue
   * @returns
   *
   * @memberOf SpinnerInput
   */
    generateNewState (newValue) {
        const newNumberValueInStr = toEditModeNumberStyle(newValue);
        return {
            value: newNumberValueInStr,
            displayValue: toDisplayModeNumberStyle(
                newNumberValueInStr,
                this.props.decimals
            )
        };
    }

    value () {
        return this.inputRef.value === '' ? _.toNumber(0) : _.toNumber(this.state.value);
    }

    componentWillReceiveProps (nextProps) {
        console.log('SpinnerInput.componentWillReceiveProps!');
        console.log(`componentWillReceiveProps - ${nextProps.value}`);
        this.setState(this.generateNewState(nextProps.value));
    }

    componentDidUpdate (prevProps, prevState) {
        console.log('SpinnerInput.componentDidUpdate!');
        this.currentInputValue = this.state.value;
        this.inputRef.value = this.state.displayValue;
    }

    componentDidMount () {
        console.log('SpinnerInput.componentDidMount!');
        if (this.inputRef.value === '') {
            this.inputRef.focus();
        }
        this.adjustMinusClassName();
    }

    componentWillUnmount () {
        console.log('SpinnerInput.componentWillUnmount!!!!!!!!!!!');
    }

    adjustMinusClassName () {
        const disableBtn = toClzNames('disableBtn');
        if (this.state.value > this.props.increment) {
            this.minusBtnRef.classList.remove(disableBtn);
        } else {
            this.minusBtnRef.classList.add(disableBtn);
        }
    }

    /**
   * https://facebook.github.io/react/docs/events.html
   * http://stackoverflow.com/questions/4843472/javascript-listener-keypress-doesnt-detect-backspace
   * KeyPress event is invoked only for character (printable) keys, KeyDown event is raised for
   * all including nonprintable such as Control, Shift, Alt, BackSpace, etc.
   *
   * @param {any} e
   * @returns
   *
   * @memberOf SpinnerInput
   */
    handleKeyPress (evt) {
        const key = evt.key;
        const value = evt.target.value;

        console.log(`SpinnerInput.handleKeyPress(e.target.value) : ${value}`);

        // it is not allowed to all others except number or dot sign
        if (!/^\d|\.$/.test(key)) {
            evt.preventDefault();
        }

        // for integer(decimals is 0 ), it is not allowed to input . dot sign at all
        if (this.props.decimals === 0 && key === '.') {
            evt.preventDefault();
            return;
        }

        // if . dot sign exists already, it is not allowed to input more . dot sign
        if (this.props.decimals > 0 && /\./.test(value) && key === '.') {
            evt.preventDefault();
        }
    }

    onChange (evt) {
        console.log(
            `SpinnerInput.onChange(evt.target.value) : ${evt.target.value}`
        );
        const currentInputValue = this.currentInputValue || '';
        const nextInputValue = evt.target.value;
        const maxIntegerLength = this.props.maxIntegerLength || 100;
        const pattenString2 = `^\\d{0,${maxIntegerLength}}(\\.\\d{0,${this.props.decimals}})?$`;
        const regExp2 = new RegExp(pattenString2);
        // Check the maxIntegerLength and decimals at the same time.
        if (regExp2.test(currentInputValue) && !regExp2.test(nextInputValue)) {
            evt.preventDefault();
            this.handleInputValueChange(currentInputValue);
            return;
        }
        this.handleInputValueChange(nextInputValue);
    }

    handleBlur () {
        this.inputRef.value = this.state.displayValue;
        this.isFocusNow = false;
    }

    handleFocus () {
        this.inputRef.value = this.state.value;
        this.isFocusNow = true;
    }

    handleInputValueChange (newVal, callback) {
        let newValue = newVal;
        if (newValue !== '' && newValue > this.props.maxVal) {
            newValue = this.props.maxVal.toString();
        }

        const decimalPart = this.inputRef.value.split('.')[1] || '';
        if (
            !eq(newValue, this.inputRef.value) ||
            decimalPart.length > this.props.decimals
        ) {
            this.inputRef.value = newValue;
        }
        this.setState(this.generateNewState(newValue), () => {
            const value = this.state.value;
            this.currentInputValue = value;
            !!callback && callback(this.state);
            this.adjustMinusClassName();
            this.props.onChange((value && value.toString()) || null);
        });
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log('SpinnerInput.shouldComponentUpdate!');
        const isRequiredToRerender = !eq(nextState.value, this.inputRef.value);
        console.log(
            `SpinnerInput.shouldComponentUpdate() isRequiredToRerender = ${isRequiredToRerender}`
        );
        return isRequiredToRerender;
    }

    renderPlusBtn () {
        const plusBtnProps = {
            onClick: this.plus,
            className: toClzNames('plus fl btnStyle'),
            ref: (ref) => {
                this.plusBtnRef = ref;
            }
        };
        return <span  {...plusBtnProps}> + </span>;
    }

    renderMinusBtn () {
        const minusBtnProps = {
            onClick: this.minus,
            className: toClzNames('less fl btnStyle'),
            ref: (ref) => {
                this.minusBtnRef = ref;
            }
        };
        return <span  {...minusBtnProps}> - </span>;
    }

    renderPrefixCurrency (props) {
        const { currencyLeft, currency } = this.props;
        const firstCurrnyClassName = (currencyLeft && 'fl') || 'fl hidden';
        return (
            <span className={toClzNames(firstCurrnyClassName)}>
                {currency}
            </span>
        );
    }

    renderSuffixeCurrency (props) {
        const { currencyRight, currency } = this.props;
        const secondCurrnyClassName = (currencyRight && 'fr') || 'fr hidden';
        return (
            <span className={toClzNames(secondCurrnyClassName)}>
                {currency}
            </span>
        );
    }

    render () {
        console.log('SpinnerInput.render!');
        const { value, displayValue } = this.state;
        const valueToDisplay = (this.isFocusNow && value) || displayValue;
        const takeInputBoxRef = (ref) => {
            this.inputBoxRef = ref;
        };
        const inputProps = {
            onKeyPress: this.handleKeyPress,
            onChange: this.onChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            className: toClzNames('amount'),
            defaultValue: valueToDisplay,
            ref: (ref) => {
                this.inputRef = ref;
            }
        };
        return (
            <div className={toClzNames('timetable')}>
                {this.renderMinusBtn()}
                <div className={toClzNames('num fl')} ref={takeInputBoxRef}>
                    {this.renderPrefixCurrency()}
                    <input type="text" name="amount" {...inputProps} />
                    {this.renderSuffixeCurrency()}
                </div>
                {this.renderPlusBtn()}
                <div className={toClzNames('clear')} />
            </div>
        );
    }
}
