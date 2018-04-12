import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './style.scss';

class Input extends Component {

    constructor (props: Object) {
        super(props);
        (this:any).handleInput = this.handleInput.bind(this);
        (this:any).handleBlur = this.handleBlur.bind(this);
        (this:any).handleChange = this.handleChange.bind(this);
        (this:any).handleClick = this.handleClick.bind(this);
        (this:any).handleFocus = this.handleFocus.bind(this);
        (this:any).handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleBlur (event: Object) {
        const { onBlur } = this.props;
        typeof onBlur === 'function' && onBlur(event);
    }

    handleChange (event: Object) {
        const { onChange } = this.props;
        typeof onChange === 'function' && onChange(event);
    }

    handleClick (event: Object) {
        const { onClick } = this.props;
        typeof onClick === 'function' && onClick(event);
    }

    handleFocus (event: Object) {
        const { onFocus } = this.props;
        typeof onFocus === 'function' && onFocus(event);
    }

    handleKeyDown (event: Object) {
        const { onKeyDown } = this.props;
        typeof onKeyDown === 'function' && onKeyDown(event);
    }

    handleInput (event: Object) {
        const { onInput } = this.props;
        typeof onInput === 'function' && onInput(event);
    }

    render () {
        const { defaultChecked, name, id, value, theme, type, placeholder, htmlAttributes, disabled } = this.props;

        const props = {};

        props.className = classNames(styles.input, theme.input);
        props.value = value;

        if (type) {
            props.type = type;
        }

        if (placeholder && (type !== 'checkbox' || type !== 'radio')) {
            props.placeholder = placeholder;
        }

        if (defaultChecked && (type !== 'checkbox' || type !== 'radio')) {
            props.defaultChecked = defaultChecked;
        }

        return (
            <input ref={(input) => { this.input = input; }} {...props} {...htmlAttributes}
                name={name} id={id}

                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onInput={this.handleInput}
                onKeyDown={this.handleKeyDown}
                disabled={disabled ? "disabled" : ""}
            />
        );
    }
}

Input.propTypes = {
    defaultChecked: PropTypes.bool,
    htmlAttributes: PropTypes.object,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    theme: PropTypes.object,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onInput: PropTypes.func,
    onKeyDown: PropTypes.func
};

Input.defaultProps = {
    htmlAttributes: {},
    disabled: false,
    theme: {}
};

export default Input;
