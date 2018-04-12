import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Button from 'wealth/lib/web/components/ui/button';
import styles from './style.scss';
import PageButtonGroup from 'wealth/lib/web/components/widgets/pageButtonGroup';
import Pagination from 'wealth/lib/web/components/widgets/pagination';
import Popup from 'wealth/lib/web/components/widgets/popup';
import {FormattedMessage, injectIntl} from "react-intl";

 class createRecords extends Component {
    constructor (props) {
        super(props);
        this.state = {
            options: [5, 10, 'All'],
            currentOption: 'All'
        };
       
    }
    changeSelection (value) {
        this.setState({
            currentOption: value
        });
    }


    render () {
        const { options, currentOption } = this.state;
        const content = (
            <div className={styles.popContent}>
                <div className={styles.popLife}>
                    <div>
                        <h3><span className={styles.capital}>1</span><span className={styles.lower}>st</span></h3>
                        <div className={styles.clearfix}>
                            <p className={styles.picture}><img src={require('./images/pic1.png')} /></p>
                            <p className={styles.caption}><FormattedMessage id="fhc.lifeCoverage"/></p>
                        </div>
                    </div>
                    <div className={styles.popTable}>
                        <table>
                            <tr>
                                <td><FormattedMessage id="fhc.youHave"/></td>
                                <td>HKD 13,606,000</td>
                            </tr>
                            <tr>
                                <td><FormattedMessage id="fhc.youStillNeed"/></td>
                                <td>HKD 17,606,000</td>
                            </tr>
                            <tr>
                                <td><FormattedMessage id="fhc.yourTarget"/></td>
                                <td>HKD 31,212,000</td>
                            </tr>
                        </table>
                    </div>
                    <div className={styles.popText}>
                        <p>Your existing retirement coverage is HKD 100,000. You want to replace income for 2 years and provide HKD 1,000,000 of medical reserve. Overall your retirement coverage needs to be enhanced.</p>
                    </div>
                    <div className={styles.start}><a href="javascript:;" onClick=""><FormattedMessage id="fhc.startPlan"/></a></div>
                </div>
            </div>
        );
        return (
            <div className={styles.createRecordsPage}>
               <div className={styles.right}><FontIcon icon="clock" className={styles.iconClock} /><FormattedMessage id="fhc.settinglifeGoals"/></div>
               <div className={styles.rightDate}><FormattedMessage id="fhc.lastModified"/>01/12/2018</div>
               <div className={styles.yourResult}>
                    <h4>
                        <div className={styles.title}><FormattedMessage id="fhc.healthResult"/></div>
                        <div className={styles.icon}><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                    </h4>
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
                                        <FontIcon icon="switch" className={styles.iconSwitch} /><span><FormattedMessage id="fhc.reorderPriority"/></span>
                                    </div>
                                </div>
                                <div className={styles.chartMain}>
                                    <ul className={styles.clearfix}>
                                        <li>
                                            <h2><span className={styles.capital}>1</span><span className={styles.lower}>st</span></h2>
                                            <div className={styles.clearfix}>
                                                <p className={styles.picture}><img src={require('./images/pic1.png')} /></p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.lifeCoverage"/></p>
                                            </div>
                                            <a href="javascript:;" data-popupRef="LifeCoverageDetail"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
                                            
                                        </li>
                                        <li>
                                            <h2><span className={styles.capital}>4</span><span className={styles.lower}>th</span></h2>
                                            <div className={styles.clearfix}>
                                                <p className={styles.picture}><img src={require('./images/pic2.png')} /></p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.education"/></p>
                                            </div>
                                            <a href="javascript:;"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
                                        </li>
                                        <li>
                                            <h2><span className={styles.capital}>7</span><span className={styles.lower}>th</span></h2>
                                            <div className={styles.clearfix}>
                                                <p className={styles.picture}>
                                                    <span className={styles.circle}></span>
                                                    <FontIcon icon="assets" className={styles.iconStyle} />
                                                    </p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.property"/></p>
                                            </div>
                                            <a href="javascript:;"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
                                        </li>
                                        <li>
                                            <h2><span className={styles.capital}>2</span><span className={styles.lower}>nd</span></h2>
                                            <div className={styles.clearfix}>
                                                <p className={styles.picture}><img src={require('./images/pic4.png')} /></p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.retirement"/></p>
                                            </div>
                                            <a href="javascript:;"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
                                        </li>
                                        <li>
                                            <h2><span className={styles.capital}>5</span><span className={styles.lower}>th</span></h2>
                                            <div className={styles.clearfix}>
                                                <p className={styles.picture}><img src={require('./images/pic5.png')} /></p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.growYourWealth"/></p>
                                            </div>
                                            <a href="javascript:;"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
                                        </li>
                                         <li>
                                             <h2><span className={styles.capital}>8</span><span className={styles.lower}>th</span></h2>
                                            <div className={styles.clearfix}>
                                                <p className={styles.picture}>
                                                    <span className={styles.circle}></span>
                                                    <FontIcon icon="health" className={styles.iconStyle} />
                                                </p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.health"/></p>
                                            </div>
                                            <a href="javascript:;"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
                                        </li>
                                        <li>
                                            <h2><span className={styles.capital}>3</span><span className={styles.lower}>rd</span></h2>
                                            <div className={styles.clearfix}>
                                                <p className={styles.picture}><img src={require('./images/pic3.png')} /></p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.criticalIllness"/></p>
                                            </div>
                                            <a href="javascript:;"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
                                        </li>
                                        <li>
                                            <h2><span className={styles.capital}>6</span><span className={styles.lower}>th</span></h2>
                                            <div className={styles.clearfix}>
                                                <p className={styles.picture}>
                                                    <span className={styles.circle}></span>
                                                    <FontIcon icon="survey" className={styles.iconStyle} />
                                                </p>
                                                <p className={styles.caption}><FormattedMessage id="fhc.legacy"/></p>
                                            </div>
                                            <a href="javascript:;"><FontIcon icon="pop-up-window" className={styles.iconDown} /></a>
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
                                            <td>N/A</td>
                                        </tr>
                                        <tr>
                                            <td><FormattedMessage id="fhc.criticalIllness"/></td>
                                            <td>N/A</td>
                                        </tr>
                                        <tr>
                                            <td><FormattedMessage id="fhc.totalGap"/></td>
                                            <td>N/A</td>
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
                                            <td>N/A</td>
                                        </tr>
                                        <tr>
                                            <td><FormattedMessage id="fhc.education"/></td>
                                            <td>N/A</td>
                                        </tr>
                                        <tr>
                                            <td><FormattedMessage id="fhc.totalGap"/></td>
                                            <td>N/A</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className={styles.comment}>
                                <h3 className={styles.title}><FormattedMessage id="fhc.comments"/></h3>
                                <textarea className={styles.commentText} defaultValue="type in here..."/>
                            </div>
                        </div>
                    </div>
               </div>
               <div className={styles.others}>
                    <div className={styles.Indicates}>*<span className={styles.IndicatesText}><FormattedMessage id="fhc.indicatesField"/></span></div>
                    <div className={styles.Expand}>
                        <FontIcon icon="add" className={styles.iconAdd} />
                        <span className={styles.IndicatesText}><FormattedMessage id="fhc.expandAll"/></span>
                    </div>
                    <div className={styles.panel}>
                        <h3>
                            <div className={styles.title}><FormattedMessage id="fhc.aboutMe"/>
                                <FontIcon icon="agree" className={styles.iconAgree} />
                            </div>
                            <div className={styles.icon}><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                        </h3>
                    </div>
                    <div className={styles.panel}>
                        <h3>
                            <div className={styles.title}><FormattedMessage id="fhc.myFinancialSituation"/>
                                <FontIcon icon="agree" className={styles.iconAgree} />
                            </div>
                            <div className={styles.icon}><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                        </h3>
                    </div>
                    <div className={styles.panel}>
                        <h3>
                            <div className={styles.title}><FormattedMessage id="fhc.protection"/>
                                <FontIcon icon="agree" className={styles.iconAgree} />
                            </div>
                            <div className={styles.icon}><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                        </h3>
                    </div>
                    <div className={styles.panel}>
                        <h3>
                            <div className={styles.title}><FormattedMessage id="fhc.insurance"/>
                                <FontIcon icon="agree" className={styles.iconAgree} />
                            </div>
                            <div className={styles.icon}><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                        </h3>
                    </div>
                </div>
                <Popup popupRef="LifeCoverageDetail" className={styles.popWindow}>{content}</Popup>
            </div>
        );
    }
}

export default injectIntl(createRecords);