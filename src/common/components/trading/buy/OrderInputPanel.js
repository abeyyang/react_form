import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import RouteHelper from 'lib/routeHelper';
import TradingLi from '../TradingLi';
import AmountEditorPanel from '../AmountEditorPanel';
import SettlementMethodEditorPanel from '../SettlementMethodEditorPanel';
import PicopEditorPanel from '../PicopEditorPanel';
import PicopWarningPanel from '../PicopWarningPanel';
import SecuritiesAccountEditorPanel from '../SecuritiesAccountEditorPanel';
import SettlementAccountEditorPanel from '../SettlementAccountEditorPanel';
import OrderInputConfig from '../OrderInputConfig';
import {
    formatSettlementAccountByCheckSum,
    formatSecurityAccountByCheckSum,
    formatNumberByComma
} from '../formatting';
import api from '../../../services/authorize';
import withLoadingScreenBeforeReadyToLeave
    from '../withLoadingScreenBeforeReadyToLeave';
import bootstrap from '../../../styles/trading/bootstrap.scss';
import orderInputPanel from './OrderInputPanel.scss';
import accountsConfig from '../../../config/accountsConfig';
import productsConfig from '../../../config/productsConfig';
import {NOT_AVAILABLE_STRING} from 'constant';
import {FormattedMessage, injectIntl} from "react-intl";
import ModalHolder from '../../modal/ModalHolder';
import FormattedSTM from './formatComponent/formattedSTM';
import FormattedPicop from './formatComponent/formattedPicop';
import formatHelper from "lib/formatHelper";
import WarningMessageListCheck from '../WarningMessageList';

class OrderInputPanel extends Component {
    static propTypes = {
        children: React.PropTypes.func,
        investmentAccountList: React.PropTypes.object,
        routing: React.PropTypes.object,
        saveInputData: React.PropTypes.func,
        settlementAccountList: React.PropTypes.object
    };

    constructor (props) {
        super(props);
        this.state = Object.assign(
            {
                fieldNameToBeEdited: 'amount',
                requiredFiledNames: [
                    'amount',
                    'picop',
                    'securitiesAccount',
                    'settlementAccount',
                    'settlementMethod'
                ],
                modal: null
            },
            this.getInitOrderInputData(props)
        );
        
        this.resetNextFieldNameToEdit = this.resetNextFieldNameToEdit.bind(this);
        this.goToNextStep = this.goToNextStep.bind(this);
        this.registerOrderInputFieldGetter = this.registerOrderInputFieldGetter.bind(this);
        this.calculateNewState = this.calculateNewState.bind(this);
        this.isReadyToPreview = this.isReadyToPreview.bind(this);
        this.goToPreviewPage = this.goToPreviewPage.bind(this);
        this.goToProductListPage = this.goToProductListPage.bind(this);
        this.isValidatedInput = this.isValidatedInput.bind(this);
        this.saveInputData = this.saveInputData.bind(this);
        this.getCurrentEditFieldValue = this.getCurrentEditFieldValue.bind(this);
        this.getCurrentSavedFieldValue = this.getCurrentSavedFieldValue.bind(this);
        this.getMappingSettlementAccountChecksum = this.getMappingSettlementAccountChecksum.bind(this);
        this.syncInputData = this.syncInputData.bind(this);
        this.findNextFieldNameToEdit = this.findNextFieldNameToEdit.bind(this);
        this.picopApiTrigger = this.picopApiTrigger.bind(this);
        this.goToVerifyPage = this.goToVerifyPage.bind(this);
        this.hidePicopOverlay = this.hidePicopOverlay.bind(this);
        this.filed2ValGetterMap = {};
    }

    getInitOrderInputData (props) {
        let settlementAccount = this.getMappingSettlementAccountChecksum(props.investmentAccountList[0]);
        return {
            amount: props.amount,
            settlementMethod:  props.settlementMethod || 'U',
            picop:  props.picop || '',
            securitiesAccount: props.securitiesAccount || props.investmentAccountList[0] && props.investmentAccountList[0].checksum,            
            settlementAccount: props.settlementAccount || settlementAccount
        };
    }

