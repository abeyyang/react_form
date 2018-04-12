import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import RouteHelper from 'lib/routeHelper';
import formatHelper from 'lib/formatHelper'
import bootstrap from '../../../styles/trading/bootstrap.scss';
import api from '../../../services/OrderInputService';
import withLoadingScreenBeforeReadyToLeave
    from '../withLoadingScreenBeforeReadyToLeave';
import verCon from './ver_con.scss';
import verTab from './ver_tab.scss';
import OrderInfoTable from './OrderInfoTable';
import AccountInfo from './AccountInfo';
import productsConfig from '../../../config/productsConfig';
import FontIcon from 'wealth/lib/web/components/ui/fonticon';
import moment from 'moment-timezone';
import { FormattedMessage, injectIntl, FormattedHTMLMessage} from "react-intl";

class VerifyPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            errorMsg: '',
            checkboxTriggle_1: false,
            checkboxTriggle_2: false,
            checkboxTriggle_3: false,
            checkboxTriggle_4: false
        };
        this.showHideChkbox_1 = this.showHideChkbox_1.bind(this);
        this.showHideChkbox_2 = this.showHideChkbox_2.bind(this);
        this.showHideChkbox_3 = this.showHideChkbox_3.bind(this);
        this.showHideChkbox_4 = this.showHideChkbox_4.bind(this);
        this.goToConfirmPage = this.goToConfirmPage.bind(this);
        this.goToBackHandler = this.goToBackHandler.bind(this);
        this.getCurrentLocale = this.getCurrentLocale.bind(this);
    }

    static propTypes = {
        orderRequestDataInDisplayMode: React.PropTypes.object.isRequired,
        productDetails: React.PropTypes.object.isRequired,
        children: React.PropTypes.object,
        listenPromise: React.PropTypes.object,
        router: React.PropTypes.object,
        routing: React.PropTypes.func
    };

    goToConfirmPage (event) {
        let productkey_P = this.props.productDetails.productkey_P;
        const { locale } = this.props;
        const createOrder = () => {
            const param = {
                "customerRiskLevelCode": this.props.customerRiskLevel.customerRiskLevel,
                "actionPortfolioOrderCode": "U",
                "actionRequestCode": "C",
                "portfolioOrderTypeCode": this.props.orderRequestDataInDisplayMode.settlementMethod,
                "orderQuantity": this.props.orderRequestDataInDisplayMode.amount/this.props.productDetails.nominalAmount,
                "orderAmount": this.props.orderRequestDataInDisplayMode.amount,
                "orderAmountCurrency": this.props.productDetails.currency,
                "investmentAccountChecksum": this.props.orderRequestDataInDisplayMode.investmentAccount_checksum,
                "settlementAccountChecksum": this.props.orderRequestDataInDisplayMode.settlementAccount_checksum,
                "acknowledgeCustomerRiskExceptionIndicator":true,
                "productId": {
                    "currencyProductCode": productkey_P.currencyProductCode,
                    "productAlternativeNumber": productkey_P.productAlternativeNumber,
                    "productAlternativeClassificationCode": productkey_P.productCodeAlternativeClassCode,
                    "countryProductTradableCode": productkey_P.productTradableCode,
                    "productTypeCode": productkey_P.productTypeCode
                }
            }
            console.log('create order request: '+JSON.stringify(param));
            return api.createOrder(param);
        };
        this.props.listenPromise(createOrder).then((resp) => {
            if (resp && resp.response.PAYLOAD && resp.response.PAYLOAD.portfolioOrderId) {
                this.setState({
                    errorMsg:''
                })
                let orderRefType = resp.response.PAYLOAD.portfolioOrderId.portfolioOrderReferenceTypeCode;
                let orderRefNumber = resp.response.PAYLOAD.portfolioOrderId.portfolioOrderReferenceNumber;
                let orderDateTime =`${formatHelper.dateFormat_1(resp.response.PAYLOAD.orderReceiveDateTime)}${/en/.test(locale)?' ':''}${formatHelper.timeFormat_1(resp.response.PAYLOAD.orderReceiveDateTime)}`//.format("DD MMM YYYY h:mm a").replace('am', 'a.m.').replace('pm', 'p.m.');
                let orderAmount = resp.response.PAYLOAD.orderAmount;
                const locale = this.getCurrentLocale();
                const routerParams = {
                    pathname: `/${locale}/buy/confirm`,
                    state: {
                        'orderRefType': orderRefType,
                        'orderRefNumber': orderRefNumber,
                        'orderDateTime': orderDateTime,
                        'orderAmount' : orderAmount
                    }
                };
                this.props.router.push(routerParams);
            } else {
                // this.setState({
                //     errorMsg:resp.ERROR[0].reasonCode 
                // })

                this.props.showApiCallingError(true,resp.response);
            }
        });
    }

    getCurrentLocale () {
        const { routing } = this.props;
        const pathname = routing.locationBeforeTransitions.pathname;
        const path = RouteHelper.formatPath(pathname);
        return path.locale;
    }

    showHideChkbox_1 () {
        this.setState({
            checkboxTriggle_1: !this.state.checkboxTriggle_1
        });
    }

    showHideChkbox_2 () {
        this.setState({
            checkboxTriggle_2: !this.state.checkboxTriggle_2
        });
    }

    showHideChkbox_3 () {
        this.setState({
            checkboxTriggle_3: !this.state.checkboxTriggle_3
        });
    }

    showHideChkbox_4 () {
        this.setState({
            checkboxTriggle_4: !this.state.checkboxTriggle_4
        });
    }        

    goToBackHandler (event) {
        const locale = this.getCurrentLocale();
        const target = `/${locale}/buy`;
        this.props.router.push(target);
    }

    render () {
        const { locale,intl } = this.props;
        const orderRequestDataInDisplayMode = this.props.orderRequestDataInDisplayMode;
        const productDetails = this.props.productDetails;
        let disableConfirmBtn = false;
        if (this.state.checkboxTriggle_1 && 
            this.state.checkboxTriggle_2 &&
            this.state.checkboxTriggle_3 && 
            this.state.checkboxTriggle_4) {
                disableConfirmBtn = true;
        }
        return (
            <div className={verTab.trading}>
                <article className={bootstrap.row}>
                    <h3
                        className={classNames(
                            verTab['ver-tit'],
                            bootstrap['col-sm-12'],
                            bootstrap['col-xs-12']
                        )}
                    >
                        <FormattedMessage id="verifypage.verify"/>
                    </h3>
                    <div 
                        className={classNames(
                            bootstrap['col-sm-12'],
                            bootstrap['col-xs-12'],
                            verTab['cutoffTime']
                        )}
                    >
                      <FormattedMessage id="verifypage.note_top_1"/><FormattedMessage id="timeZone.note_1"/>{productDetails.cutoffTime}<FormattedHTMLMessage id="timeZone.note_2"/><FormattedMessage id="verifypage.note_top_2"/>
                    </div>
                    <div
                        className={classNames(
                            bootstrap.row,
                            bootstrap['col-sm-12'],
                            bootstrap['col-xs-12']
                        )}
                    >
                        <div
                            className={classNames(
                                verTab['verify-list'],
                                bootstrap['col-lg-5'],
                                bootstrap['col-md-5'],
                                bootstrap['col-sm-12'],
                                bootstrap['col-xs-12']
                            )}
                        >
                            <OrderInfoTable
                                productDetails={productDetails}
                            />
                        </div>
                        <div
                            className={classNames(
                                verCon['verify-content'],
                                bootstrap['col-lg-7'],
                                bootstrap['col-md-7'],
                                bootstrap['col-sm-12'],
                                bootstrap['col-xs-12']
                            )}
                        >
							<section>
                                <AccountInfo orderRequestDataInDisplayMode={orderRequestDataInDisplayMode} />
                                <div className={verCon['v-con']} style={{borderTop:'0px'}}>
                                    <p className={verCon.importantDocuments}><FormattedMessage id="verifypage.importdoc"/></p>
                                    <p style={{fontSize:'14px', }}>
                                    <FormattedMessage id="verifypage.importdoc_1"/>
                                    </p>
                                    <p style={{fontSize:'14px'}}>
                                    <FormattedMessage id="verifypage.importdoc_2"/>
                                    </p>
                                    {
                                        productDetails.indicativeTermsheet?
                                        <p className={verCon.padding_10}>
                                            <a
                                                target="_blank"
                                                href={productDetails.indicativeTermsheet}>
                                                 <FormattedMessage id="label_indicativeTermsheet_links"/>
                                                <span className={verCon.vred}>
                                                    &nbsp;&nbsp;&gt;
                                                </span>
                                            </a>
                                        </p>
                                        :''
                                    }
                                    <p className={verCon.padding_10}>
                                        <a
                                            target="_blank"
                                            href={intl.formatMessage({id: "links_programmeMemorandum"})} >
                                             <FormattedMessage id="label_programmeMemorandum_links"/>
                                            <span className={verCon.vred}>
                                                &nbsp;&nbsp;&gt;
                                            </span>
                                        </a>
                                    </p>
                                    <p className={verCon.padding_10}>
                                        <a
                                            target="_blank"
                                            href={intl.formatMessage({id: "links_financialDisclosureDocument"})} >
                                             <FormattedMessage id="label_financialDisclosureDocument_links"/>
                                            <span className={verCon.vred}>
                                                &nbsp;&nbsp;&gt;
                                            </span>
                                        </a>
                                    </p>
                                    <p className={verCon.padding_10}>
                                        <a
                                            target="_blank"
                                            href={productDetails.underlyingStockName.length > 1 ? intl.formatMessage({id: "links_productBooklet_basket"}) : intl.formatMessage({id: "links_productBooklet_single"})} >
                                             <FormattedMessage id="label_productBooklet_links"/>
                                            <span className={verCon.vred}>
                                                &nbsp;&nbsp;&gt;
                                            </span>
                                        </a>
                                    </p> 
                                    {
                                        productDetails.programmeMemorandum?
                                        <p className={verCon.padding_10}>
                                            <a
                                                target="_blank"
                                                href={intl.formatMessage({id: "links_a_ProgrammeMemorandum"})} >
                                                 <FormattedMessage id="label_ProgrammeMemorandum_links"/>
                                                <span className={verCon.vred}>
                                                    &nbsp;&nbsp;&gt;
                                                </span>
                                            </a>
                                        </p>
                                        :''
                                    }
                                    {
                                        productDetails.financialDisclosureDocument?
                                        <p className={verCon.padding_10}>
                                            <a
                                                target="_blank"
                                                href={intl.formatMessage({id: "links_a_FinancialDisclosureDocument"})} >
                                                 <FormattedMessage id="label_FinancialDisclosureDocument_links"/>
                                                <span className={verCon.vred}>
                                                    &nbsp;&nbsp;&gt;
                                                </span>
                                            </a>
                                        </p>
                                        :''
                                    }
                                    {
                                        productDetails.productBooklet?
                                        <p className={verCon.padding_10}>
                                            <a
                                                target="_blank"
                                                href={intl.formatMessage({id: "links_a_ProductBooklet"})} >
                                                 <FormattedMessage id="label_addenDumproductBooklet_links"/>
                                                <span className={verCon.vred}>
                                                    &nbsp;&nbsp;&gt;
                                                </span>
                                            </a>
                                        </p>
                                        :''
                                    } 
                                </div>
                                <div
                                    className={classNames(
                                        verCon['v-con'],
                                        verCon['v-last']
                                    )}
                                >
                                    <div className={verCon.prompt}>
                                        <p className={verCon.title}>
                                             <FormattedMessage id="verifypage.declarations"/>
                                        </p>
                                        <p className={verCon.prompt}>
                                            <input
                                                type="checkbox"
                                                className={classNames(
                                                    verCon.chkbox,
                                                    verTab.fl
                                                )}
                                                id="chkbox_1"
                                                checked={this.state.checkboxTriggle_1}
                                            />
                                            <label
                                                htmlFor="chkbox_1"
                                                style={{float:'left'}}
                                                onClick={this.showHideChkbox_1}
                                            />
                                            <span
                                                className={classNames(
                                                    verCon['chk-description'],
                                                    verTab.fr
                                                )}
                                            >
                                                 <FormattedMessage id="verifypage.declarations_note_1"/>
                                            </span>
                                            <span className={verTab.clear} />
                                        </p>
                                        <p className={verCon.prompt}>
                                            <input
                                                type="checkbox"
                                                className={classNames(
                                                    verCon.chkbox,
                                                    verTab.fl
                                                )}
                                                id="chkbox_2"
                                                checked={this.state.checkboxTriggle_2}
                                            />
                                            <label
                                                htmlFor="chkbox_2"
                                                onClick={this.showHideChkbox_2}
                                            />
                                            <span
                                                className={classNames(
                                                    verCon['chk-description'],
                                                    verTab.fr
                                                )}
                                            >
                                               <FormattedMessage id="verifypage.declarations_note_2"/><span style={{color:'blue'}}><FormattedMessage id="verifypage.declarations_note_2_1"/></span><FormattedMessage id="verifypage.declarations_note_2_2"/>
                                            </span>
                                            <span className={verTab.clear} />
                                        </p>
                                        <p className={verCon.prompt}>
                                            <input
                                                type="checkbox"
                                                className={classNames(
                                                    verCon.chkbox,
                                                    verTab.fl
                                                )}
                                                id="chkbox_3"
                                                checked={this.state.checkboxTriggle_3}
                                            />
                                            <label
                                                htmlFor="chkbox_3"
                                                onClick={this.showHideChkbox_3}
                                            />
                                            <span
                                                className={classNames(
                                                    verCon['chk-description'],
                                                    verTab.fr
                                                )}
                                            >   
                                                 <FormattedMessage id="verifypage.declarations_3"/><a href={intl.formatMessage({id: "links_investorDeclarations"})} target="_blank" style={ /en/.test(locale) ? {color:'red', textDecoration:'underline'} :{color:'red', textDecoration:'none'}}><FormattedMessage id="verifypage.declarations_3_1"/></a><FormattedMessage id="verifypage.declarations_3_2"/>
                                            </span>
                                            <span className={verTab.clear} />
                                        </p>
                                        <p className={verCon.prompt}>
                                            <input
                                                type="checkbox"
                                                className={classNames(
                                                    verCon.chkbox,
                                                    verTab.fl
                                                )}
                                                id="chkbox_4"
                                                checked={this.state.checkboxTriggle_4}
                                            />
                                            <label
                                                htmlFor="chkbox_4"
                                                onClick={this.showHideChkbox_4}
                                            />
                                            <span
                                                className={classNames(
                                                    verCon['chk-description'],
                                                    verTab.fr
                                                )}
                                            >
                                                 <FormattedMessage id="verifypage.declarations_4"/>
                                                <br/>
                                                 <FormattedMessage id="verifypage.declarations_4_1"/>
                                                <br/>
                                                 <FormattedMessage id="verifypage.declarations_4_2"/>
                                                <br/>
                                                 <FormattedMessage id="verifypage.declarations_4_3"/>
                                                <br/>
                                                 <FormattedMessage id="verifypage.declarations_4_4"/>
                                            </span>
                                            <span className={verTab.clear} />
                                        </p>                                                                                
                                    </div>
                                </div>
                            </section>
                            <div>
                                {this.state.errorMsg ? 
                                    <div className={verTab.error}>
                                        Error : {this.state.errorMsg}
                                    </div>
                                    :   
                                    ''
                                }

                                <div
                                    className={classNames(
                                        verCon['verify-back'],
                                        verTab.fl
                                    )}
                                >
                                    <a onClick={this.goToBackHandler}>
                                        <span className={verCon.vred}>
                                            &nbsp;&nbsp;&lt;
                                        </span>
                                        {' '}
                                         <FormattedMessage id="verifypage.back"/>                             
                                    </a>
                                </div>
                                <div
                                    className={classNames(
                                        verCon['verify-confirm'],
                                        verTab.fr
                                    )}
                                >
                                    <a
                                        className={verCon.cover}
                                        style={{
                                            display: disableConfirmBtn && 'none' || 'block'
                                        }}
                                    >
                                         <FormattedMessage id="verifypage.confirm"/>                                    
                                    </a>
                                    <a onClick={this.goToConfirmPage}>
                                        <FormattedMessage id="verifypage.confirm"/>
                                    </a>
                                </div>
                                <div className={verTab.clear} />
                            </div>
                        </div>
                    </div>
                    <div className={verTab.clear}></div>
                    <div className={verTab.note_section}>
                        <FontIcon icon="circle-info" className={verTab.note_icon}/>
                        <div className={verTab.note_content}>
                        {
                            !(/en/.test(locale))?<span><FormattedMessage id="verifypage.note_bottom_1"/><br/>
                                <FormattedMessage id="verifypage.note_bottom_2"/><br/>
                                <FormattedMessage id="verifypage.note_bottom_3"/><br/></span>:<FormattedMessage id="verifypage.note_bottom"/>                      
                        }                      
                        </div>
                    </div>
                    {this.props.children}
                </article>
            </div>
            );
        }
    }

VerifyPage.propTypes = {};

export default withLoadingScreenBeforeReadyToLeave(injectIntl(VerifyPage));
