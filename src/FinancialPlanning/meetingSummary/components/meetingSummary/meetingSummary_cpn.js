import React, { Component } from 'react';
import Notification from 'wealth/lib/web/components/ui/notification';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import _ from "lodash";
import classNames from 'classnames';
import styles from './style.scss';
import withLoadingScreenBeforeReadyToLeave
    from '../../../../common/components/trading/withLoadingScreenBeforeReadyToLeave';
import {FormattedMessage, injectIntl} from "react-intl";
import "../../../../common/util/extend";
import {logon} from '../../../../logon';
import Tab from 'wealth/lib/web/components/widgets/tab';
import Popup from 'wealth/lib/web/components/widgets/popup';
import { browserHistory } from 'react-router';
import FormatHelper from 'common/lib/formatHelper';
import dateTimeFormat from '../../../../config/dateTimeFormat';
import ProductTable,{ Column }  from 'common/components/table/ProductsTable';
import ObjectHelper from '../../../../common/lib/ObjectHelper';
import UIStyles from '../../../../Sample/components/ui.scss';
import disStyle from '../solutionAlternativesPanel/style.scss';
import {RadioButton, Checkbox,Textarea } from 'CommonUI/Form' 
import InsPodModal from './overlayPanel/insPodOverlay/Modal';
import GoalTypeDifferentOverlay from './overlayPanel/differentGoalTypeOverlay/Modal';
import AbsenceGoalOverlay from './overlayPanel/absenceGoalOverlay/Modal';
import InvStickyHeader from '../productListPanel/invProTable/invStickyHeader';
import InsStickyHeader from '../productListPanel/insProTable/insStickyHeader';
import invBoStyle from '../productListPanel/invProTable/style.scss';
import insBoStyle from '../productListPanel/insProTable/style.scss';
import ProductCodeName from '../productListPanel/prodouctCodeName';
import RiskRating from '../productListPanel/riskRating';
import ProductCurrency from '../productListPanel/productCurrency';
import InitialAmount from '../productListPanel/initialAmount';
import MonthlyAmount from '../productListPanel/monthlyAmount';

import StickyHeader from '../solutionAlternativesPanel/stickyHeader/';
import ProductName from '../solutionAlternativesPanel/productName/productName';
import RiskingRating from '../solutionAlternativesPanel/riskingRating';
import ProductType from '../solutionAlternativesPanel/productType/productType';
import ProductCurrencyAlternativesPod from '../solutionAlternativesPanel/productCurrency';



//import { LONG_LOCALES, NLS } from "../../../../locale/constant";
//import {enConfig} from '../../../../locale/FinancialPlanning/landing/index/en-gb';
//import {zh_hkConfig} from '../../../../locale/FinancialPlanning/landing/index/zh-hk';
//import {zh_cnConfig} from '../../../../locale/FinancialPlanning/landing/index/zh-cn';
//import RouteHelper from '../../../../common/lib/routeHelper';

export default class meetingSummary extends Component { 
    constructor (props) {
        super(props);
        this.Constant ={currentIndex:""}
        this.getCurrentLocale = this.getCurrentLocale.bind(this);
        this.checkLocal=this.checkLocal.bind(this);
        this.goToReportPage=this.goToReportPage.bind(this);
        this.state = {
             insOverlay:'',
             goalTypeAgreement:'',
             absenceGoalOverlay:'',
             checkboxMap:{},
             insOverlayIsShow:false,
             differentGoalTypeOverlayIsShow:false,
             absenceGoalOverlayIsShow:false,
            // currentIndex:''
              data:[
                    [{alternativeProductAttributeValue:"U62459",productName:"AB-American Income Portfolio…",productId:"0"},{alternativeProductAttributeValue:"HSBC CIT - HSBC asia pacific ex japan eq volatility"},{alternativeProductAttributeValue:"3"}],
                    [{alternativeProductAttributeValue:"U62459",productName:"AB-American Income Portfolio…",productId:"1"},{alternativeProductAttributeValue:"Certificates of Deposit"},{alternativeProductAttributeValue:"4"}],
                    [{alternativeProductAttributeValue:"U62459",productName:"AB-American Income Portfolio…",productId:"2"},{alternativeProductAttributeValue:"HSBC CIT - HSBC asia pacific ex japan eq volatility"},{alternativeProductAttributeValue:"1"}],
                    [{alternativeProductAttributeValue:"U62459",productName:"AB-American Income Portfolio…",productId:"3"},{alternativeProductAttributeValue:"Certificates of Deposit"},{alternativeProductAttributeValue:"2"}]]
        };
        this.showInvolvedPartyDetail = this.showInvolvedPartyDetail.bind(this);
        this.retrieveQuestionnaireSummary = this.retrieveQuestionnaireSummary.bind(this);
        this.meetingSummaryFinancialProfile = this.meetingSummaryFinancialProfile.bind(this); 
        this.retrieveGoalSummaryList = this.retrieveGoalSummaryList.bind(this);
        this.showDetail = this.showDetail.bind(this); 
        this.meetingSummaryRetrieveGoalDetail = this.meetingSummaryRetrieveGoalDetail.bind(this); 
        this.CheckIndicator = this.CheckIndicator.bind(this); 
        this.generateReport=this.generateReport.bind(this); 
        this.clickCancelButton=this.clickCancelButton.bind(this); 
        this.clickInsOverlayConfirm=this.clickInsOverlayConfirm.bind(this);       
         
          
    }

