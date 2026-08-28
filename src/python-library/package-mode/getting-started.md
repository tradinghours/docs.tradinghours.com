# Getting Started in *Package Mode*


## Installation and Setup

Install the package and set your API token:

```bash
pip install tradinghours
export TRADINGHOURS_TOKEN=<your-token-here>
```
Run the following command to download and import official data:
```console
$ tradinghours import
Downloading..... (0.824s)
Ingesting.......................... (12.066s)
```

The import process:
1. **Downloads** the latest data from TradingHours.com servers
2. **Ingests** the data into your local database (SQLite by default)
3. Typically completes in **10-15 seconds**

## Checking Data Status

You can check the current status of your local data with:

```bash
tradinghours status
```
Optionally, you can get extended status information:

```console
$ tradinghours status --extended
Collecting timestamps.... (0.213s)
TradingHours Data Status:
  Remote Timestamp:   Thu Oct 26 02:08:17 2023
  Local Timestamp:    Thu Oct 26 03:12:40 2023

Reading local data.... (0.426s)
Extended Information:
  Currencies count:   30
  Markets count:      1012
```

This shows:
- **Remote Timestamp**: When the data was last updated on TradingHours.com servers
- **Local Timestamp**: When you last imported the data
- **Currencies count**: Number of currencies in your local database
- **Markets count**: Number of markets in your local database

## Updating Data

To get the latest data, simply run the import command again, which will check if the data is up to date and update it if needed:

```bash
tradinghours import
```

::: tip Data Updates
Data on TradingHours.com is updated daily. We recommend running `tradinghours import` regularly (e.g., daily or weekly) to ensure you have the most current information.
:::
