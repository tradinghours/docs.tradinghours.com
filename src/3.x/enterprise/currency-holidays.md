# Currency Holidays

[[toc]]

---

Currency Settlement Holidays are dates when the central bank for a given currency is not settling transactions.
Currency non-settlement dates are frequently public holidays, but not always.

Unlike [market holidays](market-holidays.md), there are no trading schedules associated with currency holidays.
A currency either has settlement or does not on a particular date.

Most currencies settle Monday to Friday, unless there is a currency settlement holiday.
Some currencies have different weekend definitions.
Namely, the Israeli Shekel (ILS) has settlement Sunday to Thursday.

The FX market is an Over-The-Counter (OTC) market. This means there is no single centralized exchange where trading takes place.
Instead, trading takes place directly between banks and on individual brokerage platforms.

Because the market is OTC, there can still be some trading volume on non-settlement dates.

## List Currencies

We support 21 major currencies at this time.

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| currency_code | String | 3-letter code of the currency (ISO 4217). |
| currency_name | String | English name of the currency. |
| country_code | String | 2-letter country code for the currency's country. Except for EUR, the value is "Eurozone." |
| central_bank | String | Name of the central bank for the currency. |
| financial_capital | String | City where the central bank is located. |
| financial_capital_timezone | String | Timezone Olson timezone identifier format.  |
| weekend | String | Weekend definition. Most markets are Sat-Sun. |

### Example
Remember to use your [authentication token](../authentication.md) for all requests.

```
https://api.tradinghours.com/v3/currencies
```

### Sample JSON Response

```json
{
  "data": [
    {
      "currency_code": "USD",
      "currency_name": "US Dollar",
      "country_code": "US",
      "central_bank": "Federal Reserve Bank",
      "financial_capital": "New York",
      "financial_capital_timezone": "America/New_York",
      "weekend": "Sat-Sun"
    },
    {
      "currency_code": "EUR",
      "currency_name": "Euro",
      "country_code": "Eurozone",
      "central_bank": "European Central Bank",
      "financial_capital": "Frankfurt",
      "financial_capital_timezone": "Europe/Berlin",
      "weekend": "Sat-Sun"
    },
    {
      "currency_code": "JPY",
      "currency_name": "Japanese Yen",
      "country_code": "JP",
      "central_bank": "Bank of Japan",
      "financial_capital": "Tokyo",
      "financial_capital_timezone": "Asia/Tokyo",
      "weekend": "Sat-Sun"
    },
    ...
  ]
}
```



## List Currency Holidays

This API returns the list of Currency Non-Settlement Dates for a particular currency.

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| currency_code | String | 3-letter code of the currency (ISO 4217). |
| date | Date | Shows the date of the holiday for the currency. |
| name | String | Describes the name of the holiday. |
| has_settlement | Boolean | Displays in true/false if the market has settlement for the holiday. |
| observed | Boolean | Displays in true/false if the holiday is observed. |
| memo | String | A description or additional details about the holiday, if applicable. |

### Query String Parameters
Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| currency_code | USD, EUR, etc. | N/A | 3-letter code of the currency (ISO 4217). |
| start | yyyy-mm-dd | Current date | Show holidays starting at this date |
| end | yyyy-mm-dd | One year from current date | Show holidays until this date. |

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get Holidays
```
https://api.tradinghours.com/v3/currencies/holidays?currency_code=usd
```

#### Get Holidays in a Date Range
```
https://api.tradinghours.com/v3/currencies/holidays?currency_code=usd&start=2021-11-01&end=2021-11-30
```

### Sample JSON Response

```json
### Sample JSON Response

```json
{
  "data": [
    {
      "currency_code": "USD",
      "date": "2021-11-11",
      "name": "Armistice Day",
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "currency_code": "USD",
      "date": "2021-11-25",
      "name": "Thanksgiving Day",
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "currency_code": "USD",
      "date": "2022-01-17",
      "name": "Birthday of Martin Luther King, Jr",
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "currency_code": "USD",
      "date": "2022-02-21",
      "name": "Washington's Birthday",
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "currency_code": "USD",
      "date": "2022-05-30",
      "name": "Memorial Day",
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "currency_code": "USD",
      "date": "2022-06-20",
      "name": "Juneteenth",
      "has_settlement": false,
      "observed": true,
      "memo": null
    },
    {
      "currency_code": "USD",
      "date": "2022-07-04",
      "name": "Independence Day",
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "currency_code": "USD",
      "date": "2022-09-05",
      "name": "Labor Day",
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "currency_code": "USD",
      "date": "2022-10-10",
      "name": "Columbus Day",
      "has_settlement": false,
      "observed": false,
      "memo": null
    }
  ],
  "meta": {
    "start": "2021-10-21",
    "end": "2022-10-21"
  }
}
```
