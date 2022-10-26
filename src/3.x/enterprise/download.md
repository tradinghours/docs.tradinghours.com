# Data Downloads

[[toc]]

## Flat Files

This API allows you to access flat files containing all data available through the API, allowing you to use the data in your own applications.

The data is downloaded as a zip file containing all data in XLSX and CSV format.

::: tip Sample Data
Prospective customers can contact us to, [request sample data](https://www.tradinghours.com/data).
:::


### Example Request
Remember to use your [authentication token](../authentication.md) for all requests.

```
https://api.tradinghours.com/v3/download
```

### Data Dictionary

Need help deciphering fields? You can access the [data dictionary](https://www.tradinghours.com/Data%20Dictionary.pdf) to learn more about the fields included and what they mean.

### How often does data update?

When you first send a request to the `download` endpoint you will get a response saying "Generating download. Check back in a few minutes."
In the background, our system starts generating the ZIP file with all data that you have access to.
This usually takes 1-2 minutes.

On subsequent requests after the ZIP has been generated, the download will begin.

Whenever we update the database, the ZIP file on our server will be deleted.
On the next request, our system will begin regenerate your ZIP file.
This ensures you always receive the latest data.

Our research team updates the database almost everyday.
Frequently the data is updated multiple times per day.

We recommend that you re-request data once or twice per day to ensure you always have the latest data.

