# Trading Hours

[[toc]]

## Overview

There are three API endpoints that provide information on market trading hours. The endpoints provide the same information in different formats. Each endpoint is designed for a different use-case.

The APIs are:

1. [Single-Day Trading Hours API](#single-day-trading-hours-api)
2. [Multiple-Day Trading Hours API](#multiple-day-trading-hours-api)
3. [Simplified Trading Hours API](#simplified-trading-hours-api)

The sections below will explain the intended use-case for each API.

::: tip Notice
Unlike our other API endpoints, the trading hours endpoints do not support bulk requests with multiple FinIDs or markets. This is due to the nested structure of the API results.
:::

## Single-Day Trading Hours API

The Single-Day Trading Hours API endpoint allows you to see the full trading schedule for a market on a specific date. The API returns detailed information containing the start and end times for all trading phases throughout the day.

Some markets have overnight trading.
This endpoint will return all trading phases that overlap the specified date even if the trading phase starts on the previous day or ends on the following day.
When working with markets that have overnight trading schedules we recommend you use the [Multi-Day Trading Hours API](#multiple-day-trading-hours-api).

You can specify a particular date by passing the `date` query string parameter. The date format must be `yyyy-mm-dd`. If the `date` parameter is omitted, the current date is used.

The `date` will always be converted into the timezone of the specified market.

### Response Schema

| Field | Format | Description |
| ------------- | ------------- | --------- |
| date | Date | The date for the data returned. |
| day_of_week | String | The day of the week for the data returned. |
| is_open | Boolean | Describes in true/false statement if the market is open. |
| has_settlement | Boolean | Describes in true/false statement if the market has settlement. |
| holiday | String | Describes the holiday, if any. |
| schedule | See schema below | Nested data of the schedule. |

#### Schedule Schema (Part of Response)

| Field | Format | Description |
| ------------- | ------------- | --------- |
| phase_type | Structured Field | The options for this field are `Primary Trading Session`, `Primary Trading Session, No Settlement`, `Pre-Trading Session`, `Post-Trading Session`, `Pre-Open`, `Pre-Close`, `Call Auction`, `Intermission`, `Trading-at-Last`, `Order Collection Period`, and `Other`. |
| phase_name | Free-form name of the phase. This is the name the exchange uses to describe the phase. |
| phase_memo | Further description of this market, if required |
| status | String | Indicates if the market is considered "open" or "closed" during this phase. |
| start | ISO 8601 | The date the market phase type started. |
| end | ISO 8601 | The scheduled date for the market phase type to end. |

### Query String Parameters

Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| fin_id | Valid FinID | N/A | Specify which market to show data for. |
| date | yyyy-mm-dd | Current Date | Specifies the date of the information. |

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get Full Trading Schedule with FinID
```
https://api.tradinghours.com/v3/markets/hours?fin_id=us.nyse
```

#### Get Full Trading Schedule with MIC
```
https://api.tradinghours.com/v3/markets/hours?fin_id=XNYS
```

#### Get Trading Schedule for Particular Date
```
https://api.tradinghours.com/v3/markets/hours?fin_id=us.nyse&date=2020-12-24
```

### Sample JSON Responses

```json
{
  "data": {
    "date": "2020-09-24",
    "day_of_week": "Thursday",
    "is_open": true,
    "has_settlement": true,
    "holiday": null,
    "schedule": [
      {
        "phase_type": "Pre-Trading Session",
        "phase_name": "Pre-Trading Session",
        "phase_memo": null,
        "status": "Closed",
        "start": "2020-09-24T04:00:00-04:00",
        "end": "2020-09-24T09:30:00-04:00"
      },
      {
        "phase_type": "Pre-Open",
        "phase_name": "Pre-Opening Session",
        "phase_memo": null,
        "status": "Closed",
        "start": "2020-09-24T06:30:00-04:00",
        "end": "2020-09-24T09:30:00-04:00"
      },
      {
        "phase_type": "Call Auction",
        "phase_name": "Core Open Auction",
        "phase_memo": null,
        "status": "Closed",
        "start": "2020-09-24T09:30:00-04:00",
        "end": "2020-09-24T09:30:00-04:00"
      },
      {
        "phase_type": "Primary Trading Session",
        "phase_name": "Core Trading Session",
        "phase_memo": null,
        "status": "Open",
        "start": "2020-09-24T09:30:00-04:00",
        "end": "2020-09-24T16:00:00-04:00"
      },
      {
        "phase_type": "Pre-Close",
        "phase_name": "Closing Imbalance Period",
        "phase_memo": null,
        "status": "Closed",
        "start": "2020-09-24T15:45:00-04:00",
        "end": "2020-09-24T16:00:00-04:00"
      },
      {
        "phase_type": "Post-Trading Session",
        "phase_name": "Extended Hours",
        "phase_memo": null,
        "status": "Closed",
        "start": "2020-09-24T16:00:00-04:00",
        "end": "2020-09-24T20:00:00-04:00"
      }
    ]
  }
}
```


```json
{
  "data": {
    "date": "2020-12-24",
    "day_of_week": "Thursday",
    "is_open": true,
    "has_settlement": true,
    "holiday": "Christmas",
    "schedule": [
      {
        "phase_type": "Pre-Trading Session",
        "phase_name": "Pre-Opening Session",
        "phase_memo": null,
        "status": "Closed",
        "start": "2020-12-24T06:30:00-05:00",
        "end": "2020-12-24T09:30:00-05:00"
      },
      {
        "phase_type": "Primary Trading Session",
        "phase_name": "Core Trading Session",
        "phase_memo": null,
        "status": "Open",
        "start": "2020-12-24T09:30:00-05:00",
        "end": "2020-12-24T13:00:00-05:00"
      },
      {
        "phase_type": "Post-Trading Session",
        "phase_name": "Crossing Session",
        "phase_memo": null,
        "status": "Closed",
        "start": "2020-12-24T13:00:00-05:00",
        "end": "2020-12-24T13:30:00-05:00"
      }
    ]
  }
}
```

## Multiple-Day Trading Hours API

The Multiple-Day Trading Hours API is intended for use with markets that have overnight trading phases.
This endpoint will return all trading phases between the specified `start` and `end` dates.

Only certain derivative markets have overnight trading phases. Equity markets do not have overnight trading.

[Single-Day Trading Hours API](#single-day-trading-hours-api) returns all trading phases on a particular `date`, including phases that start the previous day or end the following day.
If there is an overnight phase, that phase will be included in the response for both days.
This duplication can be difficult to work with.
The Multiple-Day Trading Hours API avoids this problem.

### Schema

| Field | Format | Description |
| ------------- | ------------- | --------- |
| start | Date | The start date for the data returned. |
| end | Date | The end date for the data returned. |
| schedule | See schema below | Nested data of the schedule. |

#### Schedule Schema (Part of Response)

| Field | Format | Description |
| ------------- | ------------- | --------- |
| phase_type | Structured Field | The options for this field are `Primary Trading Session`, `Primary Trading Session, No Settlement`, `Pre-Trading Session`, `Post-Trading Session`, `Pre-Open`, `Pre-Close`, `Call Auction`, `Intermission`, `Trading-at-Last`, `Order Collection Period`, and `Other`. |
| phase_name | Free-form name of the phase. This is the name the exchange uses to describe the phase. |
| phase_memo | Further description of this market, if required |
| status | String | Indicates if the market is considered "open" or "closed" during this phase. |
| start | ISO 8601 | The date the market phase type started. |
| end | ISO 8601 | The scheduled date for the market phase type to end. |

### Query String Parameters

Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| fin_id | Valid FinID | N/A | Specify which market to show data for. |
| start | yyyy-mm-dd | N/A | Specifies the start date of the information. |
| end | yyyy-mm-dd | N/A | Specifies the end date of the information. Max 7 days after start date. |

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get Trading Schedule for Date Range

```
https://api.tradinghours.com/v3/markets/hours-multiday?fin_id=jp.jpx.indextop3&start=2022-02-20&end=2022-02-27
```

### Sample JSON Response

```json
{
  "data": {
    "start": "2022-02-20",
    "end": "2022-02-27",
    "schedule": [
      {
        "phase_type": "Pre-Close",
        "phase_name": "Pre Closing",
        "phase_memo": null,
        "status": "Closed",
        "start": "2022-02-21T05:25:00+09:00",
        "end": "2022-02-21T05:29:00+09:00"
      },
      {
        "phase_type": "Other",
        "phase_name": "No-Cancel",
        "phase_memo": null,
        "status": "Closed",
        "start": "2022-02-21T05:29:00+09:00",
        "end": "2022-02-21T05:30:00+09:00"
      },
      {
        "phase_type": "Call Auction",
        "phase_name": "Closing Auction",
        "phase_memo": null,
        "status": "Closed",
        "start": "2022-02-21T05:30:00+09:00",
        "end": "2022-02-21T05:30:00+09:00"
      },
      {
        "phase_type": "Pre-Open",
        "phase_name": "Pre-Opening",
        "phase_memo": null,
        "status": "Closed",
        "start": "2022-02-21T08:00:00+09:00",
        "end": "2022-02-21T08:44:00+09:00"
      },
      {
        "phase_type": "Other",
        "phase_name": "No-Cancel",
        "phase_memo": null,
        "status": "Closed",
        "start": "2022-02-21T08:44:00+09:00",
        "end": "2022-02-21T08:45:00+09:00"
      },
      ...
    ]
  }
}
```

## Simplified Trading Hours API

Sometimes, you don't need information on every trading phase.

If you just want to know the regular trading hours, pre-trading hours, and post-trading hours, you can use the Simplified Trading Hours API Endpoint.

::: warning Overnight Trading Sessions
Some markets have overnight trading sessions. To represent this in the API, we use what we call "24hr+ time". In some cases, the end time may exceed 24:00. This indicates that the market closes the following day.

For example, if the start time is 16:00 and the end time is 32:00, the market opens at 4:00 pm and closes the next day at 8:00 am.
:::

### Schema

| Field | Format | Description |
| ------------- | ------------- | --------- |
| day | String | Day of the week in string format. |
| open | Boolean | Describes if the market is open in true/false. |
| time_start | Time | Describes the time the market trading session opens. |
| time_end | Time | Describes the time the market trading session ends. |
| lunch | Boolean | Describes if the market has observed lunch hours in true/false. |
| lunch_start | Time | If observed lunch hours, this describes when lunch hours start. |
| lunch_end | Time | If observing lunch hours, this describes when lunch hours end. |
| pre_hours_start | Time | If pre-hours, describes what time they start. |
| pre_hours_end | Time | If pre-hours, describes what time they end. |
| post_hours_start | Time | If post-hours, describes what time they start. |
| post_hours_end | Time | If post-hours, describes what time they end. |

### Query String Parameters

Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| fin_id | Valid FinID | N/A | Specify which market to show data for. |

If you use a query string parameter that isn't supported, the API will ignore the invalid query string parameters and execute the ones it recognizes.

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get Simplified Trading Hours for FinID
```
https://api.tradinghours.com/v3/markets/hours-simplified?fin_id=us.nyse
```

#### Get Simplified Trading Hours for MIC
```
https://api.tradinghours.com/v3/markets/hours-simplified?fin_id=XNYS
```

#### Get Simplified Trading Hours for FinID
```
https://api.tradinghours.com/v3/markets/hours-simplified?fin_id=JP.JPX.INDEXSPECIAL
```

### Sample JSON Response

```json
{
  "data": [
    {
      "day": "Sunday",
      "open": false,
      "time_start": null,
      "time_end": null,
      "lunch": false,
      "lunch_start": null,
      "lunch_end": null,
      "pre_hours_start": null,
      "pre_hours_end": null,
      "post_hours_start": null,
      "post_hours_end": null
    },
    {
      "day": "Monday",
      "open": true,
      "time_start": "09:30",
      "time_end": "16:00",
      "lunch": false,
      "lunch_start": null,
      "lunch_end": null,
      "pre_hours_start": "04:00",
      "pre_hours_end": "09:30",
      "post_hours_start": "16:00",
      "post_hours_end": "20:00"
    },
    {
      "day": "Tuesday",
      "open": true,
      "time_start": "09:30",
      "time_end": "16:00",
      "lunch": false,
      "lunch_start": null,
      "lunch_end": null,
      "pre_hours_start": "04:00",
      "pre_hours_end": "09:30",
      "post_hours_start": "16:00",
      "post_hours_end": "20:00"
    },
    {
      "day": "Wednesday",
      "open": true,
      "time_start": "09:30",
      "time_end": "16:00",
      "lunch": false,
      "lunch_start": null,
      "lunch_end": null,
      "pre_hours_start": "04:00",
      "pre_hours_end": "09:30",
      "post_hours_start": "16:00",
      "post_hours_end": "20:00"
    },
    {
      "day": "Thursday",
      "open": true,
      "time_start": "09:30",
      "time_end": "16:00",
      "lunch": false,
      "lunch_start": null,
      "lunch_end": null,
      "pre_hours_start": "04:00",
      "pre_hours_end": "09:30",
      "post_hours_start": "16:00",
      "post_hours_end": "20:00"
    },
    {
      "day": "Friday",
      "open": true,
      "time_start": "09:30",
      "time_end": "16:00",
      "lunch": false,
      "lunch_start": null,
      "lunch_end": null,
      "pre_hours_start": "04:00",
      "pre_hours_end": "09:30",
      "post_hours_start": "16:00",
      "post_hours_end": "20:00"
    },
    {
      "day": "Saturday",
      "open": false,
      "time_start": null,
      "time_end": null,
      "lunch": false,
      "lunch_start": null,
      "lunch_end": null,
      "pre_hours_start": null,
      "pre_hours_end": null,
      "post_hours_start": null,
      "post_hours_end": null
    }
  ]
}
```
