import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Accordion,{AccordionTab} from "wealth/lib/web/components/widgets/Accordion";
import styles from './ResultStyle.scss';
import Button from 'wealth/lib/web/components/ui/button';
import PageButtonGroup from 'wealth/lib/web/components/widgets/pageButtonGroup';
import Pagination from 'wealth/lib/web/components/widgets/pagination';
import AmCharts from 'amcharts3-react';
import Pie from 'amcharts3/amcharts/pie';
import {FormattedMessage, injectIntl} from "react-intl";

import ViewResultOverlay from './ViewResultOverlay';
import Popup from 'wealth/lib/web/components/widgets/popup';
import popupStyle from './popup.scss';

import CcyAmtDisplayer, {formatCcyAmt} from 'common/components/Output/CcyAmtDisplayer';
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form';
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';

import { withRouter } from 'react-router';



 class Result extends Component {

    constructor (props) {
        super(props);
        this.state = {
            reorder:'view'
        };
        this.clickReorderPriority = this.clickReorderPriority.bind(this);
        this.clickSavePriorityChanges = this.clickSavePriorityChanges.bind(this);

        this.closeOverlay = this.closeOverlay.bind(this);
        this.receiveRecordDetial = this.receiveRecordDetial.bind(this);
    }

    
    closeOverlay() {
        console.log('Result.closeOverlay.begin');
        this.setState({
            showOverlayFlag: false
        });
        console.log('Result.closeOverlay.end');
    }

    // changeOverlay(param){
    //     console.log('Result.changeOverlay.begin');
    //     this.setState({
    //         overlayType: param
    //     });
    //     console.log('Result.changeOverlay.end'); 
    // }

    receiveRecordDetial(overlayType, priorityText, event) {
        console.log('receiveRecordDetial.start');
        this.setState({
            showOverlayFlag: true,
            overlayType: overlayType,
            priorityText: priorityText
        });
        console.log('receiveRecordDetial.end');
    }

    clickReorderPriority (event) {
         console.log('Result.clickReorderPriority');
         this.setState((preState, props) => {
            return { reorder:'edit' };
        });
    }

    clickSavePriorityChanges (event) {
        let savePriorityResult = this.props.validateByTag("FHC_create_from_priority",(error)=>{
            console.log("CreateTab save Priority err=======:", error);
        });
        console.log('Result.clickSavePriorityChanges');
        this.setState((preState, props) => {
            if(!savePriorityResult){
                return { reorder:'edit' };
            }else{
                return { reorder:'view' };
            }
        });
    }

  componentWillMount() {
      console.log('Result   Component WILL MOUNT! state',this.state);
      console.log('Result   Component WILL MOUNT! props',this.props);
  }
  componentDidMount() {
       console.log('Result   Component DID MOUNT! state',this.state);
       console.log('Result   Component DID MOUNT! props',this.props);
  }
  componentWillReceiveProps(newProps) {
        console.log('Result   Component WILL RECEIVE PROPS! state',this.state);
        console.log('Result   Component WILL RECEIVE PROPS! props',this.props);
        console.log('Result   Component WILL RECEIVE PROPS! new props',newProps);
  }
  shouldComponentUpdate(newProps, newState) {
        return true;
  }
  componentWillUpdate(nextProps, nextState) {
        console.log('Result   Component WILL UPDATE! state',this.state);
        console.log('Result   Component WILL UPDATE! props',this.props);
  }
  componentDidUpdate(prevProps, prevState) {
        console.log('Result   Component DID UPDATE! state',this.state);
        console.log('Result   Component DID UPDATE! props',this.props)
  }
  componentWillUnmount() {
         console.log('Result   Component WILL UNMOUNT! state',this.state);
         console.log('Result   Component WILL UNMOUNT! props',this.props)
  }

    render () {
        const displayPriority = (priority)=>{
            console.log('Result   priority==',priority);
            if(isNaN(priority)||((null!=priority)&&(typeof priority==='string')&&(priority.trim().length<1))){
                return <span>&nbsp;</span>;
            }
            const p = Number(priority);
            switch(p){
                case 1:
                    return (<h2><span className={styles.capital}>1</span><span className={styles.lower}>st</span></h2>);
                case 2:
                    return (<h2><span className={styles.capital}>2</span><span className={styles.lower}>nd</span></h2>);
                case 3:
                    return (<h2><span className={styles.capital}>3</span><span className={styles.lower}>rd</span></h2>);
                default:
                    return (<h2><span className={styles.capital}>{p}</span><span className={styles.lower}>th</span></h2>);
            }
        };
        const reorder = this.state.reorder;
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

        const lifeCoverageChart = Object.assign({},conf);
        lifeCoverageChart.dataProvider = [ {
                "color": this.props.lifeCoverageColor,
                "value": this.props.lifeCoverageAchievedAmt
            }, {
                "color": "#5C5C5C",
                "value": this.props.lifeCoverageRemainAmt
            } ];

        const retirementChart = Object.assign({},conf);
        retirementChart.dataProvider = [ {
                "color": this.props.retirementColor,
                "value": this.props.retirementAchievedAmt
            }, {
                "color": "#5C5C5C",
                "value": this.props.retirementRemainAmt
            } ];

        const criticalIllnessChart = Object.assign({},conf);
        criticalIllnessChart.dataProvider = [ {
                "color": this.props.criticalIllnessColor,
                "value": this.props.criticalIllnessAchievedAmt
            }, {
                "color": "#5C5C5C",
                "value": this.props.criticalIllnessRemainAmt
            } ];

        const educationChart = Object.assign({},conf);
        educationChart.dataProvider = [ {
                "color": this.props.educationColor,
                "value": this.props.educationAchievedAmt
            }, {
                "color": "#5C5C5C",
                "value": this.props.educationRemainAmt
            } ];

        const showOverlayFlag = this.state.showOverlayFlag;
        const overlayType = this.state.overlayType;

        let lifeCoverageCcyAmt = {
            ccyCode : this.props.lifeCoverageCurrency,
            amt : this.props.lifeCoverage || 0
        };

        let criticalIllnessCcyAmt = {
            ccyCode : this.props.criticalIllnessCurrency,
            amt : this.props.criticalIllness || 0
        };

        let retirementCcyAmt = {
            ccyCode : this.props.retirementCurrency,
            amt : this.props.retirement || 0
        };

        let educationCcyAmt = {
            ccyCode : this.props.educationCurrency,
            amt : this.props.education || 0
        };

        let totalCoverageGapCcyAmt = {
            ccyCode : this.props.totalCoverageGapCcy,
            amt: this.props.totalCoverageGapAmt || 0
        }

        let totalSavingGapCcyAmt = {
            ccyCode : this.props.totalSavingGapCcy,
            amt: this.props.totalSavingGapAmt || 0
        }

        let expanded = this.props.expanded;

        return (
            <div className={styles.yourResult}>
                    <h4>
                        <div className={styles.title}><FormattedMessage id="fhc.healthResult"/></div>
                        <div href="javascript:;" className={styles.icon} 
                            onClick={(event) => {this.props.commonUpdateInputValue('result','expanded',!expanded);}}>
                            {expanded ? <FontIcon icon="chevron-up-small" className={styles.iconDown} /> : <FontIcon icon="chevron-down-small" className={styles.iconDown} />}
                        </div>
                    </h4>
                    {expanded ?
                    <div className={styles.resultContent}>
                        <div className={styles.contentTheme}>
                            <div className={styles.themeDate}><FormattedMessage id="fhc.dateLastModified"/>01/12/2018</div>
                            <div className={styles.chartDescription}>
                                <div className={styles.chartGreen}>
                                    <Button value="" className={styles.greenBox}/>
                                    <span className={styles.well}><FormattedMessage id="fhc.wellPrepared"/></span>
                                </div>
                                <div className={styles.chartOrange}>
                                    <Button value="" className={styles.orangeBox}/>
                                    <span className={styles.well}><FormattedMessage id="fhc.keepGoing"/></span>
                                </div>
                                <div className={styles.chartRed}>
                                    <Button value="" className={styles.redBox}/>
                                    <span className={styles.well}><FormattedMessage id="fhc.needsMoreAttention"/></span>
                                </div>
                            </div>
                            <div className={styles.chartContent}>
                                <div className={styles.chartHeader}>
                                    <div>
                                        <FontIcon icon="circle-help-solid" className={styles.iconHelp} /><span><FormattedMessage id="fhc.calculated"/></span>
                                    </div>
                                    <div className={styles.headerRight}>
                                        {
                                            reorder=='view'?
                                            <a href="javascript:;" onClick={this.clickReorderPriority}>
                                                <FontIcon icon="switch" className={styles.iconSwitch} /><span><FormattedMessage id="fhc.reorderPriority"/></span>
                                            </a>
                                            :
                                            <a href="javascript:;" onClick={this.clickSavePriorityChanges}>
                                                <FontIcon icon="save" className={styles.iconSwitch} /><span><FormattedMessage id="fhc.savePriorityChanges"/></span>
                                            </a>
                                        }
                                        
                                    </div>
                                </div>
                                <div className={styles.chartMain}>
                                    <ul className={styles.clearfix}>

                                        <li id="fhc_createTab_educationChart">
                                            <div className={styles.prioritySection}>
                                                {reorder=='view'?
                                                    displayPriority(this.props.educationPriority)
                                                    :
                                                        <Validated id="result_educationPriority_validator"
                                                            type={ValidateTypes.RangeValidate}
                                                            value={this.props.educationPriority}
                                                            tag="FHC_create_from_priority"
                                                            min={1}
                                                            max={8}
                                                            isRequired={true}
                                                            requireErrorMsg="please input value"
                                                            rangeErrorMsg="The input number must be between 0 and 8"
                                                            onError={(code,msg)=>{
                                                                return <span className={styles.errorMessage}>{msg}</span>;
                                                            }}
                                                            onSuccess={ () => {
                                                            } }>
                                                            <AmountInput type="integer" data-role="validate" 
                                                                placeHolder=""                                           
                                                                max={8}
                                                                min={1}
                                                                maxLength={1} 
                                                                theme={styles}
                                                                symbolVisible={false}                                              
                                                                width={'30px'}
                                                                value={this.props.educationPriority}
                                                                onChange={(event) => {this.props.commonUpdateInputValue('result','educationPriority',event);}}/>
                                                        </Validated>
                                                }
                                            </div>
                                            <div name="fhc_createTab_educationDiv">
                                                <div className={styles.amPieChart} >
                                                    <AmCharts.React {...educationChart} />
                                                    <FontIcon icon="education" className={styles.iconStyle} />
                                                </div>
                                                <p className={styles.caption}><FormattedMessage id="fhc.education"/></p>
                                            </div>
                                            <div>
                                                <span onClick={this.receiveRecordDetial.bind(this, "education", displayPriority(this.props.educationPriority))} data-popupRef="ResultOverlay" > 
                                                    <FontIcon icon="pop-up-window" className={styles.iconDown} />
                                                </span>
                                            </div>
                                        </li>

                                        <li id="fhc_createTab_retirementChart">
                                            <div className={styles.prioritySection}>
                                                {reorder=='view'?
                                                    displayPriority(this.props.retirementPriority)
                                                    :
                                                    <Validated id="result_retirementPriority_validator"
                                                        type={ValidateTypes.RangeValidate}
                                                        value={this.props.retirementPriority}
                                                        tag="FHC_create_from_priority"
                                                        min={1}
                                                        max={8}
                                                        isRequired={true}
                                                        requireErrorMsg="please input value"
                                                        rangeErrorMsg="The input number must be between 0 and 8"
                                                        onError={(code,msg)=>{
                                                            return <span className={styles.errorMessage}>{msg}</span>;
                                                        }}
                                                        onSuccess={ () => {
                                                        } }>
                                                        <AmountInput type="integer" data-role="validate" 
                                                            placeHolder=""                                           
                                                            max={8}
                                                            min={1}
                                                            maxLength={1} 
                                                            theme={styles}
                                                            symbolVisible={false}                                              
                                                            width={'30px'}
                                                            value={this.props.retirementPriority}
                                                            onChange={(event) => {this.props.commonUpdateInputValue('result','retirementPriority',event);}}/>
                                                    </Validated>
                                                }
                                            </div>
                                            <div name="fhc_createTab_retirementDiv">
                                                <div className={styles.amPieChart}>
                                                    <AmCharts.React {...retirementChart} />
                                                    <FontIcon icon="insurance" className={styles.iconStyle} />
                                                </div>
                                                <p className={styles.caption}><FormattedMessage id="fhc.retirement"/></p>
                                            </div>
                                            <div>
                                                <span onClick={this.receiveRecordDetial.bind(this, "retirement", displayPriority(this.props.retirementPriority))} data-popupRef="ResultOverlay" > 
                                                    <FontIcon icon="pop-up-window" className={styles.iconDown} />
                                                </span>
                                            </div>
                                        </li>

                                        <li id="fhc_createTab_lifeCoverageChart" >
                                            <div className={styles.prioritySection}>
                                                {reorder=='view'?
                                                    displayPriority(this.props.lifeCoveragePriority)
                                                    :
                                                    <Validated id="result_lifeCoveragePriority_validator"
                                                        type={ValidateTypes.RangeValidate}
                                                        value={this.props.lifeCoveragePriority}
                                                        tag="FHC_create_from_priority"
                                                        min={1}
                                                        max={8}
                                                        isRequired={true}
                                                        requireErrorMsg="please input value"
                                                        rangeErrorMsg="The input number must be between 0 and 8"
                                                        onError={(code,msg)=>{
                                                            return <span className={styles.errorMessage}>{msg}</span>;
                                                        }}
                                                        onSuccess={ () => {
                                                        } }>
                                                        <AmountInput type="integer" data-role="validate" 
                                                            placeHolder=""                                           
                                                            max={8}
                                                            min={1}
                                                            maxLength={1} 
                                                            theme={styles}
                                                            symbolVisible={false}                                              
                                                            width={'30px'}
                                                            value={this.props.lifeCoveragePriority}
                                                            onChange={(event) => {this.props.commonUpdateInputValue('result','lifeCoveragePriority',event);}}/>
                                                    </Validated>
                                                }
                                            </div>
                                            <div name="fhc_createTab_lifeCoverageDiv">
                                                <div className={styles.amPieChart}>
                                                    <AmCharts.React {...lifeCoverageChart} />
                                                    <FontIcon icon="insurance" className={styles.iconStyle} />
                                                </div>
                                                <p className={styles.caption}><FormattedMessage id="fhc.lifeCoverage"/></p>
                                            </div>
                                            <div>
                                                <span onClick={this.receiveRecordDetial.bind(this, "lifeCoverage", displayPriority(this.props.lifeCoveragePriority))} data-popupRef="ResultOverlay" > 
                                                    <FontIcon icon="pop-up-window" className={styles.iconDown} />
                                                </span>
                                            </div>
                                        </li>

                                        <li id="fhc_createTab_criticalIllnessChart">
                                            <div className={styles.prioritySection}>
                                                {reorder=='view'?
                                                    displayPriority(this.props.criticalIllnessPriority)
                                                    :
                                                    <Validated id="result_criticalIllnessPriority_validator"
                                                        type={ValidateTypes.RangeValidate}
                                                        value={this.props.criticalIllnessPriority}
                                                        tag="FHC_create_from_priority"
                                                        min={1}
                                                        max={8}
                                                        isRequired={true}
                                                        requireErrorMsg="please input value"
                                                        rangeErrorMsg="The input number must be between 0 and 8"
                                                        onError={(code,msg)=>{
                                                            return <span className={styles.errorMessage}>{msg}</span>;
                                                        }}
                                                        onSuccess={ () => {
                                                        } }>
                                                        <AmountInput type="integer" data-role="validate" 
                                                            placeHolder=""                                           
                                                            max={8}
                                                            min={1}
                                                            maxLength={1} 
                                                            theme={styles}
                                                            symbolVisible={false}                                              
                                                            width={'30px'}
                                                            value={this.props.criticalIllnessPriority}
                                                            onChange={(event) => {this.props.commonUpdateInputValue('result','criticalIllnessPriority',event);}}/>
                                                    </Validated>                                                    
                                                }
                                            </div>
                                            <div name="fhc_createTab_criticalIllnessDiv">
                                                <div className={styles.amPieChart}>
                                                    <AmCharts.React {...criticalIllnessChart} />
                                                    <FontIcon icon="insurance" className={styles.iconStyle} />
                                                </div>
                                                <p className={styles.caption}><FormattedMessage id="fhc.criticalIllness"/></p>
                                            </div>
                                            <div>
                                                <span onClick={this.receiveRecordDetial.bind(this, "criticalIllness", displayPriority(this.props.criticalIllnessPriority))} data-popupRef="ResultOverlay" > 
                                                    <FontIcon icon="pop-up-window" className={styles.iconDown} />
                                                </span>
                                            </div>
                                        </li>

                                        <li id="fhc_createTab_growYourWealthChart">
                                            <div className={styles.prioritySection}>
                                                {reorder=='view'?
                                                    displayPriority(this.props.growYourWealthPriority)
                                                    :
                                                    <Validated id="result_growYourWealthPriority_validator"
                                                        type={ValidateTypes.RangeValidate}
                                                        value={this.props.growYourWealthPriority}
                                                        tag="FHC_create_from_priority"
                                                        min={1}
                                                        max={8}
                                                        isRequired={true}
                                                        requireErrorMsg="please input value"
                                                        rangeErrorMsg="The input number must be between 0 and 8"
                                                        onError={(code,msg)=>{
                                                            return <span className={styles.errorMessage}>{msg}</span>;
                                                        }}
                                                        onSuccess={ () => {
                                                        } }>
                                                        <AmountInput type="integer" data-role="validate" 
                                                            placeHolder=""                                           
                                                            max={8}
                                                            min={1}
                                                            maxLength={1} 
                                                            theme={styles}
                                                            symbolVisible={false}                                              
                                                            width={'30px'}
                                                            value={this.props.growYourWealthPriority}
                                                            onChange={(event) => {this.props.commonUpdateInputValue('result','growYourWealthPriority',event);}}/>
                                                    </Validated>   
                                                }
                                            </div>
                                            <div name="fhc_createTab_growYourWealthDiv">
                                                <p className={styles.picture}>
                                                    <span className={styles.circle}></span>
                                                    <FontIcon icon="savings" className={styles.iconStyle} /> 
                                                </p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.growYourWealth"/></p>
                                            </div>
                                        </li>

                                        <li id="fhc_createTab_legacyChart">
                                            <div className={styles.prioritySection}>
                                                {reorder=='view'?
                                                    displayPriority(this.props.legacyPriority)
                                                    :
                                                    <Validated id="result_legacyPriority_validator"
                                                        type={ValidateTypes.RangeValidate}
                                                        value={this.props.legacyPriority}
                                                        tag="FHC_create_from_priority"
                                                        min={1}
                                                        max={8}
                                                        isRequired={true}
                                                        requireErrorMsg="please input value"
                                                        rangeErrorMsg="The input number must be between 0 and 8"
                                                        onError={(code,msg)=>{
                                                            return <span className={styles.errorMessage}>{msg}</span>;
                                                        }}
                                                        onSuccess={ () => {
                                                        } }>
                                                        <AmountInput type="integer" data-role="validate" 
                                                            placeHolder=""                                           
                                                            max={8}
                                                            min={1}
                                                            maxLength={1} 
                                                            theme={styles}
                                                            symbolVisible={false}                                              
                                                            width={'30px'}
                                                            value={this.props.legacyPriority}
                                                            onChange={(event) => {this.props.commonUpdateInputValue('result','legacyPriority',event);}}/>
                                                    </Validated>   
                                                }
                                            </div>
                                            <div name="fhc_createTab_legacyDiv">
                                                <p className={styles.picture}>
                                                    <span className={styles.circle}></span>
                                                    <FontIcon icon="survey" className={styles.iconStyle} />
                                                </p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.legacy"/></p>
                                            </div>
                                        </li>

                                        <li id="fhc_createTab_propertyChart">
                                            <div className={styles.prioritySection}>
                                                {reorder=='view'?
                                                    displayPriority(this.props.propertyPriority)
                                                    :
                                                    <Validated id="result_propertyPriority_validator"
                                                        type={ValidateTypes.RangeValidate}
                                                        value={this.props.propertyPriority}
                                                        tag="FHC_create_from_priority"
                                                        min={1}
                                                        max={8}
                                                        isRequired={true}
                                                        requireErrorMsg="please input value"
                                                        rangeErrorMsg="The input number must be between 0 and 8"
                                                        onError={(code,msg)=>{
                                                            return <span className={styles.errorMessage}>{msg}</span>;
                                                        }}
                                                        onSuccess={ () => {
                                                        } }>
                                                        <AmountInput type="integer" data-role="validate" 
                                                            placeHolder=""                                           
                                                            max={8}
                                                            min={1}
                                                            maxLength={1} 
                                                            theme={styles}
                                                            symbolVisible={false}                                              
                                                            width={'30px'}
                                                            value={this.props.propertyPriority}
                                                            onChange={(event) => {this.props.commonUpdateInputValue('result','propertyPriority',event);}}/>
                                                    </Validated>  
                                                }
                                            </div>
                                            <div name="fhc_createTab_propertyDiv">
                                                <p className={styles.picture}>
                                                    <span className={styles.circle}></span>
                                                    <FontIcon icon="assets" className={styles.iconStyle} />
                                                </p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.property"/></p>
                                            </div>
                                        </li>
                                        
                                         <li id="fhc_createTab_healthChart">
                                             <div className={styles.prioritySection}>
                                                {reorder=='view'?
                                                    displayPriority(this.props.healthPriority)
                                                    :
                                                    <Validated id="result_healthPriority_validator"
                                                        type={ValidateTypes.RangeValidate}
                                                        value={this.props.healthPriority}
                                                        tag="FHC_create_from_priority"
                                                        min={1}
                                                        max={8}
                                                        isRequired={true}
                                                        requireErrorMsg="please input value"
                                                        rangeErrorMsg="The input number must be between 0 and 8"
                                                        onError={(code,msg)=>{
                                                            return <span className={styles.errorMessage}>{msg}</span>;
                                                        }}
                                                        onSuccess={ () => {
                                                        } }>
                                                        <AmountInput type="integer" data-role="validate" 
                                                            placeHolder=""                                           
                                                            max={8}
                                                            min={1}
                                                            maxLength={1} 
                                                            theme={styles}
                                                            symbolVisible={false}                                              
                                                            width={'30px'}
                                                            value={this.props.healthPriority}
                                                            onChange={(event) => {this.props.commonUpdateInputValue('result','healthPriority',event);}}/>
                                                    </Validated>                                                      
                                                }
                                            </div>
                                            <div name="fhc_createTab_healthDiv">
                                                <p className={styles.picture}>
                                                    <span className={styles.circle}></span>
                                                    <FontIcon icon="health" className={styles.iconStyle} />
                                                </p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.health"/></p>
                                            </div>
                                        </li>

                                        
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.resultSummary}>
                            <h3 className={styles.title}><FormattedMessage id="fhc.summary"/></h3>
                            <div className={styles.summaryContent}>
                                <div className={styles.coverageTable}>
                                    <table>
                                        <tr>
                                            <th><FormattedMessage id="fhc.items"/></th>
                                            <th><FormattedMessage id="fhc.coverageGap"/></th>
                                        </tr>
                                        <tr>
                                            <td><FormattedMessage id="fhc.lifeCoverage"/></td>
                                            <td id="life_coverage_currency_amount"><CcyAmtDisplayer ccyAmtObj={lifeCoverageCcyAmt}/></td>
                                        </tr>
                                        <tr>
                                            <td><FormattedMessage id="fhc.criticalIllness"/></td>
                                            <td id="critical_illness_currency_amount"><CcyAmtDisplayer ccyAmtObj={criticalIllnessCcyAmt}/></td>
                                        </tr>
                                        <tr>
                                            <td><FormattedMessage id="fhc.totalGap"/></td>
                                            <td id="total_coverage_gap_currency_amount"><CcyAmtDisplayer ccyAmtObj={totalCoverageGapCcyAmt}/></td>
                                        </tr>
                                    </table>
                                </div>
                                <div className={styles.savingTable}>
                                    <table>
                                        <tr>
                                            <th><FormattedMessage id="fhc.items"/></th>
                                            <th><FormattedMessage id="fhc.savingGap"/></th>
                                        </tr>
                                        <tr>
                                            <td><FormattedMessage id="fhc.retirement"/></td>
                                            <td id="retirement_currency_amount"><CcyAmtDisplayer ccyAmtObj={retirementCcyAmt}/></td>
                                        </tr>
                                        <tr>
                                            <td><FormattedMessage id="fhc.education"/></td>
                                            <td id="education_currency_amount"><CcyAmtDisplayer ccyAmtObj={educationCcyAmt}/></td>
                                        </tr>
                                        <tr>
                                            <td><FormattedMessage id="fhc.totalGap"/></td>
                                            <td id="total_saving_gap_currency_amount"><CcyAmtDisplayer ccyAmtObj={totalSavingGapCcyAmt}/></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className={styles.comment}>
                                <h3 className={styles.title}>Comments</h3>
                                <Textarea theme={styles} value={this.props.comments} id="comments" name="comments"
                                 onChange={(event) => {this.props.commonUpdateInputValue('result',event.target.name,event.target.value);}}/> 
                            </div>
                        </div>
                    </div>
                    : null}

                    <Popup theme={styles} popupRef="ResultOverlay" hideOnOverlayClick show={showOverlayFlag} onHide={this.closeOverlay}>
                        <ViewResultOverlay 
                            closeOverlay={this.closeOverlay} 
                            customerInfo={this.props.customerInfo} 
                            result={this.props}
                            overlayType={this.state.overlayType}
                            priorityText={this.state.priorityText}
                            router={this.props.router}
                        />
                    </Popup>

               </div>
        );
    }
}

export default withRouter(injectIntl(Result));