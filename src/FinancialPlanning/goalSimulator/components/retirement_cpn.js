import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import {FormattedMessage, injectIntl} from "react-intl";
import styles from './retirement.scss';
import AmCharts from 'amcharts3-react';
import Pie from 'amcharts3/amcharts/pie';
import Serial from 'amcharts3/amcharts/serial';
import exportStyle from 'amcharts3/amcharts/plugins/export';

import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form'
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';
import Form, { Input, SelectButton} from 'wealth/lib/web/components/ui/form';
import InitialResult from './initialResult_cpn';
import AmSerialCharts from './amSerialCharts_cpn';

export default class retirement extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
       this.calculate = this.calculate.bind(this);
    }

    calculate (event) {
         console.log('calculatePlanningYourRetirementAct ... ');
         this.props.calculatePlanningYourRetirementAct();

    }

    render () {
        const data = {
                    initialTargetAmount: {currencyCode: "HKD", amount: 80800},
                    initialCompletedAmount: {currencyCode: "HKD", amount: 30003},
                    projectedTargetAmount: {currencyCode: "HKD", amount: 101},
                    //projectedTargetAmount: null,
                    projectedCompletedAmount: {currencyCode: "HKD", amount: 22},
                    extraMonthlySavingAmount: {currencyCode: "HKD", amount: 5200},
                };
        const planData = {
                    currentAge: 28,
                    retireAge: 60,
                    monthlyExpenses: {currencyCode: "HKD", amount: 6000},
                    currentSaving: {currencyCode: "HKD", amount: 6000},
                    legacyPlan: false,
                    modelRetireAge: 65,
                    liveUntil: 81
                };
    
        const noDataProvider = this.state.noDataProvider;

        return (
            
            <div className={styles.bodyBackground}>
                <div className={styles.middleMainBackground}>
                    <div className={styles.mainBackground}>

                        {/* render pie chart section*/}
                        <InitialResult
                            data={data}
                            planData={planData}
                            goalType="retirement"
                        />

                        {/* render fields section*/}
                        <div className={styles.fieldsDiv}>
                            <h5 className={styles.makingChanges}><FormattedMessage id="goalSimulator.making.changes"/></h5>
                            <div className={styles.tiltleDesc}><FormattedMessage id="goalSimulator.growYourWealth.titleDesc"/></div>

                            <div className={styles.field}>
                                <h2 className={styles.label}><FormattedMessage id="goalSimulator.lumpsum"/></h2>
                                <AmountInput id="lumpSumAmount" name="lumpSumAmount" type="decimal" width={'260px'} value="" />
                            </div>
                            <div className={styles.field}>
                                <h2 className={styles.label}><FormattedMessage id="goalSimulator.monthly"/></h2>
                                <AmountInput id="monthlyInvestedAmount" name="monthlyInvestedAmount" type="decimal" width={'260px'} value="" />
                            </div>

                            <div className={styles.calculateBtn}>
                                <a id="calculate-button" onClick={this.calculate}><FormattedMessage id="goalSimulator.calculate" /></a>
                            </div>
                        </div>
                        
                        {/* render line chart section*/}
                        <AmSerialCharts calculateResult={this.props.calculateResult} />
                    </div>
                </div>
            </div>
        );
    }
}
