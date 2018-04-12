import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import { browserHistory } from 'react-router';
import ProductCard from '../productCardPanel';
import SoultionAlternatives from '../solutionAlternativesPanel';
import CustomerDedaration from  '../customerDedarationPanel';
import withLoadingScreenBeforeReadyToLeave
    from '../../../../../common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import UIStyles from "common/styles/ui.scss";
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form';


class productSummaryPanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
           isShow:false
        };
        //    this.show = this.show.bind(this);
        this.goToDashboardPageHandle = this.goToDashboardPageHandle.bind(this);
        this.finalise = this.finalise.bind(this);
        this.goToDashboardPageHandle = this.goToDashboardPageHandle.bind(this);
        this.onClickGetQuoteOverlay=this.onClickGetQuoteOverlay.bind(this);
        this.updateGetQuoteForm=this.updateGetQuoteForm.bind(this);
    }
    componentWillMount(){
        this.initGoalSummary();
    }
    initGoalSummary(){
        let request={
            goalKey: {
                planId:30050,
                goalId:1090
            },
            messageId:'retrieveGoalSolutionDetail',
        }
        this.props.retrieveGoalSolutionDetail(request);
    }
    show () {
        this.setState((preState, props) => {
            return { isShow:!preState.isShow };
        });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.goalSolutionDetailData.goMeetingSummaryFlag){
            const target = '/group-sfp-war/main/en-gb/meetingSummary';
            browserHistory.push(target);
        }
    }
    goToDashboardPageHandle(){
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
        browserHistory.push(target)
    }
    handleReviewInv(){
        //this.props.recordSolutionDetail();
    }
    finalise(){
         let request={
            goalKey: {
		        "planId": '',
		        "goalId": ''
	            },
            messageId:'recordGoalSolutionDetail'
        }
        this.props.recordGoalSolutionDetail(request);
    }
    onClickGetQuoteOverlay(index){
        debugger;
        console.log('data row ..',index)
        let params={};
        let insProductCard=this.props.goalSolutionDetailData.insProductCardList[index];
        params={
            insProductCard:insProductCard
        }
        this.props.loadingGetQuoteOverlay(params);
    }
    updateGetQuoteForm(params){
         debugger;
         console.log('updateGetQuoteForm...',params);
         this.props.updateGetQuoteDataForm(params);
    }
    handleMoreProduct(){
        let params = {
            alternativeProductList:this.props.goalSolutionDetailData.alternativeProductList
        }
        this.props.addMoreDiscussProd(params);
    }
    handleRemoveProduct(rowIndex){
        console.log("handleRemoveProduct",rowIndex);
        let params = {
            rowIndex,
            alternativeProductList:this.props.goalSolutionDetailData.alternativeProductList
        }
        this.props.removeDiscussProd(params);
    }
    handleRemoveInsProduct(rowIndex){
        let params = {
            rowIndex,
            alternativeProductList:this.props.goalSolutionDetailData.alternativeProductList
        }
        this.props.removeProduct(params);
    }
    handleSaveDiscussedProduct(data){
        this.props.saveMoreDiscussedProductToState(data);
    }
    render () {
        
      const isShow = this.state.isShow;
      console.log('goalSolutionDetailData...',this.props.goalSolutionDetailData)
        return (
     <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.productSummaryPage}>
                        <h4>
                            <span className={styles.title}>Product Summary</span>
                        </h4>
                            <h3>
                                <span className={styles.title}>Product cart</span>
                                <a href="javascript:;" className={styles.dropDown}><FontIcon icon="chevron-down" className={styles.icon} /></a>
                            </h3>
                           
                            <ProductCard insProductCardList={this.props.goalSolutionDetailData.insProductCardList}  
                            onClickGetQuoteOverlay={this.onClickGetQuoteOverlay}  
                            getQuoteData={this.props.goalSolutionDetailData.getQuoteData==undefined ? {}:this.props.goalSolutionDetailData.getQuoteData} 
                            updateGetQuoteForm={this.updateGetQuoteForm}
                            reviewInv={this.handleReviewInv.bind(this)} 
                            removeConfirmProduct={this.handleRemoveInsProduct.bind(this)}
                            />
                            
                             <h3>
                                <span className={styles.title}>Solution and Alternatives Discussed</span>
                                <a href="javascript:;" className={styles.dropDown}><FontIcon icon="chevron-down" className={styles.icon} /></a>
                            </h3>

                            <SoultionAlternatives alternativeProductList={this.props.goalSolutionDetailData.alternativeProductList} 
                                handleSaveDiscussedProduct = {this.handleSaveDiscussedProduct.bind(this)}
                                addMoreProduct ={this.handleMoreProduct.bind(this)}
                                removeConfirmProduct = {this.handleRemoveProduct.bind(this)}
                            /> 

                            <CustomerDedaration customerDeclaration = {this.props.customerDeclaration} updateFormData = {this.props.updateFormData.bind(this)}/>
                            <div className={styles.back}><a href="javascript:;" onClick={this.goToDashboardPageHandle}><FontIcon icon="chevron-left" className={styles.icon} />Back to product selection</a></div>
                            <div className={styles.button}>
                            <a href="javascript:;" onClick={this.finalise} className={styles.finalise}>Finalise your plan</a>
                            </div>
                            <div className={styles.decalration}><span>Disclaimer & declarations</span><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withLoadingScreenBeforeReadyToLeave(injectIntl(productSummaryPanel))