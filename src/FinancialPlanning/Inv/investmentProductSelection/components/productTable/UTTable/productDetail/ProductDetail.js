import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import RouteHelper from 'common/lib/routeHelper';
import styles from './style.scss';
import {FormattedMessage, injectIntl} from "react-intl"

class ProductDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            overflow: false,
            showLeftArrow: false,
            showRightArrow: false
        };

    }
    
    render () {
        const {theme,intl,row,data} = this.props;
        const orderId = "";
        const orderStatus = "";
        const leftArrow = this.state.showLeftArrow ? styles.active : styles.inactive;
        const rightArrow = this.state.showRightArrow ? styles.active : styles.inactive;
        console.log("data console", data);
        let product = {};
        if(data != undefined){
           product = data[0];
        }
        let attribute = {};
        if(product.attribute != undefined){
            attribute = product.attribute;
        }
        let productAmount = {};
        if(product.productAmount != undefined){
            productAmount = product.productAmount;
        }
        //const displayCancelButton = order.allowOrderCancellationIndicator === 'true' ? true : false;
        return (
            <div className={classNames(styles.contextualMenu, theme.contextualMenu)}>
                <div className={classNames(styles.productDetails)}>
                    <div className={styles.header}>
                        <p className={styles.subTitle}>{attribute.prodAltPrimNum} {attribute.prodName} <input type="button" onClick={this.props.close.bind(this)} value="close"/></p>
                    </div>
                    <div className={styles.main}>
                        <ul>
                            <li className={styles.row}>
                                <span className={styles.left}>riskLevel</span>
                                <span className={styles.right}>{attribute.riskLvlCde}</span>
                                <span className={styles.skip}></span>
                            </li>
                                
                            <li className={styles.row}>
                                <span className={styles.left}>productCurrency</span>
                                <span className={styles.right}>{attribute.ccyProdCde}</span>
                            </li>
                        </ul>
                        <ul>
                            <li className={styles.row}>
                                <span className={styles.left}>NAV price</span>
                                <span className={styles.right}>-</span>
                                <span className={styles.skip}></span>
                            </li>
                            <li className={styles.row}>
                                <span className={styles.left}>6 MTH%</span>
                                <span className={styles.right}>{attribute.varPrc6MthPct_PERFRM}%</span>
                            </li>
                        </ul>
                        <ul>
                            <li className={styles.row}>
                                <span className={styles.left}>BID price</span>
                                <span className={styles.right}>-</span>
                                <span className={styles.skip}></span>
                            </li>
                            <li className={styles.row}>
                                <span className={styles.left}>1 YR%</span>
                                <span className={styles.right}>{attribute.varPrc1YrPct_PERFRM}%</span>
                            </li>
                        </ul>
                        <ul>
                            <li className={styles.row}>
                                <span className={styles.left}>Ask price</span>
                                <span className={styles.right}>-</span>
                                <span className={styles.skip}></span>
                            </li>
                            <li className={styles.row}>
                                <span className={styles.left}>YTD%</span>
                                <span className={styles.right}>{attribute.varPrcYtdPct_PERFRM}%</span>
                            </li>
                        </ul>
                        <ul>
                            <li className={styles.row}>
                                <span className={styles.left}>Price Date</span>
                                <span className={styles.right}>{attribute.prcEffDt}</span>
                                <span className={styles.skip}></span>
                            </li>
                            <li className={styles.row}>
                                <span className={styles.left}>High Yield bond fund</span>
                                <span className={styles.right}>{attribute.highYieldBondFundInd}</span>
                            </li>
                        </ul>
                        <ul>
                            <li className={styles.row}>
                                <span className={styles.left}>Min. Investment amount</span>
                                <span className={styles.right}>{productAmount.invstInitMinAmt} {productAmount.currencyCode}</span>
                                <span className={styles.skip}></span>
                            </li>
                            <li className={styles.row}>
                                <span className={styles.left}>Fund requiring derivative knowladge</span>
                                <span className={styles.right}>{attribute.fundDerivteKnowldgRequiredInd}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

ProductDetail.defaultProps = {
    theme: {}
};

ProductDetail.propTypes = {
    theme: PropTypes.object
};

export default injectIntl(ProductDetail);
