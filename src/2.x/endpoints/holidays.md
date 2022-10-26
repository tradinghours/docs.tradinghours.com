# Market Holidays

::: warning
You are viewing the documentation for an old version of the TradingHours.com API. Conciser using [version 3.x](/3.x/).
:::

[[toc]]

## Introduction

Get holiday schedule for markets.

::: tip Note
Use the [List Markets](/2.x/endpoints/list.html) endpoint to get all exchange MIC codes.
:::

## List Available Years

Get all the available years for a given market.

### Request Parameter
| Parameter | Description |
|     :-    |     :-      |
| code | <span class="text-warning">(required)</span> Unique identifier for the market |

### Example

```html
https://api.tradinghours.com/v2/markets/xnys/holidays
```

### Response

```json
{
    "code": "xnys",
    "years": [
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021"
    ]
}
```


## List Holidays

Get market holidays for a given market and year.

### Request Parameter
| Parameter | Description |
|     :-    |     :-      |
| code | <span class="text-warning">(required)</span> Unique identifier for the market |
| year | <span class="text-warning">(required)</span> Which year to return |


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
https://api.tradinghours.com/v2/markets/xnys/holidays/2020
```

### Response

```json
{
    "code": "xnys",
    "year": "2020",
    "holidays": [
        {
            "date": "2020-01-01",
            "observed": false,
            "open": false,
            "time_start": null,
            "time_end": null,
            "holiday": "New Year's Day"
        },
        {
            "date": "2020-01-20",
            "observed": false,
            "open": false,
            "time_start": null,
            "time_end": null,
            "holiday": "Birthday of Martin Luther King, Jr"
        },
        {
            "date": "2020-02-17",
            "observed": false,
            "open": false,
            "time_start": null,
            "time_end": null,
            "holiday": "Washington's Birthday"
        },
        {
            "date": "2020-04-10",
            "observed": false,
            "open": false,
            "time_start": null,
            "time_end": null,
            "holiday": "Good Friday"
        },
        {
            "date": "2020-05-25",
            "observed": false,
            "open": false,
            "time_start": null,
            "time_end": null,
            "holiday": "Memorial Day"
        },
        {
            "date": "2020-07-03",
            "observed": true,
            "open": false,
            "time_start": null,
            "time_end": null,
            "holiday": "Independence Day"
        },
        {
            "date": "2020-09-07",
            "observed": false,
            "open": false,
            "time_start": null,
            "time_end": null,
            "holiday": "Labor Day"
        },
        {
            "date": "2020-11-26",
            "observed": false,
            "open": false,
            "time_start": null,
            "time_end": null,
            "holiday": "Thanksgiving Day"
        },
        {
            "date": "2020-11-27",
            "observed": true,
            "open": true,
            "time_start": "09:30",
            "time_end": "13:00",
            "holiday": "Thanksgiving Day"
        },
        {
            "date": "2020-12-24",
            "observed": true,
            "open": true,
            "time_start": "09:30",
            "time_end": "13:00",
            "holiday": "Christmas"
        },
        {
            "date": "2020-12-25",
            "date": "2020-12-25",
            "observed": false,
            "open": false,
            "time_start": null,
            "time_end": null,
            "holiday": "Christmas"
        }
    ]
}
```
