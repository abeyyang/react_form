import apiConfig from 'SFP/config/apiConfig';
import {callMessage} from "SFP/services/baseService";
import serviceName from 'SFP/services/Gateway/gatewayConstants';
import {inputValidate,outPutValidate} from 'SFP/services/commonService/validate';

import logonResponse from './static/logonResponse';



const gatewayService={
    
    process:(params) =>{
            console.log('start gatewayService',params);
            let result,dummyResult,dummyFlag,request;
            let messageId=params.messageId;
            let sessionInfo=params.sessionInfo;
            let localcode=sessionInfo.countryCode+sessionInfo.groupMember;
            dummyFlag=apiConfig[localcode].USE_DUMMY_DATA; 
            // dummyFlag = true; 
            console.log('start gatewayService messageId',messageId); 
            switch (messageId) {
                case serviceName.logon:
                        result=gatewayService.logon(params,dummyFlag);
                    break;
                default:
                    break;
            }
            return result
    },
     /** 
      * gateway service
     */
    logon:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=logonResponse;
        }else{
            response=callMessage(request);
        }
       return response;
    },
}

export default gatewayService;