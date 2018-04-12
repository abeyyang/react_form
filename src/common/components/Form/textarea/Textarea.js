import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './style.scss';

class Textarea extends Component {

    constructor (props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleBlur (event) {
        const { onBlur } = this.props;
        typeof onBlur === 'function' && onBlur(event);
    }

    handleChange (event) {
        const { onChange } = this.props;
        typeof onChange === 'function' && onChange(event);
    }

    handleClick (event) {
        const { onClick } = this.props;
        typeof onClick === 'function' && onClick(event);
    }

    handleFocus (event) {
        const { onFocus } = this.props;
        typeof onFocus === 'function' && onFocus(event);
    }

    handleKeyDown (event) {
        const { onKeyDown } = this.props;
        typeof onKeyDown === 'function' && onKeyDown(event);
    }

    handleInput (event) {
        const { onInput } = this.props;
        typeof onInput === 'function' && onInput(event);
    }

    render () {
        const { name, id, value, theme, placeholder, disabled } = this.props;

        const props = (()=>{
            const result = {};
            for(const key in this.props) {
                if(key !== 'theme') {
                    result[key] = this.props[key];
                }
            }
            return result;
        })();


        return (
            <textarea ref={(textarea) => { this.textarea = textarea; }} {...props}
                className={classNames(styles.textarea, theme.textarea)}
                name={name} disabled={disabled} 
                placeholder="please enter"
                value={this.props.value}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onInput={this.handleInput}
                onKeyDown={this.handleKeyDown}
                id={id?id:null}
            />
        );
    }
}

Textarea.propTypes = {
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
    onKeyDown: PropTypes.func,
    disabled : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ])
};

Textarea.defaultProps = {
    theme: {}
};

export default Textarea;
