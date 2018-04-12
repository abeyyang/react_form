
import { call, put, select, takeEvery, takeLatest, fork, all } from 'redux-saga/effects';
import { browserHistory as history } from 'react-router'

import {
    UPDATE_ACCOUNT_LIST
} from '../common/actions/app';
import { getValue } from 'SFP/common/reducers/app';
// import { api as accountApi, formatter as accountFormatter } from '../services/account';
import {
    NAVIGATE, navigate, UPDATE_ERROR_INFO,CLEAN_ALL_ERROR_INFO,COMMON_RESPONSE_VALIDATE
} from 'SFP/common/actions/nav';

import { showLoading, hideLoading } from 'SFP/common/actions/app';

import commonConfig from 'SFP/config/commonConfig'
import gatewayService from 'SFP/services/Gateway/gatewayService'
import gatewayConverter from 'SFP/services/Gateway/gatewayConverter'
import {GATEWAY_LOGIN, channelData, customerDetail, jointCustomerDetail, relatedSoleCustomerDetail, sfpSession, controlData} from 'SFP/common/actions/session'
import {getSessionInfo, getCustomerInfo} from 'SFP/common/reducers/session'
import hubService from 'SFP/services/HUB/hubService'
import hubConverter from 'SFP/services/HUB/hubConverter'
import fpsService from 'SFP/services/FPS/fpsService'
import fpsConverter from 'SFP/services/FPS/fpsConverter'
import {inputValidate,outPutValidate} from 'SFP/services/commonService/validate'



function* getAccount () {
    try {
        let accounts = yield call(accountApi.getAccountList);
        accounts = accountFormatter.formatAccountList(accounts.response);
        yield put({ type: UPDATE_ACCOUNT_LIST, accounts });
    } catch (error) {
        yield put({ type: UPDATE_ACCOUNT_LIST, accounts: [] });
    }
}

function* loadCustomerDetail() {
    const {session: {customerID, hasError}} = yield select()
    if (!hasError && customerID) {
        const sessionInfo = yield select(getSessionInfo)
        const request = {sessionInfo, customerID}
        yield put(customerDetail.request(request))
        const svcRequest = hubConverter.retrieveInvolvedPartyDetailsIndividualConvertRequest(request)
        const svcResponse = yield call(hubService.process, svcRequest)
        let response = svcResponse
        if (outPutValidate(response)) {
            yield put(customerDetail.failure(request, response))
            yield put ({
                type:COMMON_RESPONSE_VALIDATE,
                response
            })
        } else {
            response = hubConverter.retrieveInvolvedPartyDetailsIndividualConvertResponse(response)
            yield put(customerDetail.success(request, response))

            if (response.isJointCustomer) {
                yield call(loadJointCustomerDetail)
            }
        }
    }
}

