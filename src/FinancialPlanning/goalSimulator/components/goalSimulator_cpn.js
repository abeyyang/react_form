import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Notification from 'wealth/lib/web/components/ui/notification';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import classNames from 'classnames';
import {FormattedMessage, injectIntl} from "react-intl";
import Tab from 'wealth/lib/web/components/widgets/tab';
import Popup from 'wealth/lib/web/components/widgets/popup';
import { browserHistory } from 'react-router';
import styles from './goalSimulator.scss';
import Retirement from './retirement_cpn';
import Education from './education_cpn';
import GrowYourWealth from './growYourWealth_cpn';
import CriticalIllness from './criticalIllness_cpn';
import LifeCoverage from './lifeCoverage_cpn';
import InitialResult from './initialResult_cpn';

class goalSimulator extends Component {
    constructor (props) {
        super(props);
        let sectionFlag = {
            retirement:false,
            education:false,
            growYourWealth:false,
            criticalIllness:false,
            lifeCoverage:false
        }
        sectionFlag[this.props.params.goalType || "growYourWealth"] = true;  //default show grow your wealth
        this.state = {
            showTopTabs:"topTab0",
            showTopTabsValue:this.props.params.goalType || "growYourWealth",
            showSection: sectionFlag
        };
        console.log("parameters from route: ", this.props.params.goalType);
        console.log("parameters from route: ", this.state.showSection);
        this.props.initData();
    }

    componentWillReceiveProps(newProps) {
        console.log('goalSimulator Component WILL RECEIVE PROPS! state',this.state);
        console.log('goalSimulator Component WILL RECEIVE PROPS! props',this.props);
        console.log('goalSimulator Component WILL RECEIVE PROPS! new props',newProps);
        let newShowSection = {
            retirement:false,
            education:false,
            growYourWealth:false,
            criticalIllness:false,
            lifeCoverage:false
        };
        newShowSection[newProps.params.goalType || "growYourWealth"] = true;
        this.setState({
            showSection : newShowSection,
            showTopTabsValue : newProps.params.goalType || "growYourWealth"
        });
        console.log("parameters from route: ", this.state.showSection);
    }

    goToFHC(){
        console.log('go to FHC');
        const target = '/group-sfp-war/main/en-gb/fhc';
        browserHistory.push(target)
    }

    render () {
        const showTopTabs = this.state.showTopTabs;
        const showTopTabsValue = "goalSimulator." + this.state.showTopTabs + "." + this.state.showTopTabsValue;

        console.log("value of tab value: ", showTopTabsValue);
        const showRetirement = this.state.showSection.retirement;
        const showEducation = this.state.showSection.education;
        const showGrowYourWealth = this.state.showSection.growYourWealth;
        const showCriticalIllness = this.state.showSection.criticalIllness;
        const showLifeCoverage = this.state.showSection.lifeCoverage;


        const topTabs = [
            { title: this.props.intl.formatMessage({id: showTopTabsValue}) },
            { title: ""},
            { title: ""}
        ];

        return (
            <div className={styles.bodyBackground}>

                <div className={styles.mainBackground}>
                    <div className={styles.header}>
                        <div className={styles.MainTiltle}>
                            <div className={styles[showTopTabs]}><Tab tabs={topTabs} theme={styles} /></div>
                            <h5 className={styles.tiltle}><FormattedMessage id="goalSimulator.shortfallAnalysis"/></h5>
                        </div>
                    </div>

                    {showRetirement? <Retirement calculateResult={this.props.calculateResult} 
                                                 calculatePlanningYourRetirementAct={this.props.calculatePlanningYourRetirementAct}
                                                 fhcDetail={this.props.fhcDetail}
                                                 fieldsDetail={this.props.fieldsDetail}
                                                 updateFieldsDetail={this.props.updateFieldsDetail}/> : null}
                    {showEducation? <Education/> : null}
                    {showGrowYourWealth? <GrowYourWealth calculateResult={this.props.calculateResult}
                                                         fieldsDetail={this.props.fieldsDetail}
                                                         calculateGrowingYourWealthAct={this.props.calculateGrowingYourWealthAct}
                                                         updateFieldsDetail={this.props.updateFieldsDetail}/> : null}
                    {showCriticalIllness? <CriticalIllness/> : null}
                    {showLifeCoverage? <LifeCoverage
                                            fieldsDetail={this.props.fieldsDetail}
                                            calculateRiskCapacityAct={this.props.calculateRiskCapacityAct}/> : null}
                    
                    <div className={styles.readyToStart}>
                        <div>
                            <div className={styles.textStyle}>
                                <p className={styles.pStyle}><FormattedMessage id="goalSimulator.pageBottom.Ptext1"/></p>
                                <p className={styles.spanStyle}><FormattedMessage id="goalSimulator.pageBottom.Ptext2"/></p>
                            </div>
                            <div className={styles.buttonStyle}>
                                <a id="button-investment"><FormattedMessage id="goalSimulator.button.investment"/></a>
                                <a id="button-insurance"><FormattedMessage id="goalSimulator.button.insurance"/></a>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <div className={styles.back}>
                            <a href="javascript:;" onClick={this.goToFHC}>
                                <FontIcon icon="chevron-left" className={styles.icon} />
                                <FormattedMessage id="goalSimulator.backToFHC"/>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default injectIntl(goalSimulator)