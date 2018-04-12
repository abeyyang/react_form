import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import ProductCard from '../productCardPanel';
import SoultionAlternatives from '../solutionAlternativesPanel';
import CustomerDedaration from  '../customerDedarationPanel';
import withLoadingScreenBeforeReadyToLeave
    from '../../../../../common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import { browserHistory } from 'react-router';
import {alternativeProductType,alternativeProductRiskLevel} from 'config/investmentConfig'


class productSummaryPanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
           isShow:false,
           bgStyle:{
               backgroundColor:'#999',
               cursor: 'auto'
           }
        };
           this.show = this.show.bind(this);
           this.goToDashboardPageHandle = this.goToDashboardPageHandle.bind(this);
        //    this.goToMeetingSummary = this.goToMeetingSummary.bind(this);
    }
    show () {
        this.setState((preState, props) => {
            return { isShow:!preState.isShow };
        });
    }
    handleMoreProduct(){
        let params = {
            alternativeProductList:this.props.alternativeProductList
        }
        this.props.addMoreProduct(params);
    }
    handleRemoveProduct(rowIndex){
        console.log("handleRemoveProduct",rowIndex);
        let params = {
            rowIndex,
            alternativeProductList:this.props.alternativeProductList
        }
        this.props.removeProduct(params);
    }

    handleRemoveInvProduct(rowIndex){
        console.log("handleRemoveProduct inv",rowIndex);
        let params = {
            rowIndex,
            productCardList:this.props.productCardList
        }
        this.props.removeInvProduct(params);
    }
    initGoalSummary(){
        let request={
            messageId:'retrieveGoalSolutionDetail'
        }
        this.props.getPreviewProductData(request);
    }
    handleReviewInv(){
        this.props.recordSolutionDetail();
    }
    componentWillMount(){
        this.initGoalSummary();
    }
    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps',nextProps)
        if(nextProps.recordSuccessFlag == "SAVCOMPLET"){
           const target = '/group-sfp-war/main/en-gb/meetingSummary';
            browserHistory.push(target);
        }
    }
    goToDashboardPageHandle(){
        console.log('test');
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
        //browserHistory.push(target)
    }
    handleFinaliseRecord(){
       if(this.state.bgStyle.backgroundColor == '#999')return;
       let moreProducts = this.props.moreProducts;
       let discussedProductList= this.props.alternativeProductList;
       //deep copy
       let alternativeProductList = JSON.parse(JSON.stringify(discussedProductList));
    // let alternativeProductList = Object.assign([],discussedProductList);
    // let alternativeProductList  = discussedProductList.splice(0,discussedProductList.length);
       console.log("222",moreProducts);
       let moreProductsArr = [];
       if(moreProducts!=undefined){
        for(let i = 0;i < moreProducts.length;i++){
                let rowIndex = moreProducts[i].rowIndex;
                alternativeProductList.map((prod,index)=>{
                    let rowArr = [];
                    prod.map((rData,rIndex)=>{
                        if(rData.rowIndex == rowIndex ) 
                        rowArr.push(rData);
                        if(rData.alternativeProductAttributeCode == moreProducts[i].alternativeProductAttributeCode 
                        && rData.rowIndex == rowIndex)
                        rData.alternativeProductAttributeValue = moreProducts[i].alternativeProductAttributeValue;
                    })
                    if(rowArr.length !=0 ) moreProductsArr.push(rowArr);
            })
        }
       }
      console.log('test',moreProductsArr);
      this.props.resParams.subserviceId = 'SAVCOMPLET';
      this.props.recordFinaliseGoalDetail(this.props.resParams);
    }
    handleRecord(params){
        let resParams =  this.props.resParams;
        resParams.subserviceId = 'SAVASTALLC';
        resParams.assetsHolding = this.props.assetsHolding;
        // resParams.productList = params;
        console.log("reivew record",resParams,params);
        this.setState({
            bgStyle:{
                backgroundColor:'#d80a1e',
                cursor:'pointer'
            }
        })
        this.props.recordSolutionDetail(this.props.resParams);
    }
    handleSaveDiscussedProduct(data){
        this.props.saveMoreDiscussedProductToState(data);
    }
    render () {
      const isShow = this.state.isShow;
      console.log("alternativeProductList...",this.props);
        return (
     <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.productSummaryPage}>
                        <h4>
                            <span className={styles.title}>Product Summary</span>
                        </h4>
                        <p className={styles.nowyouneed}>Now you need to specify how much money you want to allocate into each product. If you’ve selected more than one product,     you’ll need to split the amount(s) between them.
                            When you are happy with your money allocation, click “Finalise your plan”.</p>
                       {/*Alternatives Discussed Component*/}
                        <SoultionAlternatives handleSaveDiscussedProduct = {this.handleSaveDiscussedProduct.bind(this)} alternativeProductList = {this.props.alternativeProductList} addMoreProduct ={this.handleMoreProduct.bind(this)} removeConfirmProduct = {this.handleRemoveProduct.bind(this)}/>  
                        {/*Product cart */}
                        <ProductCard productCardList = {this.props.productCardList} productList = {this.props.productList} record = {this.handleRecord.bind(this)} reviewInv={this.handleReviewInv.bind(this)} removeConfirmProduct={this.handleRemoveInvProduct.bind(this)}/>
                        {/*Customer Declarations*/}
                        <CustomerDedaration validationDetails = {this.props.validationDetails}/>
                        <div className={styles.back}><a href="javascript:;" onClick={this.goToDashboardPageHandle}><FontIcon icon="chevron-left" className={styles.icon} />Back to product selection</a></div>
                        <div className={styles.button}>
                        <a href="javascript:;" className={styles.save}>Save progress</a>
                        <a href="javascript:;" onClick={this.handleFinaliseRecord.bind(this)} className={styles.finalise} style={this.state.bgStyle}>Finalise your plan</a>
                        </div>
                        <div className={styles.decalration}><span>Disclaimer & declarations</span><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withLoadingScreenBeforeReadyToLeave(injectIntl(productSummaryPanel))