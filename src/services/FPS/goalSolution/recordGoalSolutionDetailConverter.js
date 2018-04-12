const goalSolution ={
     /**
      * goalsolution  recordGoalDetail request convert
      */
    recordGoalDetailRequestConvert:(params)=>{
        console.log("goalsolution recordGoalDetail request convert start ",params);  
        let Info={
                    userId:"43367026",
                    channelId:"OHB",
                    customerId:"HKHBAP506035781",
        };
        let recordGoalDetailConvertRequestConvert = {
                    messageId : "recordGoalSolutionDetail",
                    request:params.request,
                    baseInfo:Info,
                    jsonData:""
            };
        console.log("goalsolution recordGoalDetail request convert end",recordGoalDetailConvertRequestConvert);
        return recordGoalDetailConvertRequestConvert;
    },
    recordGoalDetailResponseConvert:(response)=>{
        let recordGoalDetailsResponseView ={};
        console.log("goalsolution recordGoalDetail response convert start ",response);  

        //convert
       
        console.log("goalsolution recordGoalDetail response convert start ",recordGoalDetailsResponseView);  
        return recordGoalDetailsResponseView;
    },

}

export default goalSolution;