    getMappingSettlementAccountChecksum (securitiesAccount) {
        if (securitiesAccount) {
            let settlementAccount;
            if (securitiesAccount.isBundle) {
                settlementAccount = _.find(this.props.settlementAccountList, (item) => { 
                    return (accountsConfig.settlementForbundle.indexOf(item.key) > -1) && (securitiesAccount.investmentAccountId.accountNumber == item.settlementAccountId.accountNumber)
                });
            } else {
                settlementAccount = _.find(this.props.settlementAccountList, (item) => { 		
                    return accountsConfig.settlementForStandalone.indexOf(item.key) > -1; 		
                });	
            }
            return settlementAccount && settlementAccount.checksum;
        }
    }

    resetNextFieldNameToEdit (fieldNameToBeEdited) {
        if (!this.isValidatedInput()) {
            return;
        }
        if (this.state.fieldNameToBeEdited !== fieldNameToBeEdited) {
            const nextState = this.calculateNewState();
            nextState.fieldNameToBeEdited = fieldNameToBeEdited;
            nextState.modal = null;
            if (this.state.fieldNameToBeEdited == 'picop' && this.state.picop) {
                const eventHandler = () => {
                    this.setState({ modal: null });
                    const nextState = this.calculateNewState();
                    nextState.fieldNameToBeEdited = fieldNameToBeEdited;
                    this.setState(nextState);
                }
                this.picopApiTrigger(false, eventHandler);
            }
            this.setState(nextState);
        }
    }

    isValidatedInput () {
        const validator = this.filed2ValGetterMap[`${this.state.fieldNameToBeEdited}_validator`];
        return !validator || validator();
    }

    findNextFieldNameToEdit (fieldName) {
        let index = this.state.requiredFiledNames.indexOf(fieldName) + 1;
        let result = this.state.requiredFiledNames[index];
        return result;
    }

    isReadyToPreview (value) {
        const state = this.state;
        const hasEmpty = this.state.requiredFiledNames.some(
            (fieldName) => !state[fieldName]
        );
        return !hasEmpty;
    }

    registerOrderInputFieldGetter (fieldName, getter, validator) {
        this.filed2ValGetterMap[fieldName] = getter;
        this.filed2ValGetterMap[`${fieldName}_validator`] = validator;
    }

    goToNextStep () {
        if (!this.isValidatedInput()) {
            return;
        }
        if (this.state.fieldNameToBeEdited == 'picop' && this.state.picop) {
            const eventHandler = () => {
                this.setState({ modal: null });
                const nextState = this.calculateNewState();
                nextState.fieldNameToBeEdited = this.findNextFieldNameToEdit(this.state.fieldNameToBeEdited);
                this.setState(nextState);
            }
            this.picopApiTrigger(false, eventHandler);
        }
        const nextState = this.calculateNewState();
        nextState.fieldNameToBeEdited = this.findNextFieldNameToEdit(this.state.fieldNameToBeEdited);
        this.setState(nextState);
    }

    goToVerifyPage = () => {
        this.saveInputData();
        const nextState = this.calculateNewState();
        this.setState(nextState, function () {
            const locale = this.getCurrentLocale();
            this.props.router.push(`/${locale}/buy/verify`);
        });
    }

    getCurrentLocale = () => {
        const { routing } = this.props;
        const pathname = routing.locationBeforeTransitions.pathname;
        const path = RouteHelper.formatPath(pathname);
        return path.locale;
    }

    goToProductListPage = () => {
        const locale = this.getCurrentLocale();
        this.props.router.push(`/${locale}/portfolio`);
    }

    goToPreviewPage (isNewValPreferred = true) {
        if (!this.isValidatedInput()) {
            return;
        }
        if (this.state.fieldNameToBeEdited == 'picop') {
            this.picopApiTrigger(true, this.goToVerifyPage);
        } else {
            this.goToVerifyPage();
        }
    }

