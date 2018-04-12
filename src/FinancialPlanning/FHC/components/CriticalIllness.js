import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './CriticalIllnessStyle.scss';
import fhcConfig from "../../../config/fhcConfig";
import CcyAmtInput,{validateAndFormatCcyAmt} from 'common/components/Input/CcyAmtInput';
import {FormattedMessage, FormattedHTMLMessage,injectIntl} from "react-intl";
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form';
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';

 class CriticalIllness extends Component {

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
        console.log("CriticalIllness================================",this.props);
        let {illnessCoverAmt,yearToSupport,supportAmt,hasInpCoverage,hasOutptCoverage,hasTravCoverage,expanded} = this.props;           
        const assumptionExpanded = this.state.assumptionExpanded;

        return (
            <div className={styles.panel} id="fhc_createTab_criticalIllness">
                <h3>
                    <div className={styles.title}><FormattedMessage id="fhc.create.criticalIllness.title"/>
                    </div>
                    <div href="javascript:;" className={styles.icon}  id="fhc_createTab_criticalIllness_showFlag" 
                        onClick={(event) => {this.props.commonUpdateInputValue('criticalIllness','expanded',!expanded);}}>
                         {expanded ? <FontIcon icon="chevron-up-small" className={styles.iconDown} /> : <FontIcon icon="chevron-down-small" className={styles.iconDown} />}
                    </div>                         
                </h3>
                {expanded ? <div className={classNames(styles.results, styles.clearfix)} id="fhc_createTab_criticalIllness_panel">
                    <div className={styles.lineCss}></div>  
                    <div className={styles.inputBoxCss}  id="fhc_createTab_criticalIllness_illnessCoverCcyAmt">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.criticalIllness.illnessCoverCcyAmt"/></p>         
                        <div className={styles.leftFloatCss}>
                            <div className={styles.leftFloatCss}>               
                                <Validated id="criticalIllness_illnessCoverAmt_validate"
                                        type={ValidateTypes.RangeValidate}
                                        value={illnessCoverAmt}
                                        tag="FHC_create_from"
                                        emptyAsZero
                                        min={0}
                                        max={99999999999}
                                        rangeErrorMsg="The input number must be between 0 and 999999999999"
                                        onError={(code,msg)=>{
                                            return <span className={styles.errorMessage}>{msg}</span>;
                                        }}
                                        onSuccess={ () => {
                                        } }
                                    >
                                    <span className={styles.leftPositionCss}></span>
                                    <AmountInput type="integer" data-role="validate" 
				            id="illnessCoverAmt"
                                            symbolVisible={true}
                                            thousandsGroup={true}
                                            thousandsGroupChar=","  
                                            theme={styles}                 
                                            max={99999999999}  
                                            min={0}
                                            minLength={0}
                                            maxLength={10}
                                            placeHolder=""
                                            symbol={fhcConfig.currencyCodeForInputField} 
                                            width={'255px'}
                                            value={illnessCoverAmt} onChange={(event) => {this.props.commonUpdateInputValue('criticalIllness','illnessCoverAmt',event);}}/> 
                                            
                                </Validated> 
                            </div>     
                            <FontIcon icon="circle-help-solid" className={styles.iconEdit} />  
                          </div>           
                    </div>  
                    <div className={styles.inputBoxCss}  id="fhc_createTab_criticalIllness_insuranceProducts">
                        <p className={styles.pCheckBoxCss}><FormattedMessage id="fhc.create.criticalIllness.insuranceProducts"/></p>     
                        <div className={styles.checkboxList}>
                            <ul>
                                <li>
                                    <label htmlFor="hasInpCoverage">
                                        <Checkbox id="hasInpCoverage" name="hasInpCoverage" 
                                         checkedIcon='agree' uncheckedIcon='' value="hasInpCoverage" isChecked={hasInpCoverage=='Y'} theme={styles} onChange={(event) => {this.props.commonUpdateInputValue('criticalIllness',event.target.name,hasInpCoverage=='Y'? 'N':'Y');}}  />
                                        <span className={styles.checkBoxfontCss}><FormattedMessage id="fhc.InpCoverage"/></span>
                                    </label>
                                </li>     
                                <li>
                                    <label htmlFor="hasOutptCoverage">
                                        <Checkbox id="hasOutptCoverage" name="hasOutptCoverage" 
                                        checkedIcon='agree' uncheckedIcon='' value="hasOutptCoverage" isChecked={hasOutptCoverage=='Y'} theme={styles}  onChange={(event) => {this.props.commonUpdateInputValue('criticalIllness',event.target.name,hasOutptCoverage=='Y'? 'N':'Y');}}  />
                                        <span className={styles.checkBoxfontCss}><FormattedMessage id="fhc.OutptCoverage"/></span>
                                    </label>
                                </li> 
                                <li>
                                    <label htmlFor="hasTravCoverage">
                                        <Checkbox id="hasTravCoverage" name="hasTravCoverage" 
                                        checkedIcon='agree' uncheckedIcon='' value="hasTravCoverage" isChecked={hasTravCoverage=='Y'} theme={styles} onChange={(event) => {this.props.commonUpdateInputValue('criticalIllness',event.target.name,hasTravCoverage=='Y'? 'N':'Y');}}  />
                                        <span className={styles.checkBoxfontCss}><FormattedMessage id="fhc.TravCoverage"/></span>
                                    </label>
                                </li>                                                                                
                            </ul>
                        </div>                                        
                    </div>   
                      <div className={styles.inputBoxCss} id="fhc_createTab_criticalIllness_assumptionAverageAmount">
                            <div className={styles.assumptionHeadlineCss}></div>
                            <FontIcon icon="view" className={styles.viewAssumptionCss}/>
                            <div className={styles.assumptionCss}>     
                                    <p className={styles.assumptionFontCss}><FormattedMessage id="fhc.create.education.assumptionsText"/></p>   
                                    <div href="javascript:;" className={styles.icon} onClick={this.toggleAssumptionExpanded} id="fhc_createTab_retirement_assumptionAverageAmount" >
                                        {assumptionExpanded ? <span><FormattedMessage id="fhc.create.education.hide"/><FontIcon icon="chevron-up-small" className={styles.iconDown} /></span> : <span><FormattedMessage id="fhc.create.education.show"/><FontIcon icon="chevron-down-small" className={styles.iconDown} /></span>}
                                    </div>   
                                     {assumptionExpanded ?<div id="fhc_createTab_criticalIllness_assumption" className={styles.assumptionTextCss}>                 
                                        <span className={styles.spanCss}>            
                                         <div className={styles.leftFloatCss}>                         
                                            <FormattedMessage id="fhc.create.criticalIllness.assumptionPart1"/>
                                         </div>
                                         <div className={styles.leftFloatCss}>   
                                            <div className={styles.inlineInputDivCss}>
                                                <Validated id="criticalIllness_yearToSupport_validate"
                                                    type={ValidateTypes.RangeValidate}
                                                    value={yearToSupport}
                                                    tag="FHC_create_from"
                                                    min={0}
                                                    max={50}
                                                    isRequired
                                                    nanErrorMsg="The input value is NaN" 
                                                    requireErrorMsg="please input value"
                                                    rangeErrorMsg="The input number must be between 0 and 50"
                                                    onError={(code,msg)=>{
                                                        return <span className={styles.errorMessageInLine}>{msg}</span>;
                                                    }}
                                                    onSuccess={ () => {
                                                    } }
                                                >                                        
                                                <AmountInput type="integer" data-role="validate" 
                                                            id="yearToSupport"
                                                            symbolVisible={false}
                                                            max={50}  
                                                            min={0}
                                                            minLength={0}
                                                            maxLength={2}
                                                            placeHolder=""
                                                            width={'60px'}
                                                            value={yearToSupport} onChange={(event) => {this.props.commonUpdateInputValue('criticalIllness','yearToSupport',event);}}/>
                                                </Validated>
                                            </div>
                                        </div>
                                        <div className={styles.leftFloatCss}>
                                            <FormattedMessage id="fhc.create.criticalIllness.assumptionPart2"/>
                                        </div>
                                        <div className={styles.leftFloatCss}>
                                            <div className={styles.inlineInputDivCss}>
                                                <Validated id="criticalIllness_supportAmt_validate"
                                                    type={ValidateTypes.RangeValidate}
                                                    value={supportAmt}
                                                    tag="FHC_create_from"
                                                    min={0}
                                                    max={999999999999}
                                                    isRequired
                                                    requireErrorMsg="please input value"
                                                    rangeErrorMsg="The input number must be between 0 and 999999999999"
                                                    onError={(code,msg)=>{
                                                        return <span className={styles.errorMessageInLine}>{msg}</span>;
                                                    }}
                                                    onSuccess={ () => {
                                                    } }
                                                > 
                                                <AmountInput type="integer" data-role="validate" 
                                                        id="supportAmt"
                                                        placeHolder=""
                                                        thousandsGroup={true}
                                                        thousandsGroupChar=","                                              
                                                        max={999999999999}
                                                        min={0}
                                                        minLength={0}
                                                        maxLength={11} 
                                                        symbolVisible={true}                                              
                                                        symbol={fhcConfig.currencyCodeForInputField} 
                                                        width={'155px'}
                                                        value={supportAmt} onChange={(event) => {this.props.commonUpdateInputValue('criticalIllness','supportAmt',event);}}/> 
                                                        
                                                </Validated>  
                                            </div>
                                        </div>    
                                        <FormattedMessage id="fhc.create.criticalIllness.assumptionPart3"/>
                                         </span>       
                                                                             
                                    </div>: null}
                            </div>  
                            <div className={styles.assumptionUnderlineCss}></div>                  
                      </div>                    

               </div> : null}                           
            </div>
        );
    }
}
export default injectIntl(CriticalIllness,{withRef: true});