   componentWillReceiveProps(nextProps) {
        if(this.state.meetingSummaryRetrieveGoalSummarylist == undefined ){
            this.setState({
                meetingSummaryRetrieveGoalSummarylist:nextProps.meetingSummaryRetrieveGoalSummarylist
            })
          } else {
            let meetingSummaryRetrieveGoalSummarylist = nextProps.meetingSummaryRetrieveGoalSummarylist;
            if(this.Constant.currentIndex !==""){
                _.each(meetingSummaryRetrieveGoalSummarylist,(goal)=>{
                    if(goal.goalKey.goalSequenceNumber==this.Constant.currentIndex){
                     goal['meetingSummaryretrieveGoalDetails'] = nextProps.meetingSummaryretrieveGoalDetails;
                     this.setState({
                     meetingSummaryRetrieveGoalSummarylist
                   })
                 }
              })
            }
        }
    }
    CheckIndicator(event,isChecked,goalKey){
        this.meetingSummaryRetrieveGoalDetail(goalKey.arrangementIdentifierFinancialPlanning,goalKey.goalSequenceNumber); 
        const checkboxMap=this.state.checkboxMap;
         _.each(this.state.meetingSummaryRetrieveGoalSummarylist,goal=>{
              if(goal.goalKey.goalSequenceNumber==goalKey.goalSequenceNumber){
                     if(isChecked){
                        checkboxMap[goalKey.goalSequenceNumber]=goal;
                    }else{
                        delete checkboxMap[goalKey.goalSequenceNumber];
                    }
              }   
      })
      this.setState({checkboxMap});
    }
    generateReport(){
        console.log("BCNVNVBVBBVVSSSSSSSSSSSSSSSS,",this.state.absenceGoalOverlay)
         let  invSelectdeGoalType=[],insSelectdeGoalType=[],fullSelectdeGoalType=[];
         let insOverlay=this.state.insOverlay
         let goalTypeAgreement=this.state.goalTypeAgreement
         let absenceGoalOverlay=this.state.absenceGoalOverlay
        //  let goalDetailList=[];
         const checkboxMap=this.state.checkboxMap;
         const selectGenReoprtGoal =_.values(checkboxMap);
          _.each(selectGenReoprtGoal,(goal)=>{
             if(goal.meetingSummaryretrieveGoalDetails.insProductList.length>0){
                insOverlay =true
              }else{
                insOverlay =false
              }
         })
         this.setState({insOverlay});
          _.each(selectGenReoprtGoal,(goal)=>{

           if(goal.goalType =="SP_PROD_NEED"){
               invSelectdeGoalType.push(goal.goalType)
           }else if(goal.goalType =="INS_JOURNEY"){
               insSelectdeGoalType.push(goal.goalType)
           }else{
               fullSelectdeGoalType.push(goal.goalType) //include goal type(POST_RTIRE /GROW_WLTH/ EDUC/RTIRE LIFE_PROTC)
           }
        })
        
            if(fullSelectdeGoalType.length>0 && invSelectdeGoalType.length==0 && insSelectdeGoalType.length==0){
                goalTypeAgreement=true;
            }else if(fullSelectdeGoalType.length==0 && invSelectdeGoalType.length>0 && insSelectdeGoalType.length==0){
                goalTypeAgreement=true;
            }else if(fullSelectdeGoalType.length==0 && invSelectdeGoalType.length==0 && insSelectdeGoalType.length>0){
                goalTypeAgreement=true;
            } else{
                goalTypeAgreement=false;
            }

            if(fullSelectdeGoalType.length==0 && invSelectdeGoalType.length==0 && insSelectdeGoalType.length==0){
             absenceGoalOverlay=true  
            }else{
             absenceGoalOverlay=false  
            }

            this.setState({absenceGoalOverlay});
            this.setState({goalTypeAgreement});
            this.checkOverlayIsShow(absenceGoalOverlay,insOverlay,goalTypeAgreement);
            console.log("goalDetailListXXXXXXXXXxXX1:",selectGenReoprtGoal);
            console.log("goalDetailListXXXXXXXXXxXX2:",insOverlay);
            console.log("goalDetailListXXXXXXXXXxXX3:",goalTypeAgreement); 
    }
     checkOverlayIsShow(absenceGoalOverlay,insOverlay,goalTypeAgreement){
         let insOverlayIsShow = this.state.insOverlayIsShow;
         let differentGoalTypeOverlayIsShow=this.state.differentGoalTypeOverlayIsShow
         let absenceGoalOverlayIsShow=this.state.absenceGoalOverlayIsShow
         if(absenceGoalOverlay){
            absenceGoalOverlayIsShow=true
            this.setState({absenceGoalOverlayIsShow});
         }else{
            if(insOverlay){
             insOverlayIsShow=true
             this.setState({insOverlayIsShow});
            }else{
                if(goalTypeAgreement){
                alert("go to gen Report")
                 this.startGenReport();
                }else{
                differentGoalTypeOverlayIsShow=true;
                this.setState({differentGoalTypeOverlayIsShow});
             }
           }
        }
     }
    clickCancelButton(overlayID){
        let insOverlayIsShow =this.state.insOverlayIsShow
        let differentGoalTypeOverlayIsShow= this.state.differentGoalTypeOverlayIsShow
        let absenceGoalOverlayIsShow= this.state.absenceGoalOverlayIsShow
        if(overlayID=='insOverlayIsShow'){
         insOverlayIsShow=false;
         this.setState({insOverlayIsShow})
        }else if(overlayID=='differentGoalTypeOverlayIsShow'){
         differentGoalTypeOverlayIsShow=false;
         insOverlayIsShow=false;
         this.setState({insOverlayIsShow})
         this.setState({differentGoalTypeOverlayIsShow})
        }else if(overlayID=="AbsenceGoalOverlay"){
         absenceGoalOverlayIsShow=false;
         this.setState({absenceGoalOverlayIsShow});
          console.log("BCNVNVBVBBVVSSSSSSSSSSSSSSSS cancellllllllllll,",this.state.absenceGoalOverlayIsShow)
        }
    }
     clickInsOverlayConfirm(){
      let goalTypeAgreement=this.state.goalTypeAgreement;
      let differentGoalTypeOverlayIsShow=this.state.differentGoalTypeOverlayIsShow
      if(goalTypeAgreement){
          //go to aff page
          alert("go to aff page")
          this.goToAffordability()
       }else{
         differentGoalTypeOverlayIsShow=true;
         this.setState({differentGoalTypeOverlayIsShow});
       }
     }
    goToAffordability(){
       const target = '/group-sfp-war/main/en-gb/affordability';
        browserHistory.push(target) 
    }
    startGenReport(){
          const request = {
            customers: [],
        	goalKey: [{
                arrangementIdentifierFinancialPlanning: "340100",
                goalSequenceNumber: "24002"
            },
            {
                arrangementIdentifierFinancialPlanning: "340100",
                goalSequenceNumber: "24003"
            }],
            meetingSummaryDetail: {
            reportGenerationCommentText: "",
            reportCoverLetterKey: "F",
            includeAffordabilityDeclarationIndicator: "N",
            reportAffordabilityReasonCode: "",
            reportAffordabilityReasonText: "",
            reportActionCode: "G",
            reportType: "F"
	       },
           reportAdditionalInformation: [],
        	reportAdditionalDetails: [{
		    key: "IP_ADDRESS",
		    value: "130.45.17.168"
	   }],
    	   localeCode: {
    		localeCode: "en_US"
         	}
        }
    }
    getCurrentLocale() {
        const { routing } = this.props;
        const pathname = routing.locationBeforeTransitions.pathname;
        console.log("pathname..",pathname);
        const path = RouteHelper.newformatPath(pathname);  
        console.log("basePath..",path.basePath); 
        console.log("locale..",path.locale); 
        return path.locale;
    }
    componentWillMount(){
      console.log("meeting summary componentWillMount.. show customer info");
        this.showInvolvedPartyDetail();
        this.retrieveQuestionnaireSummary();
        this.meetingSummaryFinancialProfile();
        this.retrieveGoalSummaryList();
    }
    showDetail(arrId,goalSequenceNumber){
        const meetingSummaryRetrieveGoalSummarylist= this.state.meetingSummaryRetrieveGoalSummarylist;
         _.each(meetingSummaryRetrieveGoalSummarylist,(goal)=>{
                if(goal.goalKey.goalSequenceNumber==goalSequenceNumber){
                      if(goal.isShow==false ){
                            this.meetingSummaryRetrieveGoalDetail(arrId,goalSequenceNumber); 
                            goal.isShow=true;
                            this.setState({
                                    meetingSummaryRetrieveGoalSummarylist:this.state.meetingSummaryRetrieveGoalSummarylist
                                });
                        }else {
                          goal.isShow=false;
                          this.setState({
                                    meetingSummaryRetrieveGoalSummarylist:this.state.meetingSummaryRetrieveGoalSummarylist
                                });
                            }
                      }
                  })
        }
     meetingSummaryRetrieveGoalDetail(arrId,goalSequenceNumber){
        console.log("call back Main :"+ arrId + ":" + goalSequenceNumber);
        this.Constant.currentIndex = goalSequenceNumber;
        const request = {
         customers: [],
          localeCode : {
                localeCode: "en_US"
            },
            goalKey: {
                arrangementIdentifierFinancialPlanning : arrId,
                goalSequenceNumber: goalSequenceNumber
            },
            subserviceId: [{
                    functionOutputCode: "SUMMARY"
                },
                {
                    functionOutputCode: "SELDTL"
                },
                {
                    functionOutputCode: "AFFORD"
                },
                {
                    functionOutputCode: "PIQDTL"
                },
                {
                    functionOutputCode: "NOTES"
                },
                {
                    functionOutputCode: "STATUS"
                },
                {
                    functionOutputCode: "DECLARE"
                },
                {
                    functionOutputCode: "CPRODLIST"
                },
                {
                    functionOutputCode: "INVIND"
                },
                {
                    functionOutputCode: "EXISTHOL"
                },
                {
                    functionOutputCode: "COMMENT"
                }
            ],
            requestInvestorIndicator : [{
                    indicatorKey: "INV"
                }, {
                    indicatorKey : "AIPI"
                }
            ]
        }
        this.props.retrieveGoalDetail(request);
    }

