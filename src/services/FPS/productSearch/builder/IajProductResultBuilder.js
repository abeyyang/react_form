export const IajProductResultBuilder={
    searchProductResult : (response)=>{
        let returnResult = {};
        let result = response.productSearchResult;
        //find product search result count

        let resultInfo = {};
        if(response.productSearchResult != undefined && response.productSearchResult.paginationDetail!= undefined){
            resultInfo['pageNum']=response.productSearchResult.paginationDetail.pageCount;
            resultInfo['totalCount']=response.productSearchResult.paginationDetail.totalNumberOfRecords;
            resultInfo['pageSize']=response.productSearchResult.paginationDetail.numberOfRecords;
        } else{
            resultInfo['pageNum']=1;
            resultInfo['totalCount']=0;
            resultInfo['pageSize']=15;
        }
        
        returnResult['resultInfo'] = resultInfo;
        let products = result.product;
        let productList = [];
        let productData = [];
        products.filter(function(item){
            let data=[];
            let product = {};
            //get productKey
            product['productKey'] = item.productKey.filter(function(record){
                if(record.productCodeAlternativeClassCode == 'M'){
                    return record;
                }
            })[0];
            //get P code for each product
            item.productAttribute.filter(function(attr){
                if(product['attribute'] == undefined){
                    product['attribute'] ={};
                };
                product['attribute'][attr.attributeName] = attr.attributeValue;
            });
            item.productAmount.filter(function(amount){
                if(product['productAmount'] == undefined){
                    product['productAmount'] ={};
                }
                product['productAmount'][amount.key] = amount.amountValue;
                product['productAmount']['currencyCode'] = amount.currencyCode
            });
            product['checked'] = false;
            product['discussed'] = false;
            for(let i = 0;i<10;i++){
                data.push(product);
            };
            productData.push(data);
            productList.push(product);
        });
        returnResult['productData'] = productData;
        returnResult['productList'] = productList;
        console.log('returnResult',returnResult);
        return returnResult;
    }
}