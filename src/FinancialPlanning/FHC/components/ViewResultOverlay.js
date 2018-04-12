import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Button from 'wealth/lib/web/components/ui/button';
import styles from './ViewResultOverlayStyle.scss';
import Popup from 'wealth/lib/web/components/widgets/popup';
import {FormattedMessage, injectIntl} from "react-intl";
import AmountText from 'common/components/Input/AmountText';
import CcyAmtDisplayer, {formatCcyAmt} from 'common/components/Output/CcyAmtDisplayer';
import AmCharts from 'amcharts3-react';
import Pie from 'amcharts3/amcharts/pie';

 class ViewResultOverlay extends Component {
    constructor (props) {
        super(props);
        console.log("props view result overlay", props);
        this.startYourPlan = this.startYourPlan.bind(this);
    }

    startYourPlan(overlayType){
        const routers = {
            education:"/group-sfp-war/main/en-gb/goalSimulator/education",
            retirement:"/group-sfp-war/main/en-gb/goalSimulator/retirement",
            lifeCoverage:"/group-sfp-war/main/en-gb/goalSimulator/lifeCoverage",
            criticalIllness:"/group-sfp-war/main/en-gb/goalSimulator/criticalIllness",
            growYourWealth:"/group-sfp-war/main/en-gb/goalSimulator/growYourWealth",
        }
        let target = routers[overlayType];
        console.log("overlayType>>>>", overlayType);
        console.log("router target>>>>", target);
        this.props.router.push(target);
    }

    render () {
        const {intl,customerInfo} = this.props;

        const conf = {
            "type": "pie",
            "theme": "light",
            "valueField": "value",
            "colorField": "color",
            "radius": "40%",
            "innerRadius": "70%",
            labelsEnabled:false,
            balloonText:"",
            startDuration:0,
            pullOutRadius:0,
            outlineAlpha:0
        };
        
        let result = this.props.result;
        let overlayType = this.props.overlayType;
        let youHaveCcyAmt,youStillNeedCcyAmt,yourTargetCcyAmt,currency;
        let extraId,extraValues;
        let priorityText = this.props.priorityText;
        let youHaveColor = "#5C5C5C";

        const chart = Object.assign({},conf);
       
        switch(overlayType){
            case "education":
                currency = result.educationCurrency;
                youHaveCcyAmt = {
                    ccyCode : currency,
                    amt : result.educationAchievedAmt
                };
                youStillNeedCcyAmt = {
                    ccyCode : currency,
                    amt : result.educationRemainAmt
                };
                yourTargetCcyAmt = {
                    ccyCode : currency,
                    amt : result.educationTargetAmt
                };
                extraId = "fhc.result.education.extra";
                extraValues = {
                    extra1: formatCcyAmt(intl, {ccyCode:currency,amt:result.educationAchievedAmt}), 
                    extra2: result.educationRemainYear, 
                    extra3: formatCcyAmt(intl, {ccyCode:currency,amt:result.educationRemainAmt})
                };
                chart.dataProvider = [ {
                    "color": result.educationColor,
                    "value": result.educationAchievedAmt
                },{
                    "color": "#5C5C5C",
                    "value": result.educationRemainAmt
                }];
                youHaveColor = result.educationColor;
                break;
            case "retirement":
                currency = result.retirementCurrency;
                youHaveCcyAmt = {
                    ccyCode : currency,
                    amt : result.retirementAchievedAmt
                };
                youStillNeedCcyAmt = {
                    ccyCode : currency,
                    amt : result.retirementRemainAmt
                };
                yourTargetCcyAmt = {
                    ccyCode : currency,
                    amt : result.retirementTargetAmt
                };
                extraId = "fhc.result.retirement.extra";
                extraValues = {
                    extra1: formatCcyAmt(intl, {ccyCode:currency,amt:result.retirementAchievedAmt}), 
                    extra2: result.retirementRemainYear, 
                    extra3: formatCcyAmt(intl, {ccyCode:currency,amt:result.retirementRemainAmt})
                };
                chart.dataProvider = [ {
                    "color": result.retirementColor,
                    "value": result.retirementAchievedAmt
                },{
                    "color": "#5C5C5C",
                    "value": result.retirementRemainAmt
                }];
                youHaveColor = result.retirementColor;
                break;
            case "criticalIllness":
                currency = result.criticalIllnessCurrency;
                youHaveCcyAmt = {
                    ccyCode : currency,
                    amt : result.criticalIllnessAchievedAmt
                };
                youStillNeedCcyAmt = {
                    ccyCode : currency,
                    amt : result.criticalIllnessRemainAmt
                };
                yourTargetCcyAmt = {
                    ccyCode : currency,
                    amt : result.criticalIllnessTargetAmt
                };
                extraId = "fhc.result.criticalIllness.extra";
                extraValues = {
                    extra1: formatCcyAmt(intl, {ccyCode:currency,amt:result.criticalIllnessAchievedAmt}), 
                    extra2: result.criticalIllnessRemainYear, 
                    extra3: formatCcyAmt(intl, {ccyCode:currency,amt:result.criticalIllnessRemainAmt})
                };
                chart.dataProvider = [ {
                    "color": result.criticalIllnessColor,
                    "value": result.criticalIllnessAchievedAmt
                },{
                    "color": "#5C5C5C",
                    "value": result.criticalIllnessRemainAmt
                }];
                youHaveColor = result.criticalIllnessColor;
                break;
            case "lifeCoverage":
                currency = result.lifeCoverageCurrency;
                youHaveCcyAmt = {
                    ccyCode : currency,
                    amt : result.lifeCoverageAchievedAmt
                };
                youStillNeedCcyAmt = {
                    ccyCode : currency,
                    amt : result.lifeCoverageRemainAmt
                };
                yourTargetCcyAmt = {
                    ccyCode : currency,
                    amt : result.lifeCoverageTargetAmt
                };
                extraId = "fhc.result.lifeCoverage.extra";
                extraValues = {
                    extra1: formatCcyAmt(intl, {ccyCode:currency,amt:result.lifeCoverageAchievedAmt}), 
                    extra2: result.lifeCoverageRemainYear, 
                    extra3: formatCcyAmt(intl, {ccyCode:currency,amt:result.lifeCoverageRemainAmt})
                };
                chart.dataProvider = [ {
                    "color": result.lifeCoverageColor,
                    "value": result.lifeCoverageAchievedAmt
                },{
                    "color": "#5C5C5C",
                    "value": result.lifeCoverageRemainAmt
                }];
                youHaveColor = result.lifeCoverageColor;
                break;
        }

        // TODO: remove 
        overlayType = overlayType || "education";
        extraId = extraId || "fhc.result.education.extra";

        console.log("overlayType", overlayType);
        console.log("youHaveCcyAmt", youHaveCcyAmt);
        console.log("youStillNeedCcyAmt", youStillNeedCcyAmt);
        console.log("yourTargetCcyAmt", yourTargetCcyAmt);
        console.log("extraId", extraId);
        console.log("extraValues", extraValues);

        return (
            <div className={styles.viewResultOverlay}>
            <div className={styles.popContent}>
                <div className={styles.popDetail}>
                    <div>
                        {priorityText}
                        <div className={styles.clearfix} id={"fhc_result_"+overlayType+"Chart"} name={"fhc_result_"+overlayType+"Chart"}>
                            <div className={styles.amPieChart} >
                                <AmCharts.React {...chart} />
                                <FontIcon icon={overlayType} className={styles.iconStyle} />
                            </div>
                            <p className={styles.caption}><FormattedMessage id={"fhc."+overlayType}/></p>
                        </div>
                    </div>
                    <div className={styles.popTable}>
                        <table>
                            <tr>
                                <td><div className={youHaveColor==="#269792"?styles.box_green:(youHaveColor==="#E9A115"?styles.box_orange:(youHaveColor==="#E54D58"?styles.box_red:styles.box_grey))}/><span className={styles.text_div}><FormattedMessage id="fhc.youHave"/></span></td>
                                <td id="you_have_currency_amount"><CcyAmtDisplayer ccyAmtObj={youHaveCcyAmt}/></td>
                            </tr>
                            <tr>
                                <td className={styles.td_middle}><div className={styles.box_grey}/><span className={styles.text_div}><FormattedMessage id="fhc.youStillNeed"/></span></td>
                                <td id="you_still_need_currency_amount"><CcyAmtDisplayer ccyAmtObj={youStillNeedCcyAmt}/></td>
                            </tr>
                            <tr>
                                <td className={styles.td_last_left}><span className={styles.text_youtarget} ><FormattedMessage id="fhc.yourTarget"/></span></td>
                                <td className={styles.td_last_right} id="your_target_currency_amount"><CcyAmtDisplayer ccyAmtObj={yourTargetCcyAmt}/></td>
                            </tr>
                        </table>
                    </div>
                    <div className={styles.popText} id="extra_information">
                        <p><FormattedMessage id={extraId} values={extraValues}/></p>
                    </div>
                    <div>
                        <Button value="Start your plan" theme={styles} onClick={()=>{this.startYourPlan(overlayType);}} />
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default injectIntl(ViewResultOverlay);