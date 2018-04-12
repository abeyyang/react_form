import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import editorPanelButtonBar from './EditorPanelButtonBar.scss';
import Modal from './Modal';
import {FormattedMessage, injectIntl} from "react-intl";

class EditorPanelButtonBar extends Component {
    static propTypes = {
        getCurrentEditFieldValue: React.PropTypes.func.isRequired,
        getCurrentSavedFieldValue: React.PropTypes.func.isRequired,
        goToNextStep: React.PropTypes.func.isRequired,
        goToPreviewPage: React.PropTypes.func.isRequired,
        isReadyToPreview: React.PropTypes.func.isRequired
    };

    static propTypes = {
        isUsedForLastPanel: PropTypes.bool
    };

    constructor (props) {
        super(props);
        this.state = {
            isPreviewBtnRequired: false,
            modal: null
        };

        this.isReadyToPreview = this.isReadyToPreview.bind(this);
        this.previewOrderBtnClickHandler = this.previewOrderBtnClickHandler.bind(this);
    }

    isReadyToPreview () {
        const {
            getCurrentSavedFieldValue,
            getCurrentEditFieldValue,
            isReadyToPreview
        } = this.props;
        this.setState({
            isPreviewBtnRequired: isReadyToPreview(
                getCurrentSavedFieldValue() || getCurrentEditFieldValue()
            )
        });
    }

    previewOrderBtnClickHandler () {
        const { goToPreviewPage } = this.props;
        goToPreviewPage();
    }

    render () {
        const {
            goToNextStep,
            isUsedForLastPanel
        } = this.props;
        const nextBtnPart = isUsedForLastPanel
            ? null
            : <div
                className={classNames(editorPanelButtonBar.button, editorPanelButtonBar.next, editorPanelButtonBar.fr)}
              >
                <a href="javascript:;" onClick={goToNextStep}><FormattedMessage id="editor.button_next"/></a>
            </div>;

        const previewBtn = (
            <div className={editorPanelButtonBar.control}>
                <div
                    className={classNames(
                        editorPanelButtonBar.button,
                        editorPanelButtonBar.preview,
                        editorPanelButtonBar.fr
                    )}
                >
                    <a
                        href="javascript:;"
                        onClick={this.previewOrderBtnClickHandler}
                    >
                        <FormattedMessage id="editor.button_previewOrder"/>
                    </a>
                </div>
                {nextBtnPart}
                <div className={editorPanelButtonBar.clear} />
                {this.state.modal}
            </div>
        );

        const nextBtn = (
            <div className={editorPanelButtonBar.control}>
                <div
                    className={classNames(
                        editorPanelButtonBar.button,
                        editorPanelButtonBar.preview,
                        editorPanelButtonBar.fr
                    )}
                >
                    <a className={classNames(editorPanelButtonBar.cover, editorPanelButtonBar.fr)}>
                        <FormattedMessage id="editorpanelbuttonbar.previeworder"/>{/*editorpanelbuttonbar.previeworder Preview order*/}
                    </a>
                    <a href="javascript:;"><FormattedMessage id="editorpanelbuttonbar.previeworder"/></a>
                </div>
                {nextBtnPart}
                <div className={editorPanelButtonBar.clear} />
            </div>
        );


        if (this.state.isPreviewBtnRequired) {
            return previewBtn;
        } else {
            return nextBtn;
        }
    }
}

EditorPanelButtonBar.defaultProps = {
    isUsedForLastPanel: false
};

export default EditorPanelButtonBar;