     retrieveGoalSummaryList (){
        const request = {
            customers: [],
        	filteringCriteria: [{
    		filteringKey: "PLANTYPE",
    		filteringValue: "S",
    		operation: "AND",
    		sequence: "0"
         	},
            {
            filteringKey: "GOALSTATUS",
            filteringValue: "S_C",
            operation: "AND",
            sequence: "0"
            }],
    	   localeCode: {
    		localeCode: "en_US"
         	}
        }
        
        this.props.retrieveGoalList(request);
    }
    retrieveQuestionnaireSummary(){
     console.log('meeting summary retrieveQuestionnaireSummary..');
     let sessionInfo = this.props.session
     let rtqHistoricalParams = {sessionInfo}
     this.props.getHistoricalRecords(rtqHistoricalParams);
    }
    meetingSummaryFinancialProfile(){
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
          this.props.meetingSummaryFNAData(fnaParams);
    }

      showInvolvedPartyDetail() {
       console.log("meeting summary showInvolvedPartyDetail.. ",this.props.session.customerId);     
         let ipDetailRequest = {
            cdmBusinessObjectIdentification: {
                businessObjectType: "IP",
                externalReferenceNumber: this.props.session.customerId
              // externalReferenceNumber: '344435'
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
			 fieldKeys:["HSBC_DEPOSIT_CONSENT_INDICATOR"]
         };
        this.props.initInvolvedPartyDetail(ipDetailRequest,assetsParams);
    }
    checkLocal(){
        // add language to constant
        const dataEN=enConfig
        const dataHK=zh_hkConfig
        const dataCN=zh_cnConfig
        const locale = this.getCurrentLocale();
        if(locale === 'zh-cn'){
            return dataCN;
        }else if(locale === 'zh-hk'){
            return dataHK;
        }else{
            //default en-gb
            return dataEN;
        }
    }
    goToReportPage(){
        const target ="/group-sfp-war/main/en-gb/report";
        browserHistory.push(target);
    }
    render () {
          const {
            customerInfo,
            historyRecords,
            fnaResult,
            meetingSummaryRetrieveGoalSummarylist,
            meetingSummaryretrieveGoalDetails
       } = this.props;
       console.log("meetingSummaryRetrieveGoalSummarylist NNNNNNNn",meetingSummaryRetrieveGoalSummarylist)
        const  _this =this ;
         const generatingSummaryContent = (
            <div className={styles.popContent}>
                <div className={styles.popGenerate}>
                    <div className={styles.header}>
                       <h3 className={styles.title}><span className={styles.titleCtn}>Script generating summary</span></h3>
                       <p className={styles.content}>The data below has been scrapped. Please go to the script generator to complete audio agreement.</p>
                    </div>
                    
                    <div className={styles.popTable}>
                        <p className={styles.tableTitle}>Protecting planning ID:20160606</p>
                        <table>
                            <tr>
                                <th>Plan</th>
                                <th>&nbsp;</th>
                            </tr>
                            <tr>
                                <td>Goal type</td>
                                <td>Retirement</td>
                            </tr>
                            <tr>
                                <td>Investment period</td>
                                <td>3 years</td>
                            </tr>
                            <tr>
                                <td>Customer's RPQ</td>
                                <td>Adventurous</td>
                            </tr>
                        </table>
                    </div>
                    <div className={styles.popTable}>
                        <p className={styles.tableTitle}>Investment product</p>
                        <table>
                            <tr>
                                <th>Product1</th>
                                <th>&nbsp;</th>
                            </tr>
                            <tr>
                                <td>Found code</td>
                                <td>#U62630</td>
                            </tr>
                            <tr>
                                <td>Product name</td>
                                <td>AB-American Income Profolio (AT-SGDH-MDIST Cash)</td>
                            </tr>
                            <tr>
                                <td>Product risk level</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>Product currency</td>
                                <td>HKD</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <th>Product2</th>
                                <th>&nbsp;</th>
                            </tr>
                            <tr>
                                <td>Found code</td>
                                <td>#U62630</td>
                            </tr>
                            <tr>
                                <td>Product name</td>
                                <td>AB-American Income Profolio (AT-SGDH-MDIST Cash)</td>
                            </tr>
                            <tr>
                                <td>Product risk level</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>Product currency</td>
                                <td>HKD</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
        const {
            stickyHeight,
            isApiError,
            fatalErrorHide,
            showApiCallingError,
            errorInfo,
            router,
            params={},
            intl
        } = this.props
        //format customer birth
        let birthDate=FormatHelper.dateFormatPattern(customerInfo.birthDate,dateTimeFormat.DATE_FORMAT);
        //get meeting summary risk
        let riskLever= historyRecords.meetingSummaryRisk
        let riskDesc= historyRecords.riskDesc
        //get FNA data
        let income={ }, expense={ },assets={ },investment={ },liability={ },MoSavings={},NetWorth={ },lastModified
        let incomeAmount,expenseAmount,moSavingsAmount,assetsAmount,liabilityAmount,netWorthAmount,erroIconForFinancial,normalIconForFinancial;
        if(fnaResult.length>=1){
            lastModified=FormatHelper.dateFormatPattern(fnaResult[0].reviewDateTime,dateTimeFormat.DATE_FORMAT);
             let financialSituation=fnaResult[0].financialSituation;
             income=financialSituation.income.total;
             NetWorth=financialSituation.netWorth;
             assets=financialSituation.assets.totalLiquidAssets;
             liability=financialSituation.liability.total
             expense=financialSituation.expense.total;
             investment=financialSituation.investment.total;
             MoSavings=financialSituation.surplus;
            //  console.log("cpn income ",JSON.stringify(income) );
            //  console.log("cpn netWorth ",JSON.stringify(NetWorth) );
            //  console.log("cpn assets ",JSON.stringify(assets) );
            //  console.log("cpn expense ",JSON.stringify(expense) );
            //  console.log("cpn investment ",JSON.stringify(investment) );
            //  console.log("cpn MoSavings ",JSON.stringify(MoSavings) );
             incomeAmount = "HKD " + [FormatHelper.addThousandSeparator(income.amount)];
             expenseAmount ="HKD " + [FormatHelper.addThousandSeparator(expense.amount)];
             moSavingsAmount = "HKD " + [FormatHelper.addThousandSeparator(MoSavings.amount)];
             assetsAmount = "HKD " + [FormatHelper.addThousandSeparator(assets.amount)];
             liabilityAmount = "HKD " + [FormatHelper.addThousandSeparator(liability.amount)];
             netWorthAmount = "HKD " + [FormatHelper.addThousandSeparator(NetWorth.amount)];
             normalIconForFinancial=(<FontIcon icon="circle-confirmation-solid" className={styles.confirmIconSolid} />);
        }else{
             incomeAmount = "N/A";
             expenseAmount = "N/A";
             moSavingsAmount = "N/A";
             assetsAmount = "N/A";
             liabilityAmount = "N/A";
             netWorthAmount = "N/A";
             erroIconForFinancial = (<FontIcon icon="circle-error-solid" className={styles.erroIconSolid} />);
             //warningForFinancial = ();
        }
        return (
            <div className={styles.mainBackground}>
                <div className={styles.titlte}>
                    <p className={styles.theme}>Meeting summary</p>
                    {/*<p className={styles.date}>Created on:07/20/2017</p>*/}
                </div>
                <div className={styles.tables}>
                    <div className={styles.left}>
                        <div className={styles.tableTitle}>
                            <p className={styles.tabTheme}>Customer Profile</p>
                            <p className={styles.details}>Please check that the customer's personal information is up to date and correct.</p>
                        </div>
                         <div className={styles.customerTab}>
                            <table>
                                <tr>
                                    <td>Name</td>
                                   {customerInfo.customerForename==undefined?<td>N/A</td>:<td>{customerInfo.customerForename}/></td>}
                                </tr>
                                <tr>
                                    <td>Passport/ID number</td>
                                    {customerInfo.documentIdentityNumber==undefined?<td>N/A</td>:<td>{customerInfo.documentIdentityNumber}/></td>}
                                </tr>
                                <tr>
                                    <td>Date of birth</td>
                                    {birthDate==undefined?<td>N/A</td>:<td>{birthDate}</td>}
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    {customerInfo.genderCode==undefined?<td>N/A</td>:<td>{customerInfo.genderCode}</td>}
                                </tr>
                                <tr>
                                    <td>Martial status</td>
                                     {customerInfo.maritalStatusCode==undefined?<td>N/A</td>:<td>{customerInfo.maritalStatusCode}</td>}
                                </tr>
                                <tr>
                                    <td>Education level</td>
                                    {/*<td><span><FontIcon icon="circle-error-solid" className={styles.iconError} /></span>needs to be completed</td>*/}
                                   {customerInfo.educationLevelCode==undefined?<td>N/A</td>:<td>{customerInfo.educationLevelCode}</td>}
                                </tr>
                                <tr>
                                    <td>Occupation</td>
                                      {customerInfo.occupationCode==undefined?<td>N/A</td>:<td><FormattedMessage id={customerInfo.occupationCode}/></td>}
                                </tr>
                                <tr>
                                    <td>Employer</td>
                                    {customerInfo.employersName==undefined?<td>N/A</td>:<td>{customerInfo.employersName}</td>}
                                </tr>
                                <tr>
                                    <td>Nationality</td>
                                    {customerInfo.countryNationalityCode==undefined?<td>N/A</td>:<td><FormattedMessage id={customerInfo.countryNationalityCode}/></td>}
                                </tr>
                                <tr>
                                    <td>Country of residence</td>
                                    {customerInfo.residenceCountryCode==undefined?<td>N/A</td>:<td><FormattedMessage id={customerInfo.residenceCountryCode}/></td>}
                                </tr>
                                <tr>
                                    <td>Residential address</td>
                                    {customerInfo.addressLine1Text==undefined?<td>N/A</td>:<td>{customerInfo.addressLine1Text}</td>}
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.rightRisk}>
                            <div className={styles.riskTitle}><h4>Risk Profile</h4></div>
                            <div className={styles.riskLevel}><span className={styles.circle}>{riskLever}</span>{riskDesc}</div>
                        </div>
                        <div className={styles.rightFinancial}>
                            <h2>Financial profile</h2>
                            <table>
                                <tr>
                                    <th>Monthly saving</th>
                                    <th>Amount</th>
                                </tr>
                                <tr>
                                    <td>Total monthly income</td>
                                    <td>{incomeAmount}</td>
                                </tr>
                                <tr>
                                    <td>Total monthly expenses</td>
                                    <td>{expenseAmount}</td>
                                </tr>
                                <tr>
                                    <td className={styles.fontStrong}>Monthly savings (Disposable Income)</td>
                                    <td className={styles.fontStrong}>{moSavingsAmount}</td>
                                </tr>
                            </table>
                            <table>
                                <tr  className={styles.titleTable}>
                                    <th>Net worth</th>
                                    <th>Amount</th>
                                </tr>
                                <tr>
                                    <td>Assets(excl. self-use property)</td>
                                    <td>{assetsAmount}</td>
                                </tr>
                                <tr>
                                    <td>Liabilities</td>
                                    <td>{liabilityAmount}</td>
                                </tr>
                                <tr>
                                    <td className={styles.fontStrong}>Net worth</td>
                                    <td className={styles.fontStrong}>{netWorthAmount}</td>
                                </tr>
                            </table>  
                        </div>
                    </div>
                </div>
                <div className={styles.finalReport}>
                    <div className={styles.context}>
                        <p className={styles.contextTitle}>Create your final report</p>
                        <p className={styles.contextContent}>Select "Add to report" below to pick the goals you wish to include in your report.</p>
                    </div>
                    <div className={styles.investGroup}>
                        <span className={styles.invTitle}>What we discussed today</span>
{ 
    meetingSummaryRetrieveGoalSummarylist.map(function(goal,index){   
         let goalDescribe,goalProcessStatus,invProductList=[],goalDetailProductTableDesc,invDiscussedProductList=[],insProductList=[];
         {/*OverviewDetailString,goalRisk,goalRiskStyleMatch,riskMatchContent,isEditButton,isResumeButton,isDeletedButton;*/}
         {/*match goal tyep*/}
         let objGoalTypeMatch = goal.goalTypeMatch;
         let goalImg=objGoalTypeMatch.goalImg;
         let goalContext= objGoalTypeMatch.goalContext;
         {/*get goal Type*/}
         let goalType=goal.goalType;
         {/*goal neme*/}
         let goalDescription = goal.goalDescription;
         {/*match goal status*/}
         let objGoalStatusMatch =goal.goalStfinancialGoalProcessStatusCodeatusMatch;
         let statusImg=objGoalStatusMatch.goalStatusImg;
         let statusContent= objGoalStatusMatch.goalStatusContent;
         {/*get goal key*/}
         let goalKey= goal.goalKey;
         
         {/*if(goal.meetingSummaryretrieveGoalDetails && goal.meetingSummaryretrieveGoalDetails.riskProfile && goal.meetingSummaryretrieveGoalDetails.goalDetailContentButtonIndicate){
          
          OverviewDetailString = goal.meetingSummaryretrieveGoalDetails.OverviewDetailString;
          
          goalRisk= goal.meetingSummaryretrieveGoalDetails.riskProfile.riskCapacityLevelNumber;
          goalRiskStyleMatch='risk'+goalRisk;
          
          riskMatchContent= goal.meetingSummaryretrieveGoalDetails.riskProfile.riskMatchContent;
           
          isDeletedButton = goal.meetingSummaryretrieveGoalDetails.goalDetailContentButtonIndicate.isDeletedButton;
          isEditButton = goal.meetingSummaryretrieveGoalDetails.goalDetailContentButtonIndicate.isEditButton;
          isResumeButton = goal.meetingSummaryretrieveGoalDetails.goalDetailContentButtonIndicate.isResumeButton;
          }*/}
          {/*if(goal.meetingSummaryretrieveGoalDetails && goal.meetingSummaryretrieveGoalDetails.invProductList && goal.meetingSummaryretrieveGoalDetails.invProductList.length>0 ){
             invProductList=goal.meetingSummaryretrieveGoalDetails.invProductList
               console.log("cpn invProductList  DDDDDDDD",invProductList );
          }
           if(goal.meetingSummaryretrieveGoalDetails && goal.meetingSummaryretrieveGoalDetails.insProductList && goal.meetingSummaryretrieveGoalDetails.insProductList.length>0 ){
             insProductList=goal.meetingSummaryretrieveGoalDetails.insProductList
          }*/}
           if(goal.meetingSummaryretrieveGoalDetails && goal.meetingSummaryretrieveGoalDetails.goalDetailProductTableDesc){
             goalDetailProductTableDesc=goal.meetingSummaryretrieveGoalDetails.goalDetailProductTableDesc
          }
           if(!ObjectHelper.isNullOrEmpty(goal.meetingSummaryretrieveGoalDetails)){
               invProductList=goal.meetingSummaryretrieveGoalDetails.invProductList;
               insProductList=goal.meetingSummaryretrieveGoalDetails.insProductList,
               invDiscussedProductList=goal.meetingSummaryretrieveGoalDetails.invDiscussedProductList
           }
         let arrangementIdentifierFinancialPlanning = goalKey.arrangementIdentifierFinancialPlanning;
         let goalSequenceNumber = goalKey.goalSequenceNumber; 
         goalDescribe =(<span className={styles.health}><FontIcon icon={goalImg} className={styles.healthLog}/>{goalDescription}</span>);
         goalProcessStatus = (<span className={styles.status}><span className={styles[statusImg]}></span>Status-{statusContent}</span>);
         let lastModified=FormatHelper.dateFormatPattern(goal.lastModified,dateTimeFormat.DATE_FORMAT);
         {/*let  riskContent = (<span className={styles[goalRiskStyleMatch]}>{goalRisk}</span>);*/}
         return(  
             <div className={styles.invest} key={goalSequenceNumber}>
                        <div className={styles.investHeader}>
                                {goalDescribe}
                                <span className={styles.lastmodified}>Last modified:{lastModified}</span>
                                {/*<span className={classNames(styles.add,styles.checkBox)}>
                                    <input type="checkbox" className={styles.chkbox} id={index}/>
                                    <label htmlFor="chkbox1" className={styles.boxlabel}  id={index}  />&nbsp;Add to report</span>*/}

                               {/*<input type="checkbox" className={styles.chkbox} id={buyProductsId} name="questionOne" value={purposeBuyingProductCode} ref={buyProductsId}
                                                            checked={(select=="Y"&&this.state[buyProductsId]==undefined)||this.state[buyProductsId]=="Y"} />
                                                            <label htmlFor={buyProductsId} id={buyProductsId} className={styles.boxlabel} onClick={this.purposeBuyingProductChange.bind(this,buyProductsId,purposeBuyingProductCode,select,this.state[buyProductsId])} />
                                                            onChange={_this.checkSelectGoalInfo.bind(this)}*/}
                                 <div className={classNames(styles.add,UIStyles.checkboxList)}>
                                        <ul>
                                            <li>
                                                <label htmlFor={goalSequenceNumber}>
                                                     <Checkbox name="URGENT" id={goalSequenceNumber} theme={UIStyles} index={goalKey}  onChange={_this.CheckIndicator} />
                                                    <span>Add to report</span>
                                                </label>
                                            </li>
                                        </ul>

                                <a href="javascript:void(0);" onClick={_this.showDetail.bind(this,arrangementIdentifierFinancialPlanning,goalSequenceNumber)}>  <FontIcon   icon={goal.isShow?"chevron-up-small":"chevron-down-small"}  className={styles.showAndhide}/></a>
                                </div>            
                        </div>
                        <div className={styles.investContent} style={goal.isShow?{display:''}:{display:'none'}}>
                             <div className={styles.investTable}>
                                {invProductList.length>0?<h2>Products added(Investment)</h2>:""}
                                {invProductList.length>0? 
                                        <ProductTable 
                                            theme={invBoStyle} data={invProductList}
                                            rowHeight={100}
                                            headerHeight={100}
                                    //     remove={this.removeProduct.bind(this)}
                                            headerComponent={<InvStickyHeader/>}>
                                            <ProductCodeName/>
                                            <RiskRating/>
                                            <ProductCurrency/>
                                            <InitialAmount/>
                                            <MonthlyAmount/>
                                    </ProductTable> :""}
                                    {insProductList.length>0?<h2>Products added(Insurance)</h2>:""}
                                    {insProductList.length>0?
                                        <ProductTable 
                                                theme={insBoStyle} data={insProductList}
                                                rowHeight={100}
                                                headerHeight={100}
                                        //     remove={this.removeProduct.bind(this)}
                                                headerComponent={<InsStickyHeader/>}>
                                                <ProductCodeName/>
                                                <RiskRating/>
                                                <InitialAmount/>
                                                <MonthlyAmount/>
                                        </ProductTable>:""}   
                                    {invDiscussedProductList.length>0?<h2>disscuess product</h2>:""}
                                    {invDiscussedProductList.length>0? 
                                        <ProductTable 
                                            theme={disStyle} data={invDiscussedProductList}
                                            rowHeight={100}
                                            headerHeight={100}
                                    //     remove={this.removeProduct.bind(this)}
                                            headerComponent={<StickyHeader/>}>
                                            <ProductName/>
                                            <ProductType/>
                                            <RiskingRating/>
                                            <ProductCurrencyAlternativesPod/>
                                    </ProductTable> :""}   
                                </div>
                                <div className={styles.investNote}>
                                    <p className={styles.noteInfo}><strong>Note</strong>:The <FontIcon icon="circle-error" className={styles.iconError} /> icon beside the risk rating means lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor.</p>
                                    <div className={styles.note}>
                                        <p className={styles.reminder}>Reminders</p>
                                        <p className={styles.decalration}><strong>Customer decalration</strong><br/>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae retrum metus. Maecenas vitae return metus. Mauris in metus id nibh vehicula maximus. Curabitur ultrices ;apreet nunc, non aliquam lacus viverra in. Donec dapibus nulla quis arcu cursus pulvinar. Quisque lobortis,metus interdum sollicitudin porttitor, mauris ipsum pellentesque tellus, vel bibendum ex eros sed nibh. Aenean pretium egestas augue vitae scelerisque. In aliquam ex eu nibh pulvinar tempus. Proin nec suscipit tortor. Sed non nibh ut uma condimentum feugoat non quis turpis. Sed massa erat, condimentum eu nulla sed,rhoncus tincidunt elit. Nullam sit amet magna et turpis posuere efficitur commodo interdum elit. Integer vestibutlum nec dolor eget tristique
                                        </p>
                                    </div>
                                </div>
                            </div>
                     </div>
                );})}  
                    </div>
                    <div className={styles.investGroup}>
                        {/*<span className={styles.invTitle}>What we discussed before</span>
                        <div className={styles.invest}>
                            <div className={styles.investHeader}>
                                <span className={styles.health}><FontIcon icon="health" className={styles.healthLog}/>Simplified Investment</span>
                                <span className={styles.id}>ID:20170915</span>
                                <span className={styles.lastmodified}>Last modified:28/01/2017</span>
                                <span className={classNames(styles.add,styles.checkBox)}>
                                    <input type="checkbox" className={styles.chkbox} id="chkbox2" />
                                    <label htmlFor="chkbox2" />
                                    <label htmlFor="chkbox2" className={styles.boxlabel} />&nbsp;Add to report</span>
                                <a href="javascript:void(0);" onClick=""><FontIcon  icon="chevron-up-small"  className={styles.showAndhide}/></a>
                            </div>
                          
                        </div>
                         <div className={styles.invest}>
                            <div className={styles.investHeader}>
                                <span className={styles.health}><FontIcon icon="education" className={styles.healthLog}/>Simplified Investment</span>
                                <span className={styles.id}>ID:20170915</span>
                                <span className={styles.lastmodified}>Last modified:28/01/2017</span>
                                <span className={classNames(styles.add,styles.checkBox)}>
                                    <input type="checkbox" className={styles.chkbox} id="chkbox3" />
                                    <label htmlFor="chkbox3" />
                                    <label htmlFor="chkbox3" className={styles.boxlabel} />&nbsp;Add to report</span>
                                <a href="javascript:void(0);" onClick=""><FontIcon  icon="chevron-up-small"  className={styles.showAndhide}/></a>
                            </div>*/}
                    </div>
                </div>
                <div className={styles.Notes}>
                    <p>Notes</p>
                    <div>
                        <textarea  name="Remark" className={styles.textString} placeholder="Type here..." />
                     </div>
                </div>
                <div className={styles.bottom} >
                    <div className={styles.back}><a href="javascript:;" onClick={this.goToDashboardPageHandle}><FontIcon icon="chevron-left" className={styles.icon} />Back to product summary</a></div>
                    <div className={styles.button}>
                        <a href="javascript:;" className={styles.save}>Save progress</a>
                        <a href="javascript:;" onClick={this.generateReport} className={styles.report}>Generate report</a>
                        {/*<InsPodModal clickCurrentGoalDeleteCancelButton={_this.clickCurrentGoalDeleteCancelButton.bind(this,index)}>*/}
                         
                         {/*clickCancelButton={_this.clickCancelButton.band(this,"AbsenceGoalOverlay")}
                         clickCancelButton={_this.clickCancelButton.bind(this,"insOverlayIsShow")}
                         clickCancelButton={_this.clickCancelButton.bind(this,"differentGoalTypeOverlayIsShow")}*/}
                         {_this.state.absenceGoalOverlayIsShow?<AbsenceGoalOverlay clickCancelButton={_this.clickCancelButton.bind(this,"AbsenceGoalOverlay")}>
                                        <div className={styles.modalBoday}>
                                            <p className={styles.content}>Please select at least one goal.</p>
                                        </div>
                                        <div className={styles.btnArea}>
                                          <a  className={styles.subBtn } onClick={_this.clickCancelButton.bind(this,"AbsenceGoalOverlay")}>OK</a> 
                                        </div> 
                       </AbsenceGoalOverlay>:''} 
                       {_this.state.insOverlayIsShow?<InsPodModal clickCancelButton={_this.clickCancelButton.bind(this,"insOverlayIsShow")} >
                                        <div className={styles.modalBoday}>
                                            <p className={styles.content}>[For Insurance] Please be reminded to check the education level which shown on the Financial Planning Report</p>
                                        </div>
                                        <div className={styles.btnArea}>
                                            {/*<a  className={styles.cancelBtn} onClick={_this.clickCurrentGoalDeleteCancelButton.bind(this,index)}>Cancel</a> 
                                            <a  className={styles.subBtn} onClick={_this.clickCurrentGoalDeleteButton.bind(this,arrangementIdentifierFinancialPlanning,goalSequenceNumber)}>confirm</a> */}
                                            <a  className={styles.cancelBtn} onClick={_this.clickCancelButton.bind(this,"insOverlayIsShow")}>Cancel</a> 
                                            <a  className={styles.subBtn} onClick={_this.clickInsOverlayConfirm.bind(this)}>confirm</a> 
                                        </div> 
                       </InsPodModal>:''} 
                        {_this.state.differentGoalTypeOverlayIsShow?<GoalTypeDifferentOverlay clickCancelButton={_this.clickCancelButton.bind(this,"differentGoalTypeOverlayIsShow")}>
                                        <div className={styles.modalBoday}>
                                            <p className={styles.content}>Warning: Please choose goal plans of the same type (i.e. “Investment Journey” or “Insurance - Financial Needs Analysis” or “Full Financial Planning Journey” goal plans only).</p>
                                        </div>
                                        <div className={styles.btnArea}>
                                            {/*<a  className={styles.subBtn} onClick={_this.clickCurrentGoalDeleteButton.bind(this,arrangementIdentifierFinancialPlanning,goalSequenceNumber)}>OK</a> */}
                                            <a  className={styles.subBtn } onClick={_this.clickCancelButton.bind(this,"differentGoalTypeOverlayIsShow")}>OK</a> 
                                        </div> 
                       </GoalTypeDifferentOverlay>:''} 
                    </div>
                    <div className={styles.decalration}><span>Disclaimer & declarations</span><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                </div>
                <Popup popupRef="generatingSummary" className={styles.popWindow} hideOnOverlayClick theme={styles}>{generatingSummaryContent}</Popup>
                
            </div>
        );
    }
}
