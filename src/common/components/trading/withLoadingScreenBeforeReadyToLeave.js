import React, { Component } from 'react';
import LoadingPanel from './LoadingPanel';

export default function withLoadingScreenBeforeReadyToLeave (WrappedComponent) {
    return class extends Component {
        constructor (props) {
            super(props);
            this.loadingPanelRef = null;
            this.listenPromise = this.listenPromise.bind(this);
        }

        listenPromise (promiseCreater, doneCallback) {
            return this.loadingPanelRef.listenPromise(
                promiseCreater(),
                doneCallback
            );
        }

        render () {
            return (
                <WrappedComponent
                    {...this.props}
                    listenPromise={this.listenPromise}
                >
                    <LoadingPanel
                        ref={(ref) => {
                            this.loadingPanelRef = ref;
                        }}
                    />
                </WrappedComponent>
            );
        }
    };
}
