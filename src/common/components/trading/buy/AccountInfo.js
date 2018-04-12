import React from 'react';
import verCon from './ver_con.scss';
import OrderInputConfig from '../OrderInputConfig';
import {toDisplayModeNumberStyle} from '../numberUtils';
import {FormattedMessage, injectIntl} from "react-intl";
import {judgeSettlementMethod} from '../../../services/static/proDetail'
import formatHelper from "lib/formatHelper";

const AccountInfo = (prompt) => {
    const { orderRequestDataInDisplayMode, orderAmount, intl } = prompt;
    return (
        <div>
            {
                orderAmount
                ?
                <div className={verCon['v-con']}>
                    <p>{intl.formatMessage({id: "accountinfo.orderamount"})}</p>
                    <p>
                        <strong>
                            {formatHelper.getNLS(intl.formatMessage, orderRequestDataInDisplayMode.productDetails.currency)}
                            {' '}                        
                            {toDisplayModeNumberStyle(orderAmount, 2)}
                        </strong>
                    </p>
                </div>
                :
                <div className={verCon['v-con']}>
                    <p>{intl.formatMessage({id: "accountinfo.orderamount"})}</p>
                    <p>
                        <strong>
                            {formatHelper.getNLS(intl.formatMessage, orderRequestDataInDisplayMode.productDetails.currency)}
                            {' '}                        
                            {toDisplayModeNumberStyle(orderRequestDataInDisplayMode.amount, 2)}
                        </strong>
                    </p>
                </div>
            }
            <div className={verCon['v-con']}>
                <p>{intl.formatMessage({id: "accountinfo.investmentaccount"})}</p>
                <p>
                    <strong>
                        {orderRequestDataInDisplayMode.investmentAccount}
                    </strong>
                </p>
            </div>
            <div className={verCon['v-con']}>
                <p>{intl.formatMessage({id: "accountinfo.settlementaccount"})}</p>
                <p>
                    <strong>
                        {orderRequestDataInDisplayMode.settlementAccount}
                    </strong>
                </p>
            </div>
            <div className={verCon['v-con']} style={{borderBottom:'1px solid #ccc'}}>
                <p>{intl.formatMessage({id: "accountinfo.settlementmethod"})}</p>
                <p>
                    <strong>
                        <FormattedMessage id = {judgeSettlementMethod(OrderInputConfig.settlementMethod[orderRequestDataInDisplayMode.settlementMethod] )}/>
                    </strong>
                </p>
            </div>                         
        </div>
    );
};
export default injectIntl(AccountInfo);
