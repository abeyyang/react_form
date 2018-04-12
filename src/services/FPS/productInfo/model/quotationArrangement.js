
 const quotationArrangement ={
    

    getQuotationArrangement:()=>{
            let quotationArrangement={
                quotationValidToDateTime:'',
                productQuotationAmount:[],
                quotationLocalFields:[]
            };
            // quotationInternalReferenceNumber  locale.format(new Date() , {selector: 'date' , datePattern: 'yyyyMMddHHmmss'});

        return quotationArrangement;
    }
 
}

export default quotationArrangement;
