# Local Time

[[toc]]

## Markets Local Time

This endpoint allows you to check the local time at any market or trading venue.

Bulk requests and CSV downloads are supported. Use the `FinID` obtained from the [List Markets](./find-markets.md#list-all-markets).

We recommend using bulk requests whenever possible to avoid hitting rate limits.

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| fin_id | String | The `FinID` for the market. |
| timezone | String | Gives the timezone the market utilizes in Olson timezone identifier format. |
| iso_8601 | ISO 8601 | Shows the full current local time at the market. |
| date | Date | Shows the date at the market, part of the iso_8601 field. |
| time | Time | Shows the time at the market, including seconds. |
| offset | Offset | Shows the offset value for the market. |
| day | String | Shows the current day of the week for the market. |

### Query String Parameters
Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| fin_id | Valid FinID(s) | N/A | Specify which market(s) to show data for. |
| format | CSV, JSON | JSON | Specify output format |

If you use a query string parameter that isn't supported, the API will ignore the invalid query string parameters and execute the ones it recognizes.

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get Local Time for Single `FinID`
```
https://api.tradinghours.com/v3/markets/local-time?fin_id=us.nyse
```

#### Get Local Time for Two `FinID`s
```
https://api.tradinghours.com/v3/markets/local-time?fin_id=us.nyse,jp.jpx
```

#### Get Local Time for Single `MIC`
```
https://api.tradinghours.com/v3/markets/local-time?mic=XNYS
```

#### Get Local Time for Three `FinID`s in CSV Format
```
https://api.tradinghours.com/v3/markets/local-time?fin_id=us.nyse,jp.jpx,gb.lse&format=csv
```

### Sample JSON Response

```json
{
    "data": [
        {
            "fin_id": "JP.JPX",
            "timezone": "Asia\/Tokyo",
            "iso_8601": "2021-07-12T10:56:52+09:00",
            "date": "2021-07-12",
            "time": "10:56:52",
            "offset": "+09:00",
            "day": "Monday"
        },
        {
            "fin_id": "US.NYSE",
            "timezone": "America\/New_York",
            "iso_8601": "2021-07-11T21:56:52-04:00",
            "date": "2021-07-11",
            "time": "21:56:52",
            "offset": "-04:00",
            "day": "Sunday"
        }
    ]
}
```
