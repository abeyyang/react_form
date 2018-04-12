import { call, put, select, takeEvery, takeLatest, compose,fork,take } from 'redux-saga/effects';
import routeHelper from 'common/lib/routeHelper';
import commonConfig from 'config/commonConfig';
import { LONG_LOCALES, DEFAULT_LONG_LOCALE, NLS } from '../locale/constant'; 
import {UPDATE_ERROR_INFO,COMMON_VALIDATE,COMMON_RESPONSE_VALIDATE,REST_RESPONSE_VALIDATE,UPDATE_MESSAGE_BOX,UPDATE_MESSAGE_BOX_DONE} from '../common/actions/nav';
import ObjectHelper from '../common/lib/ObjectHelper';
import commonVaildateConfig from '../config/commonVaildateConfig';
import errorMessage from '../config/errorMessage';
function* commonValidate(params){
    console.log('commonValidate sage',params);
     
    // let validateResult=params.validateList;
    // let validatePage=params.validatePage;
    // let validateList=commonVaildateConfig[validatePage];
    let errorList=[],warningList=[],errors={
        errorHanding:{
            '123123':123123
        }
    }
    // for (var index = 0; index < validateList.length; index++) {
    //      var validateElement = validateList[index];
    //      if(validateResult[validateElement]==false){
    //         errorList.push({
    //             errorCode:commonVaildateConfig[validateElement]
    //         })
    //      }
    // }
    // errors.errorList=errorList;
    // errors.warningList=warningList
  
    yield put({
        type:UPDATE_ERROR_INFO,
        errors
    })
}

