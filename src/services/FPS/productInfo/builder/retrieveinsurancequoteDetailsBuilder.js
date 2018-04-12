import formatHelper from '../../../../common/lib/formatHelper';
import ObjectHelper from '../../../../common/lib/ObjectHelper';
import quoteSummaryBean from '../model/quoteSummaryBean';
const retrieveinsurancequoteDetailsBuilder={
        constructRequest:(parmas)=>{
            let sessionInfo=params.sessionInfo;
            // let flowDataFormBean=params.flowDataFormBean;
            let request={}
             // customer key
            request.customers=[{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
            }]
            let enInfo={};
            enInfo.countryISOCode=ObjectHelper.isNullOrEmpty(sessionInfo.countryISOCode) ? '':sessionInfo.countryISOCode;
            enInfo.groupMemberCode=ObjectHelper.isNullOrEmpty(sessionInfo.groupMemberCode) ? '':sessionInfo.groupMemberCode; 
            request.entityInformation=enInfo;
            let quoteId={};
            quoteId.quotationInternalReferenceNumber=param.quotationInternalReferenceNumber;
            quoteId.applicationReferenceNumber=param.applicationReferenceNumber;
            request.quoteId=quoteId;
            return request
        },
        handleResponse:(response)=>{
            let quoteSummary={};
            //quoteSummary=quoteSummaryBean.getQuoteSummaryBean();
        //     	String ipsxml = response.getQuotationRawData()
		// 		.getInsuranceQuotationText();

		// this.quoteSummaryBean.setProposalData(ipsxml);
		// Timestamp quotationValidToDate = (Timestamp) response
		// 		.getQuotationArrangement().getQuotationValidToDateTime();
		// this.quoteSummaryBean.setTimestamp(quotationValidToDate);

		// String productAlternativeNumber = response.getProductId()
		// 		.getProductAlternativeNumber();
		// this.quoteSummaryBean.setIpsProdCode(productAlternativeNumber);

		// this.quoteSummaryBean.setAfterGetQuote(true);

		// context.putPersistentWorkContextObject("updateflag", new Boolean(true));


            // let ipsxml=response.quotationRawData.insuranceQuotationText;
            // quoteSummary.proposalData=ipsxml;
            // quotationValidToDate=response.quotationArrangement.quotationValidToDateTime;
            // quoteSummary.timestamp=quotationValidToDate
            // let productAlternativeNumber=
        }
}

export default retrieveinsurancequoteDetailsBuilder;