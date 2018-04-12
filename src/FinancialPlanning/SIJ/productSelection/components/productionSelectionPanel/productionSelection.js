import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Tooltip from 'wealth/lib/web/components/widgets/tooltip';

import styles from './style.scss';
import PageButtonGroup from 'wealth/lib/web/components/widgets/PageButtonGroup';
import Pagination from 'wealth/lib/web/components/widgets/Pagination';
import { browserHistory } from 'react-router';
import SIJGoalDetail from '../../../common/components/SIJGoalDetail';
import SIJSteptracker from '../../../common/components/SIJSteptracker';
import ProductTableComponent from './productTable/productTable_cpn';
import Modal from 'common/components/trading/Modal';
import Popup from 'wealth/lib/web/components/widgets/popup';
import popupStyle from './popup.scss';
import toolStyles from './toolStyle.scss';
//import {productSearchConstants} from '../../../../../config/goalSolution/productSearchConstants';

export default class ProductionSelection extends Component {
    constructor (props) {
        super(props);
        this.state = {
            goalSolutionDetail: {
                financialGoal:{
                    goalCompletionDateTime: null,
                    goalDescription: "",
                    goalMonthCount: 12,
                    goalObjectiveTypeCode: "",
                    goalTargetAmount: null,
                    goalTargetCurrencyCode: "",
                    goalTypeCode: "",
                    jurisdictionType: null,
                    needTypeCode: "",
                    periodicityGoalCode: null,
                    recordCreateDateTime: null,
                    recordUpdateDateTime: "",
                    skipRiskProfilingIndicator: ""
                },
                riskProfile: {
                        riskCapacityAssignDate: null,
                        riskCapacityLevelNumber: null,
                        riskCapacityRecommendLevelNumber: null,
                        riskToleranceLevelNumber: null
                }
            },
            productSearchResult : {
                retrieveProductSearchInsuranceListData:[]
            },
            showHideInd:{
                productSelectionToolTipInd: false,
                editGoalNameBarInd: false,
                productDisclaimerInd:false,
                produtReviewInd:false,
                productTagInd:false
            },
            dataIndex:0,
            showSearchResult:"block",
            data:[],
            goProductSummaryFlag:false
        };
        //this.show = this.show.bind(this);
        this.goToInsProdSummary = this.goToInsProdSummary.bind(this);
        this.goToNeedAnalysis = this.goToNeedAnalysis.bind(this);
        this.renderSIJPS = this.renderSIJPS.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.triggerEligibilityOverlay = this.triggerEligibilityOverlay.bind(this);
        this.confirmSIJOverlay = this.confirmSIJOverlay.bind(this);
        this.cancelSIJOverlay = this.cancelSIJOverlay.bind(this);
        this.handleDiscussedProduct = this.handleDiscussedProduct.bind(this);
    }
    componentWillMount(){
        this.renderSIJPS();
    }
    
    renderSIJPS (){
        console.log("sij ps retrieve goal detail in componment...");
        console.log("this.props",this.props);
       
        let goalKey={
            goalId:"",
            planId:""
        }
        let params={
              goalKey,
              messageId:'retrieveGoalSolutionDetail',
        }
         console.log("request in ctn,",params);
        this.props.renderSIJPS(params);

    }
    componentWillReceiveProps(nextProps) {
        
       
        if(nextProps.goProductSummaryFlag && nextProps.goProductSummaryFlag==true){
            const target ='/group-sfp-war/main/en-gb/insProdSummary';
            browserHistory.push(target);
        }

        console.log("ps ctn in productSelection ctn componentWillReceiveProps,",nextProps);
        this.setState({
             goalSolutionDetail: nextProps.goalSolutionDetail,
             productSearchResult: {
                retrieveProductSearchInsuranceListData:{
                    searchResultProducts:nextProps.productSearchResult.retrieveProductSearchInsuranceListData.searchResultProducts,
                    searchResultProductsForTable:nextProps.productSearchResult.retrieveProductSearchInsuranceListData.searchResultProductsForTable
                },
                reviewMyProductsFormBean:nextProps.productSearchResult.reviewMyProductsFormBean
             },
             
             showHideInd:{
                productSelectionToolTipInd: false,
                editGoalNameBarInd: false,
                productDisclaimerInd:false,
                produtReviewInd:false,
                productTagInd:false
            },
            dataIndex:0,
            showSearchResult:"block",
            data:nextProps.productSearchResult.retrieveProductSearchInsuranceListData.searchResultProductsForTable          
    });
        console.log("ps ctn in productSelection ctn, this .state",this.state);
        console.log("ps ctn in productSelection ctn, this .props",this.props);
    }
    show (currentType,event) {
        this.setState((preState, props) => {
            preState.showHideInd[""+currentType+""]=!preState.showHideInd[""+currentType+""];
            return preState;
        });
    }

