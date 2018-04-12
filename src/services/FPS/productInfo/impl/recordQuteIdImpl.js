import formatHelper from '../../../../common/lib/formatHelper';
import ObjectHelper from '../../../../common/lib/ObjectHelper';
import recordQuteIdBuilder from '../builder/recordQuteIdBuilder';

const recordQuteIdImpl={
        buildRecordQuteIdRequest:(parmas)=>{
            let recordQuoteIdRequest = {};
            // "customers",
            // "goalKey",
            // "insuranceQuotataionId",
            // "jointCustomer",
            // "localeCode",
            // "packageKey",
            // "productAllocationSeqNumber",
            // "productId",
            // "quotationWiringData",
            // "quoteId"
            recordQuoteIdRequest=recordQuteIdBuilder.constructRequest(parmas)
            return recordQuoteIdRequest
        }
}

export default recordQuteIdImpl;