import inputConstants from './inputConstants';
import ObjectHelper from '../../common/lib/ObjectHelper';
export const inputValidate=(params)=>{
        console.log("inputValidate start",params);
        let messageId=params.messageId;
        let requsetObjects=[];
        requsetObjects=inputConstants[messageId].request;
         console.log("requsetObjects :",requsetObjects);
        for (var index = 0; index < requsetObjects.length; index++) {
             var key = requsetObjects[index];
             console.log("key",key);
             console.log("params[key]",params[key]);
             if(params[key]===undefined){
                 return "error"
             }
        }
        return params;
}


export const outPutValidate=(response)=>{
        let error=false;
        let errorCodes;
        let result;
        if(!ObjectHelper.isNullOrEmpty(response.responseCode) && parseInt(response.responseCode)>0){
            error=true;
        }else if(!ObjectHelper.isNullOrEmpty(response.errorCode) && parseInt(response.errorLevel)>0) {
            error=true;
        }else if (!ObjectHelper.isNullOrEmpty(response.responseDetails)&&!ObjectHelper.isNullOrEmpty(response.responseDetails.responseCode) && 
        parseInt(response.responseDetails.responseCode)>0 ){
             error=true;
        }else if(!ObjectHelper.isNullOrEmpty(response.responseDetails)&&ObjectHelper.isNullOrEmpty(response.responseDetails.responseCode)){
            error=true;
        }
        console.log("outPutValidate",error);
        return error;
}

export const outPutValidateForRestService=(response)=>{
       
        let error = false;
        
        if(!ObjectHelper.isNullOrlengthZore(response.reasonCode)){
            error=true;
        }else if(!ObjectHelper.isNullOrEmpty(response.errorCode) && parseInt(response.errorLevel)>0) {
            error=true;
        }
        return error;
}

/*
    3 cases to be handled with response error codes
    1. HTTP response ok, but response Code + reason code is not empty 
    2. HTTP response not ok, errorList already contains the HTTP status error code, but reason code empty
    3. HTTP response not ok, errorList already contains the HTTP status error code, and reason code is not empty
*/
export const outputValidateWithError=(messageResponse)=>{
        console.log("outputValidateWithError started",messageResponse);
        let newMessageResponse = {... messageResponse};
        const beResponse = messageResponse.responseBody;
        if (ObjectHelper.isNullOrEmpty(beResponse)) {
            return newMessageResponse;
        }
        if (ObjectHelper.isNullOrlengthZore(messageResponse.errorList)) {
            // case 1, for legacy
            if (!ObjectHelper.isNullOrEmpty(beResponse.responseDetails) && 
                !ObjectHelper.isNullOrEmpty(beResponse.responseDetails.responseCode)) {
                newMessageResponse.errorList = extractReasonCodeFromLegacy(beResponse, []);
            } 
            // case 1, for REST
            else if (!ObjectHelper.isNullOrlengthZore(beResponse.reasonCode)) {
                newMessageResponse.errorList = extractReasonCodeFromRest(beResponse, []);    
            }
        } else {
            // case 3, for REST 
            if (!ObjectHelper.isNullOrlengthZore(beResponse.reasonCode)) {
                newMessageResponse.errorList = extractReasonCodeFromRest(beResponse, messageResponse.errorList);
            } 
            // case 3, for legacy
            else if (!ObjectHelper.isNullOrEmpty(beResponse.responseCode)) {
                newMessageResponse.errorList = extractReasonCodeFromLegacy(beResponse, messageResponse.errorList);
            }
            // case 2, do nothing is fine since the HTTP error code should already been put inside the error list
            else {
            }
        }

        console.log("outputValidateWithError ended",newMessageResponse);
        return newMessageResponse;
}

export const extractReasonCodeFromLegacy=(beResponse, errorList)=>{
        if (ObjectHelper.isNullOrEmpty(beResponse.reasonCode) && 
            ObjectHelper.isNullOrEmpty(beResponse.responseCode)) {  //empty list for no reason code and no response code
            return newErrorList;
        }
        let newErrorList = errorList.slice();
        const newErrorLevel = (ObjectHelper.isNullOrlengthZore(errorList)) ? beResponse.responseDetails.responseCode : errorList[0].errorLevel; 
        if (!ObjectHelper.isNullOrEmpty(beResponse.responseCode)) {  // response code should only have 1 element
            let errorObj = {
                errorLevel : newErrorLevel,
                errorParmList : [beResponse.correlationId],
                errorMessage : "",
                errorCode : beResponse.responseCode
            };
            newErrorList.push(errorObj);
            return newErrorList;
        }
        // handle multiple reason codes
        for (let i = 0; i < beResponse.reasonCode.length; i++) {
            if (beResponse.responseDetails.responseCode == 0) {  //no need to put error code if return 0
                continue;
            }
            let errorObj = {
                errorLevel : newErrorLevel,
                errorParmList : [beResponse.reasonCode[i].trackingNumber],
                errorMessage : "",
                errorCode : beResponse.reasonCode[i].reasonCode
            };
            newErrorList.push(errorObj);
        }
        return newErrorList;
}

export const extractReasonCodeFromRest=(beResponse, errorList)=>{
        // assume the first element of error list is ready for telling HTTP error level base on status code
        // and assume it always error if no HTTP error level
        const newErrorLevel = (ObjectHelper.isNullOrlengthZore(errorList)) ? "8" : errorList[0].errorLevel; 
        let newErrorList = errorList.slice();
        if (ObjectHelper.isNullOrEmpty(beResponse.reasonCode)) {  //empty list for no reason code
            return newErrorList;
        }
        for (let i = 0; i < beResponse.reasonCode.length; i++) {
            let errorObj = {
                errorLevel : newErrorLevel,
                errorParmList : [beResponse.trackingNumber],
                errorMessage : "",
                errorCode : beResponse.reasonCode[i]
            };
            newErrorList.push(errorObj);
        }
        return newErrorList;
}