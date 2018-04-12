import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Accordion, { AccordionTab } from "wealth/lib/web/components/widgets/Accordion";
import Button from 'wealth/lib/web/components/ui/button';
import styles from './fhcSummarystyle.scss';
import Notification from 'wealth/lib/web/components/ui/notification';
import AmCharts from 'amcharts3-react';
import Pie from 'amcharts3/amcharts/pie';
import { FormattedMessage, injectIntl } from "react-intl";
import CcyAmtDisplayer, { formatCcyAmt } from 'common/components/Output/CcyAmtDisplayer';
import Popup from 'wealth/lib/web/components/widgets/popup';
import popupStyle from './popup.scss';
import ViewRecordDetialOverlay from '../../../FHC/components/ViewRecordDetialOverlay';

export default class financialHealthCheck extends Component {
    constructor(props) {
        console.log("props", props);
        super(props);

        const {
            lifeCoveragePriority,
            retirementPriority,
            criticalIllnessPriority,
            educationPriority,
            legacyPriority,
            propertyPriority,
            healthPriority,
            growYourWealthPriority
        } = props.overlayData.result;

        this.state = {
            isShow: false,
            reorder: 'view',
            showOverlayFlag: false,
            lifeCoveragePriority,
            retirementPriority,
            criticalIllnessPriority,
            educationPriority,
            legacyPriority,
            propertyPriority,
            healthPriority,
            growYourWealthPriority
        };
        this.clickReorderPriority = this.clickReorderPriority.bind(this);
        this.clickSavePriorityChanges = this.clickSavePriorityChanges.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.show = this.show.bind(this);
        this.goToFhcPageHandle = this.goToFhcPageHandle.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);

