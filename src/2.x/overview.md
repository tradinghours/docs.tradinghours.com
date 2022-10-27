# Overview

::: warning
You are viewing the documentation for an old version of the TradingHours.com API. Conciser using [version 3.x](/3.x/).
:::

[[toc]]

## Introduction

TradingHours.com is the most trusted source on the web for financial date-related information.
This API allows clients to integrate our high-quality data into their own application.


[Learn more about API access and contact sales &raquo;](https://www.tradinghours.com/data)

## Authentication

All API endpoints require a valid API token.
If you are a subscriber, visit your account page to [create an API token](https://www.tradinghours.com/user/api-tokens).

All requests must include your API token in a parameters called `api_token`.
In the examples below we omit the `api_token` parameter for clarity but it is required.
API token is passed using a <a href="https://en.wikipedia.org/wiki/Query_string" target=_blank>query string</a>.


### Example

```
https://www.tradinghours.com/api/v2/status?exchange=nyse&api_token=YOUR_TOKEN_HERE
```

::: tip Note
Replace `YOUR_TOKEN_HERE` with your API token. [Create API Token &raquo;](https://www.tradinghours.com/user/api-tokens)
:::
