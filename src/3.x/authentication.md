# Authentication

[[toc]]

## Overview

All API endpoints require an API token. If you are a subscriber, visit your [account page to create an API token.](https://www.tradinghours.com/settings#/api)

**Please Note:** You must have an active subscription of [**Market Status API**](./introduction.md#market-status-api) or [**Enterprise API Access**](./introduction.md#enterprise-api) to use the APIs.

::: warning Notice
Our pricing is structured around what data you need. This results in different plans with different levels of access. Keep in mind, you may not have access to all endpoints or markets.
For details, please <a href="https://www.tradinghours.com/contact" target=_blank>contact us</a>.
:::

## Details

You can authenticate using the `api_token` [query string parameter](https://en.wikipedia.org/wiki/Query_string) or as a `Bearer` token in the `Authorization` header of the request.
In examples throughout the API documentation we omit the <code>api_token</code> parameter for clarity, but it is required.

## Example

```
https://api.tradinghours.com/v3/markets/status?fin_id=us.nyse,jp.jpx&api_token=YOUR_TOKEN_HERE
```

::: danger Important
For the APIs to return data, you need to replace "YOUR_TOKEN_HERE" with your API token. Get your [API Token here.](https://www.tradinghours.com/settings#/api)
:::
