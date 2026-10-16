---
description: Deprecated legacy endpoint that returns a simplified weekly trading schedule. Use the Single-Day or Multiple-Day Trading Hours APIs instead.
search: false
prev: false
next: false
head:
  - - meta
    - name: robots
      content: noindex
---

# Simplified Trading Hours API (Deprecated)

::: danger Deprecated: Legacy Use Only
The Simplified Trading Hours API is deprecated. It remains available only so that existing integrations continue to work, and it should not be used for new integrations.

This endpoint returns a generic weekly schedule. It does not account for holidays, irregular schedules, or upcoming schedule changes, and it omits most trading phases.

For new integrations, use the [Single-Day Trading Hours API](./trading-hours.md#single-day-trading-hours-api) or the [Multiple-Day Trading Hours API](./trading-hours.md#multiple-day-trading-hours-api).
:::

[[toc]]

## Overview

The Simplified Trading Hours API returns the regular trading hours, pre-trading hours, and post-trading hours for each day of the week.

::: warning Overnight Trading Sessions
Some markets have overnight trading sessions. To represent this in the API, we use what we call "24hr+ time". In some cases, the end time may exceed 24:00. This indicates that the market closes the following day.

For example, if the start time is 16:00 and the end time is 32:00, the market opens at 4:00 pm and closes the next day at 8:00 am.
:::

## Schema

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

## Query String Parameters

Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| fin_id | Valid FinID | N/A | Specify which market to show data for. |

If you use a query string parameter that isn't supported, the API will ignore the invalid query string parameters and execute the ones it recognizes.

## Examples
Remember to use your [authentication token](../authentication.md) for all requests.

### Get Simplified Trading Hours for FinID
```
https://api.tradinghours.com/v3/markets/hours-simplified?fin_id=us.nyse
```

### Get Simplified Trading Hours for MIC
```
https://api.tradinghours.com/v3/markets/hours-simplified?fin_id=XNYS
```

### Get Simplified Trading Hours for FinID
```
https://api.tradinghours.com/v3/markets/hours-simplified?fin_id=JP.JPX.INDEXSPECIAL
```

## Sample JSON Response

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
