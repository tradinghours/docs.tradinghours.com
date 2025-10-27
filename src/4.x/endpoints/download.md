# Data Downloads

[[toc]]

## Overview

This API allows you to access flat files containing all data available through the API, allowing you to use the data in your own applications.

The data is downloaded as a zip file containing all data in XLSX and CSV format.

::: tip Sample Data
Prospective customers can contact us to [request sample data](https://www.tradinghours.com/data).
:::


### Example Request
Remember to use your [authentication token](../authentication.md) for all requests.

```
https://api.tradinghours.com/v4/download
```

### How It Works

Your data file is automatically generated and kept up-to-date whenever the database is updated. When you make a request to the download endpoint, you will receive a redirect to a presigned S3 URL where you can download the ZIP file.

### Checking for Updates

The download endpoint supports efficient cache checking using ETags. This allows you to check if new data is available without downloading the entire file.

**Recommended: Using If-None-Match with GET requests**

The most efficient approach is to include the `If-None-Match` header with your ETag from the previous download in your GET request:

```bash
curl -L -H "Authorization: Bearer YOUR_TOKEN" \
  -H "If-None-Match: \"abc123...\"" \
  https://api.tradinghours.com/v4/download
```

This provides two benefits in a single request:
- If the file **hasn't changed**: You'll receive a `304 Not Modified` response, saving bandwidth and time
- If the file **has changed**: You'll be immediately redirected to the presigned S3 URL to download the updated file

**Alternative: Using HEAD requests**

If you only want to check metadata without triggering a download, you can use a HEAD request:

```bash
curl -I -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.tradinghours.com/v4/download
```

The response will include:
- `Content-Type`: application/zip
- `Content-Length`: Size of the file in bytes
- `ETag`: A unique identifier for the current version of the file
- `Last-Modified`: When the file was last updated

You can also include `If-None-Match` with HEAD requests to get a `304 Not Modified` response if nothing has changed.


## Data Dictionary

This section explains each of the tables and rows in the bulk download.

:::warning Notice - Breaking Changes
Additional fields may be added at anytime without prior notice.
If a field is removed or renamed, we will release a new version of the API to prevent breaking your integration.
:::

:::tip Having Trouble?
Having trouble working with the data in flat file format?
Check out our [python library](/python-library/). The library runs on top of the bulk download files and simplifies the task of interpreting the data.
:::

### Markets

| Field | Description |
| ------------- | --------- |
| Exchange Name | Name of the financial center |
| Market Name | Name of market within the exchange |
| Security Group | Group of securities with the same trading schedule |
| Timezone | Timezone of this trading venue (Olson timezone format) |
| Weekend Definition | Indicates the days of the week when the market regularly closed. "Sat-Sun" for most markets. |
| FinID | Proprietary code used to uniquely identify trading venues with distinct trading schedules. |
| MIC | Market Identification Code (ISO10383) |
| Acronym | Common acronym for the exchange |
| Asset Type | Description of types of assets traded on this market |
| Memo | Further description of this market, if required |
| Permanently Closed | Date when the market stopped operations. If empty, the market is not permanently closed. (YYYY-MM-DD) |
| Replaced By | If a market is permanently closed this field may contain the FinID of another market that replaced it. |

### Holidays

| Field | Description |
| ------------- | --------- |
| FinID | Market identifier |
| Date | Holiday date (YYYY-MM-DD) |
| Holiday Name | Normalized holiday name. Holiday names are normalized to make it easier to track holidays year-to-year. For example, instead of saying markets are closed for "Christmas Eve", it will just be "Christmas." |
| Schedule | Indicates if the market is closed or has an irregular trading schedule. If this field is anything other than "Closed" the schedule and FinID can be looked up in the Schedules table for details. |
| Settlement | Indicates if there is trade settlement on this date. |
| Observed | Indicates if a holiday officially falls on another date but the market is closed in observance. |
| Memo | Further description of this market, if required |
| Status | Indicates if the market is open or closed on the given date. |

### Schedules

Each row in the schedules table represents a single phase of the trading day.

| Field | Description |
| ------------- | --------- |
| FinID | Market identifier |
| Schedule Group | Identifier used to group phases together. If there is no holiday then the “Regular” phase applies. |
| Schedule Group Memo | Further description of this market, if required |
| Timezone | Timezone of this trading venue (Olson timezone format) |
| Phase Type | Normalized name of the trading phase. See [phase types](#phase-types) table. |
| Phase Name | Free-form name of the phase. This is the name the exchange uses to describe the phase. |
| Phase Memo | Further description of this market, if required |
| Days | Days this schedule applies. E.g. Mon-Fri |
| Start | Time the phase starts |
| End | Time the phase ends |
| Offset Days | Indicates if the end time is on a different day |
| Duration | Duration of the phase in seconds |
| Min Start | Indicates random start/stop times |
| Max Start | Indicates random start/stop times |
| Min End | Indicates random start/stop times |
| Max End | Indicates random start/stop times |
| In Force Start Date | Indicates when a phase goes into effect or is retired |
| In Force End Date | Indicates when a phase goes into effect or is retired |
| Season Start | Some exchanges have different hours for e.g. winter vs summer. Season fields describe when the phase is active. See [Season Definitions](#season-definitions) |
| Season End | Some exchanges have different hours for e.g. winter vs summer. Season fields describe when the phase is active. See [Season Definitions](#season-definitions) |

### Phase Types

This table contains a list of possible phase types. Phases include Primary Trading Session, Pre-Trading Session, Post-Trading Session, etc.

In the case of over-night trading sessions, the `status` and `settlement` columns <u>apply to the date the phase ends</u>.
For example, if a Primary Trading Session opens Sunday night and ends Monday, then Monday would be considered open but Sunday would be closed.

| Field | Description |
| ------------- | --------- |
| Name | Name of the phase |
| Status | Specifies whether this phase indicates that a market is considered "open" during this phase. |
| Settlement | Specifies whether this phase indicates that there is trade settlement on the given date. |
| Closing Price | Specifies whether this phase indicates that there is a closing price published at the end of the phase. |


### MIC Mapping

The MIC Mapping table allows you to lookup the corresponding FinID for covered MICs. Note that MICs are insufficient to uniquely identify all distinct trading schedules. As a result, there can be ambiguity when mapping between MICs and FinIDs. A manual review of the securities covered by each FinID is needed to definitively determine the appropriate FinID.

| Field | Description |
| ------------- | --------- |
| MIC | ISO 10383 MIC Code |
| FinID | Market identifier |

You can download the full list of MIC Codes (with Operating and Segment MICs) from the ISO website: https://www.iso20022.org/market-identifier-codes

### Regional & Religious Holidays

| Field | Description |
| ------------- | --------- |
| Calendar | The ID for the calendar. This is the 2-letter country code for regional calendars and the name of the religion for religious holidays. |
| Country | Full name of the country, if applicable |
| Date | Holiday date (YYYY-MM-DD) |
| Name | Name of the holiday |
| Type | Type of holiday. Options include `public`, `other`, and `religious`. |
| Memo | Additional information, if needed |

### Currencies

| Field | Description |
| ------------- | --------- |
| Currency Code | 3-letter currency code. |
| Currency Name | English name for the currency. |
| Country Code | 2-letter country code. ("Eurozone" for EUR) |
| Central Bank | Name of the currency's central bank. |
| Financial Capital | City where the central bank is located. |
| Financial Capital Timezone | Timezone Olson timezone identifier format. |
| Weekend Definition | Weekend definition. Most markets are "Sat-Sun." |

### Currency Holidays

| Field | Description |
| ------------- | --------- |
| Currency Code | 3-letter currency code. |
| Date | Holiday date (YYYY-MM-DD) |
| Holiday Name | Holiday name |
| Settlement | Indicates if there is currency settlement on this date. |
| Observed | Indicates if a holiday officially falls on another date but settlement is closed in observance. |
| Memo | Additional information, if needed |

### Season Definitions

Some schedules change throughout the year. For example, some countries in South America change their schedules in the Summer months to align with US markets during US Daylight Saving Time.

The "Season Start" and "Season End" fields in the [Schedules](#schedules) table are _relative dates_. For example, a season might be "Second Sunday of March". The Season Definitions table will let you look up that date for each year.

| Field | Description |
| ------------- | --------- |
| Season | Relative date string |
| Year | YYYY |
| Date | YYYY-MM-DD |