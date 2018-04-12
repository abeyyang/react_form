import BigNumber from 'bignumber.js';

const EMPTY = '';

const prefixPlusMinusSign = (num) => {
    return ((num > 0 && '+') || (num < 0 && '-') || '') + num;
};

const formatNumber = (inputNumberInStr) => {
    const formatPattern = {
        locale: 'en-US',
        useGrouping: true,
        minimumIntegerDigits: 1,
        minimumFractionDigits: 0,
        maximumFractionDigits: 3
    };
    return Intl.NumberFormat(formatPattern).format(
        parseFloat(inputNumberInStr)
    );
};

const formatNumberByComma = (value, decimals = 0) => {
    if (!value && value !== 0) {
        return EMPTY;
    }

    if (!isNaN(value)) {
        const inputNumberInStr = value.toString();
        const forwardDotSign = inputNumberInStr.split('.')[0];
        const behindDotSign = inputNumberInStr.split('.')[1];
        const numLen = forwardDotSign.length;
        const supportedMaxLength = 9;
        let output = null;

        if (numLen > supportedMaxLength) {
            const result = [];
            const reversedDigitArrary = forwardDotSign.split('').reverse();
            for (let i = 0; i < numLen;) {
                const endPos = i + supportedMaxLength;
                const part = reversedDigitArrary
                    .slice(i, endPos)
                    .reverse()
                    .join('');
                i = endPos;
                result[result.length] = part.length === supportedMaxLength && formatNumber(`1${part}`).substr(2) || formatNumber(part);
            }
            output = result.reverse().join(',');
        } else {
            output = formatNumber(inputNumberInStr);
        }

        const meaningfulLength = (behindDotSign || '').length;
        if (!behindDotSign && decimals > 0) {
            return `${output}.${new Array(decimals + 1).join('0')}`; // Fix IE doesn't support
        }

        if (decimals > 0 && meaningfulLength < decimals) {
            return output +
                new Array(decimals - meaningfulLength + 1).join('0'); // Fix IE doesn't support
        }

        return output;
    }
    return EMPTY;
};

/**
 * null -> null
 * "123456789.007" -> "123,456,789.007"
 * 123456789.007 -> "123,456,789.007"
 * @param {String|Number} numberInStr
 * @returns String
 *
 * @memberOf SpinnerInput
 */
function toDisplayModeNumberStyle (numberInStr, decimals = 0) {
    if (numberInStr === null) {
        return null;
    }
    // api only return number toString
    if(numberInStr === '0'){
        return EMPTY;
    }
    return formatNumberByComma(Number(numberInStr), decimals);
}

/**
 *
 *
 * @param {number|string} formattedNumber
 * @returns  string
 */
function toEditModeNumberStyle (formattedNumber) {
    if (typeof formattedNumber === 'number') {
        return formattedNumber.toString();
    }
    if (typeof formattedNumber === 'string' && formattedNumber !== '') {
        return (formattedNumber.indexOf(',') >= 0 &&
            Number(formattedNumber.replace(',', '')).toString()) ||
            formattedNumber;
    }
    return null;
}

/**
 *
 *
 * @param {number|string} formattedNumber
 * @returns  string
 */
function eq (a, b) {
    return toEditModeNumberStyle(a) === toEditModeNumberStyle(b);
}

function subtract (minuend, subtrahend) {
    return new BigNumber(minuend).minus(subtrahend).toNumber();
}

function add (augend, addend) {
    return new BigNumber(augend || 0).plus(addend).toNumber();
}

export {
    prefixPlusMinusSign,
    formatNumberByComma,
    toDisplayModeNumberStyle,
    toEditModeNumberStyle,
    eq,
    subtract,
    add
};
