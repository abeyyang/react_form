import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import ProductTable,{ Column }  from 'common/components/table/ProductsTable';
import ProductCodeName from './prodouctCodeName';
import ProductType from './productType';
import SuitabilityCheck from './SuitabilityCheck';
import RiskRating from './riskRating';
import SumInsured from './sumInsured';
import Premium from './premium';
import Frequency from './frequency';
import BudgetFrequency from './budgetFrequency';
import BudgetCurrency from './budgetCurrency';
import BudgetPremium from './budgetPremium';
import StickyHeader from './stickyHeader/StickyHeader';
import { FormattedMessage, injectIntl } from "react-intl";
import FormatHelper from 'common/lib/formatHelper';

export default class SIJProductCard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modal:null,
            showReminder:false 
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleShowReminder = this.handleShowReminder.bind(this);
        this.reviewPlan = this.reviewPlan.bind(this);
        this.confirmQuoteOverlay  =this.confirmQuoteOverlay.bind(this);
        this.cancelQuoteOvleray  =this.cancelQuoteOvleray.bind(this);
        this.loadingGetQuote=this.loadingGetQuote.bind(this);
        this.updateGetQuoteForm=this.updateGetQuoteForm.bind(this);
        
    }
    handleRemove(id){
        console.log("handle remove card",id);
         const params={
                cancel:this.handleCancel,
                confirm:this.handleConfirm,
                indexid:id
            }
        const modal = (<DeleteMessage {...params}/>);
        this.setState({modal});
       
    }
    handleCancel(){
       this.setState({modal:null})
    }
    //confirm delete data
    handleConfirm(indexid){
        this.setState({modal:null});
         console.log("handleConfirm",indexid);
        let dataArr = this.state.prodcutData;
        dataArr.map((rowData,index)=>{
            rowData.map((t,key)=>{
                if(t.hasOwnProperty("productId") && t.productId == indexid){
                    console.log("rowIndex",t.hasOwnProperty("productId"),index);
                    let spliceArr = dataArr.splice(index,1);
                    this.setState({
                        prodcutData:dataArr
                    });
                }
            })
        })
        this.getTotalValue();
   }
    handleShowReminder(){
        this.setState((preState)=>{
            return {
                showReminder:!preState.showReminder};
        })
    }
    reviewPlan(){
        let request ={
            goalKey: {
		        "planId": '',
		        "goalId": ''
	            },
            messageId:'reviewInvestments',
        };
        this.props.reviewInvestments(request);
    }
    cancelQuoteOvleray(){
        console.log('cancelQuoteOvleray...');
    }
    confirmQuoteOverlay(){
         
         console.log('confirmQuoteOverlay...');
         let params={}
         this.props.getOrUpdateQuote(params);
    }
    loadingGetQuote(params){
        
        this.props.onClickGetQuoteOverlay(params);
    }
    updateGetQuoteForm(params){
        this.props.updateGetQuoteForm(params);
    }
    render () {
       console.log("insProductCardList..",this.props);
        return (
           <div className={styles.productCardMain}>
               <h6>
                    <span className={styles.title}>Insurance products</span>
                    <FontIcon icon="circle-fill-information" className={styles.icon} />
               </h6>
                <ProductTable 
                            theme={styles} data={this.props.insProductCardList}
                            rowHeight={100}
                            headerHeight={100}
                            remove={this.handleRemove}
                            headerComponent={<StickyHeader/>}>
                            <ProductCodeName/>
                            <ProductType/>
                            <SuitabilityCheck/>
                            <RiskRating/>
                            <SumInsured/>
                            <Premium cancelQuoteOvleray={this.cancelQuoteOvleray} confirmQuoteOverlay={this.confirmQuoteOverlay} loadingGetQuote={this.loadingGetQuote} getQuoteData={this.props.getQuoteData} updateGetQuoteForm={this.updateGetQuoteForm}/>
                            <Frequency/>
                            <BudgetFrequency/>
                            <BudgetCurrency/>
                            <BudgetPremium/>
                        </ProductTable>       
                <div className={styles.button} onClick={this.handleShowReminder}>
                    <a onClick={this.reviewPlan}>Review Plan</a>
                </div>
            </div> 
        
        );
    }
}

/*<span className={styles.text}>
                                Investment involves risks. Past performance is no guide to future performance of the funds. The value of investments and the income from them can fluctuate and is not guaranteed. Please refer to the offering documents of the respective funds for details, including risk factors. This website has not been reviewed by the Securities and Futures Commission. The information contained on this website is intended for Hong Kong residents only and should not be construed as a distribution, an offer to sell, or a solicitation to buy any securities in any jurisdiction where such activities would be unlawful under the laws of such jurisdiction , in particular the United States of America. You should refer to the website disclaimers for further important details.
The icon besides product risk indicate that this product suitability checks failed. 
                          </span>*/