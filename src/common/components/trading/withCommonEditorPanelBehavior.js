import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import EditorPanel from './EditorPanel';

export default function withCommonEditorPanelBehavior (WrappedComponent) {
    return class WithCommonEditorPanelBehaviorEditorPanel extends Component {
        constructor (props) {
            super(props);
            this.state = {
                isActive: props.fieldName === props.fieldNameToBeEdited
            };
        }

        static propTypes = {
            fieldName: PropTypes.string,
            fieldNameToBeEdited: PropTypes.string,
            registerOrderInputFieldGetter: PropTypes.func,
            takeInnerRef: PropTypes.func
        };

        componentWillReceiveProps (nextProps) {
            this.setState({
                isActive: nextProps.fieldName === nextProps.fieldNameToBeEdited
            });
        }

        shouldComponentUpdate (nextProps, nextState) {
            const isToBeActive = nextProps.fieldName ===
                nextProps.fieldNameToBeEdited;
            const isActiveNow = this.props.fieldName ===
                this.props.fieldNameToBeEdited;
            // if (isToBeActive || isActiveNow) {
            //     console.log("withCommonEditorPanelBehavior.shouldComponentUpdate");
            //     console.log("nextProps : " + JSON.stringify({
            //             fieldName: nextProps.fieldName,
            //             fieldNameToBeEdited: nextProps.fieldNameToBeEdited
            //         }));
            //     console.log("thisProps : " + JSON.stringify({
            //             fieldName: this.props.fieldName,
            //             fieldNameToBeEdited: this.props.fieldNameToBeEdited
            //         }));
            // }
            return isToBeActive || isActiveNow;
        }

        render () {
            console.log(
                `${WrappedComponent.name} : ${(this.state.isActive && 'active') || 'inactive'}`
            );
            if (!this.state.isActive) {
                return null;
            }

            let takeInnerRef = this.props.takeInnerRef;
            takeInnerRef = takeInnerRef || function () {};
            const fieldName = this.props.fieldName;
            const {
                registerOrderInputFieldGetter,
                ...passThroughProps
            } = this.props;
            const newProps = Object.assign({}, passThroughProps, {
                EditorPanel: (props) => {
                    return (
                        <EditorPanel
                            isActive={this.state.isActive}
                            fieldName={fieldName}
                            {...props}
                        />
                    );
                },
                registerOrderInputFieldGetter: (getterFn, validator) => {
                    registerOrderInputFieldGetter(
                        fieldName,
                        getterFn,
                        validator
                    );
                },

                editorPanelButtonBarProps: _.pick(this.props, [
                    'getCurrentSavedFieldValue',
                    'getCurrentEditFieldValue',
                    'isReadyToPreview',
                    'goToNextStep',
                    'goToPreviewPage',
                    'goToCancelPage'
                ])
            });

            return <WrappedComponent {...newProps} ref={takeInnerRef} />;
        }
    };
}
