# Change Log

## December 10, 2024

- Add `holidays_min_date` and `holidays_max_date` to the [Find Markets](/3.x/endpoints/find-markets) and [Market Details](/3.x/endpoints/market-details) endpoints.
- Add `include_permanently_closed` query parameter to the [Find Markets](/3.x/endpoints/find-markets) endpoint.

## June 20, 2024

- Add `Closing Price` field to the [Phase Types](/3.x/enterprise/download.html#phase-types) table of [Bulk Download](/3.x/enterprise/download) API.

## June 6, 2024

- Remove redundant `time`, `utc_time`, and `local-time` fields from the [Market Status API](/3.x/endpoints/market-status) and add `timezone` field.

## November 2, 2023

- Add [Season Definitions](/3.x/enterprise/download.html#season-definitions) table to the [Bulk Download](/3.x/enterprise/download) API.

## September 21, 2023

- Add [Phases](/3.x/enterprise/download.html#phases) table to the [Bulk Download](/3.x/enterprise/download) API.

## September 6, 2023

- Added [Last Updated](/3.x/endpoints/last-updated) API endpoint which allows clients to see when the data was last updated.

## August 31, 2023

- If [Bulk Download](/3.x/enterprise/download) has not generated your data export yet when a request is received, the API will now respond with a [202](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202) HTTP Status Code, rather than 200.

## May 22, 2023

- `Replaced By` column added to the `Markets` sheet in the [Bulk Download](/3.x/enterprise/download) API.

## May 15, 2023

- `Status` column added to the `Holidays` sheet in the [Bulk Download](/3.x/enterprise/download) API. This makes it easier to determine if a market is open on a given date without lookup up the corresponding schedule.

## March 30, 2023

- Deprecate the `format` parameter from all APIs. This field is still available with no planned removal date. All APIs still default to returning data in JSON format with the option of passing `format=csv` for CSV format. The [Bulk Download](/enterprise/download) is unchanged and still returns data in both CSV and Excel formats.

## November 8, 2022

- `permanently_closed` field added to [Market Details](/3.x/endpoints/market-details) API
- `Permanently Closed` column added `Markets` sheet in the [Bulk Download](/3.x/enterprise/download) API.
- `weekend_definition` field added to [Market Details](/3.x/endpoints/market-details) API
- `Weekend Definition` column added `Markets` sheet in the [Bulk Download](/3.x/enterprise/download) API.
