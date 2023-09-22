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
https://api.tradinghours.com/v3/download
```

### How often does data update?

When you first send a request to the `download` endpoint you will get a JSON response saying "Generating download. Check back in a few minutes."
The HTTP status code will be [202: Accepted](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202).
In the background, our system starts generating the ZIP file with all data that you have access to.
This usually takes 1-2 minutes.

On subsequent requests after the ZIP has been generated, the download will begin.

Whenever we update the database, the ZIP file on our server will be deleted.
On the next request, our system will begin regenerating your ZIP file.
This ensures you always receive the latest data.

Use the [Last Updated API endpoint](../endpoints/last-updated.html) to check the data was last updated.

Please <u>do not</u> poll the Bulk Download endpoint to check for updates. Poll the Last Updated endpoint instead.

## Terminology and

## Data Dictionary

This section explains each of the tables and rows in the bulk download.

:::warning Notice - Breaking Changes
Additional fields may be added at anytime without prior notice.
If a field is removed or renamed, we will release a new version of the API to prevent breaking your integration.
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
| Phase Type | Normalized name of the trading phase. See [phases](#phases) table. |
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
| Season Start | Some exchanges have different hours for e.g. winter vs summer. Season fields describe when the phase is active. |
| Season End | Some exchanges have different hours for e.g. winter vs summer. Season fields describe when the phase is active. |

### Phases

This table contains a list of possible phase types. Phases include Primary Trading Session, Pre-Trading Session, Post-Trading Session, etc.

In the case of over-night trading sessions, the `status` and `settlement` columns apply to the date the phase <u>ends</u>.
For example, if a Primary Trading Session opens Sunday night and ends Monday, then Monday would be considered open but Sunday would be closed.

| Field | Description |
| ------------- | --------- |
| Name | Name of the phase |
| Status | Specifies whether this phase indicates that a market is considered "open" during this phase. |
| Settlement | Specifies whether this phase indicates that there is trade settlement on the given date. |


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
