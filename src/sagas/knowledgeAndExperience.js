import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';
import {
    KE_INIT,KE_UPDATE,SUBMIT_KE_RESULT,SUBMIT_KE_RESULT_DO_SAVE
} from '../FinancialPlanning/knowledgeAndExperience/actions/knowledgeAndExperience_act';
import {
   DASHBOARD_INIT
} from '../FinancialPlanning/landing/actions/landing_act';
import {callMessage} from "../services/baseService";
import keConfig from "../config/keConfig";
import qasService from '../services/QAS/qasService'
import qasConverter from '../services/QAS/qasConverter';
import { inputValidate, outPutValidate, outputValidateWithError } from '../services/commonService/validate'; 
import {UPDATE_ERROR_INFO,CLEAN_ALL_ERROR_INFO,UPDATE_MESSAGE_BOX} from 'common/actions/nav';
import {sendMessageWithTimeout} from "./common_sga";

function* initKnowledgeAndExperienceData(request){
    yield put({ 
        type: CLEAN_ALL_ERROR_INFO
    });
    let tempState=yield select();
    console.log("running in SAGA");
    let requestConverter,response,result,keResult
    let keParams = { 
        customers:[],
		detailSearchCriteria:{searchFunctionCode:"L"},
		questionnaireKey:{},
		searchCriteria:[{
		    key:"QUES_TYPE_CDE",
		    value:"SOLE"
	    }],
        messageId:'retrieveQuestionnaireResponseDetail',
        questionnaireTypeCode:"KE",
    };
    request=inputValidate(keParams); 
    request.sessionInfo = tempState.session;
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
        keResult=qasConverter.retrieveQuestionnaireResponseDetailConvertResponse_KE(response.responseBody);
        console.log("retrieve KE KERequest",keResult);
        yield put({ 
            type: KE_UPDATE,
            keQuestionaire : keResult.keQuestionaire,
            keResult : keResult.keResult,
            itemMap: keResult.itemMap,
            lastDateTime:keResult.lastDateTime
        });
    }
    
}

function* saveKEResult(request){
    let tempState=yield select();
    let requestConverter,response;
    let requestParams = {
        action : "SAVEKE",
        questionnaireTypeCode : "KE",
        customerId : request.customerId,
        keResult : request.keResult,
        lastDateTime:request.lastDateTime
    }
    console.log('SaveKE in Saga',requestParams)
    // request=inputValidate(keParams); 
    requestParams.sessionInfo = tempState.session;
    requestConverter=qasConverter.maintainQuestionnaireResponseDetailConvertRequest_KE(requestParams);
    response=yield call (qasService.process,requestConverter);
    // result=outPutValidate(response);
    // keResult=qasConverter.maintainQuestionnaireResponseDetailConvertResponse_KE(result);
    yield put({ 
        type: SUBMIT_KE_RESULT_DO_SAVE
    });

    yield put({ 
        type: DASHBOARD_INIT
    });
}


export default function*(){
    yield [
        takeEvery(KE_INIT,initKnowledgeAndExperienceData),
        takeEvery(SUBMIT_KE_RESULT,saveKEResult)
    ]
}