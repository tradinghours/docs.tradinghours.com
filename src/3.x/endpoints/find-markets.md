# Find Markets

[[toc]]

## List All Markets

To start using the API, you first need to know the FinID for the market or markets you're interested in. To find this, you can use this List Markets endpoint to get the information programmatically. Alternatively, you can use the MIC and our system will select the closest matching FinID and return the appropriate information.

::: tip Tip
You can also browse our [data coverage](https://www.tradinghours.com/data/coverage) to see what markets are available.
:::

You can also use the [market details](./market-details.md) endpoint to get more information about a market. In the details, there is a `memo` field that describes in detail the securities that are covered by a FinID.

### MICs (Market Identification Codes)

We include segment MIC in the response to help you find the appropriate FinID. Typically, MICs alone are not granular enough to identify distinct trading schedules and calendars. That is why we created FinIDs - an identifier that uniquely identifies each distinct trading schedule. If you use MIC in place of the FinID, our system will select the closest match.

In order to find the correct FinID, look at `exchange`, `market`, and `product`.

::: tip We're here to help!
If you need help determining which FinID to use, <a href="https://www.tradinghours.com/contact">contact us</a>. We'll be happy to help.
:::

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| fin_id | String | The FinID for the market. |
| exchange | String | The exchange name of the market. |
| market | String | The name of the market. |
| products | String | Description of the products or securities group. |
| mic | String | The MIC for the market. |
| asset_type | String | Describes the asset type of the market. |
| group | String | Describes which market tier the market is included in. |
| permanently_closed | Date | If a market is permanently closed, this shows the date the market closed. |
| holidays_min_date | Date | Date of the earliest holiday available for the market. |
| holidays_max_date | Date | Date of the latest holiday available for the market. |

### Query String Parameters
Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| group | Core, Extended, All, Allowed | All | Specify which group of markets to show. "Allowed" will show all markets you are permitted to access. |
| include_permanently_closed | Yes, No | No | Whether or not to include permanently closed markets. |

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get All Markets
```
https://api.tradinghours.com/v3/markets?group=all
```

#### Get All Core Markets
```
https://api.tradinghours.com/v3/markets?group=core
```

#### Get Extended Markets
```
https://api.tradinghours.com/v3/markets?group=extended
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
            "group": "Extended",
            "permanently_closed": null,
            "holidays_min_date": "2016-01-01",
            "holidays_max_date": "2027-12-02"
        },
        {
            "fin_id": "AE.DFM",
            "exchange": "Dubai Financial Market",
            "market": "Dubai Financial Market (DFM)",
            "products": null,
            "mic": "XDFM",
            "asset_type": "Securities",
            "group": "Extended",
            "permanently_closed": null,
            "holidays_min_date": "2016-01-01",
            "holidays_max_date": "2027-12-02"
        },
        {
            "fin_id": "AE.NDXB",
            "exchange": "NASDAQ Dubai",
            "market": "NASDAQ Dubai (Equities)",
            "products": null,
            "mic": "DIFX",
            "asset_type": "Securities",
            "group": "Extended",
            "permanently_closed": null,
            "holidays_min_date": "2016-01-01",
            "holidays_max_date": "2027-12-02"
        },
        ...
    ],
}
```