function* loadJointCustomerDetail() {
    const {session: {customerID, hasError}} = yield select()
    if (!hasError) {
        const sessionInfo = yield select(getSessionInfo)
        const request = {sessionInfo, customerID}
        yield put(jointCustomerDetail.request(request))
        const svcRequest = hubConverter.retrieveJointCustomerInformationConvertRequest(request)
        const svcResponse = yield call(hubService.process, svcRequest)
        let response = svcResponse
        if (outPutValidate(response)) {
            yield put(jointCustomerDetail.failure(request, response))
            yield put ({
                type:COMMON_RESPONSE_VALIDATE,
                response
            })
        } else {
            response = hubConverter.retrieveJointCustomerInformationConvertResponse(response)
            yield put(jointCustomerDetail.success(request, response))

            yield call(loadRelatedSoleCustomerDetails)
        }
    }
}
function* loadRelatedSoleCustomerDetails() {
    const {session: {relatedSoleCustomerIDs, hasError}} = yield select()
    if (!hasError && relatedSoleCustomerIDs) {
        yield relatedSoleCustomerIDs.map(relatedSoleCustomerID=>{
            return call(loadRelatedSoleCustomerDetail, relatedSoleCustomerID)
        })
    }
}
function* loadRelatedSoleCustomerDetail(customerID) {
    const sessionInfo = yield select(getSessionInfo)
    const request = {sessionInfo, customerID}
    yield put(relatedSoleCustomerDetail.request(request))
    const svcRequest = hubConverter.retrieveInvolvedPartyDetailsIndividualConvertRequest(request)
    const svcResponse = yield call(hubService.process, svcRequest)
    let response = svcResponse
    if (outPutValidate(response)) {
        yield put(relatedSoleCustomerDetail.failure(request, response))
        yield put ({
            type:COMMON_RESPONSE_VALIDATE,
            response
        })
    } else {
        response = hubConverter.retrieveInvolvedPartyDetailsIndividualConvertResponse(response)
        yield put(relatedSoleCustomerDetail.success(request, response))
    }
}
function* downloadControlData() {
    const {session: {customerID, customerDetails, hasError}} = yield select()
    if (!hasError) {
        const controlDataType = commonConfig.controlDataType // TODO support entity
        const sessionInfo = yield select(getSessionInfo)
        let request
        if ("P"===controlDataType) {
            const {provinceCode, birthDate} = customerDetails[customerID]

            if (!provinceCode || !birthDate) {
                alert("TODO:no provinceCode or no birthDate")
            } else {
                request = {sessionInfo, controlDataType, provinceCode, birthDate}
            }
        } else {
            request = {sessionInfo, controlDataType}
        }

        const needTrigger = !!request
        if (needTrigger) {
            yield put(controlData.request(request))
            const svcRequest = fpsConverter.fpsDownloadControlDataConvertRequest(request)
            const svcResponse = yield call(fpsService.process, svcRequest)
            let response = svcResponse.responseBody
            if (outPutValidate(svcResponse)) {
                // TODO: uncomment
                // yield put(controlData.failure(request, response))
                yield put ({
                    type:COMMON_RESPONSE_VALIDATE,
                    response
                })
            } else {
                response = fpsConverter.fpsDownloadControlDataConvertResponse(response)
                yield put(controlData.success(request, response))
            }
        }
    }
}
function* sfpLoginMonitor({launchParamStr}) {
    yield put(sfpSession.request())
    
    if (launchParamStr) {
        const launchChannelData = gatewayConverter.channelDataConverter(launchParamStr)
        yield put(channelData.received(launchChannelData))

        yield put(navigate(""))
        const tttfullState = yield select();
        console.log("++++Test: tttfullState =", tttfullState);
        const {session: {online, encryptedState, state, targetFunction}} = yield select()
        const sessionInfo = yield select(getSessionInfo)
        if (online) {
            const request = {sessionInfo, encryptedState, state, targetFunction}
            // yield put(channelData.loginRequest(request))
            const svcRequest = gatewayConverter.logonConvertRequest(request)
            let svcResponse = yield call(gatewayService.process, svcRequest)
            let response = svcResponse.responseBody
            console.log("++++Test: svcResponse = ", svcResponse);
            if (outPutValidate(svcResponse)) {
                yield put(channelData.loginFailure(request, response))
                yield put ({
                    type:COMMON_RESPONSE_VALIDATE,
                    response
                })
            } else {
                response = gatewayConverter.logonConvertResponse(response)
                yield put(channelData.loginSuccess(request, response))
            }
        }
    }

    yield call(loadCustomerDetail)
    // yield call(downloadControlData)

    const {session:{hasError}} = yield select()
    if (hasError) {
        yield put(sfpSession.failure())
    } else {
        yield put(sfpSession.success())
    const svcCustomerInfo = yield select(getCustomerInfo())
    }

    const {session:{targetFunction}} = yield select()
    console.log("++++Test: targetFunction = ", targetFunction);
    yield put(navigate(targetFunction, {testIn: 'you may pass any data here as navigation parameters'}))

}

function* navigateMonitor({targetDesc, params}) {
    const {session:{locale}} = yield select()
    const _locale = locale.toLowerCase().replace('_', '-')
    const subPath = [_locale, targetDesc].filter(v=>!!v).join("/")
    yield history.push(`${CONFIG.WEB_ROOT}main/${subPath}`) //TODO root be configurable
}

export default function*() {
    yield [
    	takeEvery(GATEWAY_LOGIN, sfpLoginMonitor),
        takeEvery(NAVIGATE, navigateMonitor)
        // takeEvery(FETCH_ACCOUNT_LIST, getAccount)
    ];
};
