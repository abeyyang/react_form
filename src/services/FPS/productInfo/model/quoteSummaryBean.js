
 const quoteSummaryBean ={
    

    getQuoteSummaryBean:()=>{
            let QuoteSummary={
                    quoteId:'',
                    currency:'',
                    sumToInsure:'',
                    policyPeriod:'',
                    premium:'',
                    frequency:'',
                    sfpProdCode:'',
                    ipsProdCode:'',
                    proposalData:'',
                    timestamp:''
            };
            return QuoteSummary
    }
 
}

export default quoteSummaryBean;
