export default {
    riskProfileQuestionnaireURL: 'https://www.env669.qualityassurance.ebanking.hsbc.com.hk/1/2/obadaptor?cmd_in=&uid=investment.rpq',
    riskTolerence: {
        '0': 'Secure',
        '1': 'Very Cautious',
        '2': 'Cautious',
        '3': 'Balanced',
        '4': 'Adventurous',
        '5': 'Speculative'
    },
    picopWarningMsgType: [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I' ],
    securityAccountType: {
        AV: 'HSBC Premier Investment Services',
        PV: 'HSBC Advance Investment Services',
        SV: 'HSBC SmartVantage Investment Services',
        SS: 'Securities'
    },

    settlementAccount: {
        SAV: 'Saving',
        CUA: 'Current',
        PV: 'HSBC Advance',
        AV: 'HSBC Premier'
    },
    orderType: {
        L: 'Limit Price Order',
        M: 'Market Order',
        A: 'At-Auction Order',
        I: 'At-Auction Limit Order'
    },
    settlementMethod: {
        U: 'Underlying Stock',
        S: 'Cash'
    },
    picop: {
        S: 'Less than 20%',
        M: '20% to 50%',
        L: 'Greater than 50%'
    },
    staticField:[
        'underlyingStockCode',
        'underlyingStockName',
        'tenor',
        'offerPeriod',
        'tradeDate',
        'issueDate',
        'expiryDate',
        'settlementDate',
        'tradePrice',
        'callPrice',
        'knockinPrice',
        'floorPrice',
        'exercisePrice',
        'fixedCashDividendRate',
        'dayInCashDividendRate',
        'dayOutCashDividendRate'
    ],
    actionPortfolioOrder: {
        P: 'Buy',
        S: 'Early redemption'
    },
    market: {
        HK: 'Hong Kong',
        US: 'US',
        SH: 'Shanghai A Shares',
        SZ: 'Shenzhen A Shares'
    },
    currency: {
        HK: 'HKD',
        US: 'USD',
        SH: 'CNY',
        SZ: 'CNY'
    },
    orderTypeList: {
        HK: [
            {
                value: 'L',
                label: 'Limit Price Order',
                enabel: false
            },
            {
                value: 'M',
                label: 'Market Order',
                enabel: false
            },
            {
                value: 'I',
                label: 'At-Auction Limit Order',
                enabel: false
            },
            {
                value: 'A',
                label: 'At-Auction Order',
                enabel: false
            }
        ],
        US: [
            {
                value: 'L',
                label: 'Limit Price Order',
                enabel: false
            },
            {
                value: 'M',
                label: 'Market Order',
                enabel: false
            }
        ],
        SH: [
            {
                value: 'L',
                label: 'Limit Price Order',
                enabel: false
            }
        ],
        SZ: [
            {
                value: 'L',
                label: 'Limit Price Order',
                enabel: false
            }
        ]
    },
    formatting: {
        //keep HK
        HK: {
            amountDecimals: 2,
            priceDecimals: 3,
            priceMaxValue: 9999.999,
            priceMaxLength: 5,
            quantityMaxLength: 11,
            amountMaxValue: 9999999999,
            amountMaxLength: 10
        },
        US: {
            amountDecimals: 2,
            priceDecimals: 2,
            priceMaxValue: 9999999.99,
            priceMaxLength: 12,
            quantityMaxValue: 100000000000000000,
            quantityMaxLength: 22,
            amountMaxLength: 13,
            lotSize: 1
        },
        SH: {
            amountDecimals: 2,
            priceDecimals: 2,
            priceMaxValue: 9999999999999999.99,
            priceMaxLength: 16,
            quantityMaxValue: 10000000000000,
            quantityMaxLength: 15,
            amountMaxLength: 13,
            lotSize: 100
        },
        SZ: {
            amountDecimals: 2,
            priceDecimals: 2,
            priceMaxValue: 9999999999999999.99,
            priceMaxLength: 16,
            quantityMaxValue: 10000000000000,
            quantityMaxLength: 15,
            amountMaxLength: 13,
            lotSize: 100
        }
    },
    timezone: {
        'Asia/Hong_Kong': 'HKT',
        'America/New_York': 'U.S.ET',
        'Asia/Shanghai': 'HKT',
        'Asia/Shenzhen': 'HKT'
    },
    priceSpread: [
        {
            from: 0,
            to: 0.25,
            spread: 0.001
        },
        {
            from: 0.25,
            to: 0.50,
            spread: 0.005
        },
        {
            from: 0.50,
            to: 10.00,
            spread: 0.010
        },
        {
            from: 10.00,
            to: 20.00,
            spread: 0.020
        },
        {
            from: 20.00,
            to: 100.00,
            spread: 0.050
        },
        {
            from: 100.00,
            to: 200.00,
            spread: 0.100
        },
        {
            from: 200.00,
            to: 500.00,
            spread: 0.200
        },
        {
            from: 500.00,
            to: 1000.00,
            spread: 0.500
        },
        {
            from: 1000.00,
            to: 2000.00,
            spread: 1.000
        },
        {
            from: 2000.00,
            to: 5000.00,
            spread: 2.000
        },
        {
            from: 5000.00,
            to: 1000000.00,
            spread: 5.000
        }
    ]
};
