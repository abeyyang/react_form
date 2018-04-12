
const productId ={
    

    getProductId:()=>{
        let productId={
                countryProductTradableCode:'',
                productAlternativeNumber:'',
                productCodeAlternativeClassificationCode:'',
                productTypeCode:''
        };
        // quotationInternalReferenceNumber  locale.format(new Date() , {selector: 'date' , datePattern: 'yyyyMMddHHmmss'});

        return productId
    }
 
}

export default productId;