function* responseValidate(result){
        console.log("responseValidate",result);
         let response=result.response;
         const locale_map = commonConfig.locale_map;
         const preferred_Locale = routeHelper.getCookie(locale_map.locale_preferred.key);
         const indexRoute = locale_map.locale_preferred.val.indexOf(preferred_Locale);
         const locale = indexRoute > -1 && locale_map.locale_eli.val[indexRoute] || DEFAULT_LONG_LOCALE;
        /*response={
                
                errorLevel:'',
                
                errorParmList:[],/{}
                errorMessage:''
                
                errorCode:''  CONFIRM/INFORM
        } 
        eg :*/  
        // response={
                
        //         errorLevel:'0',
        //         errorParmList:['success','params'],
        //         errorMessage:'success message exmple {0} , {1}',
        //         errorCode:'INFORM'  
        // }  

        //  response={
                
        //         errorLevel:'4',
        //         errorParmList:{text1:'warning error', text2:'warning error2'},
        //         errorMessage:'warning text {text1}...{text2}.',
        //         errorCode:'SYS0001'  
        // }  

        // response={
                
        //         errorLevel:'5',
        //         // errorParmList:[],/{},
        //         // errorMessage:'',
        //         errorCode:'SYS0001' 
        // }  
    

         let error={
             errorList:[

             ]
         };
         let tempErrorList={
                        errorLevel:'',
                        errorCode:'',
                        errorMessage:'',
                        errorParmList:[]
                      };
        let tempState=yield select();
        let errors=tempState.nav.errors;
        let errorHanding=errors.errorHanding;     
        if(ObjectHelper.isNullOrEmpty(errorHanding.error)){
            errorHanding={
                error:[],
                warning:[],
                info:[],
                success:[]
            }
        }                                  
        if(response.errorLevel!=undefined){
             let errorLevel=response.errorLevel
                tempErrorList={
                        errorLevel:parseInt(response.errorLevel) ,
                        errorCode:response.errorCode,
                        errorMessage:ObjectHelper.isNullOrEmpty(response.errorMessage) ? errorMessage[response.errorCode]:response.errorMessage,
                        errorParmList:ObjectHelper.isNullOrEmpty(response.errorParmList) ? [] : response.errorParmList
                }
                error.errorList.push(tempErrorList);
        }else if(response.responseCode){
              tempErrorList={
                        errorLevel:parseInt(response.responseCode) ,
                        errorCode:response.responseCode,
                        errorMessage:ObjectHelper.isNullOrEmpty(response.errorMessage) ? errorMessage[response.responseCode] :response.errorMessage,
                        errorParmList:ObjectHelper.isNullOrEmpty(response.errorParmList) ? [] : response.errorParmList
                    };
             error.errorList.push(tempErrorList);
        }else if(!ObjectHelper.isNullOrlengthZore(response.reasonCode)){
            let responseCode=response.responseDetails.responseCode;
            let trackingNumberLabel= " trackingNumber is ";
            for (var index = 0; index < response.reasonCode.length; index++) {
                 var element = response.reasonCode[index];
                 trackingNumberLabel=trackingNumberLabel+element.trackingNumber
                 tempErrorList={
                        errorLevel:parseInt(responseCode),
                        errorCode:element.reasonCode,
                        errorMessage:ObjectHelper.isNullOrEmpty(response.errorMessage) ? (errorMessage[element.reasonCode] +trackingNumberLabel):response.errorMessage,
                        errorParmList:ObjectHelper.isNullOrEmpty(response.errorParmList) ? [] : response.errorParmList
                    };
                error.errorList.push(tempErrorList);   
            } 
        }else if(!ObjectHelper.isNullOrEmpty(response.responseDetails.responseCode) && parseInt(response.responseDetails.responseCode)==0){
            //CONFIRM INFORM
            let responseCode=response.responseDetails.responseCode;
                tempErrorList={
                        errorLevel:parseInt(responseCode),
                        errorCode:ObjectHelper.isNullOrEmpty(response.errorCode) ? 'CONFIRM':response.errorCode,
                        errorMessage:ObjectHelper.isNullOrEmpty(response.errorMessage) ? (errorMessage[ObjectHelper.isNullOrEmpty(response.errorCode) ? 'CONFIRM':response.errorCode]):response.errorMessage,
                        errorParmList:ObjectHelper.isNullOrEmpty(response.errorParmList) ? [] : response.errorParmList
                    };
                error.errorList.push(tempErrorList);   
        }
        if(!ObjectHelper.isNullOrlengthZore(error.errorList)){
            for (var i = 0; i < error.errorList.length; i++) {
                 var errorMap = error.errorList[i];
                 let errorLevel=errorMap.errorLevel;
                 let errorCode=errorMap.errorCode;
                 let errorType='';
                 let tempErrorMessage=new String;
                 tempErrorMessage=errorMap.errorMessage;
                 let tempErrorParmList=errorMap.errorParmList;
                 if(errorMap.errorParmList.length!=undefined){
                    for (var j = 0; j < tempErrorParmList.length; j++) {
                      var errorParm = tempErrorParmList[j];
                     tempErrorMessage=tempErrorMessage.replace('{'+j+'}',errorParm);
                     
                     }
                 }
                 if(typeof errorMap.errorParmList =='object' && errorMap.errorParmList.length==undefined){
                            for (var key in errorMap.errorParmList) {
                                 var parm = errorMap.errorParmList[key];
                                 var keyParm= "{"+key+"}";
                                 tempErrorMessage=tempErrorMessage.replace(keyParm,parm);
                            }
                 }
                 tempErrorMessage=tempErrorMessage.replace("[System code: {1}]","[System code: "+errorMap.errorCode+" ]");
                //  if(!ObjectHelper.isNullOrEmpty(response.messageId) ){
                //     tempErrorMessage=tempErrorMessage+'serviceName:'+response.messageId
                //  }
                  if(parseInt(errorLevel) ==0){
                        if(errorCode=='CONFIRM'){
                            errorType='success';
                            errorHanding.success.push({
                                errorMessage:tempErrorMessage,
                                errorCode: error.errorList[i].errorCode
                            })
                        }
                        if(errorCode=='INFORM'){ 
                            errorType='info';
                             errorHanding.info.push({
                                errorMessage:tempErrorMessage,
                                errorCode: error.errorList[i].errorCode
                            })
                        }
                    }else if(parseInt(errorLevel)!=4 && parseInt(errorLevel)!=0){
                          errorType='error'
                          errorHanding.error.push({
                                errorMessage:tempErrorMessage,
                                errorCode: error.errorList[i].errorCode
                            })
                    }else if(parseInt(errorLevel)==4 ){
                          errorType='warning'
                          errorHanding.warning.push({
                                errorMessage:tempErrorMessage,
                                errorCode: error.errorList[i].errorCode
                            })
                    }else{
                         errorType='warning';
                         errorHanding.warning.push({
                                errorMessage:tempErrorMessage,
                                errorCode: error.errorList[i].errorCode
                        })
                    }

                
            }
        }
      

        yield put({
            type:UPDATE_ERROR_INFO,
            errorHanding
        })
}




