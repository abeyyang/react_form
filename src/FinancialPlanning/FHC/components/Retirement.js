import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './RetirementStyle.scss';
import {FormattedMessage, FormattedHTMLMessage,injectIntl} from "react-intl";
import AmountText from 'common/components/Input/AmountText';
import fhcConfig from "../../../config/fhcConfig";
import CcyAmtInput,{validateAndFormatCcyAmt} from 'common/components/Input/CcyAmtInput';
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form';
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';

 class Retirement extends Component {

     constructor (props) {
        super(props);
        this.state = {
            assumptionExpanded:true
        };
        this.toggleAssumptionExpanded = this.toggleAssumptionExpanded.bind(this);   
    }    

    toggleAssumptionExpanded () {
        this.setState((preState, props) => {
            return { assumptionExpanded:!this.state.assumptionExpanded };
        });
    } 

    render () {
        console.log("Retirement================================",this.props);
        let {targetRetireAge,monthlyExpAmt,savingForRetireAmt,hasLegacyPlan,legacyPlanRemark,postRetireYear,expanded} = this.props;
        let minRetireAge = (new Date()).getFullYear()-(new Date(this.props.customerInfo.birthDate)).getFullYear()+1;      
        const assumptionExpanded = this.state.assumptionExpanded;   

        return (
            <div className={styles.panel} id="fhc_createTab_retirement">
                <h3>
                    <div className={styles.title}><FormattedMessage id="fhc.create.retirement.title"/>
                    </div>
                    <div href="javascript:;" className={styles.icon} id="fhc_createTab_retirement_showFlag" 
                        onClick={(event) => {this.props.commonUpdateInputValue('retirement','expanded',!expanded);}}>
                         {expanded ? <FontIcon icon="chevron-up-small" className={styles.iconDown} /> : <FontIcon icon="chevron-down-small" className={styles.iconDown} />}
                    </div>
                </h3>
                {expanded ? <div className={classNames(styles.results, styles.clearfix)} id="fhc_createTab_retirement_panel">
                 <div className={styles.lineCss}></div>  
                 <div>
                      <div className={styles.inputBoxCss}  id="fhc_createTab_retirement_targetRetireAge">
                            <p className={styles.pCss}><FormattedMessage id="fhc.create.retirement.targetRetireAge"/></p>
                            <div className={styles.leftFloatCss}>
                               <div className={styles.leftFloatCss}> 
                                    <Validated id="retirement_targetRetireAge_validate"
                                                    type={ValidateTypes.RangeValidate}
                                                    value={targetRetireAge}
                                                    tag="FHC_create_from"
                                                    min={minRetireAge}
                                                    max={99}
                                                    isRequired
                                                    nanErrorMsg="The input value is NaN" 
                                                    requireErrorMsg="please input value"
                                                    rangeErrorMsg={"The input number must be between "+minRetireAge+" and 99"}
                                                    onError={(code,msg)=>{
                                                        return <span className={styles.errorMessage}>{msg}</span>;
                                                    }}
                                                    onSuccess={ () => {
                                                    } }
                                                    > 
                                                    <span className={styles.leftPositionCss}></span>
                                                    <AmountInput type="integer" data-role="validate" 
                                                            symbolVisible={false}
                                                            max={99}  
                                                            min={minRetireAge}
                                                            minLength={0}
                                                            maxLength={2}
                                                            placeHolder=""
                                                            width={'60px'}
                                                            id="targetRetireAge"
                                                            value={targetRetireAge} onChange={(event) => {this.props.changeTargetRetireAge(event,this.props.customerInfo);}}/>                        
                                    </Validated>  
                                </div>   
                                <span className={styles.retireAgeSpan}><FormattedMessage id="fhc.create.retirement.yearsOld"/></span> 
                            </div>                                     
                      </div>      
                      <div className={styles.inputBoxCss}  id="fhc_createTab_retirement_monthlyExpCcyAmt">
                            <p className={styles.pCss}><FormattedMessage id="fhc.create.retirement.monthlyExpCcyAmt"/></p>
                                 <div className={styles.leftFloatCss}>
                                    <div className={styles.leftFloatCss}> 
                                        <Validated id="retirement_monthlyExpAmt_validate"
                                                type={ValidateTypes.RangeValidate}
                                                value={monthlyExpAmt}
                                                tag="FHC_create_from"
                                                min={450}
                                                max={9999999999999}
                                                isRequired
                                                requireErrorMsg="please input value"                                
                                                rangeErrorMsg="The input number must be between 450 and 9999999999999"
                                                onError={(code,msg)=>{
                                                    return <span className={styles.errorMessage}>{msg}</span>;
                                                }}
                                                onSuccess={ () => {
                                                } }
                                            >
                                            <span className={styles.leftPositionCss}></span>
                                            <AmountInput type="integer" data-role="validate"
                                                    id="monthlyExpAmt"                              
                                                    symbolVisible={true}
                                                    thousandsGroup={true}
                                                    thousandsGroupChar=","  
                                                    theme={styles}                                                  
                                                    max={9999999999999}  
                                                    min={450}
                                                    minLength={0}
                                                    maxLength={12}
                                                    placeHolder=""
                                                    symbol={fhcConfig.currencyCodeForInputField} 
                                                    width={'255px'}
                                                    value={monthlyExpAmt} onChange={(event) => {this.props.commonUpdateInputValue('retirement','monthlyExpAmt',event);}}/>                                
                                        </Validated>   
                                    </div>
                                    <FontIcon icon="circle-help-solid" className={styles.iconEdit} /> 
                            </div>                       
                      </div>
                      <div className={styles.inputBoxCss}  id="fhc_createTab_retirement_savingForRetireCcyAmt">
                            <p className={styles.pCss}><FormattedMessage id="fhc.create.retirement.savingForRetireCcyAmt"/></p>
                                 <div className={styles.leftFloatCss}>
                                    <div className={styles.leftFloatCss}>                             
                                        <Validated id="retirement_savingForRetireAmt_validate"
                                                type={ValidateTypes.RangeValidate}
                                                value={savingForRetireAmt}
                                                tag="FHC_create_from"
                                                emptyAsZero
                                                min={0}
                                                max={999999999999}                          
                                                rangeErrorMsg="The input number must be between 0 and 999999999999"
                                                onError={(code,msg)=>{
                                                    return <span className={styles.errorMessage}>{msg}</span>;
                                                }}
                                                onSuccess={ () => {
                                                } }
                                            >
                                            <span className={styles.leftPositionCss}></span>
                                            <AmountInput type="integer" data-role="validate"        
                                                    id="savingForRetireAmt"
                                                    symbolVisible={true}
                                                    thousandsGroup={true}
                                                    thousandsGroupChar=","  
                                                    theme={styles}                                                  
                                                    max={999999999999}  
                                                    min={0}
                                                    minLength={0}
                                                    maxLength={11}
                                                    placeHolder=""
                                                    symbol={fhcConfig.currencyCodeForInputField} 
                                                    width={'255px'}
                                                    value={savingForRetireAmt} onChange={(event) => {this.props.commonUpdateInputValue('retirement','savingForRetireAmt',event);}}/> 
                                        </Validated>  
                                    </div>
                                    <FontIcon icon="circle-help-solid" className={styles.iconEdit} /> 
                            </div>                                
                      </div>                                                               
                      <div className={classNames(styles.choose, styles.clearfix)} id="fhc_createTab_retirement_hasLegacyPlan">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.retirement.hasLegacyPlan"/><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></p>
                        <div className={styles.radioButtonList}>
                            <ul>
                                        <li key="hasLegacyPlan">
                                            <label htmlFor="hasLegacyPlan" className={styles.radioButtonLabel}>
                                                <RadioButton id="hasLegacyPlan" name="hasLegacyPlan" value="Y" 
                                                onChange={(event) => {this.props.commonUpdateInputValue('retirement',event.target.name,event.target.value);}} 
                                                defaultChecked={hasLegacyPlan == 'Y' ? true : false} />
                                                <span className={styles.labelText}><FormattedMessage id="fhc.yes"/></span>
                                            </label>
                                        </li>
                                        <li key="noLegacyPlan">
                                            <label htmlFor="noLegacyPlan" className={styles.radioButtonLabel}>
                                                <RadioButton id="noLegacyPlan" name="hasLegacyPlan" value="N" 
                                                onChange={(event) => {this.props.commonUpdateInputValue('retirement',event.target.name,event.target.value);}} 
                                                defaultChecked={hasLegacyPlan == 'N' ? true : false} />
                                                <span className={styles.labelText}><FormattedMessage id="fhc.no"/></span>
                                            </label>
                                        </li>                                    
                            </ul>
                        </div>
                      </div>     
                     {hasLegacyPlan=='Y' ?  
                        <div>
                            <div className={styles.triangle}></div>
                            <div className={styles.hasLegacyPlanPanel} >   
                                <div >
                                    <div  id="fhc_createTab_retirement_hasLegacyPlanDesc" className={styles.hasLegacyPlanDiv}>
                                        <p className={styles.pCss}><FormattedMessage id="fhc.create.retirement.hasLegacyPlanDesc"/></p>
                                        <Textarea theme={styles} placeholder="I plan to..." value={legacyPlanRemark} id="legacyPlanRemark" name="legacyPlanRemark"
                                        onChange={(event) => {this.props.commonUpdateInputValue('retirement',event.target.name,event.target.value);}}/>
                                    </div>                                                                     
                                </div>        
                            </div> 
                            </div>: null}     
                  </div> 
                  <div>
                      <div className={styles.inputBoxCss} id="fhc_createTab_retirement_assumptionAverageAmount">
                            <div className={styles.assumptionHeadlineCss}></div>
                            <FontIcon icon="view" className={styles.viewAssumptionCss}/>
                            <div className={styles.assumptionCss}>     
                                    <p className={styles.assumptionFontCss}><FormattedMessage id="fhc.create.education.assumptionsText"/></p>   
                                    <div href="javascript:;" className={styles.icon} onClick={this.toggleAssumptionExpanded} id="fhc_createTab_retirement_assumptionAverageAmount">
                                        {assumptionExpanded ? <span><FormattedMessage id="fhc.create.education.hide"/><FontIcon icon="chevron-up-small" className={styles.iconDown} /></span> : <span><FormattedMessage id="fhc.create.education.show"/><FontIcon icon="chevron-down-small" className={styles.iconDown} /></span>}
                                    </div>   
                                     {assumptionExpanded ?<div id="fhc_createTab_retirement_assumption" className={styles.assumptionTextCss}>                  
                                        <div className={styles.pLeftFloatCss}>
                                                <div className={styles.leftFloatCss}>     
                                                     <FormattedHTMLMessage id="fhc.create.retirement.assumptionsPart1" values={{targetRetireAge:targetRetireAge,hopeLiveYear:this.props.hopeLiveYear}}/>
                                                </div>
                                                <div className={styles.enjoyingRetirementYearDivCss}>
                                                    <Validated id="retirement_postRetireYear_validate"
                                                                    type={ValidateTypes.RangeValidate}
                                                                    value={postRetireYear}
                                                                    tag="FHC_create_from"
                                                                    min={0}
                                                                    isRequired
                                                                    nanErrorMsg="The input value is NaN" 
                                                                    requireErrorMsg="please input value"
                                                                    rangeErrorMsg="The input number >= 0"
                                                                    onError={(code,msg)=>{
                                                                        return <span className={styles.errorMessageInLine}>{msg}</span>;
                                                                    }}
                                                                    onSuccess={ () => {
                                                                    } }
                                                    >                                                 
                                                    <AmountInput type="integer" data-role="validate" 
                                                            id="postRetireYear"
                                                            symbolVisible={false}
                                                            min={0}
                                                            minLength={0}
                                                            maxLength={2}
                                                            placeHolder=""
                                                            width={'60px'}
                                                            value={postRetireYear} onChange={(event) => {this.props.changePostRetireYear(event);}}/>
                                                    </Validated>      
                                                </div>
                                                <FormattedMessage id="fhc.create.retirement.assumptionsPart2"/>
                                            </div>                                        
                                    </div>: null}
                            </div>  
                            <div className={styles.assumptionUnderlineCss}></div>                  
                      </div>
                 </div>                                                                                    
               </div> : null}
            </div>
        );
    }
}

export default injectIntl(Retirement,{withRef: true});