# Working with Markets
## Viewing Available Markets

To see all markets available in your local database:

```python
from tradinghours import Market

for market in Market.list_all()[:3]:
    print(market)
```

*Output:*
```
Market: AE.ADX Abu Dhabi Securities Exchange Asia/Dubai
Market: AE.DFM Dubai Financial Market Asia/Dubai
Market: AE.DGCX Dubai Gold & Commodities Exchange Asia/Dubai
```

### Filtering Markets

You can filter markets using wildcards (`*`) based on their `fin_id`:

```python
from tradinghours import Market

# Get all US markets
for market in Market.list_all("US.*")[:3]:
    print(market)
```

*Output:*
```
Market: US.BTEC.ACTIVES.ASIA BrokerTec America/New_York
Market: US.BTEC.ACTIVES.LDN BrokerTec America/New_York
Market: US.BTEC.ACTIVES.US BrokerTec America/New_York
```

## Getting a Specific Market

You can retrieve a market by either **FinID** or **MIC** (Market Identifier Code):

```python
from tradinghours import Market

# Get by FinID
market = Market.get('US.NYSE')

# Or get by MIC
market = Market.get('XNYS')
```

### Viewing Market Details

Use the `pprint()` method to see all available attributes:

```python
market.pprint()
```

*Output:*
```python
{'exchange_name': 'New York Stock Exchange',
 'market_name': 'Canonical',
 'security_group': None,
 'timezone': 'America/New_York',
 'weekend_definition': 'Sat-Sun',
 'fin_id': 'US.NYSE',
 'mic': 'XNYS',
 'acronym': 'NYSE',
 'asset_type': 'Securities',
 'memo': 'Canonical',
 'permanently_closed': None,
 'replaced_by': None,
 'country_code': 'US',
 'first_available_date': '2000-01-01',
 'last_available_date': '2033-12-31'}
```

### Permanently Closed Markets

If a market is permanently closed, it may have been replaced by another market. By default, `Market.get()` returns the replacement market automatically:

```python
from tradinghours import Market

# AR.BCBA is permanently closed and replaced by AR.BYMA
market = Market.get('AR.BCBA')
print(f'{market.fin_id} replaced by {market.replaced_by} on {market.permanently_closed}')
# Output: AR.BYMA replaced by None on None

# Get the original permanently closed market
original = Market.get('AR.BCBA', follow=False)
print(f'{original.fin_id} replaced by {original.replaced_by} on {original.permanently_closed}')
# Output: AR.BCBA replaced by AR.BYMA on 2017-04-17
```

## Market Status

The `Market.status()` method returns the current status of a market at a specific datetime.

### Current Status

```python
from tradinghours import Market

market = Market.get("US.NYSE")
status = market.status()

status.pprint()
```

**Example Output:**
```python
{'status': 'Open',
 'reason': 'Primary Trading Session',
 'until': '2024-09-30 16:00:00-04:00',
 'next_bell': '2024-09-30 16:00:00-04:00',
 'phase': <Phase object>,
 'market': 'Market: US.NYSE New York Stock Exchange America/New_York'}
```

### Historical Status

To check the status at a specific time, provide a timezone-aware datetime:

```python
from tradinghours import Market
from zoneinfo import ZoneInfo
import datetime as dt

christmas_noon = dt.datetime(2024, 12, 25, 12, tzinfo=ZoneInfo("America/New_York"))
status = Market.get("US.NYSE").status(christmas_noon)

status.pprint()
```

*Output:*
```python
{'status': 'Closed',
 'reason': 'Christmas',
 'until': '2024-12-26 04:00:00-05:00',
 'next_bell': '2024-12-26 09:30:00-05:00',
 'phase': None,
 'market': 'Market: US.NYSE New York Stock Exchange America/New_York'}
```

## Market Holidays

Get a list of holidays for a specific date range:

```python
from tradinghours import Market

market = Market.get('US.NYSE')
holidays = market.list_holidays("2024-01-01", "2024-12-31")

for holiday in holidays[:3]:
    print(holiday)
```

*Output:*
```
MarketHoliday: US.NYSE 2024-01-01 New Year's Day
MarketHoliday: US.NYSE 2024-01-15 Birthday of Martin Luther King, Jr
MarketHoliday: US.NYSE 2024-02-19 Washington's Birthday
```

## Trading Hours

### Phases (Recommended)

To get opening and closing times for a date range, use `Market.generate_phases()`. This returns a generator yielding `Phase` objects with actual datetimes considering holidays and schedule changes.

