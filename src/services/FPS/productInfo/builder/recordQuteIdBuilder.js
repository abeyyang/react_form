import formatHelper from '../../../../common/lib/formatHelper';
import ObjectHelper from '../../../../common/lib/ObjectHelper';
import {selectProdConstants} from'../../../config/goalSolution/selectProdConstants' 

const recordQuteIdBuilder={
           // "customers",
            // "goalKey",
            // "insuranceQuotataionId",
            // "jointCustomer",
            // "localeCode",
            // "packageKey",
            // "productAllocationSeqNumber", productSelectionMethodCode allocationSequenceNumber
            // "productId",
            // "quotationWiringData",
            // "quoteId"
        constructRequest:(parmas)=>{
        //     let quoteId = parmas.quoteId
        //     let applicationNumber = parmas.applicationNumber;
            let sessionInfo=params.sessionInfo;
            let flowDataFormBean=params.flowDataFormBean;
            let request={}
             // customer key
            request.customers=[{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
            }]
             let goalInfo=sessionInfo.goalJourney;
             request.goalKey={
                     arrangementIdentifierFinancialPlanning:goalInfo.planId,
                     goalSequenceNumber:goalInfo.goalId  
             }
             request.localeCode={
                     localeCode:sessionInfo.localeCode
             }
             let allocationSequenceNo=flowDataFormBean.allocationSequenceNumber;
             let productAllocationSequenceNo={};
             if(!ObjectHelper.isNullOrEmpty(allocationSequenceNo)){
                productAllocationSequenceNo.allocationSequenceNumber=parseFloat(allocationSequenceNo);
             }
            if(!ObjectHelper.isNullOrEmpty(flowDataFormBean.prodSelMedCode)){
                productAllocationSequenceNo.productSelectionMethodCode=flowDataFormBean.prodSelMedCod;
             }
             request.productAllocationSeqNumber=productAllocationSequenceNo;
             // product id
             let productIds=[];
             let prodId={};
             prodId.productTypeCode=flowDataFormBean.productTypeCode
             prodId.productAlternativeNumber=flowDataFormBean.productCode
             prodId.productCodeAlternativeClassificationCode=flowDataFormBean.productCodeAlternativeClassificationCode
             prodId.countryProductTradableCode=flowDataFormBean.countryProductTradableCode;
             productIds.push(prodId);
             request.productId=productIds;
              // Quote ID
              let quoteId={}
              quoteId.quotationInternalReferenceNumber=flowDataFormBean.quoteId;
              quoteId.applicationReferenceNumber=flowDataFormBean.applicationNumber;
              request.quoteId=quoteId
             // package id
             let packageId=flowDataFormBean.packageId
             if(!ObjectHelper.isNullOrEmpty(packageId)){
                let packageKey={};
                packageKey.financialPlanningProductPackageSequenceNumber=packageId;
                request.packageKey=[{
                        packageKey
                }]
             }
             // insuranceQuotationSequenceNumber
             let insuranceQuotationSequenceNumber=flowDataFormBean.insuranceQuotationSequenceNumber;
             if(!ObjectHelper.isNullOrEmpty(insuranceQuotationSequenceNumber)){
                insuranceQuotataionId={}
                insuranceQuotataionId.insuranceQuotationSequenceNumber=parseFloat(insuranceQuotationSequenceNumber);
                request.insuranceQuotataionId=[{
                        insuranceQuotataionId
                }]
             }
              // quotation wiring data
        // Map map = new HashMap();
        // map.put(SelectProdConstants.HSBC_OHD_APPLICANT_ID, this.flowDataFormBean.getApplicantID());
        // map.put(SelectProdConstants.HSBC_OHD_CURRENT_PRODUCT_TRACKER_ID, this.flowDataFormBean.getCurrentProductTrackerId());
        // map.put(SelectProdConstants.STEP_ID, this.flowDataScope.get(SelectProdConstants.STEP_ID));
        // map.put(SelectProdConstants.HSBC_OHD_SCREEN_ID, this.flowDataFormBean.getScreenId());
        // map.put(SelectProdConstants.HSBC_OHD_QUOTE_ID, this.flowDataFormBean.getQuoteId());
        // map.put(SelectProdConstants.HSBC_OHD_APPLICATION_ID, this.flowDataFormBean.getApplicationNumber());
        // String quotationDataWiringInformation = MapUtil.mapToString(map);

        // QuotationWiringData[] quotationWiringDatas = new QuotationWiringData[1];
        // QuotationWiringData wiringData = new QuotationWiringData();
        // wiringData.setQuotationDataWiringInformation(quotationDataWiringInformation);
        // quotationWiringDatas[0] = wiringData;
        // request.setQuotationWiringData(quotationWiringDatas);
        let  map={}
        map[selectProdConstants.HSBC_OHD_APPLICANT_ID]=flowDataFormBean.applicantID;
        map[selectProdConstants.HSBC_OHD_CURRENT_PRODUCT_TRACKER_ID]=flowDataFormBean.currentProductTrackerId;
        map[selectProdConstants.STEP_ID]=this.flowDataScope.get(SelectProdConstants.STEP_ID)
        map[selectProdConstants.HSBC_OHD_SCREEN_ID]=flowDataFormBean.screenId;
        map[selectProdConstants.HSBC_OHD_QUOTE_ID]=flowDataFormBean.quoteId;
        map[selectProdConstants.HSBC_OHD_APPLICATION_ID]=flowDataFormBean.applicationNumber;
        let quotationDataWiringInformation=recordQuteIdBuilder.mapToString(map);
        let quotationWiringDatas=[];
        let wiringData={};
        wiringData.quotationDataWiringInformation=quotationDataWiringInformation;
        quotationWiringDatas.pushwiringData();
        request.quotationWiringData=quotationWiringDatas;

        return request;
        },
        mapToString:(map)=>{
                let string='';
                let length=0;
                for (let key in map) {
                     let element=map[key];
                     let tempstring='';
                     tempstring=string;
                    if(length>0){
                        tempstring=tempstring+'&'
                    }
                     if(key!=null){
                         tempstring=tempstring+key;     
                     }
                     tempstring=tempstring+"="
                     if(element!=null){
                         tempstring=tempstring+element;        
                     }
                     
                }
                return string;
        }
}

export default recordQuteIdBuilder;