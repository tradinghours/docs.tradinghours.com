# Market Status (Enterprise)

[[toc]]

## Real-Time Market Status (Enterprise)

This API is the same as the [Market Status API](../endpoints/market-status.md) **except** the Enterprise API can also specify a particular time.

### Past & Future Times

This API also allows you to check a market's status at any time: past, present or future. Use the `time` query string parameter to specify a date and time. The `time` parameter should be in ISO 8601 format. E.g. `2020-02-27T01:23:45-05:00`.

If the `time` parameter is omitted, the current time is used.

::: warning Note
Our pricing is structured around what data you need. This results in different plans with different levels of access. The `time` parameter is not accessible on all plans. [Contact our team for more details](https://www.tradinghours.com/contact).
:::

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| local-time | ISO 8601 | The current local time at the market. |
| status | String | "Open" displays if it is currently a primary trading session. "Closed" will show otherwise, including for pre- and post-trading sessions. |
| reason | String | Explanation of the current response, including phase(s), holidays, and irregular schedules. |
| until | ISO 8601 | Displays the end of the current phase. |
| next_bell | ISO 8601 | Displays the time when the market opens or closes next. |
| utc_time | ISO 8601 | Displays the time in UTC. |
| time | ISO 8601 | The current time in the same timezone as was specified in the `time` query string parameter. |


::: tip Note
`until` is not always the same as `next_bell`. For example, if it is currently a post-trading session, `until` will indicate the end of the post-trading session, and `next_bell` will be the following morning when markets officially open.
:::

### Query String Parameters
Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| fin_id | Valid FinID(s) | N/A | Specify which market(s) to show data for. |
| format | CSV, JSON | JSON | Specify output format |
| time | ISO 8601 | Current time | Specify the time that you'd like the information for. |

### Caching

The results of the status API will not change until `until`.
It is safe to cache results until this time.
Caching requests and using bulk API calls will help you avoid exceeding the [rate limits](../api-details.md#rate-limits).

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get Details for Single FinID with Defined Time
```
http://api.tradinghours.com/v3/markets/status?fin_id=us.nyse&time=2020-11-27T12:55:00-04:00
```
#### Get Details for Single MIC with Defined Time
```
http://api.tradinghours.com/v3/markets/status?fin_id=XNYS&time=2020-11-27T12:55:00-04:00
```

#### Get Details for Bulk FinIDs with Defined Time

```
http://api.tradinghours.com/v3/markets/status?fin_id=us.nyse,jp.jpx&time=2020-11-27T12:55:00-04:00
```

#### Get Details in CSV Format with Defined Time

```
http://api.tradinghours.com/v3/markets/status?fin_id=us.nyse,jp.jpx&format=csv&time=2020-11-27T12:55:00-04:00
```

### Sample JSON Response

```json
{
  "data": {
    "JP.JPX": {
      "fin_id": "JP.JPX",
      "exchange": "Japan Exchange Group",
      "market": "Tokyo Stock Exchange",
      "products": null,
      "local_time": "2020-11-28T01:55:00+09:00",
      "status": "Closed",
      "reason": null,
      "until": "2020-11-30T08:00:00+09:00",
      "next_bell": "2020-11-30T09:00:00+09:00"
    },
    "US.NYSE": {
      "fin_id": "US.NYSE",
      "exchange": "New York Stock Exchange",
      "market": "Canonical",
      "products": null,
      "local_time": "2020-11-27T11:55:00-05:00",
      "status": "Open",
      "reason": "Thanksgiving Day - Primary Trading Session (Partial)",
      "until": "2020-11-27T13:00:00-05:00",
      "next_bell": "2020-11-27T13:00:00-05:00"
    }
  },
  "meta": {
    "utc_time": "2020-11-27T16:55:00+00:00",
    "time": "2020-11-27T12:55:00-04:00"
  }
}
```