```python
from tradinghours import Market

market = Market.get('XNYS')
for phase in list(market.generate_phases("2023-09-01", "2023-09-30"))[:3]:
    print(phase)
```

*Output:*
```
Phase: 2023-09-01 04:00:00-04:00 - 2023-09-01 09:30:00-04:00 Pre-Trading Session
Phase: 2023-09-01 06:30:00-04:00 - 2023-09-01 09:30:00-04:00 Pre-Open
Phase: 2023-09-01 09:30:00-04:00 - 2023-09-01 09:30:00-04:00 Call Auction
```

::: warning Recommended Approach
Use `generate_phases()` rather than `list_schedules()` for most use cases. Phases provide actual datetimes and handle holidays automatically.
:::

### Schedules (Advanced)

To get the "general schedule" that phases are based on, use `Market.list_schedules()`. This provides `Schedule` objects representing the schedule **without** consideration of holidays.

**Simple Example - US.NYSE:**

```python
from tradinghours import Market

market = Market.get('XNYS')
for schedule in market.list_schedules()[:10]:
    print(schedule)
```

*Output:*
```
Schedule: US.NYSE (Partial) 06:30:00 - 09:30:00    Mon-Fri Pre-Trading Session
Schedule: US.NYSE (Partial) 09:30:00 - 13:00:00    Mon-Fri Primary Trading Session
Schedule: US.NYSE (Partial) 13:00:00 - 13:30:00    Mon-Fri Post-Trading Session
Schedule: US.NYSE (Regular) 04:00:00 - 09:30:00    Mon-Fri Pre-Trading Session
Schedule: US.NYSE (Regular) 06:30:00 - 09:30:00    Mon-Fri Pre-Open
Schedule: US.NYSE (Regular) 09:30:00 - 09:30:00    Mon-Fri Call Auction
Schedule: US.NYSE (Regular) 09:30:00 - 16:00:00    Mon-Fri Primary Trading Session
Schedule: US.NYSE (Regular) 15:45:00 - 16:00:00    Mon-Fri Pre-Close
```

**Complex Example - US.MGEX (with overnight trading):**
::: warning Complex Schedules
Interpreting schedule objects manually can be error-prone, especially for markets with overnight trading or seasonal variations. We strongly recommend using `generate_phases()` for most use cases.
:::
```python
from tradinghours import Market

market = Market.get('US.MGEX')
for schedule in market.list_schedules()[-11:-5]:
    print(schedule)
```

*Output:*
```
Schedule: US.MGEX (Regular) 19:00:00 - 07:45:00 +1 Sun-Thu Primary Trading Session
Schedule: US.MGEX (Thanksgiving2022) 08:00:00 - 08:30:00    Wed Pre-Open
Schedule: US.MGEX (Thanksgiving2022) 08:30:00 - 12:15:00    Fri Primary Trading Session
Schedule: US.MGEX (Thanksgiving2022) 08:30:00 - 13:30:00    Wed Primary Trading Session
Schedule: US.MGEX (Thanksgiving2022) 14:30:00 - 16:00:00    Wed Post-Trading Session
Schedule: US.MGEX (Thanksgiving2022) 16:45:00 - 08:30:00 +2 Wed Pre-Open
```

### Schedule Object Details

```python
from tradinghours import Market

schedule = Market.get('US.MGEX').list_schedules()[-6]

print(schedule.get_string_format())
# Output: Schedule: {fin_id} ({schedule_group}) {start} - {end_with_offset} {days} {phase_type}

schedule.pprint()
```
*Output:*
```python
{'fin_id': 'US.MGEX',
 'schedule_group': 'Thanksgiving2022',
 'schedule_group_memo': None,
 'timezone': 'America/Chicago',
 'phase_type': 'Pre-Open',
 'phase_name': 'Pre-Open',
 'phase_memo': None,
 'days': 'Wed',
 'start': '16:45:00',
 'end': '08:30:00',
 'offset_days': 2,
 'duration': 143100,
 'min_start': None,
 'max_start': None,
 'min_end': None,
 'max_end': None,
 'in_force_start_date': None,
 'in_force_end_date': None,
 'season_start': None,
 'season_end': None,
 'end_with_offset': '08:30:00 +2',
 'has_season': False}
```

## Customizing String Representation

You can customize how Market objects are displayed:

```python
from tradinghours import Market

Market.set_string_format("{fin_id}: {exchange_name} ({timezone})")
market = Market.get("US.NYSE")
print(market)
# Output: US.NYSE: New York Stock Exchange (America/New_York)

# Reset to default
Market.reset_string_format()
print(market)
# Output: Market: US.NYSE New York Stock Exchange America/New_York
```
