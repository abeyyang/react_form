import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './AboutMeStyle.scss';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from "react-intl";
import fhcConfig from "../../../config/fhcConfig";
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form';
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';

class AboutMe extends Component {
    render () {
        console.log('AboutMe.props========',this.props);
        let {maxRiskLevel,riskLevel,hasChildUnder18,childrenNo,
            yearOfChildrenDOB1,yearOfChildrenDOB2,yearOfChildrenDOB3,yearOfChildrenDOB4,yearOfChildrenDOB5,
            universityCountryCde,expanded} = this.props;
        let genderCode = this.props.customerInfo.genderCode;
        let currentYear = (new Date()).getFullYear();
        let currentAge = currentYear-(new Date(this.props.customerInfo.birthDate)).getFullYear();
        let riskLevelNo = Number(maxRiskLevel);

        let childrenAge1,childrenAge2,childrenAge3,childrenAge4,childrenAge5;
        if(null!=yearOfChildrenDOB1&&yearOfChildrenDOB1.length>0){
            childrenAge1 = String(currentYear-Number(yearOfChildrenDOB1));
        }
        if(null!=yearOfChildrenDOB2&&yearOfChildrenDOB2.length>0){
            childrenAge2 = String(currentYear-Number(yearOfChildrenDOB2));
        }
        if(null!=yearOfChildrenDOB3&&yearOfChildrenDOB3.length>0){
            childrenAge3 = String(currentYear-Number(yearOfChildrenDOB3));
        }
        if(null!=yearOfChildrenDOB4&&yearOfChildrenDOB4.length>0){
            childrenAge4 = String(currentYear-Number(yearOfChildrenDOB4));
        }
        if(null!=yearOfChildrenDOB5&&yearOfChildrenDOB5.length>0){
            childrenAge5 = String(currentYear-Number(yearOfChildrenDOB5));
        }

        let riskLevelMap = [
                {value: '0', displayValue: 'Secure'},
                {value: '1', displayValue: 'Very Cautious'},
                {value: '2', displayValue: 'Cautious'},
                {value: '3', displayValue: 'Balanced'},
                {value: '4', displayValue: 'Adventurous'},
                {value: '5', displayValue: 'Speculative'}
            ];   

         riskLevelMap.map(
               (item,index)=>{
                    riskLevelMap.splice(riskLevelNo+1,riskLevelMap.length-riskLevelNo-1);                    
               }
          )      

        let riskLeveldropdownList = riskLevelMap;  

        let universityCountryCdeList = new Array();        

        fhcConfig.spendingCountry.map(
              (item,index)=>{
                    let labelKey = 'fhc.university.'+item.code;
                    let universityCountryObj = new Object();
                    universityCountryObj.value = item.code;
                    universityCountryObj.displayValue = <FormattedMessage id={labelKey}/>;
                    universityCountryCdeList.push(universityCountryObj);
               }
        )        

        return (
            <div className={styles.panel} id="fhc_createTab_aboutYou">
                <h3>
                    <div className={styles.title}><FormattedMessage id="fhc.create.aboutYou.title"/>
                    </div>
                    <div href="javascript:;" className={styles.icon} id="fhc_createTab_aboutYou_showFlag"
                        onClick={(event) => {this.props.commonUpdateInputValue('aboutMe','expanded',!expanded);}}>
                        {expanded ? <FontIcon icon="chevron-up-small" className={styles.iconDown} /> : <FontIcon icon="chevron-down-small" className={styles.iconDown} />}
                    </div>
                </h3>
                {expanded ? <div className={classNames(styles.results, styles.clearfix)} id="fhc_createTab_aboutYou_panel">
                 <div className={styles.lineCss}></div>
                 <div >
                      <div className={classNames(styles.choose, styles.clearfix)} id="fhc_createTab_sexFlagRadioBox">
                          <p className={styles.pCss}>1. I am a...</p>
                            <div className={styles.radioButtonList}>
                                <ul>
                                    <li key="sexForMale">
                                        <label htmlFor="sexForMale" className={styles.radioButtonLabel}>
                                            <RadioButton id="sexForMale" name="genderCode" value="M" disabled={true}
                                                    onChange={(event) => {this.props.commonUpdateInputValue('aboutMe',event.target.name,event.target.value);}} 
                                                    defaultChecked={genderCode == 'M' ? true : false} />
                                            <span className={styles.labelText}>Male</span>
                                        </label>
                                    </li>
                                    <li key="sexForFemale">
                                        <label htmlFor="sexForFemale" className={styles.radioButtonLabel}>
                                            <RadioButton id="sexForFemale" name="genderCode" value="F" disabled={true}
                                                    onChange={(event) => {this.props.commonUpdateInputValue('aboutMe',event.target.name,event.target.value);}} 
                                                    defaultChecked={genderCode == 'F' ? true : false} />
                                            <span className={styles.labelText}>Female</span>
                                        </label>
                                    </li>                                    
                                </ul>
                            </div>
                      </div>                                                                     
                 </div>
                <div >
                      <div className={styles.inputBoxCss}  id="fhc_createTab_currentAgeInputBox">
                          <p className={styles.pCss}>2. I am currently</p>
                         <div className={styles.currentAgeDiv}>
                            <input type="text" className={styles.currentAgeInput} id="currentAge" disabled="disabled" defaultValue={currentAge}/>
                            <span className={styles.currentAgeSpan}>years old</span>
                        </div>
                      </div>                                                                     
                 </div>   
                <div >
                      <div className={styles.selectBoxCss}  id="fhc_createTab_riskProfileSelectBox">
                          <p className={styles.pCss}>3. Risk you can take with your savings and investments</p>
                          <div className={styles.riskLevelDropdownCss}>
                            <Dropdown id="riskLevel" name="riskLevel" width='250px' option={riskLeveldropdownList} initialValue={riskLevel} 
                            onChange={(event) => {this.props.commonUpdateInputValue('aboutMe','riskLevel',event.value);}} />
                          </div>
                          <FontIcon icon="circle-help-solid" className={styles.iconEdit} />
                      </div>                                                                     
                 </div>    
                 <div > 
                      <div className={classNames(styles.choose, styles.clearfix)} id="fhc_createTab_under18AgeRadioBox">
                          <p className={styles.pUnder18YearsCss}>4. Do you have children under 18 years old?</p><div className={styles.redIcon}>*</div>
                            <div className={styles.radioButtonList}>
                                <ul>
                                    <li key="hasChildUnder18">
                                        <label htmlFor="hasChildUnder18" className={styles.radioButtonLabel}>
                                            <RadioButton id="hasChildUnder18" name="hasChildUnder18" value="Y" 
                                                    onChange={(event) => {this.props.changeHasChildUnder18(true);}}
                                                    defaultChecked={hasChildUnder18} />
                                            <span className={styles.labelText}>Yes</span>
                                        </label>
                                    </li>
                                    <li key="noHasChildUnder18">
                                        <label htmlFor="noHasChildUnder18" className={styles.radioButtonLabel}>
                                            <RadioButton id="noHasChildUnder18" name="hasChildUnder18" value="N" 
                                                    onChange={(event) => {this.props.changeHasChildUnder18(false);}} 
                                                    defaultChecked={!hasChildUnder18} />
                                            <span className={styles.labelText}>No</span>
                                        </label>
                                    </li>                                    
                                </ul>
                            </div>
                      </div>                                                                     
                 </div>  
                 {hasChildUnder18 ?  
                 <div id="fhc_createTab_underAge18Panel">
                     <div className={styles.triangle}></div>
                 <div className={styles.under18AgeCss}>     
                    <div >
                        <div  className={styles.haveManyChildreninputBoxCss}  id="fhc_createTab_haveManyChildrenInputBox">
                            <p className={styles.pCss}>a. How many children do you have?</p>
                            <div className={styles.manyChildDiv}>
                                <a href="javascript:;" className={styles.leftIcon} onClick={(event) => {this.props.changeChildrenNo('minus');}} id="fhc_createTab_changeChildrenNo_minus">
                                    <FontIcon icon="minimize" className={styles.iconDown} />
                                </a>
                                <span id="childrenNo" className={styles.childrenNo}>{childrenNo}</span>
                                <a href="javascript:;" className={styles.rightIcon} onClick={(event) => {this.props.changeChildrenNo('add');}} id="fhc_createTab_changeChildrenNo_add">
                                    <FontIcon icon="add" className={styles.iconDown} />
                                </a>
                            </div>
                        </div>                                                                     
                    </div>       
                    <div >
                        <div  className={styles.childrenAgesinputBoxCss}  id="fhc_createTab_childrenAgesInputBox">
                            <p className={styles.pCss}>b. Please tell us how old they are</p>
                            <div className={styles.childrenAgesDiv}>
                                <span className={styles.childSpanWidth}>
                                    <div className={styles.childLabel}>
                                        <span className={styles.capital}>1</span><span className={styles.lower}>st</span><span className={styles.childCss}>child</span>
                                    </div>
                                    <div className={styles.childInputBox}>
                                        <Validated id="yearOfChildrenDOB1_validator"
                                            type={ValidateTypes.RangeValidate}
                                            value={childrenAge1}
                                            tag="FHC_create_from_children_age"
                                            min={0}
                                            max={18}
                                            isRequired={true}
                                            requireErrorMsg="please input value"
                                            rangeErrorMsg="The input number must be between 0 and 18"
                                            onError={(code,msg)=>{
                                            }}
                                            onSuccess={ () => {
                                            } }>
                                            <AmountInput type="integer" data-role="validate" 
                                                placeHolder=""                                           
                                                max={18}
                                                min={0}
                                                maxLength={2} 
                                                symbolVisible={false}                                              
                                                width={'60px'}
                                                value={childrenAge1}
                                                onChange={(value) => {this.props.changeChildrenAge('yearOfChildrenDOB1',value);}}/>
                                        </Validated>
                                    </div>
                                    
                                </span>
                                {childrenNo>1?
                                    <span className={styles.childSpanWidth}>
                                        <div className={styles.childLabel}>
                                            <span className={styles.capital}>2</span><span className={styles.lower}>nd</span><span className={styles.childCss}>child</span>
                                        </div>
                                        <div className={styles.childInputBox}>
                                            <Validated id="yearOfChildrenDOB2_validator"
                                                type={ValidateTypes.RangeValidate}
                                                value={childrenAge2}
                                                tag="FHC_create_from_children_age"
                                                min={0}
                                                max={18}
                                                isRequired={true}
                                                requireErrorMsg="please input value"
                                                rangeErrorMsg="The input number must be between 0 and 18"
                                                onError={(code,msg)=>{
                                                }}
                                                onSuccess={ () => {
                                                } }>
                                                <AmountInput type="integer" data-role="validate" 
                                                    placeHolder=""                                           
                                                    max={18}
                                                    min={0}
                                                    maxLength={2} 
                                                    symbolVisible={false}                                              
                                                    width={'60px'}
                                                    value={childrenAge2}
                                                    onChange={(value) => {this.props.changeChildrenAge('yearOfChildrenDOB2',value);}}/>
                                            </Validated>
                                        </div>
                                    </span>
                                    : ''
                                }
                                {childrenNo>2?
                                    <span className={styles.childSpanWidth}>
                                        <div className={styles.childLabel}>
                                            <span className={styles.capital}>3</span><span className={styles.lower}>rd</span><span className={styles.childCss}>child</span>
                                        </div>
                                        <div className={styles.childInputBox}>
                                            <Validated id="yearOfChildrenDOB3_validator"
                                                type={ValidateTypes.RangeValidate}
                                                value={childrenAge3}
                                                tag="FHC_create_from_children_age"
                                                min={0}
                                                max={18}
                                                isRequired={true}
                                                requireErrorMsg="please input value"
                                                rangeErrorMsg="The input number must be between 0 and 18"
                                                onError={(code,msg)=>{
                                                }}
                                                onSuccess={ () => {
                                                } }>
                                                <AmountInput type="integer" data-role="validate" 
                                                    placeHolder=""                                           
                                                    max={18}
                                                    min={0}
                                                    maxLength={2} 
                                                    symbolVisible={false}                                              
                                                    width={'60px'}
                                                    value={childrenAge3}
                                                    onChange={(value) => {this.props.changeChildrenAge('yearOfChildrenDOB3',value);}}/>
                                            </Validated>
                                        </div>
                                    </span>
                                    : ''
                                }
                                {childrenNo>3?
                                    <span className={styles.childSpanWidth}>
                                        <div className={styles.childLabel}>
                                            <span className={styles.capital}>4</span><span className={styles.lower}>th</span><span className={styles.childCss}>child</span>
                                        </div>
                                        <div className={styles.childInputBox}>
                                            <Validated id="yearOfChildrenDOB4_validator"
                                                type={ValidateTypes.RangeValidate}
                                                value={childrenAge4}
                                                tag="FHC_create_from_children_age"
                                                min={0}
                                                max={18}
                                                isRequired={true}
                                                requireErrorMsg="please input value"
                                                rangeErrorMsg="The input number must be between 0 and 18"
                                                onError={(code,msg)=>{
                                                }}
                                                onSuccess={ () => {
                                                } }>
                                                <AmountInput type="integer" data-role="validate" 
                                                    placeHolder=""                                           
                                                    max={18}
                                                    min={0}
                                                    maxLength={2} 
                                                    symbolVisible={false}                                              
                                                    width={'60px'}
                                                    value={childrenAge4}
                                                    onChange={(value) => {this.props.changeChildrenAge('yearOfChildrenDOB4',value);}}/>
                                            </Validated>
                                        </div>
                                    </span>
                                    : ''
                                }
                                {childrenNo>4?
                                    <span className={styles.childSpanWidth}>
                                        <div className={styles.childLabel}>
                                            <span className={styles.capital}>5</span><span className={styles.lower}>th</span><span className={styles.childCss}>child</span>
                                        </div>
                                        <div className={styles.childInputBox}>
                                            <Validated id="yearOfChildrenDOB5_validator"
                                                type={ValidateTypes.RangeValidate}
                                                value={childrenAge5}
                                                tag="FHC_create_from_children_age"
                                                min={0}
                                                max={18}
                                                isRequired={true}
                                                requireErrorMsg="please input value"
                                                rangeErrorMsg="The input number must be between 0 and 18"
                                                onError={(code,msg)=>{
                                                }}
                                                onSuccess={ () => {
                                                } }>
                                                <AmountInput type="integer" data-role="validate" 
                                                    placeHolder=""                                           
                                                    max={18}
                                                    min={0}
                                                    maxLength={2} 
                                                    symbolVisible={false}                                              
                                                    width={'60px'}
                                                    value={childrenAge5}
                                                    onChange={(value) => {this.props.changeChildrenAge('yearOfChildrenDOB5',value);}}/>
                                            </Validated>
                                        </div>
                                    </span>
                                    : ''
                                }

                            </div>
                        </div>
                        <div className={styles.clearfix}></div>                                                                    
                    </div>  
                    <div>
                        <div  className={styles.attendUniversityinputBoxCss}  id="fhc_createTab_attendUniversitySelectBox">
                            <p className={styles.pCss}>c. Where do you want them to attend university/college?</p>
                                <div className={styles.universityCountryCdeListCss}>
                                            <Validated id="universityCountryCde_validator"
                                                type={ValidateTypes.MandatoryValidate}
                                                value={universityCountryCde}
                                                tag="FHC_create_from_children_age"
                                                errMsg= 'Plase input the value'
                                                onError={(code,msg)=>{
                                                    return <span className={styles.errorMsgCssInLine}>{msg}</span>;
                                                }}
                                                onSuccess={ () => {
                                                } }>                                                                                    
                                                <Dropdown data-role="validate" id="universityCountryCde" name="universityCountryCde" placeholder='Please select a country' width='300px' option={universityCountryCdeList} initialValue={universityCountryCde} 
                                                    onChange={(event) => {this.props.changeUniversityCountryCde(event.value);}} />
                                      </Validated>
                                </div>
                        </div>                                                                     
                    </div>     
                 </div> 
                 </div>: null}                                                                       
               </div> : null}
            </div>
        );
    }
}

export default injectIntl(AboutMe);