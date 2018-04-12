import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import {FormattedMessage, injectIntl} from "react-intl";
import styles from './initialResult.scss';
import FormatHelper from 'common/lib/formatHelper';
import AmCharts from 'amcharts3-react';
import Pie from 'amcharts3/amcharts/pie';
import Serial from 'amcharts3/amcharts/serial';
import exportStyle from 'amcharts3/amcharts/plugins/export';
import { AmountDisplay, Textarea, Dropdown, DropdownItem, YesNoButton, ScrollTab, Checkbox, MultiSelect, AmountInput, RadioButton } from 'CommonUI/Form'
import { Input, SelectButton } from 'wealth/lib/web/components/ui/form'
import UIStyles from './ui.scss';

import Popup from 'wealth/lib/web/components/widgets/popup';

// layout of outter pie chart
const configOutterPie = {
    "type": "pie",
    "theme": "light",
    "valueField": "value",
    "colorField": "color",
    "radius": 102,
    "innerRadius": 82,
    "labelsEnabled": false,
    "startDuration": 0,
    "pullOutRadius": 0,
    "outlineThickness": 0,
    "export": {
        "enabled": false
    },
};

// layout of inner pie chart
const configInnerPie = {
    "type": "pie",
    "theme": "light",
    "valueField": "value",
    "colorField": "color",
    "radius": 80,
    "innerRadius": 60,
    "labelsEnabled": false,
    "startDuration": 0,
    "pullOutRadius": 0,
    "outlineThickness": 0,
    "export": {
        "enabled": false
    },
};

// theme of different goal type
const goalThemes = {
    "retirement": {
        pieChartBaseColor: "#D7D8D6",
        pieChartInnerColor: "#E9A115",
        pieChartOutterColor: "#376798",
        pieChartTitle: "Your retirement plan",
    },
    "education": {
        pieChartBaseColor: "#D7D8D6",
        pieChartInnerColor: "#269792",
        pieChartOutterColor: "#376798",
        pieChartTitle: "Your education plan",
    }
  };


export default class initialResult extends Component {
    constructor (props) {
        super(props);
        const data = props.data;
        this.state = {
          isShowPopup: false,
          initialTargetAmount: data.initialTargetAmount,
          initialCompletedAmount: data.initialCompletedAmount,
          projectedTargetAmount: data.projectedTargetAmount,
          projectedCompletedAmount: data.projectedCompletedAmount,
          extraMonthlySavingAmount: data.extraMonthlySavingAmount,
          goalType: props.goalType,
        };

    }

    componentWillReceiveProps(nextProps) {
      const data = nextProps.data;
      this.setState ({
        initialTargetAmount: data.initialTargetAmount,
        initialCompletedAmount: data.initialCompletedAmount,
        projectedTargetAmount: data.projectedTargetAmount,
        projectedCompletedAmount: data.projectedCompletedAmount,
        extraMonthlySavingAmount: data.extraMonthlySavingAmount,
        goalType: nextProps.goalType,
      });
    }

