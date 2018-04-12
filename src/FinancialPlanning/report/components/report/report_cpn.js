import React, { Component } from 'react';
import Notification from 'wealth/lib/web/components/ui/notification';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import withLoadingScreenBeforeReadyToLeave
    from '../../../../common/components/trading/withLoadingScreenBeforeReadyToLeave';
import {FormattedMessage, injectIntl} from "react-intl";
import "../../../../common/util/extend";
import {logon} from '../../../../logon';
import Tab from 'wealth/lib/web/components/widgets/tab';
import Popup from 'wealth/lib/web/components/widgets/popup';
import { browserHistory } from 'react-router';
//import { LONG_LOCALES, NLS } from "../../../../locale/constant";
//import {enConfig} from '../../../../locale/FinancialPlanning/landing/index/en-gb';
//import {zh_hkConfig} from '../../../../locale/FinancialPlanning/landing/index/zh-hk';
//import {zh_cnConfig} from '../../../../locale/FinancialPlanning/landing/index/zh-cn';
//import RouteHelper from '../../../../common/lib/routeHelper';

export default class report extends Component {
    constructor (props) {
        super(props);
        this.getCurrentLocale = this.getCurrentLocale.bind(this);
        this.checkLocal=this.checkLocal.bind(this);
        this.goToOrderPlacement=this.goToOrderPlacement.bind(this);
        this.state = {
       
        };
    }
    getCurrentLocale() {
        const { routing } = this.props;
        const pathname = routing.locationBeforeTransitions.pathname;
        console.log("pathname..",pathname);
        const path = RouteHelper.newformatPath(pathname);  
        console.log("basePath..",path.basePath); 
        console.log("locale..",path.locale); 
        return path.locale;
    }
    checkLocal(){
        // add language to constant
        const dataEN=enConfig
        const dataHK=zh_hkConfig
        const dataCN=zh_cnConfig
        const locale = this.getCurrentLocale();
        if(locale === 'zh-cn'){
            return dataCN;
        }else if(locale === 'zh-hk'){
            return dataHK;
        }else{
            //default en-gb
            return dataEN;
        }
    }
    goToOrderPlacement(){
        const target ="/group-sfp-war/main/en-gb/orderPlacement";
        browserHistory.push(target);
    }
    render () {
         const generatingSummaryContent = (
            <div className={styles.popContent}>
                <div className={styles.popGenerate}>
                    <div className={styles.header}>
                       <h3 className={styles.title}><span className={styles.titleCtn}>Script generating summary</span></h3>
                       <p className={styles.content}>The data below has been scrapped. Please go to the script generator to complete audio agreement.</p>
                    </div>
                    
                    <div className={styles.popTable}>
                        <p className={styles.tableTitle}>Protecting planning ID:20160606</p>
                        <table>
                            <tr>
                                <th>Plan</th>
                                <th>&nbsp;</th>
                            </tr>
                            <tr>
                                <td>Goal type</td>
                                <td>Retirement</td>
                            </tr>
                            <tr>
                                <td>Investment period</td>
                                <td>3 years</td>
                            </tr>
                            <tr>
                                <td>Customer's RPQ</td>
                                <td>Adventurous</td>
                            </tr>
                        </table>
                    </div>
                    <div className={styles.popTable}>
                        <p className={styles.tableTitle}>Investment product</p>
                        <table>
                            <tr>
                                <th>Product1</th>
                                <th>&nbsp;</th>
                            </tr>
                            <tr>
                                <td>Found code</td>
                                <td>#U62630</td>
                            </tr>
                            <tr>
                                <td>Product name</td>
                                <td>AB-American Income Profolio (AT-SGDH-MDIST Cash)</td>
                            </tr>
                            <tr>
                                <td>Product risk level</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>Product currency</td>
                                <td>HKD</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <th>Product2</th>
                                <th>&nbsp;</th>
                            </tr>
                            <tr>
                                <td>Found code</td>
                                <td>#U62630</td>
                            </tr>
                            <tr>
                                <td>Product name</td>
                                <td>AB-American Income Profolio (AT-SGDH-MDIST Cash)</td>
                            </tr>
                            <tr>
                                <td>Product risk level</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>Product currency</td>
                                <td>HKD</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        );
        const {
            stickyHeight,
            isApiError,
            fatalErrorHide,
            showApiCallingError,
            errorInfo,
            router,
            params={},
            intl
        } = this.props
       
        
        return (
            <div className={styles.mainBackground}>
                <div className={styles.titlte}>
                    <span><FontIcon icon="circle-confirmation-solid" className={styles.iconConfirm} /></span>
                    <h2>Your report has been generated</h2>
                </div>
                <div className={styles.firstBox}>
                    <span className={styles.circle}>1</span>
                    <div className={styles.context}>
                        <p className={styles.contextTitle}>Get a copy of your report</p>
                        <p className={styles.contextContent}>You can preview it,email it to yourself or someone else, or print it if you wish.</p>
                    </div>
                    <div className={styles.iconGroup}>
                        <table>
                            <tr>
                                <td>
                                    <span><FontIcon icon="pdf" className={styles.iconPdf} /></span>
                                    <span className={styles.iconText}>Preview</span>
                                </td>
                                <td>
                                    <span><FontIcon icon="message" className={styles.iconMsg} /></span>
                                    <span className={styles.iconText}>Email</span>
                                </td>
                                <td>
                                    <span><FontIcon icon="print" className={styles.iconPrint} /></span>
                                    <span className={styles.iconText}>Print</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className={styles.recordBox}>
                    <span className={styles.circle}>2</span>
                    <div className={styles.context}>
                        <p className={styles.contextTitle}>Record audio agreement</p>
                    </div>
                    <a  href="javascript:;" className={styles.prefill} data-popupRef="generatingSummary"><span className={styles.prefillBtn}>Prefill information</span></a>
                </div>

                <div className={styles.bottom} >
                    <div className={styles.back}><a href="javascript:;" onClick={this.goToDashboardPageHandle}><FontIcon icon="chevron-left" className={styles.icon} />Back to home</a></div>
                    <div className={styles.button}>
                        <a href="javascript:;" onClick={this.goToOrderPlacement} className={styles.finalise}>Order placement</a>
                    </div>
                    <div className={styles.decalration}><span>Disclaimer & declarations</span><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                </div>
                <Popup popupRef="generatingSummary" className={styles.popWindow} hideOnOverlayClick theme={styles}>{generatingSummaryContent}</Popup>
                
            </div>
        );
    }
}
