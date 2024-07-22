# API Details

[[toc]]

## Identifying Markets

We use a proprietary code to identify all markets and trading venues in our system. This code is called a Financial Identifier, or "FinID".

To obtain a list of all FinIDs, use the [list markets](./endpoints/find-markets.md#list-all-markets) endpoint to enumerate all markets you have access to as part of your subscription. You can then use the [market details](./endpoints/market-details.md) endpoint to see specifics about which securities are included in each FinID.

The FinID is more specific than the standard Market Identifier Code, or MIC. However, you can use the MIC in place of the FinID. If you use MIC, the API will return results for the best matching FinID. If you need help mapping specific securities or MICs to FinIDs, <a href="https://www.tradinghours.com/contact" target=_blank>our team is available to help</a>.

Use the query string parameter `fin_id` to specify a market or markets. Some endpoints support multiple FinIDs in a single request.
To specify multiple FinIDs, separate them with commas.
Whenever possible, we recommend making [bulk requests](#bulk-requests) with multiple FinIDs to avoid exceeding [rate limit restrictions](#rate-limits).

### Examples
Remember to use your [authentication token](./authentication.md) for all requests.

```
https://api.tradinghours.com/v3/markets/details?fin_id=us.nyse
```

```
https://api.tradinghours.com/v3/markets/status?fin_id=us.nyse,jp.jpx
```

## Rate Limits

The API has rate limits to ensure system resources are available to all customers and to prevent excessive API usage.
If you exceed the rate limit, you will receive an error message `419: Too many requests`.

The rate limit is **not** intended to restrict access.
Rate limits can be increased for Enterprise licensees. [Contact support](https://www.tradinghours.com/contact) to increase your rate limit.

::: tip Tip
You can always check the `X-RateLimit-Limit` and `X-RateLimit-Remaining` response headers to see how many requests you have left.
:::

There are several techniques to avoid exceeding the rate limit listed below:

- **Caching:**
	- Response caching should be used to avoid sending the same API call multiple times within a short period of time. It is particularly important to [cache the response from the Market Status API](./endpoints/market-status.md#caching).

- **Delays Between Requests:**
	- By adding a small 1 second delay between requests you can avoid exceeding the rate limit in most cases.

- **Data Download:**
	- Enterprise customers can download all data at once using the [Data Download API endpoint](./enterprise/download.md).

- **Bulk Requests:**
	- Use bulk API requests whenever possible. To send bulk API requests, specify multiple FinIDs in a single request. See the example below:

```
https://api.tradinghours.com/v3/markets/status?fin_id=us.nyse,jp.jpx,gb.lse
```

## Status Codes

Below is a list detailing HTTP Status Codes that may be returned from our API.

- **200 - Ok**
	- Request was successful.

- **202 - Accepted**
	- Used when attempting to download the data in bulk, but the bulk download file has not been generated yet. [More details »](./enterprise/download.md#how-often-does-data-update)

- **304 - Not Modified**
	- Used when the request includes appropriate `If-None-Match` or `If-Modified-Since` headers, and the cached version of the API response on the client's side remains unchanged.

- **401 - Unauthorized**
	- Unable to authenticate the API request. Most likely an API key was not provided. [Details »](./authentication.md)

- **403 - Forbidden**
	- Your API request was authenticated properly; however, you do not have access to the requested resource.

- **422 - Unprocessable Entity**
	- Something about your request was malformed. For example, you may be missing a required parameter. More details will be provided in the error message.

- **500 - Internal Server Error**
	- Indicates there was a critical error. [Contact us immediately](https://www.tradinghours.com/contact).

- **503 - Service Unavailable**
	- Indicates the API is down for maintenance. Rarely used. Scheduled downtime will be announced well in advance.

## CORS Policy

The TradingHours.com API does not support Cross-Origin Resource Sharing (CORS).
This means you cannot send a request to our API from the front-end JavaScript of a website.
We do not allow this because it would expose your API key to everyone using your website.

If you see an error stating your request "has been blocked by CORS policy" or that there is "no 'Access-Control-Allow-Origin' header present," this is the problem.

Instead of sending the request from your website's JavaScript, you should send the API request from your back-end server.

Learn more about <a href="https://en.wikipedia.org/wiki/Cross-origin_resource_sharing" target=_blank>Cross-Origin Resource Sharing</a>.

## Start and End Time Conventions

Throughout the API, all `start` times are _inclusive_, and all `end` times are _exclusive_. For example, a market open from `09:30:00` to `16:00:00` closes an instant before `16:00:00`.

Midnight (`00:00:00`) is considered the start of the next day. A trading phase that goes from 6pm to midnight might appear in our API like this:

```json
...
"start": "2024-01-01T18:00:00+00:00",
"end": "2024-01-02T00:00:00+00:00"
...
```

Notice that the `end` time is the next day. However, trading ends a moment before the next day begins.

This means if you [query the API](./enterprise/trading-hours.md#single-day-trading-hours-api) for all trading phases occurring on January 2, the phase beginning on January 1 and ending at `00:00:00` on January 2 will **not** appear.

::: tip Note
Although it may seem unusual for a trading phase to end at midnight, this can occur in markets that cater to investors in different time zones around the world.
:::
