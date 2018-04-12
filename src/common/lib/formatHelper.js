import {
    NOT_AVAILABLE_STRING,
    GENERAL_PRECISION,
    EMPTY
} from 'constant';
import {formatNumberByComma} from "../components/trading/numberUtils";
import moment from 'moment-timezone';
import localCheck,{dateFormats,timeFormats,spaceFormats} from '../../locale/checkLocal';

export default class FormatHelper {
    static getNLS = (intlMethod, inputId) => {
        if (inputId) {
            return intlMethod({id:inputId});
        } else {
            return EMPTY;
        }
    }

    static localCheck = _=>({
        dateFormat:dateFormats[ localCheck() ],
        timeFormat:timeFormats[ localCheck() ],
        spaceFormat:spaceFormats[ localCheck() ]
    });

    static addThousandSeparator = (value) => {
        if(value==undefined){
            return '';
        }
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    static getShortenSuffixes () {
        return ['', 'K', 'M', 'B', 'T'];
    }

    /*
        Return the scale of shorten value
        @param {number} value
        @return {string} scale
    */
    static getShortenScale (value) {
        const suffixes = FormatHelper.getShortenSuffixes();
        const kValue = 1000;
        const iValue = Math.min(Math.floor(Math.log(value) / Math.log(kValue)), suffixes.length - 1);
        return suffixes[iValue];
    }
    static formatDataPoint (value,point) {
        let tempNumber=new Number;
        tempNumber=parseFloat(value);
        tempNumber=tempNumber.toFixed(parseInt(point))
        return tempNumber;
    }

    /*
        Return the scale of shorten value
        @param {number} value
        @param {scale} the scale to shorten
        @param {number} the precision when not scaled
        @return {string} scaled number
    */
    static shortenToScale (value, scale, precision) {
        const suffixes = FormatHelper.getShortenSuffixes();
        const scaleIndex = suffixes.indexOf(scale);
        if (scaleIndex <= 0) {
            return value.toFixed(precision);
        }

        const kValue = 1000;
        const scaleValue = Math.pow(kValue, scaleIndex);
        const finalValue = value / scaleValue;
        return FormatHelper.addThousandSeparator(finalValue.toFixed(2)) + scale;
    }

    static showUnitFormat (number, unit) {
        if (number != NOT_AVAILABLE_STRING) {
            return unit;
        }  
    }

    static percentFormat (numberStr) {
        if (numberStr && numberStr != '0') {
            return formatNumberByComma(Number(numberStr), GENERAL_PRECISION) + '%';
        } else {
            return NOT_AVAILABLE_STRING;
        }    
    }
        // var emailVali =/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    static currencyCodeAmount (number,currencyCode) {
         var amount=FormatHelper.addThousandSeparator(number);
         var value=currencyCode+" "+amount;
        return value;
    }

     static dateFormatPattern (dateTime,pattern) {
        const _this = this;
        var dateStr=new Date(dateTime)
        return moment(dateStr).format(pattern);
    }


    
     static dateFormat_1 (dateStr) {
        const _this = this;
        return moment(dateStr, "YYYY-MM-DD").format( _this.localCheck().dateFormat );
    }
    
    //input : YYYY-MM-DD
    //output : DD MMM YYYY
    static dateFormat_1 (dateStr) {
        const _this = this;
        return moment(dateStr, "YYYY-MM-DD").format( _this.localCheck().dateFormat );
    }

    //input : YYYY-MM-DD HH:mm:ss
    //output : DD MMM YYYY
    static dateFormat_2 (dateStr) {
        const _this = this;
        return moment(dateStr, "YYYY-MM-DD HH:mm:ss").format(_this.localCheck().dateFormat);
    }    

    //input : YYYY-MM-DD HH:mm:ss
    //output : h:mm a
    static timeFormat_1 (dateStr) {
        const { timeFormat } = this.localCheck();
        return moment(dateStr, "YYYY-MM-DD HH:mm:ss").format(timeFormat[0]).replace('am',timeFormat[1]).replace('pm',timeFormat[2]);
    }

    //input  : YYYY-MM-DD HH:mm:ss
    //output : DD MM YYYY HH:mm:ss
    static timeAndDateFormat(dataStr){
        const { spaceFormat } = this.localCheck();
        return `${this.dateFormat_1(dataStr)}${spaceFormat}${this.timeFormat_1(dataStr)}`//this.dateFormat_1(dataStr)+this.
    }
}
