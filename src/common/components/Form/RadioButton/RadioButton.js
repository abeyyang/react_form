import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './style.scss';

class RadioButton extends Component {
    render () {
        const { defaultChecked, name, id, value, theme } = this.props;
        const disabledStyle = this.props.disabled ? styles.radioDisabled : '';
        return (
            <span disabled={this.props.disabled} className={classNames(styles.formFieldInput, theme.formFieldInput, styles.customRadioButton, theme.customRadioButton,disabledStyle)}>
                <input type="radio"
                    disabled={this.props.disabled}
                    name={name}
                    value={value}
                    onClick={(event) => {
                        if (this.props.onChange) {
                            this.props.onChange(event);
                        }
                    }}
                    checked={defaultChecked}
                    ref={(inputComponent) => { this.inputComponent = inputComponent; }}
                    id={id?id:null}
                />
                <span className={classNames(styles.radioChecked, theme.radioChecked)} />
            </span>
        );
    }
}

RadioButton.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    defaultChecked: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    theme: PropTypes.object,
    onChange: PropTypes.func,
    onClick: PropTypes.func
};

RadioButton.defaultProps = {
    theme: {}
};

export default RadioButton;
