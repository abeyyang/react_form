import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Popup from 'wealth/lib/web/components/widgets/popup';
import styles from './style.scss';
import IncomeModal from '../incomeModal/incomeModal';
import ExpenseModal from '../expenseModal/expenseModal';
import AssetsModal from '../assetsModal/assetsModal';
import LiabilitiesModal from '../liabilitiesModal/liabilitiesModal';
import withLoadingScreenBeforeReadyToLeave
    from '../../../../common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import SelectIncomeComponent from '../selectPanel/selectIncome_cpn';
import validation from '../../../../common/util/validation';
import SelectNumDependentComponent from '../selectPanel/selectNumDependent_cpn';
import SelectCurrencyComponent from '../selectPanel/selelctCurrency_cpn';
import FormatHelper from 'common/lib/formatHelper'; 
import ObjectHelper from '../../../../common/lib/ObjectHelper';
import popupAssets from './popupAssets.scss';
import popupLibility from './popupLibility.scss'
import SelectionBox  from 'wealth/lib/web/components/widgets/selectionBox';
import AmountText from 'common/components/Input/AmountText';
import CcyAmtDisplayer from 'common/components/Output/CcyAmtDisplayer';
import CcyAmtDisplay from '../utils/CcyAmtDisplay';
import CurrencySelect from 'FinancialPlanning/financialProfile/containers/currencySelect_ctn';
class FinancialProfilePanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            amountTest:"",
            tabs:{
                incomeTab : "1",
                expenseTab : "1",
                assetsTab : "1",
                liabilityTab : "1"
            },
            isShow:false,
            showResult:true,
            showMonthlyArea:false,
            incomeInputFlag:true,
            expenseInputFlag:true,
            assetsInputFlag:true,
            liabilityInputFlag:true,
            otherCommentTextShow:false,
            dciIndicator:"N",          

            incomeDetail:{
                personalDetail:{
                },
                contriByFamliyDetial:{
                },
                divideIncomeDetail:{
                },
                rentalIncomeDetail:{
                },
                otherIncomeDetail:{
                }
            },
            expenseDetail:{
                personalDetail:{},
                mortgageRentalDetail:{},
                educationDetail:{},
                otherDetail:{},
                monthInsuranceDetail:{},
                rentalPaymentDetial:{}
            },
            assetsDetail:{
                otherLiquidDetail:{},
                savingCashDepositDetail:{},
                investmentDetail:{},
                investmentPropertyDetail:{},
		        oridinaryCPFDetail:{},
		        nonliquidTrustsDetail:{}
            },
            liabilityDetail:{
                mortgageLoanDetail:{},
                pernalLoanDetail:{},
                shortNonDetail:{},
                longNonDetail:{}
            }
        };
        
        this.show = this.show.bind(this);
        this.setFNAResult = this.setFNAResult.bind(this);
        this.resultShow = this.resultShow.bind(this);
        this.goToDashboardPageHandle = this.goToDashboardPageHandle.bind(this);
        this.initFinancialProfileAssest = this.initFinancialProfileAssest.bind(this);
        this.initFinancialProfileIncome = this.initFinancialProfileIncome.bind(this);
        this.initFinancialProfileExpenses = this.initFinancialProfileExpenses.bind(this);
        this.initFinancialProfileLiailities = this.initFinancialProfileLiailities.bind(this);
        this.showHideMonthly = this.showHideMonthly.bind(this);
        this.saveRecord = this.saveRecord.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.changeTotalAmount = this.changeTotalAmount.bind(this);
        // this.changeDci = this.changeDci.bind(this);
        this.retrieveFxrateByCurrency=this.retrieveFxrateByCurrency.bind(this);
        this.updateHSBCRecord=this.updateHSBCRecord.bind(this);
}

    componentWillReceiveProps(nextProps) {
        let totalIncome = 0;

        let incomeObj ={
            detailList:[],
            total:{}
        };
        let incomeInputFlag = false;
        for(var incomeKey in nextProps.incomeDetail){
            incomeObj.detailList.push(nextProps.incomeDetail[incomeKey]);
            console.log("init flag in income detail", nextProps.incomeDetail);
            if(incomeKey != "monthlyIncomeObj" && (nextProps.incomeDetail[incomeKey].amount != undefined && nextProps.incomeDetail[incomeKey].amount != "")){
                console.log("init flag in income amount" ,nextProps.incomeDetail[incomeKey].amount);
                incomeInputFlag = true;
            }
        }
        incomeObj.detailList.map((map)=>{
            map.amount=String(map.amount).replace(/,/g,'');
            if(!isNaN(parseInt(map.amount))){
                totalIncome += parseFloat(map.amount);
            }
        })
        let expenseObj ={
            detailList:[],
            total:{}
        };
        let totalExpense = 0;
        let expenseInputFlag = false;
        for(var expenseKey in nextProps.expenseDetail){
            expenseObj.detailList.push(nextProps.expenseDetail[expenseKey]);
            if(expenseKey != "monthlyExpenseObj" && (nextProps.expenseDetail[expenseKey].amount != undefined && nextProps.expenseDetail[expenseKey].amount != "")){
                expenseInputFlag = true;
            }
        }
        expenseObj.detailList.map((map)=>{
            map.amount=String(map.amount).replace(/,/g,'');
            if(!isNaN(parseInt(map.amount))){
                totalExpense += parseFloat(map.amount);
            }
        })

        let assetsObj ={
            detailList:[],
            total:{}
        };
        let totalAssets = 0;
        let assetsInputFlag = false;
        for(var assetsKey in nextProps.assetsDetail){
            assetsObj.detailList.push(nextProps.assetsDetail[assetsKey]);
            if(nextProps.assetsDetail[assetsKey].amount != undefined && nextProps.assetsDetail[assetsKey].amount != ""){
                assetsInputFlag = true;
            }
        }
        assetsObj.detailList.map((map)=>{
            map.amount=String(map.amount).replace(/,/g,'');
            if(!isNaN(parseInt(map.amount))){
                totalAssets += parseFloat(map.amount);
            }
        })

        let liabilityObj ={
            detailList:[],
            total:{}
        };
        let totalLiability = 0; 
        let liabilityInputFlag = false;
        for(var liabilityKey in nextProps.liabilityDetail){
            liabilityObj.detailList.push(nextProps.liabilityDetail[liabilityKey]);
            if(nextProps.liabilityDetail[liabilityKey].amount != undefined && nextProps.liabilityDetail[liabilityKey].amount != ""){
                liabilityInputFlag = true;
            }
        }
        liabilityObj.detailList.map((map)=>{
            map.amount=String(map.amount).replace(/,/g,'');
            if(!isNaN(parseInt(map.amount))){
                totalLiability += parseFloat(map.amount);
            }
        })

        this.setState({
            incomeInputFlag : incomeInputFlag,
            expenseInputFlag : expenseInputFlag,
            assetsInputFlag : assetsInputFlag,
            liabilityInputFlag : liabilityInputFlag,
        
            incomeAmount:incomeObj.total.amount,
            expenseAmount:expenseObj.total.amount,
            assetAmount:assetsObj.total.amount,
            liabilityAmount:liabilityObj.total.amount,

            incomeDetail: nextProps.incomeDetail,
            expenseDetail: nextProps.expenseDetail,
            assetsDetail: nextProps.assetsDetail,
            liabilityDetail: nextProps.liabilityDetail
        });
            console.log("componentWillReceiveProps incomeObj",incomeObj);
            console.log("componentWillReceiveProps nextProps.incomeDetail",nextProps.incomeDetailObj);

        if(nextProps.renderToLanding == true){
            this.props.updateRenderIndicator();
            const target = '/group-sfp-war/main/en-gb/index';
            this.props.router.push(target);
        }
    }

    changeTotalAmount(event){
        let obj = this.state[event.target.id];
        obj = event.target.value;
        switch(event.target.id){
              case "incomeAmount" :
              this.setState({                   
                    incomeAmount:obj                
                });
              break;
              case "expenseAmount" :
              this.setState({                   
                    expenseAmount:obj                
                });
              break;
              case "assetAmount" :
              this.setState({                   
                    assetAmount:obj                
                });
              break;
              case "liabilityAmount" :
              this.setState({                   
                    liabilityAmount:obj                
                });
              break;
        }
    }

    changeAmount(event){
        let obj = this.state[event.target.id];
        obj[event.target.name].amount = event.target.value;
        switch(event.target.id){
            case "incomeDetail" :
                let incomeInputFlag = this.state.incomeInputFlag;
                let incomeDetail = this.state.incomeDetail; 
                let incomeObj ={
                    detailList:[],
                    total:{}
                };
                var totalIncome = 0;
                for(var incomeKey in incomeDetail){
                    incomeObj.detailList.push(incomeDetail[incomeKey]);
                    if(incomeKey != "monthlyIncomeObj" && (incomeDetail[incomeKey].amount != undefined && incomeDetail[incomeKey].amount != "")){
                        //incomeInputFlag = true;
                    }
                }
                incomeObj.detailList.map((map)=>{
                    map.amount=String(map.amount).replace(/,/g,'');
                    if(!isNaN(parseInt(map.amount))){
                        totalIncome += parseFloat(map.amount);
                    }
                })
                incomeObj.total={
                    amount:totalIncome,
                    currencyCode:incomeDetail.personalDetail.currencyCode
                }
                this.setState({
                    incomeInputFlag:incomeInputFlag,
                    incomeAmount:incomeObj.total.amount,
                    incomeObj:incomeObj,
                    incomeDetail:obj
                });
            break;
            case "expenseDetail" :
                let expenseInputFlag = false;
                let expenseDetail = this.state.expenseDetail;
                let expenseObj ={
                    detailList:[],
                    total:{}
                };
                var totalExpense = 0;
                for(var expenseKey in expenseDetail){
                    expenseObj.detailList.push(expenseDetail[expenseKey]);
                    if(expenseKey != "monthlyExpenseObj" && (expenseDetail[expenseKey].amount != undefined && expenseDetail[expenseKey].amount != "")){
                        // expenseInputFlag = true;
                    }
                }
                expenseObj.detailList.map((map)=>{
                    map.amount=String(map.amount).replace(/,/g,'');
                    if(!isNaN(parseInt(map.amount))){
                        totalExpense += parseFloat(map.amount);
                    }
                })
                expenseObj.total={
                    amount:totalExpense,
                    currencyCode:expenseDetail.personalDetail.currencyCode
                }
                this.setState({
                    expenseInputFlag:expenseInputFlag,
                    expenseAmount:expenseObj.total.amount,
                    expenseObj:expenseObj,
                    expenseDetail:obj
                });
            break;
            case "assetsDetail" :
                let assetsInputFlag = false;
                let assetsDetail = this.state.assetsDetail; 
                let assetsObj ={
                    detailList:[],
                    total:{}
                };
                var totalAssets = 0;
                for(var assetsKey in assetsDetail){
                    assetsObj.detailList.push(assetsDetail[assetsKey]);
                    if(assetsDetail[assetsKey].amount != undefined && assetsDetail[assetsKey].amount != ""){
                        // assetsInputFlag = true;
                    }
                }
                assetsObj.detailList.map((map)=>{
                    map.amount=String(map.amount).replace(/,/g,'');
                    if(!isNaN(parseInt(map.amount))){
                        totalAssets += parseFloat(map.amount);
                    }
                })
                assetsObj.total={
                    amount:totalAssets,
                    currencyCode:assetsDetail.savingCashDepositDetail.currencyCode
                }
                this.setState({
                    assetsInputFlag:assetsInputFlag,
                    assetAmount:assetsObj.total.amount,
                    assetsObj:assetsObj,
                    assetsDetail:obj
                });
            break;
            case "liabilityDetail" :
                let liabilityInputFlag = false;
                let liabilityDetail = this.state.liabilityDetail; 
                let liabilityObj ={
                    detailList:[],
                    total:{}
                };
                var totalLiability = 0;
                for(var liabilityKey in liabilityDetail){
                    liabilityObj.detailList.push(liabilityDetail[liabilityKey]);
                    if(liabilityDetail[liabilityKey].amount != undefined && liabilityDetail[liabilityKey].amount != ""){
                        // liabilityInputFlag = true;
                    }
                }
                liabilityObj.detailList.map((map)=>{
                    map.amount=String(map.amount).replace(/,/g,'');
                    if(!isNaN(parseInt(map.amount))){
                        totalLiability += parseFloat(map.amount);
                    }
                })
                liabilityObj.total={
                    amount:totalLiability,
                    currencyCode:liabilityDetail.mortgageLoanDetail.currencyCode
                }
                this.setState({
                    liabilityInputFlag:liabilityInputFlag,
                    liabilityAmount:liabilityObj.total.amount,
                    liabilityObj:liabilityObj,
                    liabilityDetail:obj
                });
            break;
        }
    }

    changeBox(id,event){
        var tabs = this.state.tabs;
        tabs[id] = event.target.value;
        this.setState({
            tabs
        });
        switch (id) {
            case "incomeTab" :
            let incomeObj = this.state["incomeDetail"];
            incomeObj["personalDetail"].amount = "";
            incomeObj["contriByFamliyDetial"].amount = "";
            incomeObj["divideIncomeDetail"].amount = "";
            incomeObj["rentalIncomeDetail"].amount = "";
            incomeObj["otherIncomeDetail"].amount = "";
            if(event.target.value==1){           
              this.setState({
              incomeAmount:0
              });
            }
            if(event.target.value==2){           
              this.setState({
              incomeInputFlag:false
              });
            }
            this.setState({
            incomeDetail:incomeObj
            });
            break;
            case "expenseTab":
            let expenseObj = this.state["expenseDetail"];
            expenseObj["personalDetail"].amount = "";
            expenseObj["mortgageRentalDetail"].amount = "";
            expenseObj["educationDetail"].amount = "";
            expenseObj["rentalPaymentDetial"].amount = "";
            expenseObj["otherDetail"].amount = "";
            expenseObj["monthInsuranceDetail"].amount = "";
            if(event.target.value==1){
              this.setState({
              expenseAmount:0
              });
            }
            if(event.target.value==2){           
              this.setState({
              expenseInputFlag:false
              });
            }
            this.setState({
            expenseDetail:expenseObj
            });
            break;
            case "assetsTab":
            let assetsObj = this.state["assetsDetail"];
            assetsObj["savingCashDepositDetail"].amount = "";
            assetsObj["investmentDetail"].amount = "";
            assetsObj["otherLiquidDetail"].amount = "";
            assetsObj["investmentPropertyDetail"].amount = "";
            assetsObj["oridinaryCPFDetail"].amount = "";
            assetsObj["nonliquidTrustsDetail"].amount = "";
            if(event.target.value==1){
              this.setState({
              assetAmount:0
              });
            }
            if(event.target.value==2){           
              this.setState({
              assetsInputFlag:false
              });
            }
            this.setState({
            assetsDetail:assetsObj
            });
            break;
            case "liabilityTab":
            let liabilityObj = this.state["liabilityDetail"];
            liabilityObj["mortgageLoanDetail"].amount = "";
            liabilityObj["shortNonDetail"].amount = "";
            liabilityObj["pernalLoanDetail"].amount = "";
            liabilityObj["longNonDetail"].amount = "";
            if(event.target.value==1){
              this.setState({
              liabilityAmount:0
              });
            }
            if(event.target.value==2){           
              this.setState({
              liabilityInputFlag:false
              });
            }
            this.setState({
            liabilityDetail:liabilityObj
            });
            break;
        }
        console.log("changeBox",tabs,id);
        console.log("changeBox incomeDetail",this.state.incomeDetail)
    }
    //show monthly
    showHideMonthly(newState){
        console.log("showMonthly",newState);
        if(newState!='PLEASE_SELECT'){
            this.setState({
                showMonthlyArea:true,
                commentKey:newState,
                otherCommentTextShow:newState=='OTHERS'?true:false
            })
        }else{
             this.setState({
                showMonthlyArea:false,
                commentKey:"",
                monthlyExpenseAmount:"",
                monthlyIncomeAmount:'',
                commentText:''
            })
        }
    }