    getCurrentEditFieldValue () {
        return this.filed2ValGetterMap[this.state.fieldNameToBeEdited]();
    }

    getCurrentSavedFieldValue () {
        return this.state[this.state.fieldNameToBeEdited];
    }

    saveInputData () {
        if (!this.props.saveInputData) {
            console.error('No saveInputData');
        }
        const { amount, settlementMethod, picop, settlementAccount, securitiesAccount } = this.state;
        const { productDetails } = this.props;

        const dataToBeSaved = {
            productDetails,
            amount,
            settlementMethod,
            picop,
            securitiesAccount,
            settlementAccount
        };
        this.props.saveInputData(dataToBeSaved);
    }

    syncInputData () {
        const nextState = this.calculateNewState();
        this.setState(nextState);
    }

    hidePicopOverlay () {
        this.setState({
            modal: null
        });
        const nextState = this.calculateNewState();
        nextState.fieldNameToBeEdited = 'picop';
        this.setState(nextState);
    }

    picopApiTrigger (params, clickEvent) {
        // call picop API
        const retrievePicop = () => {
            const param = {
                assetConcentration: this.state.picop,
                prodSubTypeCode: this.props.productDetails.prodSubTypeCode
            }
            return api.validatePICOP(param);
        };

        this.props.listenPromise(retrievePicop).then((resp) => {
            const result = resp.response.PAYLOAD.picopMessageType;
            if (resp && result) {
                const locale = this.getCurrentLocale();
                const msgTypeArray = OrderInputConfig.picopWarningMsgType;
                const mappingMsgType = (msgType, targetArray) => {
                    return _.find(targetArray, (item) => {
                        return msgType === item;
                    });
                };

                if (mappingMsgType (result, msgTypeArray)) {
                    const propsItems = {
                        indicator: result,
                        locale,
                        router: this.props.router,
                        clickEvent,
                        backBtnEvent: this.hidePicopOverlay,
                        date: resp.response.PAYLOAD.discussionDate
                    };
                    const modal = ( <PicopWarningPanel {...propsItems} /> );
                    this.setState({ modal });

                    const nextState = this.calculateNewState();
                    nextState.fieldNameToBeEdited = 'picop';
                    this.setState(nextState);
                } else if (result == 'P' && params){
                    this.goToVerifyPage();
                } else if (result == 'P' && !params){
                    // Click next btn or choose other input panel, no need to handler
                } else {
                    const WarningMessageList = WarningMessageListCheck();
                    const nextState = this.calculateNewState();
                    nextState.fieldNameToBeEdited = 'picop';
                    if (result == 'picop_message_error') {
                        const text = WarningMessageList.PICOPWarningMsg.error;
                        nextState.modal = (
                            <ModalHolder
                                title={''}
                                warningMsg={<div>{text.contentText1}<br/><br/>{text.contentText2}<br/><br/><b>{text.contentText3}</b></div>}
                                closeWindowHandler={() => {
                                }}
                            >
                            </ModalHolder>
                        );
                    } else {
                        const text = WarningMessageList.PICOPWarningMsg.GENERAL_ERROR;
                        nextState.modal = (
                            <ModalHolder
                                title={''}
                                warningMsg={<div><b>{text}</b></div>}
                                closeWindowHandler={() => {
                                }}
                            >
                            </ModalHolder>
                        );
                    }
                    this.setState(nextState);
                }
            }
        });
    }

    calculateNewState () {
        const fieldName = this.state.fieldNameToBeEdited;
        const value = this.getCurrentEditFieldValue();
        const nextState = {
            [fieldName]: value
        };
        nextState.requiredFiledNames = this.state.requiredFiledNames;

        if (
            fieldName === 'securitiesAccount' &&
            value !== this.state.securitiesAccount
        ) {
            let investmentAccount = this.props.investmentAccountList.find((item)=>{
                return item.checksum == value;
            })
            let settlementAccount = this.getMappingSettlementAccountChecksum(investmentAccount);
            let defaultOrderInputData;
            defaultOrderInputData = {
                settlementAccount
            };
            Object.assign(nextState, defaultOrderInputData);
        }
        return nextState;
    }

