import sessionInfoService from '../sessionInfoService';
import keConfig from "../../config/keConfig";
//import riskConfig from "../../config/riskDesConfig";
import moment from 'moment-timezone';
import qasAnsConverter from "./qasAnsConverter";
import FormatHelper from 'common/lib/formatHelper';
import dateTimeFormat from '../../config/dateTimeFormat';
import {goalRiskMatch} from '../../config/goalRiskMatch';
const qasConverter={
    
   retrieveQuestionnaireResponseDetailConvertRequest:(params) =>{
        console.log("params ... for getting record",params);
        let request = {

        };
        let sessionInfo;
        if(params.msgSource === "riskProfile"){
           sessionInfo = params.sessionInfo;
           params = params.request;
           console.log("real data get the customer data")
        }else{
           sessionInfo = params.sessionInfo
        }   
            console.log("sessionInfo",sessionInfo);
            console.log("params ... for getting record",params);
        request={
                customers: [{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: "CDM",
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                }],
                detailSearchCriteria:{
                    communicationIdentifierQuestionnaire:params.detailSearchCriteria.communicationIdentifierQuestionnaire===undefined ?"":params.detailSearchCriteria.communicationIdentifierQuestionnaire,
                    localeCode:sessionInfo.localeCode,
                    searchFunctionCode:params.detailSearchCriteria.searchFunctionCode===undefined ?"":params.detailSearchCriteria.searchFunctionCode
                },
                questionnaireKey:{
                   countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    lineOfBusinessCode:"PFS",
                    questionnaireTypeCode:params.questionnaireTypeCode
                },
                searchCriteria:[{
                    key:params.searchCriteria[0].key,
                    value:params.searchCriteria[0].value
                }]

        };
        request={
            request,
            messageId:params.messageId,
            questionnaireTypeCode:params.questionnaireTypeCode
        }
        console.log("retrieveQuestionnaireResponseDetailConvertResponse_RTQ",request)
        return request;  
   },
   retrieveQuestionnaireResponseDetailConvertResponse_RTQ:(response) =>{
        let finalCode ="";
        let name;
        let expireDate;
        let errorCodes;
        let completeDate;
        let firstLine ="";
        let secondLine ="";
        let thridLine="";
        let questionnaireResultText;
        let nowdate =new Date();
        let expireDateIndicator;
        let tempDate;
        let ansRecord=[];
        let overrideCode;
        let calculateCode;
        let versionNum;
        console.log("response in C", response)
        nowdate=moment(nowdate).format('YYYYMMDD');
       
       if(response.questionnaireResponse!==undefined ){
            if(response.questionnaireResponse.length === 0){
                let rtqResult={expireDateIndicator:true}
                console.log("rtqResult in Convert",rtqResult);
                return rtqResult ;     
            }
            let  questionnaires=response.questionnaireResponse;
            // isArray(obj)
            let  questionnaire=questionnaires[0];
            let custmerRecord = questionnaire.customerQuestionResponse;
            expireDate= questionnaire.recordExpiryDateTime;
            versionNum = questionnaire.resourceItemIdentifierQuestionnaireDocument
            tempDate=new Date(expireDate);
            tempDate=moment(tempDate).format('YYYYMMDD');
            let tempDate1=new Number(tempDate);
            let tempDate2=new Number(nowdate);
          if(custmerRecord.length >0) {
                for (var i = 0; i < custmerRecord.length; i++) {
                    ansRecord.push(custmerRecord[i].answerNumber) ;                    
                }
            }            
             if(tempDate1<tempDate2 || expireDate == ''){
                expireDateIndicator=true;
            }else{
                expireDateIndicator=false;
            }
            
            completeDate=questionnaire.recordCaptureLastDateTime;
                if(questionnaire.questionnaireResultDetail!==undefined){
                    let questionnaireDetails=questionnaire.questionnaireResultDetail;
                    let questionnaireDetail=questionnaireDetails[0];
                    if(questionnaireDetail.finalCode!==undefined){
                        finalCode = questionnaireDetail.finalCode;
                        calculateCode=questionnaireDetail.calculateCode;
                        overrideCode = questionnaireDetail.customerOverrideCode;
                        if(finalCode === "0"){
                            
                            questionnaireResultText=questionnaireDetail.questionnaireResultText;
                            firstLine=  questionnaireResultText[0].text;
                            secondLine=  questionnaireResultText[1].text;
                            thridLine= questionnaireResultText[2].text +questionnaireResultText[3].text ;
                        }
                        if(finalCode === "5"){
                            questionnaireResultText=questionnaireDetail.questionnaireResultText;
                            console.log("firstLine",questionnaireResultText);
                            firstLine=  questionnaireResultText[0].text +" "+ questionnaireResultText[1].text + ""+ questionnaireResultText[2].text ;
                            console.log("firstLine",firstLine);
                            secondLine=  questionnaireResultText[3].text +" "+ questionnaireResultText[4].text;
                            console.log("secondLine",firstLine);
                            thridLine= questionnaireResultText[5].text ;
                            console.log("thridLine",firstLine);
                        } 
                    }else{
                        //todo error code
                    }
                    if(questionnaireDetail.name!==undefined){
                            name=questionnaireDetail.name
                    }else{
                        //todo error code
                        // errorCodes={errorCodes:"401"};
                         errorCodes={errorCodes:{value :"401"}};
                        return errorCodes;
                    }
                    if(questionnaireDetail.questionnaireResultText[0]!==undefined && finalCode !== '0'){
                        questionnaireResultText=questionnaireDetail.questionnaireResultText;
                        console.log("questionnaireDetail.questionnaireResultText ");
                       for (var index = 0; index < questionnaireResultText.length-1; index++) {
                           var  qasText = questionnaireResultText[index];
                           console.log("qasText ",qasText);
                           if(index<3){
                               firstLine= firstLine+qasText.text + ' ';
                                continue;
                           }
                           if(index <6 && index >2 ){
                                secondLine=secondLine+qasText.text;
                                 continue;
                           }
                           if(index<7 && index > 5){
                                thridLine=thridLine+qasText.text;
                                 continue;
                           }
                       }
                 }  

                }else{
                    //todo error code
                    //  errorCodes={errorCodes:"402"};
                      expireDateIndicator=true;
                      errorCodes={errorCodes:{value :"402"}};
                        return errorCodes;
                }
        }else{
            //todo error code
            //   errorCodes={errorCodes:"403"};
              expireDateIndicator=true;
              errorCodes={errorCodes:{value :"403"}};
             // return expireDateIndicator;
        }
        let rtqResult = {
            riskLevel: finalCode,
            riskLeverDescription:name,
            expireDate: expireDate,
            completeDate:completeDate,
            firstLine :firstLine,
            secondLine :secondLine,
            thridLine:thridLine,
            expireDateIndicator:expireDateIndicator,
            ansRecord:ansRecord,
            overrideCode: overrideCode,
            calculateCode : calculateCode,
            versionNum:versionNum
        };
        console.log("rtqResult in C",rtqResult);
        return rtqResult;
    },
    retrieveQuestionnaireResponseDetailConvertResponse_FHC:(response) =>{
        let riskLevel;
        if(null!=response.questionnaireResponse&&response.questionnaireResponse.length>0){
            let questionnaireResponse = response.questionnaireResponse[0];
            if(null!=questionnaireResponse.questionnaireResultDetail&&questionnaireResponse.questionnaireResultDetail.length>0){
                let questionnaireResultDetail = questionnaireResponse.questionnaireResultDetail[0];
                riskLevel = questionnaireResultDetail.finalCode;
            }
        }
        const result = {
            riskLevel
        };
        return result;
    },
retrieveQuestionnaireResponseDetailConvertResponse_KE:(response) =>{
        let keQuestionaire={};
        let keResult=[];
        let keSelect={};
        let result = {};
        let Bonds;
        let UT;
        let STRUC;
        let NIVLNK;
        let INVLNK;       
        let tempMap={};
        let lastDateTime;
        let choose;
        console.log("KE responseDetail",response.questionnaireResponse);
        if(response.questionnaireResponse!==undefined && response.questionnaireResponse.length > 0){
            let questionnaires=response.questionnaireResponse;
            let questionnaire=questionnaires[0];
                lastDateTime=questionnaire.recordCaptureLastDateTime;
            let additionalItems =[];
                additionalItems= questionnaire.additionalItem;
            let timeDiff = 31556926 * 3*1000;
            let keProdCode=[];
            if(additionalItems!= null && additionalItems.length>0){
                for (var index = 0; index < additionalItems.length; index++) {
                    let additionalItem = additionalItems[index];
                    let itemCode = "";
                    let itemValue;
                    let queCode;
                    let prodTime;
                    itemCode = additionalItem.additionalItemCode;
                    itemValue = additionalItem.additionalItemValueText;
                    keProdCode.push([additionalItems.additionalItemCode]);
                    if(itemCode.indexOf("_FTD")>0){
                        itemCode = itemCode.split('_');
                        queCode = itemCode[0];
                        let prodTime =new Date(itemValue);
                        prodTime = prodTime.getTime();
                        if(lastDateTime -prodTime  <= timeDiff ){
                            choose = 'C'
                        }else if(lastDateTime -prodTime >timeDiff){
                            choose = 'D'
                        }else{
                            choose = 'A'
                        }
                    }else{
                        choose = 'A';      
                    }
                    if(queCode==='BOND'){
                            Bonds=choose
                    }
                     if(queCode==='UT'){
                            UT= choose    
                    }
                     if(queCode==='STRUC'){
                            STRUC=choose   
                    }
                     if(queCode==='NIVLNK'){
                            NIVLNK= choose      
                    }
                     if(queCode==='INVLNK'){
                        INVLNK =choose    
                    }
            }

            if(questionnaire.customerQuestionResponse!==undefined){
                let questionnaireDetails=[];
                questionnaireDetails=questionnaire.customerQuestionResponse;
                let tempKeContext=[];
                let tempKeResult=[];
                if(questionnaireDetails.length>0){
                    for(var i = 0; i < questionnaireDetails.length; i++){
                        let questionnaireDetail=questionnaireDetails[i]
                        tempKeContext.push(keConfig[questionnaireDetail.questionNumber]);
                        switch (questionnaireDetail.answerNumber) {
                            case 'A':
                                tempKeResult.push('A')
                                break;
                            case 'B':
                                tempKeResult.push('B')
                                break;
                            case 'C':
                                tempKeResult.push('C')
                                break;
                            case 'D':
                                tempKeResult.push('D')
                                break;

                            default:
                                break;
                        }
                        let n = i+1;
                        let _key = 'Q'+n;
                        keQuestionaire[_key] = tempKeContext[i];
                        keSelect[_key] = tempKeResult[i];
                        tempMap={
                            context:keQuestionaire[_key],
                            result:keSelect[_key]
                        }
                        keResult.push(tempMap)
                    }
                }
            }
        }      
       let itemMap= {
            Bonds:Bonds== undefined ? 'A' :Bonds,
            UT:UT== undefined ? 'A' :UT,
            STRUC:STRUC== undefined ? 'A' :STRUC,
            NIVLNK:NIVLNK== undefined ? 'A' :NIVLNK,
            INVLNK:INVLNK== undefined ? 'A' : INVLNK
        };
      
        result = {
            keQuestionaire,
            keResult,
            lastDateTime:lastDateTime,
            itemMap: itemMap
        }
    }else if(response.questionnaireResponse.length === 0){
        let itemMap= {
            Bonds:Bonds== undefined ? 'A' :Bonds,
            UT:UT== undefined ? 'A' :UT,
            STRUC:STRUC== undefined ? 'A' :STRUC,
            NIVLNK:NIVLNK== undefined ? 'A' :NIVLNK,
            INVLNK:INVLNK== undefined ? 'A' : INVLNK
        };

        keResult = [{context:"Unit trusts",result:"",},{context:"Bonds",result:"",},{context:"Structured products",result:"",},{context:"Investment linked insurance plans",result:"",},{context:"Non investment linked insurance plans",result:"",}];
        result = {
            keQuestionaire:"",
            keResult,
            lastDateTime:"",
            itemMap: itemMap
        }
    }

    console.log("result in Con",result);
    return result;
},
    maintainQuestionnaireResponseDetailConvertRequest_KE:(request) =>{
         let keResult = request.keResult;
        console.log("record ke",keResult);
        let sessionInfo=request.sessionInfo;

        let requestMsg = {
            "customers": [{
                "countryISOCode": sessionInfo.countryISOCode,
                "groupMemberCode": sessionInfo.groupMemberCode,
                "sourceSystemRolePlayerCode": sessionInfo.sourceSystemRolePlayerCode,
                "rolePlayerIdentificationNumber": sessionInfo.customerId}
            ],
            "maintenanceAction": {
                "maintenanceActionCode" : "A"
            },
            "questionnaireResponseMaintenance":{
                "additionalItem":[{
                    "additionalItemCode" : 	"GZ_STAFF_ID",
                    "additionalItemValueText" : "43382921"
                }],
                "channelQuestionnaireCode":"OHB",
                    "customerQuestionResponse":[{
                            "answerCustomerInputText":"NULL",
                            "answerNumber":keResult[0].result,
                            "questionNumber":"UT"
                        },
                        {
                            "answerCustomerInputText":"NULL",
                            "answerNumber":keResult[1].result,
                            "questionNumber":"BOND"
                        },
                        {
                            "answerCustomerInputText":"NULL",
                            "answerNumber":keResult[2].result,
                            "questionNumber":"STRUC"
                        },
                        {
                            "answerCustomerInputText":"NULL",
                            "answerNumber":keResult[3].result,
                            "questionNumber":"INVLNK"
                        },
                        {
                            "answerCustomerInputText":"NULL",
                            "answerNumber":keResult[4].result,
                            "questionNumber":"NIVLNK"
                        }
                    ],
                    "employeeCaptureNumber":sessionInfo.staffId,
                    "resourceItemIdentifierQuestionnaireDocument":"1"
            }
        }
        console.log("requsetMsg",requestMsg)
        let keParams = {
            messageId : "maintainQuestionnaireResponseDetail",
            request:requestMsg,
            baseInfo:sessionInfo,
            jsonData:""
        };
        return keParams;
      
    },
    maintainQuestionnaireResponseDetailConvertResponse_KE:(response) =>{
          return response;
    },
    retrieveQuestionnaireSummaryConvertRequest:(params) =>{
        console.log("params for getting his result in C",params);
        let questionnaireCommunicationCount;
      if(params.pageMessageType ==='MEETINGSUMMARY'){
         questionnaireCommunicationCount=1
       }else if(params.pageMessageType ==='RISKPROFILE'){
         questionnaireCommunicationCount=3
       }
      let sessionInfo = params.sessionInfo
        let request ={
            "customers": [{
                "countryISOCode": sessionInfo.countryISOCode,
                "groupMemberCode": sessionInfo.groupMemberCode,
                "sourceSystemRolePlayerCode": sessionInfo.sourceSystemRolePlayerCode,
                "rolePlayerIdentificationNumber": sessionInfo.customerId,
                "customerAttribute": [{
                    "attributeKey": "",
                    "attributeValue": ""
                }]
            }],
            "jointCustomer": {

            },
            "questionnaireKey": {
                "countryISOCode": "HK",
                "groupMemberCode": "HBAP",
                "lineOfBusinessCode": "PFS",
                "questionnaireTypeCode": "RTQ"
            },
            "summarySearchCriteria": {
                "localeCode": "en_VN",
                "questionnaireCommunicationCount": questionnaireCommunicationCount,
                "returnQuestionnaireCommunicationAdditionalItemIndicator": "Y"
            },
            "searchCriteria": [{
                "key": "RESP_TYPE",
                "value": "SOLE"
            }]
        } 

               
        request={
            request,
            messageId : "retrieveQuestionnaireSummary",
            sessionInfo: sessionInfo
        }
        return request;
    },
     retrieveQuestionnaireSummaryConvertResponseAll(response,pageType){
           let result=[]
            switch (pageType) {
                case 'MEETINGSUMMARY':
                     result=qasConverter.retrieveQuestionnaireSummaryConvertMeetingSummaryResponse(response);
                    break;
                case 'RISKPROFILE':
                    result=qasConverter.retrieveQuestionnaireSummaryConvertResponse(response);      
                default:
                    break;
            }
            return result

    },
    retrieveQuestionnaireSummaryConvertMeetingSummaryResponse(response){
    // console.log("meeting summary page questionnaireResponseSummarySet",response)
       let meetingSummaryRisk,riskDesc;
       if(response && response.questionnaireResponseSummarySet && response.questionnaireResponseSummarySet.length>0 ){
           if(response.questionnaireResponseSummarySet[0].questionnaireResponse && response.questionnaireResponseSummarySet[0].questionnaireResponse.length>0 &&
             response.questionnaireResponseSummarySet[0].questionnaireResponse[0].questionnaireResultDetail && response.questionnaireResponseSummarySet[0].questionnaireResponse[0].questionnaireResultDetail.length>0){
             meetingSummaryRisk= response.questionnaireResponseSummarySet[0].questionnaireResponse[0].questionnaireResultDetail[0].finalCode;
             riskDesc =goalRiskMatch[meetingSummaryRisk];
           }
       }
       let meetingSummaryRetrieveRisk={
         meetingSummaryRisk:meetingSummaryRisk,
          riskDesc:riskDesc
       }
       return meetingSummaryRetrieveRisk;
    },
     retrieveQuestionnaireSummaryConvertResponse:(response) =>{
        let summaryResult = [];
        let questionnaireResponseSummarySet = response.questionnaireResponseSummarySet[0].questionnaireResponse;
        console.log("questionnaireResponseSummarySet",questionnaireResponseSummarySet.length)

            for(var i = 0;i< questionnaireResponseSummarySet.length;i++){
                let resultSet ={}
                let branch = "001"; // dummy
                let channel = "branch"// dummy
                let staffName = "Jason";
                let staffIdIndex ;
                let tempAdditionalItems =[];
                let tempSummary = questionnaireResponseSummarySet[i];
                let qId = tempSummary.communicationIdentifierQuestionnaire;
                console.log("qId",qId);
                console.log("tempSummary",tempSummary);
                tempAdditionalItems = tempSummary.additionalItem;
                for(var index=0;index< tempAdditionalItems.length;index++){
                    console.log("tempAdditionalItems[i].additionalItemCode",tempAdditionalItems[index]);
                    if (tempAdditionalItems[index].additionalItemCode === "GZ_STAFF_ID"){
                        console.log("GZ_STAFF_ID");
                        staffIdIndex = tempAdditionalItems[index].additionalItemValueText;
                    }
                    if (tempAdditionalItems[index].additionalItemCode === "GZ_STAFF_NAME"){
                        console.log("tempAdditionalItems[index].additionalItemValueText",tempAdditionalItems[index].additionalItemValueText);
                        staffName = tempAdditionalItems[index].additionalItemValueText;
                    }
                    if (tempAdditionalItems[index].additionalItemCode === "GZ_STAFF_BRANCH"){
                        console.log("GZ_STAFF_BRANCH");
                        branch = tempAdditionalItems[index].additionalItemValueText;
                    }
                }
                let expireDate = tempSummary.recordExpiryDateTime
                let completeDate= tempSummary.recordCaptureLastDateTime
                expireDate=FormatHelper.dateFormatPattern(expireDate,dateTimeFormat.DATE_FORMAT);
                completeDate=FormatHelper.dateFormatPattern(completeDate,dateTimeFormat.DATE_FORMAT);
                let riskName = tempSummary.questionnaireResultDetail[0].name
                 //this need change after staff profile completed
                
                resultSet ={
                    expireDate:expireDate,
                    completeDate:completeDate,
                    riskName:riskName,
                    staffName:staffName,
                    branch:branch,
                    channel:channel,
                    qId:qId
                }
                summaryResult.push(resultSet);

        }
        console.log(summaryResult);
        return summaryResult;

    },
    calculateQuestionnaireRankingConvertRequest:(params) =>{
        console.log("params for getting cal result in C",params);
        let sessionInfo=params.sessionInfo;
        params = params.request;
        let ansRecord = params.ansRecord;
        let request = {
            "additionalItem":[{
                "additionalItemCode":"LOW_ANS_RSN_TXT"
            }],
            "customers":[{
                "countryISOCode":sessionInfo.countryISOCode,
                "groupMemberCode":sessionInfo.groupMemberCode,
                "rolePlayerIdentificationNumber":sessionInfo.rolePlayerIdentificationNumber,
                "sourceSystemRolePlayerCode":sessionInfo.sourceSystemRolePlayerCode
            }],
            "questionResponse": [{
                    "answerNumber": ansRecord[0],
                    "questionNumber": "1"
                },
                {
                    "answerNumber": ansRecord[1],
                    "questionNumber": "2"
                },
                {
                    "answerNumber": ansRecord[2],
                    "questionNumber": "3"
                },
                {
                    "answerNumber": ansRecord[3],
                    "questionNumber": "4"
                },
                {
                    "answerNumber": ansRecord[4],
                    "questionNumber": "5"
                },
                {
                    "answerNumber": ansRecord[5],
                    "questionNumber": "6"
                }
            ],
            "questionnaireNumber":{
                "resourceItemIdentifierQuestionnaireDocument":"6"
            }
        }
        
        request={
            request,
            messageId : "calculateQuestionnaireRanking",
            sessionInfo: sessionInfo

        }
        console.log("cal request", request);
        return request;
    },
     calculateQuestionnaireRankingConvertResponse:(response) =>{
        console.log("response in convert",response);
        let overridableQuestionnaireResult=[];
        let rankRange=[];
        let calResult={};
        let finalCode;
       // let codeDes;
        let title;
        if(response.questionnaireCalculation !== undefined && response.questionnaireCalculation !== null){
            let questionnaireCalculation= response.questionnaireCalculation;
            let questionnaireResultCalculated= questionnaireCalculation.questionnaireResultCalculated;   
            if(questionnaireResultCalculated.length>0){
               // let tempIndex = 'R';
                overridableQuestionnaireResult = questionnaireResultCalculated[0].overridableQuestionnaireResult;
                finalCode =  questionnaireResultCalculated[0].questionnaireResultCalculateCode;
                title = questionnaireResultCalculated[0].questionnaireResultType;
               // tempIndex = tempIndex + finalCode;
              //  codeDes = riskConfig[tempIndex];
              //  console.log("codeDes....",codeDes);
                for (var i = 0; i < overridableQuestionnaireResult.length; i++) {
                    let tempIndex_ = overridableQuestionnaireResult[i].customerOverrideCode;
                    //tempIndex_ = 'R'+ tempIndex_;
                    //  let tempText = riskConfig[tempIndex_].firstLine + riskConfig[tempIndex_].secondLine+ riskConfig[tempIndex_].thridLine;
                    rankRange.push(tempIndex_);
                }
            }    
        }else{
            if(response.reasonCode !== undefined){
                console.log("response.reasonCode",)
                let errorCodes = response.reasonCode;
                if(errorCodes.reasonCode === "QAS0014"){
                calResult = {
                    finalCode: undefined,
                   // codeDes: undefined,
                    title: undefined,
                    rankRange: undefined
                }
                    return calResult;
                }
            }
        }
        calResult = {
            finalCode: finalCode,
         //   codeDes: codeDes,
            title: title,
            rankRange: rankRange
        }
        console.log("calResult....in converter", calResult);
        return calResult;

    },
    retrieveQuestionnaireReportConvertRequest:(params) =>{

    },
     retrieveQuestionnaireReportConvertResponse:(response) =>{

    },
     retrieveQuestionnaireConvertRequest_RTQ:(params) =>{
        let request = {

        };
        let sessionInfo;
        console.log( "params... in convert",params);
        if(params.msgSource === "riskProfile"){
            sessionInfo = params.request.sessionInfo
            console.log("from real session")
        }else{
            sessionInfo=sessionInfoService.getSessionInfo_();
        }
        params= params.request.rpqTextParams;
        console.log("sessionInfo",sessionInfo);
        request={
                questionnaireKey:{
                    countryISOCode:sessionInfo.countryISOCode,
                    groupMemberCode:sessionInfo.groupMemberCode,
                    lineOfBusinessCode:"PFS",
                    questionnaireTypeCode:"RTQ"
                },
                questionnaireSearchCriteria:{
                    localeCode:"en_US",
                    searchFunctionCode:"L"
                },
                requestParameter:[{
                    paramCode:"RTRV_GNRC_FORM",
                    paramValue:"N"
                }]
        
       }
        request={
            request,
            messageId:params.messageId,
            questionnaireTypeCode:params.questionnaireTypeCode
        }
        console.log("request",request);
        return request;

    },
     retrieveQuestionnaireConvertResponse_RTQ:(response) =>{
        console.log("response for RD",response);
        let versionNum;
        let questionTextArray= []; 
        let ansResult  ={};
        let questionNoteArray =[];
        let qasConfig ={};
        if(response.questionnaireDocumentTextList !== undefined ){
            versionNum = response.id.resourceItemIdentifierQuestionnaireDocument;
            const questionNum = 6;
            let questionText= response.questionnaireDocumentTextList;
            for(var index=1; index <= questionNum; index++){
                let tempQT1="";
                let tempQN1="";
                for(var i =0;i<questionText.length;i++){               
                    let indicator = questionText[i].textIdentificationNumber;
                    let qtIndex = "QT_"+index;
                    let qnIndex = "QN_"+index;
                    
                    if(indicator.indexOf(qtIndex) !== -1 || indicator.indexOf(qnIndex) !== -1 ){
                        if(indicator.indexOf(qtIndex) !== -1){
                            let tempText = questionText[i].text;
                            tempQT1= tempQT1 +" "+ tempText         
                        }
                        if(indicator.indexOf(qnIndex) !== -1){
                            let tempText = questionText[i].text;
                            tempQN1= tempQN1 +" "+ tempText         
                        }
                    }
   

                   
                }
                 questionTextArray.push(tempQT1);
                 questionNoteArray.push(tempQN1);
                 
            } 


                 
         }
              
            qasConfig = qasAnsConverter.convertVaildRds(response);
            ansResult = qasAnsConverter.convertVaildAns(response);
            questionNoteArray = questionNoteArray[3].split('*');
           
            let rtqText ={
                        versionNum : versionNum,
                        questionText: questionTextArray,
                        answerText: ansResult,
                        qasConfig: qasConfig,
                        questionNote: questionNoteArray
            };
            console.log("rtqText......",rtqText);
            return rtqText;

        },

    downloadQASControlDataConvertRequest:(params) =>{
    

    },
    downloadQASControlDataConvertResponse:(response) =>{

    },
    maintainQuestionnaireResponseDetailConvertRequest_RTQ:(params) =>{
          let sessionInfo=params.sessionInfo;
          let staffInfo = params.staffInfo;
          console.log("para is sb", sessionInfo);
          console.log("para is staffInfo", staffInfo);
          let request = {};
          let additionalItem=[];
          let overrideQuestionnaireResult ={};
          let ansArray =[];
          params = params.request
          ansArray = params.ansToBE;
          let nowdate =new Date();
          nowdate=moment(nowdate).format("YYYY-MM-DD HH:MM:SS");
          let tempDate2=new Number(nowdate);
          console.log("params.overrideCode",params);
          if(params.overrideCode !== undefined && params.overrideCode !== ""){
                overrideQuestionnaireResult=[{
                    "customerOverrideCode": params.overrideCode,
                    "questionnaireResultType": "RISKTLRN"          
                }]
          }
         additionalItem.push({
                    "additionalItemCode":"GZ_STAFF_ID",
                    "additionalItemValueText":staffInfo.staffId

         });
         additionalItem.push({
                    "additionalItemCode":"GZ_STAFF_NAME",
                    "additionalItemValueText":staffInfo.staffName

          });
        additionalItem.push({
                    "additionalItemCode":"GZ_STAFF_BRANCH",
                    "additionalItemValueText":"001"

          });
          if(params.cusReason !== undefined){
            additionalItem.push({ 
                "additionalItemCode": "RCN_UDT_RSN_CDE",
                "additionalItemValueText": "F"
            })
            additionalItem.push({ 
                "additionalItemCode": "RCN_UDT_RSN_TXT",
                "additionalItemValueText": params.cusReason + "&amp;&amp;^" + params.calCode + "&amp;&amp;^" +nowdate
            })
               
          }
          console.log("param code", params.overrideCode);
          console.log("overrideQuestionnaireResult", overrideQuestionnaireResult);
          request = {
                "customers": [{
                    "countryISOCode": sessionInfo.countryISOCode,
                    "groupMemberCode": sessionInfo.groupMemberCode,
                    "sourceSystemRolePlayerCode": "CDM",
                    "rolePlayerIdentificationNumber": sessionInfo.customerId
                }],
            "maintenanceAction":{
                "maintenanceActionCode":"A"
            },
            "questionnaireResponseMaintenance":{
                additionalItem,
                "channelQuestionnaireCode":"OHB",
                "communicationIdentifierQuestionnaire":"",
                "customerQuestionResponse": [
                {
                    "answerNumber": ansArray[0],
                    "questionNumber": "1"
                },
                {
                    "answerNumber": ansArray[1],
                    "questionNumber": "2"
                },
                {
                    "answerNumber": ansArray[2],
                    "questionNumber": "3"
                },
                {
                    "answerNumber": ansArray[3],
                    "questionNumber": "4"
                },
                {
                    "answerNumber": ansArray[4],
                    "questionNumber": "5"
                },
                {
                    "answerNumber": ansArray[5],
                    "questionNumber": "6"
                }
                ],
                "employeeCaptureNumber":"43382921",
                "recordCaptureLastDateTime":"",
                "recordExpiryDateTime":"",
                "resourceItemIdentifierQuestionnaireDocument":6
                },
                                  
            }
        if(params.overrideCode !== undefined && params.overrideCode !== ""){
            request.questionnaireResponseMaintenance["overrideQuestionnaireResult"]=overrideQuestionnaireResult;
            console.log("request",request);
        }
        request={
            request,
            messageId:"maintainQuestionnaireResponseDetail",
            sessionInfo: sessionInfo
        }
        console.log("sub request", request);
        return request;

    },
    retrieveQuestionnaireHistoryReportConvertRequest:(params)=>{
        debugger
        console.log("params for gen repornt",params)
        let sessionInfo = params.sessionInfo;
        let name = params.name;
        let reportSearchCriteria={};
        if(name === "latest"){
            reportSearchCriteria =  
             {
                "localeCode": "en_US",
                "searchFunctionCode": "L"
            }
        }else if(name= "history"){
            reportSearchCriteria =  
            {
            "localeCode": "en_US",
            "searchFunctionCode": "I"
            }

        }
         let request =   
         {
            "sessionInfo": {
                "businessLine": "PFS",
                "channelId": "OHB",
                "countryCode": "HK",
                "employeeUserId": "43367026",
                "groupMember": "HBAP",
                "hubUserId": "WD01",
                "hubWorkstationId": "WD01"
            },
            "customers": [{
                "countryISOCode": "HK",
                "groupMemberCode": "HBAP",
                "rolePlayerIdentificationNumber": "IF200106",
                "sourceSystemRolePlayerCode": "CDM"
            }],
            "questionnaireKey": {
                "countryISOCode": "HK",
                "groupMemberCode": "HBAP",
                "lineOfBusinessCode": "PFS",
                "questionnaireTypeCode": "RTQ"
            },
             reportSearchCriteria,
            // "reportSearchCriteria": {
            //     "localeCode": "en_US",
            //     "searchFunctionCode": "I"
            // },
            "questionnaireDocId": "1628328",
            "questionnaireDeclarId": "6"
        }
        if(reportSearchCriteria.searchFunctionCode === "I"){
            request["questionnaireDocId"] = params.qId
        }
        request = {
            request,
            messageId:"retrieveQuestionnaireHistoryReport",

        }
        return request;


    },
    showReport:(params) =>{
        debugger
        var screenWidth = screen.availWidth, screenHeight = screen.availHeight;
        debugger;
        console.log(params)
        var report = params.docs[0]
       // var report = params.document[0].documentBinary.reportContentDocument

        report.url = '/group-sfp-war/gateway/controller/sfp/downloadDoc';

        if (report.url && report.index && report.mimeType) {

               var reportUrl = report.url + "?index="+encodeURIComponent(report.index)+"&_ts="+(new Date).getTime()+encodeURIComponent('http://& %#@!$ ');
                var reportWin = window.open(reportUrl, "report", "location=no,menubar=no,resizable=yes,titlebar=no,toolbar=no,status=no,scrollbars=no");

                var width = screenWidth, 
                height = screenHeight;

                width = (0>width || width>screenWidth)? screenWidth: width;
                height = (0>height || height > screenHeight)? screenHeight: height;
                reportWin.resizeTo(width, height);
                reportWin.moveTo(((screenWidth-width)/2).toFixed(0), ((screenHeight-height)/2).toFixed(0));

                reportWin.focus();

        }

    }, 

     maintainQuestionnaireResponseDetailConvertResponse_RTQ:(response) =>{
        let maintainResult =[];
        let mainResult;
        console.log("response in C", response); 
        if(response.msg !== undefined && response.msg === "print"){
            response = response.response
            console.log("print in main")
            
        }
        maintainResult= response.reasonCode;
        
    // //   let docs = response.docs[0];
        
    //  //   qasConverter.showReport({
    //                     report: docs
    //                 });
    //      console.log("reasonCode in C", maintainResult); 
        let reasonCodes;
        if(maintainResult.length != 1){
            return mainResult=true;
        }else{
            reasonCodes = maintainResult[0].reasonCode
            console.log("reasonCode in C", reasonCodes);
            if(reasonCodes === "QAS0023"){
                mainResult = false;
            }else{
                mainResult = true;
            }


        }
        console.log("error or not", mainResult);
        return mainResult;
    }, 
     convertResult(requestValue){
        if(requestValue=="1"){
            return "A";
        } else if(requestValue=="2"){
            return "B";
        } else if(requestValue=="3"){
            return "C";
        } else if(requestValue=="4"){
            return "D";
        } else {
            return ""
        }
    },
}

export default qasConverter;