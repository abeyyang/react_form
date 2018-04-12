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
        const {theme,intl,row} = this.props;
        const orderId = "";
        const orderStatus = "";
        const leftArrow = this.state.showLeftArrow ? styles.active : styles.inactive;
        const rightArrow = this.state.showRightArrow ? styles.active : styles.inactive;
        //const displayCancelButton = order.allowOrderCancellationIndicator === 'true' ? true : false;
        return (
            <div className={classNames(styles.contextualMenu, theme.contextualMenu)}>
                <div className={classNames(styles.productDetails)}>
                    <div className={styles.header}>
                        <p className={styles.subTitle}>U62494 AB-American Income Portfolio (AT-SGDH-MDIST Cash) <input type="button" onClick={this.props.close.bind(this)} value="close"/></p>
                    </div>
                    <div className={styles.main}>
                        <ul>
                            <li className={styles.row}>
                                <span className={styles.left}>riskLevel</span>
                                <span className={styles.right}>4</span>
                                <span className={styles.skip}></span>
                            </li>
                                
                            <li className={styles.row}>
                                <span className={styles.left}>productCurrency</span>
                                <span className={styles.right}>HKD</span>
                            </li>
                        </ul>
                        <ul>
                            <li className={styles.row}>
                                <span className={styles.left}>NAV price</span>
                                <span className={styles.right}>14,960</span>
                                <span className={styles.skip}></span>
                            </li>
                            <li className={styles.row}>
                                <span className={styles.left}>6 MTH%</span>
                                <span className={styles.right}>+5.32%</span>
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
                                <span className={styles.right}>+19.94%</span>
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
                                <span className={styles.right}>-3.27</span>
                            </li>
                        </ul>
                        <ul>
                            <li className={styles.row}>
                                <span className={styles.left}>Price Date</span>
                                <span className={styles.right}>19 Apr 2017</span>
                                <span className={styles.skip}></span>
                            </li>
                            <li className={styles.row}>
                                <span className={styles.left}>High Yield bond fund</span>
                                <span className={styles.right}>Yes</span>
                            </li>
                        </ul>
                        <ul>
                            <li className={styles.row}>
                                <span className={styles.left}>Min. Investment amount</span>
                                <span className={styles.right}>1,000</span>
                                <span className={styles.skip}></span>
                            </li>
                            <li className={styles.row}>
                                <span className={styles.left}>Fund requiring derivative knowladge</span>
                                <span className={styles.right}>No</span>
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
