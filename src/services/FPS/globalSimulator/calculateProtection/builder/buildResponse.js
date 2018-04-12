import ObjectHelper from '../../../../../common/lib/ObjectHelper';


const buildResponse={
      buildResponseImpl:(response)=>{
        let totalProNeedAmount=0;
         if(null != response){
            let responseDetails=response.responseDetails;
            if(null != responseDetails){
                let responseCodeInteger=responseDetails.responseCode;
                responseCodeInteger=parseInt(responseCodeInteger)
                if(null != responseCodeInteger && (responseCodeInteger==4||responseCodeInteger==0)){
                    if(!ObjectHelper.isNullOrlengthZore(response.protectionResult)){
                        let shortfallAmount=response.protectionResult[0].shortfall;
                        shortfallAmount=parseFloat(shortfallAmount);
                          if(shortfallAmount>=0){
                            totalProNeedAmount=0
                          }else{
                             totalProNeedAmount=Math.abs(shortfallAmount); 
                          }
                    }

                }
            }    
        }
        return totalProNeedAmount
      }

}
export default buildResponse;