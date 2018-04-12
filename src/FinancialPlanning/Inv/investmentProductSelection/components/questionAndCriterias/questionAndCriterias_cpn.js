import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import criteriaConstant from 'services/FPS/productSearch/constant/criteriaConstant';
import { AmountDisplay, Textarea, Dropdown, DropdownItem, YesNoButton, ScrollTab, Checkbox, MultiSelect, AmountInput, RadioButton } from 'CommonUI/Form'
import CriteriaSelector from './criteriaSelector';
import CriteriaSelectorInput from './criteriaSelectorInput';
import { browserHistory } from 'react-router';
import withLoadingScreenBeforeReadyToLeave
    from 'common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import UIStyles from 'common/styles/ui.scss'

class QuestionsAndCriteriasComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
             showAllCollsapsPanel:true,
             showQuestionPanel:true,
             showProductCriteriasPanel:true,
             //for advance criterias show
             showAllCriterias:false,
             //for multiple select show and hide
             activeSelect:"",
             isLoading:false
             
        }
        this.addProductCode = this.addProductCode.bind(this);
        this.changeProductCode = this.changeProductCode.bind(this);
        this.searchProduct = this.searchProduct.bind(this);
        this.dropDownChange = this.dropDownChange.bind(this);
        this.CheckIndicator = this.CheckIndicator.bind(this);
        this.dropDownCriteriasChange = this.dropDownCriteriasChange.bind(this);
        this.multipleDropdownCriteriasChange = this.multipleDropdownCriteriasChange.bind(this);
        this.CheckCriteriaIndicator = this.CheckCriteriaIndicator.bind(this);
        this.changeProductName = this.changeProductName.bind(this);
    }

    //page control

    proudctTypeHandler(requestCriterias,productTypeKey){
         let proudctTypeArray =  requestCriterias[productTypeKey];
         let defaultProductType = [];
         let selectedProductType;
         defaultProductType = criteriaConstant.productType.filter(function(item){
                if(item.value == "UT"){
                    return item;
                }  
         });
         if(proudctTypeArray == undefined){
           return defaultProductType;
         }else{   
              let allValues = [];     
              for(let i=0;i<proudctTypeArray.length; i++){
                   allValues.push(proudctTypeArray[i].value);
              }
              if(allValues.includes("UT")){
                  return defaultProductType;
              }else{
                  return proudctTypeArray;
              }
         
        }   
    }

    toggleShowCollapse(){
        this.setState((preState)=>{
            return {
                showProductCriteriasPanel:!preState.showAllCollsapsPanel,
                showQuestionPanel:!preState.showAllCollsapsPanel,
                showAllCollsapsPanel:(this.state.showProductCriteriasPanel||this.state.showQuestionPanel)&&preState.showAllCollsapsPanel?false:true
            }
        })
    }

    handleInvestmentQuestion(){
        this.setState((preState)=>{
            return {showQuestionPanel:!preState.showQuestionPanel}
        })
        if(!this.state.showQuestionPanel&&this.state.showProductCriteriasPanel){
            this.setState({
                showAllCollsapsPanel:true
            })
        }else if(this.state.showQuestionPanel&&!this.state.showProductCriteriasPanel){
             this.setState({
                showAllCollsapsPanel:false
            })
        }
    }

    //handle active select window
    handleActiveSelect(selectId,event){
        let activeSelect = this.state.activeSelect;
        if(activeSelect == selectId){
            activeSelect = "";
        } else {
            activeSelect = selectId;
        }
        this.setState({
            activeSelect:activeSelect
        })
    }

   handleAllCriterias(){
        this.setState((preState)=>{
            return {showAllCriterias:!preState.showAllCriterias}
        })
    }

    toggleProductCirterias(){
        this.setState((preState)=>{
            return {showProductCriteriasPanel:!preState.showProductCriteriasPanel}
        })
        if(this.state.showQuestionPanel&&!this.state.showProductCriteriasPanel){
            this.setState({
                showAllCollsapsPanel:true
            })
        }else if(!this.state.showQuestionPanel&&this.state.showProductCriteriasPanel){
             this.setState({
                showAllCollsapsPanel:false
            })
        }
    }

    //--------------------- new

    searchProduct(){
        let request = {};
        request.requestPIQAnswer = this.props.requestPIQAnswer;
        request.requestCriterias = this.props.requestCriterias;
        request.productCode = this.props.productCode;
        this.props.searchProduct(request);
        let layoutRequest = {
            productSearch:"block",
            shortCriteria:"block",
            seachCriteria:"none"
        }
        this.props.updateLayoutStaus(layoutRequest);
    }

    dropDownChange(selectedObj,index){
        let requestPIQAnswer = this.props.requestPIQAnswer;
        if(requestPIQAnswer == undefined){
            requestPIQAnswer = {};
        }
        requestPIQAnswer[selectedObj.id] = selectedObj.value;
        this.props.updatePIQAnswers(requestPIQAnswer);
        //console.log(selectedObj);
    }
    CheckIndicator(event,isChecked,index){
        let requestPIQAnswer = this.props.requestPIQAnswer;
        if(requestPIQAnswer == undefined){
            requestPIQAnswer = {};
        }
        if(isChecked){
            requestPIQAnswer[event.target.id] = 'Y';
        }else{
            requestPIQAnswer[event.target.id] = 'N';
        }
        this.props.updatePIQAnswers(requestPIQAnswer);
    }
    CheckCriteriaIndicator(event,isChecked,index){
        let requestCriterias = this.props.requestCriterias;
        if(isChecked){
            requestCriterias[event.target.id] = 'Y';
        }else{
            requestCriterias[event.target.id] = 'N';
        }
        this.props.updateCriteria(requestCriterias);
    }
    multipleDropdownCriteriasChange(selectedOption) {
        let requestCriterias = this.props.requestCriterias;
        if(selectedOption.isChecked){
            if(requestCriterias[selectedOption.id] == undefined){
                requestCriterias[selectedOption.id]=[];
            }
            requestCriterias[selectedOption.id].push(selectedOption);
        } else {
            if(requestCriterias[selectedOption.id] == undefined){
                requestCriterias[selectedOption.id] = [];
            }
            requestCriterias = requestCriterias[selectedOption.id].filter(function(item){
                if(item.value != selectedOption.value){
                    return item;
                }
            });
        }
        this.props.updateCriteria(requestCriterias);
        //console.log("++++Test: multipleDropdownCriteriasChange ", selectedOption);
    }
    dropDownCriteriasChange(selectedObj,index){
        console.log(selectedObj);
        let requestCriterias = this.props.requestCriterias;
        if(requestCriterias == undefined){
            requestCriterias = {};
        }
        requestCriterias[selectedObj.id] = selectedObj.value;
        this.props.updateCriteria(requestCriterias);
        //console.log(selectedObj);
    }

    //add product code list to 5 length
    addProductCode(){
        console.log(this.props.productCode.length);
        if(this.props.productCode.length == 5){
            let productCode = this.props.productCode;
            //var index = 0;
            let productCodeNew = productCode.filter(function(item,index){
                console.log('index',index);
                if(index ==0) {
                    console.log('index in',index);
                    return item;
                }
            })
            console.log('productCode',productCodeNew);
            this.props.updateProductCode(productCodeNew);
        }else {
            let value = this.props.productCode[0].value;
            let productCode = [];
            for(let i = 0;i<5;i++){
                let productCodeItem = {};
                let id = 'productCode'+i;
                if(i==0){
                    productCodeItem['id'] = id;
                    productCodeItem['value'] = value;
                } else {
                    productCodeItem['id'] = id;
                    productCodeItem['value'] = "";
                }
                productCode.push(productCodeItem);
            };
            this.props.updateProductCode(productCode);
        }
    }

    //changeProductCode for each product code
    changeProductCode(event){
        let productCode = this.props.productCode.filter(function(item){
            if(item.id == event.target.id){
                item.value = event.target.value;
            }
            return item;
        });
        this.props.updateProductCode(productCode);
    }
    //change product name
    changeProductName(event){
        let requestCriterias = this.props.requestCriterias;
        requestCriterias[event.target.id] = event.target.value;
        this.props.updateCriteria(requestCriterias);
    }
    render () {
        //this one should be below risk level
        const riskLevelDropData = [
            {
                id:"RISKCP",
                value: '1',
                displayValue: 'Secure'
            },{
                id:"RISKCP",
                value: '2',
                displayValue: 'Very Cautious'
            },{
                id:"RISKCP",
                value: '3',
                displayValue: 'Cautious'
            },{
                id:"RISKCP",
                value: '4',
                displayValue: 'Balanced'
            },{
                id:"RISKCP",
                value: '5',
                displayValue: 'Adventurous'
            }
        ];
        const rtqDropData = [
            {
                id:"RISK_LVL_CDE",
                value: '1',
                displayValue: 'Secure'
            },{
                id:"RISK_LVL_CDE",
                value: '2',
                displayValue: 'Very Cautious'
            },{
                id:"RISK_LVL_CDE",
                value: '3',
                displayValue: 'Cautious'
            },{
                id:"RISK_LVL_CDE",
                value: '4',
                displayValue: 'Balanced'
            },{
                id:"RISK_LVL_CDE",
                value: '5',
                displayValue: 'Adventurous'
            }
        ];
        
        let multipleDropdownValue =['1','2'];
        


        return (
                <div style={{"display":this.props.seachCriteria}} className={styles.salesMain}>
                            <div className={styles.expand}>
                                <h5><FontIcon icon={this.state.showAllCollsapsPanel?"minimize":"add"} className={styles.iconAdd} /><span onClick={this.toggleShowCollapse.bind(this)} className={styles.expandCnt}>Collapse all sections</span></h5>
                            </div> 
                            {/*Investment questions start*/}
                            <div className={styles.question}>
                                <div className={styles.needAnalysisMain}>   
                                    <h3>
                                        <span className={styles.title}>Investment questions<FontIcon icon="agree" className={styles.agree}/></span>
                                        <a href="javascript:;" className={styles.dropDown} onClick={this.handleInvestmentQuestion.bind(this)}><FontIcon icon={this.state.showQuestionPanel?"chevron-up":"chevron-down"} className={styles.icon} /></a>
                                    </h3>
                                    {this.state.showQuestionPanel?
                                    <div className={styles.nacon}>
                                        <div className={styles.mt20}>
                                            <h5>Your risk profile</h5>
                                            <p className={styles.naconQuestion}>your risk tolerance in our record is shown below. If you wish to take a different risk profile for this plan,please select from the pull down list underneath.</p>
                                            <Dropdown id="riskProfile" option={riskLevelDropData} onChange={this.dropDownChange} />
                                        </div>
                                        <div className={styles.mt20}>
                                            <h5>Customer perferred investment period?</h5>
                                            <p className={styles.naconQuestion}>To help us consider suitable options with you, tell us more about your plan preferences. Remember that each of your choices will impact the type of solutions presented to you for consideration.</p>
                                            <Dropdown id="investmentPeriod" option={criteriaConstant.investmentPeriodDropData} onChange={this.dropDownChange} />
                                        </div>
                                        <div className={styles.mt20}>
                                            <h5>Do you have a preference for liquidty (in terms of dealing frequency ) when considering which product(s) to investing for this goal?</h5>
                                            <Dropdown id="investingLiquidty" option={criteriaConstant.investingLiquidtyDropData} onChange={this.dropDownChange} />
                                        </div>
                                        <div className={styles.mt20}>
                                            <h5>Do you have a preference for capital protection features when considering which product(s) to investing for this goals?</h5>
                                            <Dropdown id="capitalProtection" option={criteriaConstant.capitalProtectionDropData} onChange={this.dropDownChange} />
                                        </div>
                                        <div className={styles.mt20}>
                                            <div className={UIStyles.checkboxList}>
                                                <label htmlFor="INV">
                                                    <Checkbox name="INV" value="" id="INV" theme={UIStyles} onChange={this.CheckIndicator} />
                                                    <div style={{'height':'44px'}}><span>You are interested in investment products and have signed the consent form/declaration form for receiving this information</span></div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className={styles.mt20}>
                                            <div className={UIStyles.checkboxList}>
                                                <label htmlFor="AIPI">
                                                    <Checkbox name="AIPI" value="" id="AIPI" theme={UIStyles} onChange={this.CheckIndicator} />
                                                    <div style={{'height':'44px'}}><span>You have confirmed that together with the assets held at HSBC. You have a total portfolio of not less than HKD 8 million or its equivalent in any foreign currencies and have signed the consent form / declaration form</span></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>:null}
                                </div>
                            </div>
                            
                            {/*Investment questions end*/}
                            {/*Product criteria*/} 
                            <div className={styles.question}>
                                <div className={styles.needAnalysisMain}>
                                    <h3>
                                        <span className={styles.title}>Product criterias</span>
                                        <a href="javascript:;" className={styles.dropDown} onClick={this.toggleProductCirterias.bind(this)}><FontIcon icon={this.state.showProductCriteriasPanel?"chevron-up":"chevron-down"} className={styles.icon} /></a>
                                    </h3>
                                    {this.state.showProductCriteriasPanel?
                                    <div>
                                        <div className={styles.criteriasMainTable}>
                                            <span className={styles.labelTitle}>Basic criterias</span>
                                            <ul className={styles.uiClass}>
                                            <li className={styles.liClass} style={{'position':'relative'}}>
                                                <span>Product code</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle}/><br/>
                                                <input style={{'width':'350px'}} id='productCode0' name='productCode0' type="text" onChange={this.changeProductCode} placeholder="Product Code" />
                                                <span style={{'position':'absolute','top':'37px','right':'150px'}}><a href="javascript:void(0)" onClick={this.addProductCode}>{this.props.productCode.length==1?"add":"remove"}</a></span>
                                            </li>
                                            <li className={styles.liClass}>
                                                <span>Time to maturity</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle}/><br/>
                                                <MultiSelect  displayString="You have selected {{value}} items" name="timeToMaturity" id="timeToMaturity" onChange={this.multipleDropdownCriteriasChange} option={criteriaConstant.timeToMaturity} />
                                            </li>
                                            </ul>
                                            <ul className={styles.uiClass}>
                                                {
                                                    this.props.productCode.map(function(item,index){
                                                        console.log(this.props.productCode);
                                                        console.log(index);
                                                        if(index == 0){
                                                            return null;
                                                        } else {
                                                            return(
                                                            <li key={index} className={styles.liClassAddLine} key={item.id}>
                                                                <input style={{'width':'350px'}} id={item.id} name={item.id} type="text" onChange={this.changeProductCode} placeholder="Product Code" />
                                                            </li>)
                                                        }
                                                        
                                                    },this)
                                                }
                                            </ul>
                                            <ul className={styles.uiClass}>
                                                <li className={styles.liClass}>
                                                    <span>Risk tolerance</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle}/><br/>
                                                    <Dropdown id="rtq" option={rtqDropData} onChange={this.dropDownCriteriasChange} />
                                                </li>
                                                <li className={styles.liClass}>
                                                    <span>Currency</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle} /><br/>
                                                    <MultiSelect  displayString="You have selected {{value}} items" name="currencyCode" id="currencyCode" onChange={this.multipleDropdownCriteriasChange} option={criteriaConstant.currencyCode} />
                                                </li>
                                            </ul>
                                            <ul className={styles.uiClass}>
                                                <li className={styles.liCheckItem}>
                                                    <div className={UIStyles.checkboxList}>
                                                        <label htmlFor="SUITABLE_PRODUCT_ONLY">
                                                            <Checkbox name="SUITABLE_PRODUCT_ONLY" value="" id="SUITABLE_PRODUCT_ONLY" theme={UIStyles} onChange={this.CheckCriteriaIndicator} /><span>Show products that meet your input criteria only</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul className={styles.uiClass}>
                                                <li className={styles.liCheckItem}>
                                                    <div className={UIStyles.checkboxList}>
                                                        <label htmlFor="SHORTLIST_PRODUCT">
                                                            <Checkbox name="SHORTLIST_PRODUCT" value="" id="SHORTLIST_PRODUCT" theme={UIStyles} onChange={this.CheckCriteriaIndicator} /><span>Display shortlisted products only</span>
                                                        </label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className={styles.searchBottom} onClick={this.handleAllCriterias.bind(this)}><span>{this.state.showAllCriterias?'Hide':'Show'} all criterias</span><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                                        {this.state.showAllCriterias?<div>
                                        <div className={styles.criteriasTable}>
                                            <span className={styles.labelTitle}>All criterias</span>
                                            <ul className={styles.uiClass}>
                                                <li className={styles.liClass}>
                                                    <span>Market</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle}/><br/>
                                                    <MultiSelect column={1}  displayString="You have selected {{value}} items" name="market" id="market" onChange={this.multipleDropdownCriteriasChange} option={criteriaConstant.market} />
                                                </li>
                                                <li className={styles.liClass}>
                                                    <span>Product Type</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle}/><br/>
                                                    <MultiSelect column={1}  displayString="You have selected {{value}} items" name="productType" id="productType" onChange={this.multipleDropdownCriteriasChange} option={criteriaConstant.productType} />
                                                </li>
                                            </ul>
                                            <ul className={styles.uiClass}>
                                                <li className={styles.liClass}>
                                                    <span>Product Name</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle}/><br/>
                                                    <input type="text" id="PROD_NAME" name="PROD_NAME" style={{'width':'350px'}} placeholder="Product Name" onChange={this.changeProductName} />
                                                </li>
                                                <li className={styles.liClass}>
                                                    <span>Strategy</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle}/><br/>
                                                    <MultiSelect column={1}  displayString="You have selected {{value}} items"  name="strategy" id="strategy" onChange={this.multipleDropdownCriteriasChange} option={criteriaConstant.strategy} />
                                                </li>
                                            </ul>
                                        </div> 
                                        <div className={styles.criteriasTable}>
                                            <span className={styles.labelTitle}>Fund specific criterias</span>
                                            <ul className={styles.uiClass}>
                                                <li className={styles.liClass}>
                                                    <span>Fund house</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle}/><br/>
                                                    <MultiSelect column={1}  displayString="You have selected {{value}} items"  name="fundHouse" id="fundHouse" onChange={this.multipleDropdownCriteriasChange} option={criteriaConstant.fundHouse} />
                                                </li>
                                                <li className={styles.liClass}>
                                                    <span>Assests class</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle}/><br/>
                                                    <MultiSelect column={1}  displayString="You have selected {{value}} items"  name="assetClass" id="assetClass" onChange={this.multipleDropdownCriteriasChange} option={criteriaConstant.assetClass} />
                                                </li>
                                            </ul>
                                            <ul className={styles.uiClass}>
                                                <li className={styles.liClass}>
                                                    <span>Eligibility for UTMP</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle}/><br/>
                                                    <Dropdown id="UTMIP" option={criteriaConstant.UTMIPDropData} onChange={this.dropDownCriteriasChange.bind(this)} />
                                                </li>
                                                <li className={styles.liClass}>
                                                    <span>Share class</span><FontIcon icon="circle-help-solid" className={styles.fontIconStyle}/><br/>
                                                    <MultiSelect column={1}  displayString="You have selected {{value}} items" name="shareClass" id="shareClass" onChange={this.multipleDropdownCriteriasChange} option={criteriaConstant.shareClass} />
                                                </li>
                                            </ul>
                                        </div> 
                                        </div>:null}
                                    </div>:null}

                                    </div>
                                </div>
                                <div className={styles.back}>
                                    <div className={styles.buttonSearch}>
                                        <a href="javascript:void(0);" className={styles.search} onClick={this.searchProduct}>Search</a>
                                    </div>
                                </div>
                            </div>
         );
    }
}

export default withLoadingScreenBeforeReadyToLeave(injectIntl(QuestionsAndCriteriasComponent));