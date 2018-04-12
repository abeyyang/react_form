import React, { Component } from 'react';
import _ from 'lodash';
import LoadingPanel from './LoadingPanel';

export default function withLoadingScreenBeforeReady (
    WrappedComponent,
    promiseCreater,
    receiveNewPropsCallBack
) {
    return class extends Component {
        constructor (props) {
            super(props);
            this.state = {
                isDone: false
            };
        }

        componentWillMount () {
            promiseCreater(this.props).then(
                (result) => {
                    const isPromiseArray = _.isArray(result);
                    const newState = {
                        isDone: true,
                        result: (isPromiseArray &&
                            Object.assign(
                                {
                                    originResult: result
                                },
                                ...result
                            )) ||
                            result
                    };
                    this.setState(newState);
                },
                (responseWithError) => {}
            );
        }

        componentWillReceiveProps (nextProps) {
            console.log(nextProps);
            !!receiveNewPropsCallBack && receiveNewPropsCallBack(nextProps, this.props);
        }

        render () {
            if (this.state.isDone) {
                return (
                    <WrappedComponent {...this.state.result} {...this.props} />
                );
            } else {
                return <LoadingPanel display />;
            }
        }
    };
}
