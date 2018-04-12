import ObjectHelper from '../../../../common/lib/ObjectHelper';
import formatHelper from '../../../../common/lib/formatHelper';
import {goalSolutionConfig} from '../../../config/goalSolution/goalSolutionConfig'; 
import {goalSolutionDetailConfig} from '../../../config/goalSolution/goalSolutionDetailConfig';
import {productSearchConstants} from '../../../config/goalSolution/productSearchConstants';
import {sortingCriteriaUtils} from '../../../commonService/sortingCriteriaUtils';
import {prodSearchUtils} from '../../../commonService/prodSearchUtils';

const selectedProductsResponseBuilder={

buildSelectedProductsResponseBuilder:(respData,reviewMyproductsFormBean)=>{
    
       if(respData){
        		let resultList = [];
        		let existingHoldingCount = 0;
        		let productList = respData.productList;
        		if(productList && productList.length > 0){
        			for(let i =0; i<productList.length; i ++){
        				let prod = productList[i];
        				if(!prod){
        					continue;
        				}
        				
        				let productIdList = prod.productId;
        				let tempProd = {};
        				let prodIdlet = "";
        				//Get product ID with M code
        				if(productIdList && productIdList.length>0){
        					for(let j =0; j<productIdList.length; j++){
        						if("M" == productIdList[j].productCodeAlternativeClassificationCode){
        							prodIdlet = productIdList[j];
        							break;
        						}
        					}
        				}
        				//M code productId
        				tempProd.productId = prodIdlet;
        				tempProd.productName = prod.productName;
        				tempProd.riskLevelCode = prod.riskLevelCode;
        				tempProd.productSubtypeCode = prod.productSubtypeCode;
        				
        				tempProd.beProduct = prod;
        				tempProd.fromAllocatedHoldingIndicator = prod.fromAllocatedHoldingIndicator;
        				tempProd.additionalInformation = prod.additionalInformation;
						tempProd.eligibilityResult=prod.eligibilityResult;
        				
        				if("Y" == tempProd.fromAllocatedHoldingIndicator){
        					existingHoldingCount = existingHoldingCount + 1;
        				}
        				resultList.push(tempProd);
        			}
        		}
        		reviewMyproductsFormBean.existingHoldingCount = existingHoldingCount;
        		reviewMyproductsFormBean.productList = resultList;
        

        
        }
      
    }
 
}

export default selectedProductsResponseBuilder;