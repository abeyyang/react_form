import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import radioInput from './RadioInput.scss';

class RadioInput extends Component {
    static defaultProps = {
        onChange: (val) => {
            console.log(`RadioInput.onChange[default] : ${val}`);
        }
    };
    static propTypes = {
        defaultValue: PropTypes.string,
        name: PropTypes.string,
        options: PropTypes.array,
        radioInputStyle: PropTypes.object,
        onChange: PropTypes.func
    };

    constructor (props) {
        super(props);

        this.state = {
            checkedValue: props.defaultValue,
            options: props.options
        };

        this.handleRadioItemClick = this.handleRadioItemClick.bind(this);
        this.value = this.value.bind(this);
    }

    handleRadioItemClick (checkedValue, disabled) {
        if (disabled) {
            return;
        }
        return () => {
            this.setState(
                {
                    checkedValue
                },
                () => {
                    this.props.onChange(this.state.checkedValue);
                }
            );
        };
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            checkedValue: nextProps.defaultValue,
            options: nextProps.options
        });
    }

    value () {
        return this.state.checkedValue;
    }

    render () {
        const options = this.state.options;
        const name = this.props.name;
        const checkedValue = this.state.checkedValue;
        const styles = this.props.radioInputStyle || radioInput;

        if (!options) {
            return <div />;
        }
        const items = options.map((item, i) => {
            if (item) {
                const isChecked = item.value === checkedValue;
                let divClassName = isChecked ? classNames(styles.opt, styles.on) : styles.opt;
                const disabled = item.disabled;
                if (disabled) {
                    divClassName = classNames(styles.opt, styles.disabled);
                }

                const inputClassName = isChecked ? classNames(styles['form-list'], styles.checked) : styles['form-list'];
                const checked = isChecked ? 'checked' : '';
                const value = item.value;
                const subLable = item.subLabel
                    ? <div className={styles.subName}>
                        {item.subLabel}
                    </div>
                    : '';
                return (
                    <div
                        className={divClassName}
                        key={i}
                        onClick={this.handleRadioItemClick(value, disabled)}
                    >
                        <input
                            type="radio"
                            name={name}
                            className={inputClassName}
                            checked={checked}
                            disabled={disabled}
                            onChange={() => {}}
                        />
                        <label>
                            {item.label}
                        </label>
                        {subLable}
                    </div>
                );
            }
        });

        return (
            <div>
                {items}
            </div>
        );
    }
}

export default RadioInput;
