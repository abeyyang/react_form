import React, { Component, PropTypes } from 'react';
import padStart from 'lodash/padStart';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fonticon';
import RouteHelper from 'lib/routeHelper';
import bootstrap from '../../../styles/trading/bootstrap.scss';
import verTab from './ver_tab.scss';
import verCon from './ver_con.scss';
import OrderInfoTable from './OrderInfoTable';
import AccountInfo from './AccountInfo';
import {FormattedMessage, injectIntl} from "react-intl";

class ConfirmationPage extends Component {
    constructor (props) {
        super(props);
        this.state = {
            orderRefNum: null
        };
        this.getCurrentLocale = this.getCurrentLocale.bind(this);
        this.goToOrderStatus = this.goToOrderStatus.bind(this);
        this.goToProductListPage = this.goToProductListPage.bind(this);
        this.printHandle = this.printHandle.bind(this);
    }

    componentWillMount () {
        this.props.changeAccount(this.props.orderRequestDataInDisplayMode.investmentAccount_checksum);
        const { orderRefNumber, orderRefType } = this.props.location.state;
        this.setState({
            orderRefNum: `${orderRefType}-${padStart(orderRefNumber, 6, '0')}`
        });
    }

    goToOrderStatus () {
        const locale = this.getCurrentLocale();
        this.props.router.push(`/${locale}/order-status`);
    }

    getCurrentLocale () {
        const { routing } = this.props;
        const pathname = routing.locationBeforeTransitions.pathname;
        const path = RouteHelper.formatPath(pathname);
        return path.locale;
    }

    goToProductListPage = () => {
        const locale = this.getCurrentLocale();
        this.props.router.push(`/${locale}/portfolio`);
    }

    printHandle (e) {
        window.print();
    }

    render () {
        const orderRequestDataInDisplayMode = this.props.orderRequestDataInDisplayMode;
        const productDetails = this.props.productDetails;
        return (
            <div className={verTab.trading}>
                <article className={bootstrap.row}>
                    <h3 className={classNames(verTab['ver-tit'], bootstrap['col-sm-12'], bootstrap['col-xs-12'])}>
                        <FormattedMessage id="confirmation.confirmation"/> 
                    </h3>
                    <p className={classNames(verCon['v-result'], bootstrap['col-sm-12'], bootstrap['col-xs-12'])}>
                        <FontIcon icon="circle-confirmation" className={verCon['v-circle']} />
                        <span className={verCon['v-txt']} style={{paddingTop:'8px', fontSize:'14px', lineHeight:'18px'}}>
                            <strong><FormattedMessage id="confirmation.confirmation_1_1"/></strong><br/>
                            <FormattedMessage id="confirmation.confirmation_1_2"/>
                            {' '}
                            {this.state.orderRefNum}
                            <br/>
                            <FormattedMessage id="confirmation.confirmation_2_1"/>
                            <FormattedMessage id="confirmation.confirmation_2_2"/>
                        </span>
                    </p>
                    <div className={classNames(bootstrap.row, bootstrap['col-sm-12'], bootstrap['col-xs-12'])}>
                        <div
                            className={classNames(verTab['verify-list'], bootstrap['col-lg-5'], bootstrap['col-md-5'], bootstrap['col-sm-12'], bootstrap['col-xs-12'])}
                        >
                            <OrderInfoTable productDetails={productDetails} orderDateTime={this.props.location.state.orderDateTime} />
                        </div>
                        <div
                            className={classNames(verCon['verify-content'], bootstrap['col-lg-7'], bootstrap['col-md-7'], bootstrap['col-sm-12'], bootstrap['col-xs-12'])}
                        >
                            <section>
                                <AccountInfo orderRequestDataInDisplayMode={orderRequestDataInDisplayMode} orderAmount={this.props.location.state.orderAmount} />
                            </section>
                            <div className={classNames(verCon['verify-confirm'], verCon['verify-confirm-orderStatus'], verTab.fr)}>
                                <a onClick={this.goToOrderStatus} ><FormattedMessage id="confirmation.gotoorderstatus"/></a>
                            </div>
                            <div className={classNames(verCon['verify-confirm'], verTab.fr)}>
                                <a onClick={this.printHandle}><FormattedMessage id="confirmation.print"/></a>
                            </div>                            
                            <div
                                className={classNames(
                                    verCon['verify-back'],
                                    verTab.fl
                                )}
                            >
                                <a onClick={this.goToProductListPage}>
                                    <span className={verCon.vred}>
                                        &nbsp;&nbsp;&lt;
                                    </span>
                                    {' '}<FormattedMessage id="confirmation.backtoprolist"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}

ConfirmationPage.propTypes = {
    location: PropTypes.object,
    orderRequestDataInDisplayMode: PropTypes.object,
    router: React.PropTypes.object,
    routing: React.PropTypes.object
};

export default injectIntl(ConfirmationPage);
