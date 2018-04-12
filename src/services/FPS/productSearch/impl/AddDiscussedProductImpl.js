
import sessionInfoService from '../../../sessionInfoService'
import ObjectHelper from '../../../../common/lib/ObjectHelper';
import formatHelper from '../../../../common/lib/formatHelper';
import {productSearchConstants} from '../../../config/goalSolution/productSearchConstants';
import {sortingCriteriaUtils} from '../../../commonService/sortingCriteriaUtils';
import {prodSearchUtils} from '../../../commonService/prodSearchUtils';
const addProductImpl={


 addDisscussedProductImpl:(requestData,reviewMyProductsFormBean,searchResultProducts)=>{
        // let request=new Map;
        debugger;
        let maxAllowableProducts =productSearchConstants.MAX_ALLOWABLE_PRODUCTSKEY;
        let productList = reviewMyProductsFormBean.productList;
        console.log("start to add product");
        if(reviewMyProductsFormBean && productList && productList.length<maxAllowableProducts){
            if(searchResultProducts){
               let selectedProductId= requestData.productId;
               //let selectedProductKeyString= selectedProductKey.productTradableCode+"_"+selectedProductKey.productTypeCode+"_"+selectedProductKey.productAlternativeNumber+"_"+selectedProductKey.productCodeAlternativeClassCode;
               let toAddProduct;
                if(requestData.operation=="add"){
                    searchResultProducts.map(function(tempProduct,index){
                        if(tempProduct){
                            //HK_INS_EIAP_M
                            toAddProduct=tempProduct.product;

                             if(prodSearchUtils._judageProductKey(tempProduct.productId,selectedProductId)){
                                //add product
                                if(productSearchConstants.WPC_PROD_TYPE_CDE_INS==selectedProductId.productTypeCode){
                                    
                                    productList.push(toAddProduct);
                                    reviewMyProductsFormBean.productList=productList;
                                    //handle product to add,
                                    addProductImpl.saveDisscussedProduct(reviewMyProductsFormBean,tempProduct);
                                }
                            }
                        }
                    });

                   
                }else if(requestData.operation=="delete"){
                    //delete product
                    let selectedProductNum=new Array;
                    if(productList){
                        productList.map(function(product,index){
                            if(prodSearchUtils._judageProductKey(product.productId,selectedProductId)){
                                selectedProductNum.push(index);

                            }
                        });
                          if(selectedProductNum.length>0){
                                  let tmpProduct = productList[selectedProductNum[0]];
                                  productList.splice(selectedProductNum[0],1);
                                  reviewMyProductsFormBean.productList=productList;
                                  if(selectedProductNum.length == 1){
                                    addProductImpl.removeDisscussedProduct(reviewMyProductsFormBean,tmpProduct);
                                  }
                            }
                      
                    }
                }
               
            }
            
            console.log("end to add product,product list view bean",reviewMyProductsFormBean.productList);
        }else{
            //show error
            console.log("error");
        }
       
    },
    saveDiscussedProductFacade:(requestData,reviewMyProductsFormBean,searchResultProducts)=>{
        let selectedProductId=requestData.request.productId;
        searchResultProducts.map(function(tempProduct,index){
                        if(tempProduct){
                            if(prodSearchUtils._judageProductKey(tempProduct.productId,selectedProductId)){
                                     //handle product to add,
                                    if(!requestData.request.discussed){
                                        addProductImpl.saveDisscussedProduct(reviewMyProductsFormBean,tempProduct);
                                
                                    }else{
                                        addProductImpl.removeDisscussedProduct(reviewMyProductsFormBean,tempProduct);
                                    }
                                   
                            }
                        }
                    });
    
    },
    saveDisscussedProduct:(reviewMyProductsFormBean,tempProduct)=>{
        console.log("add product to discussed");
        let disscussedMap = reviewMyProductsFormBean.discussedProductMap;
        let prediscussedProductMap = reviewMyProductsFormBean.preDiscussedProductMap;
                                                             
        if(tempProduct && disscussedMap && !prodSearchUtils._judageMapHasProductId(disscussedMap,tempProduct.productId) 
            && !prodSearchUtils._judageMapHasProductId(prediscussedProductMap,tempProduct.productId)){
           
            let alternativeProductAttribute=[];

            let riskAttribute={
                alternativeProductAttributeCode:productSearchConstants.PRODUCT_ALTERNATIVE_ATTRIBUTE_RISK,
                alternativeProductAttributeValue:tempProduct.product.riskLevelCode
            };
            //product name
            let productNameAttribute={
                alternativeProductAttributeCode:productSearchConstants.PRODUCT_ALTERNATIVE_ATTRIBUTE_PRODUCT_NAME,
                alternativeProductAttributeValue:tempProduct.product.productName
            };
            //product type
            let productTypeAttribute={
                alternativeProductAttributeCode:productSearchConstants.PRODUCT_ALTERNATIVE_ATTRIBUTE_PRODUCT_TYPE,
                alternativeProductAttributeValue:tempProduct.product.productTypeCode
            };
            //AMH need to save PRD_LINK_NUM and PRD_HIER_CDE

            alternativeProductAttribute.push(riskAttribute);
            alternativeProductAttribute.push(productNameAttribute);
            alternativeProductAttribute.push(productTypeAttribute);
            disscussedMap.set(tempProduct.productId,alternativeProductAttribute);
            reviewMyProductsFormBean.discussedProductMap=disscussedMap;
        }
        

    },
    removeDisscussedProduct:(reviewMyProductsFormBean,tempProduct)=>{
         console.log("save product to discussed start");
         debugger;
        let disscussedMap = reviewMyProductsFormBean.discussedProductMap;
        let prediscussedProductMap = reviewMyProductsFormBean.preDiscussedProductMap;
        
        if(tempProduct && tempProduct.productId){
            
            let deleteIndicator=false;
            let productId =tempProduct.productId;
             if(!ObjectHelper.isNullOrlengthZore(prediscussedProductMap)){
                 prediscussedProductMap.forEach(function(product,tmpProductId,map){
                    if(!deleteIndicator && prodSearchUtils._judageProductKey(tmpProductId,productId)){
                        deleteIndicator=true;
                        prediscussedProductMap.delete(tmpProductId);
                         reviewMyProductsFormBean.preDiscussedProductMap=prediscussedProductMap;
                        console.log("delete product from disscussedMap end...");
                    }

                

            });
        }
        

            let result=false;
            if(!ObjectHelper.isNullOrlengthZore(disscussedMap)){
                 disscussedMap.forEach(function(product,tmpProductId,map){
                
                    
                    if(!result && prodSearchUtils._judageProductKey(tmpProductId,productId)){
                        result=true;
                        disscussedMap.delete(tmpProductId);
                        reviewMyProductsFormBean.disscussedMap=disscussedMap;
                        console.log("delete product from disscussedMap end...");

                    }

                

            });
            }
           
            
            
            console.log("delete product from disscussedMap end...",reviewMyProductsFormBean.disscussedMap);
            console.log("delete product from PREdisscussedMap end...",reviewMyProductsFormBean.prediscussedProductMap);
            
            
        }
        
   
    }

}

export default addProductImpl;