import { race, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import ObjectHelper from '../common/lib/ObjectHelper';

export function* sendMessageWithTimeout(func, request) {
    console.log("Call message with timeout handling", func, request);
    let messageResponse = {
        isTimeout : false,
        errorList : [],
        responseBody : null
    }
    const {response, timeout} = yield race({
        response: call(func, request),
        timeout: call(delay, 30000)
    });
    if (response) {
        messageResponse = response;
    } else {
        console.log("message timeout", request);
        let errorObj = {
            errorLevel : "8",
            errorParmList : ObjectHelper.isNullOrEmpty(request) ? [] : [request.messageId],
            errorMessage : "",
            errorCode : "TIMEOUT"
        };
        messageResponse.errorList.push(errorObj);
        messageResponse.isTimeout = true;
   }
    console.log("Call message with timeout handling end");
    return messageResponse;
}

/*
    Input argument format: 
    func : the function the will be called
    parm : the parameters for that function, must be an array object
*/

export function* sendMessageWithParallel(...args) {
    console.log("Call message with parallel handling", args);
    let messageResponses = [];
    let forkTasks = yield call(sendMessageWithAll, args);
    
    for (let index=0; index<forkTasks.length; ++index) {
        let messageResponse = forkTasks[index].result();
        if (messageResponse) {
            messageResponses.push(messageResponse);
        }
    }
    console.log("Call message with parallel handling end", messageResponses);
    return messageResponses;
}

function* sendMessageWithAll(args) {
    console.log("Call message with all handling", args);
    let tasks = [];
    for (let index=0; index<args.length; ++index) {
        if (ObjectHelper.isNullOrEmpty(args[index].func)) {
            continue;   // dun fork any task if func is not defined
        }
        tasks[index] = yield fork(args[index].func, ...args[index].parm);
    }
    
    console.log("Call message with all handling end", tasks);
    return tasks;
}


