import sessionInfoService from '../../../sessionInfoService';
//import riskConfig from "../../config/riskDesConfig";
const qasConverter_affordability_300={
    retrieveQuestionnaireConvertRequest_affordability:(params) =>{
        let request = {

        };
        let sessionInfo;
        console.log( "params... in convert",params);
        sessionInfo = params.sessionInfo
        params= params.params;
        console.log("sessionInfo",sessionInfo);
        request={
                questionnaireKey:{
                    countryISOCode:sessionInfo.countryISOCode === undefined? "HK":sessionInfo.countryISOCode,
                    groupMemberCode:sessionInfo.groupMemberCode === undefined? "HBAP":sessionInfo.groupMemberCode,
                    lineOfBusinessCode:"PFS",
                    questionnaireTypeCode:"FPCUSTDCLR"
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
    retrieveQuestionnaireConvertResponse_affordability:(response) =>{
        console.log("response in C for aff",response);
        let affResult= {};
        if(response.questionnaireDocumentTextList !== undefined){
            let questionnaireDocumentTextList =response.questionnaireDocumentTextList;
            console.log("response.questionnaireDocumentTextList",questionnaireDocumentTextList);
            for(var i = 0; i< questionnaireDocumentTextList.length;i++){
                affResult[questionnaireDocumentTextList[i].textIdentificationNumber]=questionnaireDocumentTextList[i].text;
            }
        }else{
            return;
        }
      
        console.log("affResult in Con",affResult);
        return affResult
    },
    parseFNAandReviewInvestment_affordability:(fnaResponse,reviewInvestmentResponse) =>{
        console.log("response in C for aff",response);
        let affResult= {};
        console.log("affResult in Con",affResult);
        return affResult;
    }



}
export default qasConverter_affordability_300;

