import React from 'react';
import {
    formatSettlementAccountByCheckSum,
    formatSecurityAccountByCheckSum,
    formatNumberByComma,
    formateDisplayDate,
    formateExpiryDate
} from '../components/trading/formatting';
import { findAccountByChecksum } from '../components/trading/accountUtils';
import account from '../services/static/account';
import OrderInputConfig from '../components/trading/OrderInputConfig';

export const getOrderRequestData = (orderInputState, investmentAccountList) => {
    const { expiryDate, orderType, price, quantity, securitiesAccount, settlementAccount, orderId } = orderInputState;
    const { productId, countryExchangeCode, actionCode } = orderInputState;
    return {
        orderId,
        actionPortfolioOrderCode: actionCode,
        portfolioOrderTypeCode: orderType,
        investmentAccountChecksum: securitiesAccount,
        settlementAccountChecksum: settlementAccount,
        productId,
        sourceInstructionCode: 'MOB', // diff channel TODO: TBC
        orderExpiryDate: formateExpiryDate(expiryDate),
        orderQuantityCount: quantity,
        currencyLimitPriceCode: findAccountByChecksum(investmentAccountList, securitiesAccount).investmentAccountId.accountCurrencyCode,
        orderLimitPriceAmount: price,
        market: countryExchangeCode
    };
};

export const getOrderRequestDataInDisplayMode = (rawData, { investmentAccountList, settlementAccountList }) => {
    const { securitiesAccount, settlementAccount, quantity, orderType, price, expiryDate, amount, settlementMethod, picop, productDetails } = rawData;
    const { productId, actionCode, boardLot, companyName } = rawData;
    let countryExchangeCode = 'HK';
    const formatedSecurityAccount = formatSecurityAccountByCheckSum(
        securitiesAccount,
        investmentAccountList
    );
    const formatedSettlementAccount = formatSettlementAccountByCheckSum(
        settlementAccount,
        settlementAccountList
    );
    const { formatting, market, actionPortfolioOrder } = OrderInputConfig;
    const priceDecimals = formatting[countryExchangeCode].priceDecimals;
    const lotSize = boardLot || formatting[countryExchangeCode].lotSize;
    return {
        actionPortfolioOrder: actionPortfolioOrder[actionCode],
        portfolioOrderType: OrderInputConfig.orderType[orderType],
        productId,
        companyName,
        orderQuantityCount: formatNumberByComma(quantity),
        orderLimitPriceAmount: formatNumberByComma(price, priceDecimals),
        orderExpiryDate: formateDisplayDate(expiryDate),
        lotSize,
        market: market[countryExchangeCode],
        amount,
        settlementMethod,
        picop,
        productDetails,
        investmentAccount: <span>{formatedSecurityAccount.accountNumber}{' '}{formatedSecurityAccount.accountName}</span>,//`${formatedSecurityAccount.accountNumber} ${formatedSecurityAccount.accountName}`,
        settlementAccount: <span>{formatedSettlementAccount.accountNumber}{' '}{formatedSettlementAccount.accountName}</span>,//`${formatedSettlementAccount.accountNumber} ${formatedSettlementAccount.accountName}`,
        investmentAccount_checksum: securitiesAccount,
        settlementAccount_checksum: settlementAccount
    };
};

export const getCurrentAccounts = (appState) => {
    const { accounts } = appState;
    return accounts;
};

export const getInvestmentAccountList = (appState) => {
    const { investmentAccountList } = getCurrentAccounts(appState);
    return investmentAccountList;
};

export const getCurrentInvestmentAccount = (appState) => {
    return appState.currentInvestmentAccount;
};