        this.goToFHCViewRecordsTab = this.goToFHCViewRecordsTab.bind(this);
    }

    closeOverlay() {
        console.log('OfflineRecords.closeOverlay.begin');
        this.setState({
            showOverlayFlag: false
        });
        console.log('OfflineRecords.closeOverlay.end');
    }

    show() {
        this.setState((preState, props) => {
            return { isShow: !preState.isShow };
        });
    }


    goToFHCViewRecordsTab() {
        console.log('Go to ViewRecordTab');
        const target = '/group-sfp-war/main/en-gb/fhc';
        this.props.fhcInitViewRecordTab();
        browserHistory.push(target);
    }

    goToFhcPageHandle() {
        const target = '/group-sfp-war/main/en-gb/fhc';
        //this.props.router.push(target);
        browserHistory.push(target);
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    clickReorderPriority(event) {
        // console.log('Result.clickReorderPriority');

        this.setState((preState, props) => {
            return { reorder: 'edit' };
        });
    }

    clickSavePriorityChanges(event) {
        console.log('Result.clickSavePriorityChanges');

        let finhckId = this.props.overlayData.finhckId;
        let calculationDto = this.props.overlayData.calculationDto;
        console.log("calculationDto", calculationDto);

        const {
            lifeCoveragePriority,
            retirementPriority,
            criticalIllnessPriority,
            educationPriority,
            legacyPriority,
            propertyPriority,
            healthPriority,
            growYourWealthPriority
        } = this.state;

        let updatePriorityObject = {
            lifeCoveragePriority,
            retirementPriority,
            criticalIllnessPriority,
            educationPriority,
            legacyPriority,
            propertyPriority,
            healthPriority,
            growYourWealthPriority
        }


        let params = {
            finhckId,
            calculationDto,
            updatePriorityObject

        };

        this.props.savePriorityChanges(params);
        this.setState((preState, props) => {
            return { reorder: 'view' };
        });
    }

    receiveRecordDetial(record, event) {
        console.log("record", record);
        // let record = {financialHcDate: financialHcDate};
        this.props.receiveRecordDetial(record);
        this.setState({
            showOverlayFlag: true
        });
        console.log('receiveRecordDetial.end');

    }


    componentWillMount() {
        console.log('initFhcSummary init....');
        this.props.initFhcSummary();
    }


    componentWillReceiveProps(newProps) {
        if (JSON.stringify(newProps.overlayData) === JSON.stringify(this.props.overlayData)) {
            return;
        }
        const {
            lifeCoveragePriority,
            retirementPriority,
            criticalIllnessPriority,
            educationPriority,
            legacyPriority,
            propertyPriority,
            healthPriority,
            growYourWealthPriority
        } = newProps.overlayData.result;

        this.setState({
            lifeCoveragePriority,
            retirementPriority,
            criticalIllnessPriority,
            educationPriority,
            legacyPriority,
            propertyPriority,
            healthPriority,
            growYourWealthPriority
        });
        console.log("componentWillReceiveProps", newProps);
    }

    render() {
        const displayPriority = (priority) => {
            console.log('Result   priority==', priority);
            if (isNaN(priority) || ((null != priority) && (typeof priority === 'string') && (priority.trim().length < 1)) || null == priority) {
                return <span>&nbsp;</span>;
            }
            const p = Number(priority);
            switch (p) {
                case 1:
                    return (<h2><span name="priority_index" className={styles.capital}>1</span><span className={styles.lower}>st</span></h2>);
                case 2:
                    return (<h2><span name="priority_index" className={styles.capital}>2</span><span className={styles.lower}>nd</span></h2>);
                case 3:
                    return (<h2><span name="priority_index" className={styles.capital}>3</span><span className={styles.lower}>rd</span></h2>);
                default:
                    return (<h2><span name="priority_index" className={styles.capital}>{p}</span><span className={styles.lower}>th</span></h2>);
            }
        };
        const reorder = this.state.reorder;
        const {showOverlayFlag} = this.state;
        const {overlayData, intl, financialFHcObj, fhcOverlayData, haveFHCRecord} = this.props;
        const isShow = this.state.isShow;


        const conf = {
            "type": "pie",
            "theme": "light",
            "valueField": "value",
            "colorField": "color",
            "radius": "40%",
            "innerRadius": "70%",
            labelsEnabled: false,
            balloonText: "",
            startDuration: 0,
            pullOutRadius: 0,
            outlineAlpha: 0
        };

        const lifeCoverageChart = Object.assign({}, conf);
        lifeCoverageChart.dataProvider = [{
            "color": overlayData.result.lifeCoverageColor,
            "value": overlayData.result.lifeCoverageAchievedAmt
        }, {
            "color": "#5C5C5C",
            "value": overlayData.result.lifeCoverageRemainAmt
        }];

        const retirementChart = Object.assign({}, conf);
        retirementChart.dataProvider = [{
            "color": overlayData.result.retirementColor,
            "value": overlayData.result.retirementAchievedAmt
        }, {
            "color": "#5C5C5C",
            "value": overlayData.result.retirementRemainAmt
        }];

        const educationChart = Object.assign({}, conf);
        educationChart.dataProvider = [{
            "color": overlayData.result.educationColor,
            "value": overlayData.result.educationAchievedAmt
        }, {
            "color": "#5C5C5C",
            "value": overlayData.result.educationRemainAmt
        }];

        const criticalIllnessChart = Object.assign({}, conf);
        criticalIllnessChart.dataProvider = [{
            "color": overlayData.result.criticalIllnessColor,
            "value": overlayData.result.criticalIllnessAchievedAmt
        }, {
            "color": "#5C5C5C",
            "value": overlayData.result.criticalIllnessRemainAmt
        }];




        return (

            <div className={styles.fhcSummary} id="fhc_summary_tab">
                
                    <div className={classNames(styles.tilte, styles.clearfix)} >

                        <div className={styles.pirorities} id="view_fhc_summary_overlay">
                            <p className={styles.title}><a href="javascript:;" onClick={this.receiveRecordDetial.bind(this, financialFHcObj)} data-popupRef="offlineRecordDetialOverlay" >Financial health check summary<FontIcon icon="chevron-right" className={classNames(styles.icon, styles.viewEdit)} /></a></p>
                            <p className={styles.date}><FormattedMessage id="fhc.dateLastModified" />{financialFHcObj.financialHcDate}</p>
                        </div>
                        <div className={styles.rightContent}>
                            <p>
                                <span className={styles.well}><i>&nbsp;</i><FormattedMessage id="fhc.wellPrepared" /></span>
                                <span className={styles.keep}><i>&nbsp;</i><FormattedMessage id="fhc.keepGoing" /></span>
                                <span className={styles.need}><i>&nbsp;</i><FormattedMessage id="fhc.needsMoreAttention" /></span>
                            </p>
                        </div>
                        <div className={styles.chartContent}>

                            <div className={styles.chartHeader}>
                                <div>
                                    <FontIcon icon="circle-help-solid" className={styles.iconHelp} /><span><FormattedMessage id="fhc.calculated" /></span>
                                </div>
                                <div className={styles.headerRight}>
                                    <a href="javascript:;" onClick={this.goToFHCViewRecordsTab} id="fhc_summary_view_recordTab" > <FontIcon icon="pop-up-window" className={styles.iconWindow} />&nbsp;<FormattedMessage id="fhc.viewRecords" /></a>
                                    &nbsp;&nbsp;|&nbsp;&nbsp;
                                    {
                                        reorder == 'view' ?
                                            <a href="javascript:;" onClick={this.clickReorderPriority} id="fhc_summary_reorder_priority">
                                                <FontIcon icon="switch" className={styles.iconSwitch} /><span><FormattedMessage id="fhc.reorderPriority" /></span>
                                            </a>
                                            :
                                            <a href="javascript:;" onClick={this.clickSavePriorityChanges} id="fhc_summary_save_priority">
                                                <FontIcon icon="save" className={styles.iconSwitch} /><span><FormattedMessage id="fhc.savePriorityChanges" /></span>
                                            </a>
                                    }

                                </div>
                            </div>
                            <div className={styles.chartMain}>
                                <ul className={styles.clearfix}>
                                    <li id="fhc_summary_educationChart">
                                        <div className={styles.prioritySection}>
                                            {reorder == 'view' ?
                                                displayPriority(this.state.educationPriority)
                                                :
                                                <input type="text" name="educationPriority" value={this.state.educationPriority} onChange={this.handleInputChange} />
                                            }
                                        </div>
                                        <div id="fhc_summary_educationDiv">
                                            <div className={styles.amPieChart} >
                                                <AmCharts.React {...educationChart} />
                                                <FontIcon icon="education" className={styles.iconStyle} />
                                            </div>
                                            <p className={styles.caption}><FormattedMessage id="fhc.education" /></p>
                                        </div>
                                        <div>
                                            <a href="javascript:;"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
                                        </div>
                                    </li>

                                    <li id="fhc_summary_retirementChart">
                                        <div className={styles.prioritySection}>
                                            {reorder == 'view' ?
                                                displayPriority(this.state.retirementPriority)
                                                :
                                                <input type="text" name="retirementPriority" value={this.state.retirementPriority} onChange={this.handleInputChange} />
                                            }
                                        </div>
                                        <div id="fhc_summary_retirementDiv">
                                            <div className={styles.amPieChart}>
                                                <AmCharts.React {...retirementChart} />
                                                <FontIcon icon="insurance" className={styles.iconStyle} />
                                            </div>
                                            <p className={styles.caption}><FormattedMessage id="fhc.retirement" /></p>
                                        </div>
                                        <div>
                                            <a href="javascript:;"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
                                        </div>
                                    </li>

                                    <li id="fhc_summary_lifeCoverageChart" >
                                        <div className={styles.prioritySection}>
                                            {reorder == 'view' ?
                                                displayPriority(this.state.lifeCoveragePriority)
                                                :
                                                <input type="text" name="lifeCoveragePriority" value={this.state.lifeCoveragePriority} onChange={this.handleInputChange} />
                                            }
                                        </div>
                                        <div id="fhc_summary_lifeCoverageDiv">
                                            <div className={styles.amPieChart}>
                                                <AmCharts.React {...lifeCoverageChart} />
                                                <FontIcon icon="insurance" className={styles.iconStyle} />
                                            </div>
                                            <p className={styles.caption}><FormattedMessage id="fhc.lifeCoverage" /></p>
                                        </div>
                                        <div>
                                            <a href="javascript:;" data-popupRef="LifeCoverageDetail"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
                                        </div>
                                    </li>

                                    <li id="fhc_summary_criticalIllnessChart">
                                        <div className={styles.prioritySection}>
                                            {reorder == 'view' ?
                                                displayPriority(this.state.criticalIllnessPriority)
                                                :
                                                <input type="text" name="criticalIllnessPriority" value={this.state.criticalIllnessPriority} onChange={this.handleInputChange} />
                                            }
                                        </div>
                                        <div id="fhc_summary_criticalIllnessDiv">
                                            <div className={styles.amPieChart}>
                                                <AmCharts.React {...criticalIllnessChart} />
                                                <FontIcon icon="insurance" className={styles.iconStyle} />
                                            </div>
                                            <p className={styles.caption}><FormattedMessage id="fhc.criticalIllness" /></p>
                                        </div>
                                        <div>
                                            <a href="javascript:;"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
                                        </div>
                                    </li>

                                    <li id="fhc_summary_growYourWealthChart">
                                        <div className={styles.prioritySection}>
                                            {reorder == 'view' ?
                                                displayPriority(this.state.growYourWealthPriority)
                                                :
                                                <input type="text" name="growYourWealthPriority" value={this.state.growYourWealthPriority} onChange={this.handleInputChange} />
                                            }
                                        </div>
                                        <div id="fhc_summary_growYourWealthDiv">
                                            <p className={styles.picture}>
                                                <span className={styles.circle}></span>
                                                <FontIcon icon="savings" className={styles.iconStyle} />
                                            </p>
                                            <p className={styles.caption}><FormattedMessage id="fhc.growYourWealth" /></p>
                                        </div>
                                    </li>

                                    <li id="fhc_summary_legacyChart">
                                        <div className={styles.prioritySection}>
                                            {reorder == 'view' ?
                                                displayPriority(this.state.legacyPriority)
                                                :
                                                <input type="text" name="legacyPriority" value={this.state.legacyPriority} onChange={this.handleInputChange} />
                                            }
                                        </div>
                                        <div id="fhc_summary_legacyDiv">
                                            <p className={styles.picture}>
                                                <span className={styles.circle}></span>
                                                <FontIcon icon="survey" className={styles.iconStyle} />
                                            </p>
                                            <p className={styles.caption}><FormattedMessage id="fhc.legacy" /></p>
                                        </div>
                                    </li>

                                    <li id="fhc_summary_propertyChart">
                                        <div className={styles.prioritySection}>
                                            {reorder == 'view' ?
                                                displayPriority(this.state.propertyPriority)
                                                :
                                                <input type="text" name="propertyPriority" value={this.state.propertyPriority} onChange={this.handleInputChange} />
                                            }
                                        </div>
                                        <div id="fhc_summary_propertyDiv">
                                            <p className={styles.picture}>
                                                <span className={styles.circle}></span>
                                                <FontIcon icon="assets" className={styles.iconStyle} />
                                            </p>
                                            <p className={styles.caption}><FormattedMessage id="fhc.property" /></p>
                                        </div>
                                    </li>

                                    <li id="fhc_summary_healthChart">
                                        <div className={styles.prioritySection}>
                                            {reorder == 'view' ?
                                                displayPriority(this.state.healthPriority)
                                                :
                                                <input type="text" name="healthPriority" value={this.state.healthPriority} onChange={this.handleInputChange} />
                                            }
                                        </div>
                                        <div id="fhc_summary_healthDiv">
                                            <p className={styles.picture}>
                                                <span className={styles.circle}></span>
                                                <FontIcon icon="health" className={styles.iconStyle} />
                                            </p>
                                            <p className={styles.caption}><FormattedMessage id="fhc.health" /></p>
                                        </div>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                   


                {/*<div className={styles.notification}>
                        <Notification theme={styles} type="info">
                            <p>New client record found. Updated as of 01/07/2017</p>
                            <div className={styles.view}>
                                <a onClick={this.receiveRecordDetial.bind(this,financialHcDate)}  data-popupRef="offlineRecordDetialOverlay" >View FHC record</a>
                            </div>
                        </Notification>
                    </div>*/}

                <Popup theme={popupStyle} popupRef="offlineRecordDetialOverlay" hideOnOverlayClick show={showOverlayFlag} onHide={this.closeOverlay}>
                    <ViewRecordDetialOverlay closeOverlay={this.closeOverlay} customerInfo={this.props.customerInfo} overlayData={fhcOverlayData} />
                </Popup>

            </div>
        );
    }
}