function* resetResponseValidate(result){
        console.log("resetResponseValidate",result);
         let response=result.response;
         console.log("resetResponseValidate response",response);
         const locale_map = commonConfig.locale_map;
         const preferred_Locale = routeHelper.getCookie(locale_map.locale_preferred.key);
         const indexRoute = locale_map.locale_preferred.val.indexOf(preferred_Locale);
         const locale = indexRoute > -1 && locale_map.locale_eli.val[indexRoute] || DEFAULT_LONG_LOCALE;
        
         let error={
             errorList:[

             ]
         };
         let tempErrorList={
                        errorLevel:'',
                        errorCode:'',
                        errorMessage:'',
                        errorParmList:[]
                      };
        let tempState=yield select();
        let errors=tempState.nav.errors;
        let errorHanding=errors.errorHanding;     
        if(ObjectHelper.isNullOrEmpty(errorHanding.error)){
            errorHanding={
                error:[],
                warning:[],
                info:[],
                success:[]
            }
        }
        if(!ObjectHelper.isNullOrEmpty(response.errorCode)){
            console.log("errorCode...",response.errorCode);
            tempErrorList={
                    errorLevel:parseInt(response.errorLevel) ,
                    errorCode:response.errorCode,
                    errorMessage:ObjectHelper.isNullOrEmpty(response.errorMessage) ? errorMessage[response.errorCode]:response.errorMessage,
                    errorParmList:ObjectHelper.isNullOrEmpty(response.errorParmList) ? [] : response.errorParmList
            }
            error.errorList.push(tempErrorList);
        }else if(!ObjectHelper.isNullOrlengthZore(response.reasonCode)){
           
            let trackingNumberLabel= " trackingNumber is "+response.trackingNumber;
            for (var index = 0; index < response.reasonCode.length; index++) {
                 var element = response.reasonCode[index];
                
                 tempErrorList={
                        errorLevel:4,
                        errorCode:element,
                        errorMessage:ObjectHelper.isNullOrEmpty(response.errorMessage) ? (errorMessage[element] +trackingNumberLabel):response.errorMessage,
                        errorParmList:ObjectHelper.isNullOrEmpty(response.errorParmList) ? [] : response.errorParmList
                    };
                error.errorList.push(tempErrorList);   
            } 
        }
        if(!ObjectHelper.isNullOrlengthZore(error.errorList)){
            for (var i = 0; i < error.errorList.length; i++) {
                 var errorMap = error.errorList[i];
                 let errorLevel=errorMap.errorLevel;
                 let errorCode=errorMap.errorCode;
                 let errorType='';
                 let tempErrorMessage=new String;
                 tempErrorMessage=errorMap.errorMessage;
                 let tempErrorParmList=errorMap.errorParmList;
                 if(errorMap.errorParmList.length!=undefined){
                    for (var j = 0; j < tempErrorParmList.length; j++) {
                      var errorParm = tempErrorParmList[j];
                     tempErrorMessage=tempErrorMessage.replace('{'+j+'}',errorParm);
                     
                     }
                 }
                 if(typeof errorMap.errorParmList =='object' && errorMap.errorParmList.length==undefined){
                            for (var key in errorMap.errorParmList) {
                                 var parm = errorMap.errorParmList[key];
                                 var keyParm= "{"+key+"}";
                                 tempErrorMessage=tempErrorMessage.replace(keyParm,parm);
                            }
                 }
                 tempErrorMessage=tempErrorMessage.replace("[System code: {1}]","[System code: "+errorMap.errorCode+" ]");
                //  if(!ObjectHelper.isNullOrEmpty(response.messageId) ){
                //     tempErrorMessage=tempErrorMessage+'serviceName:'+response.messageId
                //  }
                  if(parseInt(errorLevel) ==0){
                        if(errorCode=='CONFIRM'){
                            errorType='success';
                            errorHanding.success.push({
                                errorMessage:tempErrorMessage,
                                errorCode: error.errorList[i].errorCode
                            })
                        }
                        if(errorCode=='INFORM'){ 
                            errorType='info';
                             errorHanding.info.push({
                                errorMessage:tempErrorMessage,
                                errorCode: error.errorList[i].errorCode
                            })
                        }
                    }else if(parseInt(errorLevel)!=4 && parseInt(errorLevel)!=0){
                          errorType='error'
                          errorHanding.error.push({
                                errorMessage:tempErrorMessage,
                                errorCode: error.errorList[i].errorCode
                            })
                    }else if(parseInt(errorLevel)==4 ){
                          errorType='warning'
                          errorHanding.warning.push({
                                errorMessage:tempErrorMessage,
                                errorCode: error.errorList[i].errorCode
                            })
                    }else{
                         errorType='warning';
                         errorHanding.warning.push({
                                errorMessage:tempErrorMessage,
                                errorCode: error.errorList[i].errorCode
                        })
                    }

                
            }
        }
      

        yield put({
            type:UPDATE_ERROR_INFO,
            errorHanding
        })
}

