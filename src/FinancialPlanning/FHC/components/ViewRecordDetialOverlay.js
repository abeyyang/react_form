import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './ViewRecordDetialOverlayStyle.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import AmCharts from 'amcharts3-react';
import Button from 'wealth/lib/web/components/ui/button';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from "react-intl";
import CcyAmtDisplayer, {formatCcyAmt} from 'common/components/Output/CcyAmtDisplayer';

class ViewRecordDetialOverlay extends Component {
     constructor(props) {
        super(props);
      
        console.log("props view record detail",props);
        this.closeOverlay = this.closeOverlay.bind(this);
     }

    closeOverlay(){
        console.log("closeoverlay");
        this.props.closeOverlay();
    }

    clickCopyAsTemplate(record,event) {
        console.log('ViewRecordsTab.clickCopyAsTemplate.begin', record);        
        this.props.copyAsTemplate(record);
        this.props.closeOverlay();
        console.log('ViewRecordsTab.clickCopyAsTemplate.end');
    }    
    
    
    render() {

        const {overlayData,intl,customerInfo} = this.props;

        let financialHcYear = overlayData.financialHcDate==undefined ? '':overlayData.financialHcDate;
        let createTabYear = financialHcYear.substring(0,4);

        const genderCode = customerInfo.genderCode;

        let currentAge = createTabYear-(new Date(this.props.customerInfo.birthDate)).getFullYear();        
       
        const displayPriority = (priority)=>{
            if(isNaN(priority)||((null!=priority)&&(typeof priority==='string')&&(priority.trim().length<1))||null==priority){
                return;
            }
            const p = Number(priority);
            switch(p){
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

        const displayRiskLevel = (riskLevel)=>{
            if(null==riskLevel||((null!=riskLevel)&&(typeof riskLevel==='string')&&(riskLevel.trim().length<1))){
                return;
            }
            return (<FormattedMessage id={riskLevel}/>);
        };

        const displayNumberOfChildren = ()=>{
            if(null!=overlayData.aboutMe.yearOfChildrenDOB5&&overlayData.aboutMe.yearOfChildrenDOB5.length>0){
                return 5;
            }
            if(null!=overlayData.aboutMe.yearOfChildrenDOB4&&overlayData.aboutMe.yearOfChildrenDOB4.length>0){
                return 4;
            }
            if(null!=overlayData.aboutMe.yearOfChildrenDOB3&&overlayData.aboutMe.yearOfChildrenDOB3.length>0){
                return 3;
            }
            if(null!=overlayData.aboutMe.yearOfChildrenDOB2&&overlayData.aboutMe.yearOfChildrenDOB2.length>0){
                return 2;
            }
            return 1;
        };


        const displayChildrenInfo = ()=>{
            let children = '<span style="font-size: 12px;">1</span><span style="vertical-align: super;">st</span>' + intl.formatMessage({id:'fhc.overlay.aboutMe.child'}) + (createTabYear-Number(overlayData.aboutMe.yearOfChildrenDOB1));
            if(null!=overlayData.aboutMe.yearOfChildrenDOB2&&overlayData.aboutMe.yearOfChildrenDOB2.length>0){
                children = children+'<br/><span style="font-size: 12px;">2</span><span style="vertical-align: super;">nd</span>'+ intl.formatMessage({id:'fhc.overlay.aboutMe.child'}) + (createTabYear-Number(overlayData.aboutMe.yearOfChildrenDOB2));
            }
            if(null!=overlayData.aboutMe.yearOfChildrenDOB3&&overlayData.aboutMe.yearOfChildrenDOB3.length>0){
                children = children+'<br/><span style="font-size: 12px;">3</span><span style="vertical-align: super;">rd</span>'+ intl.formatMessage({id:'fhc.overlay.aboutMe.child'}) + (createTabYear-Number(overlayData.aboutMe.yearOfChildrenDOB3));
            }
            if(null!=overlayData.aboutMe.yearOfChildrenDOB4&&overlayData.aboutMe.yearOfChildrenDOB4.length>0){
                children = children+'<br/><span style="font-size: 12px;">4</span><span style="vertical-align: super;">th</span>'+ intl.formatMessage({id:'fhc.overlay.aboutMe.child'}) + (createTabYear-Number(overlayData.aboutMe.yearOfChildrenDOB4));
            }
            if(null!=overlayData.aboutMe.yearOfChildrenDOB5&&overlayData.aboutMe.yearOfChildrenDOB5.length>0){
                children = children+'<br/><span style="font-size: 12px;">5</span><span style="vertical-align: super;">th</span>'+ intl.formatMessage({id:'fhc.overlay.aboutMe.child'}) + (createTabYear-Number(overlayData.aboutMe.yearOfChildrenDOB5));
            }
            return (<FormattedHTMLMessage id='childrenInfo' defaultMessage={children}/>);
        };

        const displayInsProducts = ()=>{
            let coverages = [];
            if('Y'==overlayData.criticalIllness.hasInpCoverage){
                coverages.push('fhc.InpCoverage');
            }
            if('Y'==overlayData.criticalIllness.hasOutptCoverage){
                coverages.push('fhc.OutptCoverage');
            }
            if('Y'==overlayData.criticalIllness.hasTravCoverage){
                coverages.push('fhc.TravCoverage');
            }
            if(coverages.length>0){
                let insProducts = intl.formatMessage({id:coverages[0]})
                for(let i=1;i<coverages.length;i++){
                    insProducts = insProducts+'<br/>'+intl.formatMessage({id:coverages[i]})
                }
                return (<FormattedHTMLMessage id='coveragesInfo' defaultMessage={insProducts}/>);
            }
            else{
                return (<FormattedMessage id='common.not.available'/>);
            }
        };

        const displayProperties = ()=>{
            let properties = [];
            if('Y'==overlayData.growYourWealth.hasMortgageProperty){
                properties.push('fhc.MortgageProperty');
            }
            if('Y'==overlayData.growYourWealth.hasNoMortgageProperty){
                properties.push('fhc.NoMortgageProperty');
            }
            if('Y'==overlayData.growYourWealth.hasRentProperty){
                properties.push('fhc.RentProperty');
            }
            if(properties.length>0){
                let propertiesText = intl.formatMessage({id:properties[0]})
                for(let i=1;i<properties.length;i++){
                    propertiesText = propertiesText+'<br/>'+intl.formatMessage({id:properties[i]})
                }
                return (<FormattedHTMLMessage id='propertiesInfo' defaultMessage={propertiesText}/>);
            }
            else{
                return (<FormattedMessage id='common.not.available'/>);
            }
        };

        let hasChildren = false;
		if(null!=overlayData.aboutMe.yearOfChildrenDOB1&&overlayData.aboutMe.yearOfChildrenDOB1.length>0){
			hasChildren = true;
		}

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
                "color": overlayData.result.lifeCoverageColor,
                "value": overlayData.result.lifeCoverageAchievedAmt
            }, {
                "color": "#5C5C5C",
                "value": overlayData.result.lifeCoverageRemainAmt
            } ];

        const retirementChart = Object.assign({},conf);
        retirementChart.dataProvider = [ {
                "color": overlayData.result.retirementColor,
                "value": overlayData.result.retirementAchievedAmt
            }, {
                "color": "#5C5C5C",
                "value": overlayData.result.retirementRemainAmt
            } ];

        const educationChart = Object.assign({},conf);
        educationChart.dataProvider = [ {
                "color": overlayData.result.educationColor,
                "value": overlayData.result.educationAchievedAmt
            }, {
                "color": "#5C5C5C",
                "value": overlayData.result.educationRemainAmt
            } ];

        const criticalIllnessChart = Object.assign({},conf);
        criticalIllnessChart.dataProvider = [ {
                "color": overlayData.result.criticalIllnessColor,
                "value": overlayData.result.criticalIllnessAchievedAmt
            }, {
                "color": "#5C5C5C",
                "value": overlayData.result.criticalIllnessRemainAmt
            } ];       

        let universityCountryLabelKey = 'fhc.university.'+overlayData.aboutMe.universityCountryCde;
        return (            
            
         <div className={styles.viewRecordsDetial} id="fhc_overlay_panel">
                <div className={styles.financialChart}>
                    <div className={styles.tiltleText}>
                        <span id="fhc_overlay_headline_financialHealthResults"><FormattedMessage id="fhc.overlay.headline.financialHealthResults"/></span>
                    </div>
                    <div className={styles.titleSubText}>
                        <div className={styles.titleSubTextLeft}>
                            <span id="fhc_overlay_headline_createdOn"><FormattedMessage id="fhc.overlay.headline.createdOn"/><span id="fhc_overlay_headline_financialHcDate">{overlayData.financialHcDate}</span> &nbsp; | &nbsp; <FormattedMessage id="fhc.overlay.headline.staffName"/><span id="fhc_overlay_headline_staffName">{overlayData.staffName}</span><FormattedMessage id="fhc.overlay.headline.staffID"/><span id="fhc_overlay_headline_staffId">{overlayData.staffId}</span></span>
                        </div>
                        <div className={styles.titleSubTextRight}>
                                <div className={styles.chartGreen} id="fhc_overlay_headline_wellPrepared">
                                    <Button value="" className={styles.greenBox}/>
                                    <span className={styles.well}><FormattedMessage id="fhc.overlay.headline.wellPrepared"/></span>
                                </div>
                                <div className={styles.chartOrange} id="fhc_overlay_headline_keepGoing">
                                    <Button value="" className={styles.orangeBox}/>
                                    <span className={styles.well}><FormattedMessage id="fhc.overlay.headline.keepGoing"/></span>
                                </div>
                                <div className={styles.chartRed} id="fhc_overlay_headline_needsMoreAttention">
                                    <Button value="" className={styles.redBox}/>
                                    <span className={styles.well}><FormattedMessage id="fhc.overlay.headline.needsMoreAttention"/></span>
                                </div>                            
                        </div>
                    </div>
                    <div>
                          <div className={styles.chartMain}>
                                    <ul className={styles.clearfix}>
                                        <li id="fhc_overlay_educationChart">
                                            {displayPriority(overlayData.result.educationPriority)} 
                                            <div className={styles.clearfix} id="fhc_overlay_educationDiv">
                                                <div className={styles.amPieChart} id="fhc_overlay_education_chart">
                                                    <AmCharts.React {...educationChart} />
                                                    <FontIcon icon="education" className={styles.iconStyle} />
                                                </div>
                                                <p className={styles.caption} id="fhc_overlay_chart_education"><FormattedMessage id="fhc.overlay.chart.education"/></p>
                                                <table className={styles.fontCss}>
                                                    <tr>
                                                        <th className={styles.rightLineCss} id="fhc_overlay_education_youStillNeed_label"><FormattedMessage id="fhc.overlay.chart.youStillNeed"/></th>
                                                        <th className={styles.currencyCss} id="fhc_overlay_education_youStillNeed"><CcyAmtDisplayer ccyAmtObj={overlayData.result.educationStillNeedCcyAmtObj}/></th>
                                                    </tr>
                                                    <tr>
                                                        <td className={styles.rightLineCss} id="fhc_overlay_education_yourPriority_label"><FormattedMessage id="fhc.overlay.chart.yourPriority"/></td>
                                                        <td className={styles.currencyCss} id="fhc_overlay_education_yourPriority"><CcyAmtDisplayer ccyAmtObj={overlayData.result.educationPriorityAmtCcyAmtObj}/></td>
                                                    </tr>
                                                </table>  
                                            </div>
                                        </li>

                                        <li id="fhc_overlay_retirementChart">
                                            {displayPriority(overlayData.result.retirementPriority)}  
                                            <div className={styles.clearfix} id="fhc_overlay_retirementDiv">
                                                <div className={styles.amPieChart} id="fhc_overlay_retirement_chart">
                                                    <AmCharts.React {...retirementChart} />
                                                    <FontIcon icon="insurance" className={styles.iconStyle} />
                                                </div>
                                                <p className={styles.caption} id="fhc_overlay_chart_retirement"><FormattedMessage id="fhc.overlay.chart.retirement"/></p>
                                                <table className={styles.fontCss}>
                                                    <tr>
                                                        <th className={styles.rightLineCss} id="fhc_overlay_education_youStillNeed_label"><FormattedMessage id="fhc.overlay.chart.youStillNeed"/></th>
                                                        <th className={styles.currencyCss} id="fhc_overlay_education_youStillNeed"><CcyAmtDisplayer ccyAmtObj={overlayData.result.retirementStillNeedCcyAmtObj}/></th>
                                                    </tr>
                                                    <tr>
                                                        <td className={styles.rightLineCss} id="fhc_overlay_education_yourPriority_label"><FormattedMessage id="fhc.overlay.chart.yourPriority"/></td>
                                                        <td className={styles.currencyCss} id="fhc_overlay_education_yourPriority"><CcyAmtDisplayer ccyAmtObj={overlayData.result.retirementPriorityAmtCcyAmtObj}/></td>
                                                    </tr>
                                                </table>  
                                            </div>
                                        </li>

                                        <li id="fhc_overlay_lifeCoverageChart">
                                            {displayPriority(overlayData.result.lifeCoveragePriority)}                           
                                            <div className={styles.clearfix} id="fhc_overlay_lifeCoverageDiv">
                                                <div className={styles.amPieChart} id="fhc_overlay_lifeCoverage_chart">
                                                    <AmCharts.React {...lifeCoverageChart} />
                                                    <FontIcon icon="insurance" className={styles.iconStyle} />
                                                </div>
                                                <p className={styles.caption} id="fhc_overlay_chart_lifeCoverage"><FormattedMessage id="fhc.overlay.chart.lifeCoverage"/></p>
                                                <table className={styles.fontCss}>
                                                    <tr>
                                                        <th className={styles.rightLineCss} id="fhc_overlay_lifeCoverage_youStillNeed_label"><FormattedMessage id="fhc.overlay.chart.youStillNeed"/></th>
                                                        <th className={styles.currencyCss} id="fhc_overlay_lifeCoverage_youStillNeed"><CcyAmtDisplayer ccyAmtObj={overlayData.result.lifeCoverageStillNeedCcyAmtObj}/></th>
                                                    </tr>
                                                    <tr>
                                                        <td className={styles.rightLineCss} id="fhc_overlay_lifeCoverage_yourPriority_label"><FormattedMessage id="fhc.overlay.chart.yourPriority"/></td>
                                                        <td className={styles.currencyCss} id="fhc_overlay_lifeCoverage_yourPriority"><CcyAmtDisplayer ccyAmtObj={overlayData.result.lifeCoveragePriorityAmtCcyAmtObj}/></td>
                                                    </tr>
                                                </table>   
                                            </div>                                  
                                        </li>

                                        <li id="fhc_overlay_criticalIllnessChart">
                                             {displayPriority(overlayData.result.criticalIllnessPriority)}
                                            <div className={styles.clearfix} id="fhc_overlay_criticalIllnessDiv">
                                                <div className={styles.amPieChart} id="fhc_overlay_criticalIllness_chart">
                                                    <AmCharts.React {...criticalIllnessChart} />
                                                    <FontIcon icon="insurance" className={styles.iconStyle} />
                                                </div>
                                                <p className={styles.caption} id="fhc_overlay_chart_criticalIllness"><FormattedMessage id="fhc.overlay.chart.criticalIllness"/></p>
                                                <table className={styles.fontCss}>
                                                    <tr>
                                                        <th className={styles.rightLineCss} id="fhc_overlay_criticalIllness_youStillNeed_label"><FormattedMessage id="fhc.overlay.chart.youStillNeed"/></th>
                                                        <th className={styles.currencyCss} id="fhc_overlay_criticalIllness_youStillNeed"><CcyAmtDisplayer ccyAmtObj={overlayData.result.criticalIllnessStillNeedCcyAmtObj}/></th>
                                                    </tr>
                                                    <tr>
                                                        <td className={styles.rightLineCss} id="fhc_overlay_criticalIllness_yourPriority_label"><FormattedMessage id="fhc.overlay.chart.yourPriority"/></td>
                                                        <td className={styles.currencyCss} id="fhc_overlay_criticalIllness_yourPriority_label"><CcyAmtDisplayer ccyAmtObj={overlayData.result.criticalIllnessPriorityAmtCcyAmtObj}/></td>
                                                    </tr>
                                                </table>   
                                            </div>
                                        </li>

                                        <li id="fhc_overlay_growYourWealthChart">
                                             {displayPriority(overlayData.result.growYourWealthPriority)}
                                            <div className={styles.clearfix} id="fhc_overlay_growYourWealthDiv">
                                                <p className={styles.picture} id="fhc_overlay_growYourWealth_chart">
                                                    <span className={styles.circle}></span>
                                                    <FontIcon icon="savings" className={styles.iconStyle} />
                                                </p>
                                                <p className={styles.pictureCaption} id="fhc_overlay_chart_growYourWealth"><FormattedMessage id="fhc.overlay.chart.growYourWealth"/></p>
                                            </div>
                                        </li>                                        

                                        
                                          <li id="fhc_overlay_legacyChart">
                                            {displayPriority(overlayData.result.legacyPriority)}
                                            <div className={styles.clearfix} id="fhc_overlay_legacyDiv">
                                                <p className={styles.picture} id="fhc_overlay_legacy_chart">
                                                    <span className={styles.circle}></span>
                                                    <FontIcon icon="survey" className={styles.iconStyle} />
                                                </p>
                                                <p className={styles.pictureCaption} id="fhc_overlay_chart_legacy"><FormattedMessage id="fhc.overlay.chart.legacy"/></p>
                                            </div>
                                        </li>                         
                                         
                                        <li id="fhc_overlay_propertyChart">
                                             {displayPriority(overlayData.result.propertyPriority)}
                                            <div className={styles.clearfix} id="fhc_overlay_propertyDiv">
                                                <p className={styles.picture} id="fhc_overlay_property_chart">
                                                    <span className={styles.circle}></span>
                                                    <FontIcon icon="survey" className={styles.iconStyle} />
                                                </p>
                                                <p className={styles.pictureCaption} id="fhc_overlay_chart_property"><FormattedMessage id="fhc.overlay.chart.property"/></p>
                                            </div>
                                        </li>

                                        <li id="fhc_overlay_healthChart">
                                            {displayPriority(overlayData.result.healthPriority)}  
                                            <div className={styles.clearfix} id="fhc_overlay_healthDiv">
                                                <p className={styles.picture} id="fhc_overlay_health_chart">
                                                    <span className={styles.circle}></span>
                                                    <FontIcon icon="survey" className={styles.iconStyle} />
                                                </p>
                                                <p className={styles.pictureCaption} id="fhc_overlay_chart_health"><FormattedMessage id="fhc.overlay.chart.health"/></p>
                                            </div>
                                        </li>                                                                                  

                                                                  
                                                                                                                 

                                    </ul>
                            </div>
                    </div>
                </div>

                <div className={styles.Summary}>
                    <div className={styles.tiltleText}>
                        <span><FormattedMessage id="fhc.overlay.summary.summaryTitle"/></span>
                    </div>
                    <div className={styles.CoverageGap}>
                        <table>
                            <tr>
                                <th id="fhc_overlay_summary_coverageGap_item"><FormattedMessage id="fhc.overlay.summary.items"/></th>
                                <th id="fhc_overlay_summary_coverageGap_label"><FormattedMessage id="fhc.overlay.summary.coverageGap"/></th>
                            </tr>
                            <tr>
                                <td id="fhc_overlay_chart_lifeCoverage_label"><FormattedMessage id="fhc.overlay.chart.lifeCoverage"/></td>
                                <td id="fhc_overlay_chart_lifeCoverage"><CcyAmtDisplayer ccyAmtObj={overlayData.result.lifeCoverageCcyAmtObj} /></td>
                            </tr>
                            <tr>
                                <td id="fhc_overlay_chart_criticalIllness_label"><FormattedMessage id="fhc.overlay.chart.criticalIllness"/></td>
                                <td id="fhc_overlay_chart_criticalIllness"><CcyAmtDisplayer ccyAmtObj={overlayData.result.criticalIllnessCcyAmtObj} /></td>
                            </tr>
                            <tr className={styles.fontBoler}>
                                <td className={styles.fontBoldCss} id="fhc_overlay_summary_coverageToalGap_label"><FormattedMessage id="fhc.overlay.summary.toalGap"/></td>
                                <td className={styles.fontBoldCss} id="fhc_overlay_summary_coverageToalGap"><CcyAmtDisplayer ccyAmtObj={overlayData.result.coverageToalGapCcyAmtObj} /></td>
                            </tr>

                        </table>
                    </div>
                    <div className={styles.SavingGap}>
                        <table>
                            <tr>
                                <th id="fhc_overlay_summary_savingGap_item"><FormattedMessage id="fhc.overlay.summary.items"/></th>
                                <th id="fhc_overlay_summary_savingGap_label"><FormattedMessage id="fhc.overlay.summary.savingGap"/></th>
                            </tr>
                            <tr>
                                <td id="fhc_overlay_summary_retirement_label"><FormattedMessage id="fhc.overlay.chart.retirement"/></td>
                                <td id="fhc_overlay_summary_retirement"><CcyAmtDisplayer ccyAmtObj={overlayData.result.retirementCcyAmtObj} /></td>
                            </tr>
                            <tr>
                                <td id="fhc_overlay_summary_education_label"><FormattedMessage id="fhc.overlay.chart.education"/></td>
                                <td id="fhc_overlay_summary_education"><CcyAmtDisplayer ccyAmtObj={overlayData.result.educationCcyAmtObj} /></td>
                            </tr>
                            <tr className={styles.fontBoler}>
                                <td className={styles.fontBoldCss} id="fhc_overlay_summary_savingToalGap_label"><FormattedMessage id="fhc.overlay.summary.toalGap"/></td>
                                <td className={styles.fontBoldCss} id="fhc_overlay_summary_savingToalGap"><CcyAmtDisplayer ccyAmtObj={overlayData.result.savingToalGapCcyAmtObj} /></td>
                            </tr>
                        </table>
                    </div>

                </div>

                <div className={styles.Comments}>
                    <div className={styles.tiltleText}>
                        <span id="fhc_overlay_comments_commentTitle_label"><FormattedMessage id="fhc.overlay.comments.commentTitle"/></span>
                        <br/><p className={styles.commentsFontCss}>{overlayData.result.comments}</p>
                    </div>
                    <div className={styles.leftTable}>
                        <table>
                            <tr>
                                <th colSpan="2"><span className={styles.leftRedBorderCss}></span><span className={styles.leftPosistionCss}><FormattedMessage id="fhc.overlay.aboutMe.aboutMeTitle"/></span></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.1"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_aboutMe_gender_label" ><FormattedMessage id="fhc.overlay.aboutMe.gender"/></td>
                                {genderCode=='M'?
                                    <td className={styles.ThreeTdCss} id="fhc_overlay_aboutMe_gender"><FormattedMessage id="fhc.male"/></td>
                                    :
                                    <td className={styles.ThreeTdCss} id="fhc_overlay_aboutMe_gender"><FormattedMessage id="fhc.female"/></td>
                                } 
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.2"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_aboutMe_myAge_label" ><FormattedMessage id="fhc.overlay.aboutMe.myAge"/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_aboutMe_myAge">{currentAge}</td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.3"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_aboutMe_riskLevel_label" ><FormattedMessage id='fhc.overlay.aboutMe.riskLevel'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_aboutMe_riskLevel">{displayRiskLevel(overlayData.aboutMe.riskLevel)}</td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.4"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_aboutMe_hasChildren_label" ><FormattedMessage id='fhc.overlay.aboutMe.hasChildren'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_aboutMe_hasChildren">{hasChildren? intl.formatMessage({id:'fhc.yes'}):intl.formatMessage({id:'fhc.no'})}</td>
                            </tr>
                            {hasChildren?
                            (<tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.a"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_aboutMe_numberOfChildren_label" ><FormattedMessage id='fhc.overlay.aboutMe.numberOfChildren'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_aboutMe_numberOfChildren">{displayNumberOfChildren()}</td>
                            </tr>):''}
                            {hasChildren?
                            (<tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.b"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_aboutMe_childInfo_label" ><FormattedMessage id='fhc.overlay.aboutMe.childInfo'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_aboutMe_childInfo">{displayChildrenInfo()}</td>
                            </tr>):''}
                            {hasChildren?
                            (<tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.c"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_aboutMe_universityCountryCde_label" ><FormattedMessage id='fhc.overlay.aboutMe.universityCountryCde'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_aboutMe_universityCountryCde"><FormattedMessage id={universityCountryLabelKey}/></td>
                            </tr>):''}
                        </table>
                    </div>
                    <div className={styles.rigthTalbe}>
                        <table>
                            <tr>
                                <th colSpan="2"><span className={styles.leftRedBorderCss}></span><span className={styles.leftPosistionCss}><FormattedMessage id='fhc.overlay.education.educationTitle'/></span></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.1"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_education_savingForEduCcyAmt_label"><FormattedMessage id='fhc.overlay.education.savingForEduCcyAmt'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_education_savingForEduCcyAmt"><CcyAmtDisplayer ccyAmtObj={overlayData.education.savingForEduCcyAmtObj} /></td>
                            </tr>
                            <tr>
                                <td colSpan="2" id="fhc_overlay_education_assumption1Text_label" className={styles.doubleLineCss}><FormattedMessage id='fhc.overlay.education.assumption1Text'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_education_assumption1Text"><FormattedHTMLMessage id="fhc.overlay.education.assumption1" values={{annualExp: formatCcyAmt(intl,overlayData.education.annualExpCcyAmtObj)}}/></td>
                            </tr>
                            <tr>
                                <td colSpan="2" id="fhc_overlay_education_assumption2Text_label" className={styles.doubleLineCss}><FormattedMessage id='fhc.overlay.education.assumption2Text'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_education_assumption2Text"><FormattedHTMLMessage id="fhc.overlay.education.assumption2" values={{yearInSchool: overlayData.education.yearInSchool}}/></td>
                            </tr>
                            <tr>
                                <td colSpan="2" id="fhc_overlay_education_assumption3Text_label" className={styles.doubleLineCss}><FormattedMessage id='fhc.overlay.education.assumption3Text'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_education_assumption3Text"><FormattedHTMLMessage id="fhc.overlay.education.assumption3" values={{yearTillEnterSchool: overlayData.education.yearTillEnterSchool}}/></td>
                            </tr>
                        </table>
                    </div>



                     <div className={styles.leftTable}>
                        <table>
                            <tr>
                                <th colSpan="2"><span className={styles.leftRedBorderCss}></span><span className={styles.leftPosistionCss}><FormattedMessage id='fhc.overlay.retirement.retirementTitle'/></span></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.1"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_retirement_targetRetireAge_label" ><FormattedMessage id='fhc.overlay.retirement.targetRetireAge'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_retirement_targetRetireAge">{overlayData.retirement.targetRetireAge}</td>                                
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.2"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_retirement_monthlyExpCcyAmt_label" ><FormattedMessage id='fhc.overlay.retirement.monthlyExpCcyAmt'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_retirement_monthlyExpCcyAmt"><CcyAmtDisplayer ccyAmtObj={overlayData.retirement.monthlyExpCcyAmtObj} /></td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.3"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_retirement_savingForRetireCcyAmt_label" ><FormattedMessage id='fhc.overlay.retirement.savingForRetireCcyAmt'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_retirement_savingForRetireCcyAmt"><CcyAmtDisplayer ccyAmtObj={overlayData.retirement.savingForRetireCcyAmtObj} /></td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.4"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_retirement_hasLegacyPlan_label" ><FormattedMessage id='fhc.overlay.retirement.hasLegacyPlan'/></td>
                                {overlayData.retirement.hasLegacyPlan?
                                    (<td className={styles.ThreeTdCss} id="fhc_overlay_retirement_hasLegacyPlan_yes">
                                        <FormattedMessage id='fhc.yes'/> - {overlayData.retirement.hasLegacyPlanDesc}
                                    </td>)
                                    :
                                    (<td className={styles.ThreeTdCss} id="fhc_overlay_retirement_hasLegacyPlan_no">
                                        <FormattedMessage id='fhc.no'/>
                                    </td>)
                                }
                            </tr>
                            <tr>
                                <td colSpan="2" id="fhc_overlay_retirement_assumptionsText_label"><FormattedMessage id='fhc.overlay.retirement.assumptionsText'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_retirement_assumptionsText"><FormattedHTMLMessage id="fhc.overlay.retirement.assumption" values={{postRetireYear: overlayData.retirement.postRetireYear,targetRetireAge:overlayData.retirement.targetRetireAge,hopeLiveAge:(overlayData.retirement.targetRetireAge+overlayData.retirement.postRetireYear)}}/></td>
                            </tr>
                        </table>
                    </div>
                    <div className={styles.rigthTalbe}>
                        <table>
                            <tr>
                                <th colSpan="2"><span className={styles.leftRedBorderCss}></span><span className={styles.leftPosistionCss}><FormattedMessage id='fhc.overlay.protection.protectionTitle'/></span></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.1"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_protection_monthlyIncome_label"><FormattedMessage id='fhc.overlay.protection.monthlyIncome'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_protection_monthlyIncome"><CcyAmtDisplayer ccyAmtObj={overlayData.protection.monthlyIncCcyAmtObj} /></td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.2"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_protection_debtAmount_label"><FormattedMessage id='fhc.overlay.protection.debtAmount'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_protection_debtAmount"><CcyAmtDisplayer ccyAmtObj={overlayData.protection.totalLiaOutsCcyAmtObj} /></td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.3"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_protection_coverOtherCosts_label"><FormattedMessage id='fhc.overlay.protection.coverOtherCosts'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_protection_coverOtherCosts"><CcyAmtDisplayer ccyAmtObj={overlayData.protection.supportCcyAmtObj} /></td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.4"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_protection_supportFamilyOfYears_label"><FormattedMessage id='fhc.overlay.protection.supportFamilyOfYears'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_protection_supportFamilyOfYears">{overlayData.protection.yearToSupport}</td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.5"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_protection_lifeInsuranceCover_label"><FormattedMessage id='fhc.overlay.protection.lifeInsuranceCover'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_protection_lifeInsuranceCover"><CcyAmtDisplayer ccyAmtObj={overlayData.protection.lifeInsCoverCcyAmtObj} /></td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.6"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_protection_benefitsCoveredAmount_label"><FormattedMessage id='fhc.overlay.protection.benefitsCoveredAmount'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_protection_benefitsCoveredAmount"><CcyAmtDisplayer ccyAmtObj={overlayData.protection.lifeInsCmpnyBnftCcyAmtObj} /></td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.7"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_protection_savingInvestment_label"><FormattedMessage id='fhc.overlay.protection.savingInvestment'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_protection_savingInvestment"><CcyAmtDisplayer ccyAmtObj={overlayData.protection.savingAndInvesCcyAmtObj} /></td>
                            </tr>
                        </table>
                    </div>

                    <div className={styles.leftTable}>
                        <table>
                            <tr>
                                <th colSpan="2"><span className={styles.leftRedBorderCss}></span><span className={styles.leftPosistionCss}><FormattedMessage id='fhc.overlay.criticalIllness.criticalIllnessTitle'/></span></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.1"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_criticalIllness_illnessCoverCcyAmt_label" ><FormattedMessage id='fhc.overlay.criticalIllness.illnessCoverCcyAmt'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_criticalIllness_illnessCoverCcyAmt"><CcyAmtDisplayer ccyAmtObj={overlayData.criticalIllness.illnessCoverCcyAmtObj}/></td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.2"/></td>
                                <td className={styles.secondTdCss} id="fhc_overlay_criticalIllness_insuranceProducts_label" ><FormattedMessage id='fhc.overlay.criticalIllness.insuranceProducts'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_criticalIllness_insuranceProducts">{displayInsProducts()}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" id="fhc_overlay_criticalIllness_assumptionsText_label" ><FormattedMessage id='fhc.overlay.criticalIllness.assumptionsText'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_criticalIllness_assumptionsText"><FormattedHTMLMessage id="fhc.overlay.criticalIllness.assumption" values={{year:overlayData.criticalIllness.yearToSupport, support: formatCcyAmt(intl,overlayData.criticalIllness.supportCcyAmtObj)}}/></td>
                            </tr>
                        </table>
                    </div>
                    <div className={styles.rigthTalbe}>
                        <table>
                            <tr>
                                <th colSpan="2"><span className={styles.leftRedBorderCss}></span><span className={styles.leftPosistionCss}><FormattedMessage id='fhc.overlay.growYourWealth.growYourWealthTitle'/></span></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.1"/></td>
                                <td id="fhc_overlay_growYourWealth_target_label" className={styles.secondTdCss}><FormattedMessage id='fhc.overlay.growYourWealth.target'/></td>                                
                                 {overlayData.growYourWealth.hasShortTermInvest?
                                    (<td className={styles.ThreeTdCss} id="fhc_overlay_growYourWealth_target_yes">
                                        <FormattedMessage id='fhc.yes'/> - {overlayData.growYourWealth.shortTermInvestDetail}
                                    </td>)
                                    :
                                    (<td className={styles.ThreeTdCss} id="fhc_overlay_growYourWealth_target_no" >
                                        <FormattedMessage id='fhc.no'/>
                                    </td>)
                                }                              
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.2"/></td>
                                <td id="fhc_overlay_growYourWealth_homeProperties_label" className={styles.secondTdCss}><FormattedMessage id='fhc.overlay.growYourWealth.homeProperties'/></td>
                                <td className={styles.ThreeTdCss} id="fhc_overlay_growYourWealth_homeProperties">{displayProperties()}</td>
                            </tr>
                            <tr>
                                <td className={styles.firstTdCss}><FormattedMessage id="fhc.overlay.numberTitle.3"/></td>
                                <td id="fhc_overlay_growYourWealth_overseaProperties_label" className={styles.secondTdCss}><FormattedMessage id='fhc.overlay.growYourWealth.overseaProperties'/></td>
                                {overlayData.growYourWealth.hasOverseaProperty?
                                    (<td className={styles.ThreeTdCss} id="fhc_overlay_growYourWealth_overseaProperties_yes">
                                        <FormattedMessage id='fhc.yes'/>
                                    </td>)
                                    :
                                    (<td className={styles.ThreeTdCss} id="fhc_overlay_growYourWealth_overseaProperties_no">
                                        <FormattedMessage id='fhc.no'/>
                                    </td>)
                                }
                            </tr>
                        </table>
                    </div>

                </div>
                 <hr className={styles.line}/>
                    <div className={styles.footer}>
                        { (overlayData.showCopyAsTemplateFlag)?
                            <div className={styles.btnClose}>
                                <input type="button" className={styles.copy} onClick={this.clickCopyAsTemplate.bind(this,overlayData)} value="Copy As Tempate"/>
                            </div>
                            :
                            <div className={styles.btnClose}>
                                <input type="button" className={styles.submit} onClick={this.closeOverlay} value="Close"/>
                            </div>
                        }

                    </div>     
                    

            </div>        



        );
    }
}

export default injectIntl(ViewRecordDetialOverlay);