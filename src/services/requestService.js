const requestService={
      fetch: (url, option,messageId) => {
          debugger;
          let resp;
          console.log("start fetch");
          console.log("start fetch option",option);
          console.log("start fetch url",url);
          let req= fetch(url,option);
          console.log("start req",req);
          resp=req.then(status)
            .then(json)
            .then(function(data){
                 let messageResponse = {
                    isTimeout : false,
                    errorList : [],
                    responseBody : data
                };
                return messageResponse;
            })
            .catch(function(err){
                 console.log("Message has error:",err);
                 let errorList=[]
                 errorList.push({
                     errorLevel:'8',
                     errorParmList:{'messageId':messageId},
                     errorMessage:err.stack+', {messageId} is fail',
                     errorCode: err.message
                 })
                   resp.errorList=errorList
                 return resp;
            }); 
              console.log("start resp",resp);
            return resp
      },
     get: (params,option={}) => {
        let jsonData=params.jsonData;
        console.log("jsonData",jsonData);
        let urls=params.url;
        if(null!=urls&&urls.indexOf('life400InsuranceDetail')>=0){
            urls= urls+'?filterCriteria='+encodeURIComponent(JSON.stringify(jsonData));
        } else if(params.jsonData==undefined && params.filterCriteria!=undefined){
             let filterCriteria=params.filterCriteria
             urls= urls+'?filterCriteria='+encodeURIComponent(JSON.stringify(filterCriteria));
        } else{
            urls= urls+'?jsonData='+encodeURIComponent(JSON.stringify(jsonData));
        }   
        option={
            headers:params.headers,
            method:'GET',
            credentials: 'include' 
        }
         let messageId=params.messageId
       return  requestService.fetch(urls, option,messageId);
      },
      delete: (params,option={}) => {
        let jsonData=params.jsonData || params.request;
        console.log("jsonData",jsonData);
        let urls=params.url;
        urls= urls+'?jsonData='+encodeURIComponent(JSON.stringify(jsonData));
        option={
            headers:params.headers,
            method:'DELETE',
            credentials: 'include'
        }
       return  requestService.fetch(urls, option);
      },
      post: (params,option={}) => {
        console.log("start post")
         option={
            headers:params.headers,
            method:'POST',
            credentials: 'include',
            body:JSON.stringify(params.request)
        }
        let messageId=params.messageId
        let url=params.url;
        return requestService.fetch(url, option,messageId)
      },
       put: (params,option={}) => {
         option={
            headers:params.headers,
            method:'PUT',
            credentials: 'include',
            body:JSON.stringify(params.request)
        }
         let messageId=params.messageId
        let url=params.url;
       return  requestService.fetch(url, option,messageId)
    },
    fetchWithError: (fetchParams) => {
        console.log("start fetch");
        console.log("start fetch option",fetchParams.option);
        console.log("start fetch url",fetchParams.requestUrl);
        let fetchReturn = fetch(fetchParams.requestUrl, fetchParams.option)
            .then(processResponse)
            .then((response) => {  //fetch with correct HTTP response
                console.log("Correct Message ", response.data);
                let messageResponse = {
                    isTimeout : false,
                    errorList : [],
                    responseBody : response.data
                };
                return messageResponse;
            })
            .catch((response) => {  //fetch with HTTP response > 200, further handle the error outside for REST or non-REST
                console.log("Message has error:",response);
                let errorObj = {
                    errorLevel : (response.status < 300) ? "4" : "8",  // warning for HTTP code 2xx as per REST design
                    errorParmList : [fetchParams.messageId],
                    errorMessage : "",
                    errorCode : "HTTP" + response.status
                }
                let messageResponse = {
                    isTimeout : false,
                    errorList : [errorObj],
                    responseBody : response.data
                };
                return messageResponse; 
            });
        console.log("End of fetchWithError ", fetchReturn);
        return fetchReturn;
      },
     getWithError: (params) => {
        let jsonData=params.jsonData;
        let formattedUrl=params.url;
        let filterCriteria=params.filterCriteria;
        if(null!=formattedUrl && formattedUrl.indexOf('life400InsuranceDetail')>=0){
            formattedUrl = formattedUrl + '?filterCriteria='+encodeURIComponent(JSON.stringify(jsonData));
        } else if(params.jsonData==undefined && params.filterCriteria!=undefined){
            formattedUrl = formattedUrl + '?filterCriteria='+encodeURIComponent(JSON.stringify(filterCriteria));
        } else{
            formattedUrl = formattedUrl + '?jsonData='+encodeURIComponent(JSON.stringify(jsonData));
        }   
        const option={
            headers:params.headers,
            method:'GET',
            credentials: 'include' 
        };
        let fetchParams={
            requestUrl:formattedUrl,
            messageId:params.messageId,
            option:option
        }
        return requestService.fetchWithError(fetchParams);
      }, 
     postWithError: (params) => {
        console.log("start post")
        const option={
            headers:params.headers,
            method:'POST',
            body:JSON.stringify(params.request)
        };
        let fetchParams={
            requestUrl:params.url,
            messageId:params.messageId,
            option:option
        }
       return requestService.fetchWithError(fetchParams)
      },
    putWithError: (params) => {
        const option={
            headers:params.headers,
            method:'PUT',
            body:JSON.stringify(params.request)
        };
        let fetchParams={
            requestUrl:params.url,
            messageId:params.messageId,
            option:option
        }
        return requestService.fetchWithError(fetchParams)
    }
};

const status=(response)=>{
        if(response.status>=200 && response.status<300){
             console.log("Message status is ok",response.status)
            return Promise.resolve(response);
        }else{
             console.log("Message status is bad",response.status)
            return Promise.reject(new Error(response.status));
        }
}

const json=(response)=>{
    let jsonPromise=response.json();
    console.log("Message json",jsonPromise)
    return jsonPromise;
}

const processResponse=(response) => {
    console.log("processResponse",response);
    return new Promise((resolve, reject) => {
        let func;
        response.status == 200 ? func = resolve : func = reject;
        response.json()
            .then( (data) => func({"status": response.status, "data": data}))
            .catch( (error) => {
                console.log("JSON error:",error);
                reject({"status": response.status, "data": ""});
            });
    });
}

export default requestService;
