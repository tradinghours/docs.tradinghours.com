# Real-Time Market Status

::: warning
You are viewing the documentation for an old version of the TradingHours.com API. Conciser using [version 3.x](/3.x/).
:::

[[toc]]

## Introduction

This API gives you access to the market's current status of open or closed.

::: tip Note
Use the [List Markets](/2.x/endpoints/list.html) endpoint to get all MIC codes.
:::


## Get Status

Returns the real-time status (open/closed) for one or more markets.

### Request Parameter
| Parameter | Description |
|     :-    |     :-      |
| market | <span class="text-warning">(required)</span> comma-separated list of MIC codes |

> {info} You may use either `market` or `markets` for convenience.

### Response Properties
| Parameter | Description |
|     :-    |     :-      |
| name | Full name of the market |
| timezone | The timezone of the market |
| reason | Returns the current phase or name if holiday if the market is closed because of a holiday |
| status | Market status (open or closed) |
| until | The time when the current _phase_ will change. It is safe to cache the API results until this time. |
| nextBell | The time when `status` will change next and the market will officially open or close. For example, a market may have a "pre-close" phase 15 minutes before officially closing. In that case, `unitl` will indicate when the phase changes and `nextBell` will indicate when the market officially closes. |

### Example
```
https://api.tradinghours.com/v2/status?market=xnys
```

### Response

```json
{
    "xnys": {
        "name": "New York Stock Exchange",
        "timezone": "America/New_York",
        "reason": "Primary Trading Session (Tape A)",
        "status": "open",
        "until": "Tue, 22 Oct 2019 15:45:00 -0400",
        "nextBell": "Tue, 22 Oct 2019 16:00:00 -0400"
    }
}
```

::: tip Notice
Notice `until` is 15 minutes before `nextBell`. That is because at 15:45:00, the New York Stock Exchange will enter its "pre-close" phase. The `reason` will update at this time to reflect the new phase. However, the `status` will not change to "closed" until 16:00:00.
:::

### Bulk Example

```
https://api.tradinghours.com/v2/status?markets=xnys,xjpx
```

### Bulk Response
```json
{
    "xnys": {
        "name": "New York Stock Exchange",
        "timezone": "America/New_York",
        "reason": "Primary Trading Session (Tape A)",
        "status": "open",
        "until": "Tue, 22 Oct 2019 15:45:00 -0400",
        "nextBell": "Tue, 22 Oct 2019 16:00:00 -0400"
    },
    "xjpx": {
        "name": "Tokyo Stock Exchange",
        "timezone": "Asia/Tokyo",
        "reason": null,
        "status": "closed",
        "until": "Wed, 23 Oct 2019 09:00:00 +0900",
        "nextBell": "Wed, 23 Oct 2019 09:00:00 +0900"
    }
}
```
