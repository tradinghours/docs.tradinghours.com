# Python Library Overview
## Key Benefits

- ⚡ **Blazing fast** - No network latency, instant queries from local database
- 🚫 **No rate limits** - Run unlimited queries without throttling
- 💾 **Offline access** - Works completely offline after initial download
- 🔧 **Simple integration** - Simple and user-friendly interface handles all complexity

## Two Modes of Operation

<table>
<tr>
<td width="50%" valign="top">

### 📦 [Package Mode](https://docs.tradinghours.com/python-library/package-mode/getting-started)
**Use as a Python package**

```bash
pip install tradinghours
tradinghours import
```
```python
from tradinghours import Market
Market.get('US.NYSE')
```

Perfect for:
- Python applications & scripts
- Data analysis & backtesting  
- Trading algorithms

**[📖 Get Started →](https://docs.tradinghours.com/python-library/package-mode/getting-started)**

</td>
<td width="50%" valign="top">

### 🚀 [Server Mode](https://docs.tradinghours.com/python-library/server-mode/getting-started)
**Run as REST API server**

```bash
pip install tradinghours[server]
tradinghours serve
```
```bash
>> curl http://127.0.0.1:8000/markets/US.NYSE
{"fin_id":"US.NYSE","exchange_name":"New York...
```

Perfect for:
- Microservice and Multi-language infrastructure
- Low latency and no rate limits
- Fully private and on-premise hosting

**[📖 Get Started →](https://docs.tradinghours.com/python-library/server-mode/getting-started)**

</td>
</tr>
</table>

## Requirements

- **Python**: 3.9 or higher
- **Subscription**: Active TradingHours.com subscription ([get a quote](https://www.tradinghours.com/data))
- **API Token**: Available from [your account page](https://www.tradinghours.com/user/api-tokens)


## Advanced
### Optional Advanced Configuration

Configuration can be changed by creating a `tradinghours.ini` file in the current directory.

These are possible and optional values. Please see the [package mode](https://docs.tradinghours.com/python-library/package-mode/configuration) or [server mode](https://docs.tradinghours.com/python-library/server-mode/configuration) documentation for more details. *Keep in mind that server mode cannot use custom `[package-mode]` settings and must use the default SQLite database.*

```ini
[auth]
token = YOUR-TOKEN

[package-mode]
db_url = postgresql://postgres:password@localhost:5432/your_database
table_prefix = thstore_

[server-mode]
allowed_hosts = *
allowed_origins = *
log_folder = tradinghours_server_logs
log_level = DEBUG
log_days_to_keep = 7

[extra]
check_tzdata = True
```

### Time Zones
This package employs `zoneinfo` for timezone management, utilizing the IANA Time Zone Database, 
which is routinely updated. In certain environments, it's essential to update the `tzdata` package accordingly. 
`tradinghours` automatically checks your `tzdata` version against PyPI via HTTP request, issuing a warning 
if an update is needed.

To update `tzdata` run this command: `pip install tzdata --upgrade`

To disable this verification and prevent the request, add this section to your tradinghours.ini file:
```ini
[extra]
check_tzdata = False
```



## Support & Resources

- **[GitHub Repository](https://github.com/tradinghours/tradinghours-python)** - Source code
- **[Issue Tracker](https://github.com/tradinghours/tradinghours-python/issues)** - Bug reports & feature requests
- **[PyPI Package](https://pypi.org/project/tradinghours/)** - Package downloads
- **[Contact Support](https://www.tradinghours.com/contact)** - Get help from our team
