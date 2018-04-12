import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import styles from './SecuritiesAccountEditorPanel.scss';
import RadioInput from './RadioInput';
import { formatAccountNumber } from './formatting';
import withCommonEditorPanelBehavior from './withCommonEditorPanelBehavior';
import EditorPanelButtonBar from './EditorPanelButtonBar';
import {FormattedMessage, injectIntl} from "react-intl";

class SecuritiesAccountEditorPanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: props.value,
            accounts: props.accounts
        };
        this.getAccountNameList = this.getAccountNameList.bind(this);
    }

    static propTypes = {
        EditorPanel: PropTypes.func,
        accounts: PropTypes.object,
        editorPanelButtonBarProps: PropTypes.object,
        registerOrderInputFieldGetter: PropTypes.func,
        securitiesAccount: PropTypes.string,
        syncInputData: PropTypes.func,
        value: PropTypes.string
    };
    componentWillReceiveProps (nextProps) {
        this.setState({
            value: nextProps.value
        });
    }

    getAccountNameList () {
        const investmentAccountList = this.state.accounts.investmentAccountList;
        return investmentAccountList.map((item) => {
            const accountNumber = item.investmentAccountId.accountNumber;
            const labelObject = {
                productType: item.name,
                accountNumber: formatAccountNumber(accountNumber, item.key)
            };
            return {
                value: item.checksum,
                label: <span>{labelObject.accountNumber}{' '}{labelObject.productType}</span>
            };
        });
    }

    componentDidMount () {
        this.buttonBarRef.isReadyToPreview();
    }

    componentDidUpdate (prevProps, prevState) {
        this.buttonBarRef.isReadyToPreview();
        console.log(
            'SecuritiesAccountEditorPanel.componentDidUpdate------------'
        );
    }

    render () {
        const EditorPanel = this.props.EditorPanel;
        const accounts = this.getAccountNameList();
        let inputRef = null;

        this.props.registerOrderInputFieldGetter(() => {
            return inputRef && inputRef.value();
        });

        const passProps = {
            options: accounts,
            defaultValue: this.props.value
        };

        const onInputChange = (newOrderType) => {
            this.props.syncInputData();
        };

        return (
            <EditorPanel fieldLabel="Investment Account(s)" underlyingNum={this.props.underlyingNum} >
                <div className={styles.fieldDescriptionSection}>
                    <p className={styles.padt}>Investment Accounts ...</p>
                    <p className={styles.padb}>
                        impotance of digital technology ....
                    </p>
                </div>
                <div className={styles.content}>
                    {
                        passProps.options.length > 0 ?
                        <RadioInput
                            name="securitiesAccountRadio"
                            onChange={onInputChange}
                            ref={(ref) => {
                                inputRef = ref;
                            }}
                            {...passProps}
                        />
                        :
                        <div className={styles.noRecode}><FormattedMessage id="investmentaccounteditorpanel.note"/></div>                          
                    }
                </div>
                <EditorPanelButtonBar
                    ref={(ref) => {
                        this.buttonBarRef = ref;
                    }}
                    {...this.props.editorPanelButtonBarProps}
                />
            </EditorPanel>
        );
    }
}
export default withCommonEditorPanelBehavior(injectIntl(SecuritiesAccountEditorPanel));
