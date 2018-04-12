import sessionInfoService from '../../sessionInfoService'
import ObjectHelper from '../../../common/lib/ObjectHelper';
import formatHelper from '../../../common/lib/formatHelper';
import {goalSolutionDetailConfig} from '../../config/goalSolution/goalSolutionDetailConfig';
const goalSolutionDetailUtil={
    constructRequest:(goalSolutionDetailData)=>{
         /*request:{
            subserviceId:[],
            customers:[],
            goalKey:{},
            localeCode:{},
            requestInvestorIndicator:[],
            validation:[],
            requestComment:[],
            cacheIndicator:'',
            coreReserveArea:[],
            localFieldsArea:[]
        }*/
        console.log('goalSolutionDetailData...',goalSolutionDetailData);
        let request={

        }
         console.log('goalSolutionDetailRequest1...',request);
        let goalKey={};
        goalKey=goalSolutionDetailData.goalKey;
        request.goalKey={
            arrangementIdentifierFinancialPlanning: goalKey.planId,
            goalSequenceNumber:goalKey.goalId
        }
        
        request.subserviceId=goalSolutionDetailUtil.buildSubServiceId(goalSolutionDetailData);
        request.requestComment=goalSolutionDetailUtil.buildRequestComment(goalSolutionDetailData);
        let investorIndicatorKeyList=new String;
        investorIndicatorKeyList=goalSolutionDetailConfig.investorIndicatorKeyList;
        let IndicatorKeyList=investorIndicatorKeyList.split(',');
        let requestInvestorIndicator=new Array;
        for (let IndicatorKey = 0; IndicatorKey < IndicatorKeyList.length; IndicatorKey++) {
             let indicatorKey = IndicatorKeyList[IndicatorKey];
             let tempMap={};
             tempMap.indicatorKey=indicatorKey;
             requestInvestorIndicator.push(tempMap);
            
        }
        request.requestInvestorIndicator=requestInvestorIndicator;
        console.log('goalSolutionDetailRequest...',request);
        return request;
    },
   buildSubServiceId:(goalSolutionDetailData)=>{
        // pageMessageType sij /productSearch /meetingSummary / recentPlan /invGoalSummary
        let subServiceIds=new Array;
         if(!ObjectHelper.isNullOrEmpty(goalSolutionDetailData.pageMessageType)){
             subServiceIds=goalSolutionDetailConfig['retrieveGoalSolutionDetail_'+goalSolutionDetailData.pageMessageType+'_subServiceIds'];
        }else{
            subServiceIds=goalSolutionDetailConfig.retrieveGoalSolutionDetail_sij_subServiceIds;
        }
        
        let subServiceId=new Array;
        for (let i = 0; i < subServiceIds.length; i++) {
             let functionOutputCode = subServiceIds[i];
             let tempMap={};
             tempMap.functionOutputCode=functionOutputCode;
             subServiceId.push(tempMap);
            
        }
        return subServiceId;
   },
   buildRequestComment:(goalSolutionDetailData)=>{
         // pageMessageType sij /productSearch /meetingSummary / recentPlan /invGoalSummary
        let requestComments=new Array;
         if(!ObjectHelper.isNullOrEmpty(goalSolutionDetailData.pageMessageType)){
             requestComments=ObjectHelper.isNullOrEmpty( goalSolutionDetailConfig['retrieveGoalSolutionDetail_'+goalSolutionDetailData.pageMessageType+'_requestComment']) ? []: goalSolutionDetailConfig['retrieveGoalSolutionDetail_'+goalSolutionDetailData.pageMessageType+'_requestComment']; 
        }else{
            requestComments=[];
        }
        
        let requestComment=new Array;
        for (let i = 0; i < requestComments.length; i++) {
             let commentType = requestComments[i];
             let tempMap={};
             tempMap.commentType=commentType;
             requestComment.push(tempMap);
            
        }
        return requestComment;
   },
   buildPurposeBuyingProduct:(purposeBuyingProduct)=>{
        let PurposeBuyingProduct={};
        let purposeBuyingProductQuestions=[];
        let buyQuestionFlag=false;
        if(!ObjectHelper.isNullOrlengthZore(purposeBuyingProduct)){
            purposeBuyingProductQuestions=goalSolutionDetailUtil.defaultPurposeBuyingProduct();
            console.log('purposeBuyingProductQuestions...',purposeBuyingProductQuestions);
            for (let indexQuestions = 0; indexQuestions < purposeBuyingProductQuestions.length; indexQuestions++) {
                 let  purposeBuyingProductQuestion = purposeBuyingProductQuestions[indexQuestions];
                 for (let indexPBP = 0; indexPBP < purposeBuyingProduct.length; indexPBP++) {
                      let pBP = purposeBuyingProduct[indexPBP];
                      if(pBP.purposeBuyingProductCode==purposeBuyingProductQuestion.purposeBuyingProductCode){
                            purposeBuyingProductQuestions[indexQuestions].select='Y';
                            if(pBP.purposeBuyingProductCode=="PROD_UDR_OBJ_OTHER"){
                                purposeBuyingProductQuestions[indexQuestions].purposeBuyingProductText=pBP.purposeBuyingProductText
                            }
                            if(pBP.purposeBuyingProductCode=="PROD_UDR_OBJ_FUR_INC"){
                                         buyQuestionFlag=true; 
                            }
                            if(pBP.purposeBuyingProductCode=="PROD_UDR_OBJ_SAV"){
                                         buyQuestionFlag=true;
                            }
                            if(pBP.purposeBuyingProductCode=="PROD_UDR_OBJ_INV"){
                                         buyQuestionFlag=true;
                            }
                            if(pBP.purposeBuyingProductCode=="PROD_UDR_OBJ_OTHER"){
                                         buyQuestionFlag=true;
                            }
                            break;
                      }
                 }
            } 
        }
        PurposeBuyingProduct={
            buyQuestionFlag:buyQuestionFlag,
            purposeBuyingProductQuestions:purposeBuyingProductQuestions
        }
       return PurposeBuyingProduct;
   },
   buildpiqQuestAndAnsDetails:(piqQuestAndAnsDetails)=>{
        let saveQuestions={};
        let timeFramQuestions={};
        let preQuestions=[];
        let insinvperdQuestions=[];
        let invperiodQuestions=[];
        let piqQuestAndAns={}
        if(!ObjectHelper.isNullOrlengthZore(piqQuestAndAnsDetails)){
            // label 
            insinvperdQuestions=goalSolutionDetailUtil.defaultInsinvperdQuestions();
            invperiodQuestions=goalSolutionDetailUtil.defaultInvperiodQuestions();
            preQuestions=goalSolutionDetailUtil.defaultPreQuestions();
            saveQuestions=goalSolutionDetailUtil.defaultSaveQuestions();
            timeFramQuestions=goalSolutionDetailUtil.defaultTimeFramQuestions();
            console.log('preQuestions...',preQuestions);
            console.log('saveQuestions...',saveQuestions);
            console.log('timeFramQuestions...',timeFramQuestions);
            console.log('insinvperdQuestions...',insinvperdQuestions);
            console.log('invperiodQuestions...',invperiodQuestions);
            // filter
            for (let i = 0; i < piqQuestAndAnsDetails.length; i++) {
                 let  piqQuestAndAnsDetail = piqQuestAndAnsDetails[i];
                 // filter SAVAMTOPT
                 if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==goalSolutionDetailConfig.SAVAMTOPT){
                    if(piqQuestAndAnsDetail.investmentPreferenceCode==goalSolutionDetailConfig.WITH_VALUE){
                        saveQuestions.select='Y';   
                    }else{
                        saveQuestions.select='N';  
                    }
                 }
                 // filter SAVAMT 
                 if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==goalSolutionDetailConfig.SAVAMT){
                    if(piqQuestAndAnsDetail.investmentPreferenceCode==goalSolutionDetailConfig.SAVAMTVAL){
                        saveQuestions.savamtval=piqQuestAndAnsDetail.investmentPreferenceText;
                    }
                    if(piqQuestAndAnsDetail.investmentPreferenceCode==goalSolutionDetailConfig.SAVAMTCCY){
                        saveQuestions.savamtccy=piqQuestAndAnsDetail.investmentPreferenceText;
                    }
                 }      
                 // filter TIMFRAMOPT
                 if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==goalSolutionDetailConfig.TIMFRAMOPT){
                    if(piqQuestAndAnsDetail.investmentPreferenceCode==goalSolutionDetailConfig.WITH_VALUE){
                        timeFramQuestions.select='Y';   
                    }else{
                        timeFramQuestions.select='N';  
                    }
                 }
                 // filter TIMFRAMVAL 
                 if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==goalSolutionDetailConfig.TIMFRAMVAL){
                   for (let k = 0; k < timeFramQuestions.instimeframe_answers.length; k++) {
                        let instimeframe_answer = timeFramQuestions.instimeframe_answers[k];
                        let key=instimeframe_answer.value;
                        if(key==piqQuestAndAnsDetail.investmentPreferenceCode){
                            timeFramQuestions.instimeframe_answers[k].select='Y';
                            break;
                        }   
                   }
                 }
                 // filter INSINVPERD insinvperdQuestions
                 if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==goalSolutionDetailConfig.INSINVPERD){
                    for (let insinvperdIndex = 0; insinvperdIndex < insinvperdQuestions.length; insinvperdIndex++) {
                         let insinvperdElement = insinvperdQuestions[insinvperdIndex];
                         if(insinvperdElement.value==piqQuestAndAnsDetail.investmentPreferenceCode){
                             insinvperdQuestions[insinvperdIndex].select='Y';
                             break;
                         }
                    }
                 }
                 // filter INSCONPERD  invperiodQuestions
                  if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==goalSolutionDetailConfig.INSCONPERD){
                     for (let invperiodIndex = 0; invperiodIndex < invperiodQuestions.length; invperiodIndex++) {
                          let invperiodElement = invperiodQuestions[invperiodIndex];
                         if(invperiodElement.value==piqQuestAndAnsDetail.investmentPreferenceCode){
                             invperiodQuestions[invperiodIndex].select='Y';
                             break;
                         }
                    }
                 }
                  // filter ins_type:PRE_INSII,PRE_INSIL,PRE_INSP,PRE_INSS,PRE_OTHERS 
                 for (let preindex = 0; preindex < preQuestions.length; preindex++) {
                      let  preQuestion = preQuestions[preindex];
                     if(piqQuestAndAnsDetail.investmentPreferenceTypeCode==preQuestion.value){
                            if(piqQuestAndAnsDetail.investmentPreferenceCode=='Y'){
                                preQuestions[preindex].select='Y';
                                break;
                            }
                     }
                 }
            }
            // 
            piqQuestAndAns={
                saveQuestions:saveQuestions,
                timeFramQuestions:timeFramQuestions,
                preQuestions:preQuestions,
                insinvperdQuestions:insinvperdQuestions,
                invperiodQuestions:invperiodQuestions
            }
            console.log('piqQuestAndAns....',piqQuestAndAns);
        }
        return piqQuestAndAns;
   },
   buildneedEvaluation:(needEvaluation)=>{
       
       let insuranceNeedkeys=goalSolutionDetailConfig.insuranceNeedkeys;
       let needEvaluationList={};
       // supportFamilyAmount reserveExpenseAmount estatePlanAmount otherAmount ProGapAmount totalGap 
       //totalProNeedAmount mortAndDebetsAmount monIncomeAmount provideYear lumpSumAmount monReplaceAmount
       let supportFamilyAmount={
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       },
       reserveExpenseAmount={
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       },
       estatePlanAmount={
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       },
       otherAmount={
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       },
       ProGapAmount={
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       },
       totalGap={
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       },
       totalProNeedAmount={
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       },
       mortAndDebetsAmount={
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       },  
       monIncomeAmount={
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       },
       provideYear={ 
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       },
       lumpSumAmount={
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       },
       monReplaceAmount={
            insuranceNeedTypeCode:null,
            insuranceNeedOtherText:null,
            currencyInsuranceNeedCode:null,
            insuranceNeedAmount:''
       }
      
        if(!ObjectHelper.isNullOrlengthZore(needEvaluation)){
                for (let needEvaluationIndex = 0; needEvaluationIndex < needEvaluation.length; needEvaluationIndex++) {
                     let  needEvaluationDetail = needEvaluation[needEvaluationIndex];
                     //SUPPMFAM,ESTAPLAN,RESERLOT,OTHERS,PROTCGAP,TTLPRTCGAP,TOTPRONA,TPNMTGEDEB,TPNMOINCM,TPNSPTYR,TPNLMPSUM,TPNINCMREP
                     if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.SUPPMFAM){
                            supportFamilyAmount.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                 supportFamilyAmount.insuranceNeedAmount='';
                            }else{
                                supportFamilyAmount.insuranceNeedAmount=parseFloat(needEvaluationDetail.insuranceNeedAmount);
                            }
                            supportFamilyAmount.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText
                            supportFamilyAmount.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode
                     }else if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.ESTAPLAN){
                            estatePlanAmount.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                  estatePlanAmount.insuranceNeedAmount='';
                            }else{
                                 estatePlanAmount.insuranceNeedAmount=parseFloat(needEvaluationDetail.insuranceNeedAmount);
                            }
                            estatePlanAmount.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText;
                            estatePlanAmount.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode;
                     }else if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.RESERLOT){
                            reserveExpenseAmount.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                  reserveExpenseAmount.insuranceNeedAmount='';
                            }else{
                                 reserveExpenseAmount.insuranceNeedAmount=needEvaluationDetail.insuranceNeedAmount;
                            }
                            console.log('reserveExpenseAmount..',needEvaluationDetail.insuranceNeedAmount);
                            reserveExpenseAmount.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText;
                            reserveExpenseAmount.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode;
                     }else if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.OTHERS){
                            otherAmount.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                  otherAmount.insuranceNeedAmount=0;
                            }else{
                                 otherAmount.insuranceNeedAmount=parseFloat(needEvaluationDetail.insuranceNeedAmount);
                            }
                            otherAmount.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText;
                            otherAmount.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode;
                     }else if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.PROTCGAP){
                            ProGapAmount.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                  ProGapAmount.insuranceNeedAmount='';
                            }else{
                                 ProGapAmount.insuranceNeedAmount=parseFloat(needEvaluationDetail.insuranceNeedAmount);
                            }
                            ProGapAmount.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText;
                            ProGapAmount.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode; 
                     }else if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.TTLPRTCGAP){
                            totalGap.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                  totalGap.insuranceNeedAmount='';
                            }else{
                                 totalGap.insuranceNeedAmount=parseFloat(needEvaluationDetail.insuranceNeedAmount);
                            }
                            totalGap.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText;
                            totalGap.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode;
                     }else if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.TOTPRONA){
                            totalProNeedAmount.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                  totalProNeedAmount.insuranceNeedAmount='';
                            }else{
                                 totalProNeedAmount.insuranceNeedAmount=parseFloat(needEvaluationDetail.insuranceNeedAmount);
                            }
                            totalProNeedAmount.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText;
                            totalProNeedAmount.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode;
                     }else if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.TPNMTGEDEB){
                            mortAndDebetsAmount.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                  mortAndDebetsAmount.insuranceNeedAmount='';
                            }else{
                                 mortAndDebetsAmount.insuranceNeedAmount=parseFloat(needEvaluationDetail.insuranceNeedAmount);
                            }
                            mortAndDebetsAmount.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText;
                            mortAndDebetsAmount.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode;
                     }else if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.TPNMOINCM){
                            monIncomeAmount.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                  monIncomeAmount.insuranceNeedAmount='';
                            }else{
                                 monIncomeAmount.insuranceNeedAmount=parseFloat(needEvaluationDetail.insuranceNeedAmount);
                            }
                            monIncomeAmount.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText;
                            monIncomeAmount.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode;
                     }else if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.TPNSPTYR){
                            provideYear.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                  provideYear.insuranceNeedAmount='';
                            }else{
                                 provideYear.insuranceNeedAmount=needEvaluationDetail.insuranceNeedAmount;
                            }
                            provideYear.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText;
                            provideYear.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode;
                     }else if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.TPNLMPSUM){
                            lumpSumAmount.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                  totalumpSumAmountlGap.insuranceNeedAmount='';
                            }else{
                                 lumpSumAmount.insuranceNeedAmount=parseFloat(needEvaluationDetail.insuranceNeedAmount);
                            }
                            lumpSumAmount.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText;
                            lumpSumAmount.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode;
                     }else if(needEvaluationDetail.insuranceNeedTypeCode==insuranceNeedkeys.TPNINCMREP){
                            monReplaceAmount.currencyInsuranceNeedCode=needEvaluationDetail.currencyInsuranceNeedCode;
                            if(ObjectHelper.isNullOrEmpty(needEvaluationDetail.insuranceNeedAmount)){
                                  monReplaceAmount.insuranceNeedAmount='';
                            }else{
                                 monReplaceAmount.insuranceNeedAmount=parseFloat(needEvaluationDetail.insuranceNeedAmount)    ;
                            }
                            monReplaceAmount.insuranceNeedOtherText=needEvaluationDetail.insuranceNeedOtherText;
                            monReplaceAmount.insuranceNeedTypeCode=supportFamilyAmount.insuranceNeedTypeCode;
                     }              
                }
        }
        //supportFamilyAmount reserveExpenseAmount estatePlanAmount otherAmount ProGapAmount
        // totalGap totalProNeedAmount mortAndDebetsAmount monIncomeAmount provideYear lumpSumAmount monReplaceAmount
        if(supportFamilyAmount.insuranceNeedAmount==undefined){
            supportFamilyAmount.insuranceNeedAmount=0
        }
        if(reserveExpenseAmount.insuranceNeedAmount==undefined){
            reserveExpenseAmount.insuranceNeedAmount=0
        }
        if(estatePlanAmount.insuranceNeedAmount==undefined){
            estatePlanAmount.insuranceNeedAmount=0
        }
        if(otherAmount.insuranceNeedAmount==undefined){
            otherAmount.insuranceNeedAmount=0
        }   
        if(ProGapAmount.insuranceNeedAmount==undefined){
            ProGapAmount.insuranceNeedAmount=0
        }
        if(mortAndDebetsAmount.insuranceNeedAmount==undefined){
            mortAndDebetsAmount.insuranceNeedAmount=0
        }   
        if(provideYear.insuranceNeedAmount==undefined){
            provideYear.insuranceNeedAmount=0
        }
        if(lumpSumAmount.insuranceNeedAmount==undefined){
            lumpSumAmount.insuranceNeedAmount=0
        }
        if(monReplaceAmount.insuranceNeedAmount==undefined){
            monReplaceAmount.insuranceNeedAmount=0
        }
        console.log('totalProNeedAmount.insuranceNeedAmount',totalProNeedAmount.insuranceNeedAmount);
        if(ObjectHelper.isNullOrEmpty(totalProNeedAmount.insuranceNeedAmount)||totalProNeedAmount.insuranceNeedAmount==0){
            totalProNeedAmount.insuranceNeedAmount=supportFamilyAmount.insuranceNeedAmount+reserveExpenseAmount.insuranceNeedAmount+estatePlanAmount.insuranceNeedAmount
        }   
        if(ObjectHelper.isNullOrEmpty(ProGapAmount.insuranceNeedAmount)||ProGapAmount.insuranceNeedAmount==0){
            ProGapAmount.insuranceNeedAmount=estatePlanAmount.insuranceNeedAmount;
        } 
        needEvaluationList.supportFamilyAmount=supportFamilyAmount;
        needEvaluationList.reserveExpenseAmount=reserveExpenseAmount;
        needEvaluationList.estatePlanAmount=estatePlanAmount;
        needEvaluationList.otherAmount=otherAmount;
        needEvaluationList.ProGapAmount=ProGapAmount;
        needEvaluationList.totalGap=totalGap;
        needEvaluationList.totalProNeedAmount=totalProNeedAmount;
        needEvaluationList.mortAndDebetsAmount=mortAndDebetsAmount;
        needEvaluationList.monIncomeAmount=monIncomeAmount;
        needEvaluationList.provideYear=provideYear;
        needEvaluationList.lumpSumAmount=lumpSumAmount;
        needEvaluationList.monReplaceAmount=monReplaceAmount;
        needEvaluationList.currencyCode='HKD';
        console.log('needEvaluationList.....',needEvaluationList)
        return needEvaluationList;
   },

   buildRetireAge:(goalLocalFields)=>{
       let retireAge={};
        for (let goalLocalFieldsIndex = 0; goalLocalFieldsIndex < goalLocalFields.length; goalLocalFieldsIndex++) {
                         let goalLocalField = goalLocalFields[goalLocalFieldsIndex];
                         let retireAgeKey=goalSolutionDetailConfig.retireAgeKey;
                         if(retireAgeKey==goalLocalField.localFieldNameCode){
                                retireAge.nameCode=goalLocalField.localFieldNameCode;
                                retireAge.value=goalLocalField.localFieldValue;
                         }
            }
      return retireAge
   },
   defaultPurposeBuyingProduct:()=>{
        let purposeBuyingProductQuestions=[];
        let purposeBuyingProductList=goalSolutionDetailConfig.purposeBuyingProductList;
        let purposeBuyingProductLabel=goalSolutionDetailConfig.purposeBuyingProduct;
        let purposeBuyingProducts=purposeBuyingProductList.split(',');
         for (let indexBuyProduct = 0; indexBuyProduct < purposeBuyingProducts.length; indexBuyProduct++) {
                 let buyingProduct = purposeBuyingProducts[indexBuyProduct];
                 let tempMap={};
                 tempMap.context=purposeBuyingProductLabel[buyingProduct];
                 tempMap.eg=purposeBuyingProductLabel[buyingProduct+'_E_G'];
                 tempMap.purposeBuyingProductCode=buyingProduct; 
                 tempMap.select='N';
                 if(!ObjectHelper.isNullOrEmpty(tempMap.context)){
                    purposeBuyingProductQuestions.push(tempMap);
                 }
            }
      console.log('defaultPurposeBuyingProduct....',purposeBuyingProductQuestions);
     return purposeBuyingProductQuestions
   },
   defaultInsinvperdQuestions:()=>{
       let insinvperdQuestions=[];
       let label=goalSolutionDetailConfig.label;
       let question=goalSolutionDetailConfig.question;
       let answer=goalSolutionDetailConfig.answer;
       let labelKey=goalSolutionDetailConfig.key;
       let insinvperdQuestionList=question.INSINVPERD;
       let insinvperdAnswers=insinvperdQuestionList.split(',');
        for (let q = 0; q < insinvperdAnswers.length; q++) {
                 let insAnswer = insinvperdAnswers[q];
                 let tempMap={};
                 let tempLabel=labelKey[insAnswer];
                 tempMap.label=label[tempLabel];
                 tempMap.value=answer[insAnswer]
                 tempMap.select='N';
                 insinvperdQuestions.push(tempMap);
            }
       return insinvperdQuestions;
   },
   defaultInvperiodQuestions:()=>{
       let invperiodQuestions=[];
       let label=goalSolutionDetailConfig.label;
       let question=goalSolutionDetailConfig.question;
       let answer=goalSolutionDetailConfig.answer;
       let labelKey=goalSolutionDetailConfig.key;
       let invperiodQuestionList=question.INSCONPERD;
       let invperiodAnswers=invperiodQuestionList.split(',');
       for (let a = 0; a < invperiodAnswers.length; a++) {
                 let  invAnser = invperiodAnswers[a];
                 let tempMap={};
                 let tempLabel=labelKey[invAnser];
                 tempMap.label=label[tempLabel];
                 tempMap.value=answer[invAnser];
                 tempMap.select='N';
                 invperiodQuestions.push(tempMap);
            }
       return invperiodQuestions;     
   },
   defaultPreQuestions:()=>{
        let preQuestions=[];
        let label=goalSolutionDetailConfig.label;
        let question=goalSolutionDetailConfig.question;
        let answer=goalSolutionDetailConfig.answer;
        let labelKey=goalSolutionDetailConfig.key;
        let preQuestionsList=goalSolutionDetailConfig.ins_type_meet_object;
            let preQuestionsKeys=preQuestionsList.split(',');
            let pre_answers=[];
            for (let j = 0; j < preQuestionsKeys.length; j++) {
                 let preQuestionsKey = preQuestionsKeys[j];
                 let tempMap={}
                 tempMap.label=label[preQuestionsKey];
                 tempMap.label_eg=label[preQuestionsKey+'_E_G'];
                 tempMap.value=preQuestionsKey
                 tempMap.select='N'
                 preQuestions.push(tempMap);
            }
        return preQuestions
   },
   defaultSaveQuestions:()=>{
        let saveQuestions={};
        let label=goalSolutionDetailConfig.label;
        let question=goalSolutionDetailConfig.question;
        let answer=goalSolutionDetailConfig.answer;
        let labelKey=goalSolutionDetailConfig.key;
        saveQuestions.L_TargetSavingAmount_Desc=label.L_TargetSavingAmount_Desc;
        saveQuestions.L_TargetSavingAmount_YES=label.L_TargetSavingAmount_1;
        saveQuestions.L_TargetSavingAmount_NO=label.L_TargetSavingAmount_2;
        saveQuestions.savamtccy="HKD"
        saveQuestions.savamtval='';
        saveQuestions.select='';
        return saveQuestions;
   },
   defaultTimeFramQuestions:()=>{
       let timeFramQuestions={};
       let label=goalSolutionDetailConfig.label;
       let question=goalSolutionDetailConfig.question;
       let answer=goalSolutionDetailConfig.answer;
       let labelKey=goalSolutionDetailConfig.key;
       timeFramQuestions.L_Timeframe_Desc=label.L_Timeframe_Desc;
       timeFramQuestions.L_Timeframe_YES=label.L_Timeframe_1;
       timeFramQuestions.L_Timeframe_NO=label.L_Timeframe_2;
       timeFramQuestions.select='Y';
       let instimeframe_answers=[];
            instimeframe_answers[0]={
                label:label.INSTIMEFRAME_ANSWER_1,
                value:label.INSTIMEFRAME_ANSWER_1_KEY,
                select:'N'
            };
            instimeframe_answers[1]={
                label:label.INSTIMEFRAME_ANSWER_2,
                value:label.INSTIMEFRAME_ANSWER_2_KEY,
                select:'N'
            };
            instimeframe_answers[2]={
                label:label.INSTIMEFRAME_ANSWER_3,
                value:label.INSTIMEFRAME_ANSWER_3_KEY,
                select:'N'
            };
            instimeframe_answers[3]={
                label:label.INSTIMEFRAME_ANSWER_4,
                value:label.INSTIMEFRAME_ANSWER_4_KEY,
                select:'N'
            };
            instimeframe_answers[4]={
                label:label.INSTIMEFRAME_ANSWER_5,
                value:label.INSTIMEFRAME_ANSWER_5_KEY,
                select:'N'
            };
        timeFramQuestions.instimeframe_answers=instimeframe_answers;
        return timeFramQuestions
   },
   constructSaveGoalSolutionDetailRequest:(requestParams)=>{
       let request={},piqQuestAndAnsDetails=[],needEvaluation=[],purposeBuyingProduct=[],goalLocalFields=[],goalSolutionDetailParams={},sessionInfo;
        console.log('constructSaveGoalSolutionDetailRequest...',JSON.stringify(requestParams));
        request.subserviceId=goalSolutionDetailUtil.saveBuildSubServiceId();
        goalSolutionDetailParams=requestParams.goalSolutionDetailParams;
        sessionInfo=requestParams.sessionInfo;
        piqQuestAndAnsDetails=goalSolutionDetailUtil.buildRecordPiqQuestAndAnsQuestions(goalSolutionDetailParams.piqQuestAndAnsQuestions);
        needEvaluation=goalSolutionDetailUtil.buildRecordNeedEvaluation(goalSolutionDetailParams.needEvaluationList);
        purposeBuyingProduct=goalSolutionDetailUtil.buildRecordPurposeBuyingProductQuestions(goalSolutionDetailParams.purposeBuyingProductQuestions)
        let retireAge=goalSolutionDetailParams.retireAge;
        // retireAge  goalLocalFields  SKIP_RISK_LEVEL_IND GOAL_RISK_LEVEL CUST_RISK_LEVEL INS_RETRE_AGE
          goalLocalFields.push({
            	localFieldNameCode:"INS_RETRE_AGE",
  		        localFieldValue:retireAge.value
         });
        //   goalLocalFields.push({
        //     	localFieldNameCode:"SKIP_RISK_LEVEL_IND",
  		//         localFieldValue:'N'
        //  });
        //   goalLocalFields.push({
        //     	localFieldNameCode:"CUST_RISK_LEVEL",
  		//         localFieldValue:sessionInfo.riskLevel
        //  });
        //   goalLocalFields.push({
        //     	localFieldNameCode:"GOAL_RISK_LEVEL",
  		//         localFieldValue:
        //  });
        request.piqQuestAndAnsDetails=piqQuestAndAnsDetails;
        request.needEvaluation=needEvaluation;
        request.purposeBuyingProduct=purposeBuyingProduct;
        request.goalLocalFields=goalLocalFields;
        return request;
   },
   saveBuildSubServiceId:()=>{
        let subServiceIds=new Array;
        subServiceIds=goalSolutionDetailConfig.saveSubServiceIds;
        let subServiceId=new Array;
        for (let i = 0; i < subServiceIds.length; i++) {
             let functionOutputCode = subServiceIds[i];
             let tempMap={};
             tempMap.functionOutputCode=functionOutputCode;
             subServiceId.push(tempMap);
            
        }
        return subServiceId;
   },
   buildRecordPiqQuestAndAnsQuestions:(piqQuestAndAnsQuestions)=>{
       // {
    //   "investmentPreferenceCode": "INS_10_20",
    //   "investmentPreferenceText": null,
    //   "investmentPreferenceTypeCode": "INSINVPERD"
    // },
        let piqQuestAndAnsDetails=[];
        // goalSolutionDetailConfig.INSINVPERD insinvperdQuestions
        let investmentPreferenceMap={
            investmentPreferenceCode:'',
            investmentPreferenceText:'',
            investmentPreferenceTypeCode:'',
        }
        if(!ObjectHelper.isNullOrlengthZore(piqQuestAndAnsQuestions.insinvperdQuestions)){
            let insinvperdQuestions=piqQuestAndAnsQuestions.insinvperdQuestions;
            let insinvperdQuestionstempMap={
                    investmentPreferenceCode:'',
                    investmentPreferenceText:'',
                    investmentPreferenceTypeCode:'',
                };
            for (let i = 0; i < insinvperdQuestions.length; i++) {
                 let  insinvperdQuestion = insinvperdQuestions[i];
                if(insinvperdQuestion.select=='Y'){
                    insinvperdQuestionstempMap.investmentPreferenceCode=insinvperdQuestion.value;
                    insinvperdQuestionstempMap.investmentPreferenceText=null;
                    insinvperdQuestionstempMap.investmentPreferenceTypeCode=goalSolutionDetailConfig.INSINVPERD ;
                    piqQuestAndAnsDetails.push(insinvperdQuestionstempMap);
                    break;
                }
            }
            // piqQuestAndAnsDetails.push(tempMap);
        }
        //goalSolutionDetailConfig.SAVAMTOPT goalSolutionDetailConfig.SAVAMT   saveQuestions

        if(!ObjectHelper.isNullOrEmpty(piqQuestAndAnsQuestions.saveQuestions)){
            let saveQuestions=piqQuestAndAnsQuestions.saveQuestions;
            let saveQuestionstempMap={
                    investmentPreferenceCode:'',
                    investmentPreferenceText:'',
                    investmentPreferenceTypeCode:'',
                };
            
            if(saveQuestions.select=='Y'){ 
                //SAVAMTOPT WITH_VALUE  NO_VALUE
                saveQuestionstempMap.investmentPreferenceCode=goalSolutionDetailConfig.WITH_VALUE;
                saveQuestionstempMap.investmentPreferenceText=null;
                saveQuestionstempMap.investmentPreferenceTypeCode=goalSolutionDetailConfig.SAVAMTOPT ;
                piqQuestAndAnsDetails.push(saveQuestionstempMap);
                //SAVAMT SAVAMTCCY SAVAMTVAL 
                piqQuestAndAnsDetails.push({
                        investmentPreferenceCode:goalSolutionDetailConfig.SAVAMTVAL,
                        investmentPreferenceText:ObjectHelper.isNullOrEmpty(saveQuestions.savamtval)?0:saveQuestions.savamtval,
                        investmentPreferenceTypeCode:goalSolutionDetailConfig.SAVAMT
                    });
                piqQuestAndAnsDetails.push({
                        investmentPreferenceCode:goalSolutionDetailConfig.SAVAMTCCY,
                        investmentPreferenceText:ObjectHelper.isNullOrEmpty(saveQuestions.savamtccy)?goalSolutionDetailConfig.defaultCcy:saveQuestions.savamtccy,
                        investmentPreferenceTypeCode:goalSolutionDetailConfig.SAVAMT
                    });
            }else{
                saveQuestionstempMap.investmentPreferenceCode=goalSolutionDetailConfig.NO_VALUE;
                saveQuestionstempMap.investmentPreferenceText=null;
                saveQuestionstempMap.investmentPreferenceTypeCode=goalSolutionDetailConfig.SAVAMTOPT ;
                piqQuestAndAnsDetails.push(saveQuestionstempMap);
            }
        }
         //goalSolutionDetailConfig.TIMFRAMVAL goalSolutionDetailConfig.TIMFRAMOPT timeFramQuestions
          if(!ObjectHelper.isNullOrEmpty(piqQuestAndAnsQuestions.timeFramQuestions)){
                let timeFramQuestions=piqQuestAndAnsQuestions.timeFramQuestions;
                let timeFramQuestionstempMap={
                    investmentPreferenceCode:'',
                    investmentPreferenceText:'',
                    investmentPreferenceTypeCode:'',
                };
                if(timeFramQuestions.select=='Y'){
                    piqQuestAndAnsDetails.push({
                        investmentPreferenceCode:goalSolutionDetailConfig.WITH_VALUE,
                        investmentPreferenceText:null,
                        investmentPreferenceTypeCode:goalSolutionDetailConfig.TIMFRAMOPT
                    });
                    let instimeframe_answers=timeFramQuestions.instimeframe_answers
                    for (let d = 0; d < instimeframe_answers.length; d++) {
                         let instimeframe_answer = instimeframe_answers[d];
                         if(instimeframe_answer.select=='Y'){
                            piqQuestAndAnsDetails.push({
                                investmentPreferenceCode:instimeframe_answer.value,
                                investmentPreferenceText:null,
                                investmentPreferenceTypeCode:goalSolutionDetailConfig.TIMFRAMVAL
                            })
                             break;
                         }
                    }

                }else{
                    timeFramQuestionstempMap.investmentPreferenceCode=goalSolutionDetailConfig.NO_VALUE;
                    timeFramQuestionstempMap.investmentPreferenceText=null;
                    timeFramQuestionstempMap.investmentPreferenceTypeCode=goalSolutionDetailConfig.TIMFRAMOPT ;
                    piqQuestAndAnsDetails.push(timeFramQuestionstempMap);
                }
          }

         //goalSolutionDetailConfig.INVPERIOD  invperiodQuestions
         if(!ObjectHelper.isNullOrlengthZore(piqQuestAndAnsQuestions.invperiodQuestions)){
            let invperiodQuestions=piqQuestAndAnsQuestions.invperiodQuestions;
            let invperiodQuestionstempMap={
                    investmentPreferenceCode:'',
                    investmentPreferenceText:'',
                    investmentPreferenceTypeCode:'',
                };
            for (let n = 0; n < invperiodQuestions.length; n++) {
                 let  invperiodQuestion = invperiodQuestions[n];
                if(invperiodQuestion.select=='Y'){
                    invperiodQuestionstempMap.investmentPreferenceCode=invperiodQuestion.value;
                    invperiodQuestionstempMap.investmentPreferenceText=null;
                    invperiodQuestionstempMap.investmentPreferenceTypeCode=goalSolutionDetailConfig.INSCONPERD ;
                    piqQuestAndAnsDetails.push(invperiodQuestionstempMap);
                    break;
                 }
            }
           
         }

         // ins_type:PRE_INSII,PRE_INSIL,PRE_INSP,PRE_INSS,PRE_OTHERS  preQuestions
         if(!ObjectHelper.isNullOrlengthZore(piqQuestAndAnsQuestions.preQuestions)){
             let preQuestions=piqQuestAndAnsQuestions.preQuestions;
             let preQuestionsList=goalSolutionDetailConfig.ins_type_meet_object;
             let preQuestionsKeys=preQuestionsList.split(',');
             for (let e = 0; e < preQuestions.length; e++) {
                  let preQuestion = preQuestions[e];
                  if(preQuestion.select=='Y'){
                    for (let x = 0; x < preQuestionsKeys.length; x++) {
                     let preQuestionsKey = preQuestionsKeys[x];
                    //  let preQuestionstempMap={
                    //         investmentPreferenceCode:'',
                    //         investmentPreferenceText:'',
                    //         investmentPreferenceTypeCode:'',
                    //     };
                        if(preQuestionsKey==preQuestion.value){
                            // preQuestionstempMap.investmentPreferenceCode=preQuestion.select;
                            // preQuestionstempMap.investmentPreferenceText=null;
                            // preQuestionstempMap.investmentPreferenceTypeCode=preQuestion.value ;
                            piqQuestAndAnsDetails.push({
                                investmentPreferenceCode:preQuestion.select,
                                investmentPreferenceText:null,
                                investmentPreferenceTypeCode:preQuestion.value
                            });
                        }
                    }  
                  }
             }

         }

        return piqQuestAndAnsDetails;
   },
   buildRecordNeedEvaluation:(needEvaluationList)=>{
        let needEvaluation=[],ProGapAmount=needEvaluationList.ProGapAmount,supportFamilyAmount=needEvaluationList.supportFamilyAmount,
        estatePlanAmount=needEvaluationList.estatePlanAmount,lumpSumAmount=needEvaluationList.lumpSumAmount,
        reserveExpenseAmount=needEvaluationList.reserveExpenseAmount, mortAndDebetsAmount=needEvaluationList.mortAndDebetsAmount,
        monIncomeAmount=needEvaluationList.monIncomeAmount,provideYear=needEvaluationList.provideYear,
        monReplaceAmount=needEvaluationList.monReplaceAmount,otherAmount=needEvaluationList.otherAmount,
        totalGap=needEvaluationList.totalGap,totalProNeedAmount=needEvaluationList.totalProNeedAmount;
        if(!ObjectHelper.isNullOrEmpty(ProGapAmount)){
            needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(ProGapAmount.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:ProGapAmount.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(ProGapAmount.insuranceNeedAmount) ? 0:ProGapAmount.insuranceNeedAmount,
                insuranceNeedOtherText: ProGapAmount.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'PROTCGAP'
            })
        }
         if(!ObjectHelper.isNullOrEmpty(supportFamilyAmount)){
             needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(supportFamilyAmount.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:supportFamilyAmount.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(supportFamilyAmount.insuranceNeedAmount) ? 0:supportFamilyAmount.insuranceNeedAmount,
                insuranceNeedOtherText: supportFamilyAmount.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'SUPPMFAM'
            })
        }
         if(!ObjectHelper.isNullOrEmpty(estatePlanAmount)){
             needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(estatePlanAmount.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:estatePlanAmount.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(estatePlanAmount.insuranceNeedAmount) ? 0:estatePlanAmount.insuranceNeedAmount,
                insuranceNeedOtherText: estatePlanAmount.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'ESTAPLAN'
            })
        }
         if(!ObjectHelper.isNullOrEmpty(lumpSumAmount)){
             needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(lumpSumAmount.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:lumpSumAmount.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(lumpSumAmount.insuranceNeedAmount) ? 0:lumpSumAmount.insuranceNeedAmount,
                insuranceNeedOtherText: lumpSumAmount.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'TPNLMPSUM'
            })
        }
         if(!ObjectHelper.isNullOrEmpty(reserveExpenseAmount)){
             needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(reserveExpenseAmount.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:reserveExpenseAmount.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(reserveExpenseAmount.insuranceNeedAmount) ? 0:reserveExpenseAmount.insuranceNeedAmount,
                insuranceNeedOtherText: reserveExpenseAmount.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'RESERLOT'
            })
        }   
         if(!ObjectHelper.isNullOrEmpty(mortAndDebetsAmount)){
             needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(mortAndDebetsAmount.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:mortAndDebetsAmount.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(mortAndDebetsAmount.insuranceNeedAmount) ? 0:mortAndDebetsAmount.insuranceNeedAmount,
                insuranceNeedOtherText: mortAndDebetsAmount.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'TPNMTGEDEB'
            })
        }
         if(!ObjectHelper.isNullOrEmpty(monIncomeAmount)){
             needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(monIncomeAmount.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:monIncomeAmount.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(monIncomeAmount.insuranceNeedAmount) ? 0:monIncomeAmount.insuranceNeedAmount,
                insuranceNeedOtherText: monIncomeAmount.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'TPNMOINCM'
            })
        }
         if(!ObjectHelper.isNullOrEmpty(provideYear)){
             needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(provideYear.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:provideYear.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(provideYear.insuranceNeedAmount) ? 0:provideYear.insuranceNeedAmount,
                insuranceNeedOtherText: provideYear.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'TPNSPTYR'
            })
        }
         if(!ObjectHelper.isNullOrEmpty(monReplaceAmount)){
             needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(monReplaceAmount.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:monReplaceAmount.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(monReplaceAmount.insuranceNeedAmount) ? 0:monReplaceAmount.insuranceNeedAmount,
                insuranceNeedOtherText: monReplaceAmount.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'TPNINCMREP'
            })
        }
        if(!ObjectHelper.isNullOrEmpty(otherAmount)){
             needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(otherAmount.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:otherAmount.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(otherAmount.insuranceNeedAmount) ? 0:otherAmount.insuranceNeedAmount,
                insuranceNeedOtherText: otherAmount.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'OTHERS'
            })
        }   
        if(!ObjectHelper.isNullOrEmpty(totalGap)){
             needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(totalGap.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:totalGap.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(totalGap.insuranceNeedAmount) ? 0:totalGap.insuranceNeedAmount,
                insuranceNeedOtherText: totalGap.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'TTLPRTCGAP'
            })
        }   
        if(!ObjectHelper.isNullOrEmpty(totalProNeedAmount)){
             needEvaluation.push({
                currencyInsuranceNeedCode: ObjectHelper.isNullOrEmpty(totalProNeedAmount.currencyInsuranceNeedCode) ? goalSolutionDetailConfig.defaultCcy:totalProNeedAmount.currencyInsuranceNeedCode,
                insuranceNeedAmount: ObjectHelper.isNullOrEmpty(totalProNeedAmount.insuranceNeedAmount) ? 0:totalProNeedAmount.insuranceNeedAmount,
                insuranceNeedOtherText: totalProNeedAmount.insuranceNeedOtherText,
                insuranceNeedTypeCode: 'TOTPRONA'
            })
        }
        return needEvaluation;
   },
   buildRecordPurposeBuyingProductQuestions:(purposeBuyingProductQuestions)=>{
        let purposeBuyingProduct=[];
        //purposeBuyingProductText
        //purposeBuyingProductCode
        for (let pbpqIndex = 0; pbpqIndex < purposeBuyingProductQuestions.length; pbpqIndex++) {
             let purposeBuyingProductQuestion = purposeBuyingProductQuestions[pbpqIndex];
             purposeBuyingProduct.push({
                    purposeBuyingProductText:purposeBuyingProductQuestion.select,
                    purposeBuyingProductCode:purposeBuyingProductQuestion.purposeBuyingProductCode,
             })
        }
        return purposeBuyingProduct;
   }
}
export default goalSolutionDetailUtil;