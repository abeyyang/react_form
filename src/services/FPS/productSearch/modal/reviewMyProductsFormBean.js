export default getReviewMyProductsFormBean=>{

let reviewMyProductsFormBean={
        productList:[],
        discussedProductMap:new Map,
        preDiscussedProductMap : new Map,
        existingHoldingAmount:null,
        allocatedHoldingInformations:[{
            productTypeCode:null,
            productSubtypeCode:null,
            productAlternativeNumber:null,
            productCodeAlternativeClassificationCode:null,
            countryProductTradableCode:null,
            productCode:null,
            productName:null,
            productShortName:null,
            currencyProductCode:null,
            currencyInvestmentCode:null,
            riskLevelCode:null,
            allocationInvestmentPercent:null,
            currencyAssetAllocationCode:null,
            currencyInvestmentInitialCode:null,
            investmentInitialAmount:null,
            currencyInvestmentMonthlyCode:null,
            investmentMonthlyAmount:null,
            currencyCurrentInvestmentAmountCode:null,
            currentInvestmentAmount:null,
            currencyTargetInvestmentAmountCode:null,
            targetInvestmentAmount:null,
            productLinkageNumber:null,
            productHierarchyCode:null,
            assetClassGroupCode:null,
            wrapperEligibleTextLength:null,
            wrapperEligibleText:null
        }],
        retirementAge:null,
        selectINSProduct:null,
        selectedProductListJsonList:null,
        fundCompareProductList:[],
        fundCompareProductListJsonList:null

    }
return reviewMyProductsFormBean;
}