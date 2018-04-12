import ObjectHelper from '../../../../common/lib/ObjectHelper';
import formatHelper from '../../../../common/lib/formatHelper';
import {goalSolutionConfig} from '../../../config/goalSolution/goalSolutionConfig'; 
import {goalSolutionDetailConfig} from '../../../config/goalSolution/goalSolutionDetailConfig';
import {productSearchConstants} from '../../../config/goalSolution/productSearchConstants';
import {sortingCriteriaUtils} from '../../../commonService/sortingCriteriaUtils';
import {prodSearchUtils} from '../../../commonService/prodSearchUtils';

const DiscussedProductsResponseBuilder={

buildDiscussedProductsResponseBuilder:(respData,reviewMyproductsFormBean)=>{
    debugger;
      	if(respData){
                let prodIdlet = null;
        		let alternativeProductList = respData.alternativeProduct;
        		if(alternativeProductList){
        			let preDiscussedProductMap = reviewMyproductsFormBean.preDiscussedProductMap;
        			for(let i =0; i<alternativeProductList.length; i ++){
        				let alternativeProduct = alternativeProductList[i];
        				if(alternativeProduct){
        					let productIdList = alternativeProduct.productId;
        					
        					//Get product ID with M code
            				if(productIdList && productIdList.length>0){
            					//Get product ID with M code
                               for(let j =0; j<productIdList.length; j++){
                                    if("M" == productIdList[j].productCodeAlternativeClassificationCode){
                                        prodIdlet = productIdList[j];
                                        break;
                                    }
                                }
                             
            				}
            				if(prodIdlet){
            					preDiscussedProductMap.set(prodIdlet,alternativeProduct);
            				}
        				}
        			}
                  
        			reviewMyproductsFormBean.preDiscussedProductMap = preDiscussedProductMap;
        		}
        	}
      
    }
 
}

export default DiscussedProductsResponseBuilder;