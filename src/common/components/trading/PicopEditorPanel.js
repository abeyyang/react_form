import React, { Component } from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fonticon';
import includes from 'lodash/includes';
import styles from './PicopEditorPanel.scss';
import RadioInput from './RadioInput';
import withCommonEditorPanelBehavior from './withCommonEditorPanelBehavior';
import EditorPanelButtonBar from './EditorPanelButtonBar';
import {FormattedMessage, injectIntl} from "react-intl";

class PicopEditorPanel extends Component {
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
                    "value": "S",
                    "label":  <FormattedMessage id="picopeditorpanel.s"/> ,
                    "disabled": false
                },
                {
                    "value": "M",
                    "label":  <FormattedMessage id="picopeditorpanel.m"/> ,
                    "disabled": false
                },
                {
                    "value": "L",
                    "label":  <FormattedMessage id="picopeditorpanel.l"/>,
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
        console.log('PicopEditorPanel.componentWillUnmount!!!!!!!!!!!');
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
            return this.picopRadio.value();
        });

        const onInputChange = (newVal) => {
            this.props.syncInputData();
        };
        const editorPanelButtonBarProps = {
            ...this.props.editorPanelButtonBarProps,
            fromOrderType: true
        };
        return (
            <EditorPanel fieldLabel="Investment Amount Percentage of Total Assets" underlyingNum={this.props.underlyingNum} >
                <div className={styles.fieldDescriptionSection}>
                    <p className={styles.padt}>Picop</p>
                    <p className={styles.padb}>
                        Picop ... ...
                    </p>
                </div>
                <div className={styles.content}>
                    <div className={styles.description}>
                     <FormattedMessage id="picopeditorpanel.note_1"/>  
                    </div>
                    <RadioInput
                        name="picopRadio"
                        onChange={onInputChange}
                        ref={(ref) => {
                            this.picopRadio = ref;
                        }}
                        {...passProps}
                    />
                    <div style={{paddingTop:'70px'}}>
                    <FormattedMessage id="picopeditorpanel.note_2_1"/>
                        { !/en/.test(locale)? <FormattedMessage id="picopeditorpanel.note_2_2"/>:'' }
                        <a href='https://www.ebanking.hsbc.com.hk/1/content/hongkong/pdf/picop.pdf'
                            target="_blank"
                            style={{color:'red'}}><FormattedMessage id={ /en/.test(locale)?"picopeditorpanel.note_2_2":"picopeditorpanel.note_2_3"}/></a> 
                        { /en/.test(locale)? <FormattedMessage id="picopeditorpanel.note_2_3"/>:'' }
                        { /en/.test(locale) ?"":"。"}
                    </div>   
                </div>             
                <EditorPanelButtonBar
                    ref={(ref) => {
                        this.buttonBarRef = ref;
                    }}
                    {...editorPanelButtonBarProps}
                />
            </EditorPanel>
        );
    }
}

export default withCommonEditorPanelBehavior(injectIntl(PicopEditorPanel));
