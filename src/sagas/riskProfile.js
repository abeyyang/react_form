import { call, put, select, takeEvery, takeLatest, compose,fork,take } from 'redux-saga/effects';
import {RISKPROFILE_PRINT,RISKPROFILE_CLEAN,RISKPROFILE_CLEANDONE,RISKPROFILE_INIT,RISKPROFILE_INIT1,RISKPROFILE_UPDATE_RTQ,RISKPROFILE_RENEW,RISKPROFILE_SUBMIT,RISKPROFILE_GETRISKDES_DONE,RISKPROFILE_GETRISKDES} from '../FinancialPlanning/riskProfileQuestionnaire/actions/riskProfile_act'
import {UPDATE_ERROR_INFO,CLEAN_ALL_ERROR_INFO,COMMON_RESPONSE_VALIDATE,UPDATE_MESSAGE_BOX} from '../common/actions/nav';
import {api} from "../services/landing";
import {callMessage} from "../services/baseService";
import {inputValidate,outPutValidate,outputValidateWithError} from '../services/commonService/validate';
import qasService from '../services/QAS/qasService'
import qasConverter from '../services/QAS/qasConverter';
import ObjectHelper from '../common/lib/ObjectHelper';
import {sendMessageWithTimeout} from "./common_sga";

function* initRiskProfileData(params){
       yield put({ 
        type: CLEAN_ALL_ERROR_INFO
       });
       console.log("in initRiskProfileData",params);
       let RtqParams,request,requestConverter,response,result,rtqResult;
    //   if(params.rtqParams!==undefined){
    //      RtqParams=params.rtqParams;
    //   }
        let sessionInfo  = params.sessionInfo;
        params = params.params;
        request=inputValidate(params);
        request = {request,sessionInfo,msgSource:"riskProfile"};
        console.log("request for getiting rtq record",request) 
        requestConverter=qasConverter.retrieveQuestionnaireResponseDetailConvertRequest(request);
        response=yield call (sendMessageWithTimeout,qasService.process,requestConverter);
        if (response.isTimeout) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : response.errorList
            });
            return;
        }
        response = outputValidateWithError(response);
        
        if (response.errorList.length > 0) {
            yield put({
                type: UPDATE_MESSAGE_BOX,
                errorList : response.errorList
            });
        }else{
            // result=outPutValidate(response);
            rtqResult=qasConverter.retrieveQuestionnaireResponseDetailConvertResponse_RTQ(response.responseBody);
            console.log("retrieve rtq rtqRequest",requestConverter);
            console.log("retrieve rtq response",response);
            console.log("retrieve rtq result",rtqResult);
            // yield put ({
            //     type:COMMON_RESPONSE_VALIDATE,
            //     response:response
            // }) 
            yield put({ 
            type: RISKPROFILE_INIT1,
            rtqResult
            });

            const fetchCurrentTopic = (dispatch, state) => {
        
            }; 
        }
        
    }
    function* riskSinglePrint(params){
        console.log("single print in saga", params);
        let sessionInfo = params.printRequest;
        let printResquestIndex = {sessionInfo,name:"latest"}
        let printResquest = qasConverter.retrieveQuestionnaireHistoryReportConvertRequest(printResquestIndex);
        debugger
        let printResponse=yield call (qasService.process,printResquest);
        printResponse =printResponse.responseBody
        if(printResponse !== undefined){
                qasConverter.showReport(printResponse);
        }
    }

    function* submitRTQressult(params){
        let request,requestConverter,response,result,confirmedRtqResult;
        let sessionInfo = params.ansParams.sessionInfo;
        let staffInfo = params.ansParams.staffInfo;
        let responseIndex;
        let msg = "";
        console.log("params in sage",params);
        if(params.ansParams.msgName !==  undefined){
            msg = params.ansParams.msgName;
        }
        request = params.ansParams.reqParams,
        request = {request,sessionInfo,staffInfo}
        console.log("request in sage",request);
        requestConverter=qasConverter.maintainQuestionnaireResponseDetailConvertRequest_RTQ(request);
        response=yield call (qasService.process,requestConverter);
        response = response.responseBody;
        console.log("msg in saga",msg)
        if(msg !== undefined && msg !== ""){
            responseIndex = {response,msg}
        }else{
            responseIndex =response
        }
        console.log("response in Sage", response);
        confirmedRtqResult=qasConverter.maintainQuestionnaireResponseDetailConvertResponse_RTQ(responseIndex);
        console.log("result in Saga for confrim",confirmedRtqResult);
        debugger
        if(confirmedRtqResult === true && msg === "print"){
            let printResquestIndex = {sessionInfo,name:"latest"}
            let printResquest = qasConverter.retrieveQuestionnaireHistoryReportConvertRequest(printResquestIndex);
           // printResquest ={printResquest,name:"latest"};
            debugger
            let printResponse=yield call (qasService.process,printResquest);
            printResponse = printResponse.responseBody
            if(printResponse !== undefined){
                qasConverter.showReport(printResponse);
            }
        }
        yield put ({
            type:COMMON_RESPONSE_VALIDATE,
            response:response
        }) 
        yield put({ 
            type: RISKPROFILE_RENEW,
            confirmedRtqResult
       });
    }
    function* getTheRiskDescription(params){
        
        let requestConverter,response,request;
        let sessionInfo = params.rpqTextParams.sessionInfo;
        request = params.rpqTextParams;
        request = {request,msgSource:"riskProfile"}
        console.log("get rd request",request);
        let rtqTextResult;
        requestConverter=qasConverter.retrieveQuestionnaireConvertRequest_RTQ(request);
        response=yield call (qasService.process,requestConverter);
        response = response.responseBody;
        rtqTextResult=qasConverter.retrieveQuestionnaireConvertResponse_RTQ(response);
        let qasConfig = rtqTextResult.qasConfig;
        let success = {qasConfig,sessionInfo}
        yield put ({
            type:COMMON_RESPONSE_VALIDATE,
            response:response
        })
        yield put({ 
            type: RISKPROFILE_GETRISKDES_DONE,
            qasConfig
        });
        
        yield put({ 
            type: RISKPROFILE_INIT,
            success
        });
    }

    function* clearUp(){
        let mainResult; 
        yield put({ 
            type: RISKPROFILE_CLEANDONE,
            mainResult,      
      });
    }

    export default function* (){
        yield [
            takeEvery(RISKPROFILE_SUBMIT,submitRTQressult),
            takeEvery(RISKPROFILE_GETRISKDES,getTheRiskDescription),
            takeEvery(RISKPROFILE_CLEAN,clearUp),
            takeEvery(RISKPROFILE_PRINT,riskSinglePrint),
        ]
         while(true){
            const successParams= yield take(RISKPROFILE_INIT);
            console.log("successParams",successParams);
            let params = {
                customers:[],
                detailSearchCriteria:{searchFunctionCode:"L"},
                questionnaireKey:{},
                searchCriteria:[{
                    key:"QUES_TYPE_CDE",
                    value:"SOLE"
                }],
                messageId:'retrieveQuestionnaireResponseDetail',
                questionnaireTypeCode:"RTQ",
            }; 
            if(!ObjectHelper.isNullOrEmpty(successParams.success.qasConfig)){
                let sessionInfo  = successParams.success.sessionInfo
                params = {params,sessionInfo};
                console.log("params ... in Obj",params);
                yield call(initRiskProfileData,params);
            }
          }
    }

