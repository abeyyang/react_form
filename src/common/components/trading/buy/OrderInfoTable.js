import React from 'react';
import bootstrap from '../../../styles/trading/bootstrap.scss';
import verTab from './ver_tab.scss';
import productsConfig from '../../../config/productsConfig';
import { FormattedMessage, injectIntl, FormattedHTMLMessage} from "react-intl";
import formatHelper from 'lib/formatHelper';

const OrderInfoTable = (props) => {
    const { productDetails, orderDateTime,intl} = props,
          { locale } = intl;
    return (<ul className={bootstrap['list-inline']}>    
        {
            orderDateTime?
            <li>
                <p className={verTab['vlist-li']}>
                   {intl.formatMessage({id: "orderinfotable.orderdate"})}
                </p>
                <p className={verTab.vlink} style={/en/.test(locale)?{width:"220px",textAlign:"right"}:{width:"210px",textAlign:"right"}}>
                <FormattedMessage id="timeZone.note_1"/>{orderDateTime}<FormattedHTMLMessage id="timeZone.note_2"/>
                </p>
            </li>
            :
            ''
        }
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.instruction"})}
            </p>
            <p className={verTab.vlink}>
                {intl.formatMessage({id: "orderinfotable.buy"})}
            </p>
        </li>
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.elicode"})}
            </p>
            <p className={verTab.vlink}>
                { productDetails.eliCode }
            </p>
        </li>
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.productname"})}
            </p>
            <p className={verTab.vlink}>
                { productDetails.productName }
            </p>
        </li>
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.elitype"})}
            </p>
            <p className={verTab.vlink}>
                {formatHelper.getNLS(intl.formatMessage, productDetails.eliType)}
            </p>
        </li>
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.currency"})}
            </p>
            <p className={verTab.vlink}>
               {formatHelper.getNLS(intl.formatMessage, productDetails.currency)}
            </p>
        </li>
        <li>
            <p className={verTab['underlying-left']}>
              {intl.formatMessage({id: "orderinfotable.underlyingstockcode"})} 
            </p>
            <p className={verTab['underlying-right']}>
                { 
                    productDetails.underlyingStockCode.map((code, index) => {
                        return <span key={index} style={{display: 'block'}}>{code}</span>
                    })
                }
            </p>
            <p className={verTab['clear']}></p>
        </li>
        <li>
            <p className={verTab['underlying-left']}>
                {intl.formatMessage({id: "orderinfotable.underlyingstockname"})} 
            </p>
            <p className={verTab['underlying-right']}>
                { 
                    productDetails.underlyingStockName.map((name, index) => {
                        if (name.length > productsConfig.maxStringLength) {
                            return <span key={index} style={{display: 'block'}} title={name}>{name.substring(0,productsConfig.maxStringLength)}...</span> 
                        }
                        return <span key={index} style={{display: 'block'}}>{name}</span>
                    })                  
                }
            </p>
            <p className={verTab['clear']}></p>
        </li>  
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.tenor"})}
            </p>
            <p className={verTab.vlink}>
                { productDetails.tenor_num }
                {formatHelper.getNLS(intl.formatMessage, productDetails.tenor_unit)}
            </p>
        </li>
        <li>
            <p className={verTab['vlist-li']}>
                 {intl.formatMessage({id: "orderinfotable.offerperiod"})}
            </p>
            <p className={verTab.vlink}>
                { productDetails.offeringPeriod_start_date }
                    {intl.formatMessage({id: "allpageto.to"})}
                { productDetails.offeringPeriod_end_date }
            </p>
        </li>                   
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.tradedate"})}
            </p>
            <p className={verTab.vlink}>
                { productDetails.tradeDate }
            </p>
        </li>
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.issuedate"})}
            </p>
            <p className={verTab.vlink}>
                { productDetails.issueDate }
            </p>
        </li>
        <li>
            <p className={verTab['vlist-li']}>
               {intl.formatMessage({id: "orderinfotable.expiredate"})}
            </p>
            <p className={verTab.vlink}>
                { productDetails.expiryDate }
            </p>
        </li>
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.settlementdate"})}
            </p>
            <p className={verTab.vlink}>
                { productDetails.settlementDate }
            </p>
        </li>
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.tradeprice"})}
            </p>
            <p className={verTab.vlink}>
                { productDetails.tradePrice }
            </p>
        </li>  
        <li>
            <p className={verTab['vlist-li']}>
                 {intl.formatMessage({id: "orderinfotable.autocallfrequency"})}
            </p>
            
            
            <p className={verTab.vlink}>
                {formatHelper.getNLS(intl.formatMessage, productDetails.autocallFrequency)}
            </p>
        </li>              
        <li>
            <p className={verTab['vlist-li']}>
            {intl.formatMessage({id: "orderinfotable.callprice"})}
            </p>
            <p className={verTab.vlink}>
                { productDetails.callPrice }
            </p>
        </li>
        <li>
            <p className={verTab['vlist-li']}>
            {intl.formatMessage({id: "orderinfotable.knockinfrequencny"})} 
            </p>
            <p className={verTab.vlink}>
                {formatHelper.getNLS(intl.formatMessage, productDetails.knockInFrequency)}
            </p>
        </li>        
        <li>
            <p className={verTab['vlist-li']}>
             {intl.formatMessage({id: "orderinfotable.knockinprice"})} 
            </p>
            <p className={verTab.vlink}>
                { productDetails.knockInPrice }
            </p>
        </li> 
        <li>
            <p className={verTab['vlist-li']}>
               {intl.formatMessage({id: "orderinfotable.floorprice"})} 
            </p>
            <p className={verTab.vlink}>
                { productDetails.floorPrice }
            </p>
        </li> 
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.exerciseprice"})}<br/><br/>
                <small>{intl.formatMessage({id: "orderinfotable.exercisepriceadd"})}</small>
            </p>
            <p className={verTab.vlink}>
                { productDetails.exercisePrice_from }
                {intl.formatMessage({id: "allpageto.to"})}
                { productDetails.exercisePrice_to }
            </p>
        </li>  
        <li>
            <p className={verTab['vlist-li']}>
                {intl.formatMessage({id: "orderinfotable.fixedcashdividendrate"})}
            </p>
            <p className={verTab.vlink} style={{textAlign:'right'}}>
                {
                    productDetails.fixedCashDividendRate
                    ?
                    <span>
                        { productDetails.fixedCashDividendRate }
                        {formatHelper.getNLS(intl.formatMessage, productDetails.ratePercentagePerAnnum)}
                        <br/>
                        {intl.formatMessage({id: "brackets_L",tagName:"strong"})}{ productDetails.fixedCashDividendRate_Pa }{intl.formatMessage({id: "lable_perAnnum"})}{intl.formatMessage({id: "brackets_R",tagName:"strong"})}
                    </span>
                    :
                    <span>--</span>
                }                
            </p>
        </li> 
        <li>
            <p className={verTab['vlist-li']}>
               {intl.formatMessage({id: "orderinfotable.dayincashdividendrate"})}
            </p>
            <p className={verTab.vlink} style={{textAlign:'right'}}>
                {
                    productDetails.dayinCashDividendRate
                    ?
                    <span>
                        { productDetails.dayinCashDividendRate }
                        {formatHelper.getNLS(intl.formatMessage, productDetails.ratePercentagePerAnnum)}
                        <br/>
                        {intl.formatMessage({id: "brackets_L",tagName:"strong"})}{ productDetails.dayinCashDividendRate_pa }{intl.formatMessage({id: "lable_perAnnum"})}{intl.formatMessage({id: "brackets_R",tagName:"strong"})}
                    </span>
                    :
                    <span>--</span>
                }
            </p>
        </li> 
        <li>
            <p className={verTab['vlist-li']}>
                  {intl.formatMessage({id: "orderinfotable.dayoutcashdividendrate"})}
            </p>
            <p className={verTab.vlink} style={{textAlign:'right'}}>
                {
                    productDetails.dayoutCashDividendRate
                    ?
                    <span>
                        { productDetails.dayoutCashDividendRate }
                        {formatHelper.getNLS(intl.formatMessage, productDetails.ratePercentagePerAnnum)}
                        <br/>
                        {intl.formatMessage({id: "brackets_L",tagName:"strong"})}{ productDetails.dayoutCashDividendRate_Pa }{intl.formatMessage({id: "lable_perAnnum"})}{intl.formatMessage({id: "brackets_R",tagName:"strong"})}
                    </span>
                    :
                    <span>--</span>
                }
            </p>
        </li>                 
    </ul>);
};

export default injectIntl(OrderInfoTable);
