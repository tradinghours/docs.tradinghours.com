# Server Mode Configuration
## Configuration

Create a `tradinghours.ini` file to customize server behavior:

```ini
[auth]
token = YOUR-API-TOKEN

[server-mode]
allowed_hosts = *
allowed_origins = *
log_folder = tradinghours_server_logs
log_level = DEBUG
log_days_to_keep = 7
```

### Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
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

By default, the server checks every minute if new data is available and automatically runs `tradinghours import` when updates are detected. You can disable this feature by running the server with the `--no-auto-update` flag.

```bash
tradinghours serve --no-auto-update
```

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