function* updateMessageBox(action){
    let errorList = action.errorList;
    console.log("updateMessageBoxe",errorList);
    if(ObjectHelper.isNullOrlengthZore(errorList)) {  //empty error list, nothing to do
        return;
    }
    const locale_map = commonConfig.locale_map;
    const preferred_Locale = routeHelper.getCookie(locale_map.locale_preferred.key);
    const indexRoute = locale_map.locale_preferred.val.indexOf(preferred_Locale);
    const locale = indexRoute > -1 && locale_map.locale_eli.val[indexRoute] || DEFAULT_LONG_LOCALE;

    const tempState=yield select();
    let errorHanding={... tempState.nav.errors.errorHanding};
    console.log("updateMessageBox getting the global list", errorHanding);
    for (let i = 0; i < errorList.length; i++) {
        if (ObjectHelper.isNullOrEmpty(errorList[i].errorCode)) {  // just for avoid missing error code
            const errorObj = {
                errorLevel : "8",
                errorParmList : [],
                errorMessage : "Unknown Error Code received!",
                errorCode : "UNKNOWN"
            }
            errorHanding.error.push(errorObj);
            continue;
        }
        errorList[i].errorMessage = yield call(formatErrorMessage, errorList[i]);
        const level = parseInt(errorList[i].errorLevel);
        if (level >= 8) {
            errorHanding.error.push(errorList[i]);
        } else if (level >= 4) {
            errorHanding.warning.push(errorList[i]);
        } else {
            if (errorList[i].errorCode == "CONFIRM") {
                errorHanding.success.push(errorList[i]);
            } else {
                errorHanding.info.push(errorList[i]);
            }
        }
        console.log("in loop for error list", errorList[i]);
    }
    console.log("before putting to DONE", errorHanding);
    yield put({
        type:UPDATE_MESSAGE_BOX_DONE,
        errorHanding
    })

}

function* formatErrorMessage(errorObj) {
    console.log("formatErrorMessage", errorObj);
    if (!ObjectHelper.isNullOrEmpty(errorObj.errorMessage)) {
        return yield call(insertParametersIntoMessage, errorObj.errorMessage, errorObj);
    }
    return yield call (insertParametersIntoMessage, errorMessage[errorObj.errorCode], errorObj);
}

function* insertParametersIntoMessage(inputMessage, errorObj) {
    if (ObjectHelper.isNullOrEmpty(inputMessage)) {
        return "";
    }
    let message = inputMessage;
    console.log("insertParametersIntoMessage", message);
    // first replace {errorCode}
    message = message.replace("{errorCode}", errorObj.errorCode);
    // then replace all {0} ... {n}
    for (let i = 0; i < errorObj.errorParmList.length; i++) {
        message = message.replace("{" + i + "}", errorObj.errorParmList[i]);
    }
    return message;
}

export default function* (){
    yield [ 
        takeEvery(COMMON_VALIDATE,commonValidate),
        takeEvery(COMMON_RESPONSE_VALIDATE,responseValidate),
        takeEvery(REST_RESPONSE_VALIDATE,resetResponseValidate),
        takeEvery(UPDATE_MESSAGE_BOX,updateMessageBox)
    ] 
}