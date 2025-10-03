# Package Mode Configuration
::: tip Optional
Everything on this page is optional. As long as you set your api key in the environment variable `TRADINGHOURS_TOKEN`, everything will work with the default SQLite database managed by this package.
:::
## Database Configuration

In package mode, it is possible to make `tradinghours import` load data into a database of your choice and allowing other team members to use the same database. You will have to install the appropriate database dependencies.

```bash
pip install tradinghours[mysql]
# or
pip install tradinghours[postgres]
```

And then create a `tradinghours.ini` file in the current directory with the connection string. Please see the [details](#details) for more information.

```ini
[auth]
token = YOUR-TOKEN

[package-mode]
db_url = postgresql://postgres:password@localhost:5432/your_database
table_prefix = thstore_
```
::: warning Package Mode vs Server Mode
When running the server mode, you cannot use the `[package-mode]` settings. The server mode will always use the default SQLite database.
:::

## Details
* `[package-mode]`
  * `db_url`
    * A connection string to a database. Please read the [caveats](#caveats) before using this setting.
    * This allows you to download the data once and let your team members use the same database.
    * If not specified, uses SQLite by default.
  * `table_prefix`
    * Every table created in the database will be prefixed with this. `'thstore_'` is the default.
    * This can be used to avoid conflicts with existing tables.

#### Caveats
* *The `[package-mode]` settings cannot be used with `tradinghours serve`*
* This package has been tested with MySQL 8.4 and PostgreSQL 15.8
::: warning Data Ingestion
  * Tables used by this package (identified by the `table_prefix`) are dropped and recreated every time `tradinghours import` is run. 
  * To avoid any complications with existing data, we recommend creating a separate database for the `tradinghours` data, and making this the only database the `db_url` user has access to.
:::
* Dependencies:
  * Running `pip install tradinghours[mysql]` or `pip install tradinghours[postgres]` installs `pymysql` or `psycopg2-binary`, respectively.
  * You can install any other package (e.g. `mysqlclient`), as long as it allows `sqlalchemy` to communicate with the chosen database.


##### Schema
* The tables are named after the CSV files, with `_` instead of `-` and prefixed with the `table_prefix` setting.
* To allow flexibility with updates to the raw data, where columns might be added in the future, tables are created dynamically, based on the content of the CSV files.
* Columns of the tables are named after the columns of the CSV files, although in lower case and with underscores instead of spaces.
