// @flow

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';

const KEYCODE_ENTER = 13;
const KEYCODE_SPACE = 32;

class SpinnerButton extends Component {
    static propTypes = {
        handleClick: PropTypes.func,
        icon: PropTypes.string,
        theme: PropTypes.object
    };

    static defaultProps = {
        theme: {}
    };

    constructor (props: Object) {
        super(props);

        (this:any).handleClick = this.handleClick.bind(this);
        (this:any).handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleClick () {
        typeof this.props.handleClick === 'function' && this.props.handleClick();
    }

    handleKeyPress (event: Object) {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KEYCODE_SPACE || keyCode === KEYCODE_ENTER) {
            event.preventDefault();
            typeof this.props.handleKeyPress === 'function' && this.props.handleKeyPress();
        }
    }

    render () {
        const { icon, theme } = this.props;

        return (
            <a
                role="button" tabIndex="0"
                className={classNames(styles.spinnerButton, theme.spinnerButton)}
                onClick={this.handleClick} onKeyPress={this.handleKeyPress}
            >
                <FontIcon icon={icon} theme={this.props.theme} />
            </a>
        );
    }
}

export default SpinnerButton;
