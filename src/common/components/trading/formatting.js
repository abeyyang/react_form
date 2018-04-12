import _ from 'lodash';
import moment from 'moment';
import OrderInputConfig from './OrderInputConfig';
import { prefixPlusMinusSign, formatNumberByComma } from './numberUtils';
import accountsConfig from "../../config/accountsConfig";
import formatHelper from '../../lib/formatHelper';

const EMPTY = '';

const formatAccountNumber = (account, key) => {
    if (!account) {
        return account;
    }
    let formatKey;
    let accountLength = account.length;
    if (accountsConfig.accountFormat['3_6_3'].keys.indexOf(key) > -1) {
        formatKey = '3_6_3';
    } else if (accountsConfig.accountFormat['3_1_6'].keys.indexOf(key) > -1) {
        formatKey = '3_1_6';
    } else if (accountLength == 9) {
        formatKey = 'length_9';
    } else if (accountLength == 10) {
        formatKey = 'length_10';
    } else if (accountLength == 12) {
        formatKey = 'length_12';
    } else if (accountLength == 13) {
        formatKey = 'length_13';
    } else if (accountLength == 16) {
        formatKey = 'length_16';
    } else {
        formatKey = 'others';
    }
    return account.replace(accountsConfig.accountFormat[formatKey].pattern, accountsConfig.accountFormat[formatKey].format);
};

const formatSecurityAccountByCheckSum = (checkSum, accountList) => {
    if(!checkSum){
        return {
            accountName: '',
            accountNumber: ''
        };
    }
    const matchedOne = findAccountByChecksum(checkSum, accountList);
    const accountNumber = matchedOne.investmentAccountId.accountNumber;
    const labelObject = {
        accountName: matchedOne.name,
        accountNumber: formatAccountNumber(accountNumber, matchedOne.key)
    };

    return labelObject;
};

const findAccountByChecksum = (checkSum, accountList) => {
    return _.find(accountList, (item) => {
        return checkSum === item.checksum;
    });
};

const formatSettlementAccountByCheckSum = (checkSum, accountList) => {
    if (!checkSum) {
        return {
            accountName: '',
            accountNumber: ''
        };
    }
    const item = findAccountByChecksum(checkSum, accountList);
    const accountNumber = item.settlementAccountId.accountNumber;
    return {
        accountName: item.name,
        accountNumber: formatAccountNumber(accountNumber, item.key)
    };
};

const formateDisplayDate = (date) => {
    if (!date) {
        return EMPTY;
    }
    return formatHelper.dateFormat_1( date )
};
const formateDisplayDateAndTime = (date) => {
    if (!date) {
        return EMPTY;
    }
    return formatHelper.timeFormat_1( date )
};

const formateExpiryDate = (date) => {
    if (!date) {
        return EMPTY;
    }
    return formatHelper.dateFormat_1( date );
};

const formateCurrentDate = (date) => {
    if (!date) {
        return EMPTY;
    }
    const pad0ForTime = (key) => {
        if (key < 10) {
            return `0${key}`;
        }
        return key;
    };
    const hhmm = `${pad0ForTime(date.getHours())}:${pad0ForTime(date.getMinutes())}:${pad0ForTime(date.getSeconds())}`;
    const ddMMyy = moment(date).format('DD MMM YYYY');
      return `${hhmm} ${ddMMyy}`;
};

export {
    prefixPlusMinusSign,
    formatAccountNumber,
    formatNumberByComma,
    formatSettlementAccountByCheckSum,
    formatSecurityAccountByCheckSum,
    formateDisplayDate,
    formateExpiryDate,
    formateCurrentDate,
    formateDisplayDateAndTime
};
