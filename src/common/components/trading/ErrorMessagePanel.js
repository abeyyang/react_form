import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fonticon';
import styles from './ErrorMessagePanel.scss';

export default class ErrorMessagePanel extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]).isRequired
    };

    constructor (props) {
        super(props);
        this.showErrorMsg = this.showErrorMsg.bind(this);
        this.hideErrorMsg = this.hideErrorMsg.bind(this);
        this.errorMsgRef = null;
    }

    showErrorMsg () {
        this.errorMsgRef.className = styles['error-message'];
    }

    hideErrorMsg () {
        this.errorMsgRef.className = classNames(styles['error-message'], styles.hidden);
    }

    render () {
        return (
            <div
                className={classNames(styles['error-message'], styles.hidden)}
                ref={(ref) => {
                    this.errorMsgRef = ref;
                }}
            >
                <p>
                    <FontIcon icon="circle-delete" />
                    Wrong input
                </p>
                {this.props.children}
            </div>
        );
    }
}
