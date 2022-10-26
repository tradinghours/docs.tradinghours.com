# Trading Hours

::: warning
You are viewing the documentation for an old version of the TradingHours.com API. Conciser using [version 3.x](/3.x/).
:::

[[toc]]

## Introduction

Get regular trading hours for markets.

::: tip Note
Use the [List Markets](/2.x/endpoints/list.html) endpoint to get all exchange MIC codes.
:::

## Trading Hours

### Request Parameter
| Parameter | Description |
|     :-    |     :-      |
| code | <span class="text-warning">(required)</span> Unique identifier for the market |


### Response Properties
| Parameter | Description |
|     :-    |     :-      |
| code | Unique identifier for the market |
| open | Indicates if the market is open that day. "1" for open, "0" for closed. |
| time_start | Time the market opens |
| time_end |  Time the market closes  |
| lunch |  Whether or not the market closes for lunch. "1" for yes, "0" for no.  |
| lunch_start |  Time lunch break starts  |
| lunch_end |  Time lunch break ends  |
| pre_hours_start |  Start of pre-trading (Not available for all markets)  |
| pre_hours_end |  End of pre-trading (Not available for all markets)  |
| post_hours_start |  Start of after-hours trading (Not available for all markets)  |
| post_hours_end |  End of after-hour trading (Not available for all markets)  |


### Example

```
https://api.tradinghours.com/v2/markets/xnys/hours
```

### Response

```json
{
    "code": "xnys",
    "hours": [
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
            "pre_hours_start": null,
            "pre_hours_end": null,
            "post_hours_start": null,
            "post_hours_end": null
        },
        {
            "day": "Tuesday",
            "open": true,
            "time_start": "09:30",
            "time_end": "16:00",
            "lunch": false,
            "lunch_start": null,
            "lunch_end": null,
            "pre_hours_start": null,
            "pre_hours_end": null,
            "post_hours_start": null,
            "post_hours_end": null
        },
        ...
    ]
}
```
