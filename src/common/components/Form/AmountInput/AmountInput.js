import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
// import numeral from 'numeral';
import styles from './style.scss';
class AmountInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            errorStyle: '',
            displayValue: this.format(this.props.value)
        };
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.inEnableKeys = this.inEnableKeys.bind(this);
        this.getFixedLength = this.getFixedLength.bind(this);
        this.formatToGroup = this.formatToGroup.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState ({
          value: nextProps.value,
          displayValue: this.format(nextProps.value)
      });
    }

    format (formatValue) {
        if (formatValue === '' || formatValue === null || formatValue === undefined) {
            return '';
        }

        const { type, thousandsGroup, formatNegative,fixed,fixedChar } = this.props;
        const defaultFormat = thousandsGroup ? '0,0' : '0';
        const fChar = fixedChar || '.';
        formatValue = formatValue.toString();
        if (formatValue.indexOf(fChar)>=0 && type ==='decimal'){//toFixed()
            let fixedValue = this.getFixedLength();
            let num1 = formatValue.substr(0, formatValue.indexOf(fChar));
            let num2 = formatValue.substr(formatValue.indexOf(fChar) + 1);
            if (num2.length > fixedValue) {
                num2 = num2.substr(0, fixedValue);
            }
            formatValue = num1 + fChar + num2;
        }
        if(thousandsGroup) {
            let value = formatValue.toString();
            let prefix = '';
            if (/^\-/.test(formatValue)) {
                value = value.substr(1);
                prefix = '-';
            }

            let num1='',num2='';
            if (value.indexOf(fChar)>=0){
                let fixedValue = this.getFixedLength();
                num1 = value.substr(0,value.indexOf(fChar));
                num2 = value.substr(value.indexOf(fChar)+1);
                if (type.toLowerCase() === 'decimal' && num2.length>fixedValue) {
                    num2 = num2.substr(0, fixedValue);
                }
            }else {
                num1 = value;
                num2 = '';
            }
            num1 = this.formatToGroup(num1,true);
            // num2 = this.toFixed(num2);

            if(num2.length>0){
                num1 = num1.length>0 ? num1 : '0';
                return prefix + num1 + fChar + num2;
            } else {
                if (value.indexOf(fChar)>=0) {
                    return prefix + num1 + fChar;
                } else {
                    return prefix + num1;
                }
            }
        }else {
            return formatValue;
        }
    }
    getFixedLength(){
        const { currency, fixed, symbol } = this.props;
        let fixedValue = !isNaN(fixed) && fixed >= 0 ? fixed : 0;
        Object.prototype.toString.call(currency) === '[object Array]' && currency && currency.map
        && currency.map((cur)=>{
            if(cur['code'] === symbol) {
                if (cur['toFixed'] >0 ) {
                    fixedValue = cur['toFixed'];
                }
            }
        });
        return fixedValue;
    }
    formatToGroup(value,isReverse) {
        const { thousandsGroupChar } = this.props;
        const thChar = thousandsGroupChar|| ',';
        if (value !== undefined && value !== null && value.length > 0) {
            let result = '';
            if(!isReverse){
                for (let i = 0; i < value.length; i++) {
                    if (i > 0 && i % 3 == 0) {
                        result += thChar + value.substr(i, 1);
                    } else {
                        result += value.substr(i, 1);
                    }
                }
            } else {
                const mapData = [];
                let count = 0;
                for (let i = value.length - 1; i >= 0; i--) {
                    if (count > 0 && count % 3 == 0) {
                        mapData.push(thChar);

                    }
                    mapData.push(value.substr(i, 1));
                    count++;
                }
                result = mapData.reverse().join('');
            }
            return result;
        } else {
            return '';
        }
    }
    isValid (targetValue) {
        const min = this.props.min;
        const max = this.props.max;
        const minLength = this.props.minLength;
        const maxLength = this.props.maxLength;
        let result = true;
        result = result && (Number(targetValue) >= min) && (Number(targetValue) <= max);
        result = result && (String(targetValue).length >= minLength) && (String(targetValue).length <= maxLength);
        return result;
    }
    onChange (event) {
        const { min, max, minLength, maxLength,fixedChar, thousandsGroupChar } = this.props;
        let value = event.target.value;
        let displayValue = '';
        const { type } = this.props;
        let errorStyle = '';
        if (value.indexOf("-")>=0) {
            value = "-" + value.replace(/\-/g,'');
        }
        const spReg = /,/g;
        eval("spReg = /"+thousandsGroupChar+"/g");
        value = value.replace(spReg,'');
        if (type.toLowerCase() === 'integer') {
            value = !isNaN(value) && value.length>0 ? parseInt(value,10).toString() : value;
            displayValue = this.format(value);
            errorStyle = !this.isValid(value) ? styles.AmountInputError : '';
            this.setState({
                value,
                displayValue,
                errorStyle
            });
        } else {
            let reg = '';
            value = /^\./.test(value) ? "0" + value : value;
            eval("reg = /^([0]*\\"+fixedChar+")/;")
            value = value.replace(reg,'0'+fixedChar);
            value = value.replace(/^([0]*)([1-9])/,'$2');
            eval("reg = /^(-[0]*\\"+fixedChar+")/;");
            value = value.replace(reg,'-0' + fixedChar);
            value = value.replace(/^(-[0]*)([1-9])/,'-$2');
            displayValue = this.format(value);
            errorStyle = !this.isValid(value) ? styles.AmountInputError : '';
            reg = eval("reg = /\\"+fixedChar+"/g");
            value = value.replace(reg, ".");
            this.setState({
                value,
                displayValue,
                errorStyle
            });
        }
        this.props.onChange && this.props.onChange(value,displayValue);
        if(!this.isValid(value)) {
            const inRange = (Number(value) >= min) && (Number(value) <= max);
            const errLength = (String(value).length >= minLength) && (String(value).length <= maxLength);
            const code = !inRange ? "errRange" : (!errLength ? "errLength":'');
            this.props.onError && this.props.onError(code);
        }
    }
    componentWillReceiveProps(nextPros) {
        if(nextPros.value != this.state.value) {
            const value = nextPros.value;
            const displayValue = this.format(value);
            const errorStyle = !this.isValid(value) ? styles.AmountInputError : '';
            this.setState({
                value,
                displayValue,
                errorStyle
            });
        }
    }
    onKeyDown (event) {
        const { type, min } = this.props;
        const existingValue = this.state.value;
        const keyCode = event.keyCode;
        this.selectionStart = this.inputComponent.selectionStart;
        this.selectBeforeText = this.inputComponent.value.substr(0, this.selectionStart);
        if(!this.inEnableKeys(keyCode)) {
            event.preventDefault();
        }
    }
    inEnableKeys(keyCode) {
        const { id, type, min, max, maxLength, fixedChar } = this.props;
        let { value } = this.state;

        value = (value || '').toString();
        const fixKeyCode = fixedChar === "." ? 190 : (fixedChar===';'? 186: (fixedChar === ',' ? 188 : (fixedChar === "'" ? 222:"")));
        console.log(fixedChar, keyCode, fixKeyCode);
        if(keyCode === 8)return true;
        if (value.replace(/\-\,/g,'').length > maxLength && keyCode !== 8)return false;

        if(keyCode === 37 || keyCode === 39 ) return true;

        if(value && value.indexOf("-")>=0 && keyCode === 189) {
            return false;
        } else if(keyCode === 189) {
            return true;
        }

        if(type.toLowerCase() === 'integer' && keyCode === 190) {
            return false;
        }else if(type.toLowerCase() === 'decimal') {

            if (keyCode === fixKeyCode && value && value.indexOf(".")>=0) {
                return false;
            } else if(keyCode === fixKeyCode ) {
                return true;
            }
        }

        if ((keyCode >=48 && keyCode<=57) || (keyCode >=97 && keyCode <=105) || keyCode === 8){
            return true;
        }else {
            return false;
        }
    }
    onBlur () {
        let value = this.state.value;
        let displayValue = this.state.displayValue;
        if (this.props.type === 'decimal' && /\.$/.test(value)) {
            value += "0";
            displayValue += '0';
            this.setState({
                value,
                displayValue
            });
            this.props.onChange && this.props.onChange(value,displayValue);
        }
    }
    onFocus () {

    }
    onKeyUp(){

    }
    render () {
        const { errorStyle,displayValue } = this.state;
        const { id, theme,placeHolder,symbolVisible } = this.props;
        const startStyle = this.props.showStar ? styles.AmountInputStart : '';
        const overrideStyle = theme ? theme.AmountInput : '';
        const bindDisplayValue = displayValue || '';
        const symbolStyle = !symbolVisible ? styles.AmountInputNoneSymbol : '';
        return (
            <div style={{width: this.props.width || 'auto'}} data-role={this.props['data-role']} className={classNames(styles.AmountInput, errorStyle,symbolStyle, startStyle,overrideStyle)}>
                <span id={id?id+"_symbol":null}>{this.props.symbol}</span>
                <div className={styles.AmountInputText}>
                    <input type="text"
                        placeholder={placeHolder}
                        onChange={this.onChange}
                        onKeyDown={this.onKeyDown}
                        onBlur={this.onBlur}
                        onKeyUp={this.onKeyUp}
                        onFocus={this.onFocus}
                        value={bindDisplayValue}
                        ref={(self)=>{
                            this.inputComponent = self;
                        }}
                        id={id?id:null}
                    />
                </div>
            </div>
        );
    }
}

AmountInput.propTypes = {
    type: PropTypes.string,
    symbol: PropTypes.string.isRequired,
    symbolVisible: PropTypes.bool.isRequired,
    thousandsGroup: PropTypes.bool,
    thousandsGroupChar: PropTypes.string,
    displayValue: PropTypes.string,
    fixed: PropTypes.number.isRequired,
    fixedChar: PropTypes.string.isRequired,
    placeHolder: PropTypes.string,
    theme: PropTypes.object,
    min: PropTypes.number,
    max: PropTypes.number,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    width: PropTypes.string,
    onChange: PropTypes.func,
    showStar: PropTypes.bool,
    onError: PropTypes.func,
    currency: PropTypes.array,
    'data-role': PropTypes.string,
};

AmountInput.defaultProps = {
    type: 'integer',
    min: 0,
    max: 99999999999,
    thousandsGroup: true,
    minLength: 0,
    maxLength: 10,
    showStar: false,
    displayValue: '',
    symbol: "HKD",
    placeHolder: "Please Enter",
    fixed: 2,
    symbolVisible: true,
    fixedChar: ".",
    thousandsGroupChar: ","
};

export default AmountInput;