    goToInsProdSummary(){
        
        this.props.reviewInsProduct();
    }
    goToNeedAnalysis(){
        const target ='/group-sfp-war/main/en-gb/insJourney';
        browserHistory.push(target);
    }
    
    retrieveGoalSolutionDetailforSIJPS (){
        
    }
    addProduct(productData){
        
        this.props.addOrDeleteInsProduct(productData);
    }

    triggerEligibilityOverlay (){

    }
    confirmSIJOverlay(){
        console.log("this.refs.popupSIJ",this.refs.popupSIJ);
        (this.refs.popupSIJ && this.refs.popupSIJ.hide) ?this.refs.popupSIJ.hide():"";
       
       
    }
    cancelSIJOverlay(){
        console.log("this.refs.popupSIJ",this.refs.popupSIJ);
        (this.refs.popupSIJ && this.refs.popupSIJ.hide) ?this.refs.popupSIJ.hide():"";
    }

    reviewMyproduct(data){
        this.props.reviewInsProduct(data);
    }
    handleDiscussedProduct(data){
        console.log("add or delete discussed product...",data);
        this.props.addOrDeleteDiscussedInsProduct(data);
    }

    render () {
       
        const productSelectionToolTipInd =this.state.showHideInd.productSelectionToolTipInd;
        const productDisclaimerInd =this.state.showHideInd.productDisclaimerInd;
        
        const productSearchResultList = this.state.data?this.state.data:[];
        const reviewMyProductsFormBean = this.state.productSearchResult.reviewMyProductsFormBean;
        const selectedProductList =(reviewMyProductsFormBean && reviewMyProductsFormBean.productList)?reviewMyProductsFormBean.productList:[];
        return (
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.knowledgeExperiencePage}>
                        <SIJSteptracker />
                        
                        <SIJGoalDetail goalInfo ={this.state.goalSolutionDetail}/>
                       
                        <h4>
                            <span className={styles.title} onClick={this.show.bind(this,'productSelectionToolTipInd')}>Production selection</span>
                            {/*<FontIcon icon="circle-help-solid" className={styles.icon} />*/}
                            { productSelectionToolTipInd ? <div className={styles.knowledgeHide}>
                                <p className={styles.link} />
                                <p className={styles.link1} />
                                <div className={styles.knowledgeOverlay}>
                                    <div className={styles.knowledgeText}>
                                        <p>Please indicate your level of knowledge and experience with below product categories.
                                        This will facilitate us to consider with you suitable investment & insurance products.</p>
                                    </div>
                                </div>
                            </div> : null
                            }
                        </h4>
                        <h5>
                            <div className={styles.productCountNumber}>
                                <span className={styles.title}>{this.state.data?this.state.data.length:0}</span> products found
                            </div>
                            <div className={styles.productStaffEligibility}>
                                <ul>
                                    <li ><FontIcon icon="circle-delete" className={styles.productStaffIcon}/>Staff ineligibility (^) Product that may not fit customer.</li>
                                    <li ><FontIcon icon="circle-info" className={styles.productExceptionIcon}/>Unknown exception found - Check product suitability accordingly</li>
                                </ul>
                            </div>
                            {/*<div className={styles.productTabLabel}>
                                <span className={styles.right1}>Tag labels</span>
                                <input type="radio" name="buttonOnIcon" className={styles.buttonOnIcon} />
                                <label>
                                    <span>
                                        On
                                    </span>
                                </label>
                                <input type="radio" name="buttonOnIcon" className={styles.buttonOffIcon} />
                                <label>
                                    <span>
                                        Off
                                    </span>
                                </label>
                            </div>*/}
                        </h5>

                         <div className={styles.knowMain}>
                           
                             <ProductTableComponent data={productSearchResultList} dataIndex={this.state.dataIndex} add={this.addProduct.bind(this)} change={this.handleDiscussedProduct.bind(this)} show={this.state.showSearchResult}/>
                             
                            <Popup hideOnOverlayClick theme={popupStyle} popupRef="sijPS" ref="popupSIJ" >
                    
                                <div className={styles.modalBoday}>
                                        <div>
                                            <div className={styles.content}>You are about to remove this product.<br/>Are you sure want to do this?</div>
                                            <strong>You will be returned to the product selections for your goal.</strong>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className={styles.btnArea}>
                                        <a  className={styles.cancelBtn}  onClick={this.confirmSIJOverlay}>Cancel</a> 
                                        <a  className={styles.subBtn}  onClick={this.confirmSIJOverlay}>confirm</a> 
                                    </div> 
                            
                        </Popup>
                        </div>
                        <div className={classNames(styles.footerSave, styles.clearfix)}>
                                <div className={styles.overflowHidden}>
                                    <div className={styles.back}><a href="javascript:;" onClick={this.goToNeedAnalysis}>
                                            <FontIcon icon="chevron-left-small" className={styles.icon} />Back to need analysis</a>
                                    </div>
                                    <div className={styles.button}>
                                         {selectedProductList && selectedProductList.length!=0 ?
                                            <a href="javascript:;" className={styles.review}  onClick={this.goToInsProdSummary} data-tooltipRef="handler-reviewMyProduct">Review product</a>
                                            : <a href="javascript:;" className={styles.forbidden} data-tooltipRef="handler-reviewMyProduct" >Review product</a>
                                         }
                                        
                                         {/*<a href="javascript:;" data-popupRef="sijPS" className={styles.forbidden} >Trigger Overlay</a>*/}
                                          <div>
                                              
                                          <Tooltip tooltipRef="handler-reviewMyProduct" theme={toolStyles} place="top">
                                              
                                                {selectedProductList && selectedProductList.length!=0 ?
                                                <div >
                                                    <h6>Product(s) in your plan</h6>
                                                    <ul>
                                                       {selectedProductList.map(function(tmp, index){
                                                             return (
                                                                    <li>
                                                                        <p>{tmp.productName}</p>
                                                                        <p>#{tmp.productId.productAlternativeNumber}</p>
                                                                    </li>
                                                                )
                                                        })}
                                    
                                                    </ul>
                                                </div>
                                                :null
                                                }

                                          </Tooltip>
                                          </div>
                                    </div>
                                </div>

                                <div className={classNames(styles.disclaimer, styles.clearfix)}>
                                        <p className={styles.pointer} onClick={this.show.bind(this,'productDisclaimerInd')}>Disclaimer & declarations
                                        
                                        <FontIcon icon= {productDisclaimerInd ?"chevron-up-small":"chevron-down-small"} className={styles.chevron} /></p>   
                                      
                                    {productDisclaimerInd ?
                                        (<div>
                                            <p className={styles.declareDetail}>
                                                Lorern ipsum dolor sit amet, consectetur adipiscing elit. Phasellus metus nisi, gravida vita gravida non, efficitur et sem. Nam 
                                                congue turpis ut scelerisque fermentum. Vestibulum id pretium nisi, rhoncus aliquet felis. Vestibulum felis leo, porta eget felis eu, laoreet 
                                                faucibus arcu. Ut ac sollicitudin sapien. Nulla ullamcorper sagittis risus eu molestie. Fusce finibus nibh sit amet erat interdum, sit amet dapieus 
                                                est aliquet. Nunc imperdiet ante quis lorem iaculis consequat. Proin at maximus felis. Vestibulum sed diam in eros sollicitudin fringilla consectetur in
                                                neque.
                                            </p>
                                            <br/>
                                            <p className={styles.declareDetail}>
                                                Nullam volutpat ullamcorper fermentum. Fusce pretium arcu leo, non dignissim odio ullamcorper eu. Praesent euismod
                                                nec nisi ac ultricies. Maecenas semper, sem vel Vestibulum consectetur, tellus ex vulputate ante, vel ullamcorper dolor 
                                                nunc sed ligula. Etiam id ligula quis arcu luctus suscipit eu a quam. Sed lectus ipsum, finibus id nisl sit amet, molesite 
                                                vehicula leo. Sed sit amet ultricies magna. 
                                            </p>
                                            <br/>
                                        </div>) : null
                                    }
                                </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        );
    }
}
