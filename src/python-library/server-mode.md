# Server Mode

[[toc]]

## Overview

Server Mode allows you to run the TradingHours library as a **standalone FastAPI server**, exposing all data via a RESTful API. This makes the data accessible to any programming language or application in your infrastructure.

## When to Use Server Mode

Server Mode is ideal for:

- **Microservices Architecture** - Centralize trading hours data as a dedicated service
- **Multi-Language Teams** - Use from Python, JavaScript, Java, C#, or any language
- **Legacy Systems** - Integrate with applications that can't use Python libraries
- **Shared Infrastructure** - Multiple applications accessing the same data source

## Installation

Install the library with server dependencies:

```bash
pip install tradinghours[server]
```

This installs additional packages:
- **FastAPI** - Modern web framework
- **Gunicorn** - Production WSGI server
- **Uvicorn** - ASGI server for async support

## Starting the Server

### Basic Usage

```bash
export TRADINGHOURS_TOKEN=<your-token-here>
tradinghours serve
```

The server will start on `http://127.0.0.1:8000` by default.

### Command Line Options

```bash
tradinghours serve [OPTIONS]
```

| Option | Description | Default |
|--------|-------------|---------|
| `--host` | Host to bind to | `127.0.0.1` |
| `--port` | Port to bind to | `8000` |
| `--uds` | Unix domain socket path (overrides host/port) | None |
| `--no-auto-update` | Disable automatic data updates | Enabled |

### Examples

**Listen on all interfaces:**
```bash
tradinghours serve --host 0.0.0.0 --port 8080
```

**Use Unix domain socket (faster for local connections):**
```bash
tradinghours serve --uds /tmp/tradinghours.sock
```

## API Documentation

Once the server is running, visit these URLs for API documentation:

- **Swagger UI**: http://127.0.0.1:8000/docs
- **OpenAPI Schema**: http://127.0.0.1:8000/openapi.json

The Swagger UI provides a full interactive interface to test all endpoints.

## Configuration

Create a `tradinghours.ini` file to customize server behavior:

```ini
[auth]
token = YOUR-API-TOKEN

[server-mode]
allowed_hosts = localhost,example.com,*.example.com
allowed_origins = https://example.com,https://app.example.com
log_folder = /var/log/tradinghours
log_level = INFO
log_days_to_keep = 30
```

### Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
| `allowed_hosts` | Comma-separated list of allowed hosts. Use `*` for all. | `*` |
| `allowed_origins` | CORS origins. Use `*` for all or specify domains. | `*` |
| `log_folder` | Directory for log files with daily rotation | `tradinghours_server_logs` |
| `log_level` | Logging level: `DEBUG`, `INFO`, `WARNING`, `ERROR` | `INFO` |
| `log_days_to_keep` | Number of daily log files to retain | `7` |

### CORS Configuration

To allow web applications to access your API, configure CORS origins:

```ini
[server-mode]
allowed_origins = https://myapp.com,http://localhost:3000
```

Or allow all origins (not recommended for production):

```ini
[server-mode]
allowed_origins = *
```

## Automatic Data Updates

By default, the server checks every minute if new data is available and automatically runs `tradinghours import` when updates are detected.

### Disable Auto-Updates

To disable this feature:

```bash
tradinghours serve --no-auto-update
```

Or manually update data while the server is running by running `tradinghours import` in another terminal.

## Production Deployment

### Architecture

Server Mode uses a production-ready stack:
- **Gunicorn** - Process manager for high availability
- **Uvicorn** - Fast ASGI worker for async requests
- Multiple worker processes for concurrent requests

### Reverse Proxy Setup

For production, run behind a reverse proxy like **Nginx** or **Apache**:

**Nginx example:**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### systemd Service

Create a systemd service for automatic startup:

```ini
# /etc/systemd/system/tradinghours.service
[Unit]
Description=TradingHours API Server
After=network.target

[Service]
Type=simple
User=tradinghours
WorkingDirectory=/opt/tradinghours
Environment="TRADINGHOURS_TOKEN=your-token-here"
ExecStart=/usr/local/bin/tradinghours serve --host 127.0.0.1 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl enable tradinghours
sudo systemctl start tradinghours
sudo systemctl status tradinghours
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

RUN pip install tradinghours[server]

ENV TRADINGHOURS_TOKEN=""

EXPOSE 8000

CMD ["tradinghours", "serve", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t tradinghours-server .
docker run -p 8000:8000 -e TRADINGHOURS_TOKEN=your-token tradinghours-server
```

## Performance Optimization

### Unix Domain Socket

For maximum performance when the client and server are on the same machine:

```bash
tradinghours serve --uds /tmp/tradinghours.sock
```

Then configure your client to connect via the socket instead of TCP.

### Caching

The server doesn't implement response caching by default. Consider adding caching at the reverse proxy level or application level based on your needs.

## Monitoring & Logs

### Log Files

Logs are written to the configured `log_folder` with daily rotation:

```
tradinghours_server_logs/
├── tradinghours-2024-01-01.log
├── tradinghours-2024-01-02.log
└── tradinghours-2024-01-03.log
```

Logs include:
- Request logs
- Data update operations
- Errors and warnings

### Health Checks

The server provides basic health check endpoints:

```bash
# Check if server is responsive
curl http://127.0.0.1:8000/docs
```

## Limitations

::: warning Database Restrictions
Server Mode **cannot** use custom database configurations. It always uses the default SQLite database.

If you need shared database access (MySQL/PostgreSQL), use [Package Mode](/python-library/database) instead.
:::

## Troubleshooting

### Server Won't Start

**Check if port is already in use:**
```bash
lsof -i :8000
```

**Use a different port:**
```bash
tradinghours serve --port 8001
```

### CORS Errors

If web applications can't access the API, configure CORS:

```ini
[server-mode]
allowed_origins = https://yourapp.com
```

### Data Not Updating

Ensure the server has internet access to check for updates. Check logs for errors:

```bash
tail -f tradinghours_server_logs/tradinghours-$(date +%Y-%m-%d).log
```

## Client Examples

### Python

```python
import requests

response = requests.get('http://127.0.0.1:8000/markets/US.NYSE')
market = response.json()
print(market)
```

### JavaScript

```javascript
fetch('http://127.0.0.1:8000/markets/US.NYSE')
  .then(response => response.json())
  .then(market => console.log(market));
```

### cURL

```bash
curl http://127.0.0.1:8000/markets/US.NYSE/status | jq
```

## Next Steps

- Review the [Swagger documentation](http://127.0.0.1:8000/docs) for all available endpoints
- Set up [monitoring and alerting](#monitoring--logs) for production
- Configure [CORS](#cors-configuration) for web applications
- Implement [caching strategies](#performance-optimization) if needed
