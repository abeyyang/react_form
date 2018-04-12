import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import {FormattedMessage, injectIntl} from "react-intl";
import styles from './amSerialCharts.scss';
import AmCharts from 'amcharts3-react';
import Pie from 'amcharts3/amcharts/pie';
import Serial from 'amcharts3/amcharts/serial';
import exportStyle from 'amcharts3/amcharts/plugins/export';

import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form'
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';
import Form, { Input, SelectButton} from 'wealth/lib/web/components/ui/form';
const SCREEN_BREAK_POINTS = ["FULL", "TABLET", "MOBILE"];

export default class amSerialCharts extends Component {
    constructor (props) {
        super(props);
        this.state = {
            expanded:false,
            noDataProvider: this.props.noDataProvider,
            lumpSumAmount: 6000,
            targetAmount: 50000.000,
            graphData: [],
            uiStatePeriod: '',
            maximumBalance: '',
            minimumBalance: '',
            averageBalance: '',
            contributionBalance: '',
            lastDataPoint: {}
        };
       this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    toggleExpanded () {
        this.setState((preState, props) => {
            return { expanded:!preState.expanded };
        });

        if (!this.state.expanded) {
            document.getElementById("disclaimer-content").style.display = "block";
            var zoomWindow = parseInt(window.getComputedStyle(document.getElementById("chart-div")).getPropertyValue("height"), 10);
            var disclaimerContent = parseInt(window.getComputedStyle(document.getElementById("disclaimer-content")).getPropertyValue("height"), 10);
            console.log('zoomWindow ... ' + zoomWindow);
            console.log('disclaimerContent ... ' + disclaimerContent);
            document.getElementById("chart-div").style.height = (zoomWindow + disclaimerContent) + "px";

        } else {
            document.getElementById("chart-div").style.height = "430px";
            document.getElementById("disclaimer-content").style.display = "none";
        }
    }

    componentWillReceiveProps(newProps) {
        console.log('----- componentWillReceiveProps -------');
        let graphDataObj = generateGraphData.call(this, newProps.calculateResult, this.state.lumpSumAmount, this.state.targetAmount);

        if (graphDataObj.data && graphDataObj.lastDataPoint) {
            this.state.graphData= graphDataObj.data;
            this.state.uiStatePeriod = graphDataObj.lastDataPoint.year;
            this.state.maximumBalance = graphDataObj.lastDataPoint.maxValue;
            this.state.minimumBalance = graphDataObj.lastDataPoint.minValue;
            this.state.averageBalance = graphDataObj.lastDataPoint.average;
            this.state.contributionBalance = graphDataObj.lastDataPoint.contribution;
            this.state.lastDataPoint = graphDataObj.lastDataPoint;
        }
        /*this.state.graphData= [{
                    "year": "2017",
                    "contribution": 10000,
                    "minValue" 10000,
                    "maxValue": 10000
                }, {
                    "year": "2018",
                    "contribution": 15000,
                    "minValue" 14000,
                    "maxValue": 16000
                }, {
                    "year": "2019",
                    "contribution": 25000,
                    "minValue" 22000,
                    "maxValue": 28000
                }, {
                    "year": "2020",
                    "contribution": 35000,
                    "minValue" 30000,
                    "maxValue": 35000
                }, {
                    "year": "2021",
                    "contribution": 45000,
                    "minValue" 40000,
                    "maxValue": 47000
                }, {
                    "year": "2022",
                    "contribution": 55000,
                    "minValue" 52000,
                    "maxValue": 58000
                }, {
                    "year": "2023",
                    "contribution": 65000,
                    "minValue" 53000,
                    "maxValue": 69000
                }, {
                    "year": "2024",
                    "contribution": 75000,
                    "minValue" 63000,
                    "maxValue": 79000
                }, {
                    "year": "2025",
                    "contribution": 85000,
                    "minValue" 73000,
                    "maxValue": 90000
                }, {
                    "year": "2026",
                    "contribution": 95000,
                    "minValue" 86000,
                    "maxValue": 110000
                }, {
                    "year": "2027",
                    "contribution": 105000,
                    "minValue" 95000,
                    "maxValue": 130000,
                    "target": 180000    //dynamically put  the target amount to last 2 points
                }, {
                    "year": "2028"      //this is a dummy point added dynamically
                }];*/
            this.state.noDataProvider = newProps.noDataProvider
    }

    //perform rounding on amounts
    performAmountRounding(amount) {
        if (amount > 5000) {
        return (Math.floor(amount / 100) * 100);
        } else if (amount > 100) {
        return (Math.floor(amount / 50) * 50);
        } else {
        return (Math.floor(amount / 25) * 25);
        }
    }

    setZoomAttributes() {
        //debugger;
        var average = this.performAmountRounding(this.state.averageBalance);
        var maxValue = this.performAmountRounding(this.state.maximumBalance);
        var minValue = this.performAmountRounding(this.state.minimumBalance);
        var contribution = this.performAmountRounding(this.state.contributionBalance);
        //console.log('average ... ' + average);
        //console.log('maxValue ... ' + maxValue);
        //console.log('minValue ... ' + minValue);
        //console.log('contribution ... ' + contribution);

        //set window position
        var windowRadius = parseInt(window.getComputedStyle(document.getElementById("zoom-window")).getPropertyValue("height"), 10) / 2;

        var upperDotRadius = parseInt(window.getComputedStyle(document.getElementById("zoom-upper-dot")).getPropertyValue("width"), 10) / 2;
        var lowerDotRadius = parseInt(window.getComputedStyle(document.getElementById("zoom-lower-dot")).getPropertyValue("width"), 10) / 2;
        var centerDotRadius = parseInt(window.getComputedStyle(document.getElementById("zoom-center-dot")).getPropertyValue("width"), 10) / 2;
        var upperDotMaxPosition = 2 * windowRadius * 0.12 + upperDotRadius;
        var lowerDotMaxPosition = 2 * windowRadius * 0.8 + lowerDotRadius;

        var centerDotTop = window.getComputedStyle(document.getElementById("zoom-center-dot")).getPropertyValue("top");
        // on safari, it returns values in % not in pixel
        var centerDotPosition;
        if (centerDotTop.match(/%$/)) {
        // getting the panel height
        var panelHeight = document.getElementById("zoom-right-panel").offsetHeight;
        centerDotPosition = panelHeight * parseInt(centerDotTop, 10) / 100 + 15;
        } else {
        // on regular browser such as chrome or IE
        centerDotPosition = parseInt(window.getComputedStyle(document.getElementById("zoom-center-dot")).getPropertyValue("top"), 10) + centerDotRadius;
        }


        //set amount text
        //document.getElementById("chartdiv-top-title-year").innerHTML = this.props.intl.formatMessage({ id: "amCharter.zoomIn.title" }, { year: year });
        document.getElementById("zoom-upper-limit-value").innerHTML = maxValue;
        document.getElementById("zoom-lower-limit-value").innerHTML = minValue;
        document.getElementById("zoom-average-value").innerHTML = average;
        document.getElementById("zoom-contribution-value").innerHTML = contribution;
        // document.getElementById("zoom-average-value").style.fontSize = ((average >= 10000000) ? "26px" : "30px");

        //check to position lower or upper amount or contribution amount
        var ratio = 0;
        if (((centerDotPosition - upperDotMaxPosition) / (maxValue - average)) < ((lowerDotMaxPosition - centerDotPosition) / (average - Math.min(minValue, contribution)))) {
        ratio = (centerDotPosition - upperDotMaxPosition) / (maxValue - average);
        if (minValue !== average) {
            let lowerDotPosition = Math.round(centerDotPosition + ((average - minValue) * ratio));
            document.getElementById("zoom-lower-dot").style.top = (lowerDotPosition - lowerDotRadius) + "px";
            document.getElementById("zoom-lower-limit").style.top = (lowerDotPosition - 5) + "px";
            document.getElementById("zoom-upper-dot").style.top = Math.round(upperDotMaxPosition) - upperDotRadius + "px";
            document.getElementById("zoom-upper-limit").style.top = Math.round(upperDotMaxPosition) - 5 + "px";
        }
        }
        else if (contribution < minValue) {
        ratio = (lowerDotMaxPosition + 10 - centerDotPosition) / (average - contribution);
        let maxPosition = (this.props.mode === SCREEN_BREAK_POINTS[2] ? 80 : 75);
        let upperDotPosition = Math.round(centerDotPosition - ((maxValue - average) * ratio));
        let lowerDotPosition = Math.round(centerDotPosition + ((average - minValue) * ratio));
        document.getElementById("zoom-upper-dot").style.top = (upperDotPosition - upperDotRadius) + "px";
        document.getElementById("zoom-upper-limit").style.top = Math.min((upperDotPosition - 5), maxPosition) + "px";
        document.getElementById("zoom-lower-dot").style.top = (lowerDotPosition - lowerDotRadius) + "px";
        document.getElementById("zoom-lower-limit").style.top = (lowerDotPosition - 5) + "px";
        }
        else {
        ratio = (lowerDotMaxPosition - centerDotPosition) / (average - minValue);
        let maxPosition = (this.props.mode === SCREEN_BREAK_POINTS[2] ? 80 : 75);
        if (maxValue !== average) {
            let upperDotPosition = Math.round(centerDotPosition - ((maxValue - average) * ratio));
            document.getElementById("zoom-upper-dot").style.top = (upperDotPosition - upperDotRadius) + "px";
            document.getElementById("zoom-upper-limit").style.top = Math.min((upperDotPosition - 5), maxPosition) + "px";
            document.getElementById("zoom-lower-dot").style.top = Math.round(lowerDotMaxPosition) - lowerDotRadius + "px";
            document.getElementById("zoom-lower-limit").style.top = Math.round(lowerDotMaxPosition) - 5 + "px";
        }
        }

        //position contribution amount
        var contributionDashPosition = Math.floor(centerDotPosition + ((average - contribution) * ratio));
        document.getElementById("zoom-contribution-dash").style.top = (contributionDashPosition) - 1 + "px";
        document.getElementById("zoom-contribution").style.marginTop = contributionDashPosition - 55 + "px";//TODO margin bottom 10px

        //set gradient background-color
        var greenGradientPercent = contributionDashPosition / (windowRadius * 2) * 100;

        var gradientDegree = 180;
        var backgroundColor = ((this.props.mode === SCREEN_BREAK_POINTS[0]) ? this.props.BACKGROUND_COLOR_FULL : this.props.BACKGROUND_COLOR_MOBILE);
        //}
        if (greenGradientPercent < 93) {
        document.getElementById("zoom-right-panel").style.background =
            "linear-gradient(" + gradientDegree + "deg," + backgroundColor + " 9%," + this.props.GAIN_COLOR + " 30%, " + this.props.GAIN_COLOR + " " + greenGradientPercent + "%," + this.props.LOSS_COLOR + " " + greenGradientPercent + "%," + backgroundColor + " 92%)";
        } else {
        document.getElementById("zoom-right-panel").style.background =
            "linear-gradient(" + gradientDegree + "deg," + backgroundColor + " 9%," + this.props.GAIN_COLOR + " 30%, " + this.props.GAIN_COLOR + " " + greenGradientPercent + "%," + backgroundColor + greenGradientPercent + "%)";
        }
    }

    render () {
        const expanded = this.state.expanded;
        const lineImage = require("./images/target_short_white_line.png");
        const noDataProvider = this.state.noDataProvider;
        const graphData = this.state.graphData;
        const uiStatePeriod = this.state.uiStatePeriod;
        const maximumBalance = this.state.maximumBalance;
        const lumpSumAmount = this.state.lumpSumAmount;

        var configSerial = {
                "type": "serial",
                "theme": "light",
                "autoMarginOffset":20,
                "marginRight":20,
                "autoDisplay": true,
                "fontSize": 12,
                "addClassNames": true,
                "dataProvider": graphData,
                "graphs": [{
                    "id": "fromGraph",
                    "lineAlpha": 0,
                    "type": "smoothedLine",
                    "showBalloon": false,
                    "valueField": "minValue",
                    "fillAlphas": 0
                }, {
                    "id" : "toGraph",
                    "fillAlphas": 0.4,
                    "fillToGraph": "valueGraph",
                    "fillColors" : "green",
                    "lineAlpha": 0,
                    "type": "smoothedLine",
                    "showBalloon": false,
                    "valueField": "maxValue"
                }, {
                    "id" : "valueGraph",
                    "fillAlphas": 0.4,
                    "fillToGraph": "fromGraph",
                    "fillColors" : "red",
                    "valueField": "average",
                    "lineColor": "white",
                    "lineAlpha": 0,
                    "lineThickness": 2,
                    "dashLength": 7,
                    "type": "smoothedLine",
                    "showBalloon": false
                }, {
                    "id" : "targetGraph",
                    "title": "Target Amount",
                    "fillAlphas": 0,
                    "lineAlpha": 1,
                    "lineThickness": 2,
                    "bullet" : "custom",
                    "bulletSize" : 25,
                    "bulletAlpha" : 2,
                    "customBullet" : lineImage.toString(),
                    "labelText": "[[title]] $[[contribution]]",
                    "labelPosition": "left",
                    "labelOffset": 5,
                    "showBalloon": false,
                    "valueField": "target",
                    "color": "#FFFFFF",
                    "fontSize": 13,
                    "boldLabel": true
                }],
                "categoryField": "year",
                "categoryAxis": {
                    "guides": [{
                        "category": uiStatePeriod.toString(),
                        "position": "top",
                        "dashLength": 0,
                        "lineColor": "white",
                        "lineAlpha": 1.5,
                        "lineThickness": 1.5
                    }],
                    "fillAlpha": 0,
                    "position":"right",
                    "gridPosition": "middle",
                    "axisAlpha": 0,
                    "minHorizontalGap": 100,
                    "axisThickness": 0,
                    "gridAlpha": 0,
                    "startOnAxis": true,
                    "showLastLabel": false,
                    "showFirstLabel": false,
                    "tickLength": 5,
                    "color": "#FFFFFF"
                },
                "trendLines": [{
                    "finalCategory": 10,
                    "finalValue": 41000,
                    "initialCategory": 1,
                    "initialValue": 8600,
                    "lineColor": "#FFFFFF",
                    "lineAlpha": 1.5,
                    "lineThickness": 1.5,
                    "dashLength": 6
                }],
                "valueAxes": [{
                    "unit": "$",
                    "unitPosition": "left",
                    "axisAlpha": 0,
                    "position": "left",
                    "showFirstLabel": true,
                    "gridAlpha": 1,
                    "gridColor": "#46545d",
                    "gridThickness": 1,
                    "dashLength": 0,
                    "minVerticalGap": 40,
                    "color": "#FFFFFF",
                    "showLastLabel": false,
                    "maximum": Math.ceil(maximumBalance / 1000) * 1000,
                    "guides": [{
                        "value": lumpSumAmount,
                        "lineAlpha": 0,
                        "label": "$" + lumpSumAmount,
                        "boldLabel": true,
                        "color": "#FFFFFF",
                        "id": "day-one"
                    }]
                }],
                "listeners": [{
                    "event": "drawn",
                    "method": (event) => { console.log('drawn chart ... '); this.setZoomAttributes(); }
                }],
                "export": {
                    "enabled": false
                }
            };
        
        return (
                <div>
                    { noDataProvider ?
                    <div className={styles.emptyChartDiv}>
                        <div className={styles.picShow}>
                            <div className={styles.warning}>
                                <FontIcon icon="circle-error" className={styles.erroIcon} /> 
                                <p className={styles.warningMsg}><FormattedMessage id="goalSimulator.empty.chart.message"/></p>
                            </div>
                        </div>
                    </div>
                    :
                    <div id="chart-div" className={styles.chartDiv}>
                        <div id="chartdiv-legend" className={styles.chartdivLegend}>
                            <div className={styles.legendItem}>
                                <div className={styles.dash}></div>
                                <FormattedMessage id="goalSimulator.legend.cashLine" />
                            </div>
                            <div className={styles.legendItem}>
                                <div className={styles.greenBox}></div>
                                <FormattedMessage id="goalSimulator.legend.profit" />
                            </div>
                            <div className={styles.legendItem}>
                                <div className={styles.redBox}></div>
                                <FormattedMessage id="goalSimulator.legend.loss" />
                            </div>
                            
                        </div>
                        <div id="zoom-window-top" className={styles.zoomWindowTop}>
                            <h5 className={styles.zoomWindowTiltle}>
                                <FormattedMessage id='goalSimulator.yourProjectAtYear' values = {{year:this.state.uiStatePeriod}} />
                            </h5>
                        </div>
                        <div id="zoom-window" className={styles.zoomWindow}>
                            <div id="zoom-right-panel" className={styles.zoomRightPanel}>
                                <div>
                                    <div id="zoom-center-line" className={styles.zoomCenterLine}></div>
                                    <div id="zoom-center-dot" className={styles.zoomCenterDot}></div>
                                    <div id="zoom-upper-dot" className={styles.zoomUpperDot}></div>
                                    <div id="zoom-lower-dot" className={styles.zoomLowerDot}></div>
                                    <div id="zoom-upper-limit" className={styles.zoomUpperLimit}>
                                        <FormattedMessage id="goalSimulator.zoomIn.label.gain_1" />
                                        <span id="zoom-upper-limit-value" >$18,000</span>
                                        <FormattedMessage id="goalSimulator.zoomIn.label.gain_2" />
                                    </div>
                                    <div id="zoom-lower-limit" className={styles.zoomLowerLimit}>
                                        <FormattedMessage id="goalSimulator.zoomIn.label.loss_1" />
                                        <span id="zoom-lower-limit-value" >$13,000</span>
                                        <FormattedMessage id="goalSimulator.zoomIn.label.loss_2" />
                                    </div>
                                    <div id="zoom-average" className={styles.zoomAverage}>
                                        <FormattedMessage id="goalSimulator.zoomIn.label.midRange" tagName="div" />
                                        <span id="zoom-average-value" className={styles.zoomAverageValue} >$16,300</span>
                                    </div>
                                </div>
                            </div>
                            <div id="zoom-leftPane" className={styles.zoomLeftPane}>
                                <div id="zoom-contribution" className={styles.zoomContribution}>
                                    <span id="zoom-contribution-label-name"><FormattedMessage id="goalSimulator.legend.cashLine" /></span>
                                    <br />
                                    <span id="zoom-contribution-value" className={styles.zoomContributionValue}>$14,000</span>
                                </div>
                            </div>
                            <div id="zoom-contribution-dash" className={styles.zoomContributionDash}></div>
                        </div>
                        <div id="chartdiv-header" className={styles.chartdivHeader}>
                            <div id="chartdiv-year-box" className={styles.chartdivYearBox}></div>
                            <div id="chartdiv-year-label" className={styles.chartdivYearLabel}><FormattedMessage id="goalSimulator.year" /></div>
                            <div id="chartdiv-lumpsum-label" className={styles.chartdivLumpsumLabel}><FormattedMessage id="goalSimulator.lumpsum" /></div>
                        </div>
                        <div className={styles.amSerialChart} ><AmCharts.React {...configSerial} /></div>
                        <div id="chartdiv-time-label" className={styles.chartdivTimeLabel}><FormattedMessage id="goalSimulator.timeSelected" /></div>

                        <div className={styles.disclaimer}>
                            <div className={styles.declara} ><FormattedMessage id="goalSimulator.disclaimer"/></div>      
                        </div>
                        <div href="javascript:;" className={styles.icon} onClick={this.toggleExpanded}>
                            {expanded ? <FontIcon icon="chevron-up-small" className={styles.iconDown} /> :<FontIcon icon="chevron-down-small" className={styles.iconDown}/>}
                        </div>
                        <div id="disclaimer-content" className={styles.disclaimerContent}><FormattedMessage id="goalSimulator.disclaimer.content"/></div>
                    </div>
                    }
                </div>
        );
    }
}

amSerialCharts.defaultProps = {
  BACKGROUND_COLOR_FULL: "#2F3D46",
  BACKGROUND_COLOR_MOBILE: "#2F3D46",
  GAIN_COLOR: "#458239",
  LOSS_COLOR: "#902431"
}

//generate graph data
function generateGraphData(calculateResult, lumpSumAmount, targetAmount) {
    let data = [];
    let lastDataPoint = null;

    if (calculateResult && calculateResult.calculatePhaseResult && calculateResult.calculatePhaseResult.stochasticPercentileResult && calculateResult.calculatePhaseResult.stochasticPercentileResult.stochasticDataPoint) {
        console.log('------stochasticDataPoint has data------');
        const stochasticDataPoint = calculateResult.calculatePhaseResult.stochasticPercentileResult.stochasticDataPoint;

        let dataMap = new Map();
        dataMap.clear();
        for(let dataPoint of stochasticDataPoint) {
            //console.log(dataPoint.meta);
            //console.log(dataPoint.xValue);
            //console.log(dataPoint.yValue);
            //console.log('================');
            if (!dataMap.has(dataPoint.xValue)) {
                dataMap.set(dataPoint.xValue, {['year']:dataPoint.xValue});
            }
            if ('totalPaidIn' === dataPoint.meta) {
                dataMap.get(dataPoint.xValue)['contribution'] = dataPoint.yValue;
                continue;
            }
            if ('low' === dataPoint.meta) {
                dataMap.get(dataPoint.xValue)['minValue'] = dataPoint.yValue;
                continue;
            }
            if ('high' === dataPoint.meta) {
                dataMap.get(dataPoint.xValue)['maxValue'] = dataPoint.yValue;
                continue;
            }
            if ('mid' === dataPoint.meta) {
                dataMap.get(dataPoint.xValue)['average'] = dataPoint.yValue;
                continue;
            }
        }

        data.push(
            {
                "year": 0,
                "contribution": lumpSumAmount,
                "minValue": lumpSumAmount,
                "maxValue": lumpSumAmount,
                "average": lumpSumAmount
            }
        );

        console.log('------dataMap start------');
        for (let [key, value] of dataMap) {
            if (undefined === value['contribution']) {
                value['contribution'] = '';
            }
            if (undefined === value['minValue']) {
                value['minValue'] = '';
            }
            if (undefined === value['maxValue']) {
                value['maxValue'] = value['average'];
            }
            if (undefined === value['average']) {
                value['average'] = '';
            }
            console.log('{year:' + value['year'] + ',contribution:' + value['contribution'] + ',minValue:' + value['minValue'] + ',maxValue:' + value['maxValue'] + ',average:' + value['average'] + '}');

            data.push(value);
        }
        console.log('------dataMap end------');

        let length = data.length;
        data[length-1]['target'] = targetAmount;
        lastDataPoint = data[length-1];
        data.push(
            {
                "year": data[length-1]['year'] + 1
            }
        );
    }
    return {'data':data, 'lastDataPoint':lastDataPoint};
}