    render () {
        const { locale } = this.props;
        const {
            fieldNameToBeEdited,
            requiredFiledNames,
            amount,
            settlementMethod,
            picop,
            settlementAccount,
            securitiesAccount
        } = this.state;
        const { productDetails,intl} = this.props;
        const Li = (props) => {
            return (
                <TradingLi
                    {...props}
                    fieldNameToBeEdited={this.state.fieldNameToBeEdited}
                    requiredFiledNames={requiredFiledNames}
                    handleTradingLiClick={this.resetNextFieldNameToEdit}
                />
            );
        };
        const amountDecimals = OrderInputConfig.formatting.HK.amountDecimals;
        const formatedAmount = formatNumberByComma(amount, amountDecimals);
        const formatedSecurityAccount = formatSecurityAccountByCheckSum(
            securitiesAccount,
            this.props.investmentAccountList
        );
        const formatedSettlementAccount = formatSettlementAccountByCheckSum(
            settlementAccount,
            this.props.settlementAccountList
        );
        const amountPanelProps = {
            productDetails: productDetails
        };

        const commonProps = {
            fieldNameToBeEdited,
            goToNextStep: this.goToNextStep,
            registerOrderInputFieldGetter: this.registerOrderInputFieldGetter,
            isReadyToPreview: this.isReadyToPreview,
            goToPreviewPage: this.goToPreviewPage,
            getCurrentEditFieldValue: this.getCurrentEditFieldValue,
            getCurrentSavedFieldValue: this.getCurrentSavedFieldValue,
            underlyingNum: productDetails.underlyingStockCode.length,//for control EditorPanel height
            syncInputData: this.syncInputData,
            locale
        };

        const accounts = {
            investmentAccountList: this.props.investmentAccountList,
            settlementAccountList: this.props.settlementAccountList
        };

        return (
            <div className={orderInputPanel.trading}>
                {/* pc */}
                <article className={orderInputPanel['p-pc']}>
                    <h3 className={orderInputPanel.buyholding}>
                        {intl.formatMessage({id: "orderinputpanel.buy"})}                      
                        {' '}
                        {productDetails.eliCode}
                        {' '}
                        <span className={orderInputPanel.gra}>
                            {productDetails.productName}
                        </span>
                    </h3>
                    <div className={orderInputPanel.cutoffTime}>
                        {intl.formatMessage({id: "orderinputpanel.note_1"})}{!/en/.test(locale)?intl.formatMessage({id: "timeZone.note_1"}):''}{ productDetails.cutoffTime }{/en/.test(locale)?intl.formatHTMLMessage({id: "timeZone.note_2"}):''}{intl.formatMessage({id:'orderinputpanel.note_2'})}
                    </div>
                    <div className={bootstrap.row}>
                        <div
                            className={classNames(bootstrap['col-lg-5'], bootstrap['col-md-5'], bootstrap['col-sm-5'], bootstrap['col-xs-5'], orderInputPanel['holding-list'])}
                        >
                            <ul className={bootstrap['list-inline']}>
                                <Li fieldName="amount">
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.amount"})}
                                        <FormattedMessage id="brackets_L"/>
                                        {formatHelper.getNLS(intl.formatMessage, productDetails.currency)}
                                        <FormattedMessage id="brackets_R"/>                                              
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span>{formatedAmount} {' '}</span> &gt;
                                    </p>
                                </Li>
                                <Li
                                    fieldName="picop"
                                >
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])}>
                                        {intl.formatMessage({id: "orderinputpanel.investamountpercetage"})}
                                    </p>
                                    <p className={classNames(orderInputPanel.summary, orderInputPanel['summary-m'])}>
                                        {intl.formatMessage({id: "orderinputpanel.investamountpercetageadd"})}
                                
                                    </p>                                     
                                    <p className={orderInputPanel.link}>
                                        {
                                            picop
                                            ?
                                            <FormattedPicop picop={ OrderInputConfig.picop[picop] }/>
                                            : 
                                            ''
                                        }
                                        <span> {' '}</span>&gt;
                                    </p>                            
                                </Li>                             
                                <Li fieldName="securitiesAccount">
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'])}>
                                         {intl.formatMessage({id: "orderinputpanel.investmentaccount"})}
                                    </p>
                                    <p className={classNames(orderInputPanel.summary, orderInputPanel['summary-m'])}>
                                        <strong>
                                            {
                                                formatedSecurityAccount.accountNumber
                                            }
                                        </strong>
                                        <br />
                                        {formatedSecurityAccount.accountName}
                                        {' '}
                                    </p>
                                    <p className={orderInputPanel.link}>&gt;</p>
                                </Li>
                                <Li fieldName="settlementAccount">
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'])}>
                                        {intl.formatMessage({id: "orderinputpanel.settlementaccount"})}
                                    </p>
                                    <p className={classNames(orderInputPanel.summary, orderInputPanel['summary-m'])}>
                                        <strong>
                                            {
                                                formatedSettlementAccount.accountNumber
                                            }
                                        </strong>
                                        <br />
                                        {
                                            formatedSettlementAccount.accountName
                                        }
                                        {' '}
                                    </p>
                                    <p className={orderInputPanel.link}>&gt;</p>
                                </Li>
                                <Li
                                    fieldName="settlementMethod"
                                >
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])}>
                                        {intl.formatMessage({id: "orderinputpanel.settlementmethod"})}   
                                    </p>
                                    <p className={classNames(orderInputPanel.summary, orderInputPanel['summary-m'])}>
                                        {intl.formatMessage({id: "orderinputpanel.settlementmethodadd"})}
                                    </p>                                    
                                    <p className={orderInputPanel.link}>
                                        <FormattedSTM method={OrderInputConfig.settlementMethod[settlementMethod]} /><span>{' '}</span>&gt;
                                    </p>                             
                                </Li>                  
								<Li fieldName="underlyingStockCode" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'], orderInputPanel.underlyingLeft)} >
                                        {intl.formatMessage({id: "orderinputpanel.underlyingstockcode"})}
                                    </p>
                                    <p className={classNames(orderInputPanel.summary, orderInputPanel['summary-m'], orderInputPanel.underlyingRight)}>
                                        {
                                           productDetails.underlyingStockCode.map((code, index) => {
                                               return <span key={index} >{code}</span>
                                           })
                                        }
                                    </p>
                                    <p className={classNames(orderInputPanel.clear)}></p>                                    
                                </Li>
                                <Li fieldName="underlyingStockName" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'], orderInputPanel.underlyingLeft)} >
                                        {intl.formatMessage({id: "orderinputpanel.underlyingstockname"})}
                                    </p>
                                    <p className={classNames(orderInputPanel.summary, orderInputPanel['summary-m'], orderInputPanel.underlyingRight)}>
                                        {
                                           productDetails.underlyingStockName.map((name, index) => {
                                               if (name.length > productsConfig.maxStringLength) {
                                                   return <span key={index} title={name}>{name.substring(0,productsConfig.maxStringLength)}...</span> 
                                               }
                                               return <span key={index} >{name}</span>
                                           })
                                        }                                     
                                    </p>
                                    <p className={classNames(orderInputPanel.clear)}></p>                                    
                                </Li>                                
                                <Li fieldName="tenor" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.tenor"})}
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span> 
                                            {productDetails.tenor_num } 
                                            {formatHelper.getNLS(intl.formatMessage, productDetails.tenor_unit)}
                                        </span>
                                    </p>                                    
                                </Li>
                                <Li fieldName="offerPeriod" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.offerperiod"})}
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span> 
                                            {productDetails.offeringPeriod_start_date }
                                             {intl.formatMessage({id: "allpageto.to"})}
                                            {productDetails.offeringPeriod_end_date }
                                        </span>
                                    </p>                                    
                                </Li>   
                                <Li fieldName="tradeDate" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.tradedate"})}
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span> {productDetails.tradeDate } </span>
                                    </p>                                    
                                </Li>
                                <Li fieldName="issueDate" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.issudate"})}
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span> {productDetails.issueDate } </span>
                                    </p>                                    
                                </Li>
                                <Li fieldName="expiryDate" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.expirydate"})}
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span> {productDetails.expiryDate } </span>
                                    </p>                                    
                                </Li>
                                <Li fieldName="settlementDate" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                         {intl.formatMessage({id: "orderinputpanel.settlementdate"})}
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span> {productDetails.settlementDate } </span>
                                    </p>                                    
                                </Li>  
                                <Li fieldName="tradePrice" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                         {intl.formatMessage({id: "orderinputpanel.tradeprice"})}
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span> {productDetails.tradePrice } </span>
                                    </p>                                    
                                </Li> 
                                <Li fieldName="autocallFrequency" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.autocallfrequency"})}
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span>{formatHelper.getNLS(intl.formatMessage, productDetails.autocallFrequency)}</span>
                                    </p>                                    
                                </Li>
                                <Li fieldName="callPrice" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                         {intl.formatMessage({id: "orderinputpanel.callprice"})}  
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span> {productDetails.callPrice } </span>
                                    </p>                                    
                                </Li>
                                <Li fieldName="knockInFrequency" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.knockinfequency"})}   
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span>{formatHelper.getNLS(intl.formatMessage, productDetails.knockInFrequency)}</span>
                                    </p>                                    
                                </Li>
                                <Li fieldName="knockInPrice" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.knockinprice"})}   
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span> {productDetails.knockInPrice } </span>
                                    </p>                                    
                                </Li> 
                                <Li fieldName="floorPrice" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.floorprice"})}  
                                    </p>
                                    <p className={orderInputPanel.link}>
                                        <span> {productDetails.floorPrice } </span>
                                    </p>                                    
                                </Li> 
                                <Li fieldName="exercisePrice" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.exerciseprice"})}  
                                    </p>
                                    <p className={classNames(orderInputPanel.summary, orderInputPanel['summary-m'])}>
                                        <small>{intl.formatMessage({id: "orderinputpanel.exercisepriceadsd"})}</small>
                                    </p>                                    
                                    <p className={orderInputPanel.link}>
                                        <span> 
                                            {productDetails.exercisePrice_from }
                                            {intl.formatMessage({id: "allpageto.to"})}
                                            {productDetails.exercisePrice_to }
                                        </span>
                                    </p>                                    
                                </Li> 
                                <Li fieldName="fixedCashDividendRate" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                         {intl.formatMessage({id: "orderinputpanel.fixedcashdiviendrate"})} 
                                    </p>
                                    <p className={orderInputPanel.link} style={{textAlign:'right'}}>
                                        {
                                            productDetails.fixedCashDividendRate
                                            ?
                                            <span>
                                                {productDetails.fixedCashDividendRate }
                                                {formatHelper.getNLS(intl.formatMessage, productDetails.ratePercentagePerAnnum)}
                                                <br/>
                                                {intl.formatMessage({id: "brackets_L",tagName:"strong"})}{productDetails.fixedCashDividendRate_Pa }{intl.formatMessage({id: "lable_perAnnum"})}{intl.formatMessage({id: "brackets_R",tagName:"strong"})}
                                            </span>
                                            : 
                                            <span>{NOT_AVAILABLE_STRING}</span>
                                        }
                                    </p>                                    
                                </Li> 
                                <Li fieldName="dayInCashDividendRate" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                         {intl.formatMessage({id: "orderinputpanel.dayincashdividendrate"})}
                                    </p>
                                    <p className={orderInputPanel.link} style={{textAlign:'right'}}>
                                        {
                                            productDetails.dayinCashDividendRate
                                            ?
                                            <span>
                                                {productDetails.dayinCashDividendRate }
                                                {formatHelper.getNLS(intl.formatMessage, productDetails.ratePercentagePerAnnum)}
                                                <br/>
                                                {intl.formatMessage({id: "brackets_L",tagName:"strong"})}{productDetails.dayinCashDividendRate_pa }{intl.formatMessage({id: "lable_perAnnum"})}{intl.formatMessage({id: "brackets_R",tagName:"strong"})}
                                            </span>
                                            :
                                            <span>{NOT_AVAILABLE_STRING}</span>
                                        }
                                    </p>                                    
                                </Li> 
                                <Li fieldName="dayOutCashDividendRate" isEditable={false}>
                                    <p className={classNames(orderInputPanel.item, orderInputPanel['item-1-line'], orderInputPanel['item-m-line'])} >
                                        {intl.formatMessage({id: "orderinputpanel.dayoutcashdividendrate"})}
                                    </p>
                                    <p className={orderInputPanel.link} style={{textAlign:'right'}}>
                                        {
                                            productDetails.dayoutCashDividendRate
                                            ?
                                            <span>
                                                {productDetails.dayoutCashDividendRate }
                                                {formatHelper.getNLS(intl.formatMessage, productDetails.ratePercentagePerAnnum)}
                                                <br/>
                                                {intl.formatMessage({id: "brackets_L",tagName:"strong"})}{productDetails.dayoutCashDividendRate_Pa }{intl.formatMessage({id: "lable_perAnnum"})}{intl.formatMessage({id: "brackets_R",tagName:"strong"})}
                                            </span>
                                            :
                                            <span>{NOT_AVAILABLE_STRING}</span>
                                        }
                                    </p>                                    
                                </Li> 
                            </ul>
                        </div>
                        <div
                            className={classNames(bootstrap['col-lg-7'], bootstrap['col-md-7'], bootstrap['col-sm-7'], bootstrap['col-xs-7'], orderInputPanel['holding-content'])}
                        >
                            <AmountEditorPanel
                                fieldName="amount"
                                value={amount}
                                {...commonProps}
                                {...amountPanelProps}
                            />
                            <PicopEditorPanel
                                fieldName="picop"
                                value={picop}
                                {...commonProps}
                            /> 
                            <SecuritiesAccountEditorPanel
                                fieldName="securitiesAccount"
                                value={securitiesAccount}
                                {...commonProps}
                                accounts={accounts}
                            />
                            <SettlementAccountEditorPanel
                                fieldName="settlementAccount"
                                value={settlementAccount}
                                {...commonProps}
                                securitiesAccount={securitiesAccount}
                                accounts={accounts}
                            />
                            <SettlementMethodEditorPanel
                                fieldName="settlementMethod"
                                value={settlementMethod}
                                {...commonProps}
                            /> 
                            <div>
                                <a className={orderInputPanel.backButton} onClick={this.goToProductListPage}>
                                    <span className={orderInputPanel.red}>
                                        &nbsp;&nbsp;&lt;
                                    </span>
                                    {' '}{intl.formatMessage({id: "orderinputpanel.backtolist"})}
                                </a>
                            </div>
                        </div>
                        {this.state.modal}
                    </div>
                    {this.props.children}                
                </article>
            </div>
        );
    }
}

OrderInputPanel.propTypes = {
    // fetchPortfolioList: PropTypes.func.isRequired,
    // tableData: PropTypes.array.isRequired,
    // turnOffDelayed: PropTypes.func.isRequired,
    // turnOnDelayed: PropTypes.func.isRequired,
    // updateSortKey: PropTypes.func.isRequired,
    // updateSortOrder: PropTypes.func.isRequired,
    // updateTableData: PropTypes.func.isRequired,
    // delayed: PropTypes.bool,
    // list: PropTypes.object,
    // sortKey: PropTypes.string,
    // sortOrder: PropTypes.string
};

export default withLoadingScreenBeforeReadyToLeave(injectIntl(OrderInputPanel));