    render () {
        const {initialTargetAmount, initialCompletedAmount, projectedTargetAmount, projectedCompletedAmount, extraMonthlySavingAmount, goalType} = this.state;
        const {isShowPopup} = this.state;
        const goalTheme = goalThemes[goalType];
        const innerData = {
          "dataProvider": [ {
              "value": initialCompletedAmount.amount,
              "color": goalTheme.pieChartInnerColor
          }, {
              "value": initialTargetAmount.amount-initialCompletedAmount.amount,
              "color": goalTheme.pieChartBaseColor
          }],
        };

        // default data for plotting outter pie chart
        let outterData  = {
          "dataProvider": [ {
              "value": 0,
              "color": goalTheme.pieChartOutterColor
          }, {
              "value": 1,
              "color": goalTheme.pieChartBaseColor
          }],
        };

        let isProjected = false;
        // presummed that if projection calculated, below three props should not be empty
        if (projectedTargetAmount && projectedTargetAmount && extraMonthlySavingAmount) {
          isProjected = true;
        }

        if (isProjected) {
          outterData = {
           "dataProvider": [ {
               "value": projectedCompletedAmount.amount,
               "color": goalTheme.pieChartOutterColor
           }, {
               "value": projectedTargetAmount.amount-projectedCompletedAmount.amount,
               "color": goalTheme.pieChartBaseColor
           }],
         };
        }

        return (
            <div className={styles.root}>
              <div className={styles.bodyBackground}>
                  <div className={styles.mainBackground}>

                      <div className={styles.charts}>
                        <div className={styles.chartdiv}><AmCharts.React {...configInnerPie} {...innerData} /></div>
                        <div className={styles.chartdiv}><AmCharts.React {...configOutterPie} {...outterData} /></div>
                        <div className={styles.chartdiv}>
                          <div className={styles.chartTitle}>{goalTheme.pieChartTitle}</div>
                        </div>
                      </div> {/*charts*/}

                      <div className={styles.initialDiv}>
                        <div className={styles.title} style={{borderColor:goalTheme.pieChartInnerColor}}><FormattedMessage id="goalSimulator.initialResult.L_initial_results"/></div>
                        <div className={styles.field}>
                          <div><FormattedMessage id="goalSimulator.initialResult.L_initial_target_amount"/></div>
                          <div className={styles.amount}>{initialTargetAmount.currencyCode} {FormatHelper.addThousandSeparator(initialTargetAmount.amount)}</div>
                        </div>
                        <div className={styles.buttonDiv}>
                          <div className={styles.button} onClick={(event) => this.showPopup()} data-popupRef="ResultOverlay"><FormattedMessage id="goalSimulator.initialResult.L_view_plan"/></div>
                        </div>
                      </div> {/*initialDiv*/}

                      <div className={styles.afterDiv}>
                        <div className={styles.title}><FormattedMessage id="goalSimulator.initialResult.L_after_making_changes"/></div>
                        {isProjected?
                          <div>
                            <div className={styles.field}>
                              <div><FormattedMessage id="goalSimulator.initialResult.L_new_target_amount"/></div>
                              <div className={styles.amount}>{projectedTargetAmount.currencyCode} {FormatHelper.addThousandSeparator(projectedTargetAmount.amount)}</div>
                            </div>
                            <div className={styles.field}>
                              <div><FormattedMessage id="goalSimulator.initialResult.L_extra_monthly_savings_required"/></div>
                              <div className={styles.amount}>{extraMonthlySavingAmount.currencyCode} {FormatHelper.addThousandSeparator(extraMonthlySavingAmount.amount)}</div>
                            </div>
                          </div>
                        : <div className={styles.message}><FormattedMessage id="goalSimulator.initialResult.L_use_simulator"/></div>}
                      </div> {/*afterDiv*/}

                  </div> {/*mainBackground*/}
              </div> {/*bodyBackground*/}

              <Popup theme={styles} popupRef="ResultOverlay" hideOnOverlayClick show={isShowPopup} onHide={()=>this.hidePopup()}>
                  <div className={styles.overlayDiv}>
                    <p>******************Under construction******************</p>
                    <div className={styles.title}>Edit retirement plan</div>
                    <p className={styles.question}>1. I am currently</p>
                    <div className={styles.answer}>
                       <Input htmlAttributes={{maxLength:5, style: {width: "40px"}}} name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" theme={UIStyles} value="28"/>
                       <span>years old</span>
                    </div>
                    <p className={styles.question}>2. I would like to retire when I am...</p>
                    <div className={styles.answer}>
                      <Input htmlAttributes={{maxLength:5, style: {width: "40px"}}} name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" theme={UIStyles} value="60"/>
                      <span>years old</span>
                    </div>
                    <p className={styles.question}>3. My estimated monthly expenses in my retirement is...</p>
                    <div className={styles.answer}><AmountInput symbol="USD"  value="6000" /> </div>
                    <p className={styles.question}>4. Amount saved for retirement so far</p>
                    <div className={styles.answer}><AmountInput symbol="USD"  value="6000" /> </div>
                    <p className={styles.question}>5. Have you started legacy planning ?</p>
                    <div className={styles.answer}>
                      <div className={styles.radioCheck}>
                        <YesNoButton
                            name="yesno"
                            defaultYesNo={false}
                            labels={['yes', 'no']}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                      </div>
                    </div>
                    <hr/>
                    <div className={styles.subtitle}>Assumptions</div>
                    <div className={styles.question}>
                      Like most people of a working age, you expect to retire at the age of 65 and hope to live until you re 81, after enjoying <Input htmlAttributes={{maxLength:5, style: {width: "40px"}}} name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" theme={UIStyles} value="28"/> years of retirement.
                    </div>
                    <div className={styles.question}>You ll have monthly expenses of <AmountInput symbol="USD"  value={this.state.testValue} /> when you retire.</div>
                    <hr/>
                  </div>
              </Popup>
            </div>
        );
    } //render

    showPopup () {
      this.setState({
        isShowPopup: true,
      });
    }

    hidePopup () {
      console.log("hidehide");
      this.setState({
        isShowPopup: false,
      });
    }

}
