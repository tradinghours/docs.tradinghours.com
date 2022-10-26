# Markets Details

[[toc]]

## Get Market Details

Use the market details endpoint to get key information about a market using the `FinID`. This API will help identify the exact market or trading venue and give more details, such as asset type, products, and more.

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| fin_id | String | The `FinID` for the market. |
| country_code | ISO 3166 | Two-letter country code. |
| exchange | String | The exchange name of the market. |
| market | String | The name of the market. |
| products | String | Description of the products or securities group. |
| mic | String | The `MIC` for the market. |
| mic_extended | String | The extended `MIC` for the market. |
| acronym | String | The acronym for the market. |
| asset_type | String | Describes the asset type of the market. |
| memo | String | A description or additional details about the trading venue. |
| timezone | String | Gives the timezone the market utilizes in Olson timezone identifier format. |

### Query String Parameters
Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| fin_id | Valid FinID(s) | N/A | Specify which market(s) to show data for. |
| format | CSV, JSON | JSON | Specify output format |

If you use a query string parameter that isn't supported, the API will ignore the invalid query string parameters and execute the ones it recognizes.

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.


#### Get Market Details for `FinID`

```
https://api.tradinghours.com/v3/markets/details?fin_id=us.nyse
```

#### Get Market Details for Bulk `FinID`s

```
https://api.tradinghours.com/v3/markets/details?fin_id=us.nyse,jp.jpx
```

#### Get Market Details in CSV Format

```
https://api.tradinghours.com/v3/markets/details?fin_id=us.nyse,jp.jpx&format=csv
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
      "timezone": "Asia\/Tokyo"
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
      "timezone": "America\/New_York"
    }
  ]
}
```
