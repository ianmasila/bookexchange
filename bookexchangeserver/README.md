# bookExchange

_bookExchange_ is an application for exchanging books online, aimed at giving used books a second life whilst fostering a community of readers.

### Location of application

Users may access _bookEchange_ here: <https://bookexchange.fly.dev>.

### How to run the application locally

To run _bookExchange_ locally, follow the following instructions:

1. Open a terminal in the project zip file's directory and run `docker-compose up`.
2. Run `docker ps` to confirm that the project's "app", "database-server", and "flyway" containers are running.
3. Open a browser window and access _bookExchange_ at <http://localhost:3000>. Alternatively, curl the application on the terminal. For instance, run `curl http://localhost:3000/`.
4. To shut down the application, run `docker-compose stop` or CTRL-C.
