import React, { Component } from 'react';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from "react-intl"; 
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import { browserHistory } from 'react-router';
import ObjectHelper from '../../../../common/lib/ObjectHelper';
import formatHelper from '../../../../common/lib/formatHelper';
import Popup from 'wealth/lib/web/components/widgets/popup';
import popupStyle from './popup.scss';
import LifeProtectionGapCalOverlay from './overLay/lifeProtectionGapCalOverlay';
import OldInsObjOverLay from './overLay/oldInsObjOverLay';
import OldInsTypeOverLay from './overLay/oldInsTypeOverLay';
import InsSubtypeNoProdOverlay from './overLay/insSubtypeNoProdOverlay';
import  CcyAmtInput,{validateAndFormatCcyAmt} from '../../../../common/components/Input/CcyAmtInput';
import  {goalSolutionDetailConfig} from '../../../../services/config/goalSolution/goalSolutionDetailConfig'
import  {goalSolutionConfig} from '../../../../services/config/goalSolution/goalSolutionConfig'
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';
export default class needAnalysisPanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
           goalSolutionDetail:{},
           lifeProtectionOverlayFlag:false,
           estatePlanAmountVaildate:true,
           supportFamilyAmountVaildate:true,
           reserveExpenseAmountVaildate:true,
           otherAmountVaildate:true,
           totalProNeedAmountVaildate:true,
           supportFamilyNumberRender:true,  
           otherAmountNumberRender:true,
           reserveExpenseNumberRender:true,
           saveQuestionsNumberRender:true,
           saveQuestionsVaildate:true,
           insSubtypeNoProdOverlayFlag:false,  
           oldInsObjOverLayFlag:false,
           oldInsTypeOverLayFlag:false,
           goalName:'' ,
           editGoalNameFlag:false
        };
        this.goToFinProfile = this.goToFinProfile.bind(this);
        this.retrieveGoalSolutionDetail = this.retrieveGoalSolutionDetail.bind(this);
        this.saveQuestionsAmtClear =this.saveQuestionsAmtClear.bind(this);
        this.saveQuestionsAmtChange =this.saveQuestionsAmtChange.bind(this);
        this.timeFramQuestionsSelectChange=this.timeFramQuestionsSelectChange.bind(this);
        this.invperiodQuestionsSelectChange=this.invperiodQuestionsSelectChange.bind(this);
        this.insinvperdQuestionsSelectChange=this.insinvperdQuestionsSelectChange.bind(this);
        this.retireAgeValChange=this.retireAgeValChange.bind(this); 
        this.retireAgeValClear=this.retireAgeValClear.bind(this);
        this.totalProNeedAmountClear=this.totalProNeedAmountClear.bind(this); 
        this.totalProNeedAmountChange=this.totalProNeedAmountChange.bind(this);
        this.totalProNeedAmountSum=this.totalProNeedAmountSum.bind(this);
        this.supportFamilyAmountChange=this.supportFamilyAmountChange.bind(this);  
        this.supportFamilyAmountClear=this.supportFamilyAmountClear.bind(this);  
        this.reserveExpenseAmountChange=this.reserveExpenseAmountChange.bind(this);  
        this.reserveExpenseAmountClear=this.reserveExpenseAmountClear.bind(this);  
        this.estatePlanAmountChange=this.estatePlanAmountChange.bind(this);  
        this.estatePlanAmountClear=this.estatePlanAmountClear.bind(this); 
        this.otherAmountClear=this.otherAmountClear.bind(this); 
        this.otherAmountChange=this.otherAmountChange.bind(this); 
        this.otherAmountRemarkClear=this.otherAmountRemarkClear.bind(this);   
        this.otherAmountRemarkChange=this.otherAmountRemarkChange.bind(this); 
        this.LifeconfirmOverlay=this.LifeconfirmOverlay.bind(this); 
        this.saveNeedAnalysis=this.saveNeedAnalysis.bind(this);
        this.goToDashboardPageHandle = this.goToDashboardPageHandle.bind(this); 
        this.saveValiate=this.saveValiate.bind(this);
        this.saveQuestionsAmtBlur=this.saveQuestionsAmtBlur.bind(this);
        this.riskLevelChange=this.riskLevelChange.bind(this);
        this.confirmOverlay=this.confirmOverlay.bind(this);
        this.editGoalName=this.editGoalName.bind(this);
        this.editGoalNameFocus=this.editGoalNameFocus.bind(this);
        this.editGoalNameBlur=this.editGoalNameBlur.bind(this);
        this.editGoalNameChange=this.editGoalNameChange.bind(this);
    }
    componentWillMount(){
        this.retrieveGoalSolutionDetail();
        let dateStr=new Date();
        let nowDate=formatHelper.dateFormatPattern(dateStr,"YYYYMMDD_HHmmss");
        let mjAppConfig=goalSolutionConfig.mjAppConfig
        let goalName=mjAppConfig.SPN_GOAL_DESCRIPTION+"_"+nowDate
        this.setState({
            goalName:goalName
        })
        console.log("retrieveGoalSolutionDetail will amount...")
    }

     componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps....props',nextProps);
        if(nextProps.totalProNeedAmount!=this.props.totalProNeedAmount){
            let needEvaluationList=nextProps.goalSolutionDetail.needEvaluationList;
            let currencyCode=ObjectHelper.isNullOrEmpty(nextProps.goalSolutionDetail.currencyCode)? needEvaluationList.currencyCode:nextProps.goalSolutionDetail.currencyCode;
            let supportFamilyAmount,reserveExpenseAmount;
            if(!ObjectHelper.isNullOrEmpty(this.state.supportFamilyAmount)){
                supportFamilyAmount=this.state.supportFamilyAmount
            }else{
                supportFamilyAmount=needEvaluationList.supportFamilyAmount.insuranceNeedAmount
            }
            if(!ObjectHelper.isNullOrEmpty(this.state.reserveExpenseAmount)){
              reserveExpenseAmount=this.state.reserveExpenseAmount
            }else{
              reserveExpenseAmount=needEvaluationList.reserveExpenseAmount.insuranceNeedAmount
            }
            let estatePlanAmount=parseFloat(nextProps.totalProNeedAmount)-parseFloat(reserveExpenseAmount)-parseFloat(supportFamilyAmount);
            if(estatePlanAmount<0){
                estatePlanAmount='Nil'
            }
            let tempTotalFormat=validateAndFormatCcyAmt(nextProps.totalProNeedAmount+"",currencyCode,{noNeedDecimal:false});
            let tempTotalEstate=validateAndFormatCcyAmt(estatePlanAmount+"",currencyCode,{noNeedDecimal:false});
            if(tempTotalEstate.notNumber){
                this.setState({
                    estatePlanAmount:null,
                    estatePlanAmountStr:'Nil'
                })
            }else{
                this.setState({
                    estatePlanAmount:tempTotalEstate.standardNumberVal,
                    estatePlanAmountStr:tempTotalEstate.formattedStrVal
                })
            }
            if(tempTotalFormat.notNumber){
                this.setState({
                    totalProNeedAmount:nextProps.totalProNeedAmount,
                    totalProNeedAmountStr:'0'
                })
            }else{
                this.setState({
                    totalProNeedAmount:tempTotalFormat.standardNumberVal,
                    totalProNeedAmountStr:tempTotalFormat.formattedStrVal,
                })
            }
                     
        }
        if(nextProps.goProductSearchFlag==true){
                this.setState({
                    insSubtypeNoProdOverlayFlag:true
                })
                // insSubtypeNoProdOverlayFlag oldInsObjOverLayFlag oldInsTypeOverLayFlag
                if(this.state.oldInsTypeOverLayFlag){
                     this.setState({
                    oldInsTypeOverLayFlag:false
                    })
                    const target = '/group-sfp-war/main/en-gb/insProdSelection';
                    browserHistory.push(target);
                }
           
        }
        // }else if(ObjectHelper.isNullOrlengthZore(nextProps.errorList.errorHanding) && this.state.saveValiate){
        //         this.saveNeedAnalysis();
        // }
    }
     editGoalNameChange(){
        let value=this.refs.editGoalName.value;
        this.setState({
            goalName:value
        })
     } 
     editGoalNameBlur(){
        let value=this.refs.editGoalName.value;
        this.setState({
            goalName:value
        })
     }
     editGoalNameFocus (){
        let value=this.refs.editGoalName.value;
        this.setState({
            goalName:value
        })
     }
     editGoalName(){
        this.setState({
            editGoalNameFlag:true
        })
     }
    purposeBuyingProductChange(id,value,select,stateSelect){
        // let obj = e.target.id
        // let select=e.target.name;
        // let value=e.target.values;
        let tempSelect;
        let tempFlag=new String;
        tempFlag=id
        let buyQuestionFlag=false;
        // let buyProductsQuestionsValiate=false;
        if(stateSelect==undefined){
            if('Y'==select){
                tempSelect='N';

            }else if('N'==select){
                tempSelect='Y';
            }
        }else{
            if(stateSelect=='Y'){
                tempSelect='N';
                // if(){

                // }
            }else if (stateSelect='N'){
                tempSelect='Y';
            }
        }
        if((value=='PROD_UDR_OBJ_FUR_INC'||value=='PROD_UDR_OBJ_SAV'||value=='PROD_UDR_OBJ_INV'||value=='PROD_UDR_OBJ_OTHER') && tempSelect=='Y'){
                            buyQuestionFlag=true;
                            // buyProductsQuestionsValiate=true;
        }else{
            let  purposeBuyingProductQuestions=this.props.goalSolutionDetail.purposeBuyingProductQuestions;
            for (let indexBuying = 0; indexBuying < purposeBuyingProductQuestions.length; indexBuying++) {
            //let  buyElement = purposeBuyingProductQuestions[indexBuying];
              let statebuyProducts="buyProducts"+indexBuying;
                if(!ObjectHelper.isNullOrEmpty(this.state[statebuyProducts])){
                       if(this.state[statebuyProducts]=='Y' && indexBuying>=2){
                           let tempValue=purposeBuyingProductQuestions[indexBuying].purposeBuyingProductCode;
                           if((tempValue==value) && tempSelect=='N'){
                                buyQuestionFlag=false;
                            }else{
                                buyQuestionFlag=true;
                                // buyProductsQuestionsValiate=true;
                                break;
                            }
                            
                       }
                       if((value=='PROD_UDR_OBJ_PROC'||value=='PROD_UDR_OBJ_HEL_CAR') && tempSelect=='Y' ){
                               buyProductsQuestionsValiate=true;
                       }
                }else{
                        if(purposeBuyingProductQuestions[indexBuying].select=='Y'&& indexBuying>=2){
                            buyQuestionFlag=true;
                            // buyProductsQuestionsValiate=true;
                            break;
                        }
                        // if(tempSelect=='Y'){
                        //     //  buyProductsQuestionsValiate=true;
                        // }
                }
            }
        }
        if(buyQuestionFlag==true && ObjectHelper.isNullOrEmpty(this.state.timeFramQuestionsSelect)){
             this.setState({
                timeFramQuestionsSelect:'Y'
            })
        }
         if(buyQuestionFlag==true && ObjectHelper.isNullOrEmpty(this.state.saveQuestionsSelect)){
             this.setState({
                saveQuestionsSelect:'Y'
            })
        }
        this.setState({
            [id]:tempSelect,
            buyQuestionFlag:buyQuestionFlag
            // buyProductsQuestionsValiate:buyProductsQuestionsValiate
        })
          console.log('state..',this.state);
        //  console.log('purposeBuyingProductChange1:e.target....',id,value,select,stateSelect)
    }
    riskLevelChange(){
        
        console.log('Change riskLevel...',this.state.riskLevelClass);
        this.setState({
            riskLevel:this.refs.riskLevel.selectedIndex,
            riskLevelClass:'riskLevel'+this.refs.riskLevel.selectedIndex
        })
    }
    saveQuestionsChange(value,select,stateSelect){
         let saveQuestionsSelect;
         if(stateSelect==undefined){
            if(select=='Y'){
                saveQuestionsSelect='N'
            }else{
                saveQuestionsSelect='Y'
            }
         }else{
            if(stateSelect=='Y'){
                saveQuestionsSelect='N'
            }else{
                saveQuestionsSelect='Y'
            }
         }
         this.setState({
                saveQuestionsSelect:saveQuestionsSelect
        })
        console.log('saveQuestionsChange state..',this.state);
    }
    timeFramQuestionsChange(value,select,stateSelect){
        let timeFramQuestionsSelect;
         if(stateSelect==undefined){
            if(select=='Y'){
                timeFramQuestionsSelect='N'
            }else{
                timeFramQuestionsSelect='Y'
            }
         }else{
            if(stateSelect=='Y'){
                timeFramQuestionsSelect='N'
            }else{
                timeFramQuestionsSelect='Y'
            }
         }
         this.setState({
                timeFramQuestionsSelect:timeFramQuestionsSelect
        })
        console.log('timeFramQuestionsChange state..',this.state);
    }
    saveQuestionsAmtClear(event){ 
        console.log('timeFramQuestionsChange state..',this.state);
        let goalSolutionDetail=this.props.goalSolutionDetail;
        let currencyCode=ObjectHelper.isNullOrEmpty(goalSolutionDetail.currencyCode)? goalSolutionDetail.needEvaluationList.currencyCode:goalSolutionDetail.currencyCode;
        let savamtvalStr='',savamtval=null;
        let savamt={};
        if(ObjectHelper.isNullOrEmpty(this.state.savamtval)){
            savamtvalStr=event.target.value;
        }else{
            savamt=validateAndFormatCcyAmt(this.state.savamtval+"",currencyCode,{noNeedDecimal:false});
            if(savamt.notNumber){
            }else{
                 savamtval=savamt.standardNumberVal;
                 savamtvalStr=savamt.formattedStrVal;
            }
        }
        this.setState({
            savamtvalStr:savamtvalStr,
            savamtval:savamtval
        })
        console.log('totalProNeedAmount...',this.state);
    } 
    saveQuestionsAmtBlur(event){
         console.log('saveQuestionsAmtBlur...',event.target.value);
        let savamtval=0,savamtvalStr='';
        let goalSolutionDetail=this.props.goalSolutionDetail;
        let currencyCode=ObjectHelper.isNullOrEmpty(goalSolutionDetail.currencyCode)? goalSolutionDetail.needEvaluationList.currencyCode:goalSolutionDetail.currencyCode;
         if(!ObjectHelper.isNullOrEmpty(event.target.value)){
            let saveQuestionsAmt=validateAndFormatCcyAmt(event.target.value+"",currencyCode,{noNeedDecimal:false});
            if(saveQuestionsAmt.notNumber){
                 this.setState({
                    saveQuestionsVaildate:false
                 })  
            }else{
                 savamtval=saveQuestionsAmt.standardNumberVal;
                 savamtvalStr=saveQuestionsAmt.formattedStrVal;
                 let saveQuestionsNumberRender=true;
                 if(savamtval<0){
                    saveQuestionsNumberRender=false;
                 }else{
                    saveQuestionsNumberRender=true;
                 }
                 this.setState({
                    savamtval:savamtval,
                    saveQuestionsVaildate:true,
                    savamtvalStr:savamtvalStr,
                    saveQuestionsNumberRender:saveQuestionsNumberRender
                 })
            }
         }
        //               this.setState({
        //             saveQuestionsVaildate:false
        //          })  saveQuestionsNumberRender:true,
        //    :true

    }
    saveQuestionsAmtChange(event){
        // let goalSolutionDetail=this.props.goalSolutionDetail;
        // this.setState({
        //     savamtval:event.target.value
        // })
         this.setState({
            savamtval:event.target.value,
            savamtvalStr:event.target.value 
        })
        console.log('saveQuestionsAmtChange...',this.state);
    }
    retireAgeValClear(event){ 
        this.setState({
            retireAgeVal:'' 
        })
        console.log('retireAgeValClear state..',this.state);
    } 
    retireAgeValChange(event){ 
        this.setState({
            retireAgeVal:event.target.value
        })
        console.log('retireAgeValChange...',this.state);
    }
    totalProNeedAmountClear(event){ 
        this.setState({
            totalProNeedAmount:0
        })
        console.log('totalProNeedAmount...',this.state);
    } 
    totalProNeedAmountSum(event){ 
        //parseFloat
        let supportFamilyAmount=0,reserveExpenseAmount=0,estatePlanAmount=0,otherAmount=0,totalProNeedAmount=0;
        let supportFamilyAmountStr='',estatePlanAmountStr='',reserveExpenseAmountStr='',otherAmountStr='',totalProNeedAmountStr='';
        let goalSolutionDetail=this.props.goalSolutionDetail;
        let currencyCode=ObjectHelper.isNullOrEmpty(goalSolutionDetail.currencyCode)? goalSolutionDetail.needEvaluationList.currencyCode:goalSolutionDetail.currencyCode;
        if(!ObjectHelper.isNullOrEmpty(this.state.supportFamilyAmount)){
            let supportFamily=validateAndFormatCcyAmt(this.state.supportFamilyAmount+"",currencyCode,{noNeedDecimal:false});
            if(supportFamily.notNumber){
                 this.setState({
                    supportFamilyAmountVaildate:false
                 })
            }else{
                 supportFamilyAmount=supportFamily.standardNumberVal;
                 supportFamilyAmountStr=supportFamily.formattedStrVal;
                 let supportFamilyNumberRender=true;
                 if(supportFamilyAmount<0){
                    supportFamilyNumberRender=false;
                 }else{
                    supportFamilyNumberRender=true;
                 }
                 this.setState({
                    supportFamilyAmount:supportFamilyAmount,
                    supportFamilyAmountVaildate:true,
                    supportFamilyAmountStr:supportFamilyAmountStr,
                    supportFamilyNumberRender:supportFamilyNumberRender
                 })
            }
            //.toFixed('3');
        }else{ supportFamilyAmount=this.props.goalSolutionDetail.needEvaluationList.supportFamilyAmount.insuranceNeedAmount}
        if(!ObjectHelper.isNullOrEmpty(this.state.reserveExpenseAmount)){
            let reserveExpense=validateAndFormatCcyAmt(this.state.reserveExpenseAmount+"",currencyCode,{noNeedDecimal:false});
             if(reserveExpense.notNumber){
                 this.setState({
                    reserveExpenseAmountVaildate:false
                 })
            }else{
                 reserveExpenseAmount=reserveExpense.standardNumberVal;
                 reserveExpenseAmountStr=reserveExpense.formattedStrVal;
                let reserveExpenseNumberRender=true;
                 if(reserveExpenseAmount<0){
                    reserveExpenseNumberRender=false;
                 }else{
                    reserveExpenseNumberRender=true;
                 }
                 this.setState({
                    reserveExpenseAmountVaildate:true,
                    reserveExpenseAmountStr:reserveExpenseAmountStr,
                    reserveExpenseAmount:reserveExpenseAmount,
                    reserveExpenseNumberRender:reserveExpenseNumberRender
                 })
            }
        }else{reserveExpenseAmount=this.props.goalSolutionDetail.needEvaluationList.reserveExpenseAmount.insuranceNeedAmount}
        if(!ObjectHelper.isNullOrEmpty(this.state.totalProNeedAmount)){
            totalProNeedAmount=parseFloat(this.state.totalProNeedAmount)

        }else{totalProNeedAmount=this.props.goalSolutionDetail.needEvaluationList.totalProNeedAmount.insuranceNeedAmount}

        estatePlanAmount=totalProNeedAmount-(supportFamilyAmount+reserveExpenseAmount);
        let estatePlan=validateAndFormatCcyAmt(estatePlanAmount+"",currencyCode,{noNeedDecimal:false});
        if(estatePlan.notNumber){
              this.setState({
                        estatePlanAmountVaildate:true,
                        estatePlanAmount:estatePlanAmount,
                        estatePlanAmountStr:'Nil',
                    })
            }else{
                estatePlanAmountStr=estatePlan.formattedStrVal;
                estatePlanAmount=estatePlan.standardNumberVal
                if(estatePlanAmount<0){
                    this.setState({
                        estatePlanAmountVaildate:false,
                        estatePlanAmount:estatePlanAmount,
                        estatePlanAmountStr:'Nil'
                    })
                }else{
                    this.setState({
                        estatePlanAmountVaildate:false,
                        estatePlanAmount:estatePlanAmount,
                        estatePlanAmountStr:estatePlanAmountStr
                    })
                 }
            } 
        if(!ObjectHelper.isNullOrEmpty(this.state.otherAmount)){
           let otherAmounts=validateAndFormatCcyAmt(this.state.otherAmount+"",currencyCode,{noNeedDecimal:false});
          if(otherAmounts.notNumber){
                 this.setState({
                    otherAmountVaildate:false
                 })
            }else{
                 otherAmount=otherAmounts.standardNumberVal;
                 otherAmountStr=otherAmounts.formattedStrVal;
                 let otherAmountNumberRender=true;
                 if(otherAmount<0){
                    otherAmountNumberRender=false;
                 }else{
                    otherAmountNumberRender=true;
                 }
                 this.setState({
                    otherAmount:otherAmount,
                    otherAmountVaildate:true,
                    otherAmountStr:otherAmountStr,
                    otherAmountNumberRender:otherAmountNumberRender
                 })
            }
            //.toFixed('3');
        }else{
            otherAmount=this.props.goalSolutionDetail.needEvaluationList.otherAmount.insuranceNeedAmount
        }
    } 
    totalProNeedAmountChange(event){ 
         this.setState({
            totalProNeedAmount:event.target.value,
            totalProNeedAmountStr:event.target.value 
        })
    }
    supportFamilyAmountChange(event){ 
        this.setState({
            supportFamilyAmount:event.target.value,
            supportFamilyAmountStr:event.target.value 
        })
        // this.props.updateNeedAnlysisField({ 
        //      supportFamilyAmount:event.target.value,
        //      supportFamilyAmountStr:event.target.value 
        // })
        console.log('supportFamilyAmountChange...',this.props.goalSolutionDetail.needEvaluationList.supportFamilyAmount.insuranceNeedAmount);
    }
    supportFamilyAmountClear(event){ 
        let supportFamilyAmountStr='';
        if(ObjectHelper.isNullOrEmpty(this.state.supportFamilyAmount)){
            supportFamilyAmountStr=this.props.goalSolutionDetail.needEvaluationList.supportFamilyAmount.insuranceNeedAmount+''
        }else{
            supportFamilyAmountStr=this.state.supportFamilyAmount
        }
        this.setState({
            supportFamilyAmountStr:supportFamilyAmountStr
        })
        console.log('totalProNeedAmount...',this.state);
    } 
    reserveExpenseAmountChange(event){ 
        this.setState({
            reserveExpenseAmount:event.target.value,
            reserveExpenseAmountStr:event.target.value 
        })
        console.log('retireAgeValChange...',this.state);
    }
    reserveExpenseAmountClear(event){ 
        let reserveExpenseAmountStr='';
        if(ObjectHelper.isNullOrEmpty(this.state.reserveExpenseAmount)){
            reserveExpenseAmountStr=this.props.goalSolutionDetail.needEvaluationList.reserveExpenseAmount.insuranceNeedAmount+''
        }else{
            reserveExpenseAmountStr=this.state.reserveExpenseAmount
        }
        this.setState({
            reserveExpenseAmountStr:reserveExpenseAmountStr
        })
        console.log('reserveExpenseAmountClear...',this.state);
    } 
    estatePlanAmountChange(event){ 
         this.setState({
            estatePlanAmount:event.target.value,
            estatePlanAmountStr:event.target.value 
        })
        console.log('retireAgeValChange...',this.state);
    }
    estatePlanAmountClear(event){ 
        let estatePlanAmountStr='';
        if(ObjectHelper.isNullOrEmpty(this.state.estatePlanAmount)){
            estatePlanAmountStr=this.props.goalSolutionDetail.needEvaluationList.estatePlanAmount.insuranceNeedAmount+''
        }else{
            estatePlanAmountStr=this.state.estatePlanAmount
        }
        this.setState({
            estatePlanAmountStr:estatePlanAmountStr
        })
        console.log('estatePlanAmountClear...',this.state);
    } 
    otherAmountClear(event){ 
        let otherAmountStr='';
        if(ObjectHelper.isNullOrEmpty(this.state.otherAmount)){
            otherAmountStr=this.props.goalSolutionDetail.needEvaluationList.otherAmount.insuranceNeedAmount+''
        }else{
            otherAmountStr=this.state.otherAmount
        }
        this.setState({
            otherAmountStr:otherAmountStr
        })
        console.log('otherAmountClear...',this.state);
    }   
    otherAmountChange(event){ 
         this.setState({
            otherAmount:event.target.value,
            otherAmountStr:event.target.value 
        })
        console.log('otherAmountChange...',this.state);
    } 
    otherAmountRemarkClear(event){ 
        this.setState({
            otherAmountRemark:''   
        })
        console.log('otherAmountRemarkClear...',this.state);
    }
    otherAmountRemarkChange(event){
        this.setState({
             otherAmountRemark:event.target.value
        })
        console.log('otherAmountRemarkChange...',this.state);
    }
    timeFramQuestionsSelectChange(event){
        let timeFramQuestionsSelectOption;
        this.setState({
            timeFramQuestionsSelectOption:event.target.value
        })
          console.log('timeFramQuestionsSelectChange...',this.state);
    }
    preQuestionsChange(id,value,select,stateSelect){
       let tempSelect;
        if(stateSelect==undefined){
            if('Y'==select){
                tempSelect='N';
            }else if('N'==select){
                tempSelect='Y';
            }
        }else{
            if(stateSelect=='Y'){
                tempSelect='N';
            }else if (stateSelect='N'){
                tempSelect='Y';
            }
        }
        
        this.setState({
            [id]:tempSelect
        })
         console.log('preQuestionsChange...',this.state);
    }
    retrieveGoalSolutionDetail(){
        console.log("retrieveGoalSolutionDetail function")
        let goalKey={
            // goalId:209,
            // planId:150
        }
        let params={
              goalKey,
              messageId:'retrieveGoalSolutionDetail',
              sessionInfo:this.props.sessionInfo
        }
       
        this.props.loadingNeedAnalysisPage(params);
     }
     invperiodQuestionsSelectChange(event){
        let invperiodQuestionsSelectOption;
        this.setState({
            invperiodQuestionsSelectOption:event.target.value
        })
          console.log('invperiodQuestionsSelectChange...',this.state);
     }
     insinvperdQuestionsSelectChange(event){
        let insinvperdQuestionsSelectOption;
        this.setState({
            insinvperdQuestionsSelectOption:event.target.value
        })
          console.log('insinvperdQuestionsSelectChange...',this.state);
     }
     closeOverlay(flag){
        this.setState({
            [flag]:false
        })
        console.log('closeOverlay...',this.state);
     }
     confirmOverlay(flow){
        if(flow=='insSubtypeNoProdOverlayFlag' && this.state.insSubtypeNoProdOverlayFlag){
            this.setState({
                oldInsObjOverLayFlag:true,
                insSubtypeNoProdOverlayFlag:false
            })  
        }else if(flow=='oldInsObjOverLayFlag'  && this.state.oldInsObjOverLayFlag){
            this.setState({
                oldInsTypeOverLayFlag:true,
                oldInsObjOverLayFlag:false
            })  
        }
        else if(flow=='oldInsTypeOverLayFlag'  && this.state.oldInsTypeOverLayFlag && !this.state.insSubtypeNoProdOverlayFlag && !this.state.oldInsObjOverLayFlag){
            this.setState({
                oldInsTypeOverLayFlag:false
            })
            if(this.refs.oldInsType){
                this.refs.oldInsType.hide()
            }  
             const target = '/group-sfp-war/main/en-gb/insProdSelection';
             browserHistory.push(target);
        }


     }
     LifeconfirmOverlay(LifeParams){
          //parseFloat
        
        console.log('LifeParams...',LifeParams);
        let goalSolutionDetail=this.props.goalSolutionDetail;
        let currencyCode=ObjectHelper.isNullOrEmpty(goalSolutionDetail.currencyCode)? goalSolutionDetail.needEvaluationList.currencyCode:goalSolutionDetail.currencyCode;
        let tempestatePlanAmount;
        let temptotalProNeedAmountSum;
        let supportFamilyAmount,reserveExpenseAmount,estatePlanAmount;
        LifeParams.currencyCode=currencyCode;
         this.setState({
            LifeParams:LifeParams,
            lifeProtectionOverlayFlag:false,
           
        })
         console.log('confirmOverlay...',this.state);
        this.props.calculateProtectionNeedPage(LifeParams);
       
     }
     calculateClick(flag){
         this.setState({
            [flag]:true
        })
        console.log('calculateClick...',this.state);
     }
    goToFinProfile(){
        const target = '/group-sfp-war/main/en-gb/insProdSelection';
        browserHistory.push(target)
    }
    goToDashboardPageHandle() {
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
    }
    saveValiate(){
        
        let needPageValiateList={
            buyProductsQuestionsValiate:false,
            saveQuestionsAmtValiate:true,
            saveQuestionsTargetBenefitValiate:true,
            preQuestionsValiate:false,
            invperiodQuestionsValiate:false,
            insinvperdQuestionsValiate:false,
            retireAgeValiate:false,
            // supportFamilyAmountValiate:false,
            // reserveExpenseAmountValiate:false,
            // estatePlanAmountValiate:false,
            otherAmountValiate:true,
            purposeBuyingProductOthersValiate:true,
            AmountValiate:false
        }
        let supportFamilyAmountValiate=false,
            reserveExpenseAmountValiate=false,
            estatePlanAmountValiate=false;
        let buyProductsList=goalSolutionDetailConfig.purposeBuyingProductList.split(',')
        for (var index = 0; index < buyProductsList.length; index++) {
             let buyProductsQuestionKey='buyProducts'+index
             if(this.refs[buyProductsQuestionKey].checked){
                needPageValiateList.buyProductsQuestionsValiate=true;
                if(index>=2){
                    if(this.refs.yesTargetAmount.checked || this.refs.noTargetAmount.checked){
                        if(this.refs.yesTargetAmount.checked){
                            if(!ObjectHelper.isNullOrEmpty(this.refs.saveQuestionsAmt.value) && this.state.saveQuestionsVaildate && this.state.saveQuestionsNumberRender){
                                needPageValiateList.saveQuestionsAmtValiate=true;
                            }else{needPageValiateList.saveQuestionsAmtValiate=false;}   
                        }else{
                            needPageValiateList.saveQuestionsAmtValiate=true;
                        }
                    }
                    if(this.refs.yesTargetBenefit.checked || this.refs.noTargetBenefit.checked){
                        if(this.refs.yesTargetBenefit.checked){
                            if(!ObjectHelper.isNullOrEmpty(this.refs.timeFramQuestionsSelect.selectedIndex) && this.refs.timeFramQuestionsSelect.selectedIndex>0){
                                needPageValiateList.saveQuestionsTargetBenefitValiate=true;
                            }else{needPageValiateList.saveQuestionsTargetBenefitValiate=false;}   
                        }else{
                            needPageValiateList.saveQuestionsTargetBenefitValiate=true;
                        }
                    }
                    if(index==5){
                        if(!ObjectHelper.isNullOrEmpty(this.refs.purposeBuyingProductText.value)){
                             needPageValiateList.purposeBuyingProductOthersValiate=true;
                        }else{
                             needPageValiateList.purposeBuyingProductOthersValiate=false
                        }
                    }
                }
                
            }
        }

        let insProductsIdList=goalSolutionDetailConfig.ins_type_meet_object.split(',')
        for (var i = 0; i < insProductsIdList.length; i++) {
             let preQuestionsKey='insProducts'+i;
                if(this.refs[preQuestionsKey].checked){
                    needPageValiateList.preQuestionsValiate=true;
                }
                // if(index==4 && this.refs[preQuestionsKey].checked){
                //     if(){
                //     }else{}
                // }
        }
        if(!ObjectHelper.isNullOrEmpty(this.refs.retireAgeVal.value)){
             needPageValiateList.retireAgeValiate=true;
        }
        if(!ObjectHelper.isNullOrEmpty(this.refs.invperiodQuestionsSelect.selectedIndex) && this.refs.invperiodQuestionsSelect.selectedIndex>0){
             needPageValiateList.invperiodQuestionsValiate=true;
        }
         if(!ObjectHelper.isNullOrEmpty(this.refs.insinvperdQuestionsSelect.selectedIndex) && this.refs.insinvperdQuestionsSelect.selectedIndex>0){
             needPageValiateList.insinvperdQuestionsValiate=true;
        }       
        if(this.state.supportFamilyAmountVaildate && this.state.supportFamilyNumberRender 
            && !ObjectHelper.isNullOrEmpty(this.refs.supportFamilyAmount.value)){
            supportFamilyAmountValiate=true
        } 
        if(this.state.reserveExpenseAmountVaildate && this.state.reserveExpenseNumberRender 
            && !ObjectHelper.isNullOrEmpty(this.refs.reserveExpenseAmount.value)){
            reserveExpenseAmountValiate=true
        }  
        if(!ObjectHelper.isNullOrEmpty(this.refs.estatePlanAmount.value)){
            estatePlanAmountValiate=true
        }      
        if(!ObjectHelper.isNullOrEmpty(this.refs.otherAmount.value)){
            if(this.state.otherAmountVaildate && this.state.otherAmountNumberRender){
                if(!ObjectHelper.isNullOrEmpty(this.refs.otherAmountRemark.value)){
                     needPageValiateList.otherAmountValiate=true;
                }else{
                     needPageValiateList.otherAmountValiate=false;
                }
            }else{
                needPageValiateList.otherAmountValiate=false;
            }
        }
        if(supportFamilyAmountValiate&&reserveExpenseAmountValiate&&estatePlanAmountValiate){
            needPageValiateList.AmountValiate=true
        }else{needPageValiateList.AmountValiate=false}
        console.log('saveValiate...',needPageValiateList); 
        let validatePage='needAnalysisPageValidateList';
         this.setState({
            saveValiate:true
        })
        
        let flag=true;
        for (var key in needPageValiateList) {
             var element = needPageValiateList[key];
             if(element==false){
                 flag=false;
             }
        }
        this.setState({
            AmountValiate:needPageValiateList.AmountValiate,
            buyProductsQuestionsValiate:needPageValiateList.buyProductsQuestionsValiate,
            insinvperdQuestionsValiate:needPageValiateList.insinvperdQuestionsValiate,
            invperiodQuestionsValiate:needPageValiateList.invperiodQuestionsValiate,
            otherAmountValiate:needPageValiateList.otherAmountValiate,
            preQuestionsValiate:needPageValiateList.preQuestionsValiate,
            purposeBuyingProductOthersValiate:needPageValiateList.purposeBuyingProductOthersValiate,
            retireAgeValiate:needPageValiateList.retireAgeValiate,
            saveQuestionsAmtValiate:needPageValiateList.saveQuestionsAmtValiate,
            saveQuestionsTargetBenefitValiate:needPageValiateList.saveQuestionsTargetBenefitValiate
        })
        if(flag){
            
             this.saveNeedAnalysis();
        }
        //  
        //  this.props.commonValidate(needPageValiateList,validatePage);
    }
    saveNeedAnalysis(){
         
         console.log('saveNeedAnalysis...',this.props.goalSolutionDetail);
         let aipiIndicators={};
         let needEvaluationList={
         };
         let piqQuestAndAnsQuestions={};
         let purposeBuyingProductQuestions  =[];
         let retireAge={}; 
         let goalSolutionDetail=this.props.goalSolutionDetail;
         let saveParams={}
         if(ObjectHelper.isNullOrEmpty(this.state.retireAgeVal)){
            retireAge=goalSolutionDetail.retireAge;
         }else{
             retireAge.value=this.state.retireAgeVal;
             retireAge.nameCode=null;
         }
         purposeBuyingProductQuestions=goalSolutionDetail.purposeBuyingProductQuestions;
         for (let indexBuying = 0; indexBuying < purposeBuyingProductQuestions.length; indexBuying++) {
            //let  buyElement = purposeBuyingProductQuestions[indexBuying];
              let statebuyProducts="buyProducts"+indexBuying;
              if(!ObjectHelper.isNullOrEmpty(this.state[statebuyProducts])){
                    purposeBuyingProductQuestions[indexBuying].select=this.state[statebuyProducts];
              }
         }
         needEvaluationList.currencyCode=goalSolutionDetail.needEvaluationList.currencyCode;
         needEvaluationList.ProGapAmount=goalSolutionDetail.needEvaluationList.ProGapAmount;
         needEvaluationList.supportFamilyAmount=goalSolutionDetail.needEvaluationList.supportFamilyAmount;
         needEvaluationList.estatePlanAmount=goalSolutionDetail.needEvaluationList.estatePlanAmount;
         needEvaluationList.lumpSumAmount=goalSolutionDetail.needEvaluationList.lumpSumAmount;
         needEvaluationList.reserveExpenseAmount=goalSolutionDetail.needEvaluationList.reserveExpenseAmount;
         needEvaluationList.mortAndDebetsAmount=goalSolutionDetail.needEvaluationList.mortAndDebetsAmount;
         needEvaluationList.monIncomeAmount=goalSolutionDetail.needEvaluationList.monIncomeAmount;
         needEvaluationList.provideYear=goalSolutionDetail.needEvaluationList.provideYear;
         needEvaluationList.monReplaceAmount=goalSolutionDetail.needEvaluationList.monReplaceAmount;
         needEvaluationList.lumpSumAmount=goalSolutionDetail.needEvaluationList.lumpSumAmount;
         needEvaluationList.otherAmount=goalSolutionDetail.needEvaluationList.otherAmount;
         needEvaluationList.totalGap=goalSolutionDetail.needEvaluationList.totalGap;
         needEvaluationList.totalProNeedAmount=goalSolutionDetail.needEvaluationList.totalProNeedAmount;
         if(!ObjectHelper.isNullOrEmpty(this.state.LifeParams)){
            console.log('LifeParams...',this.state.LifeParams);
            let LifeParams=this.state.LifeParams;
            if(!ObjectHelper.isNullOrEmpty(LifeParams.mortAndDebetsAmountVal)){
                needEvaluationList.mortAndDebetsAmount.insuranceNeedAmount=LifeParams.mortAndDebetsAmountVal;
            }
            if(!ObjectHelper.isNullOrEmpty(LifeParams.monIncomeAmountVal)){
                needEvaluationList.monIncomeAmount.insuranceNeedAmount=LifeParams.monIncomeAmountVal;
            }
            if(!ObjectHelper.isNullOrEmpty(LifeParams.provideYear)){
                needEvaluationList.provideYear.insuranceNeedAmount=LifeParams.provideYear;
            }
            if(!ObjectHelper.isNullOrEmpty(LifeParams.monReplaceAmount)){
                needEvaluationList.monReplaceAmount.insuranceNeedAmount=LifeParams.monReplaceAmount;
            }
            if(!ObjectHelper.isNullOrEmpty(LifeParams.lumpSumAmount)){
                needEvaluationList.lumpSumAmount.insuranceNeedAmount=LifeParams.lumpSumAmount;
            }
            if(!ObjectHelper.isNullOrEmpty(LifeParams.lifePortecSum)){
                needEvaluationList.totalProNeedAmount.insuranceNeedAmount=LifeParams.lifePortecSum
            }
         }else{
            if(!ObjectHelper.isNullOrEmpty(this.state.totalProNeedAmount)){
                needEvaluationList.totalProNeedAmount.insuranceNeedAmount=this.state.totalProNeedAmount;
            }
         }
         if(!ObjectHelper.isNullOrEmpty(this.state.estatePlanAmount)){
                needEvaluationList.estatePlanAmount.insuranceNeedAmount=this.state.estatePlanAmount;
                needEvaluationList.totalGap.insuranceNeedAmount=this.state.estatePlanAmount;
            }
         if(!ObjectHelper.isNullOrEmpty(this.state.supportFamilyAmount)){
                needEvaluationList.supportFamilyAmount.insuranceNeedAmount=this.state.supportFamilyAmount;
         }
          if(!ObjectHelper.isNullOrEmpty(this.state.reserveExpenseAmount)){
                needEvaluationList.reserveExpenseAmount.insuranceNeedAmount=this.state.reserveExpenseAmount;
         }
         if(!ObjectHelper.isNullOrEmpty(this.state.otherAmount)){
                needEvaluationList.otherAmount.insuranceNeedAmount=this.state.otherAmount;
         }
         if(!ObjectHelper.isNullOrEmpty(this.state.otherAmountRemark)){
                needEvaluationList.otherAmount.insuranceNeedOtherText=this.state.otherAmountRemark;
         }
          if(!ObjectHelper.isNullOrEmpty(this.state.totalProNeedAmount)){
                needEvaluationList.totalProNeedAmount.insuranceNeedAmount=this.state.totalProNeedAmount;
         }
         // //parseFloat
         needEvaluationList.ProGapAmount.insuranceNeedAmount=parseFloat(needEvaluationList.estatePlanAmount.insuranceNeedAmount)+parseFloat(needEvaluationList.otherAmount.insuranceNeedAmount)
         piqQuestAndAnsQuestions.insinvperdQuestions=goalSolutionDetail.piqQuestAndAnsQuestions.insinvperdQuestions;
         piqQuestAndAnsQuestions.invperiodQuestions=goalSolutionDetail.piqQuestAndAnsQuestions.invperiodQuestions;
         piqQuestAndAnsQuestions.preQuestions=goalSolutionDetail.piqQuestAndAnsQuestions.preQuestions;
         piqQuestAndAnsQuestions.saveQuestions=goalSolutionDetail.piqQuestAndAnsQuestions.saveQuestions;
         piqQuestAndAnsQuestions.timeFramQuestions=goalSolutionDetail.piqQuestAndAnsQuestions.timeFramQuestions;
         if(!ObjectHelper.isNullOrEmpty(this.state.saveQuestionsSelect)){
            piqQuestAndAnsQuestions.saveQuestions.select=this.state.saveQuestionsSelect;
            if(!ObjectHelper.isNullOrEmpty(this.state.savamtval)){
                 piqQuestAndAnsQuestions.saveQuestions.savamtval=this.state.savamtval;
            }
         }else{
             if(piqQuestAndAnsQuestions.saveQuestions.select=='Y'){
                if(!ObjectHelper.isNullOrEmpty(this.state.savamtval)){
                 piqQuestAndAnsQuestions.saveQuestions.savamtval=this.state.savamtval;
                }
             }
         }
         if(!ObjectHelper.isNullOrEmpty(this.state.timeFramQuestionsSelect)){ 
            //  timeFramQuestionsSelectOption select
            piqQuestAndAnsQuestions.timeFramQuestions.select=this.state.timeFramQuestionsSelect;
            if(!ObjectHelper.isNullOrEmpty(this.state.timeFramQuestionsSelectOption)){
                 for (let indexAnswer = 0; indexAnswer <  piqQuestAndAnsQuestions.timeFramQuestions.instimeframe_answers.length; indexAnswer++) {
                      let answer = piqQuestAndAnsQuestions.timeFramQuestions.instimeframe_answers[indexAnswer];
                        if(answer.value==this.state.timeFramQuestionsSelectOption){
                           piqQuestAndAnsQuestions.timeFramQuestions.instimeframe_answers[indexAnswer].select='Y'
                        }else{
                           piqQuestAndAnsQuestions.timeFramQuestions.instimeframe_answers[indexAnswer].select='N'
                        }                     
                 }
            }
         }else{
             if(!ObjectHelper.isNullOrEmpty(this.state.timeFramQuestionsSelectOption)){
                 for (let indexAnswer = 0; indexAnswer <  piqQuestAndAnsQuestions.timeFramQuestions.instimeframe_answers.length; indexAnswer++) {
                      let answer = piqQuestAndAnsQuestions.timeFramQuestions.instimeframe_answers[indexAnswer];
                        if(answer.value==this.state.timeFramQuestionsSelectOption){
                           piqQuestAndAnsQuestions.timeFramQuestions.instimeframe_answers[indexAnswer].select='Y'
                        }else{
                           piqQuestAndAnsQuestions.timeFramQuestions.instimeframe_answers[indexAnswer].select='N'
                        }                     
                 }
            }
         }
         
        if(!ObjectHelper.isNullOrEmpty(this.state.insinvperdQuestionsSelectOption)){ 
            for (let indexInsinv = 0; indexInsinv < piqQuestAndAnsQuestions.insinvperdQuestions.length; indexInsinv++) {
                 let insinvperd = piqQuestAndAnsQuestions.insinvperdQuestions[indexInsinv];
                 if(insinvperd.value==this.state.insinvperdQuestionsSelectOption){
                    piqQuestAndAnsQuestions.insinvperdQuestions[indexInsinv].select='Y';
                 }else{
                    piqQuestAndAnsQuestions.insinvperdQuestions[indexInsinv].select='N';
                 }
                
            }
         }
        if(!ObjectHelper.isNullOrEmpty(this.state.invperiodQuestionsSelectOption)){ 
            for (let indexInvperiod = 0; indexInvperiod < piqQuestAndAnsQuestions.invperiodQuestions.length; indexInvperiod++) {
                 let invperiod = piqQuestAndAnsQuestions.invperiodQuestions[indexInvperiod];
                 if(invperiod.value==this.state.invperiodQuestionsSelectOption){
                    piqQuestAndAnsQuestions.invperiodQuestions[indexInvperiod].select='Y';
                 }else{
                    piqQuestAndAnsQuestions.invperiodQuestions[indexInvperiod].select='N';
                 }
            }
         }
         
         for (let indexPreQuest = 0; indexPreQuest < piqQuestAndAnsQuestions.preQuestions.length; indexPreQuest++) {
              let stateIndexPreQuest="insProducts"+indexPreQuest;
              if(!ObjectHelper.isNullOrEmpty(this.state[stateIndexPreQuest])){
                    piqQuestAndAnsQuestions.preQuestions[indexPreQuest].select=this.state[stateIndexPreQuest];
              }
         }
         
        saveParams.piqQuestAndAnsQuestions=piqQuestAndAnsQuestions;
        saveParams.needEvaluationList=needEvaluationList;
        saveParams.purposeBuyingProductQuestions=purposeBuyingProductQuestions;
        saveParams.retireAge=retireAge;
        saveParams.aipiIndicators=aipiIndicators;
        saveParams.goalName=this.state.goalName;
        saveParams.riskLevel=ObjectHelper.isNullOrEmpty(this.state.riskLevel)? goalSolutionDetail.riskLevel:this.state.riskLevel;
        // let vaildateInd=this.saveValiate(saveParams);
        // // if(vaildateInd){
        // //      this.props.needAnalysisSave(saveParams);
        // // }
        // this.props.update_NeedAnlysis_Field

        this.props.needAnalysisSave(saveParams);
        console.log('saveParams...',saveParams);
       
    }
    render () {
        const{
            goalSolutionDetail
        }= this.props;
         console.log('goalSolutionDetail...',goalSolutionDetail.needEvaluationList.supportFamilyAmount);
        let riskLevel=ObjectHelper.isNullOrEmpty(goalSolutionDetail.riskLevel) ? '1':goalSolutionDetail.riskLevel ;
        let lifeProtectionOverlayFlag=this.state.lifeProtectionOverlayFlag;
        let purposeBuyingProductQuestions=goalSolutionDetail.purposeBuyingProductQuestions;
        let piqQuestAndAnsQuestions=goalSolutionDetail.piqQuestAndAnsQuestions ;
        let needEvaluationList=goalSolutionDetail.needEvaluationList;
        let retireAge=goalSolutionDetail.retireAge;
        let aipiIndicators=goalSolutionDetail.aipiIndicators;
        let saveQuestions=piqQuestAndAnsQuestions.saveQuestions;
        let timeFramQuestions=piqQuestAndAnsQuestions.timeFramQuestions;
        let preQuestions=piqQuestAndAnsQuestions.preQuestions;
        let insinvperdQuestions=piqQuestAndAnsQuestions.insinvperdQuestions;
        let invperiodQuestions=piqQuestAndAnsQuestions.invperiodQuestions;
        let instimeframe_answers=[];
        let reserveExpenseAmount={},estatePlanAmount={},otherAmount={},ProGapAmount={},
        supportFamilyAmount={},
            totalGap ={},totalProNeedAmount={},mortAndDebetsAmount={}, monIncomeAmount={} ,provideYear={},
            lumpSumAmount={}, monReplaceAmount={};
            supportFamilyAmount=needEvaluationList.supportFamilyAmount;
            reserveExpenseAmount=needEvaluationList.reserveExpenseAmount;
            estatePlanAmount=needEvaluationList.estatePlanAmount;
            otherAmount=needEvaluationList.otherAmount;
            ProGapAmount=needEvaluationList.ProGapAmount;
            totalGap=needEvaluationList.totalGap;
            totalProNeedAmount=needEvaluationList.totalProNeedAmount;
            mortAndDebetsAmount=needEvaluationList.mortAndDebetsAmount;
            monIncomeAmount=needEvaluationList.monIncomeAmount;
            provideYear=needEvaluationList.provideYear;
            lumpSumAmount=needEvaluationList.lumpSumAmount;
            monReplaceAmount=needEvaluationList.monReplaceAmount;
        instimeframe_answers=timeFramQuestions.instimeframe_answers;
        if(retireAge.value==undefined){
            retireAge.value=0;
        }
        if(otherAmount.insuranceNeedOtherText==undefined||otherAmount.insuranceNeedOtherText==null){
            otherAmount.insuranceNeedOtherText='';
        }
         let buyQuestionFlag;
        if(ObjectHelper.isNullOrEmpty(this.state.buyQuestionFlag)){
           buyQuestionFlag=goalSolutionDetail.buyQuestionFlag;
        }else{
           buyQuestionFlag=this.state.buyQuestionFlag
        }
        console.log("totalProNeedAmount.......",this.props.totalProNeedAmount);
           return (
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.nav}>
                        <ul className={classNames(styles.tab, styles.clearfix)}>
                            <li className={styles.on}><a href="javascript:;"> 1.Simplified Insurance:Need analysis</a></li>
                            <li><a href="javascript:;"> &nbsp;</a></li>
                            <li><a href="javascript:;"> &nbsp;</a></li>
                        </ul>
                        <div className={styles.editGoal}> 
                            <div className={styles.goalName}>
                                <span className={styles.goal}><FontIcon icon="insurance" className={styles.iconInsurance}/>
                                {/*this.state.goalName*/}
                                <input type="text" className={styles.goalNameHidden}  value={this.state.goalName} ref='editGoalName' 
                                                name='editGoalName' id='editGoalName' onChange={this.editGoalNameChange} 
                                                onFocus={this.editGoalNameFocus}  onBlur={this.editGoalNameBlur} 
                                                disabled={this.state.editGoalNameFlag  ? '':'disabled'}
                                /> 
                                </span>
                                <span className={classNames(styles.circle,
                                styles[ObjectHelper.isNullOrEmpty(this.state.riskLevelClass) ? ('riskLevel'+riskLevel) :this.state.riskLevelClass])}>{ObjectHelper.isNullOrEmpty(this.state.riskLevel) ? riskLevel :this.state.riskLevel}</span>
                                <select id="sij_riskLevelChange" onChange={this.riskLevelChange} ref='riskLevel' >
                                    <option value="0" checked={(riskLevel=="0"&&this.state.riskLevel==undefined)||this.state.riskLevel=="0"}><FormattedMessage id='0'/></option>
					                <option value="1" checked={(riskLevel=="1"&&this.state.riskLevel==undefined)||this.state.riskLevel=="1"}><FormattedMessage id='1'/></option>
					                <option value="2" checked={(riskLevel=="2"&&this.state.riskLevel==undefined)||this.state.riskLevel=="2"}><FormattedMessage id='2'/></option>				
					                <option value="3" checked={(riskLevel=="3"&&this.state.riskLevel==undefined)||this.state.riskLevel=="3"}><FormattedMessage id='3'/></option>				
					                <option value="4" checked={(riskLevel=="4"&&this.state.riskLevel==undefined)||this.state.riskLevel=="4"}><FormattedMessage id='4'/></option>				
					                <option value="5" checked={(riskLevel=="5"&&this.state.riskLevel==undefined)||this.stateriskLevel=="5"}><FormattedMessage id='5'/></option>
                                </select> 
                            </div>
                            <div className={styles.editGoalName} onClick={this.editGoalName}><FontIcon icon="edit" className={styles.iconEdit}/>Edit goal name and risk</div>
                        </div>
                    </div>
                    <div className={styles.needAnalysisPanel}>
                        <h4>
                            <span className={styles.title}>Need Analysis</span>
                        </h4>
                        {/*<div className={classNames(styles.showAll, styles.clearfix)}>
                            <span className={styles.clock}>*Indicates a required field</span>
                        </div>*/}
                        <div className={styles.needAnalysisMain}>
                            <div className={styles.nacon}>
                                {/*<div className={styles.naconOne}>
                                    <h5>1.Target retirement age</h5>
                                    <input type="text" className={styles.input} />
                                </div>*/}
                                <div className={styles.naconOne}> 
                                        <span className={styles.title}>Insurance preference</span>
                                        <h5>1.What are your objectives of considering buying our products?<br/>
                                            <span className={styles.small}> (Tick one or more)</span>
                                        </h5>
                                        {(this.state.buyProductsQuestionsValiate!=undefined && this.state.buyProductsQuestionsValiate==false ) ?
                                         <p className={styles.errorMessage}>Objectives of buying our product question is not answered. Please complete to proceed.</p>:
                                         null
                                          }
                                        {(this.state.purposeBuyingProductOthersValiate!=undefined && this.state.purposeBuyingProductOthersValiate==false ) ?
                                         <p className={styles.errorMessage}>Please specify the other insurance type.</p>:
                                         null
                                          }
                                          
                                       <div className={styles.answers}>
                                       {
                                            purposeBuyingProductQuestions.map(function(item,index){
                                                let context=item.context,eg=item.eg,select=item.select,purposeBuyingProductCode=item.purposeBuyingProductCode;
                                                let buyProductsId='buyProducts'+index;
                                                let otherRemark;
                                                if(purposeBuyingProductCode=='PROD_UDR_OBJ_OTHER'){
                                                    let purposeBuyingProductText=item.purposeBuyingProductText
                                                    return(
                                                        <p className={styles.mt10} key={index}>                                                                 
                                                            <input type="checkbox" className={styles.chkbox} id={buyProductsId} name="questionOne" value={purposeBuyingProductCode} ref={buyProductsId}
                                                            checked={(select=="Y"&&this.state[buyProductsId]==undefined)||this.state[buyProductsId]=="Y"} />
                                                            <label htmlFor={buyProductsId} id={buyProductsId} className={styles.boxlabel} onClick={this.purposeBuyingProductChange.bind(this,buyProductsId,purposeBuyingProductCode,select,this.state[buyProductsId])} />
                                                            {context}<br/>
                                                            <span className={styles.smallAnswer}>{eg}</span>
                                                            <input name='purposeBuyingProductText' id='purposeBuyingProductText' type="text" ref="purposeBuyingProductText" className={classNames(styles.input, styles.input1)} value={purposeBuyingProductText}/>
                                                        </p>
                                                    )
                                                }else{
                                                return(
                                                     <p className={styles.mt10} key={index}>
                                                        <input type="checkbox" className={styles.chkbox} id={buyProductsId} name="questionOne" value={purposeBuyingProductCode} ref={buyProductsId}
                                                        checked={(select=="Y"&&this.state[buyProductsId]==undefined)||this.state[buyProductsId]=="Y"}  />
                                                        <label htmlFor={buyProductsId} id={buyProductsId} className={styles.boxlabel} onClick={this.purposeBuyingProductChange.bind(this,buyProductsId,purposeBuyingProductCode,select,this.state[buyProductsId])} />
                                                        {context}<br/>
                                                        <span className={styles.smallAnswer}>{eg} </span>
                                                    </p>
                                                )
                                                }
                                            },this)
                                       }
                                       </div>
                                </div> 
                              {buyQuestionFlag ?<div className={styles.naconTwo}> 
                                    <div className={styles.mt20}>
                                        <h5>{saveQuestions.L_TargetSavingAmount_Desc}</h5>
                                         {(this.state.saveQuestionsAmtValiate!=undefined && this.state.saveQuestionsAmtValiate==false ) ?
                                                <p className={styles.errorMessage}>Target Saving Amount question is not answered. Please complete to proceed.</p>:
                                                null
                                          }
                                    </div>
                                      <p className={styles.mt10}>
                                          <input type="radio" className={styles.radioCheck} name="radioTargetAmount" value='Y' id="yesTargetAmount" ref="yesTargetAmount" checked={(saveQuestions.select=="Y"&&this.state.saveQuestionsSelect==undefined)||this.state.saveQuestionsSelect=="Y"} 
                                          onClick={this.saveQuestionsChange.bind(this,'Y',saveQuestions.select,this.state.saveQuestionsSelect)}/>
                                          <label className={styles.radiolabel} htmlFor="yesTargetAmount">                                               
                                              {saveQuestions.L_TargetSavingAmount_YES}
                                          </label>    
                                          <div className={styles.currencyType}>
                                                <span>{saveQuestions.savamtccy}</span>&nbsp; 
                                                <input type="text" className={styles.num}  value={this.state.savamtvalStr==undefined?saveQuestions.savamtval:this.state.savamtvalStr} ref='saveQuestionsAmt' maxLength="12"
                                                name='saveQuestionsAmt' id='saveQuestionsAmt' onBlur={this.saveQuestionsAmtBlur} onFocus={this.saveQuestionsAmtClear} onChange={this.saveQuestionsAmtChange} 
                                                /> 
                                              {this.state.saveQuestionsNumberRender?
                                                null
                                                :<div className={styles.errorBar}>
                                                    <div className={styles.triangle}/>
                                                    <p className={styles.errorlabel}>Please enter a number between 0 and 999999999999.</p>     
                                                </div>
                                                }
                                         </div>
                                         {this.state.saveQuestionsVaildate?
                                            null
                                            :<div className={styles.errorBar}>
                                                <div className={styles.triangle}/>
                                                <p className={styles.errorlabel}>Input area is empty, please enter a number</p>     
                                            </div>}
                                      </p>
                                      <p className={styles.mt10}>
                                          <input type="radio" className={styles.radioCheck} name="radioTargetAmount" value='N' id="noTargetAmount" ref="noTargetAmount" checked= {(saveQuestions.select=="N"&&this.state.saveQuestionsSelect==undefined)||this.state.saveQuestionsSelect=="N"} 
                                          onClick={this.saveQuestionsChange.bind(this,'N',saveQuestions.select,this.state.saveQuestionsSelect)}/>
                                           <label className={styles.radiolabel} htmlFor="noTargetAmount">                                                 
                                               {saveQuestions.L_TargetSavingAmount_NO}
                                           </label>
                                            
                                      </p>
                                </div>
                                :null}  
                                {buyQuestionFlag ?
                                <div className={styles.naconThree}>
                                    <div className={styles.mt10}>
                                        <h5>{timeFramQuestions.L_Timeframe_Desc}</h5>
                                          {(this.state.saveQuestionsTargetBenefitValiate!=undefined && this.state.saveQuestionsTargetBenefitValiate==false ) ?
                                                <p className={styles.errorMessage}>Expected Timeframe question is not answered. Please complete to proceed.</p>:
                                                null
                                          }
                                    </div>
                                      <p className={styles.mt10}>                                                                                           
                                          <input type="radio" className={styles.radioCheck} name="radioTargetBenefit" value='Y' id="yesTargetBenefit" ref="yesTargetBenefit" checked={(timeFramQuestions.select=="Y"&&this.state.timeFramQuestionsSelect==undefined)||this.state.timeFramQuestionsSelect=="Y"}
                                           onClick={this.timeFramQuestionsChange.bind(this,'Y',timeFramQuestions.select,this.state.timeFramQuestionsSelect)}/>
                                          <label className={styles.radiolabel} htmlFor="yesTargetBenefit">
                                                {timeFramQuestions.L_Timeframe_YES}
                                          </label><br/>
                                          <select onChange={this.timeFramQuestionsSelectChange} ref='timeFramQuestionsSelect'> 
                                              <option value="">Please select</option> 
                                              {
                                                instimeframe_answers.map(function(item,index){
                                                    let label=item.label;
                                                    let select=item.select;
                                                    let value=item.value;
                                                     if(this.state.timeFramQuestionsSelectOption!=undefined){
                                                        if(this.state.timeFramQuestionsSelectOption==value){
                                                            select='Y'
                                                        }else{
                                                            select='N'
                                                        }   
                                                    }
                                                    return(
                                                        <option value={value} checked={select=='Y'} key={index}> {label}</option>
                                                    )
                                                },this)
                                              }
                                          </select>
                                      </p>
                                      <p className={styles.mt10}>
                                          <input type="radio" className={styles.radioCheck} name="radioTargetBenefit" value='N' id="noTargetBenefit" ref="noTargetBenefit" 
                                          checked={(timeFramQuestions.select=="N"&&this.state.timeFramQuestionsSelect==undefined)||this.state.timeFramQuestionsSelect=="N"}
                                          onClick={this.timeFramQuestionsChange.bind(this,'N',timeFramQuestions.select,this.state.timeFramQuestionsSelect)}/>
                                           <label className={styles.radiolabel} htmlFor="noTargetBenefit">
                                                {timeFramQuestions.L_Timeframe_NO}
                                           </label>
                                            
                                      </p>
                                </div>
                                :null}
                                <div className={styles.naconFour}>
                                    <div className={styles.mt20}>
                                        <h5>2.What type(s) of insurance products you are looking for to meet your objectives?
                                            <br/><span className={styles.small}> (Tick one or more)</span>
                                        </h5>
                                         {(this.state.preQuestionsValiate!=undefined && this.state.preQuestionsValiate==false ) ?
                                                <p className={styles.errorMessage}>Type(s) of Insurance Product question is not answered. Please complete to proceed.</p>:
                                                null
                                          }
                                        {
                                            preQuestions.map(function(item,index){
                                                let label=item.label;
                                                let eg=item.eg;
                                                let select=item.select;
                                                let value=item.value;
                                                let insProductsId='insProducts'+index;
                                                return(
                                                    <p  key={index}>
                                                        <input type="checkbox" className={styles.chkbox} id={insProductsId} name="questionTwo" ref={insProductsId} value={value} 
                                                         checked={(select=="Y"&&this.state[insProductsId]==undefined)||this.state[insProductsId]=="Y"} />
                                                        <label htmlFor="insProducts" className={styles.boxlabel} 
                                                        onClick={this.preQuestionsChange.bind(this,insProductsId,value,select,this.state[insProductsId])}/>{label}<br/>
                                                        <span className={styles.small}>{eg}</span>
                                                    </p>
                                                )
                                            },this)
                                        }
                                    </div>
                                </div>
                                <div className={styles.naconFive}>
                                    <div className={styles.mt20}> 
                                        <h5>3.What is your target benefit / protection period for insurance policy?</h5>
                                        {(this.state.insinvperdQuestionsValiate!=undefined && this.state.insinvperdQuestionsValiate==false ) ?
                                                <p className={styles.errorMessage}>Target Benefit / Protection Period question is not answered. Please complete to proceed.</p>:
                                                null
                                          }  
                                        <select onChange={this.insinvperdQuestionsSelectChange} ref='insinvperdQuestionsSelect'>
                                            <option id="sij_insinvperdQuestionsSelect" value="">Please select</option>
                                            {
                                                insinvperdQuestions.map(function(item,index){
                                                    let label=item.label;
                                                    let select=item.select;
                                                    let value=item.value;
                                                    if(this.state.insinvperdQuestionsSelectOption!=undefined){
                                                        if(this.state.insinvperdQuestionsSelectOption==value){
                                                            select='Y'
                                                        }else{
                                                            select='N'
                                                        }   
                                                    }
                                                    return(
                                                        <option value={value} key={index} checked={select=='Y'}> {label}</option>
                                                    )
                                                },this)
                                            }
                                        </select>
                                        <FontIcon icon="circle-confirmation-solid" className={styles.icon} />
                                    </div>
                                </div>
                                <div className={styles.naconSix}>
                                    <div className={styles.mt20}>
                                        <h5>4. For how long are you able and willing to contribute to an insurance policy and / or investment plan ?</h5>
                                        {(this.state.invperiodQuestionsValiate!=undefined && this.state.invperiodQuestionsValiate==false ) ?
                                                <p className={styles.errorMessage}>Contribution Period question is not answered. Please complete to proceed.</p>:
                                                null
                                          }
                                        <select onChange={this.invperiodQuestionsSelectChange} ref='invperiodQuestionsSelect'>
                                             <option id="sij_invperiodQuestionsSelect" value="">Please select</option>
                                            {
                                                invperiodQuestions.map(function(item,index){
                                                    let label=item.label;
                                                    let select=item.select;
                                                    let value=item.value;
                                                      if(this.state.invperiodQuestionsSelectOption!=undefined){
                                                        if(this.state.invperiodQuestionsSelectOption==value){
                                                            select='Y'
                                                        }else{
                                                            select='N'
                                                        }   
                                                    }
                                                    return(
                                                        <option value={value} key={index} checked={select=='Y'}> {label}</option>
                                                    )
                                                },this)
                                            }
                                        </select>
                                        <FontIcon icon="circle-confirmation-solid" className={styles.icon} />
                                    </div>
                                </div>
                                 {/*<div className={styles.naconSeven}>
                                    <div className={styles.mt20}>
                                        <h5>5. You acknowledge that the average monthly income from all sources in the past two years shall not be used to calculate your disposable income and considered your affordability because: ?</h5>
                                        <select>
                                            <option value="HKD">Please select</option>
                                          
                                        </select>
                                        <FontIcon icon="circle-confirmation-solid" className={styles.icon} />
                                    </div>
                                </div> */}
                                 {/*<div className={styles.naconInExp}>
                                    <div className={styles.mt20}>
                                        <h5>As a result you agree to use the following monthly income and monthly expenses to caculate your disposable income and consider your affordability instead:</h5>
                                        <div className={classNames(styles.fill, styles.clearfix)}>
                                            <div className={styles.left}>
                                                <h5>Monthly income</h5>
                                                <input type="text" placeholder="HKD 10,000" className={styles.input} />
                                                <span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                                <span><FontIcon icon="circle-confirmation-solid" className={styles.icon} /></span>
                                            </div>
                                            <div className={styles.middle}>
                                                <h5>Monthly expenses</h5>
                                                <input type="text" placeholder="HKD 10,000" className={styles.input} />
                                                <span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                                <span><FontIcon icon="circle-confirmation-solid" className={styles.icon} /></span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>  */}
                                <div className={styles.naconEight}>
                                    <div className={styles.mt20}>
                                        <h5>5. Planned retirement age</h5>
                                         {(this.state.retireAgeValiate!=undefined && this.state.retireAgeValiate==false ) ?
                                                <p className={styles.errorMessage}>Retirement Age question is not answered. Please complete to proceed.</p>:
                                                null
                                           }
                                         <input type="text" className={classNames(styles.input, styles.input1)} 
                                         value={this.state.retireAgeVal==undefined?retireAge.value:this.state.retireAgeVal} ref='retireAgeVal' 
                                         name='retireAgeVal' id='retireAgeVal' onBlur={this.retireAgeValChange} onFocus={this.retireAgeValClear} onChange={this.retireAgeValChange}/> Prefill from FHC <button>Prefill</button>
                                    </div>
                                </div>

                            </div>
                            <div className={styles.naconAttached}>
                                <div className={styles.mt20}>
                                    <div className={styles.total}>Your Total Life Protection Needs</div>
                                    <div className={classNames(styles.showAll, styles.clearfix)}>
                                        <span className={styles.required}><span className={styles.flag}>*</span>Indicates a required field</span>
                                    </div>
                                    <div className={classNames(styles.fill, styles.clearfix)}>
                                        {/*<div className={styles.left}>
                                            <h5>Total</h5>
                                             <div className={styles.currencyType}>
                                                <span> {totalProNeedAmount.currencyInsuranceNeedCode==undefined?needEvaluationList.currencyCode:totalProNeedAmount.currencyInsuranceNeedCode}</span>&nbsp;
                                                <input type="text" className={styles.num}   
                                                value={this.state.totalProNeedAmountStr==undefined?totalProNeedAmount.insuranceNeedAmount:this.state.totalProNeedAmountStr} ref='totalProNeedAmount' disabled 
                                                 name='totalProNeedAmount' id='totalProNeedAmount'/>
                                             </div> 
                                            <span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                            <span><FontIcon icon="circle-confirmation-solid" className={styles.icon} /></span>
                                        </div>*/}
                                        <div className={styles.left}> 
                                            <h5>1. Exisiting life insurance coverage</h5> 
                                            <div className={this.state.supportFamilyAmountVaildate?styles.currencyType:styles.errorcurrencyType}>  
                                                <span> {this.props.goalSolutionDetail.needEvaluationList.supportFamilyAmount.currencyInsuranceNeedCode==undefined?this.props.goalSolutionDetail.needEvaluationList.currencyCode:this.props.goalSolutionDetail.needEvaluationList.supportFamilyAmount.currencyInsuranceNeedCode}</span>&nbsp;
                                                <input type="text" className={styles.num}  maxLength="12"
                                                 value={this.state.supportFamilyAmountStr==undefined?supportFamilyAmount.insuranceNeedAmount:this.state.supportFamilyAmountStr} ref='supportFamilyAmount' 
                                                 name='supportFamilyAmount' id='supportFamilyAmount' onBlur={this.totalProNeedAmountSum}        onFocus={this.supportFamilyAmountClear} onChange={this.supportFamilyAmountChange}/>
                                                {/*value=
                                                {this.props.goalSolutionDetail.needEvaluationList.supportFamilyAmount.supportFamilyAmountStr} ref='supportFamilyAmount' 
                                                 name='supportFamilyAmount' id='supportFamilyAmount' onChange={this.supportFamilyAmountChange}/>*/}
                                                
                                                 <span className={styles.inputFlag}>*</span>   
                                             </div>     
                                             {this.state.supportFamilyAmountVaildate?
                                             null
                                             :<div className={styles.errorBar}>
                                                 <div className={styles.triangle}/>
                                                 <p className={styles.errorlabel}>Input area is empty, please enter a number</p>     
                                             </div>}
                                             {this.state.supportFamilyNumberRender?
                                             null
                                             :<div className={styles.errorBar}>
                                                 <div className={styles.triangle}/>
                                                 <p className={styles.errorlabel}>Please enter a number between 0 and 999999999999.</p>     
                                             </div>
                                             }
                                            {/*<span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                            <span><FontIcon icon="circle-confirmation-solid" className={styles.icon} /></span>*/}
                                            </div>
                                        <div className={styles.middle}>
                                            <h5>2. Company benefit</h5>
                                            <div className={this.state.reserveExpenseAmountVaildate?styles.currencyType:styles.errorcurrencyType}>
                                                <span> {reserveExpenseAmount.currencyInsuranceNeedCode==undefined?needEvaluationList.currencyCode:reserveExpenseAmount.currencyInsuranceNeedCode}</span>&nbsp;
                                                <input type="text" className={styles.num} maxLength="12"       
                                                value={this.state.reserveExpenseAmountStr==undefined?reserveExpenseAmount.insuranceNeedAmount:this.state.reserveExpenseAmountStr} ref='reserveExpenseAmount' 
                                                 name='reserveExpenseAmount' id='reserveExpenseAmount' onBlur={this.totalProNeedAmountSum} onFocus={this.reserveExpenseAmountClear} onChange={this.reserveExpenseAmountChange}/>
                                                   <span className={styles.inputFlag}>*</span> 
                                             </div> 
                                             {this.state.reserveExpenseAmountVaildate?
                                             null
                                             :<div className={styles.errorBar}>
                                                 <div className={styles.triangle}/>
                                                 <p className={styles.errorlabel}>Input area is empty, please enter a number</p>     
                                             </div>}
                                              {this.state.reserveExpenseNumberRender?
                                             null
                                             :<div className={styles.errorBar}>
                                                 <div className={styles.triangle}/>
                                                 <p className={styles.errorlabel}>Please enter a number between 0 and 999999999999.</p>     
                                             </div>
                                             }
                                            {/*<span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                            <span><FontIcon icon="circle-confirmation-solid" className={styles.icon} /></span>*/}
                                        </div>
                                        <div className={styles.right}>
                                            <h5>3. Life protection gap</h5>
                                             {(this.state.AmountValiate!=undefined && this.state.AmountValiate==false ) ?
                                                <p className={styles.errorMessage}>Your Total Life Protection Needs is NULL or illegal</p>:
                                                null
                                            }
                                             <div className={styles.currencyType}>
                                                <span> {estatePlanAmount.currencyInsuranceNeedCode==undefined?needEvaluationList.currencyCode:estatePlanAmount.currencyInsuranceNeedCode}</span>&nbsp;
                                                <input type="text" className={styles.num} maxLength="12" 
                                                 value={this.state.estatePlanAmountStr==undefined?estatePlanAmount.insuranceNeedAmount:this.state.estatePlanAmountStr} ref='estatePlanAmount' disabled 
                                                 name='estatePlanAmount' id='estatePlanAmount' onBlur={this.totalProNeedAmountSum} onFocus={this.estatePlanAmountClear} onChange={this.estatePlanAmountChange}/>
                                                   <span className={styles.inputFlag}>*</span> 
                                             </div> 
                                             <div className={classNames(styles.showAll, styles.clearfix)}> 
                                                <span><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></span>
                                                <span data-popupRef="LifeProtectionGapCalOverlay" onClick={this.calculateClick.bind(this,'lifeProtectionOverlayFlag')}><FontIcon icon="secure-key-passcode" className={styles.iconKey} /></span>
                                            </div>
                                             {/*{this.state.estatePlanAmountVaildate?
                                             null
                                             :<div className={styles.errorBar}>
                                                 <div className={styles.triangle}/>
                                                 <p className={styles.errorlabel}>Input area is empty, please enter a number</p>     
                                             </div>}*/}
                                            {/*<span><FontIcon icon="circle-confirmation-solid" className={styles.icon} /></span>*/}
                                        </div>
                                    </div>
                                    <h5>4. Other addtional life protection needs to be addressed using insurance plan(s)</h5>
                                    <p>"Other addtional life protection needs" is ONLY applicable to the life protection needs that you consider
                                     to be addressed using insurance plan(s). If the amount needed has already been included in above sections,
                                     please do not include it here to avoid double-counting.</p>
                                     <div className={styles.currencyType}>
                                                <span> {otherAmount.currencyInsuranceNeedCode==undefined?needEvaluationList.currencyCode:otherAmount.currencyInsuranceNeedCode}</span>&nbsp;
                                                <input type="text" className={styles.numOther} maxLength="12"  
                                                 value={this.state.otherAmountStr==undefined?otherAmount.insuranceNeedAmount:this.state.otherAmountStr} ref='otherAmount' 
                                                 name='otherAmount' id='otherAmount' onBlur={this.totalProNeedAmountSum} onFocus={this.otherAmountClear} onChange={this.otherAmountChange}/>
                                    </div>
                                          {this.state.otherAmountVaildate?
                                             null
                                             :<div className={styles.errorBar}>
                                                 <div className={styles.triangle}/>
                                                 <p className={styles.errorlabel}>Input area is empty, please enter a number</p>     
                                             </div>}
                                              {this.state.otherAmountNumberRender?
                                             null
                                             :<div className={styles.errorBar}>
                                                 <div className={styles.triangle}/>
                                                 <p className={styles.errorlabel}>Please enter a number between 0 and 999999999999.</p>     
                                             </div>
                                             }
                                    <h5>5. Others,please specific</h5>
                                     {(this.state.otherAmountValiate!=undefined && this.state.otherAmountValiate==false ) ?
                                                <p className={styles.errorMessage}>Please obtain details of other additional life protection needs to proceed.</p>:
                                                null
                                            }


                                    <div className={styles.textarea}>
                                        <textarea rows="5" cols="100" defaultValue="Type here..."   
                                        value={ this.state.otherAmountRemark==undefined?otherAmount.insuranceNeedOtherText:this.state.otherAmountRemark}   ref='otherAmountRemark' 
                                        onBlur={this.otherAmountRemarkChange} onFocus={this.otherAmountRemarkClear} onChange={this.otherAmountRemarkChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <div className={styles.back}><a id="sij_goToDashboardPageHandle" href="javascript:;"><FontIcon icon="chevron-left" className={styles.icon} onClick={this.goToDashboardPageHandle}/>&nbsp;Back to home</a></div>
                            <div className={styles.button}>
                                <a id="sij_saveValiate" href="javascript:;" className={styles.save} onClick={this.saveValiate}>Save progress</a>
                                {/*<a href="javascript:;" className={styles.continue} onClick={this.goToFinProfile}>Continue</a>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <Popup theme={popupStyle} popupRef="LifeProtectionGapCalOverlay" hideOnOverlayClick show={lifeProtectionOverlayFlag} onHide={this.closeOverlay.bind(this,'lifeProtectionOverlayFlag')}>
                    <LifeProtectionGapCalOverlay closeOverlay={this.closeOverlay.bind(this,'lifeProtectionOverlayFlag')} needEvaluationList={needEvaluationList}  LifeconfirmOverlay={this.LifeconfirmOverlay}/>
                 </Popup>

                  <Popup theme={popupStyle} popupRef="insSubtypeNoProdOverlay" hideOnOverlayClick show={this.state.insSubtypeNoProdOverlayFlag} onHide={this.closeOverlay.bind(this,'insSubtypeNoProdOverlayFlag')}>
                    <InsSubtypeNoProdOverlay closeOverlay={this.closeOverlay.bind(this,'insSubtypeNoProdOverlayFlag')} confirmOverlay={this.confirmOverlay}/>
                 </Popup>
                    
                  <Popup theme={popupStyle} popupRef="oldInsObjOverLay" hideOnOverlayClick show={this.state.oldInsObjOverLayFlag} onHide={this.closeOverlay.bind(this,'oldInsObjOverLayFlag')}>
                    <OldInsObjOverLay closeOverlay={this.closeOverlay.bind(this,'oldInsObjOverLayFlag')} confirmOverlay={this.confirmOverlay}/>
                 </Popup>

                  <Popup theme={popupStyle} popupRef="oldInsTypeOverLay" ref='oldInsType'   hideOnOverlayClick show={this.state.oldInsTypeOverLayFlag} onHide={this.closeOverlay.bind(this,'oldInsTypeOverLayFlag')}>
                    <OldInsTypeOverLay closeOverlay={this.closeOverlay.bind(this,'oldInsTypeOverLayFlag')}  confirmOverlay={this.confirmOverlay}/>
                 </Popup>
                 
            </div>
        );
    }
}
