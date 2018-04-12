import { call, put, select, takeEvery, takeLatest, compose, fork } from 'redux-saga/effects';
import { RISKPROFILEQUESTTEXT_GETSTAFFINFO, RISKPROFILEQUESTTEXT_GETSTAFFINFO_DONE, RISKPROFILEQUEST_INIT, RISKPROFILEQUEST_INIT1, RISKPROFILEQUESTTEXT_INIT, RISKPROFILEQUESTTEXT_UPDATE, RISKPROFILEQUESTTEXT_CAL, RISKPROFILEQUESTTEXT_GETRESULT } from '../FinancialPlanning/riskProfileQuestionnaire/actions/riskProfileQuest_act'
import { api } from "../services/landing";
import { callMessage } from "../services/baseService";
import { inputValidate, outPutValidate,outputValidateWithError} from '../services/commonService/validate';
import { UPDATE_ERROR_INFO, CLEAN_ALL_ERROR_INFO, COMMON_RESPONSE_VALIDATE,UPDATE_MESSAGE_BOX} from '../common/actions/nav';
import qasService from '../services/QAS/qasService'
import qasConverter from '../services/QAS/qasConverter';
import {sendMessageWithTimeout} from "./common_sga";

function* initRiskProfileQuesData(params) {
    yield put({
        type: CLEAN_ALL_ERROR_INFO
    });
    console.log("in initRiskProfileData", params);
    let RtqParams, request, requestConverter, response, result, rtqResult;
    let sessionInfo = params.rtqParams.sessionInfo;
    params = params.rtqParams.params;
    console.log()
    request = inputValidate(params);
    request = { request, sessionInfo, msgSource: "riskProfile" };
    console.log("request for getting cus record", request);
    requestConverter = qasConverter.retrieveQuestionnaireResponseDetailConvertRequest(request);
    response = yield call(sendMessageWithTimeout, qasService.process, requestConverter);
    // result=outPutValidate(response);
    if (response.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: response.errorList
        });
        return;
    }
    response = outputValidateWithError(response);

    if (response.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList: response.errorList
        });
    } else {
        rtqResult = qasConverter.retrieveQuestionnaireResponseDetailConvertResponse_RTQ(response.responseBody);
        console.log("retrieve rtq rtqRequest", requestConverter);
        console.log("retrieve rtq response", response);
        console.log("retrieve rtq result", rtqResult);
        yield put({
            type: RISKPROFILEQUEST_INIT1,
            rtqResult
        });

        const fetchCurrentTopic = (dispatch, state) => {

        };
    }

}

function* initRiskProfileQuestTextData(params) {
    let requestConverter, response, request;
    request = params.rpqTextParams;
    request = { request, msgSource: "riskProfile" }
    let rtqTextResult;
    requestConverter = qasConverter.retrieveQuestionnaireConvertRequest_RTQ(request);
    response = yield call(qasService.process, requestConverter);
    response = response.responseBody;
    rtqTextResult = qasConverter.retrieveQuestionnaireConvertResponse_RTQ(response);
    yield put({
        type: RISKPROFILEQUESTTEXT_UPDATE,
        rtqTextResult
    });
}

function* getStaffInformation(params) {
    console.log("getStaffInformation", params);
    let requestConverter, response, request;
    request = params.staffId;
    // requestConverter=qasConverter.retrieveQuestionnaireConvertRequest_RTQ(request);
    // response=yield call (qasService.process,requestConverter);
    // rtqTextResult=qasConverter.retrieveQuestionnaireConvertResponse_RTQ(response); 
    let staffInfo = {
        staffId: request,
        staffName: "Wang Bo",
    }
    let staffValid = true;
    yield put({
        type: RISKPROFILEQUESTTEXT_GETSTAFFINFO_DONE,
        staffInfo,
        staffValid
    });
}

function* getRiskProfileResult(params) {
    let requestConverter, response, request;
    console.log("params for getting calculate result", params)
    //request = params.rpqTextParams;
    let calResult;
    let sessionInfo = params.rpqRankParams.sessionInfo;
    request = params.rpqRankParams.rtqResult;
    request = { request, sessionInfo };
    console.log("request for getting calculate result", request);
    requestConverter = qasConverter.calculateQuestionnaireRankingConvertRequest(request);
    response = yield call(qasService.process, requestConverter);
    response = response.responseBody;
    yield put({
        type: COMMON_RESPONSE_VALIDATE,
        response: response
    })
    calResult = qasConverter.calculateQuestionnaireRankingConvertResponse(response);
    let ansRecord = []
    ansRecord = request.request.ansRecord;
    console.log("ansRecord in getting result", ansRecord);
    yield put({
        type: RISKPROFILEQUESTTEXT_CAL,
        calResult,
        ansRecord: ansRecord
    });
    console.log("new calResult", calResult);
}
export default function* () {
    yield [
        takeEvery(RISKPROFILEQUEST_INIT, initRiskProfileQuesData),
        takeEvery(RISKPROFILEQUESTTEXT_INIT, initRiskProfileQuestTextData),
        takeEvery(RISKPROFILEQUESTTEXT_GETRESULT, getRiskProfileResult),
        takeEvery(RISKPROFILEQUESTTEXT_GETSTAFFINFO, getStaffInformation),
    ]
}