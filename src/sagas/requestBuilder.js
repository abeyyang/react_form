import { call, put, select, takeEvery,take } from 'redux-saga/effects';
import sessionInfoService from '../services/sessionInfoService';

import {
    COMMON_REQUEST_BUILDER
} from '../common/actions/requestBuilder';

function* buildRequestCommon (result) {
        console.log("build request common saga start....",result);
        let currentState = yield select();
        console.log("state in common request builder,",currentState);
        if(currentState != undefined && currentState.session !=undefined && result && result.data){
        let  goalKey=currentState.session.goalJourney;
        result.data.sessionInfo= currentState.session;
        result.data.sessionInfo.goalKey=goalKey;
        console.log("current state session",result.data.sessionInfo);
        }else{
            result.data.sessionInfo=sessionInfoService.getSessionInfo_();
            result.data.sessionInfo.goalKey=sessionInfoService.getSessionInfo_().goalJourney;
        }
}

export default function*(){
    
     while(true){
            const result= yield take(COMMON_REQUEST_BUILDER);
            return yield call(buildRequestCommon,result);
    }
}
