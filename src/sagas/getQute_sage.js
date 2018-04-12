import { call, put, select, takeEvery, takeLatest, compose,fork,take } from 'redux-saga/effects';
import fpsService from '../services/FPS/fpsService';
import fnaConverter from '../services/FPS/fna/fnaConverter';
import ObjectHelper from '../common/lib/ObjectHelper';
import {inputValidate,outputValidate} from '../services/commonService/validate';
import {
    UPDATE_GET_QUOTE_DATA,SHOW_GET_QUOTE_OVERLAY,SIJ_GET_QUOTE_OVERLAY,SIJ_GET_OR_UPDATE_QUOTE
} from '../FinancialPlanning/SIJ/productSummary/actions/sij_gs_act';

function* loadingGetQuoteOverlay (params){ 
    debugger;
    let requestParams=params.params;
    let updateData={
        productAlternativeNumber:requestParams.insProductCard[0].productAlternativeNumber,
        productTypeCode:requestParams.insProductCard[0].productTypeCode
    }
    
    let currencyCodeList=[
                {value: 'USD', displayValue: 'USD'},
                {value: 'TWD', displayValue: 'TWD'},
                {value: 'GBP', displayValue: 'GBP'},
                {value: 'EUR', displayValue: 'EUR'},
                {value: 'JPY', displayValue: 'JPY'},
                {value: 'AUD', displayValue: 'AUD'},
                {value: 'HKD', displayValue: 'HKD'},
                {value: 'NZD', displayValue: 'NZD'},
            ];
    let  selectCurrencyCode='HKD'            
    updateData.currencyCodeList=currencyCodeList;
    updateData.selectCurrencyCode=selectCurrencyCode;
    updateData.getQuoteOneOverlay=true;
    console.log(requestParams);
        yield put({ 
            type: SHOW_GET_QUOTE_OVERLAY,
            updateData
        });
}

function* getOrUpdateQuote(params){
   
}


export default function* (){
    yield [ 
        takeEvery(SIJ_GET_QUOTE_OVERLAY,loadingGetQuoteOverlay),
        takeEvery(SIJ_GET_OR_UPDATE_QUOTE,getOrUpdateQuote),
    ] 
  
}


