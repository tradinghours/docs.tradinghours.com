# API Details

[[toc]]

## Identifying Markets

We use a proprietary code to identify all markets and trading venues in our system. This code is called a Financial Identifier, or `FinID`.

To obtain a list of all `FinId`, use the [list markets](./endpoints/find-markets.md#list-all-markets) endpoint to enumerate all markets you have access to as part of your subscription. You can then use the [market details](./endpoints/market-details.md) endpoint to see specifics about which securities are included in each `FinID`.

The `FinID` is more specific than the standard Market Identifier Code, or `MIC`. However, you can use the `MIC` in place of the `FinID`. If you use `MIC`, the API will return results for the best matching `FinID`. If you need help mapping specific securities or MICs to FinIDs, <a href="https://www.tradinghours.com/contact" target=_blank>our team is available to help</a>.

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

::: warning Notice
Our system does have [rate limit restrictions](#rate-limits). Specify multiple `FinID`s or `MIC`s in a single request to avoid exceeding restrictions.
:::


## Formats

Our API supports JSON format and CSV format for most requests. By default, if left unspecified, the response format is JSON.

To get a response in CSV format, use the query string parameter `format` to specify the output format.

```
https://api.tradinghours.com/v3/markets?format=csv
```
Not all endpoints will support returning the data in CSV format. Please see the documentation on individual endpoints for details on which formats are supported.

## Rate Limits

Our API has rate limits to ensure system resources are available for all customers.
If you exceed the rate limit, you will receive an error message `419: Too many requests`.

The rate limit is **not** intended to restrict access.
Rate limits can be increased in some cases for Enterprise customers.

::: tip Tip
You can always check the `X-RateLimit-Limit` and `X-RateLimit-Remaining` response headers to see how many requests you have left.
:::

There are several ways to avoid exceeding the rate limit.

### Caching

Response caching should be used to avoid sending the same API call within short period of time.
It is particularly important to [cache the response from the Market Status API](./endpoints/market-status.md#caching).

### Delays Between Requests

By adding a small 1 second delay between requests you can avoid exceeding the rate limit in most cases.

### Bulk Requests

To avoid exceeding the rate limit, use bulk API requests whenever possible.
To send bulk API requests, specify multiple `FinID`s in a single request.

```
https://api.tradinghours.com/v3/markets/status?fin_id=us.nyse,jp.jpx,gb.lse
```

Enterprise customers can download all data at once using the [Data Download API endpoint](./enterprise/download.md).

## CORS Policy

The TradingHours.com API does not support Cross Origin Request Sharing (CORS).
This means you cannot send a request to our API from the front-end Javascript of a website.
We do not allow this because it would reveal your API key to everyone using your website.

If you see an error saying your request "has been blocked by CORS policy" or there is "no 'Access-Control-Allow-Origin' header is present" then this is the problem.

Instead of sending the request from your websites Javascript, you should send the API request from your back-end server.

Learn more about <a href="https://en.wikipedia.org/wiki/Cross-origin_resource_sharing" target=_blank>Cross Origin Request Sharing</a>.