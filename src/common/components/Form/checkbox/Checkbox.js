import React, { Component, PropTypes } from 'react';
import FontIcon from 'wealth/lib/web/components/ui/FontIcon';
import classNames from 'classnames';
import styles from './style.scss';

class Checkbox extends Component {

    constructor (props) {
        super(props);
        let defaultValue = null;
        if (props.value !== undefined && props.value !== null && !isNaN(props.value)) {
            defaultValue = parseInt(props.value, 10) === 1;
        } else {
            defaultValue = null;
        }
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isChecked: defaultValue !== null ? defaultValue : props.isChecked
        };
    }

    componentDidMount () {
        this.state.isChecked && this.inputComponent.setAttribute('checked', true);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isChecked !== this.props.isChecked) {
            this.inputComponent.setAttribute('checked', nextProps.isChecked);
            this.setState({
                isChecked: nextProps.isChecked
            });
        }
    }
    handleClick (event) {
        const index = this.props.index;
        const isChecked = !this.state.isChecked;
        const { onChange } = this.props;
        this.inputComponent.setAttribute('checked', isChecked);
        this.setState({
            isChecked
        });
        typeof onChange === 'function' && onChange(event, isChecked, index);
    }

    render () {

        const { name, id, checkedIcon, uncheckedIcon, theme } = this.props;
        const isChecked = this.state.isChecked;
        const icon = isChecked ? checkedIcon : uncheckedIcon;
        return (
            <span disabled={this.props.disabled} className={classNames(styles.formFieldInput, theme.formFieldInput, styles.customCheckbox, theme.customCheckbox)}>
                <input type="checkbox"
                    name={name}
                    id={id?id:null}
                    onClick={this.handleClick}
                    disabled={this.props.disabled}
                    ref={(self) => {
                        this.inputComponent = self;
                    }}
                />
                <FontIcon icon={icon} theme={theme} />
            </span>
        );
    }
}

Checkbox.propTypes = {
    checkedIcon: PropTypes.string,
    id: PropTypes.string,
    index: PropTypes.number,
    isChecked: PropTypes.bool,
    name: PropTypes.string,
    theme: PropTypes.object,
    uncheckedIcon: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChange: PropTypes.func,
    disabled: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ])
};

Checkbox.defaultProps = {
    checkedIcon: 'agree',
    theme: {},
    uncheckedIcon: '',
    isChecked: false,
    value: null,
    index: 0
};

export default Checkbox;
