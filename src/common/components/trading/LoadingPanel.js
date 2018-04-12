import React, { Component, PropTypes } from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fonticon';
import styles from './LoadingPanel.scss';
import { FormattedMessage } from "react-intl";

class LoadingPanel extends Component {
    static defaultProps = {
        display: false
    };

    static propTypes = {
        display: PropTypes.bool
    };
    constructor (props) {
        super(props);
        this.state = {
            display: props.display
        };
        this.listenPromise = this.listenPromise.bind(this);
    }

    listenPromise (promise, doneCallback) {
        this.setState({
            display: true
        });
        promise.then(() => {
            this.setState({
                display: false
            });
        });

        return (doneCallback && promise.then(doneCallback)) || promise;
    }

    render () {
        return (
            <div
                className={styles['modal-loading']}
                style={{ display: this.state.display ? 'block' : 'none' }}
            >
                <p>
                    <FontIcon icon="refresh" className={styles.loading} />
                    <FormattedMessage id="loadingpanel.load"/>
                </p>
            </div>
        );
    }
}

export default LoadingPanel;
