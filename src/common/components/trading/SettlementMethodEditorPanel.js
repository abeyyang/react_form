import React, { Component } from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fonticon';
import includes from 'lodash/includes';
import styles from './SettlementMethodEditorPanel.scss';
import RadioInput from './RadioInput';
import withCommonEditorPanelBehavior from './withCommonEditorPanelBehavior';
import EditorPanelButtonBar from './EditorPanelButtonBar';
import {FormattedMessage, injectIntl} from "react-intl";
import {judgeSettlementMethod} from '../../services/static/proDetail';

class SettlementMethodEditorPanel extends Component {
    static propTypes = {
        EditorPanel: React.PropTypes.func.isRequired,
        editorPanelButtonBarProps: React.PropTypes.object,
        registerOrderInputFieldGetter: React.PropTypes.func,
        syncInputData: React.PropTypes.func,
        value: React.PropTypes.string
    }

    constructor (props) {
        super(props);
        this.state = {
            
            value: props.value,
            options: [
                {
                    "value": "U",
                    "label": <FormattedMessage id = {judgeSettlementMethod("Underlying Stock")}/>,
                    "disabled": false
                },
                {
                    "value": "S",
                    "label": <FormattedMessage id = {judgeSettlementMethod("Cash")}/>,
                    "disabled": false
                }          
            ]
        };
    }

    componentWillReceiveProps (nextProps) {    
        this.setState(
            Object.assign(this.state, {
                value: nextProps.value
            })
        );
    }

    componentWillUnmount () {
        console.log('SettlementMethodEditorPanel.componentWillUnmount!!!!!!!!!!!');
    }

    componentDidMount () {
        this.buttonBarRef.isReadyToPreview();
    }

    componentDidUpdate (prevProps, prevState) {
        this.buttonBarRef.isReadyToPreview();
    }

    render () {
        const { locale } = this.props;
        const EditorPanel = this.props.EditorPanel;
     
        const passProps = {
            options: this.state.options,
            defaultValue: this.props.value
        };

        this.props.registerOrderInputFieldGetter(() => {
            return this.settlementMethodRadio.value();
        });

        const onInputChange = (newVal) => {
            this.props.syncInputData();
        };
        const editorPanelButtonBarProps = {
            ...this.props.editorPanelButtonBarProps,
            fromOrderType: true
        };
        return (
            <EditorPanel fieldLabel="Settlement Method" underlyingNum={this.props.underlyingNum} >
                <div className={styles.fieldDescriptionSection}>
                    <p className={styles.padt}>Settlement Method</p>
                    <p className={styles.padb}>
                        Settlement Method ... ...
                    </p>
                </div>
                <div className={styles.subTitle} style={/en/.test(locale)?{}:{right:'360px'}}>
                   <FormattedMessage id="settlementmethodeditorpanel.title"/>
                </div>
                <div className={styles.content}>
                    <RadioInput
                        name="settlementMethodRadio"
                        onChange={onInputChange}
                        ref={(ref) => {
                            this.settlementMethodRadio = ref;
                        }}
                        {...passProps}
                    />
                </div>
                <EditorPanelButtonBar
                    isUsedForLastPanel
                    ref={(ref) => {
                        this.buttonBarRef = ref;
                    }}
                    {...editorPanelButtonBarProps}
                />
            </EditorPanel>
        );
    }
}

export default withCommonEditorPanelBehavior(injectIntl(SettlementMethodEditorPanel));
