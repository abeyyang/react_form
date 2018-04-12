import webServiceEndpoint from "./webServiceEndpoint";
import apiConfig from "../config/apiConfig";
import headersConfig from "../config/headersConfig";
import errorCode from "../config/errorCode";
import requestService from './requestService';
import headersService from './headersService';


export const callMessage = (params) =>{
        console.log("callMessage",params);
        debugger;
        let errorCodes;
        let response;
        let messageId=params.messageId;
        let request=params.request;
        let sessionInfo=getSessionInfo(); // hard code for this moment because there are lots of headers not setted yet
        let localcode=sessionInfo.countryCode+sessionInfo.groupMember;
        //let method=getMethod(messageId,localcode);
        let baseInfos=getBaseInfo(messageId,params.customerId,localcode,sessionInfo);
        const {url, headers, method} = baseInfos
        if(method === undefined||method===null||method===""){
             console.log("error method start:",errorCode.NOT_FOUND_METHOD);
             let errorList=[];
            errorCodes=errorCode.NOT_FOUND_METHOD;
            errorList.push({
                errorLevel:'404',
                errorParmList:{'messageId':messageId},
                errorMessage:'NOT_FOUND_METHOD {messageId}.',
                errorCode:'404'
            });
              response.errorList=errorList;
            console.log("error method:",response);
           return response;
        }
        if(sessionInfo ===undefined||sessionInfo===null||sessionInfo===""){
           errorCodes=errorCode.NOT_FOUND_SESSIONINFO;
            let errorList=[];
           errorList.push({
                errorLevel:'404',
                errorParmList:{'messageId':messageId},
                errorMessage:'NOT_FOUND_SESSIONINFO {messageId}.',
                errorCode:'404'
            });
            response.errorList=errorList;
           return response;
        }
        if(url === undefined||url ===null||url===""){
            let errorList=[];
            errorCodes=errorCode.NOT_FOUND_URL;
            errorList.push({
                errorLevel:'404',
                errorParmList:{'messageId':messageId},
                errorMessage:'NOT_FOUND_URL {messageId}.',
                errorCode:'404'
            });
             response.errorList=errorList;
           return response;
        }
        const _params={
                url,
                headers,
                request:params.request,
                jsonData:params.jsonData,
                messageId:params.messageId,
                filterCriteria:params.filterCriteria
        }
        switch (method) {
        case 'GET':
            return requestService.get(_params);
            break;
        case 'DELETE':
            return requestService.delete(_params);
            break;
        case 'POST':
            return requestService.post(_params);
            break;
       case 'PUT':   
           return requestService.put(_params);
            break;
        default:
            break;
        }
        console.log("end response:",response);
    return response;
}

export const callMessageWithError = (params) =>{
        console.log("callMessageWithError",params);
        let messageResponse = {
            isTimeout : false,
            errorList : [],
            responseBody : null
        }
        let messageId=params.messageId;
        let request=params.request;
        let sessionInfo=getSessionInfo();
        let localcode=sessionInfo.countryCode+sessionInfo.groupMember;
        let method=getMethod(messageId,localcode);
        let baseInfos=getBaseInfo(messageId,params.customerId,localcode,sessionInfo);
        if(method === undefined||method===null||method===""){
            let errorObj = {
                errorLevel : "8",
                errorParmList : [messageId],
                errorMessage : "",
                errorCode : errorCode.NOT_FOUND_METHOD
            }
            messageResponse.errorList.push(errorObj);
            console.log("error method not found:",errorObj);
            return messageResponse;
        }
        if(sessionInfo ===undefined||sessionInfo===null||sessionInfo===""){
            let errorObj = {
                errorLevel : "8",
                errorParmList : [messageId],
                errorMessage : "",
                errorCode : errorCode.NOT_FOUND_SESSIONINFO
            }
            messageResponse.errorList.push(errorObj);
            console.log("error session not found:",errorObj);
            return messageResponse;
        }
        if(baseInfos.url === undefined||baseInfos.url ===null||baseInfos.url===""){
            let errorObj = {
                errorLevel : "8",
                errorParmList : [messageId],
                errorMessage : "",
                errorCode : errorCode.NOT_FOUND_URL
            }
            messageResponse.errorList.push(errorObj);
            console.log("error URL not found:",errorObj);
            return messageResponse;
        }
        let messageParams={
                url:baseInfos.url,
                messageId:params.messageId,
                headers:baseInfos.headers,
                request:params.request,
                jsonData:params.jsonData,
                filterCriteria:params.filterCriteria
        }
        switch (method) {
        case 'GET':
            messageResponse = requestService.getWithError(messageParams);
            break;
        case 'POST':
            messageResponse = requestService.postWithError(messageParams);
            break;
        case 'PUT':   
            messageResponse = requestService.putWithError(messageParams);
            break;
        default:
            let errorObj = {
                errorLevel : "8",
                errorParmList : [],
                errorMessage : "",
                errorCode : errorCode.NOT_FOUND_METHOD
            }
            messageResponse.errorList.push(errorObj);
            console.log("error method not found:",errorObj);
            break;
        }
        console.log("end callMessageWithError response:",messageResponse);
        return messageResponse;
}

export const getBaseInfo = (messageId,customerId,localcode,sessionInfo) =>{
    console.log("start getBaseInfo");
    let url=getUrl(messageId,localcode);
    let method=getMethod(messageId,localcode);
    let headers=getHeaders(customerId,sessionInfo);

    const {currentTargetFunction, localeCode} = sessionInfo
    if (currentTargetFunction) {
        headers = {
            "X-HDR-App-Function": currentTargetFunction || "",
            "X-HDR-Channel-Locale": localeCode || "en_US",
	    'X-HSBC-Saml':'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',
            "Content-Type": "application/json"
        }
    } 
    let baseInfos = {
        "url": url,
        "headers":headers,
        "method":method
    }
    return baseInfos;
}

export const getUrl=(messageId,localcode) =>{
    console.log("start getUrl");
    console.log("localcode",localcode)
    let api=apiConfig[localcode];
    let API_HOST=api.API_HOST;
    let WEB_ROOT=api.WEB_ROOT;
    console.log("API_HOST",API_HOST);
    console.log("WEB_ROOT",WEB_ROOT);
    let contextRoot=API_HOST+WEB_ROOT;
    let serviceEndpoint=webServiceEndpoint[messageId];
    let url=contextRoot+serviceEndpoint.url;
    return url;

}

export const getMethod=(messageId,localcode) =>{
     console.log("start getMethod");
    let api=apiConfig[localcode];
    let API_HOST=api.API_HOST;
    let WEB_ROOT=api.WEB_ROOT;
    let contextRoot=API_HOST+WEB_ROOT;
    let serviceEndpoint=webServiceEndpoint[messageId];
    console.log("start messageId",messageId);
    console.log("start serviceEndpoint",serviceEndpoint);
    let method=serviceEndpoint.type;
    return method;
}

export const getHeaders=(customerId,sessionInfo) =>{
        let headers=headersService.getHeaders(customerId,sessionInfo);
        return headers;
}

export const getSessionInfo = () =>{
   let sessionInfo={
                "businessLine":"PFS",
                "channelId":"OHB",
                "countryCode":"HK",
                "employeeUserId":"43367026",
                "groupMember":"HBAP",
                "hubUserId":"WD01",
                "hubWorkstationId":"WD01"
    }
    return sessionInfo;
}