import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './GrowYourWealthStyle.scss';
import {FormattedMessage, FormattedHTMLMessage,injectIntl} from "react-intl";
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form';
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';

class GrowYourWealth extends Component {
    render () {
        console.log('growYourWealth==================',this.props);
        let {hasShortTermInvest,shortTermInvestDetail,hasMortgageProperty,hasNoMortgageProperty,hasRentProperty,hasOverseaProperty,expanded} = this.props;     

        return (
            <div className={styles.panel} id="fhc_createTab_growYourWealth">
                <h3> 
                    <div className={styles.title}><FormattedMessage id="fhc.create.growYourWealth.title"/>
                    </div>
                    <div href="javascript:;" className={styles.icon} id="fhc_createTab_growYourWealth_showFlag"
                        onClick={(event) => {this.props.commonUpdateInputValue('growYourWealth','expanded',!expanded);}}>
                         {expanded ? <FontIcon icon="chevron-up-small" className={styles.iconDown} /> : <FontIcon icon="chevron-down-small" className={styles.iconDown} />}
                    </div>    
                </h3>
                 {expanded ? <div className={classNames(styles.results, styles.clearfix)} id="fhc_createTab_growYourWealth_panel">
                    <div className={styles.lineCss}></div>  
                      <div className={classNames(styles.choose, styles.clearfix)} id="fhc_createTab_growYourWealth_target">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.growYourWealth.target"/><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></p>
                        <div className={styles.radioButtonList}>
                            <ul>
                                        <li key="hasShortTermInvest">
                                            <label htmlFor="hasShortTermInvest" className={styles.radioButtonLabel}>
                                                <RadioButton id="hasShortTermInvest" name="hasShortTermInvest" value="Y" 
                                                onChange={(event) => {this.props.commonUpdateInputValue('growYourWealth',event.target.name,event.target.value);}} 
                                                defaultChecked={hasShortTermInvest == 'Y' ? true : false} />
                                                <span className={styles.labelText}><FormattedMessage id="fhc.yes"/></span>
                                            </label>
                                        </li>
                                        <li key="noShortTermInvest">
                                            <label htmlFor="noShortTermInvest" className={styles.radioButtonLabel}>
                                                <RadioButton id="noShortTermInvest" name="hasShortTermInvest" value="N" 
                                                onChange={(event) => {this.props.commonUpdateInputValue('growYourWealth',event.target.name,event.target.value);}} 
                                                defaultChecked={hasShortTermInvest == 'N' ? true : false} />
                                                <span className={styles.labelText}><FormattedMessage id="fhc.no"/></span>
                                            </label>
                                        </li>                                    
                            </ul>
                        </div>
                      </div> 
                     {hasShortTermInvest=='Y' ?  
                        <div>
                            <div className={styles.triangle}></div>
                            <div className={styles.shortTermInvestDetailPanel}>   
                                <div >
                                    <div  id="fhc_createTab_growYourWealth_shortTermInvestDetail" className={styles.shortTermInvestDetailDiv}>
                                        <p className={styles.pCss}><FormattedMessage id="fhc.create.growYourWealth.shortTermInvestDetail"/><FontIcon icon="circle-help-solid" className={styles.iconEdit} /></p>
                                        <Textarea theme={styles}  value={shortTermInvestDetail} id="shortTermInvestDetail" name="shortTermInvestDetail"
                                        onChange={(event) => {this.props.commonUpdateInputValue('growYourWealth',event.target.name,event.target.value);}}/>                             
                                    </div>                                                                     
                                </div>        
                            </div> 
                            </div>: null}   

                    <div className={styles.inputBoxCss}  id="fhc_createTab_growYourWealth_homeProperties">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.growYourWealth.homeProperties"/></p>  
                        <div className={styles.checkboxList}>
                            <ul>
                                <li>
                                    <label htmlFor="hasMortgageProperty">
                                        <Checkbox id="hasMortgageProperty" name="hasMortgageProperty" 
                                         checkedIcon='agree' uncheckedIcon='' value="hasMortgageProperty" isChecked={hasMortgageProperty=='Y'} theme={styles} onChange={(event) => {this.props.commonUpdateInputValue('growYourWealth',event.target.name,hasMortgageProperty=='Y'? 'N':'Y');}}  />
                                        <span className={styles.checkBoxfontCss}><FormattedMessage id="fhc.MortgageProperty"/></span>
                                    </label>
                                </li>     
                                <li>
                                    <label htmlFor="hasNoMortgageProperty">
                                        <Checkbox id="hasNoMortgageProperty" name="hasNoMortgageProperty" 
                                        checkedIcon='agree' uncheckedIcon='' value="hasNoMortgageProperty" isChecked={hasNoMortgageProperty=='Y'} theme={styles}  onChange={(event) => {this.props.commonUpdateInputValue('growYourWealth',event.target.name,hasNoMortgageProperty=='Y'? 'N':'Y');}}  />
                                        <span className={styles.checkBoxfontCss}><FormattedMessage id="fhc.NoMortgageProperty"/></span>
                                    </label>
                                </li> 
                                <li>
                                    <label htmlFor="hasRentProperty">
                                        <Checkbox id="hasRentProperty" name="hasRentProperty" 
                                        checkedIcon='agree' uncheckedIcon='' value="hasRentProperty" isChecked={hasRentProperty=='Y'} theme={styles} onChange={(event) => {this.props.commonUpdateInputValue('growYourWealth',event.target.name,hasRentProperty=='Y'? 'N':'Y');}}  />
                                        <span className={styles.checkBoxfontCss}><FormattedMessage id="fhc.RentProperty"/></span>
                                    </label>
                                </li>                                                                                
                            </ul>
                        </div>                            
                    </div>
                      <div className={classNames(styles.choose, styles.clearfix)} id="fhc_createTab_growYourWealth_overseaProperties">
                        <p className={styles.pCss}><FormattedMessage id="fhc.create.growYourWealth.overseaProperties"/></p>
                        <div className={styles.radioButtonList}>
                            <ul>
                                        <li key="hasOverseaProperty">
                                            <label htmlFor="hasOverseaProperty" className={styles.radioButtonLabel}>
                                                <RadioButton id="hasOverseaProperty" name="hasOverseaProperty" value="Y" 
                                                onChange={(event) => {this.props.commonUpdateInputValue('growYourWealth',event.target.name,event.target.value);}} 
                                                defaultChecked={hasOverseaProperty == 'Y' ? true : false} />
                                                <span className={styles.labelText}><FormattedMessage id="fhc.yes"/></span>
                                            </label>
                                        </li>
                                        <li key="noOverseaProperty">
                                            <label htmlFor="noOverseaProperty" className={styles.radioButtonLabel}>
                                                <RadioButton id="noOverseaProperty" name="hasOverseaProperty" value="N" 
                                                onChange={(event) => {this.props.commonUpdateInputValue('growYourWealth',event.target.name,event.target.value);}} 
                                                defaultChecked={hasOverseaProperty == 'N' ? true : false} />
                                                <span className={styles.labelText}><FormattedMessage id="fhc.no"/></span>
                                            </label>
                                        </li>                                    
                            </ul>
                        </div>
                      </div> 
               </div> : null}                                           
            </div>
        );
    }
}
export default injectIntl(GrowYourWealth,{withRef: true});