//update fnaResult
    setFNAResult(event) {
        let targetName = event.target.name;
        switch(targetName) {
            case 'income':
                this.setState({incomeAmount:this.refs.income.value});
                this.setState({monthlySaving:this.refs.income.value - this.refs.expenses.value});
                this.setState({incomeInputFlag:false})

            break;
            case 'expenses':
                this.setState({expenseAmount:this.refs.expenses.value});
                this.setState({monthlySaving:this.refs.income.value - this.refs.expenses.value});
                this.setState({expenseInputFlag:false});
            break;
            case 'assets':
                this.setState({assetAmount:this.refs.assets.value});
                this.setState({netWorth:this.refs.assets.value - this.refs.liabilities.value});
                this.setState({assetsInputFlag:false});
            break;
            case 'liabilities':
                this.setState({liabilityAmount:this.refs.liabilities.value});
                this.setState({netWorth:this.refs.assets.value - this.refs.liabilities.value});
                 this.setState({libilityInputFlag:false});
            break;
            case 'monthlyIncome':
                this.setState({monthlyIncomeAmount:this.refs.monthlyIncome.value})
            break;
            case 'monthlyExpense':
                this.setState({monthlyExpenseAmount:this.refs.monthlyExpense.value})
            break;
            case 'commenText':
            console.log("this.refs.commentText.value",this.refs.commentText.value);
                this.setState({commentText:this.refs.commentText.value});
            default:
                    break;
        }
    }
 // show salesGuidance
    show () {
        if(this.state.isShow){
            this.setState({
                isShow:false
            });
        }else{
             this.setState({
                isShow:true
            });
        }
    }
    resultShow () {
        this.setState((preState, props) => {
            return { showResult:!preState.showResult };
        });
    }
    
    initFinancialProfile(){
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
            messageId:'retrieveFinancialSituationData'
         }
         this.props.initFNAData(fnaParams);
    }

    updateHSBCRecord(){
        this.initFinancialProfileAssest();
        this.initFinancialProfileIncome();
        this.initFinancialProfileExpenses();
        this.initFinancialProfileLiailities();
    }

    initFinancialProfileAssest(){
         this.props.initFnaAssestData();
    }
    initFinancialProfileIncome(){
         this.props.initFnaIncomeData();
    }
    initFinancialProfileExpenses(){
         this.props.initFnaExpensesData();
    }
    initFinancialProfileLiailities(){
         this.props.initFnaLiailitiesData();
    }

    componentWillMount(){
        this.initFinancialProfile();
        /*this.initFinancialProfileAssest();
        this.initFinancialProfileIncome();
        this.initFinancialProfileExpenses();
        this.initFinancialProfileLiailities();*/
    }
    
    goToDashboardPageHandle() {
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
    }

    pushAmountToArray(array,type){
        let obj = this.state[type];
        let totalAmount = 0;
        for(var p in obj){
            if(obj[p].amount != undefined && obj[p].amount != "undefined" && obj[p].amount !=""){
                array.push(obj[p]);
            }
            if(!isNaN(parseInt(obj[p].amount))){
                totalAmount += parseFloat(obj[p].amount);
            }
        }
        switch (type) {
            case "incomeDetail" :
            if(this.state.tabs["incomeTab"]==2){
                    totalAmount = this.state.incomeAmount==undefined?this.props.fnaObj.income.total.amount:this.state.incomeAmount;
            } 
            console.log("pushAmountToArray incomeTab",this.state.tabs["incomeTab"]);
                array.push({
                    amount : totalAmount,
                    currencyCode : "HKD",
                    typeCode : "TOTAL_INC"
                });
            break;
            case "expenseDetail" :
            if(this.state.tabs["expenseTab"]==2){
                    totalAmount = this.state.expenseAmount==undefined?this.props.fnaObj.expense.total.amount:this.state.expenseAmount;
            } 
                array.push({
                    amount : totalAmount,
                    currencyCode : "HKD",
                    typeCode : "TOTAL_EXP"
                });
            break;
            case "assetsDetail" :
            if(this.state.tabs["assetsTab"]==2){
                    totalAmount = this.state.assetAmount==undefined?this.props.fnaObj.assets.total.amount:this.state.assetAmount;
            } 
                array.push({
                    amount : totalAmount,
                    currencyCode : "HKD",
                    typeCode : "TOTAL_AST"
                });
            break;
            case "liabilityDetail" :
            if(this.state.tabs["liabilityTab"]==2){
                    totalAmount = this.state.liabilityAmount==undefined?this.props.fnaObj.liability.total.amount:this.state.liabilityAmount;
            } 
                array.push({
                    amount : totalAmount,
                    currencyCode : "HKD",
                    typeCode : "TOTAL_LIA"
                });
            break;
        }
    }

    //save recordFinancialSituationData
    saveRecord(errors){
        console.log("FNA errors",errors);
        let incomeArray = [];
        this.pushAmountToArray(incomeArray,"incomeDetail");

        let expenseArray = [];
        this.pushAmountToArray(expenseArray,"expenseDetail");

        let liabilityArray = [];
        this.pushAmountToArray(liabilityArray,"liabilityDetail");

        let assetsArray = [];
        this.pushAmountToArray(assetsArray,"assetsDetail");

        // let monthlyExpense={},monthlyIncome={}
        // if(this.state.showMonthlyArea ||(!ObjectHelper.isNullOrEmpty(this.props.fnaObj.MIAESelected.commentKey)&&this.state.commentKey==undefined)){
        //         monthlyIncome.amount = this.state.monthlyIncomeAmount==undefined? this.props.incomeDetail.monthlyIncomeObj.incomeAmount:this.state.monthlyIncomeAmount;
        //         monthlyIncome.typeCode = this.props.incomeDetail.monthlyIncomeObj.typeCode==undefined?'DEC_TOTAL_INC':this.props.incomeDetail.monthlyIncomeObj.typeCode;
        //         monthlyIncome.currencyCode = this.props.fnaObj.baseCurrenyCode;
        //         incomeArray.push(monthlyIncome);
        //         monthlyExpense.amount = this.state.monthlyExpenseAmount==undefined?this.props.expenseDetail.monthlyExpenseObj.expenseAmount:this.state.monthlyExpenseAmount;
        //         monthlyExpense.typeCode = this.props.expenseDetail.monthlyExpenseObj.typeCode==undefined?'DEC_TOTAL_EXP':this.props.expenseDetail.monthlyExpenseObj.typeCode;
        //         monthlyExpense.currencyCode = this.props.fnaObj.baseCurrenyCode;
        //         expenseArray.push(monthlyExpense);
        // }
        //save indicator
        let investorIndicatorArray = [];
        let  efIndicatorObj = {
                "indicatorValue":this.state.efIndicator==undefined?this.props.EFIndicatorDetail.indicatorValue:this.state.efIndicator,
                "indicatorAcceptanceDateTime": null,
                "indicatorExpiryDateTime": null,
                "indicatorKey": this.props.EFIndicatorDetail.indicatorKey==undefined?'EF':this.props.EFIndicatorDetail.indicatorKey,
            }
          investorIndicatorArray.push(efIndicatorObj);  
        let  pvcIndicatorObj = {
                "indicatorValue":this.state.pvcIndicator==undefined?this.props.pvcIndicatorDetail.indicatorValue:this.state.pvcIndicator,
                "indicatorAcceptanceDateTime": null,
                "indicatorExpiryDateTime": null,
                "indicatorKey": this.props.pvcIndicatorDetail.indicatorKey==undefined?'PVC_EAI':this.props.pvcIndicatorDetail.indicatorKey,
            }
        investorIndicatorArray.push(pvcIndicatorObj);  
         // let dciIndicatorObj = {
         //       "indicatorValue":this.state.assetsDetail.assetDci.val=='Y'?'Y':(this.state.dciIndicator=='Y'?'Y':'N'),
         //      "indicatorAcceptanceDateTime": null,
         //      "indicatorExpiryDateTime": null,
         //       "indicatorKey": this.props.dciIndicatorDetail.indicatorKey==undefined?'DCI':this.props.dciIndicatorDetail.indicatorKey,
         //  }
         // investorIndicatorArray.push(dciIndicatorObj);  
        let numberOfDependents = (this.state.denpendentNum == undefined ? this.props.fnaObj.dependentNo : this.state.denpendentNum);
        let MIAESelected={
            commentType:this.props.fnaObj.MIAESelected.commentType,
            commentKey:this.state.commentKey==undefined?this.props.fnaObj.MIAESelected.commentKey:(this.state.commentKey==''?null:this.state.commentKey)
        }
        let saveFNARequest = {
            income:incomeArray,
            expense:expenseArray,
            liability:liabilityArray,
            // monthlyIncome:monthlyIncome,
            // monthlyExpense:monthlyExpense,
            assets:assetsArray,
            numberOfDependents:numberOfDependents,
            commentAction:[],
            emergencyFund:[],
            investorIndicator:investorIndicatorArray,
            MIAESelected:MIAESelected,
            additionalSituation:[],
            messageId:'recordFinancialSituationData'
        }
        console.log("saveFNARequest",saveFNARequest);
        this.props.recordFinancialSituationData(saveFNARequest);
    }
    handleDenpendentNum(num){
        this.setState({
            denpendentNum:num
        })
    }
    handEFIndicator(e){
       this.setState({
           efIndicator:e.target.value
       });
    }
    handPvcIndicator(e){
        this.setState({
            pvcIndicator:e.target.value
        });
    }
    
    changeDci(event){
        console.log("changeDci",event.target.value);
        this.setState({
            dciIndicator: event.target.value
        });
    }

    retrieveFxrateByCurrency(targetCurrency){
        console.log('targetCurrency ==============' + targetCurrency);
        let request = {
        targetCurrency: targetCurrency,
        messageId:'retrieveByCurrency'
        }
        console.log('request ==============' + request);
        this.props.retrieveFxrateByCurrency(request);
        console.log('retrieveFxrateDetail.end');      
    }

    render () {
        const isShow = this.state.isShow;
        const showResult = this.state.showResult;
        const isShowMonthly = this.state.showMonthlyArea;       

        const {fnaObj,incomeDetail,assetsDetail,expenseDetail,liabilityDetail,pvcIndicatorDetail,EFIndicatorDetail,
              dciIndicatorDetail,fnaDataModel,fxrateDetail,assetReferenceRecord,incomeReferenceRecord,expensesReferenceRecord,liabilitiesReferenceRecord} = this.props;
        // if(fnaObj.MIAESelected===undefined){
        //     fnaObj.MIAESelected={
        //         commentType:null,
        //         commentKey:null
        //     }
        // }
        
        const boxes = [
            { title: 'Break down', value: "1" },
            { title: 'Total', value: "2" }
        ];
        let hideStyle ={
            display : "none"
        };

        console.log("pvcIndicatorDetail.....",fnaObj.MIAESelected.commentKey,this.state.commentKey,isShowMonthly,pvcIndicatorDetail,EFIndicatorDetail.indicatorValue,null==undefined);
        console.log("assetsDetail.....",assetsDetail);
        console.log("incomeDetail.....",incomeDetail);
        console.log("this.props.incomeDetail.monthlyIncomeRecordObj......",this.props.incomeDetail.monthlyIncomeRecordObj);
        console.log("this.state.incomeDetail.monthlyIncomeRecordObj......",this.state.incomeDetail.monthlyIncomeRecordObj);
        console.log("this.state.liabilityDetail",this.state.liabilityDetail);
        console.log("fxrateDetail.....",fxrateDetail);
        console.log("dciIndicatorDetail.....",dciIndicatorDetail);
        console.log("this.state.monthlySaving",this.state.monthlySaving);
        console.log("this.state.incomeAmount",this.state.incomeAmount);
        console.log("assetReferenceRecord",assetReferenceRecord);
        console.log("incomeReferenceRecord",incomeReferenceRecord);
        console.log("expensesReferenceRecord",expensesReferenceRecord);
        console.log("liabilitiesReferenceRecord",liabilitiesReferenceRecord);
        

        return (

            <div>
                <div className={styles.bodyBackground}>
                    <div className={styles.pageHeader}>   
                        <h4>
                            <span className={styles.pageTitle}>Financial profile</span>
                        </h4>     
                       <div >
                        <div className={styles.updateHsbc}>
                       <a className={styles.hkdafont} href="javascript:void(0);" onClick={this.updateHSBCRecord}>Update HSBC Record</a>
                       </div> 
                        <div className={styles.Hkd}> 
                        <CurrencySelect ccyObj={fxrateDetail.fxrateObj}/>
                       </div>
                
                   </div>

                    </div>
                </div>
              
                <div className={styles.bodyBackground}>
                    <div className={styles.mainBackground}>
                        <div className={styles.financialProfilePage}>
                            <h4>
                                <span className={styles.title}>Income</span>
                            </h4>
                            <div className={styles.salesMain}>
                                <div className={styles.theme}>
                                    <div className={styles.AmountTable} style={this.state.tabs.incomeTab == 1?{}:hideStyle}>
                                        <table>
                                            <tr>
                                                <td>Income</td>
                                                <td className={styles.tdexpand} >Amount</td>
                                                <td >HSBC record</td>
                                                <td>Deviation</td>
                                                <td >Remarks</td>
                                            </tr>
                                            <tr>
                                                <td>Persional income</td>
                                                <td>
                                                    <div>
                                                        <AmountText id="incomeDetail" name="personalDetail" currencyCode={this.state.incomeDetail.personalDetail.currencyCode}  amount={this.state.incomeDetail.personalDetail.amount} onChange={this.changeAmount}/>
                                                       
                                                        <p className={styles.detail}>
                                                            <FontIcon icon="circle-help-solid" />
                                                            <div className={styles.detailHide}>
                                                               <div className={styles.detailOverlay}>
                                                                    <p className={styles.link} />
                                                                    <p className={styles.link1} />
                                                                    <div className={styles.detailText}>
                                                                        <p>Personal income, e.g. the salary that you receive.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </p>
                                                    </div>
                                                </td>
                                                <td id="financialProfilePanel_monthlyIncomeRecordObj" ><CcyAmtDisplay ccyAmtObj={incomeReferenceRecord} ccyFxObj={fxrateDetail.fxrateObj}/></td>
                                                <td></td>
                                                <td><a href=""> <FontIcon icon="edit" className={styles.iconEdit} /></a></td>                                              
                                            </tr>
                                            <tr>
                                                <td>Contribution by family member</td>
                                                <td>
                                                    <div className={styles.expandiv}>
                                                    <AmountText id="incomeDetail" name="contriByFamliyDetial" currencyCode={this.state.incomeDetail.contriByFamliyDetial.currencyCode} amount={this.state.incomeDetail.contriByFamliyDetial.amount} onChange={this.changeAmount}/>
                                                     </div> 
                                                    </td>
                                                <td></td>
                                                <td></td>
                                                                                            
                                            </tr>
                                            <tr>
                                                <td>Dividend / Interest income</td>
                                                <td><AmountText id="incomeDetail" name="divideIncomeDetail" currencyCode={this.state.incomeDetail.divideIncomeDetail.currencyCode} amount={this.state.incomeDetail.divideIncomeDetail.amount} onChange={this.changeAmount}/></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Rental income</td>
                                                <td>
                                                    <div className={styles.expandiv}>
                                                        <AmountText id="incomeDetail" name="rentalIncomeDetail" currencyCode={this.state.incomeDetail.rentalIncomeDetail.currencyCode} amount={this.state.incomeDetail.rentalIncomeDetail.amount} onChange={this.changeAmount}/>
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Other income</td>
                                                <td><AmountText id="incomeDetail" name="otherIncomeDetail" currencyCode={this.state.incomeDetail.otherIncomeDetail.currencyCode} amount={this.state.incomeDetail.otherIncomeDetail.amount} onChange={this.changeAmount}/></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Total income</td>
                                                <td colSpan="4">HKD {this.state.incomeAmount==undefined?fnaObj.income.total.amount:this.state.incomeAmount}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bodyBackground}>
                    <div className={styles.mainBackground}>
                        <div className={styles.financialProfilePage}>
                            <h4>
                                <span className={styles.title}>Expense</span>
                            </h4>
                            <div className={styles.salesMain}>
                                <div className={styles.theme}>
                                    <div className={styles.AmountTable} style={this.state.tabs.expenseTab == 1?{}:hideStyle}>
                                        <table>
                                            <tr>
                                                <td>Expenses</td>
                                                <td className={styles.tdexpand}>Amount</td>
                                                <td>HSBC record</td>
                                                <td className={styles.tdclear}></td>
                                                <td>Deviation</td>
                                                <td>Remarks</td>
                                            </tr>
                                            <tr>
                                                <td>Personal and family living expenses</td>
                                                <td>
                                                    <div>
                                                        <AmountText id="expenseDetail" name="personalDetail" currencyCode={this.state.expenseDetail.personalDetail.currencyCode} amount={this.state.expenseDetail.personalDetail.amount} onChange={this.changeAmount}/>
                                                        {/*<p className={styles.detail}>
                                                            <FontIcon icon="circle-help-solid" />
                                                            <div className={styles.detailHide}>
                                                               <div className={styles.detailOverlay}>
                                                                    <p className={styles.link} />
                                                                    <p className={styles.link1} />
                                                                    <div className={styles.detailText}>
                                                                        <p>Personal income, e.g. the salary that you receive.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </p>*/}
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Mortage / Rental payment</td>
                                                <td>
                                                     <div className={styles.expandiv}>
                                                    <AmountText id="expenseDetail" name="mortgageRentalDetail" currencyCode={this.state.expenseDetail.mortgageRentalDetail.currencyCode} amount={this.state.expenseDetail.mortgageRentalDetail.amount} onChange={this.changeAmount}/>
                                                    </div>
                                                    </td>
                                                <td id="financialProfilePanel_mortgageRentalPaymentRecordObj"><CcyAmtDisplay ccyAmtObj={expensesReferenceRecord.mortgageRentalPaymentRecordObj} ccyFxObj={fxrateDetail.fxrateObj}/></td>
                                                <td></td>
                                                <td></td>
                                                <td><a href=""> <FontIcon icon="edit" className={styles.iconEdit} /></a></td>
                                            </tr>
                                            <tr>
                                                <td>Education expenses</td>
                                                <td><AmountText id="expenseDetail" name="educationDetail" currencyCode={this.state.expenseDetail.educationDetail.currencyCode} amount={this.state.expenseDetail.educationDetail.amount} onChange={this.changeAmount}/></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Provident Fund/MPF contribution</td>
                                                <td>
                                                    <div className={styles.expandiv}>
                                                    <AmountText id="expenseDetail" name="rentalPaymentDetial" currencyCode={this.state.expenseDetail.rentalPaymentDetial.currencyCode} amount={this.state.expenseDetail.rentalPaymentDetial.amount} onChange={this.changeAmount}/>
                                                    </div>
                                                    </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Other expenses</td>
                                                <td><AmountText id="expenseDetail" name="otherDetail" currencyCode={this.state.expenseDetail.otherDetail.currencyCode} amount={this.state.expenseDetail.otherDetail.amount} onChange={this.changeAmount}/></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Monthly insurance premium</td>
                                                <td>
                                                    <div className={styles.expandiv}>
                                                    <AmountText id="expenseDetail" name="monthInsuranceDetail" currencyCode={this.state.expenseDetail.monthInsuranceDetail.currencyCode} amount={this.state.expenseDetail.monthInsuranceDetail.amount} onChange={this.changeAmount}/>
                                                    </div>
                                                    </td>
                                                <td id="financialProfilePanel_lifeInsurancePremiumRecordObj">
                                                    <span>Life insurance</span>
                                                    <p></p>
                                                    <CcyAmtDisplay ccyAmtObj={expensesReferenceRecord.lifeInsurancePremiumRecordObj} ccyFxObj={fxrateDetail.fxrateObj}/>
                                                </td>
                                                <td className={styles.tdexpand2} id="financialProfilePanel_monthlyInsurancePremiumRecordObj">
                                                    <span>General insurance</span>
                                                    <p></p>
                                                    <CcyAmtDisplay ccyAmtObj={expensesReferenceRecord.monthlyInsurancePremiumRecordObj} ccyFxObj={fxrateDetail.fxrateObj}/>
                                                </td>
                                                <td></td>
                                                <td><a href=""> <FontIcon icon="edit" className={styles.iconEdit} /></a></td>
                                            </tr>
                                            <tr>
                                                <td>Total expense</td>
                                                <td colSpan="4">HKD {this.state.expenseAmount==undefined?fnaObj.expense.total.amount:this.state.expenseAmount}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bodyBackground}>
                    <div className={styles.mainBackground}>
                        <div className={styles.financialProfilePage}>
                            <h4>
                                <span className={styles.title}>Assets</span>
                            </h4>
                            <div className={styles.salesMain}>
                                <div className={styles.theme}>
                                    <div className={styles.AmountTable} style={this.state.tabs.assetsTab == 1?{}:hideStyle}>
                                        <table>
                                            <tr>
                                                <td>Assets</td>
                                                <td className={styles.tdexpand}> HSBC Amount</td>
                                                <td>Non HSBC Amount</td>
                                                <td>HSBC record</td>
                                                <td>Deviation</td>
                                                <td>Remarks</td>
                                            </tr>
                                            <tr>
                                                <td>Saving including cash and deposit</td>
                                                <td>
                                                    <div>
                                                        <AmountText id="assetsDetail" name="savingCashDepositDetail" currencyCode={this.state.assetsDetail.savingCashDepositDetail.currencyCode} amount={this.state.assetsDetail.savingCashDepositDetail.amount} onChange={this.changeAmount}/>
                                                    </div>
                                                </td>
                                                <td></td>

                                                <td id="financialProfilePanel_assetSavingObj">
                                                    {
                                                    this.state.dciIndicator=='Y'||dciIndicatorDetail.indicatorValue=='Y' || (assetReferenceRecord.assetDci!=undefined && assetReferenceRecord.assetDci.val=='Y')
                                                    ?<CcyAmtDisplay ccyAmtObj={assetReferenceRecord.assetSavingObj} ccyFxObj={fxrateDetail.fxrateObj}/>
                                                    :<FormattedMessage id='common.not.available'/>
                                                    }
                                                </td>                     
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Investments including stock / securities / bonds / certificate of deposit / unit trusts / currency-linked / structured notes</td>
                                                <td>
                                                     <div className={styles.expandiv}>
                                                    <AmountText id="assetsDetail" name="investmentDetail" currencyCode={this.state.assetsDetail.investmentDetail.currencyCode} amount={this.state.assetsDetail.investmentDetail.amount} onChange={this.changeAmount}/>
                                                    </div>
                                                    </td>
                                                <td></td>
                                                <td id="financialProfilePanel_assetInvestmentObj">
                                                    <div className={styles.expandiv}>
                                                    <CcyAmtDisplay ccyAmtObj={assetReferenceRecord.assetInvestmentObj} ccyFxObj={fxrateDetail.fxrateObj}/>
                                                    </div>
                                                    </td>
                                                <td></td>
                                                <td><a href=""> <FontIcon icon="edit" className={styles.iconEdit} /></a></td>
                                            </tr>
                                            <tr>
                                                <td>Other liquid assets</td>
                                                <td><AmountText id="assetsDetail" name="otherLiquidDetail" currencyCode={this.state.assetsDetail.otherLiquidDetail.currencyCode} amount={this.state.assetsDetail.otherLiquidDetail.amount} onChange={this.changeAmount}/></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Investment property (excluding self-use property)</td>
                                                <td>
                                                    <div className={styles.expandiv}>
                                                    <AmountText id="assetsDetail" name="investmentPropertyDetail" currencyCode={this.state.assetsDetail.investmentPropertyDetail.currencyCode} amount={this.state.assetsDetail.investmentPropertyDetail.amount} onChange={this.changeAmount}/>
                                                    </div>
                                                    </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Provident fund/MPF accumulation</td>
                                                <td><AmountText id="assetsDetail" name="oridinaryCPFDetail" currencyCode={this.state.assetsDetail.oridinaryCPFDetail.currencyCode} amount={this.state.assetsDetail.oridinaryCPFDetail.amount} onChange={this.changeAmount}/></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Other non-liquid Assets (excluding cash value of life insurance)</td>
                                                <td>
                                                    <div className={styles.expandiv}>
                                                    <AmountText id="assetsDetail" name="nonliquidTrustsDetail" currencyCode={this.state.assetsDetail.nonliquidTrustsDetail.currencyCode} amount={this.state.assetsDetail.nonliquidTrustsDetail.amount} onChange={this.changeAmount}/>
                                                    </div>
                                                    </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Total Assets</td>
                                                <td colSpan="5">HKD {this.state.assetAmount==undefined?fnaObj.assets.total.amount:this.state.assetAmount}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div id="depositConsentSection" className={classNames(styles.choose, styles.clearfix)} onChange={this.changeDci.bind(this)} style={assetReferenceRecord.assetDci.val=='Y'||dciIndicatorDetail.indicatorValue=='Y'?hideStyle:{}}>
                                            <p>One-off deposit consent</p>
                                        <div className={styles.radioCheck} >
                                            <input type="radio" value="Y" id="depositConsent_radio_yes" checked={this.state.dciIndicator=='Y'} name="dci"/>
                                                <label htmlFor="depositConsent_radio_yes">
                                                    Yes
                                                </label>
                                        </div>
                                        <div className={styles.radioCheck}>
                                            <input type="radio" value="N" id="depositConsent_radio_no" checked={this.state.dciIndicator=='N'} name="dci"/>
                                                <label htmlFor="depositConsent_radio_no">
                                                    No
                                                </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bodyBackground}>
                    <div className={styles.mainBackground}>
                        <div className={styles.financialProfilePage}>
                            <h4>
                                <span className={styles.title}>Liabilities</span>
                            </h4>
                            <div className={styles.salesMain}>
                                <div className={styles.theme}>
                                    <div className={styles.AmountTable} style={this.state.tabs.liabilityTab == 1?{}:hideStyle}>
                                        <table>
                                            <tr>
                                                <td>Liabilities</td>
                                                <td className={styles.tdexpand}>HSBC Amount</td>
                                                <td>Non HSBC Amount</td>
                                                <td>HSBC record</td>
                                                <td>Deviation</td>
                                                <td>Remarks</td>
                                            </tr>
                                            <tr>
                                                <td>Mortgage loans(both for self-use and investment properties)</td>
                                                <td>
                                                    <div>
                                                        <AmountText id="liabilityDetail" name="mortgageLoanDetail" currencyCode={this.state.liabilityDetail.mortgageLoanDetail.currencyCode} amount={this.state.liabilityDetail.mortgageLoanDetail.amount} onChange={this.changeAmount}/>                                                  
                                                    </div>
                                                </td>
                                                <td><AmountText id="liabilityDetail" name="shortNonDetail" currencyCode={this.state.liabilityDetail.shortNonDetail.currencyCode} amount={this.state.liabilityDetail.shortNonDetail.amount} onChange={this.changeAmount}/></td>
                                                <td id="financialProfilePanel_morgageLoansRecordObj"><CcyAmtDisplay ccyAmtObj={liabilitiesReferenceRecord.morgageLoansRecordObj} ccyFxObj={fxrateDetail.fxrateObj}/></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Other personal loans and debts</td>
                                                <td>
                                                   <div className={styles.expandiv}>
                                                    <AmountText id="liabilityDetail" name="pernalLoanDetail" currencyCode={this.state.liabilityDetail.pernalLoanDetail.currencyCode} amount={this.state.liabilityDetail.pernalLoanDetail.amount} onChange={this.changeAmount}/>
                                                     </div>
                                                    </td>
                                                <td>
                                                    <div className={styles.expandiv}>
                                                    <AmountText id="liabilityDetail" name="longNonDetail" currencyCode={this.state.liabilityDetail.longNonDetail.currencyCode} amount={this.state.liabilityDetail.longNonDetail.amount} onChange={this.changeAmount}/>
                                                    </div>
                                                    </td>
                                                <td id="financialProfilePanel_otherPersonalLoansAndDebtsRecordObj">
                                                    <div className={styles.expandiv}>
                                                    <CcyAmtDisplay ccyAmtObj={liabilitiesReferenceRecord.otherPersonalLoansAndDebtsRecordObj} ccyFxObj={fxrateDetail.fxrateObj}/>
                                                    </div>
                                                    </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Total liability</td>
                                                <td colSpan="4">HKD {this.state.liabilityAmount==undefined?fnaObj.liability.total.amount:this.state.liabilityAmount}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bodyBackground}>
                    <div className={styles.mainBackground}>
                        <div className={styles.financialProfilePage}>
                            <h4>
                                <span className={styles.title}>Additional Information</span>
                            </h4>
                            {/*Additional check box*/}
                            <div className={styles.salesMain}>
                                <div className={styles.theme}>
                                    <div className={styles.AmountTable}>
                                        <SelectIncomeComponent  callbackParent={this.showHideMonthly} selectKey={fnaObj.MIAESelected}/>
                                        {(!ObjectHelper.isNullOrEmpty(fnaObj.MIAESelected.commentKey)&&this.state.commentKey==undefined)||isShowMonthly?<div className={styles.monthly}>
                                        {this.state.otherCommentTextShow?
                                        <div><textArea name="commenText" ref='commentText' onChange={this.setFNAResult} cols="50" rows='3'></textArea></div>:null}
                                        <p className={styles.strong}><strong>As a result you agree to use the following monthly income and monthly expenses to caculate
                                            your disposable income and consider your affordability instead:</strong></p>
                                        <div className={classNames(styles.average, styles.clearfix)}>
                                            <div className={styles.income}>
                                                <div className={styles.list}>
                                                    <p className={styles.minHeight}>Monthly income</p>
                                                    <div className={styles.currencyType}>
                                                        <span>HKD</span>
                                                        <input type="text" value={this.state.monthlyIncomeAmount==undefined?incomeDetail.monthlyIncomeObj.incomeAmount:this.state.monthlyIncomeAmount} onChange={this.setFNAResult} name="monthlyIncome" ref="monthlyIncome" className={styles.num} placeholder="50,000" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.expenses}>
                                                <div className={styles.list}>
                                                    <p className={styles.minHeight}>Monthly expenses</p>
                                                    <div className={styles.currencyType}>
                                                    <span>HKD</span>
                                                    <input type="text" value={this.state.monthlyExpenseAmount==undefined?expenseDetail.monthlyExpenseObj.expenseAmount:this.state.monthlyExpenseAmount} onChange={this.setFNAResult} name="monthlyExpense" ref="monthlyExpense" className={styles.num} placeholder="50,000" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div></div>:null}
                                        <div className={styles.border}><br/></div>
                                        <SelectNumDependentComponent denpendentNum={fnaObj.dependentNo} callbackParent={this.handleDenpendentNum.bind(this)}/>
                                        <div className={classNames(styles.choose, styles.clearfix)}  onChange={this.handEFIndicator.bind(this)}>
                                            <p>Do you have at least 6 months of personal / household expenses set aside as emergency funds?
                                                <FontIcon icon="circle-help-solid" className={styles.iconEdit} />
                                            </p>
                                            <div className={styles.radioCheck}>
                                                <input type="radio" checked={(EFIndicatorDetail.indicatorValue=="Y"&&this.state.efIndicator==undefined)||this.state.efIndicator=="Y"} value="Y" id="yesExpense" name="judgment" />
                                                <label htmlFor="yesExpense">
                                                    Yes
                                                </label>
                                                            
                                                </div>
                                                <div className={styles.radioCheck}>
                                                    <input type="radio" checked={(EFIndicatorDetail.indicatorValue=='N'&&this.state.efIndicator==undefined)||this.state.efIndicator=='N'} value="N"   id="noExpense" name="judgment"  />
                                                    <label htmlFor="noExpense">
                                                        No
                                                    </label>
                                                </div>
                                            </div>
                                            <div className={classNames(styles.choose, styles.clearfix)} onChange={this.handPvcIndicator.bind(this)}>
                                                <p>Do you have regular income and totoal current assets of HKD 50,000 or more?</p>
                                                <div className={styles.radioCheck} >
                                                <input type="radio" checked={(pvcIndicatorDetail.indicatorValue=='Y'&&this.state.pvcIndicator==undefined) || this.state.pvcIndicator=="Y"} value='Y' name="radioAssets" id="yesAssets"  />
                                                    <label htmlFor="yesAssets">Yes</label>     
                                                </div>
                                                <div className={styles.radioCheck} >
                                                <input type="radio" checked={(pvcIndicatorDetail.indicatorValue=='N'&&this.state.pvcIndicator==undefined) || this.state.pvcIndicator=="N"} value='N' name="radioAssets" id="noAssets" />
                                                <label htmlFor="noAssets">No</label>   
                                            </div>
                                        </div>
                                        <div className={styles.prompt}>
                                            <input type="checkbox" className={styles.chkbox} id="chkbox" />
                                            <label htmlFor="chkbox" />
                                            <span className={styles.description}>
                                                Yes.I agree that financial profile is up-to-date
                                            </span>
                                        </div>
                                        <h3>
                                        <span className={styles.title}>Financial results</span>
                                        {showResult ? <a href="javascript:;" className={styles.dropDown} onClick={this.resultShow}><FontIcon icon="chevron-down" className={styles.icon} /></a> :
                                            <a href="javascript:;" className={styles.up} onClick={this.resultShow}><FontIcon icon="chevron-up" className={styles.icon} /></a>}
                                        </h3>
                                        {showResult ? <div className={classNames(styles.results, styles.clearfix)}>
                                        <div className={styles.showLeft}>
                                            <ul>
                                                <li>Average monthly savings (Monthly disposable income)</li>
                                                <li>Income<span>{fnaObj.income.total.currencyCode} {this.state.incomeAmount==undefined?fnaObj.income.total.amount:this.state.incomeAmount}</span></li>
                                                <li>expenses<span>{fnaObj.expense.total.currencyCode} {this.state.expenseAmount==undefined?fnaObj.expense.total.amount:this.state.expenseAmount}</span></li>
                                                <li>Average monthly savings<br />(Monthly disposable income)<span>{fnaObj.income.total.currencyCode} {this.state.monthlySaving==null ?fnaObj.income.total.amount-fnaObj.expense.total.amount:this.state.monthlySaving}</span></li>
                                            </ul>
                                        </div>
                                        <div className={styles.showRight}>
                                            <ul>
                                                <li>Net worth</li>
                                                <li>Assets<span>{fnaObj.assets.total.currencyCode} {this.state.assetAmount==undefined?fnaObj.assets.total.amount:this.state.assetAmount}</span></li>

                                                <li>Liabiities<span>{fnaObj.liability.total.currencyCode} {this.state.liabilityAmount==undefined?fnaObj.liability.total.amount:this.state.liabilityAmount}</span></li>
                                                <li>Net worth<br />(Monthly disposable income)<span>{fnaObj.netWorth.currencyCode} {this.state.netWorth == null? fnaObj.assets.total.amount-fnaObj.liability.total.amount:this.state.netWorth}</span></li>
                                            </ul>
                                        </div>
                                        </div> : null}
                                        
                                        <div className={styles.back}>
                                            <a href="javascript:void(0);" onClick={this.goToDashboardPageHandle}>
                                                <FontIcon icon="chevron-left" className={styles.icon} />Back</a>
                                            <a href="javascript:void(0);" className={styles.saveBtn} onClick={this.saveRecord}>Save</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default withLoadingScreenBeforeReadyToLeave(injectIntl(FinancialProfilePanel))