import React, { Component } from 'react';
import {FormattedMessage, FormattedHTMLMessage, injectIntl} from "react-intl";
import styles from './CcyAmtInputStyle.scss';
import ccyConfig from '../../../config/ccyConfig'

class CcyAmtInput extends Component {
    constructor (props) {
        super(props);
        this.state = {
            amt:props.amt
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.blur = this.blur.bind(this);
        this.focus = this.focus.bind(this);
    }

    focus(event) {
        let {ccyCode,noNeedDecimal,name} = this.props;
        const target = event.target;
        let val = target.value;
        let inputBoxVal = val;
        let result = validateAndFormatCcyAmt(val, ccyCode,{noNeedDecimal:noNeedDecimal});
        if(!result.notNumber){
            inputBoxVal = result.formattedStrValWithoutThousandSeparator;
        }
        this.props.updateParentComponentState(name,inputBoxVal);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.props.updateParentComponentState(name,value);
        this.props.validate(event);
    }

    blur(event) {
        let {ccyCode,noNeedDecimal,name} = this.props;
        const target = event.target;
        let val = target.value;
        let inputBoxVal = val;
        let result = validateAndFormatCcyAmt(val, ccyCode,{noNeedDecimal:noNeedDecimal});
        if(!result.notNumber){
            inputBoxVal = result.formattedStrVal;
        }
        this.props.updateParentComponentState(name,inputBoxVal);
        this.props.validate(event);
    }

    render() {
        let amt = this.props.amt;
        const {ccyCode,id,name,inputBoxWidth,hasErr} = this.props;
        let bool;
        return (
            <span className={styles.outer} style={hasErr? {'border-color':'red'}:null}>
                <span className={styles.ccyLabel}>{ccyCode}</span>
                <input className={styles.inputBox}
                  type="text" name={name} id={id}
                  value={amt}
                  onChange={this.handleInputChange}
                  onBlur={this.blur}
                  onFocus={this.focus}
                  style={{width:inputBoxWidth}}
                />
            </span>
        );
    }
}

export default injectIntl(CcyAmtInput);

export const validateAndFormatCcyAmt = (numberStr, ccyCode, opt)=>{
    numberStr = (typeof numberStr== "number")? String(numberStr):numberStr;
    let result = {};
	result.notNumber=true;
	if(null==numberStr||numberStr.trim() == ''){
		result.notNumber=true;
		return result;
	}
    let tempNumberStr = numberStr.trim();
    let thousandSeparatorRegExp = new RegExp(',', 'g');
    tempNumberStr = tempNumberStr.replace(thousandSeparatorRegExp,'');
    let decimalSeparatorRegExp = new RegExp('\\.', 'g');
    tempNumberStr = tempNumberStr.replace(decimalSeparatorRegExp,'.');
    if(isNaN(tempNumberStr)){
		result.notNumber=true;
	}
    else{
		result.notNumber=false;
		var num = Number(tempNumberStr);
        if(null!=opt&&opt.noNeedDecimal){
            num = parseInt(num);
        }
        let localeStr = num.toLocaleString();
        let leftStr = '';
        if(localeStr.indexOf('.')>0){
            leftStr = localeStr.substring(0,localeStr.indexOf('.'));
        }
        else{
            leftStr = localeStr;
        }

        let fixedStr = num.toFixed(ccyConfig[ccyCode]);
        let rightStr = '';
        if(fixedStr.indexOf('.')>0){
            rightStr = fixedStr.substring(fixedStr.indexOf('.'));
        }
        if(null!=opt&&opt.noNeedDecimal){
            rightStr = '';
        }

		result.formattedStrVal = leftStr+rightStr; // todo, based on locale and currency to format amount
		result.standardStrVal = result.formattedStrVal.replace(new RegExp(',', 'g'),'');
		result.formattedStrValWithoutThousandSeparator = result.standardStrVal.replace(new RegExp('\\.', 'g'),'.'); // this value is for display in input box.
		result.standardNumberVal = Number(result.standardStrVal); // this value is use for pass to BE
	}
    return result;
};