# Getting Started in *Server Mode*
## Overview

Server Mode lets you run the TradingHours library as a **standalone FastAPI server**, exposing all data via a RESTful API.

**Key benefits:**
- **Language-agnostic access:** Make TradingHours data available to any programming language or application in your infrastructure.
- **Close to zero network latency:** All data is served locally, ensuring fast responses.
- **Data privacy:** No information is sent outside your infrastructure.
- **No rate limits:** Unlimited access to data within your environment.

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

```bash
export TRADINGHOURS_TOKEN=<your-token-here>
tradinghours serve
```

The server will start on `http://127.0.0.1:8000` by default. Then you can access the API documentation at `http://127.0.0.1:8000/docs`.

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
- **OpenAPI Schema**: http://127.0.0.1:8000/openapi.json ([preview](/th-python-server/openapi.json))

The Swagger UI provides a full interactive interface to test all endpoints.

