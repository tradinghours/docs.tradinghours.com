# Market Holidays

[[toc]]

## Market Holidays Endpoint

The Market Holiday API allows you to easily access past and future holiday calendars for all markets based on `FinID`.

::: warning Note
Our pricing is structured around what data you need. This results in different plans with different levels of access. The Market Holidays API endpoint is not available on all plans. [Contact our team for more details](https://www.tradinghours.com/contact).
:::

::: tip Note
Unlike our other API endpoints, the market holidays endpoint does <b>not</b> support multiple `FinID`s. Instead, it lists all holidays for a single `FinID`.
:::

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| fin_id | String | The `FinID` for the market. |
| date | Date | Shows the date of the holiday for the market. |
| name | String | Describes the name of the holiday. |
| schedule | String | Describes if the market closes for the holiday. |
| is_open | Boolean | Displays in true/false if the market is open for the holiday. |
| has_settlement | Boolean | Displays in true/false if the market has settlement for the holiday. |
| observed | Boolean | Displays in true/false if the holiday is observed. |
| memo | String | A description or additional details about the holiday, if applicable. |

### Query String Parameters
Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| fin_id | Valid FinID | N/A | Specify which market to show data for. |
| format | CSV, JSON | JSON | Specify output format |
| start | yyyy-mm-dd | Current date | Show holidays starting at this date |
| end | yyyy-mm-dd | One year from current date | Show holidays until this date. |

If you use a query string parameter that isn't supported, the API will ignore the invalid query string parameters and execute the ones it recognizes.

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get Holidays with `FinID`
```
https://api.tradinghours.com/v3/markets/holidays?fin_id=us.nyse
```

#### Get Holidays with `MIC`
```
https://api.tradinghours.com/v3/markets/holidays?fin_id=XNYS
```

#### Get Holidays in CSV Format
```
https://api.tradinghours.com/v3/markets/holidays?fin_id=us.nyse&format=csv
```

#### Get Holidays in a Date Range
```
https://api.tradinghours.com/v3/markets/holidays?fin_id=us.nyse&start=2020-11-01&end=2020-11-30
```

### Sample JSON Response

```json
{
  "data": [
    {
      "fin_id": "US.NYSE",
      "date": "2021-09-06",
      "name": "Labor Day",
      "schedule": "Closed",
      "is_open": false,
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "fin_id": "US.NYSE",
      "date": "2021-11-25",
      "name": "Thanksgiving Day",
      "schedule": "Closed",
      "is_open": false,
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "fin_id": "US.NYSE",
      "date": "2021-11-26",
      "name": "Market Holiday",
      "schedule": "Partial",
      "is_open": true,
      "has_settlement": true,
      "observed": false,
      "memo": null
    },
    {
      "fin_id": "US.NYSE",
      "date": "2021-12-24",
      "name": "Christmas",
      "schedule": "Closed",
      "is_open": false,
      "has_settlement": false,
      "observed": true,
      "memo": null
    },
    {
      "fin_id": "US.NYSE",
      "date": "2022-01-17",
      "name": "Birthday of Martin Luther King, Jr",
      "schedule": "Closed",
      "is_open": false,
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "fin_id": "US.NYSE",
      "date": "2022-02-21",
      "name": "Washington's Birthday",
      "schedule": "Closed",
      "is_open": false,
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "fin_id": "US.NYSE",
      "date": "2022-04-15",
      "name": "Good Friday",
      "schedule": "Closed",
      "is_open": false,
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "fin_id": "US.NYSE",
      "date": "2022-05-30",
      "name": "Memorial Day",
      "schedule": "Closed",
      "is_open": false,
      "has_settlement": false,
      "observed": false,
      "memo": null
    },
    {
      "fin_id": "US.NYSE",
      "date": "2022-07-04",
      "name": "Independence Day",
      "schedule": "Closed",
      "is_open": false,
      "has_settlement": false,
      "observed": false,
      "memo": null
    }
  ],
  "meta": {
    "start": "2021-07-18",
    "end": "2022-07-18"
  }
}
```
