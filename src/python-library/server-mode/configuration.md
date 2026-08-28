# Server Mode Configuration
## Configuration

Create a `tradinghours.ini` file to customize server behavior:

```ini
[data]
token = YOUR-API-TOKEN

[server-mode]
auto_import_frequency = 360
allowed_hosts = *
allowed_origins = *
log_folder = tradinghours_server_logs
log_level = DEBUG
log_days_to_keep = 7
```

### Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
| `auto_import_frequency` | Frequency (in minutes) to check for and import new data. Set to `0` to disable. | `360` (6 hours) |
| `allowed_hosts` | Comma-separated list of allowed hosts. Use `*` for all. | `*` |
| `allowed_origins` | Comma-separated list of allowed CORS origins. Use `*` for all. | `*` |
| `log_folder` | Directory for log files with daily rotation | `tradinghours_server_logs` |
| `log_level` | Logging level: `DEBUG`, `INFO`, `WARNING`, `ERROR` | `DEBUG` |
| `log_days_to_keep` | Number of daily log files to retain | `7` |

## Host, Port, and UDS

You can change the host and port the server listens on by running the server with the `--host` and `--port` flags.

```bash
tradinghours serve --host 0.0.0.0 --port 8000
```

Alternatively, you can use a Unix domain socket for maximum performance when the client and server are on the same machine:

```bash
tradinghours serve --uds /tmp/tradinghours.sock
```

Then configure your client to connect via the socket instead of TCP.


## Automatic Data Updates

By default, the server checks for new data every 6 hours (360 minutes) and automatically runs `tradinghours import` when updates are detected. You can customize this behavior using the `auto_import_frequency` setting in your `tradinghours.ini` file.

To change the update frequency:
```ini
[server-mode]
auto_import_frequency = 120  # Check every 2 hours
```

To disable automatic updates:
```ini
[server-mode]
auto_import_frequency = 0  # Disable automatic updates
```

::: tip Change Detection
The library uses efficient change detection (ETag for HTTP/S3 sources, mtime for local files) to avoid unnecessary downloads. See the [Data Sources](https://docs.tradinghours.com/python-library/#data-sources) section for details.
:::

::: warning Sources Without ETag Support
If your data source does not support ETag headers (e.g., custom servers), the library will download data on every check. In this case, make sure `auto_import_frequency` is set to an appropriate value to avoid excessive downloads and bandwidth usage.
:::

## Logs

Logs are written to the configured `log_folder` with daily rotation:

```
tradinghours_server_logs/
├── tradinghours-2025-01-01.log
├── tradinghours-2025-01-02.log
└── tradinghours-2025-01-03.log
```

::: warning Troubleshooting
If you run into any issues, please send the logs to support@tradinghours.com for further investigation.
:::