import React, { Component } from 'react';
import Notification from 'wealth/lib/web/components/ui/notification';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import classNames from 'classnames';
import withLoadingScreenBeforeReadyToLeave
    from '../../../../common/components/trading/withLoadingScreenBeforeReadyToLeave';
import {FormattedMessage, injectIntl} from "react-intl";
import "../../../../common/util/extend";
import {logon} from '../../../../logon';
import Tab from 'wealth/lib/web/components/widgets/tab';
import Popup from 'wealth/lib/web/components/widgets/popup';
//import { LONG_LOCALES, NLS } from "../../../../locale/constant";
//import {enConfig} from '../../../../locale/FinancialPlanning/landing/index/en-gb';
//import {zh_hkConfig} from '../../../../locale/FinancialPlanning/landing/index/zh-hk';
//import {zh_cnConfig} from '../../../../locale/FinancialPlanning/landing/index/zh-cn';
//import RouteHelper from '../../../../common/lib/routeHelper';

export default class  orderPlacement extends Component {
    constructor (props) {
        super(props);
        this.getCurrentLocale = this.getCurrentLocale.bind(this);
        this.checkLocal=this.checkLocal.bind(this);
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

    showOrderPlacementPage() {
        let orderPlacementRequest = {
            messageId:'retrieveOrderPlacement'
        }
        this.props.initOrderPlacementPage(orderPlacementRequest);
    }

    componentWillMount () {
        this.showOrderPlacementPage();
    }

    render () {
         const viewGoalDetailContent = (
            <div className={styles.popContent}>
                <div className={styles.popGenerate}>
                    <div className={styles.popLeft}>
                       <span className={styles.chart}></span>
                       <div className={styles.chartContent}>
                           <span className={styles.contentComplation}>complation of goal</span><br/>
                           <span className={styles.contentWell}>Well prepared</span>
                       </div>
                       <ul className={styles.chartExplain}>
                           <li>
                               <span className={styles.explainContent}>Initial results</span><br/>
                               <span className={styles.currency}>HKD 708,000</span>
                          </li>
                          <li>
                               <span className={styles.explainContent}>Initial results</span><br/>
                               <span className={styles.currency}>HKD 708,000</span>
                          </li>
                       </ul>
                    </div>
                    <div className={styles.popRight}>
                        <div className={styles.details}>
                            <h3 className={styles.title}>Getting closer by making changes your exiting retirement goal</h3>
                            <p className={styles.content}>Your existing retirement coverage is <span className={styles.ctn}>HKD 100,000</span>. You want to replace income for <span className={styles.ctn}>2 years</span> and provide <span className={styles.ctn}>HKD 1,000,000</span> of medical reserve. Overall your retirement coverage needs to be enhanced.</p>
                        </div>
                        <div className={styles.middle}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>You still need</td>
                                    <td>Your goal</td>
                                </tr>
                                <tr>
                                    <td>HKD 492,000</td>
                                    <td>HKD 1,492,000</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.bottom}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>Lump sum</td>
                                    <td>Monthly</td>
                                    <td>Time</td>
                                    <td>Risk level</td>
                                </tr>
                                <tr>
                                    <td>HKD 492,000</td>
                                    <td>HKD 1,000</td>
                                    <td>10 years</td>
                                    <td>Adventurous</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
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
            intl,
            orderPlacementList
        } = this.props
       
        
        return (
            <div className={styles.mainBackground}>
                <div className={styles.orderPlacement}>
                    <div className={styles.theme}>
                        <h2 className={styles.themeContent}>Order Placement</h2>
                        <p className={styles.themeText}>These are all the products you've selected. Please place an order each of the products you wish to purchase</p>
                    </div>
                    <div className={styles.tableContent}>
                        <div className={styles.titlte}>
                            <span className={styles.icon}></span>
                            <h2>Buy orders</h2>
                            {/*<div className={styles.titlteRight}>
                                <a href="javascript:;" data-popupRef="viewGoalDetail">
                                    <FontIcon icon="pie-chart" className={styles.iconChart} />
                                    View goal details
                                </a>
                            </div>*/}
                        </div>
                        <div className={styles.tableBox}>
                            <table>
                                <tr>
                                    <th>Goal name</th>
                                    <th>Product code & name</th>
                                    <th>Risk level</th>
                                    <th>Product currency</th>
                                    <th>investment amount</th>
                                    <th>Place order</th>
                                </tr>
                                <tbody>
                                {orderPlacementList.otherInvProdList==undefined?null:orderPlacementList.otherInvProdList.map(function(prod,index){
                                    return(
                                    <tr>
                                        <td>
                                            <span className={styles.prodName}>{prod.product.goalInfo[0].goalDescription}</span>
                                        </td>
                                        <td>
                                            <span className={styles.prodName}>{prod.product.productName}</span><br/>
                                            <span className={styles.prodCode}>{prod.prodCode}</span>
                                        </td>
                                        <td>
                                            <span className={classNames(styles.riskLevel, styles.riskLevelThree)}>{prod.riskLevel}</span>
                                        </td>
                                        <td>
                                            <span className={styles.currencyFlag}>{prod.product.currencyProductCode}</span>
                                        </td>
                                        <td>
                                            <span className={styles.invest}>Lump sum investment</span><br/>
                                            <span className={styles.investValue}>{prod.product.currencyProductCode} {prod.product.buyLumSumAmount}</span>
                                        </td>
                                        <td>
                                            {/*<a  href="javascript:;" className={styles.prefill}><span className={styles.prefillBtn}>Lump sum pay</span></a>*/}
                                            <a href="javascript:;" className={styles.prefill}><span className={styles.prefillBtn}>Buy now</span></a>
                                        </td>
                                    </tr>
                                    )
                                })}
                                {orderPlacementList.utSumProdList==undefined?null:orderPlacementList.utSumProdList.map(function(prod,index){
                                    return(
                                    <tr>
                                        <td>
                                            <span className={styles.prodName}>{prod.product.goalInfo[0].goalDescription}</span>
                                        </td>
                                        <td>
                                            <span className={styles.prodName}>{prod.product.productName}</span><br/>
                                            <span className={styles.prodCode}>{prod.prodCode}</span>
                                        </td>
                                        <td>
                                            <span className={classNames(styles.riskLevel,styles.riskLevelThree)}>{prod.riskLevel}</span>
                                        </td>
                                        <td>
                                            <span className={styles.currencyFlag}>{prod.product.currencyProductCode}</span>
                                        </td>
                                        <td>
                                            <span className={styles.invest}>Lump sum investment</span><br/>
                                            <span className={styles.investValue}>{prod.product.currencyProductCode} {prod.product.buyLumSumAmount}</span>
                                        </td>
                                        <td>
                                            <span>
                                                <input type="checkbox" className={styles.chkbox} id="chkbox"></input>
                                                <label htmlFor="chkbox" />
                                            </span>
                                        </td>
                                    </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        {orderPlacementList.otherInvProdList==undefined&&orderPlacementList.utSumProdList==undefined?null:
                        <div className={styles.buttonGroup}>
                            <a href="javascript:;" className={styles.prefill}><span className={styles.prefillBtn}>Lump sum pay</span></a>
                            <a href="javascript:;" className={styles.prefill}><span className={styles.prefillBtn}>Swith in</span></a>
                        </div>
                        }
                    </div>
                            
                    <div className={styles.tableContent}>
                        <div className={styles.titlte}>
                            <span className={styles.icon}></span>
                            <h2>Insurance orders</h2>
                        </div>
                        <div className={styles.tableBox}>
                            <table>
                                <tr>
                                    <th>Goal name</th>
                                    <th>Product code & name</th>
                                    <th>Risk level</th>
                                    <th>Sum insured</th>
                                    <th>Premium</th>
                                    <th>Frequency</th>
                                    <th>Place order</th>
                                </tr>
                                <tbody>
                                {orderPlacementList.insProdList==undefined?null:orderPlacementList.insProdList.map(function(prod,index){
                                    return(
                                    <tr>
                                        <td>
                                            <span className={styles.prodName}>{prod.product.goalInfo[0].goalDescription}</span>
                                        </td>
                                        <td>
                                            <span className={styles.prodName}>{prod.product.productName}</span><br/>
                                            <span className={styles.prodCode}>{prod.prodCode}</span>
                                        </td>
                                        <td>
                                            <span className={classNames(styles.riskLevel, styles.riskLevelFour)}>{prod.riskLevel}</span>
                                        </td>
                                        <td>
                                            <span className={styles.currencyFlag}>HKD {prod.coverageInsuranceAmount}</span>
                                        </td>
                                        <td>
                                            <span className={styles.investValue}>HKD {prod.premiumInsuranceAmount}</span>
                                        </td>
                                        <td>
                                            <span className={styles.investValue}>Single</span>
                                        </td>
                                        <td>
                                            <a href="javascript:;" className={styles.prefill}><span className={styles.prefillBtn}>Buy now</span></a>
                                        </td>
                                    </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={styles.tableContent}>
                        <div className={styles.titlte}>
                            <span className={styles.icon}></span>
                            <h2>Regular saving plan</h2>
                        </div>
                        <div className={styles.tableBox}>
                            <table>
                                <tr>
                                    <th>Goal name</th>
                                    <th>Product code & name</th>
                                    <th>Risk level</th>
                                    <th>Product currency</th>
                                    <th>Monthly investment</th>
                                    <th>Place order</th>
                                </tr>
                                <tbody>
                                {orderPlacementList.utRegularProdList==undefined?null:orderPlacementList.utRegularProdList.map(function(prod,index){
                                    return(
                                    <tr>
                                        <td>
                                            <span className={styles.prodName}>{prod.product.goalInfo[0].goalDescription}</span>
                                        </td>
                                        <td>
                                            <span className={styles.prodName}>{prod.product.productName}</span><br/>
                                            <span className={styles.prodCode}>{prod.prodCode}</span>
                                        </td>
                                        <td>
                                            <span className={classNames(styles.riskLevel, styles.riskLevelThree)}>{prod.riskLevel}</span>
                                        </td>
                                        <td>
                                            <span className={styles.currencyFlag}>{prod.product.currencyProductCode}</span>
                                        </td>
                                        <td>
                                            <span className={styles.investValue}>{prod.product.currencyProductCode} {prod.product.monthlySavingAmount}</span>
                                        </td>
                                        <td>
                                            <span>
                                                <input type="checkbox" className={styles.chkbox} id='chkbox{index}'></input>
                                                <label htmlFor='chkbox{index}'/>
                                            </span>
                                        </td>
                                    </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        {orderPlacementList.utRegularProdList==undefined?null:
                        <div className={styles.buttonGroup}>
                            <a href="javascript:;" className={styles.prefill}><span className={styles.regularSavingBtn}>Regular saving buy</span></a>
                        </div>
                        }
                    </div>
                    <div className={styles.bottom} >
                        <div className={styles.back}><a href="javascript:;" onClick={this.goToDashboardPageHandle}><FontIcon icon="chevron-left" className={styles.icon} />Back to generate report</a></div>
                        <div className={styles.decalration}><span>Disclaimer & declarations</span><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                    </div>
                    <Popup popupRef="viewGoalDetail" className={styles.popWindow} hideOnOverlayClick theme={styles}>{viewGoalDetailContent}</Popup>
                </div>
            </div>
        );
    }
}
