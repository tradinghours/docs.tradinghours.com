# Server Mode API Endpoints

## API Documentation

The server exposes a REST API that mirrors the Python library interface. Once the server is running, visit these URLs for up-to-date API documentation:

- **Swagger UI**: http://127.0.0.1:8000/docs
- **OpenAPI Schema**: http://127.0.0.1:8000/openapi.json

The Swagger UI provides a full interactive interface to test all endpoints.

## Example Endpoints

### Markets

```bash
# List all markets
GET /markets

# Get specific market
GET /markets/{fin_id}

# Get market status
GET /markets/{fin_id}/status
GET /markets/{fin_id}/status?time=2024-12-25T12:00:00-05:00

# Get market holidays
GET /markets/{fin_id}/holidays?start=2024-01-01&end=2024-12-31

# Generate trading phases
GET /markets/{fin_id}/phases?start=2024-01-01&end=2024-01-31
```

### Currencies

```bash
# List all currencies
GET /currencies

# Get specific currency
GET /currencies/{currency_code}

# Get currency holidays
GET /currencies/{currency_code}/holidays?start=2024-01-01&end=2024-12-31
```

### Example API Call

Using `curl`:

```bash
curl http://127.0.0.1:8000/markets/US.NYSE
```

Response:
```json
{
    "fin_id": "US.NYSE",
    "exchange_name": "New York Stock Exchange",
    "market_name": "Canonical",
    "security_group": null,
    "timezone": "America/New_York",
    "weekend_definition": "Sat-Sun",
    "mic": "XNYS",
    "acronym": "NYSE",
    "asset_type": "Securities",
    "memo": "Canonical",
    "permanently_closed": null,
    "replaced_by": null,
    "country_code": "US",
    "first_available_date": "2000-01-01",
    "last_available_date": "2033-12-31"
}
```
