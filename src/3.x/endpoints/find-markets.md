# Find Markets

[[toc]]

## List All Markets

To start using the API, you first need to know the `FinID` for the market or markets you're in. To find this, you can use this List Markets endpoint to get the information programmatically. Alternatively, you can use `MIC` for our APIs, and our system will select the closest matching `FinID` and return the appropriate information.

::: tip Tip
You can also browse our [data coverage](https://www.tradinghours.com/data/coverage) to see what's available.
:::

After looking through the list of all markets, you may still be unsure which `FinID` to use. You can use `MIC` in place of the `FinID` or feel free to <a href="https://www.tradinghours.com/contact" target=_blank>contact us</a>.

You can also use the [market details](./market-details.md) endpoint to get more information about a market. In the details, there is a `memo` field that describes the securities that fall under a `FinID`.

### MICs (Market Identification Codes)

We include segment `MIC` in the response to help you find the appropriate `FinID`. Typically, `MIC`'s alone are not granular enough to identify distinct trading schedules and calendars. That is why we use `FinID`, a proprietary market identifier. If you use `MIC` in place of the `FinID`, our system will select the closest match.

In order to find the correct `FinID`, look at `exchange`, `market`, and `product`.

::: warning Notice
If you need help determining which `FinID` to use, <a href="https://www.tradinghours.com/contact">contact us</a>.
:::

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| fin_id | String | The `FinID` for the market. |
| exchange | String | The exchange name of the market. |
| market | String | The name of the market. |
| products | String | Description of the products or securities group. |
| mic | String | The `MIC` for the market. |
| asset_type | String | Describes the asset type of the market. |
| group | String | Describes which market tier the market is included in. |

### Query String Parameters
Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| group | Core, Extended, All, Allowed | All | Specify which group of markets to show. "Allowed" will show all markets you are permitted to access. |
| format | CSV, JSON | JSON | Specify output format |

If you use a query string parameter that isn't supported, the API will ignore the invalid query string parameters and execute the ones it recognizes.


### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get All Markets
```
https://api.tradinghours.com/v3/markets
```

#### Get All Core Markets
```
https://api.tradinghours.com/v3/markets?group=core
```

#### Get Extended Markets
```
https://api.tradinghours.com/v3/markets?group=extended
```

#### Get All Markets in CSV Format
```
https://api.tradinghours.com/v3/markets?format=csv
```

### Sample JSON Response
``` json
{
    "data": [
        {
            "fin_id": "AE.ADX",
            "exchange": "Abu Dhabi Securities Exchange",
            "market": "Abu Dhabi Securities Exchange (ADX)",
            "products": null,
            "mic": "XADS",
            "asset_type": "Securities",
            "group": "Extended"
        },
        {
            "fin_id": "AE.DFM",
            "exchange": "Dubai Financial Market",
            "market": "Dubai Financial Market (DFM)",
            "products": null,
            "mic": "XDFM",
            "asset_type": "Securities",
            "group": "Extended"
        },
        {
            "fin_id": "AE.NDXB",
            "exchange": "NASDAQ Dubai",
            "market": "NASDAQ Dubai (Equities)",
            "products": null,
            "mic": "DIFX",
            "asset_type": "Securities",
            "group": "Extended"
        },
        ...
    ],
}
```
## Lookup Markets

The "Lookup Markets" endpoint allows you to easily search for markets based on any attribute such as Exchange Name, Market Name, Security Description, MIC, or country.

Each unique trading schedule or trading calendar is identified by a unique "FinID." Most exchanges have several different trading schedules for equities, bonds, futures, etc.
In total, we track over 1,000 different trading schedules.

This API allows you to easily search for the exact trading calendar you need.

### Schema

The response schema for the Lookup API is the same as the List Markets API above.

### Query String Parameters

Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| q | Any | N/A | Free-form search field |
| group | Core, Extended, All, Allowed | All | Specify which group of markets to show. "Allowed" will show all markets you are permitted to access. |
| format | CSV, JSON | JSON | Specify output format |

If you use a query string parameter that isn't supported, the API will ignore the invalid query string parameters and execute the ones it recognizes.

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

```
https://api.tradinghours.com/v3/markets/lookup?q=hong+kong
```

```
https://api.tradinghours.com/v3/markets/lookup?q=new+york
```

```
https://api.tradinghours.com/v3/markets/lookup?q=usd
```
