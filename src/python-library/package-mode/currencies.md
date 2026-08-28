# Working with Currencies
## Overview

The library provides access to currency settlement information for all major currencies. Currency settlement holidays indicate dates when the central bank for a given currency is not settling transactions.

::: tip Note
Currency data is available if included in your subscription. Some subscription tiers may not include currency data.
:::

## Listing Currencies

To see all available currencies:

```python
from tradinghours import Currency

for currency in Currency.list_all()[:3]:
    print(currency)
```

*Output:*
```
Currency: AUD Australian Dollar
Currency: BRL Brazilian Real
Currency: CAD Canadian Dollar
```

## Getting a Specific Currency

Retrieve currency information by its 3-letter currency code (ISO 4217):

```python
from tradinghours import Currency

currency = Currency.get('USD')
currency.pprint()
```

*Output:*
```python
{'currency_code': 'USD',
 'currency_name': 'US Dollar',
 'country_code': 'US',
 'central_bank': 'Federal Reserve Bank',
 'financial_capital': 'New York',
 'financial_capital_timezone': 'America/New_York',
 'weekend': 'Sat-Sun'}
```

## Currency Holidays

Get non-settlement dates for a specific currency:

```python
from tradinghours import Currency

currency = Currency.get('AUD')
for holiday in currency.list_holidays("2023-06-01", "2023-12-31")[:3]:
    print(holiday)
```

*Output:*
```
CurrencyHoliday: AUD 2023-06-12 King's Birthday
CurrencyHoliday: AUD 2023-10-02 Labor Day
CurrencyHoliday: AUD 2023-12-25 Christmas Day
```
