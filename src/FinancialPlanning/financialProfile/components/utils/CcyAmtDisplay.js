import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import CcyAmtDisplayer from 'common/components/Output/CcyAmtDisplayer';

class CcyAmtDisplay extends Component {
    render() {
        let ccyAmtObj = this.props.ccyAmtObj;
        let ccyFxObj = this.props.ccyFxObj;
        const {intl} = this.props;
        if(!this.props.ccyAmtObj){
             return   <CcyAmtDisplayer ccyAmtObj={this.props.ccyAmtObj}/>;
        }else{
        let tempObj={
            amt:ccyAmtObj.amt,
            ccyCode:ccyAmtObj.ccyCode
        }
        if(tempObj.amt==''&&tempObj.ccyCode==''){
        console.log('tempObj initial is empty',tempObj);
        return <span>{tempObj.amt=' '+tempObj.ccyCode}</span>;
        }
        if (null!=ccyAmtObj.ccyCode && null != ccyFxObj && ccyFxObj.targetCurrency != ccyAmtObj.ccyCode) {           
                tempObj.amt = accMul(ccyAmtObj.amt, ccyFxObj.fxrateValue);
                tempObj.ccyCode=ccyFxObj.targetCurrency;            
        }
        console.log('CcyAmtDisplay tempObj',tempObj);
        return <CcyAmtDisplayer ccyAmtObj={tempObj}/>;
    }
}
}

export default injectIntl(CcyAmtDisplay);


function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}