# Timezones

::: warning
You are viewing the documentation for an old version of the TradingHours.com API. Conciser using [version 3.x](/3.x/).
:::

[[toc]]

## Introduction

The timezone API allows you to check the current offset from Greenwich Mean Time (GMT)
and lookup passed and future timezone transitions out to the year 2030.

## List Available Timezones

This endpoint returns a list off all supported timezones IDs.
Includes canonical and alias IDs.

### Example
```
https://api.tradinghours.com/v2/timezones
```

### Response

```json
[
    "Africa/Abidjan",
    "Africa/Accra",
    "Africa/Addis_Ababa",
    "Africa/Algiers",
    "Africa/Asmara",
    "Africa/Bamako",
    "Africa/Bangui",
    "Africa/Banjul",
    "Africa/Bissau",
    "Africa/Blantyre",
    "Africa/Brazzaville",
    "Africa/Bujumbura",
    "Africa/Cairo",
    "Africa/Casablanca",
    "Africa/Ceuta",
    "Africa/Conakry",
    "Africa/Dakar",
    "Africa/Dar_es_Salaam",
    ...
]
```

## Timezone Details

Get basic details about each supported timezone.

::: tip Note
This API uses <a href="https://en.wikipedia.org/wiki/Query_string" target=_blank rel="noopener">query parameters</a> to specify timezone. This is because timezone IDs contain slashes which makes it impossible to specify the resource in the URI. Learn how to use <a href="https://en.wikipedia.org/wiki/Query_string" target=_blank rel="noopener">query parameters</a>.
:::


### Request Parameter
| Parameter | Description |
|     :-    |     :-      |
| timezone | <span class="text-warning">(required)</span> Timezone ID. Example: `Asia/Singapore` |


### Response Properties
| Parameter | Description |
|     :-    |     :-      |
| name | Name or ID of the timezone |
| country_code | <a href="https://www.iso.org/obp/ui/#search" target=_blank rel=noopener>ISO 31661 alpha-2 code</a> |
| latitude | Latitude within the timezone region |
| longitude | Longitude within the timezone region |
| comments | Comments, if any |
| observes_dst | Indicates if this timezone observes Daylight Savings Time at any point throughout the year |

### Example
```
https://api.tradinghours.com/v2/timezones/details?timezone=Asia/Singapore
```

### Response

```json
{
    "name": "Asia/Singapore",
    "country_code": "SG",
    "latitude": "1.2833",
    "longitude": "103.8500",
    "comments": "",
    "observes_dst": false
}
```

## Timezone Transitions

Get basic transitions and offsets for this timezone.

### Request Parameter
| Parameter | Description |
|     :-    |     :-      |
| timezone | <span class="text-warning">(required)</span> Timezone ID. Example: `Asia/Singapore` |
| start | <span class="text-success">(optional)</span> Start time. Format: `YYYY-MM-DD`. Minimum: `1970-01-01` |
| end | <span class="text-success">(optional)</span> End time. Format: `YYYY-MM-DD`. Maximum: `2030-12-31` |


### Response Properties
| Parameter | Description |
|     :-    |     :-      |
| ts | Timestamp when this offset begins. Seconds since 1970-01-01T00:00:00Z |
| time | Formatted timestamp when this offset begins. |
| offset | Offset in seconds +/- GMT time |
| isdst | Indicates if it is Daylight Savings Time during this period |
| abbr | Timezone abbreviation for this offset |

### Example

```html
https://api.tradinghours.com/v2/timezones/transitions?timezone=America/New_York&start=2020-01-01&end=2025-12-31
```

### Response

```json
[
    {
        "ts": 1577836800,
        "time": "2020-01-01T00:00:00+0000",
        "offset": -18000,
        "isdst": false,
        "abbr": "EST"
    },
    {
        "ts": 1583650800,
        "time": "2020-03-08T07:00:00+0000",
        "offset": -14400,
        "isdst": true,
        "abbr": "EDT"
    },
    {
        "ts": 1604210400,
        "time": "2020-11-01T06:00:00+0000",
        "offset": -18000,
        "isdst": false,
        "abbr": "EST"
    },
    {
        "ts": 1615705200,
        "time": "2021-03-14T07:00:00+0000",
        "offset": -14400,
        "isdst": true,
        "abbr": "EDT"
    },
    {
        "ts": 1636264800,
        "time": "2021-11-07T06:00:00+0000",
        "offset": -18000,
        "isdst": false,
        "abbr": "EST"
    },
    ...
]
```
