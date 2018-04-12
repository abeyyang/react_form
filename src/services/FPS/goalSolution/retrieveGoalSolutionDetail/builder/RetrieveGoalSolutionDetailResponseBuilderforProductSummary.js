import ObjectHelper from '../../../../../common/lib/ObjectHelper';
const buildRetrieveGoalSolutionDetailResponse={
      buildResponseImpl:(response)=>{
            let goalSolutionDetailData={};
            goalSolutionDetailData.rtvResponse = response;
            goalSolutionDetailData.financialGoal = response.goalSummary[0].financialGoal;
            let insProductCardList = {};
            insProductCardList = buildRetrieveGoalSolutionDetailResponse.convertInsProductCardListforGS(response);
            goalSolutionDetailData.insProductCardList = insProductCardList;
            let alternativeProductList = {};
            alternativeProductList = buildRetrieveGoalSolutionDetailResponse.convertDiscussProductListforGS(response)
            goalSolutionDetailData.alternativeProductList = alternativeProductList;
            return goalSolutionDetailData;
      },

      convertInsProductCardListforGS:(response)=>{
        let insProductCardList = [];
        if(!ObjectHelper.isNullOrlengthZore(response.productTable)){
            response.productTable.map((data,index) => {
                let productInfoList = [];
                let productCodeNameObj = {};
                productCodeNameObj.rowIndex = index;
                productCodeNameObj.productName = data.productName;
                data.productId.map((pData,pIndex) => {
                   if(Object.is(pData.productCodeAlternativeClassificationCode,"M"))
                   productCodeNameObj.productAlternativeNumber =  pData.productAlternativeNumber;
                   productCodeNameObj.productTypeCode = pData.productTypeCode;
                })
                productInfoList.push(productCodeNameObj);
                productInfoList.push(productCodeNameObj);
                productInfoList.push({"suitabilityCheck":""});
                productInfoList.push({"riskLevelCode":data.productInfo.riskLevelCode});
                productInfoList.push({"Suminsured":"N/A"});
                productInfoList.push({"Premium":"N/A"});
                productInfoList.push({"Frequency":"N/A"});
                productInfoList.push({"Budgetfrequency ":"N/A"});
                productInfoList.push({"Budgetcurrency":"N/A"});
                productInfoList.push({"Budgetpremium":"N/A"});
                insProductCardList.push(productInfoList);
            });
        }
        return insProductCardList;
    },
      convertDiscussProductListforGS:(response)=>{
          let alternativeProductList = [];
            if(!ObjectHelper.isNullOrlengthZore(response.alternativeProduct)){
                    response.alternativeProduct.map((attributeObj,index) => {
                        let alternativeProductAttributeList=[];
                        attributeObj.alternativeProductAttribute.map((attribute,pIndex) => {
                            switch(attribute.alternativeProductAttributeCode){
                                case "PRD_TYPE":
                                    attribute.columnIndex= 0;
                                    attribute.rowIndex = index;
                                    break;
                                case "PRD_NAME":
                                    attribute.columnIndex= 1;
                                    break;
                                case "RISK":
                                    attribute.columnIndex= 2;
                                    break;
                                case "CURRENCY":
                                    attribute.columnIndex= 3;
                                    break;
                                case "PRD_SUBTYP":
                                    attribute.columnIndex= 4;
                                    break;
                                default:
                                    break;
                            }
                            if(attribute.alternativeProductAttributeCode !="CURRENCY" && attribute.alternativeProductAttributeCode !="PRD_SUBTYP")
                            alternativeProductAttributeList[attribute.columnIndex] = attribute;
                        });
                        alternativeProductList.push(alternativeProductAttributeList);
                    })
                    return alternativeProductList;
            }
      }
}
export default buildRetrieveGoalSolutionDetailResponse;