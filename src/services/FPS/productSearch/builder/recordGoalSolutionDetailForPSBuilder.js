import ObjectHelper from '../../../../common/lib/ObjectHelper';
import formatHelper from '../../../../common/lib/formatHelper';
import {goalSolutionConfig} from '../../../config/goalSolution/goalSolutionConfig'; 
import {goalSolutionDetailConfig} from '../../../config/goalSolution/goalSolutionDetailConfig';
import {productSearchConstants} from '../../../config/goalSolution/productSearchConstants';
import {sortingCriteriaUtils} from '../../../commonService/sortingCriteriaUtils';
import {prodSearchUtils} from '../../../commonService/prodSearchUtils';

const recordGoalSolutionDetailForPSBuilder={

buildRecordGoalSolutionDetailForPS:(requestParams,reviewMyproductsFormBean)=>{
		debugger;
    	let request={

        }
        //subserviceId SAVNDEVA SAVBUYPURP SAVRTQ SAVLCLFLD EXPINSQR SAVPIQ
        //SAVINVIND investorIndicator
        let sessionInfo=requestParams.sessionInfo;
       
        let customers=[{
                    countryISOCode: sessionInfo.countryISOCode,
                    groupMemberCode: sessionInfo.groupMemberCode,
                    sourceSystemRolePlayerCode: sessionInfo.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber: sessionInfo.customerId
                }]
        request.customers=customers;
        request.goalKey={ 
            arrangementIdentifierFinancialPlanning: sessionInfo.goalJourney.planId,
            goalSequenceNumber: sessionInfo.goalJourney.goalId
        }
		request.subserviceId=[{
		"functionOutputCode": "SAVSELPRD"
		}];
        request.alternativeProduct =recordGoalSolutionDetailForPSBuilder._buildAlternativeProduct(reviewMyproductsFormBean);
		request.productList =recordGoalSolutionDetailForPSBuilder._buildproductList(reviewMyproductsFormBean);
		request={
            request,
            messageId:requestParams.messageId
         }
        console.log('request json',JSON.stringify(request));
        return request
      
      
    },
	_buildAlternativeProduct:(reviewMyproductsFormBean)=>{
		let resultProductList = [];
			let preDiscussedProductMap = reviewMyproductsFormBean.preDiscussedProductMap;
			
			if(preDiscussedProductMap){
				preDiscussedProductMap.forEach(function(value,key,map){
					console.log(key ,value,map);
					if(key && key.hasOwnProperty("currencyProductCode")){
						delete key.currencyProductCode;
					}
					let prediscussedProd = {
							productId : [key],
							alternativeProductAttribute : value.alternativeProductAttribute
					};
					resultProductList.push(prediscussedProd);
				});
			}
			let discussedProductMap = reviewMyproductsFormBean.discussedProductMap;
			
			if(discussedProductMap){
				discussedProductMap.forEach(function(value,key,map){
					if(key && key.hasOwnProperty("currencyProductCode")){
						delete key.currencyProductCode;
					}
					let discussedProd = {
							productId : [key],
							alternativeProductAttribute : value.alternativeProductAttribute
					};
					resultProductList.push(discussedProd);
				});
			}

			return resultProductList;
	},
	_buildproductList:(reviewMyproductsFormBean)=>{
			debugger;
			let productSelectionMethodCode = "S";
			let productList = [];
			let searchSelectedProductList = reviewMyproductsFormBean.productList;
			
			if(searchSelectedProductList && searchSelectedProductList.length > 0){
				for(let i=0; i <searchSelectedProductList.length ;i++){
					let selectedprod = searchSelectedProductList[i];
					if(selectedprod){
						let productId = selectedprod.productId;
						if(productId && productId.hasOwnProperty("currencyProductCode")){
							delete productId.currencyProductCode;
						}
						let tempproduct = {};
						tempproduct.productId = [productId];
						tempproduct.productName = selectedprod.productName;
						tempproduct.productSelectionMethodCode = productSelectionMethodCode;
						tempproduct.productSubtypeCode = selectedprod.productSubtypeCode;
						
						let eligibilityResultList = selectedprod.eligibilityResult?selectedprod.eligibilityResult:[];
						if(eligibilityResultList && eligibilityResultList.length > 0){
							tempproduct.eligibilityResult = eligibilityResultList;
						}
						productList.push(tempproduct);
					}
				}
			}
			return productList;

	}

 
}

export default recordGoalSolutionDetailForPSBuilder;