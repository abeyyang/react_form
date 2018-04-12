import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import StickyHeader from './stickyHeader/StickyHeader';
import ProductTable,{ Column }  from 'common/components/table/ProductsTable';
import DeleteMessage from '../messagePanel';
import InitialAmount from './initialAmount';
import InvestmentCurrency from './investmentCurrency';
import MonthlyAmount from './monthlyAmount';
import ProductCodeName from './prodouctCodeName';
import ProductCurrency from './productCurrency';
import SuitabilityCheck from './SuitabilityCheck';
import RiskRating from './riskRating';
import { FormattedMessage, injectIntl } from "react-intl";
import FormatHelper from 'common/lib/formatHelper'; 

export default class ProductCard extends Component {
    constructor (props) {
        super(props);
        // Constant chang
        this.state = {
            modal:null,
            showReminder:false,
            prodcutData: [
                    [{productCode:"U62459",productName:"AB-American Income Portfolio…",productId:"0"},{value:"HSBC CIT - HSBC asia pacific ex japan eq volatility"},{riskLevel:"3"},{value:"SGD"},{value:"0"},{value:"3000",rowIndex:"0",columnIndex:"5"},{value:"3000",rowIndex:"0",columnIndex:"6"}],
                    [{productCode:"U62459",productName:"AB-American Income Portfolio…",productId:"1"},{value:"Certificates of Deposit"},{riskLevel:"4"},{value:"SGD"},{value:"0"},{value:"3000",rowIndex:"1",columnIndex:"5"},{value:"3000",rowIndex:"1",columnIndex:"6"}],
                    [{productCode:"U62459",productName:"AB-American Income Portfolio…",productId:"2"},{value:"HSBC CIT - HSBC asia pacific ex japan eq volatility"},{riskLevel:"1"},{value:"SGD"},{value:"0"},{value:"3000",rowIndex:"2",columnIndex:"5"},{value:"3000",rowIndex:"2",columnIndex:"6"}],
                    [{productCode:"U62459",productName:"AB-American Income Portfolio…",productId:"3"},{value:"Certificates of Deposit"},{riskLevel:"2"},{value:"SGD"},{value:"0"},{value:"3000",rowIndex:"3",columnIndex:"5"},{value:"3000",rowIndex:"3",columnIndex:"6"}]]
                   
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleShowReminder = this.handleShowReminder.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
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
    //handleChangeAmount
    handleChangeAmount(data){
        this.props.productList.map((rowData,index)=>{
            if(data.rowIndex == index && data.columnIndex == 5)
            rowData.investmentInitialAmount = data.value;
            else if(data.rowIndex == index && data.columnIndex == 6)
            rowData.investmentMonthlyAmount = data.value;
        })
        console.log("this.props.productList",this.props.productList);
    }
    handleShowReminder(){
        let productList = this.props.productList;
        console.log("productList...",productList);
        // let customers = [];
        // let concentrationRisk = [];
        // productList.map((product,index)=>{

        // })
        // const requestParams = {
        //     subserviceId:[{"functionOutputCode": "SAVASTALLC"}],
        //     customers:[{
		//         "countryISOCode": "HK",
        //         "groupMemberCode": "HBAP",
        //         "sourceSystemRolePlayerCode": "CDM",
        //         "rolePlayerIdentificationNumber": "",
        //         "customerAttribute": [{
        //             "attributeKey": "",
        //             "attributeValue": ""
        //         }]
	    //     }],
        //     goalKey:{
        //         "arrangementIdentifierFinancialPlanning": 170128,
		//         "goalSequenceNumber": 86804
        //     },
        //     leadId:{
        //         "leadSourceSystemNumber": ""
        //     },
        //     productList:this.props.productList,
        //     alternativeProduct:[]
        // }
        this.props.record(productList);
        this.getTotalValue();
        this.setState((preState)=>{
            return {
                showReminder:!preState.showReminder};
        })

    }
    componentWillMount(){
        this.getTotalValue();
    }
    //cacl  total amount
    getTotalValue(){
        let dataArr = this.props.productCardList;
        let initialAmountTotalValue = 0,monthlyAmountTotalValue=0;
        dataArr.map((rowData,index)=>{
            initialAmountTotalValue +=Number(rowData[5].value);
            monthlyAmountTotalValue +=Number(rowData[6].value);
        })
        console.log("total amount",initialAmountTotalValue,monthlyAmountTotalValue);
      this.setState({
          initialAmountTotalValue:initialAmountTotalValue,
          monthlyAmountTotalValue:monthlyAmountTotalValue
      })
    }
    //cancel dialog
    handleCancel(){
       this.setState({modal:null})
    }

    //confirm delete data
    handleConfirm(indexid){
        this.setState({modal:null});
        console.log("handleConfirm",indexid);
        this.props.removeConfirmProduct(indexid);
   }
    render () {
        console.log("render data",this.props.productCardList,this.props.productList);
        return (
            <div className={styles.ProdCard}>
                <h3>
                    <span className={styles.title}>Product cart</span>
                    {/*
                    <FontIcon icon="circle-fill-information" className={styles.icon} />*/}
                    <a href="javascript:;" className={styles.dropDown}><FontIcon icon="chevron-down" className={styles.icon} /></a>
                </h3>
            <div className={styles.productCardMain}>
               <h6>
                    <span className={styles.title}>Investment products</span>
                    <FontIcon icon="circle-fill-information" className={styles.icon} />
                </h6>
                <ProductTable 
                    theme={styles} data={this.props.productCardList}
                    rowHeight={100}
                    headerHeight={100}
                    change = {this.handleChangeAmount}
                    remove={this.handleRemove}
                    headerComponent={<StickyHeader/>}>
                    <ProductCodeName/>
                    <SuitabilityCheck/>
                    <RiskRating/>
                    <ProductCurrency />
                    <InvestmentCurrency />
                    <InitialAmount />
                    <MonthlyAmount />
                </ProductTable>
                <div className={styles.totalRow}>
                    <div className={styles.totalText}>  Total</div>
                       <div className={styles.monthlyAmount}>  HKD {this.state.monthlyAmountTotalValue==undefined?'N/A':FormatHelper.addThousandSeparator(this.state.monthlyAmountTotalValue)}</div>
                    <div className={styles.initialAmount}>  HKD {this.state.monthlyAmountTotalValue==undefined?'N/A':FormatHelper.addThousandSeparator(this.state.initialAmountTotalValue)}</div>
                </div> 
                <div className={styles.reviewPlan}>
                    <p className={styles.addition}>
                    <span>Note:</span>The<FontIcon icon="circle-error" className={styles.noteIcon}/> icon beside product risk indicate that this product suitability checks failed.
                    </p>           
                    <div className={styles.button} onClick={this.handleShowReminder}>
                        <a>Review Plan</a>
                    </div>
                </div>
                {this.state.showReminder?
                <div className={styles.reminder}>
                    <div className={styles.tipIcon}><span>!</span></div>
                    <div className={styles.tipContent}>
                        <p><strong>Reminder ( if applicale )</strong></p>
                         <p className={styles.reminderTip}>Your monthly disposable income is less tean or equal to zero. The plan(s) may not be suitable for you based on your finacial circumstances. You are recommended not to apply to a plan if your monthly disposable</p>
                    </div>
                    <div className={styles.tipClose} onClick={this.handleShowReminder}>close</div>
                </div>:null}
            </div>
                {this.state.modal}
            </div> 
        
        );
    }
}

/*<span className={styles.text}>
                                Investment involves risks. Past performance is no guide to future performance of the funds. The value of investments and the income from them can fluctuate and is not guaranteed. Please refer to the offering documents of the respective funds for details, including risk factors. This website has not been reviewed by the Securities and Futures Commission. The information contained on this website is intended for Hong Kong residents only and should not be construed as a distribution, an offer to sell, or a solicitation to buy any securities in any jurisdiction where such activities would be unlawful under the laws of such jurisdiction , in particular the United States of America. You should refer to the website disclaimers for further important details.
The icon besides product risk indicate that this product suitability checks failed. 
                          </span>*/