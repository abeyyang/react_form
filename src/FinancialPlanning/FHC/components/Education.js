import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './EducationStyle.scss';
import {FormattedMessage, injectIntl} from "react-intl";
import AmountText from 'common/components/Input/AmountText';
import fhcConfig from "../../../config/fhcConfig";
import CcyAmtInput,{validateAndFormatCcyAmt} from 'common/components/Input/CcyAmtInput';
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form';
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';

 class Education extends Component {

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
        console.log("education================================",this.props);
        let {savingForEduAmt,yearInSchool,annualExp,yearTillEnterSchool,expanded} = this.props;
        const assumptionExpanded = this.state.assumptionExpanded; 

        return (
            <div className={styles.panel} id="fhc_createTab_education">
                <h3>
                    <div className={styles.title}><FormattedMessage id="fhc.create.education.title"/>
                    </div>
                    <div href="javascript:;" className={styles.icon} id="fhc_createTab_education_showFlag" 
                        onClick={(event) => {this.props.commonUpdateInputValue('education','expanded',!expanded);}}>
                         {expanded ? <FontIcon icon="chevron-up-small" className={styles.iconDown} /> : <FontIcon icon="chevron-down-small" className={styles.iconDown} />}
                    </div>
                </h3>
                {expanded ? <div className={classNames(styles.results, styles.clearfix)} id="fhc_createTab_education_panel">
                 <div className={styles.lineCss}></div>  
                 <div>
                      <div className={styles.inputBoxCss}  id="fhc_createTab_education_towardChildEducation">
                            <p className={styles.pCss}><FormattedMessage id="fhc.create.education.savingForEduCcyAmt"/></p>
                            <div className={styles.LeftFloatDivCss}>
                                <div className={styles.LeftFloatCss}>
                                    <Validated id="education_savingForEduAmt_validate"
                                            type={ValidateTypes.RangeValidate}
                                            value={savingForEduAmt}
                                            tag="FHC_create_from"
                                            emptyAsZero
                                            min={0}
                                            max={999999999999}
                                            rangeErrorMsg="The input number must be between 0 and 999999999999"
                                            onError={(code,msg)=>{
                                                return <span className={styles.errorMsgCss}>{msg}</span>;
                                            }}
                                            onSuccess={ () => {
                                            } }
                                        >
                                        <span className={styles.leftPositionCss}></span>
                                        <AmountInput type="integer" data-role="validate" 
                                                id="savingForEduAmt"
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
                                                value={savingForEduAmt} onChange={(event) => {this.props.commonUpdateInputValue('education','savingForEduAmt',event);}}/>                                                 
                                    </Validated> 
                                </div>
                                <FontIcon icon="circle-help-solid" className={styles.iconEdit} /> 
                            </div>   
                      </div>                                         
                  </div> 
                  <div>
                      <div className={styles.inputBoxCss} id="fhc_createTab_education_assumptionAverageAmount">
                            <div className={styles.assumptionHeadlineCss}></div>
                            <FontIcon icon="view" className={styles.viewAssumptionCss}/>
                            <div className={styles.assumptionCss}>     
                                    <p className={styles.assumptionFontCss}><FormattedMessage id="fhc.create.education.assumptionsText"/></p>   
                                    <div href="javascript:;" className={styles.icon} onClick={this.toggleAssumptionExpanded} id="fhc_createTab_education_assumptionShowFlag">
                                        {assumptionExpanded ? <span><FormattedMessage id="fhc.create.education.hide"/><FontIcon icon="chevron-up-small" className={styles.iconDown} /></span> : <span><FormattedMessage id="fhc.create.education.show"/><FontIcon icon="chevron-down-small" className={styles.iconDown} /></span>}
                                    </div>   
                                     {assumptionExpanded ?<div id="fhc_createTab_education_assumption">                                                     
                                        <div className={styles.pLeftFloatCss}>
                                            <div className={styles.LeftFloatCss}>         
                                                <FormattedMessage id="fhc.create.education.assumption1.part1"/>
                                            </div>    
                                            <div className={styles.annualExpCss}>
                                                <Validated id="education_annualExp_validate"
                                                        type={ValidateTypes.RangeValidate}
                                                        value={annualExp}
                                                        tag="FHC_create_from"
                                                        emptyAsZero
                                                        min={0}
                                                        max={999999999999}
                                                        isRequired={this.props.hasChildUnder18}
                                                        requireErrorMsg="please input value"                                               
                                                        rangeErrorMsg="The input number must be between 0 and 999999999999"
                                                        onError={(code,msg)=>{
                                                            return <span className={styles.errorMsgCssInLine}>{msg}</span>;
                                                        }}
                                                        onSuccess={ () => {
                                                        } }
                                                    >                                                
                                                    <AmountInput type="integer" data-role="validate" 
                                                            id="annualExp"
                                                            symbolVisible={true}
                                                            showStar={this.props.hasChildUnder18}
                                                            thousandsGroup={true}
                                                            thousandsGroupChar=","  
                                                            theme={styles}                 
                                                            max={999999999999}  
                                                            min={0}
                                                            minLength={0}
                                                            maxLength={11}
                                                            placeHolder=""
                                                            symbol={fhcConfig.currencyCodeForInputField} 
                                                            width={'155px'}
                                                            value={annualExp} 
                                                            onChange={(event) => {this.props.commonUpdateInputValue('education','annualExp',event);}}/>                                                                           
                                                </Validated>
                                            </div>
                                        <FormattedMessage id="fhc.create.education.assumption1.part2"/>
                                        
                                        </div>
                                        
                                        <div className={styles.pLeftFloatCss}>
                                            <div className={styles.LeftFloatCss}>       
                                                <FormattedMessage id="fhc.create.education.assumption2.part1"/> 
                                            </div>    
                                            <div className={styles.averageYearsOneduCss}>
                                                <Validated id="education_yearToSupport_validate"
                                                    type={ValidateTypes.RangeValidate}
                                                    value={yearInSchool}
                                                    tag="FHC_create_from"
                                                    min={1}
                                                    max={30}
                                                    isRequired
                                                    nanErrorMsg="The input value is NaN" 
                                                    requireErrorMsg="please input value"
                                                    rangeErrorMsg="The input number must be between 1 and 30"
                                                    onError={(code,msg)=>{
                                                        return <span className={styles.errorMsgCssInLine}>{msg}</span>;
                                                    }}
                                                    onSuccess={ () => {
                                                    } }
                                                > 
                                                <AmountInput type="integer" data-role="validate" 
                                                        id="yearInSchool"
                                                        symbolVisible={false}
                                                        max={30}  
                                                        min={1}
                                                        minLength={0}
                                                        maxLength={2}
                                                        placeHolder=""
                                                        width={'60px'}
                                                        value={yearInSchool} onChange={(event) => {this.props.commonUpdateInputValue('education','yearInSchool',event);}}/> 
                                                </Validated>
                                            </div>
                                            <FormattedMessage id="fhc.create.education.assumption2.part2"/>
                                        </div>

                                        <div className={styles.pLeftFloatCss}>
                                            <div className={styles.LeftFloatCss}> 
                                                <FormattedMessage id="fhc.create.education.assumption3.part1"/>
                                            </div>    
                                            <div className={styles.oldestChildOfeducationCss}>
                                                <Validated id="education_yearTillEnterSchool_validate"
                                                    type={ValidateTypes.RangeValidate}
                                                    value={yearTillEnterSchool}
                                                    tag="FHC_create_from"
                                                    min={0}
                                                    max={86}
                                                    isRequired
                                                    nanErrorMsg="The input value is NaN" 
                                                    requireErrorMsg="please input value"
                                                    rangeErrorMsg="The input number must be between 0 and 86"
                                                    onError={(code,msg)=>{
                                                        return <span className={styles.errorMsgCssInLine}>{msg}</span>;
                                                    }}
                                                    onSuccess={ () => {
                                                    } }
                                                > 
                                                <AmountInput type="integer" data-role="validate" 
                                                        id="yearTillEnterSchool"
                                                        symbolVisible={false}
                                                        max={86}  
                                                        min={0}
                                                        minLength={0}
                                                        maxLength={2}
                                                        placeHolder=""
                                                        width={'60px'}
                                                        value={yearTillEnterSchool} onChange={(event) => {this.props.commonUpdateInputValue('education','yearTillEnterSchool',event);}}/> 
                                                </Validated>
                                            </div>
                                        <FormattedMessage id="fhc.create.education.assumption3.part2"/></div> 
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

export default injectIntl(Education,{withRef: true});