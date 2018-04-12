# Stub data api

## Precondition

Please run `yarn update` to install extra package first.

## Run

Start server by either `yarn run dev`, or

`babel-node server\app.js` for stub standalone api server only

## Endpoints

base path `/api`

### Accounts

`GET /accounts`

##### Parameters

**N/A**

Sample response

> `GET localhost:4000/api/accounts`

```
{
  "investmentAccountList": [
    {
      "investmentAccountId": {
        "countryAccountCode": "HK",
        "groupMemberAccountCode": "HSBC",
        "accountCurrencyCode": "HKD",
        "accountNumber": "001456789833",
        "accountProductTypeCode": "AV",
        "accountTypeCode": "INV"
      },
      "accountNickname": "2R833HKD HKDAVINV ",
      "accountSubType": 1
      "accountStatus": "1",
      "checksum": "53wrs42tdsjsdjfj" // Account identity
    },
    ...
  ],
  "settlementAccountList": [
    ...
  ],
  "totalChecksum": ""
}
```

### Portfolio

`GET /portfolio`

##### Parameters

Name | Type | Description
--- | --- | ---
investmentAccountChecksum | String | Account identity

Sample response

> `GET localhost:4000/api/portfolio?investmentAccountChecksum=53wrs42tdsjsdjfj`

```
{
  "holdingList": [
    {
      "productId": {
        "productTypeCode": "SEC",
          "productAlternativeClassificationCode": "M",
          "productAlternativeNumber": "00005", // Stock identity
          "countryProductTradableCode": "HK"
        },
      "productPortfolioQuantityCount": 4100,
      "productAvailableTradeQuantityCount": 3900,
      "countryExchangeCode": "HK",
      "productName": "HSBC HOLDINGS",
      "productAvailabilityIndicator": true,
      "sellProductAvailableIndicator": true,
      "allowStopLossOrderIndicator": true,
      "allowTwoWayLimitOrderIndicator": true,
      "allowTargetBuySellOrderIndicator": true,
      "priceAvailableIndicator": true
    },
    ...
  ],
  "paginationResponse": {
    "startDetail": "0",
    "endDetail": "15",
    "moreIndicators": "0"
  }
}
```

### Quote List

`GET /quoteList`

##### Parameters

Name | Type | Description
--- | --- | ---
market | String | `HK`/`SH`/`SZ`/`US`
delay | Boolean | true/false
productKeys | Array | stock object

Stock object

Name | Type | Description
--- | --- | ---
prodCdeAltClassCde | String | `M`
productType | String | `SEC`
prodAltNum | String | Stock identity

Sample response

> `GET localhost:4000/api/quoteList?market=HK&delay=true&productKeys[0][prodCdeAltClassCde]=M&productKeys[0][prodAltNum]=00005&productKeys[0][productType]=SEC`

```
{
  "priceQuoteList": [
    {
      "symbol": "00005",
      "companyName": "HSBC HOLDINGS",
      "nominalPrice": 66,
      "currency": "HKD",
      "changeAmount": -0.2,
      "changePercent": -0.302,
      "dayRangeLow": 0,
      "dayRangeHigh": 0,
      "yearLowPrice": 0,
      "yearHighPrice": 0,
      "exchange": "HKEX",
      "delay": true
    }
  ],
  "quoteRemaining": 789,
  "totalFreeQuote": 1000,
  "exchangeUpdatedTime": "2017-02-09T10:04:48.700+00:00"
}
```

### Quote List

`GET /quoteDetail`

##### Parameters

Name | Type | Description
--- | --- | ---
market | String | `HK`/`SH`/`SZ`/`US`
delay | Boolean | true/false
prodCdeAltClassCde | String | `M`
productType | String | `SEC`
prodAltNum | String | Stock identity
exchangeCode | String | `HKEX`/`SHAS`/`SZAS`, empty for US

Sample response

> `GET localhost:4000/api/quoteDetail?market=HK&delay=true&prodCdeAltClassCde=M&prodAltNum=00005&productType=SEC&exchangeCode=HKEX`

```
{
  "bidAskQuoteList": [
    ...
  ],
  "priceQuote": {
    "companyName": "HSBC HOLDINGS",
    "symbol": "00005",
    "currency": "HKD",
    "nominalPrice": 66,
    "changeAmount": -0.2,
    "changePercent": -0.302,
    "peRatio": 0.89,
    "dividendYield": 5.99,
    "marketCap": 1332660000000,
    "previousClosePrice": 66,
    "openPrice": 66,
    "dayRangeHigh": 66,
    "dayRangeLow": 66,
    "tradingVolume": 10000,
    "turnoverAmount": 10000,
    "bidPrice": 66,
    "bidSize": 1000,
    "askPrice": 66,
    "askSize": 200,
    "yearHighPrice": 66,
    "yearLowPrice": 66,
    "dividend": 0,
    ...
  }
}
```

### Chart Data

`GET /chartData`

##### Parameters

Name | Type | Description
--- | --- | ---
market | String | `HK`/`SH`/`SZ`/`US`
productType | String | `SEC` for stock, `INDEX` for indices
item | Array | array of identity
intType | String | `MINUTE`
intCnt | Integer | `5`
displayName | Boolean | Show item name on response
startTm | Date | Start time of data
endTm | Date | Start time of data

Sample response

> `GET localhost:4000/api/chartData`
>
> Default parameters is added on server

```
{
  "result": [
    {
      "displayName": "HSBC HOLDINGS",
      "data": [
        [
          "2017-02-09T09:30:00.000Z",
          66.8,
          66,
          69.4,
          63.3,
          32,
          24300
        ],
        ...
      ],
      "field": [
        "DATE",
        "CLOSE",
        "OPEN",
        "HIGH",
        "LOW",
        "COUNT",
        "VOLUME"
      ]
    }
  ],
  "stsCode": 0,
  "stsTxt": "OK"
}
```

### STB Portfolio

`GET /stbportfolio`

##### Parameters

Name | Type | Description
--- | --- | ---
investmentAccountChecksum | String | Account identity
delay | Boolean | true/false

Sample response

> `GET localhost:4000/api/stbportfolio`

```
{
  "holdingList": [
    {
      "productId": {
        "productTypeCode": "SEC",
        "productAlternativeClassificationCode": "M",
        "productAlternativeNumber": "00001",
        "countryProductTradableCode": "HK"
      },
      "productPortfolioQuantityCount": 1800,
      "productAvailableTradeQuantityCount": 1800,
      "productName": "CKH HOLDINGS",
      "currency": "HKD",
      "nominalPrice": 90.8,
      "changeAmount": -0.8,
      "changePercent": -0.873,
      "marketValue": 350280000000
    },
    ...
  ],
  "totalMarketValueList": [
    {
      "totalMarketValueCurrency": "HKD",
      "totalMarketValue": 734040000000
    },
    {
      "totalMarketValueCurrency": "CNY",
      "totalMarketValue": 206440000000
    },
    {
      "totalMarketValueCurrency": "USD",
      "totalMarketValue": 504040000000
    }
  ],
  "delay": true,
  "quoteRemaining": 283,
  "totalFreeQuote": 500,
  "exchangeUpdatedTime": "2017-02-16T06:34:49.072+00:00"
}
```
