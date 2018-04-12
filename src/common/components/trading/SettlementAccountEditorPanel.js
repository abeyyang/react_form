import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import styles from './SecuritiesAccountEditorPanel.scss';
import RadioInput from './RadioInput';
import { formatAccountNumber } from './formatting';
import OrderInputConfig from './OrderInputConfig';
import withCommonEditorPanelBehavior from './withCommonEditorPanelBehavior';
import EditorPanelButtonBar from './EditorPanelButtonBar';
import accountsConfig from '../../config/accountsConfig';
import {FormattedMessage, injectIntl} from "react-intl";

class SettlementAccountEditorPanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: props.value,
            accounts: props.accounts,
            securitiesAccount: props.securitiesAccount
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
            value: nextProps.value,
            accounts: nextProps.accounts,
            securitiesAccount: nextProps.securitiesAccount
        });
    }

    getAccountNameList () {
        const investment_checkSum = this.state.securitiesAccount;
        let investmentAccount = this.state.accounts.investmentAccountList.find((item)=>{
            return item.checksum == investment_checkSum;
        })

        let settlementAccountList = null;
        if (investmentAccount) {
            if (investmentAccount.isBundle) {
                settlementAccountList =  this.state.accounts.settlementAccountList.filter((item)=>{
                    return (accountsConfig.settlementForbundle.indexOf(item.key) > -1) &&
                        (investmentAccount.investmentAccountId.accountNumber == item.settlementAccountId.accountNumber);
                })
            } else {
                settlementAccountList =  this.state.accounts.settlementAccountList.filter((item)=>{
                    return accountsConfig.settlementForStandalone.indexOf(item.key) > -1;
                })
            }
        } else {
            return [];
        }
        // const labelTemplate =  <span>{accountNumber}{' '}{productType}</span>;
        return settlementAccountList.map((item)=>{
            const accountNumber = item.settlementAccountId.accountNumber;
            const labelObject = {
                productType: item.name,
                accountNumber: formatAccountNumber(accountNumber, item.key)
            };            
            return {
                value: item.checksum,
                label: <span>{labelObject.accountNumber}{' '}{labelObject.productType}</span>//labelTemplate(labelObject)
            };
        })
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
        // const EditorPanel = this.props.EditorPanel;
        // const accounts = this.getAccountNameList();
        // let inputRef = null;
        // let passProps = {
        //     options: accounts,
        //     defaultValue: this.props.value
        // };

        // this.props.registerOrderInputFieldGetter(() => {
        //     return inputRef && inputRef.value();
        // });

        // const onInputChange = (newOrderType) => {
        //     this.props.syncInputData();
        // };

        return (
            <EditorPanel fieldLabel="Settlement Account(s)" underlyingNum={this.props.underlyingNum} >
                {/*<div className={styles.fieldDescriptionSection}>
                    <p className={styles.padt}>Settlement accounts ...</p>
                    <p className={styles.padb}>
                        impotance of digital technology ....
                    </p>
                </div>*/}
                <div className={styles.content}>
                {
                    passProps.options.length > 0 ?  
                    <RadioInput
                        name="settleAccountRadio"
                        onChange={onInputChange}
                        ref={(ref) => {
                            inputRef = ref;
                        }}
                        {...passProps}
                    />
                    :
                    <div className={styles.noRecode}><FormattedMessage id="settlementaccounteditorpanel.note"/></div>   
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
export default withCommonEditorPanelBehavior(injectIntl(SettlementAccountEditorPanel));
