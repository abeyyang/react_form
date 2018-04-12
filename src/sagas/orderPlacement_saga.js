import { call, put, select, takeEvery, takeLatest, compose,fork } from 'redux-saga/effects';
import {ORDERPLACEMENT_PAGE_INIT,ORDERPLACEMENT_PAGE_INIT_UPDATE} from '../FinancialPlanning/orderPlacement/actions/orderPlacement_act';
import fpsConverter from '../services/FPS/fpsConverter';
import {inputValidate,outPutValidate} from '../services/commonService/validate';
import fpsService from '../services/FPS/fpsService';

function* initOrderPlacementPage(params) {
    let request,requestConverter,response,orderPlacementList,orderPlacementRequest,result;
    orderPlacementRequest = params.orderPlacementRequest;
    let tempState=yield select();
    request=inputValidate(orderPlacementRequest);
    requestConverter=fpsConverter.retrieveOrderShoppingCartConvertRequest(request);
    console.log("requestConverter....",requestConverter);
    response=yield call (fpsService.process,requestConverter);
    console.log("orderPlacementResponse....",response);
    //result=outPutValidate(response);
    orderPlacementList=fpsConverter.retrieveOrderShoppingCartConvertResponse(response);
    console.log("orderPlacementList....",orderPlacementList);
    yield put({
        type: ORDERPLACEMENT_PAGE_INIT_UPDATE,
        orderPlacementList
    });
}


export default function*() {
    yield [
        takeEvery(ORDERPLACEMENT_PAGE_INIT,initOrderPlacementPage)
    ]
}