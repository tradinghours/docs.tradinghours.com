# List Markets

::: warning
You are viewing the documentation for an old version of the TradingHours.com API. Conciser using [version 3.x](/3.x/).
:::

[[toc]]

## List Markets

The `markets` endpoint displays the complete list of all supported markets.
You can use the returned `code` in all other endpoints to specify an exchange.

The `details` endpoint can be used to see additional information about each market.

List all available markets with their full name and unique code.

### Response Properties
| Parameter | Description |
|     :-    |     :-      |
| name | Full name of the market |
| code | MIC code for the market. This is a unique code. Use this code in all other requests to specify a market. |
| operating_mic | Operating MIC for the exchange. If `code` is different than Operating MIC than this market is a _market segment_. |

::: tip Info
Learn more about MICs, "Operating MICs" and "Market Segments" at <a href="https://www.iso20022.org/sites/default/files/ISO10383_MIC/FAQ_ISO_10383.pdf" target="_blank">ISO 10383 FAQ</a>.
:::


### Example
```
https://api.tradinghours.com/v2/markets
```
### Response
```json
[
    {
        "name": "New York Stock Exchange",
        "operating_mic": "xnys",
        "code": "xnys"
    },
    {
        "name": "NASDAQ Stock Exchange",
        "operating_mic": "xnas",
        "code": "xnas"
    },
    {
        "name": "London Stock Exchange",
        "operating_mic": "xlon",
        "code": "xlon"
    },
    {
        "name": "Tokyo Stock Exchange",
        "operating_mic": "xjpx",
        "code": "xjpx"
    },
    ...
]
```

## Market Details

Show details about a market.

### Request Parameter
| Parameter | Description |
|     :-    |     :-      |
| code | <span class="text-warning">(required)</span> Unique identifier for the market |

### Response Parameter
| Parameter | Description |
|     :-    |     :-      |
| name | Full name of the market |
| code | MIC code for the market. This is a unique identifier. Use this code in all other requests to specify a market. |
| operating_mic | Operating MIC for the exchange. If `code` is different than Operating MIC then this entry is a _market segment_
| country | Country of the market |
| country_code | <a href="https://www.iso.org/obp/ui/#search" target=_blank rel=noopener>ISO 31661 alpha-2 code</a> |
| continent | Continent of the market
| website | Official website for the market
| currency | Currency of the market
| timezone | The timezone of the market. See the [Timezone API](/2.x/endpoints/timezones.html) for details. |

### Example

```html
https://api.tradinghours.com/v2/markets/xnys
```

### Response

```json
{
    "name": "New York Stock Exchange",
    "operating_mic": "xnys",
    "country_code": "US",
    "city": "New York",
    "continent": null,
    "currency": "USD",
    "timezone": "America/New_York",
    "website": "www.nyse.com",
    "country": "United States",
    "code": "xnys"
}
```
