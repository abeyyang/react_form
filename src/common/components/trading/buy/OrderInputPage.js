import React, { Component, PropTypes } from 'react';
import withLoadingScreenBeforeReady from '../withLoadingScreenBeforeReady';
import styles from './main.scss';
import OrderInputPanel from './OrderInputPanel';
import { FormattedMessage,injectIntl } from 'react-intl';
import productsConfig from '../../../config/productsConfig';
import _ from "lodash";

class OrderInputPage extends Component {
    
    render () {
        this.props.settlementAccountList.forEach( item=>{
            item.name = <FormattedMessage id={item.sub_key}/>;
        } );

        this.props.investmentAccountList.forEach( item=>{
            item.name = <FormattedMessage id={item.key}/>
        } );   

        this.props.productDetails.underlyingStockName = _.clone(this.props.productDetails[productsConfig.underlyingStockName[this.props.locale].val]);

        return (
            <div className={styles.trading}>
                <OrderInputPanel {...this.props} />
            </div>
        );
    }
}; 

OrderInputPage.propTypes = {
    delay: React.PropTypes.bool,
    params: React.PropTypes.object
};

const retrieveOrderInputPageInitData = (props) => {
    return Promise.all([
    ]);
};

const receiveNewPropsCallBack = (nextProps, props) => {

};

export default withLoadingScreenBeforeReady(
    OrderInputPage,
    retrieveOrderInputPageInitData,
    receiveNewPropsCallBack
);
