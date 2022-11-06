# Authentication

[[toc]]

## Overview

All API endpoints require an API token for authentication.
Licensees can visit their [account page to create an API token.](https://www.tradinghours.com/user/api-tokens)

You must have an active subscription to use the APIs.
For price details, please [request a quote](https://www.tradinghours.com/data).

## Details

You can authenticate using the `api_token` [Query String Parameter](#query-string-parameter) or by using a [Bearer Token](#bearer-token).
In examples throughout the API documentation we omit the `api_token` parameter for clarity, but it is required.

## Examples

**In the examples below, replace "YOUR_TOKEN_HERE" with your actual API token.**

Get your [API Token here.](https://www.tradinghours.com/user/api-tokens)

### Query String Parameter

Using a "query string parameter" is the easiest way to get started and allows you to test the API right in your web browser.
However, there is an increased risk of unintentionally exposing your API key when using this authentication method.
In production, we recommend you use a [Bearer Token](#bearer-token).

Learn more about [query string parameters](https://en.wikipedia.org/wiki/Query_string).

```
https://api.tradinghours.com/v3/markets/status?fin_id=us.nyse&api_token=YOUR_TOKEN_HERE
```

### Bearer Token

Using a "bearer token" is considered more secure as it reduces the chance of inadvertently revealing your API key to unauthorized parties.
We recommend using this method in your production environment.

:::: code-group
::: code-group-item Bash
```bash
curl https://api.tradinghours.com/v3/markets/status?fin_id=us.nyse \
    -H "Accept: application/json" \
    -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
:::
::: code-group-item PHP
```php
$curl = curl_init();

$headers = [
    'Content-type: application/json',
    'Authorization: Bearer YOUR_TOKEN_HERE'
];

curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.tradinghours.com/v3/markets/status?fin_id=us.nyse",
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_RETURNTRANSFER => true,
]);

$response = curl_exec($curl);

curl_close($curl);

print_r($response);
```
:::
::: code-group-item Python
```python
#!/usr/bin/env python3

import requests

url = "https://api.tradinghours.com/v3/markets/status?fin_id=us.nyse"

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_TOKEN_HERE"
}

response = requests.get(url, headers=headers)

print(response.json())
```
:::
::::
