import formatHelper from '../../../../common/lib/formatHelper';
import ObjectHelper from '../../../../common/lib/ObjectHelper';
import retrieveinsurancequoteDetailsBuilder from '../builder/retrieveinsurancequoteDetailsBuilder';
const retrieveinsurancequoteDetailsImpl={
        //    entityInformation
        //    quoteId
        buildRetrieveinsurancequoteDetailsRequest:(parmas)=>{
             let retrieveinsurancequoteDetailsRequest = {};
             //    entityInformation
            //    quoteId
            retrieveinsurancequoteDetailsRequest=retrieveinsurancequoteDetailsBuilder.constructRequest(parmas)
            return retrieveinsurancequoteDetailsRequest
        },
        retrieveinsurancequoteDetailsConvertResponse:(response)=>{
            let converterResponse={};
            converterResponse=retrieveinsurancequoteDetailsBuilder.handleResponse(response);
            return converterResponse;
        }

}

export default recordInsuranceQuoteImpl;