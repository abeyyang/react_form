import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './ProtectionStyle.scss';
import {FormattedMessage, injectIntl} from "react-intl";
import fhcConfig from "../../../config/fhcConfig";
import CcyAmtInput,{validateAndFormatCcyAmt} from 'common/components/Input/CcyAmtInput';
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form';
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';

 class Protection extends Component {

    render () {
        console.log("protection================================",this.props);
        let {monthlyIncsTotalInc,totalLiaOutsAmt,supportAmt,yearToSupport,lifeInsCoverAmt,lifeInsCmpnyBnftAmt,savingAndInvesAmt,expanded} = this.props;                                       

        return (
            <div className={styles.panel} id="fhc_createTab_protection">
                <h3>
                    <div className={styles.title}><FormattedMessage id="fhc.create.protection.title"/>
                    </div>
                    <div href="javascript:;" className={styles.icon}  id="fhc_createTab_protection_showFlag"
                     onClick={(event) => {this.props.commonUpdateInputValue('protection','expanded',!expanded);}}>
                         {expanded ? <FontIcon icon="chevron-up-small" className={styles.iconDown} /> : <FontIcon icon="chevron-down-small" className={styles.iconDown} />}
                    </div>                    
                </h3>
                {expanded ? <div className={classNames(styles.results, styles.clearfix)} id="fhc_createTab_protection_panel">
                    <div className={styles.lineCss}></div>  
                    <div className={styles.inputBoxCss}  id="fhc_createTab_protection_monthlyIncome">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.protection.monthlyIncome"/></p>
                        <div className={styles.leftFloatCss}>
                            <div className={styles.leftFloatCss}>
                                <Validated id="protection_monthlyIncsTotalInc_validate"
                                        type={ValidateTypes.RangeValidate}
                                        value={monthlyIncsTotalInc}
                                        tag="FHC_create_from"
                                        min={0}
                                        max={9999999999999}
                                        isRequired
                                        requireErrorMsg="please input value"                                
                                        rangeErrorMsg="The input number must be between 0 and 9999999999999"
                                        onError={(code,msg)=>{
                                            return <span className={styles.errorMessage}>{msg}</span>;
                                        }}
                                        onSuccess={ () => {
                                        } }
                                    >
                                    <span className={styles.leftPositionCss}></span>
                                    <AmountInput type="integer" data-role="validate" 
                                            id="monthlyIncsTotalInc"
                                            symbolVisible={true}
                                            thousandsGroup={true}
                                            thousandsGroupChar=","                                      
                                            max={9999999999999}
                                            min={0}
                                            minLength={0}
                                            maxLength={12}
                                            placeHolder=""
                                            symbol={fhcConfig.currencyCodeForInputField} 
                                            width={'255px'}
                                            value={monthlyIncsTotalInc} onChange={(event) => {this.props.commonUpdateInputValue('protection','monthlyIncsTotalInc',event);}}/>                                     
                                </Validated>   
                            </div>
                            <FontIcon icon="circle-help-solid" className={styles.iconEdit} /> 
                          </div>
                    </div>  
                     <div className={styles.inputBoxCss}  id="fhc_createTab_protection_debtAmount">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.protection.debtAmount"/></p>
                        <div className={styles.leftFloatCss}>
                            <div className={styles.leftFloatCss}>
                                <Validated id="protection_totalLiaOutsAmt_validate"
                                        type={ValidateTypes.RangeValidate}
                                        value={totalLiaOutsAmt}
                                        tag="FHC_create_from"
                                        min={0}
                                        max={9999999999999}
                                        isRequired
                                        requireErrorMsg="please input value"                                
                                        rangeErrorMsg="The input number must be between 0 and 9999999999999"
                                        onError={(code,msg)=>{
                                            return <span className={styles.errorMessage}>{msg}</span>;
                                        }}
                                        onSuccess={ () => {
                                        } }
                                    >
                                    <span className={styles.leftPositionCss}></span>
                                    <AmountInput type="integer" data-role="validate" 
                                            id="totalLiaOutsAmt"
                                            symbolVisible={true}
                                            thousandsGroup={true}
                                            thousandsGroupChar=","                                     
                                            max={9999999999999}
                                            min={0}
                                            minLength={0}
                                            maxLength={12}
                                            placeHolder=""
                                            symbol={fhcConfig.currencyCodeForInputField} 
                                            width={'255px'}
                                            value={totalLiaOutsAmt} onChange={(event) => {this.props.commonUpdateInputValue('protection','totalLiaOutsAmt',event);}}/> 
                                </Validated>   
                            </div>
                            <FontIcon icon="circle-help-solid" className={styles.iconEdit} /> 
                        </div>                                                   
                    </div> 
                     <div className={styles.inputBoxCss}  id="fhc_createTab_protection_coverOtherCosts">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.protection.coverOtherCosts"/></p>
                        <div className={styles.leftFloatCss}>
                            <div className={styles.leftFloatCss}>                        
                                <Validated id="protection_supportAmt_validate"
                                        type={ValidateTypes.RangeValidate}
                                        value={supportAmt}
                                        tag="FHC_create_from"
                                        min={0}
                                        max={9999999999999}
                                        isRequired
                                        requireErrorMsg="please input value"                                
                                        rangeErrorMsg="The input number must be between 0 and 9999999999999"
                                        onError={(code,msg)=>{
                                            return <span className={styles.errorMessage}>{msg}</span>;
                                        }}
                                        onSuccess={ () => {
                                        } }
                                    >
                                    <span className={styles.leftPositionCss}></span>
                                    <AmountInput type="integer" data-role="validate" 
                                            id="supportAmt"
                                            symbolVisible={true}
                                            thousandsGroup={true}
                                            thousandsGroupChar=","                                     
                                            max={9999999999999}
                                            min={0}
                                            minLength={0}
                                            maxLength={12}
                                            placeHolder=""
                                            symbol={fhcConfig.currencyCodeForInputField} 
                                            width={'255px'}
                                            value={supportAmt} onChange={(event) => {this.props.commonUpdateInputValue('protection','supportAmt',event);}}/> 
                                </Validated>
                             </div>
                             <FontIcon icon="circle-help-solid" className={styles.iconEdit} /> 
                        </div>                           
                    </div> 
                    <div className={styles.inputBoxCss}  id="fhc_createTab_protection_supportFamilyOfYears">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.protection.supportFamilyOfYears"/></p>
                        <div className={styles.leftFloatCss}>                     
                            <Validated id="protection_yearToSupport_validate"
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
                                        return <span className={styles.errorMessage}>{msg}</span>;
                                    }}
                                    onSuccess={ () => {
                                    } }
                                     >
                                    <span className={styles.leftPositionCss}></span>
                                    <AmountInput type="integer" data-role="validate" 
                                                        id="yearToSupport"
                                                        symbolVisible={false}
                                                        max={50}  
                                                        min={0}
                                                        minLength={0}
                                                        maxLength={2}
                                                        placeHolder=""
                                                        width={'60px'}
                                                        value={yearToSupport} onChange={(event) => {this.props.commonUpdateInputValue('protection','yearToSupport',event);}}/>
                            </Validated>   
                        </div>            
                    </div> 
                    <div className={styles.inputBoxCss}  id="fhc_createTab_protection_lifeInsuranceCover">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.protection.lifeInsuranceCover"/></p>
                            <div className={styles.leftFloatCss}>
                                    <div className={styles.leftFloatCss}>     
                                        <Validated id="protection_lifeInsCoverAmt_validate"
                                                type={ValidateTypes.RangeValidate}
                                                value={lifeInsCoverAmt}
                                                tag="FHC_create_from"
                                                emptyAsZero
                                                min={0}
                                                max={99999999999}                            
                                                rangeErrorMsg="The input number must be between 0 and 99999999999"
                                                onError={(code,msg)=>{
                                                    return <span className={styles.errorMessage}>{msg}</span>;
                                                }}
                                                onSuccess={ () => {
                                                } }
                                            >
                                            <span className={styles.leftPositionCss}></span>
                                            <AmountInput type="integer" data-role="validate" 
                                                    id="lifeInsCoverAmt"
                                                    symbolVisible={true}
                                                    thousandsGroup={true}
                                                    thousandsGroupChar=","                                     
                                                    max={99999999999}
                                                    min={0}
                                                    minLength={0}
                                                    maxLength={10}
                                                    placeHolder=""
                                                    symbol={fhcConfig.currencyCodeForInputField} 
                                                    width={'255px'}
                                                    value={lifeInsCoverAmt} onChange={(event) => {this.props.commonUpdateInputValue('protection','lifeInsCoverAmt',event);}}/>                                     
                                        </Validated>
                                </div>
                                <FontIcon icon="circle-help-solid" className={styles.iconEdit} /> 
                          </div>                              
                    </div> 
                    <div className={styles.inputBoxCss}  id="fhc_createTab_protection_benefitsCoveredAmount">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.protection.benefitsCoveredAmount"/></p>
                            <div className={styles.leftFloatCss}>
                                    <div className={styles.leftFloatCss}>                          
                                    <Validated id="protection_lifeInsCmpnyBnftAmt_validate"
                                            type={ValidateTypes.RangeValidate}
                                            value={lifeInsCmpnyBnftAmt}
                                            tag="FHC_create_from"
                                            emptyAsZero
                                            min={0}
                                            max={99999999999}                              
                                            rangeErrorMsg="The input number must be between 0 and 99999999999"
                                            onError={(code,msg)=>{
                                                return <span className={styles.errorMessage}>{msg}</span>;
                                            }}
                                            onSuccess={ () => {
                                            } }
                                        >
                                        <span className={styles.leftPositionCss}></span>
                                        <AmountInput type="integer" data-role="validate" 
                                                id="lifeInsCmpnyBnftAmt"
                                                symbolVisible={true}
                                                thousandsGroup={true}
                                                thousandsGroupChar=","                                     
                                                max={99999999999}
                                                min={0}
                                                minLength={0}
                                                maxLength={10}
                                                placeHolder=""
                                                symbol={fhcConfig.currencyCodeForInputField} 
                                                width={'255px'}
                                                value={lifeInsCmpnyBnftAmt} onChange={(event) => {this.props.commonUpdateInputValue('protection','lifeInsCmpnyBnftAmt',event);}}/> 
                                    </Validated>   
                                 </div>
                                <FontIcon icon="circle-help-solid" className={styles.iconEdit} /> 
                          </div>                             
                    </div> 
                    <div className={styles.inputBoxCss}  id="fhc_createTab_protection_savingInvestment">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.protection.savingInvestment"/></p>
                            <div className={styles.leftFloatCss}>
                                    <div className={styles.leftFloatCss}>                              
                                    <Validated id="protection_savingAndInvesAmt_validate"
                                            type={ValidateTypes.RangeValidate}
                                            value={savingAndInvesAmt}
                                            tag="FHC_create_from"
                                            min={0}
                                            max={9999999999999}
                                            isRequired
                                            requireErrorMsg="please input value"                                
                                            rangeErrorMsg="The input number must be between 0 and 9999999999999"
                                            onError={(code,msg)=>{
                                                return <span className={styles.errorMessage}>{msg}</span>;
                                            }}
                                            onSuccess={ () => {
                                            } }
                                        >
                                        <span className={styles.leftPositionCss}></span>
                                        <AmountInput type="integer" data-role="validate" 
                                                id="savingAndInvesAmt"
                                                symbolVisible={true}
                                                thousandsGroup={true}
                                                thousandsGroupChar=","                                     
                                                max={9999999999999}
                                                min={0}
                                                minLength={0}
                                                maxLength={12}
                                                placeHolder=""
                                                symbol={fhcConfig.currencyCodeForInputField} 
                                                width={'255px'}
                                                value={savingAndInvesAmt} onChange={(event) => {this.props.commonUpdateInputValue('protection','savingAndInvesAmt',event);}}/> 
                                    </Validated>     
                                  </div>
                                  <FontIcon icon="circle-help-solid" className={styles.iconEdit} /> 
                          </div>                                                                     
                    </div>                                                                                                                                                                                                   
               </div> : null}                
            </div>
        );
    }
}

export default injectIntl(Protection,{withRef: true});