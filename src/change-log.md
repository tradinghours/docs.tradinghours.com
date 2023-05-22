# Change Log

## May 22, 2023

- `Replaced By` column added `Markets` sheet in the [Bulk Download](/enterprise/download) API.

## May 15, 2023

- `Status` column added to the `Holidays` sheet in the [Bulk Download](/enterprise/download) API. This makes it easier to determine if a market is open on a given date without lookup up the corresponding schedule.

## March 30, 2023

- Deprecate the `format` parameter from all APIs. This field is still available with no planned removal date. All APIs still default to returning data in JSON format with the option of passing `format=csv` for CSV format. The [Bulk Download](/enterprise/download) is unchanged and still returns data in both CSV and Excel formats.

## November 8, 2022

- `permanently_closed` field added to [Market Details](/endpoints/market-details) API
- `Permanently Closed` column added `Markets` sheet in the [Bulk Download](/enterprise/download) API.
- `weekend_definition` field added to [Market Details](/endpoints/market-details) API
- `Weekend Definition` column added `Markets` sheet in the [Bulk Download](/enterprise/download) API.
