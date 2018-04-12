import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import {FormattedMessage, injectIntl} from "react-intl";
import styles from './growYourWealth.scss';
import AmCharts from 'amcharts3-react';
import Pie from 'amcharts3/amcharts/pie';
import Serial from 'amcharts3/amcharts/serial';
import exportStyle from 'amcharts3/amcharts/plugins/export';

import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form'
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';
import Form, { Input, SelectButton} from 'wealth/lib/web/components/ui/form';
import AmSerialCharts from './amSerialCharts_cpn';

export default class growYourWealth extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
       this.calculate = this.calculate.bind(this);
    }

    calculate (event) {
         console.log('calculateGrowingYourWealthAct ... ');
         console.log('lumpSumAmount ... ' + this.props.fieldsDetail.lumpSumAmount);
         console.log('monthlyInvestedAmount ... ' + this.props.fieldsDetail.monthlyInvestedAmount);
         console.log('targetAmount ... ' + this.props.fieldsDetail.targetAmount);
         console.log('yearOfInvestment ... ' + this.props.fieldsDetail.yearOfInvestment);
         console.log('riskLevelSelected ... ' + this.props.fieldsDetail.riskLevelSelected);

         this.props.calculateGrowingYourWealthAct();
         this.props.updateFieldsDetail( {noDataProvider : false} );
    }

    render () {
        
        return (
            
            <div className={styles.bodyBackground}>
                <div className={styles.middleMainBackground}>
                    <div className={styles.mainBackground}>
                        
                        {/* render fields section*/}
                        <div className={styles.fieldsDiv}>
                            <h5 className={styles.makingChanges}><FormattedMessage id="goalSimulator.making.changes"/></h5>
                            <h5 className={styles.tiltle}><FormattedMessage id="goalSimulator.growYourWealth.title"/></h5>
                            <div className={styles.tiltleDesc}><FormattedMessage id="goalSimulator.growYourWealth.titleDesc"/></div>

                            <div className={styles.field}>
                                <h2 className={styles.label}><FormattedMessage id="goalSimulator.lumpsum"/></h2>
                                <AmountInput id="lumpSumAmount" name="lumpSumAmount" type="decimal" width={'260px'} 
                                             value={this.props.fieldsDetail.lumpSumAmount} 
                                             onChange = { (value) => { this.props.updateFieldsDetail( {lumpSumAmount : value} ); } } />
                            </div>
                            <div className={styles.field}>
                                <h2 className={styles.label}><FormattedMessage id="goalSimulator.monthly"/></h2>
                                <AmountInput id="monthlyInvestedAmount" name="monthlyInvestedAmount" type="decimal" width={'260px'} 
                                             value={this.props.fieldsDetail.monthlyInvestedAmount} 
                                             onChange = { (value) => { this.props.updateFieldsDetail( {monthlyInvestedAmount : value} ); } } />
                            </div>
                            <div className={styles.field}>
                                <h2 className={styles.label}><FormattedMessage id="goalSimulator.targetAmount"/></h2>
                                <AmountInput id="targetAmount" name="targetAmount" type="decimal" width={'260px'} 
                                             value={this.props.fieldsDetail.targetAmount} 
                                             onChange = { (value) => { this.props.updateFieldsDetail( {targetAmount : value} ); } } />
                            </div>
                            <div className={styles.clear}>
                                <div className={styles.field}>
                                    <h2 className={styles.label}><FormattedMessage id="goalSimulator.yearOfInvestment"/></h2>
                                    <AmountInput id="yearOfInvestment" name="yearOfInvestment" type="integer" symbolVisible={false} max={30} min={1} minLength={1} maxLength={2}
                                                 placeHolder="" width={'60px'} theme={styles}
                                                 value={this.props.fieldsDetail.yearOfInvestment} 
                                                 onChange = { (value) => { this.props.updateFieldsDetail( {yearOfInvestment : value} ); } } />
                                    <h2 className={styles.years}><FormattedMessage id="goalSimulator.fieldYears"/></h2>
                                </div>
                                <div className={styles.field}>
                                    <h2 className={styles.label}><FormattedMessage id="goalSimulator.riskLeveAt"/></h2>
                                    <Dropdown id="riskLeveDropdown" name="riskLeveDropdown" width={'300px'} option={this.props.fieldsDetail.riskLevelList}
                                              initialValue={this.props.fieldsDetail.riskLevelSelected}
                                              onChange = { (selectedObj, index) => { this.props.updateFieldsDetail( {riskLevelSelected : selectedObj.value} ); } } />
                                </div>

                                <div className={styles.calculateBtn}>
                                    <a id="calculate-button" onClick={this.calculate}><FormattedMessage id="goalSimulator.calculate" /></a>
                                </div>
                            </div>
                        </div>
                        
                        {/* render line chart section*/}
                        <AmSerialCharts calculateResult={this.props.calculateResult} noDataProvider={this.props.fieldsDetail.noDataProvider}/>
                    </div>
                </div>
            </div>
        );
    }
}
