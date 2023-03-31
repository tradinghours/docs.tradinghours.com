# Timezones

[[toc]]

## Timezones, Offsets, and Transitions

The Timezones API allows you to look up timezone offsets and Daylight Saving Time transitions times. This is essential for knowing precisely when markets will be open or closed. Common timezones include `America/New_York`, `Europe/London`, and `Asia/Tokyo`.

This API endpoint is included in all API access subscriptions.

::: tip Note
You can see what timezone a market uses by using the [market details endpoint](./market-details.md).
:::

## List Timezones

First, you will need to enumerate all time zones. Timezones are in [Olson Timezone format](https://en.wikipedia.org/wiki/Tz_database).

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| name | String | Olson timezone identifier. |
| country_code | ISO 3166 | Two-letter country code. |
| observes_dst | Boolean | Indicates in true/false if the timezone observes Daylight Saving Time. |

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.


#### Enumerate All Timezones
```
https://api.tradinghours.com/v3/timezones
```

### Sample JSON Response

``` json
{
  "data": [
    {
      "name": "Africa\/Abidjan",
      "country_code": "CI",
      "observes_dst": false
    },
    {
      "name": "Africa\/Accra",
      "country_code": "GH",
      "observes_dst": false
    },
    {
      "name": "Africa\/Addis_Ababa",
      "country_code": "ET",
      "observes_dst": false
    },
        ...
    {
      "name": "Pacific\/Wake",
      "country_code": "UM",
      "observes_dst": false
    },
    {
      "name": "Pacific\/Wallis",
      "country_code": "WF",
      "observes_dst": false
    },
    {
      "name": "UTC",
      "country_code": "??",
      "observes_dst": false
    }
  ]
}
```

## Timezone Transitions
This API shows the transitions for each timezone, the abbreviations for the timezones, and whether the timezone is currently observing Daylight Saving Time or not.

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| timestamp | Unix Timestamp | Time when the transition begins, showing in the number of seconds elapsed since January 1, 1970 |
| time | Datetime | Indicates the time that the transition begins |
| offset | Datetime Offset | Offset from UTC in seconds |
| is_dst | Boolean | Returns true/false, indicating if the period is Daylight Saving Time or not |
| abbreviation | Timzone Abbreviation | Common code used to identify the timezone |

### Query String Parameters
Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| timezone | Timezone name | N/A | <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones" target=_blank>Full list of timezones on Wikipedia</a> |

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get Timezone Transition for New York Timezone

```
https://api.tradinghours.com/v3/timezones/transitions?timezone=america/new_york
```

#### Get Timezone Transition for New York Between Dates
```
https://api.tradinghours.com/v3/timezones/transitions?timezone=america/new_york&start=2020-01-01&end=2025-12-31
```

### Sample JSON Response

```json
{
  "data": [
    {
      "timestamp": 1636264800,
      "time": "2021-11-07T06:00:00+0000",
      "offset": -18000,
      "is_dst": false,
      "abbreviation": "EST"
    },
    {
      "timestamp": 1647154800,
      "time": "2022-03-13T07:00:00+0000",
      "offset": -14400,
      "is_dst": true,
      "abbreviation": "EDT"
    },
    {
      "timestamp": 1667714400,
      "time": "2022-11-06T06:00:00+0000",
      "offset": -18000,
      "is_dst": false,
      "abbreviation": "EST"
    },
    {
      "timestamp": 1678604400,
      "time": "2023-03-12T07:00:00+0000",
      "offset": -14400,
      "is_dst": true,
      "abbreviation": "EDT"
    },
    {
      "timestamp": 1699164000,
      "time": "2023-11-05T06:00:00+0000",
      "offset": -18000,
      "is_dst": false,
      "abbreviation": "EST"
    },
    {
      "timestamp": 1710054000,
      "time": "2024-03-10T07:00:00+0000",
      "offset": -14400,
      "is_dst": true,
      "abbreviation": "EDT"
    },
    {
      "timestamp": 1730613600,
      "time": "2024-11-03T06:00:00+0000",
      "offset": -18000,
      "is_dst": false,
      "abbreviation": "EST"
    },
    {
      "timestamp": 1741503600,
      "time": "2025-03-09T07:00:00+0000",
      "offset": -14400,
      "is_dst": true,
      "abbreviation": "EDT"
    },
    {
      "timestamp": 1762063200,
      "time": "2025-11-02T06:00:00+0000",
      "offset": -18000,
      "is_dst": false,
      "abbreviation": "EST"
    },
    {
      "timestamp": 1772953200,
      "time": "2026-03-08T07:00:00+0000",
      "offset": -14400,
      "is_dst": true,
      "abbreviation": "EDT"
    }
  ],
  "meta": {
    "start": "2021-07-18",
    "end": "2026-07-18"
  }
}
```

