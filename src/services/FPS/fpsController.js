import fpsService from './fpsService'

export const fpsController = (params) =>{
    // let messageId=params.messageId;
    let result=fpsService.process(params);
    return result;
}