import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './style.scss';

const KEYCODE_ENTER = 13;
const KEYCODE_SPACE = 32;
const detailsTester = document.createElement('details');
const isSupportNativeDetails = (detailsTester.open !== undefined);

class Summary extends Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleClick (event) {
        if (!isSupportNativeDetails) {
            typeof this.props.handleClick === 'function' && this.props.handleClick(event);
        }
    }

    handleKeyPress (event) {
        if (!isSupportNativeDetails) {
            const keyCode = event.which || event.keyCode;
            if (keyCode === KEYCODE_SPACE || keyCode === KEYCODE_ENTER) {
                event.preventDefault();
                typeof this.props.handleKeyPress === 'function' && this.props.handleKeyPress(event);
            }
        }
    }

    render () {
        const { children, theme } = this.props;

        return (
            <summary
                className={classNames(styles.summary, theme.summary)}
                role={isSupportNativeDetails ? null : 'button'}
                tabIndex={isSupportNativeDetails ? null : 0}
                onClick={isSupportNativeDetails ? null : this.handleClick}
                onKeyPress={isSupportNativeDetails ? null : this.handleKeyPress}
            >
                {children}
            </summary>
        );
    }
}

Summary.defaultProps = {
    theme: {}
};

Summary.propTypes = {
    children: PropTypes.node.isRequired,
    handleClick: PropTypes.func,
    handleKeyPress: PropTypes.func,
    theme: PropTypes.object
};

export default Summary;
