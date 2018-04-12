import apiConfig from '../../config/apiConfig';
import {callMessage} from "../baseService";
import serviceName from './hubConstants';
import {inputValidate,outPutValidate} from '../commonService/validate';

import retrieveInvolvedPartyDetailsIndividualResponse from './static/retrieveInvolvedPartyDetailsIndividualResponse';
import retrieveJointCustomerInformationResponse from './static/retrieveJointCustomerInformationResponse';



const hubService={
    
    process:(params) =>{
            console.log('start hubService',params);
            let result,dummyResult,dummyFlag,request;
            let messageId=params.messageId;
            let sessionInfo=params.sessionInfo;
            let localcode=sessionInfo.countryCode+sessionInfo.groupMember;
            dummyFlag=apiConfig[localcode].USE_DUMMY_DATA; 
            // dummyFlag = true; 
            console.log('start hubService messageId',messageId); 
            switch (messageId) {
                case serviceName.retrieveInvolvedPartyDetailsIndividual:
                        result=hubService.retrieveInvolvedPartyDetailsIndividual(params,dummyFlag);
                    break;
                case serviceName.retrieveJointCustomerInformation:
                        result=hubService.retrieveJointCustomerInformation(params,dummyFlag);
                    break;
                default:
                    break;
            }
            return result
    },
     /** 
      * hub service
     */
    retrieveInvolvedPartyDetailsIndividual:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=retrieveInvolvedPartyDetailsIndividualResponse;
        }else{
            response=callMessage(request);
        }
       return response;
    },
    retrieveJointCustomerInformation:(request,dummyFlag)=>{
        let response;
        if(dummyFlag){
            response=retrieveJointCustomerInformationResponse;
        }else{
            response=callMessage(request);
        }
       return response;
    },
}

// export const getSessionInfo = () =>{
//    let sessionInfo={
//                 "businessLine":"PFS",
//                 "channelId":"OHB",
//                 "countryCode":"SG",
//                 "employeeUserId":"43367026",
//                 "groupMember":"HBSP",
//                 "hubUserId":"WD01",
//                 "hubWorkstationId":"WD01"
//     }
//     return sessionInfo;
// }

export default hubService;
