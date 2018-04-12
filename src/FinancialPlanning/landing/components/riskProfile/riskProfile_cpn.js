import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Button from 'wealth/lib/web/components/ui/button';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import RouteHelper from 'common/lib/routeHelper';
import FormatHelper from 'common/lib/formatHelper';
import dateTimeFormat from '../../../../config/dateTimeFormat';
import styles from './style.scss';
import withLoadingScreenBeforeReadyToLeave
    from 'common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import { browserHistory } from 'react-router'
import Loading from 'common/components/Loading';
import FormattedNumber from 'wealth/lib/web/components/ui/formattedNumber';

class riskProfile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showKnResult:true
        };
        this.clickButtonForDashboardInitData = this.clickButtonForDashboardInitData.bind(this);
        this.goToRTQPageHandle = this.goToRTQPageHandle.bind(this);
        this.getCurrentLocale = this.getCurrentLocale.bind(this);
        this.goToKEPageHandle = this.goToKEPageHandle.bind(this);
        this.goToFinancialProfilePageHandle = this.goToFinancialProfilePageHandle.bind(this);
        this.goToProductSummaryPageHandle = this.goToProductSummaryPageHandle.bind(this);
        this.clickButtonflowDemo = this.clickButtonflowDemo.bind(this);
        this.amountSubmit = this.amountSubmit.bind(this);	
	    this.showFnaDashboard= this.showFnaDashboard.bind(this);
	    this.goToInv = this.goToInv.bind(this);
	    this.goToIns = this.goToIns.bind(this);
    }

    //for saga to call external service
    clickButtonForDashboardInitData(){
        console.log('clickButtonForDashboardInitData excute!');
        const request = {
            customerId : "IF200106"
        }
        this.props.initDashboardData(request);
    }

    amountSubmit(){
        console.log('amountSubmit click');
        let inputAmount = document.getElementById('inputValue').value;
        console.log(inputAmount);

        this.props.updateDashboardFNAData(inputAmount);
    }

    showFnaDashboard(){
        let fnaParams= {
            customers: [],
            requestComment: [{
                    commentType: "EF"
                },
                {
                    commentType: "INVST"
                },
                {
                    commentType: "SOFT_FACT"
                },
                {
                    commentType: "CUST_INFO"
                }],
            requestInvestorIndicator: [{
                    indicatorKey: "INV"
                },
                {
                    indicatorKey: "AIPI"
                },
                {
                    indicatorKey: "EF"
                },
                {
                    indicatorKey: "DCI"
                },
                {
                    indicatorKey: "MR"
                }],
            messageId:'retrieveFinancialSituationData',
         }    
          this.props.initDashboardFNAData(fnaParams);
    }

    showInvolvedPartyDetail() {
         let ipDetailRequest = {
            cdmBusinessObjectIdentification: {
                businessObjectType: "IP",
                externalReferenceNumber: this.props.session.customerId
            },
            cdmResponseScope: {
                scopeName: "OHAPE_IND",
                scopeVersion: "0001"
            },
            cdmResponseScope2: {
                scopeName: "OHAPE_NAME",
                scopeVersion: "0001"
            },
            cdmResponseScope3: {
                scopeName: "OHAPE_ADDR_DFLT",
                scopeVersion: "0001"
            },
            cdmResponseScope4: {
                scopeName: "OHAPE_EMAIL",
                scopeVersion: "0001"
            },
            cdmResponseScope5: {
                scopeName: "OHAPE_TEL_NO",
                scopeVersion: "0001"
            },
            cdmResponseScope6: {
                scopeName: "OHAPE_CDE",
                scopeVersion: "0001"
            },
            cdmResponseScope7: {
                scopeName: "OHAPE_ID",
                scopeVersion: "0001"
            },
            cdmResponseScope8: {
                scopeName: "OHAPE_IP_ADD_DTLS",
                scopeVersion: "0001"
            },
            cdmResponseScope9: {
                scopeName: "OHAPE_ADDR_CORR",
                scopeVersion: "0001"
            },
            cdmResponseScope10: {
                scopeName: "OHAPE_ADDR_WORK",
                scopeVersion: "0001"
            },
            cdmResponseScope11: {
                scopeName: "OHAPE_FIN_DTLS",
                scopeVersion: "0001"
            },
            coreReserveAreaDetails: [{
                
            }],
            localFieldsAreaDetails: [{
                
            }],
            messageId:'retrieveInvolvedPartyDetailsIndividual'
        };
        let assetsParams = {
            messageId:'retrieveFinancialSituationReferenceRecordAssets',
			fieldKeys:["HSBC_DEPOSIT_CONSENT_INDICATOR"],
            sessionInfo:this.props.session
         };
        this.props.initInvolvedPartyDetail(ipDetailRequest,assetsParams);
    }

    showAssetsMixResult(){
        let assetsMixRequest = {
            staffId :"29000101",
            customerNumber: "IQ8360330"
        }
        this.props.initAssetsMix(assetsMixRequest);
    }
    
    
    goToRTQPageHandle() {
        browserHistory.push('/group-sfp-war/main/en-gb/rtq');
    }


    clickButtonflowDemo(){
       browserHistory.push('/group-sfp-war/main/en-gb/flowDemo');
    }

    getCurrentLocale() {
        const { routing } = this.props;
        console.log(this.props);
        const pathname = routing.locationBeforeTransitions.pathname;
        const path = RouteHelper.formatPath(pathname);
        return path.locale;
    }

    goToFinancialProfilePageHandle() {
        const target = '/group-sfp-war/main/en-gb/financialProfile';
        //this.props.router.push(target);
        browserHistory.push(target)
    }

     goToProductSummaryPageHandle() {
        const target = '/group-sfp-war/main/en-gb/productSummary';
        //this.props.router.push(target);
        browserHistory.push(target)
    }

    goToInv(){
       const target = '/group-sfp-war/main/en-gb/invJourney';
        browserHistory.push(target) 
    }

    goToIns(){
        const target = '/group-sfp-war/main/en-gb/insJourney';
        browserHistory.push(target)
    }
    //when props changed redux will pass to react page then will trigger this method
    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //         app:nextProps.app
    //     })
    // }

    componentWillMount(){
        console.log('dashboard init....');
        this.clickButtonForDashboardInitData();
        this.showFnaDashboard();
        this.showInvolvedPartyDetail();
        this.showAssetsMixResult();
    }

    componentDidMount(){
    }

    componentWillUnMount(){
    }

    goToKEPageHandle() {
        const target = '/group-sfp-war/main/en-gb/knowledgeAndExperience';
        //this.props.router.push(target);
        browserHistory.push(target);
    }

    //
    // 
    // <Button  value="sagaDemo" onClick={this.clickButtonForDashboardInitData} />
    render () {
        const {
            stickyHeight,
            router,
            intl,
            rtqResult,
            fnaResult,
            keResult,
            keQuestionaire,
            lastDateTime,
            customerInfo,
            depositeConstentCode,
            assetsMixResult,
            invHoldingsResult
       } = this.props;

       //console.log("dashboard show assetsMixResult---------",assetsMixResult);
       console.log("dashboard show invHoldingsResult---------",invHoldingsResult);
       let derivativeFund;
       let derivativeFundCurrencyTypeCode;
       let derivativeFundAmountCode;
       let derivativeFundHoldingValue;

       let highYieldBondFund;
       let highYieldBondFundCurrencyTypeCode;
       let highYieldBondFundAmountCode;
       let highYieldBondFundHoldingValue;

       let subordinatedBond;
       let subordinatedBondCurrencyTypeCode;
       let subordinatedBondAmountCode;
       let subordinatedBondHoldingValue;

       let highYieldBond                
       let highYieldBondCurrencyTypeCode
       let highYieldBondAmountCode      
       let highYieldBondHoldingValue    
 

       if(assetsMixResult!=undefined && assetsMixResult.length >0){
            for(let assets in assetsMixResult){
                if(assetsMixResult[assets]!=undefined){
                    console.log("dashboard show assetsMixResult[assets]---------",assetsMixResult[assets]);
                    console.log("dashboard show assetsMixResult--category---------",assetsMixResult[assets].category);
                    if(assetsMixResult[assets].category!=undefined){
                        if(assetsMixResult[assets].category=="\"Derivative Fund\""){
                            derivativeFund = assetsMixResult[assets].category;
                            derivativeFundCurrencyTypeCode = assetsMixResult[assets].currencyCode;
                            derivativeFundAmountCode = assetsMixResult[assets].currencyAmountCode;
                            if(assetsMixResult[assets].currencyAmountCode){
                                derivativeFundHoldingValue = <FormattedNumber value={assetsMixResult[assets].productAmount} precision={2} theme={styles} />;
                            }else{
                                derivativeFundHoldingValue="N/A";
                            }
                            console.log("dashboard show Derivative Fund---------",derivativeFund,derivativeFundCurrencyTypeCode,derivativeFundAmountCode,derivativeFundHoldingValue);
                        }else if(assetsMixResult[assets].category=="\"High Yield Bond Fund\""){
                            highYieldBondFund = assetsMixResult[assets].category;
                            highYieldBondFundCurrencyTypeCode = assetsMixResult[assets].currencyCode;
                            highYieldBondFundAmountCode = assetsMixResult[assets].currencyAmountCode;
                            highYieldBondFundHoldingValue = <FormattedNumber value={assetsMixResult[assets].productAmount} precision={2} theme={styles} />;
                            console.log("dashboard show High Yield Bond Fund---------",highYieldBondFund,highYieldBondFundCurrencyTypeCode,highYieldBondFundAmountCode,highYieldBondFundHoldingValue);
                        }else if(assetsMixResult[assets].category=="\"Subordinated Bond\""){
                            subordinatedBond = assetsMixResult[assets].category;
                            subordinatedBondCurrencyTypeCode = assetsMixResult[assets].currencyCode;
                            subordinatedBondAmountCode = assetsMixResult[assets].currencyAmountCode;
                            subordinatedBondHoldingValue = <FormattedNumber value={assetsMixResult[assets].productAmount} precision={2} theme={styles} />;
                            console.log("dashboard show Subordinated Bond---------",subordinatedBond,subordinatedBondCurrencyTypeCode,subordinatedBondAmountCode,subordinatedBondHoldingValue);

                        }else if(assetsMixResult[assets].category=="\"High Yield Bond\""){
                            highYieldBond = assetsMixResult[assets].category;
                            highYieldBondCurrencyTypeCode = assetsMixResult[assets].currencyCode;
                            highYieldBondAmountCode = assetsMixResult[assets].currencyAmountCode;
                            highYieldBondHoldingValue = <FormattedNumber value={assetsMixResult[assets].productAmount} precision={2} theme={styles} />;
                            console.log("dashboard show High Yield Bond Fund---------",highYieldBond,highYieldBondCurrencyTypeCode,highYieldBondAmountCode,highYieldBondHoldingValue);
                        }
                    }

                }
            }
       }
  
        let income={ }, expense={ },assets={ },investment={ },liability={ },MoSavings={},NetWorth={ },lastModified
        let content;
        let erroIcon;
        let normalIcon;
        let expireDate;
        let details;
        let incomeAmount;
        let expenseAmount;
        let moSavingsAmount;
        let assetsAmount;
        let liabilityAmount;
        let netWorthAmount;
        let erroIconForFinancial;
        let normalIconForFinancial;
        if(fnaResult.length>=1){
            lastModified=FormatHelper.dateFormatPattern(fnaResult[0].reviewDateTime,dateTimeFormat.DATE_FORMAT);
             let financialSituation=fnaResult[0].financialSituation;
             console.log("cpn financialSituation ",financialSituation);
             income=financialSituation.income.total;
             NetWorth=financialSituation.netWorth;
             assets=financialSituation.assets.totalLiquidAssets;
             liability=financialSituation.liability.total
             expense=financialSituation.expense.total;
             investment=financialSituation.investment.total;
             MoSavings=financialSituation.surplus;
             console.log("cpn income ",JSON.stringify(income) );
             console.log("cpn netWorth ",JSON.stringify(NetWorth) );
             console.log("cpn assets ",JSON.stringify(assets) );
             console.log("cpn expense ",JSON.stringify(expense) );
             console.log("cpn investment ",JSON.stringify(investment) );
             console.log("cpn MoSavings ",JSON.stringify(MoSavings) );
             incomeAmount = "HKD " + [FormatHelper.addThousandSeparator(income.amount)];
             expenseAmount ="HKD " + [FormatHelper.addThousandSeparator(expense.amount)];
             moSavingsAmount = "HKD " + [FormatHelper.addThousandSeparator(MoSavings.amount)];
             assetsAmount = "HKD " + [FormatHelper.addThousandSeparator(assets.amount)];
             liabilityAmount = "HKD " + [FormatHelper.addThousandSeparator(liability.amount)];
             netWorthAmount = "HKD " + [FormatHelper.addThousandSeparator(NetWorth.amount)];
             normalIconForFinancial=(<FontIcon icon="circle-confirmation-solid" className={styles.confirmIconSolid} />);
        }else{
             lastModified = "N/A"
             incomeAmount = "N/A";
             expenseAmount = "N/A";
             moSavingsAmount = "N/A";
             assetsAmount = "N/A";
             liabilityAmount = "N/A";
             netWorthAmount = "N/A";
             erroIconForFinancial = (<FontIcon icon="circle-error-solid" className={styles.erroIconSolid} />);
             //warningForFinancial = ();
        }
        console.log("keResult..",keResult );
        let resultContent = 'riskLevel'+rtqResult.riskLevel;
        console.log("rtqResult-----------",resultContent );
        {/*control show or hide error message for risk profile*/}
        if(resultContent==undefined ||rtqResult.riskLevel==undefined||rtqResult.riskLevel==''){
            content = (<div className={styles.warning}>
                           <FontIcon icon="circle-error" className={styles.erroIcon} /> 
                            <p className={styles.warningMsg}>You have not yet done risk tolerance questionaire</p>
                        </div>);
            erroIcon=(<FontIcon icon="circle-error-solid" className={styles.erroIconSolid} />);
            expireDate="N/A";
        }else{
            content = (<p className={styles[resultContent]}>{rtqResult.riskLevel}</p>);
            normalIcon=(<FontIcon icon="circle-confirmation-solid" className={styles.confirmIconSolid} />);
            expireDate=FormatHelper.dateFormatPattern(rtqResult.expireDate,dateTimeFormat.DATE_FORMAT);
            details= (<p className={classNames(styles.detail, styles.adventurous)}>
                               {rtqResult.riskLeverDescription}<FontIcon icon="circle-help-solid" className={styles.icon} />
                                <div className={styles.detailHide}>
                                    <p className={styles.link} />
                                    <p className={styles.link1} />
                                    <div className={styles.detailOverlay}>
                                        <div className={styles.detailText}>
                                            <p>{rtqResult.firstLine}</p>
                                            <p>{rtqResult.secondLine}</p>
                                            <p>{rtqResult.thridLine}</p>
                                        </div>
                                    </div>
                                </div>
                            </p>);
                    
        }

        // check the important indicator response
        let cusInfoCount = 0;
        let waringForIndicator;
        for(let cus in customerInfo) {
            if(customerInfo[cus]!=undefined) {
                cusInfoCount++;
            }
        }
        if(depositeConstentCode == 'Y') {
            cusInfoCount++;
        }
        if (cusInfoCount > 0) {
            waringForIndicator = true;
        }
        
        let lastUpdateDate;
        let erroIconSolid;
        let normalIconForKE;
        let tableHeader;
        let warningForKE;
         {/*control show or hide error message for K&E*/}
        if(lastDateTime===""||lastDateTime==undefined){
            lastUpdateDate = "N/A"
            erroIconSolid =(<FontIcon icon="circle-error-solid" className={styles.erroIconSolid} />);
            warningForKE=(<div className={styles.warning}>
                            <FontIcon icon="circle-error" className={styles.erroIcon} /> 
                            <p className={styles.warningMsg}>You have not yet done invesment and insurance knowledge questionaire.</p>
                        </div>);
            this.state.showKnResult = false;
        }else{
            normalIconForKE =(<FontIcon icon="circle-confirmation-solid" className={styles.confirmIconSolid} />);
            lastUpdateDate=FormatHelper.dateFormatPattern(lastDateTime,dateTimeFormat.DATE_FORMAT);
            tableHeader=(<tr>
                            <th></th>
                            <th><FormattedMessage id="dashboard.L_KnE_K"/></th>
                            <th><FormattedMessage id="dashboard.L_KnE_E"/></th>
                        </tr>);
            this.state.showKnResult = true;
        }
        // const lastModified=FormatHelper.dateFormatPattern(fna.lastModified,dateTimeFormat.DATE_FORMAT);

        {/*control show or hide error message for important Indicator*/}
        let normalIconFontIconForIndicator;
        let normalIconFontForIndicator;
        let normalIconFontConfirmForIndicator;
        let errorIconForIndicator;
        let countryNationalityValue;
        let occupationValue;
        let educationLevelValue ;
        let depositConsent;
        let cusValue = 3;
        var cusBool = false;
        for(const cus in customerInfo){
            cusBool = true;
            if(customerInfo[cus]==undefined){
                cusValue--;
            }
        }
        //show warning message
        if(cusBool&&cusValue!=0){
            console.log("customerInfo--else----------"+customerInfo.occupationValue);
            normalIconFontIconForIndicator = (<FontIcon icon="alert" className={classNames(styles.alerticon)}/>);
            normalIconFontForIndicator = (<font className={styles.fontColor}>|</font>);
            normalIconFontConfirmForIndicator = (<FontIcon icon="circle-confirmation-solid" className={styles.confirmIconSolid} />);
            countryNationalityValue = customerInfo.countryNationalityValue;
            occupationValue = customerInfo.occupationValue;
            educationLevelValue = customerInfo.educationLevelValue;
            depositConsent = (<FontIcon icon="agree" className={styles.agree} />);
        }else{
            errorIconForIndicator = (<FontIcon icon="circle-error-solid" className={styles.erroIconSolid} />);
            countryNationalityValue="N/A";
            occupationValue="N/A";
            educationLevelValue="N/A";
            depositConsent="N/A";
            console.log("customerInfo------------"+customerInfo)
        }
       

        console.log("lastModified:",lastModified);
        return (
            <div className={styles.riskProfilePage}>
                <div className={classNames(styles.moduleOne, styles.clearfix)}>
                    <div className={styles.contLeft}>
                        <p className={styles.riskProfile}>
                            <a id="goToRiskProfileLink" href="javascript:void(0);" onClick={this.goToRTQPageHandle}>
                                <FormattedMessage id="dashboard.L_Risk_Profiles"/><profiling></profiling>
                                <FontIcon icon="chevron-right" className={classNames(styles.icon, styles.viewEdit)} />
                            </a>
                            {/*
                            {normalIcon}
                            {erroIcon}*/}
                        </p>
                        <p id="landingRiskProfileExpireDate" className={styles.expiryDate}><FormattedMessage id="dashboard.L_expiry_date"/> : {expireDate}</p>
                        
                        {/*<Button  value="Dashboard Demo" onClick={this.clickButtonForDashboardInitData} />*/}
                        {/*<Button  value="flowDemo" onClick={this.clickButtonflowDemo} />*/}
                        {content}
                        {/*<p className={styles.adventurous}>{rtqResult.riskLeverDescription}</p>*/}
                        {details}
                    </div>
                    <div className={styles.contMiddle}>
                        <p className={styles.riskProfile}>
                            <a id="goToKnowledgeAndExperienceLink" href="javascript:void(0);" onClick={this.goToKEPageHandle}>
                                <FormattedMessage id="dashboard.L_question_KnE"/>
                                <FontIcon icon="chevron-right" className={classNames(styles.icon, styles.viewEdit)} />
                            </a>
                            {/*
                            {normalIconForKE}
                            {erroIconSolid}*/}
                        </p>
                        <p className={styles.lastDate}><FormattedMessage id="dashboard.L_last_updated"/> : {lastUpdateDate}</p>
                        <table>
                            {tableHeader}
                            {this.state.showKnResult?
                                (keResult == undefined || keResult.length == 0) ? null : keResult.map(function(item,index){
                                    
                                    return (<tr key={index}>
                                            <td>{item.context}</td>
                                            <td><FontIcon icon={item.result=='D'||item.result=='C'||item.result=='B'?"agree":"delete"} className={classNames(styles.icon, item.result=='D'||item.result=='C'||item.result=='B'?styles.iconConfirmation:styles.iconDelete)} /></td>
                                            <td><FontIcon icon={item.result=='C'||item.result=='D'?"agree":"delete"} className={classNames(styles.icon, item.result=='C'||item.result=='D'?styles.iconConfirmation:styles.iconDelete)} /></td>
                                        </tr>  
                                    )   
                                },this)
                                :null
                            }
                        </table>
                        {warningForKE}
                    </div>
                    <div className={styles.contright}>
                        <p className={styles.riskProfile}><FormattedMessage id="dashboard.L_Important_indicators"/>
                            {/*<a href=""><FontIcon icon="chevron-right" className={classNames(styles.icon, styles.viewEdit)} /></a>*/}
                            {/*<FontIcon icon="alert" className={classNames(styles.alerticon)}/><font className={styles.fontColor}>|</font>*/}
                            {/*waringForIndicator?<FontIcon icon="circle-confirmation-solid" className={styles.confirmIconSolid}/>:                            
                            <FontIcon icon="circle-error-solid" className={styles.erroIconSolid} />*/}
                        </p>
                        <table>
                            <tr>
                                <th><FormattedMessage id="dashboard.L_Indicators"/></th>
                                <th><FormattedMessage id="dashboard.L_Status"/></th>
                            </tr>
                            <tr>
                                <td><FormattedMessage id="dashboard.L_Nationality"/></td>
                                {customerInfo.countryNationalityCode==undefined?<td>N/A</td>:<td><FormattedMessage id={customerInfo.countryNationalityCode}/></td>}
                            </tr>
                            <tr> 
                                <td><FormattedMessage id="dashboard.L_Occupation"/></td>
                                {customerInfo.occupationCode==undefined?<td>N/A</td>:<td><FormattedMessage id={customerInfo.occupationCode}/></td>}
                            </tr>
                            <tr>
                                <td><FormattedMessage id="dashboard.L_Education"/></td>
                                {customerInfo.educationLevelCode==undefined?<td>N/A</td>:<td><FormattedMessage id={customerInfo.educationLevelCode}/></td>}
                            </tr>
                            <tr>
                                <td><FormattedMessage id="dashboard.L_Deposit_Consent"/></td>
                                {depositeConstentCode == 'Y'?<td><FontIcon icon="agree" className={classNames(styles.tickagree)} /></td> :
                                <td><FontIcon icon="delete" className={classNames(styles.crosswrong)} /></td>}
                            </tr>
                        </table>
                    </div>
                </div>
                <div className={classNames(styles.moduleTwo, styles.clearfix)}>
                    <div id="financialProfileSummaryPanel" className={styles.financialProfile}>
                        <p className={styles.rowList}>
                            <span className={styles.listName}>
                                <a id="goToFinanicalProfileLink" href="javascript:void(0);" onClick={this.goToFinancialProfilePageHandle}>
                                    <FormattedMessage id="dashboard.L_Financial_Profile"/>
                                    <FontIcon icon="chevron-right" className={classNames(styles.icon, styles.viewEdit)} />
                                </a>
                            </span><br />
                        </p>
                        <p className={styles.dateModify}><FormattedMessage id="dashboard.L_Date_last_modified"/> : {lastModified}</p>
                        <table>
                            <tr>
                                <th><FormattedMessage id="dashboard.L_Monthly_Saving"/></th>
                                <th><FormattedMessage id="dashboard.L_AMOUNT"/></th>
                            </tr>
                            <tr>
                                <td><FormattedMessage id="dashboard.L_Total_Monthly_Income"/></td>
                                <td id="financialProfileSummaryPanel_incomeAmount">{incomeAmount}</td>
                            </tr>
                            <tr>
                                <td><FormattedMessage id="dashboard.L_Total_Monthly_Expenses"/></td>
                                <td id="financialProfileSummaryPanel_expenseAmount">{expenseAmount}</td>
                            </tr>
                            <tr>
                                <td className={styles.fontStrong}><FormattedMessage id="dashboard.L_Monthly_Saving"/>&nbsp;<span className={styles.small}><FormattedMessage id="dashboard.L_Monthly_Saving_supplement"/></span></td>
                                <td id="financialProfileSummaryPanel_moSavingsAmount" className={styles.fontStrong}>{moSavingsAmount}</td>
                            </tr>
                        {/*</table>
                        <table>*/}
                            <tr  className={styles.titleTable}>
                                <th><FormattedMessage id="dashboard.L_Net_worth"/></th>
                                <th><FormattedMessage id="dashboard.L_AMOUNT"/></th>
                            </tr>
                            <tr>
                                <td><FormattedMessage id="dashboard.L_Assets"/>&nbsp;<span className={styles.small}><FormattedMessage id="dashboard.L_Assets_supplement"/></span></td>
                                <td id="financialProfileSummaryPanel_assetsAmount">{assetsAmount}</td>
                            </tr>
                            <tr>
                                <td><FormattedMessage id="dashboard.L_Liabilities"/></td>
                                <td id="financialProfileSummaryPanel_liabilityAmount">{liabilityAmount}</td>
                            </tr>
                            <tr>
                                <td className={styles.fontStrong}><FormattedMessage id="dashboard.L_Net_worth"/></td>
                                <td id="financialProfileSummaryPanel_netWorthAmount" className={styles.fontStrong}>{netWorthAmount}</td>
                            </tr>
                        </table>        
                        {/*<p className={classNames(styles.rowList, styles.mt20)}>
                            <span className={styles.listType}>Total monthly income</span><br />
                            <span className={styles.listDate}>{income.currencyCode} {income.amount}</span>
                        </p>
                        <p className={styles.rowList}>
                            <span className={styles.listType}>Total monthly expenses</span><br />
                            <span className={styles.listDate}>{expense.currencyCode} {expense.amount}</span>
                        </p>
                        <p className={styles.rowList}>
                            <strong>
                                <span className={styles.listType}>Monthly savings (Disposable Income)</span><br />
                                <span className={styles.listDate}>{MoSavings.currencyCode} {MoSavings.amount}</span>
                            </strong>
                        </p>
                        <p className={classNames(styles.rowList, styles.mt20)}>
                            <span className={styles.listType}>Assets(excl. self-use property)</span><br />
                            <span className={styles.listDate}>{assets.currencyCode} {assets.amount}</span>
                        </p>
                        <p className={styles.rowList}>
                            <span className={styles.listType}>Liabilities</span><br />
                            <span className={styles.listDate}>{liability.currencyCode} {liability.amount}</span>
                        </p>
                        <p className={styles.rowList}>
                            <strong>
                                <span className={styles.listType}>Net worth</span><br />
                                <span className={styles.listDate}>{NetWorth.currencyCode} {NetWorth.amount}</span>
                            </strong>
                        </p>*/}
             
                        {/*<p className={styles.insurance}>
                            <a href="javascript:;" className={classNames(styles.viewEdit, styles.insureName)} onClick={this.goToIns}>Go to Simplified Insurance
                                <FontIcon icon="chevron-right" className={styles.icon} />
                            </a>
                            <span className={styles.text}>
                                Lorem ipsum dolor sit amet,consectetur adipiscing elit. Vestibulum in ante a ante accumsan tincidunt.
                                Phasellus tristique vitae justo ut eleifend.
                            </span>
                        </p>*/}
                    </div>
                    <div className={styles.dataDisplay}>
                        <div className={styles.updateBtn}>
                            <a href="javascript:void(0);" onClick={this.goToFinancialProfilePageHandle}><FormattedMessage id="dashboard.L_update_financial_profile"/></a>   
                            {normalIconForFinancial}
                            {erroIconForFinancial}
                        </div>
                        {/*
                        <div className={styles.picShow}>
                            <div className={styles.warning}>
                                <FontIcon icon="circle-error" className={styles.erroIcon} /> 
                                <p className={styles.warningMsg}><FormattedMessage id="dashboard.L_No_graph"/></p>
                            </div>
                        </div>*/}
                        <div className={styles.Assests}>
                            <table>
                                <tr>
                                    <th><FormattedMessage id="dashboard.L_Assets_mix"/></th>
                                    <th><FormattedMessage id="dashboard.L_AMOUNT"/></th>
                                </tr>
                                <tr>
                                    <td><FormattedMessage id="dashboard.L_UT_holdings"/></td>
                                    <td id="financialProfileSummaryPanel_incomeAmount">10% (HKD 50,000.00)</td>
                                </tr>
                                    <tr>
                                    <td><FormattedMessage id="dashboard.L_Bond_CD_holding"/></td>
                                    <td id="financialProfileSummaryPanel_incomeAmount">10% (HKD 50,000.00)</td>
                                </tr>
                                    <tr>
                                    <td><FormattedMessage id="dashboard.L_Structured_product_holding"/></td>
                                    <td id="financialProfileSummaryPanel_incomeAmount">10% (HKD 50,000.00)</td>
                                </tr>
                                    <tr>
                                    <td><FormattedMessage id="dashboard.L_SID_holding"/></td>
                                    <td id="financialProfileSummaryPanel_incomeAmount">10% (HKD 50,000.00)</td>
                                </tr>
                                    <tr>
                                    <td><FormattedMessage id="dashboard.L_High_yield_bond_fund_holding"/></td>
                                    <td id="financialProfileSummaryPanel_incomeAmount">{highYieldBondFundAmountCode}&nbsp;{highYieldBondFundHoldingValue}</td>
                                </tr>
                                    <tr>
                                    <td><FormattedMessage id="dashboard.L_High_yield_bond_holding"/></td>
                                    <td id="financialProfileSummaryPanel_incomeAmount">{highYieldBondAmountCode}&nbsp;{highYieldBondHoldingValue}</td>
                                </tr>
                                <tr>
                                    <td><FormattedMessage id="dashboard.L_ELI_holding"/></td>
                                    <td id="financialProfileSummaryPanel_incomeAmount">10% (HKD 50,000.00)</td>
                                </tr>
                                <tr>
                                    <td><FormattedMessage id="dashboard.L_Derivative_Fund_holding"/></td>
                                    <td id="financialProfileSummaryPanel_incomeAmount">{derivativeFundAmountCode}&nbsp;{derivativeFundHoldingValue}</td>
                                </tr>
                                <tr>
                                    <td><FormattedMessage id="dashboard.L_Subordinated_Bond_holding"/></td>
                                    <td id="financialProfileSummaryPanel_incomeAmount">{subordinatedBondAmountCode}&nbsp;{subordinatedBondHoldingValue}</td>
                                </tr>
                                <tr>
                                    <td><FormattedMessage id="dashboard.L_DPS_holding"/></td>
                                    <td id="financialProfileSummaryPanel_incomeAmount">10% (HKD 50,000.00)</td>
                                </tr>
                            </table>
                        </div>
                        <div className={styles.update}>
                            <div className={styles.updateDescript}><FormattedMessage id="dashboard.L_To_allow_for_holistic_conisderation"/></div>
                        </div>
                        {/*<p className={styles.insurance}>
                            <a href="javascript:;" className={classNames(styles.viewEdit, styles.insureName)} onClick={this.goToInv} >Go to Simplified investments
                                <FontIcon icon="chevron-right" className={styles.icon} />
                            </a>
                            <span className={styles.text}>
                                If you solely have wealth accumulation needs without a target and are looking for invesment solutions,you may use the simplified investment journey.
                            </span>
                        </p>*/}
                    </div>
                   
                </div>

            </div>
            
        );
    }
};


export default withLoadingScreenBeforeReadyToLeave(injectIntl(riskProfile))