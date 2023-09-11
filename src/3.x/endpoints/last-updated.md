# Last Updated

[[toc]]

## Last Updated

Our research team continually monitors all covered markets for changes to their trading hours and holidays.
As soon a market publishes new holidays or makes a schedule change we verify and update our data.
We then make it available through the API immediately.

It is often useful to know when the data was last updated, especially if you use the [Bulk Data Download](../enterprise/download.md).

::: tip Note
Data is frequently updated multiple times per day. However, all responses from this endpoint are **cached for 15 minutes** so there is no need to query the API more frequently than that.
:::

### Examples Request
Remember to use your [authentication token](../authentication.md) for all requests.

```
https://api.tradinghours.com/v3/last-updated
```

### Example Response

``` json
{
    "last_updated" : "2023-09-06T13:05:46+00:00"
}
```
