# Regional & Religious Holidays

[[toc]]

## Regional & Religious Holidays Endpoint

Market holidays often differ from public holidays. For example, most US markets close for Good Friday, but Good Friday is not officially a public holiday. In other cases, markets may be open despite public or religious holidays.

Regional and religious holidays can impact trading activity; namely, trading volume may be lower during a holiday even when markets are officially open.

For these reasons, TradingHours.com provides regional and religious holidays in addition to market holidays.

## List Calendars

To get the information on regional and religious holidays, you'll first need to enumerate the calendars available. There are calendars specifically for countries and major religions.

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| id | String | The identifier used for a specific calendar. For countries we use the 2-letter country code. |
| name | String | Full name of the country or religion. |
| type | String | Either "regional" or "religious." |

### Example
Remember to use your [authentication token](../authentication.md) for all requests.

#### List All Calendars
```
https://api.tradinghours.com/v3/calendars
```

### Sample JSON Response
``` json
{
    "data": {
        "AF": {
            "id": "AF",
            "name": "Afghanistan",
            "type": "regional"
        },
        "AL": {
            "id": "AL",
            "name": "Albania",
            "type": "regional"
        },
        ...
        "ZW": {
            "id": "ZW",
            "name": "Zimbabwe",
            "type": "regional"
        },
        "Christian": {
            "id": "Christian",
            "name": "Christian",
            "type": "religious"
        },
        "Jewish": {
            "id": "Jewish",
            "name": "Jewish",
            "type": "religious"
        },
        ...
    }
}

```

## Get Holidays

Once you find the calendar you are looking for, you can lookup the events on that calendar within a specific date range.

### Schema
| Field | Format | Description |
| ------------- | ------------- | --------- |
| calendar | String | Calendar identifier. |
| country | String | Full name of the country, if applicable. |
| date | Date | Shows the date of the holiday. |
| name | String | Name of the holiday. |
| type | String | Either `Public`, `Religious`, or `Other`. `Other` is used for unofficial holidays. |
| memo | String | Additional information if required. |


### Query String Parameters
Supported query string parameters are listed in the table below:

| Parameter | Supported Values | Default | Description |
| ------------- | ------------- | --------- | --------- |
| calendar | Valid Calendar ID | N/A | Specify which calendar to show data for. |
| start | yyyy-mm-dd | Current date | Show holidays starting at this date |
| end | yyyy-mm-dd | One year from current date | Show holidays until this date. |

### Examples
Remember to use your [authentication token](../authentication.md) for all requests.

#### Get Holidays
```
https://api.tradinghours.com/v3/calendars/holidays?calendar=US
```

#### Get Holidays in a Date Range
```
https://api.tradinghours.com/v3/calendars/holidays?calendars=US&start=2022-11-01&end=2022-11-30
```

### Sample JSON Response

```json
{
	"data": [
		{
			"calendar": "US",
			"country": "United States",
			"date": "2021-09-06",
			"name": "Labor Day",
			"type": "Public",
			"memo": null
		},
		{
			"calendar": "US",
			"country": "United States",
			"date": "2021-09-15",
			"name": "First Day of Hispanic Heritage Month",
			"type": "Other",
			"memo": null
		},
		{
			"calendar": "US",
			"country": "United States",
			"date": "2021-10-11",
			"name": "Columbus Day",
			"type": "Public",
			"memo": null
		},
		{
			"calendar": "US",
			"country": "United States",
			"date": "2021-10-11",
			"name": "Indigenous Peoples' Day",
			"type": "Other",
			"memo": null
		},
		{
			"calendar": "US",
			"country": "United States",
			"date": "2021-10-31",
			"name": "Halloween",
			"type": "Other",
			"memo": null
		},
		{
			"calendar": "US",
			"country": "United States",
			"date": "2021-11-02",
			"name": "Election Day",
			"type": "Other",
			"memo": null
		},
		{
			"calendar": "US",
			"country": "United States",
			"date": "2021-11-07",
			"name": "Daylight Saving Time ends",
			"type": "Other",
			"memo": null
		},
		{
			"calendar": "US",
			"country": "United States",
			"date": "2021-11-11",
			"name": "Veterans Day",
			"type": "Public",
			"memo": null
		},
		{
			"calendar": "US",
			"country": "United States",
			"date": "2021-11-25",
			"name": "Thanksgiving Day",
			"type": "Public",
			"memo": null
		},
		...
	],
	"meta": {
		"start": "2021-08-09",
		"end": "2022-08-09"
	}
}
```
