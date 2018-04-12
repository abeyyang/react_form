import React, { Component, PropTypes } from 'react';
import classNames from 'classNames';
import styles from './style.scss';

class DropdownItem extends Component {
    constructor (props) {
        super(props);

        this.handleDisplayOptionClicked = this.handleDisplayOptionClicked.bind(this);
    }

    handleDisplayOptionClicked (event) {
        const { value, displayValue, currIndex } = this.props;
        typeof this.props.onClick === 'function' && this.props.onClick(value, displayValue, currIndex);
    }

    render () {
        const { value, displayValue, selected, children, theme, currIndex } = this.props;

        return (
            <li className={classNames(
                    styles.dropdownBoxItem, theme.dropdownBoxItem,
                    selected && styles.selected, selected && theme.selected
                )}
                onClick={this.handleDisplayOptionClicked}
            >
                {children || displayValue || value}
            </li>
        );
    }
};

DropdownItem.propTypes = {
    children: PropTypes.node,
    displayValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    selected: PropTypes.bool,
    theme: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick: PropTypes.func,
    currIndex: PropTypes.number
};

DropdownItem.defaultProps = {
    displayValue: '',
    selected: false,
    value: '',
    theme: {}
};

export default DropdownItem;
