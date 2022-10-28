# Market Status

[[toc]]

## Market Status Details
The Market Status API will return, in real-time, the current status of a market, including:
- If a market is open or closed
- When the market opens or closes next
- The current trading phase _(pre-, post-trading session, etc.)_
- If there is currently a holiday or irregular schedule

You can use these details to:
- Build dashboards
- Add countdowns or market status indicators to your website or application
- Activate trading algorithms when markets open
- Detect market holidays and half-days

::: tip Note
This API takes previously-scheduled holidays and half-days into account but does **not** factor in circuit breakers or halts.
:::

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| local-time | ISO 8601 | The current local time at the market. |
| status | String | `Open` if it is currently a primary trading session. `Closed` otherwise, including for pre- and post-trading sessions. |
| reason | String | Explanation of the current response, including phase(s), holidays, and irregular schedules. |
| until | ISO 8601 | Displays the end of the current phase. |
| next_bell | ISO 8601 | Displays the time when the market opens or closes next. |
| utc_time | ISO 8601 | Displays the time in UTC. |
| time | ISO 8601 | Displays the same as "utc_time". |


::: tip Note
`until` is not always the same as `next_bell`. For example, if it is currently a post-trading session, `until` will indicate the end of the post-trading session, and `next_bell` will be the following morning when markets officially open.
:::

### Query String Parameters
Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| fin_id | Valid FinID(s) | N/A | Specify which market(s) to show data for |
| format | CSV, JSON | JSON | Specify output format |

### Caching

The results of the status API will not change until `until`.
It is safe to cache results until this time.
Caching requests and using bulk API calls will help you avoid exceeding the [rate limits](../api-details.md#rate-limits).

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get Details for Single FinID

```
http://api.tradinghours.com/v3/markets/status?fin_id=us.nyse
```
#### Get Details for Single MIC
```
http://api.tradinghours.com/v3/markets/status?fin_id=XNYS
```

#### Get Details for Bulk FinIDs

```
http://api.tradinghours.com/v3/markets/status?fin_id=us.nyse,jp.jpx
```

#### Get Details in CSV Format

```
http://api.tradinghours.com/v3/markets/status?fin_id=us.nyse,jp.jpx&format=csv
```

### Sample JSON Responses

#### Get Details for Single FinID - Holiday Partial Hours
``` json
{
   "data":{
      "US.NYSE":{
         "fin_id":"US.NYSE",
         "exchange":"New York Stock Exchange",
         "market":"Canonical",
         "products":null,
         "local_time":"2020-11-27T11:55:00-05:00",
         "status":"Open",
         "reason":"Market Holiday - Primary Trading Session (Partial)",
         "until":"2020-11-27T12:45:00-05:00",
         "next_bell":"2020-11-27T13:00:00-05:00"
      }
   },
   "meta":{
      "utc_time":"2020-11-27T16:55:00+00:00",
      "time":"2020-11-27T12:55:00-04:00"
   }
}
```

#### Get Details for Bulk FinIDs - Closed Market and Open Primary Market
```json
{
    "data": {
        "JP.JPX": {
            "fin_id": "JP.JPX",
            "exchange": "Japan Exchange Group",
            "market": "Tokyo Stock Exchange",
            "products": null,
            "local_time": "2020-09-12T04:03:19+09:00",
            "status": "Closed",
            "reason": null,
            "until": "2020-09-14T08:00:00+09:00",
            "next_bell": "2020-09-14T12:30:00+09:00"
        },
        "US.NYSE": {
            "fin_id": "US.NYSE",
            "exchange": "New York Stock Exchange",
            "market": "Canonical",
            "products": null,
            "local_time": "2020-09-11T15:03:19-04:00",
            "status": "Open",
            "reason": "Primary Trading Session",
            "until": "2020-09-11T15:45:00-04:00",
            "next_bell": "2020-09-11T16:00:00-04:00"
        }
    },
    "meta": {
        "utc_time": "2020-09-11T19:03:19+00:00",
        "time": "2020-09-11T19:03:19+00:00"
    }
}
```
