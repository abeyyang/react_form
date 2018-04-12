import React, { Component } from 'react';
import {FormattedMessage, injectIntl} from "react-intl";
import ccyConfig from '../../../config/ccyConfig'

 class CcyAmtDisplayer extends Component {
    render() {
        let ccyAmtObj = this.props.ccyAmtObj;
        let noNeedDecimal =this.props.noNeedDecimal;
        const {intl} = this.props;
        return <span>{formatCcyAmt(intl,ccyAmtObj,{noNeedDecimal:noNeedDecimal})}</span>;        
    }
}

export default injectIntl(CcyAmtDisplayer);

export const formatCcyAmt = (intl,ccyAmtObj,opt)=>{
    if(null==ccyAmtObj||null==ccyAmtObj.ccyCode||ccyAmtObj.ccyCode.length<1||null==ccyAmtObj.amt){
        return intl.formatMessage({id:'common.not.available'});
    }
    else{
        let num = Number(ccyAmtObj.amt);
		let amtStr = '';
		if(null!=opt&&opt.noNeedDecimal){
            num = parseInt(num);
			amtStr = num.toLocaleString();
        }
		else{
			let localeStr = num.toLocaleString();
            let leftStr = '';
			if(localeStr.indexOf('.')>0){
                leftStr = localeStr.substring(0,localeStr.indexOf('.'));
            }
            else{
                leftStr = localeStr;
            }

			let fixedStr = num.toFixed(ccyConfig[ccyAmtObj.ccyCode]);
            let rightStr = '';
			if(fixedStr.indexOf('.')>0){
                rightStr = fixedStr.substring(fixedStr.indexOf('.'));
            }

            amtStr = leftStr+rightStr;
		}
		return ccyAmtObj.ccyCode+' '+ amtStr;
    }
}; 
