# Market Details

[[toc]]

## Get Market Details

Use the market details endpoint to get key information about a market using a FinID. This API will help identify the exact market or trading venue and give more details, such as asset type and product or security.

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| fin_id | String | The FinID for the market. |
| country_code | ISO 3166 | Two-letter country code. |
| exchange | String | The exchange name of the market. |
| market | String | The name of the market. |
| products | String | Description of the products or securities group. |
| mic | String | The MIC for the market. |
| mic_extended | String | The extended MIC for the market. |
| acronym | String | The acronym for the market. |
| asset_type | String | Describes the asset type of the market. |
| memo | String | A description or additional details about the trading venue. |
| permanently_closed | Date | Optional. If a market is permanently closed, this shows the date the market closed. |
| timezone | String | Gives the timezone the market utilizes in Olson timezone identifier format. |
| weekend_definition | String | Indicates the days of the week when the market is normally closed. "Sat-Sun" for most markets. |
| holidays_min_date | Date | Date of the earliest holiday available for the market. |
| holidays_max_date | Date | Date of the latest holiday available for the market. |

### Query String Parameters
Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| fin_id | Valid FinID(s) | N/A | Specify which market(s) to show data for. |

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.


#### Get Market Details for FinID

```
https://api.tradinghours.com/v3/markets/details?fin_id=us.nyse
```

#### Get Market Details in Bulk

```
https://api.tradinghours.com/v3/markets/details?fin_id=us.nyse,jp.jpx
```

### Sample JSON Response

```json
{
  "data": [
    {
      "fin_id": "JP.JPX",
      "country_code": "JP",
      "exchange": "Japan Exchange Group",
      "market": "Tokyo Stock Exchange",
      "products": null,
      "mic": "XJPX",
      "mic_extended": "XJPX",
      "acronym": "JPX",
      "asset_type": null,
      "memo": "All listed equities. Includes MIC XJAS",
      "timezone": "Asia\/Tokyo",
      "weekend_definition": "Sat-Sun",
      "holidays_min_date": "2000-01-03",
      "holidays_max_date": "2033-12-26"
    },
    {
      "fin_id": "US.NYSE",
      "country_code": "US",
      "exchange": "New York Stock Exchange",
      "market": "Canonical",
      "products": null,
      "mic": "XNYS",
      "mic_extended": "XNYS",
      "acronym": "NYSE",
      "asset_type": null,
      "memo": "Canonical",
      "timezone": "America\/New_York",
      "weekend_definition": "Sat-Sun",
      "weekend_definition": "Sat-Sun",
      "holidays_min_date": "2000-01-17",
      "holidays_max_date": "2033-11-25"
    }
  ]
}
```
