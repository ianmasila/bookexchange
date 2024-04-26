# bookExchange

_bookExchange_ is an application for exchanging books online, aimed at giving used books a second life whilst fostering a community of readers.

### Location of application

In future, users will be able to access _bookEchange_ on any browser. Hosting is pending. Moreover, we will implement containerisation with _Docker_ to make the setup more straightforward when running the app locally.

### How to run the application locally

To run _bookExchange_ locally, follow the following instructions:

1. Open a terminal in the project's directory, `bookexchangeserver`, and run `npm start`. 
2. Ensure you have a local `postgres` database running, configured to the url set in the `.env` file. See `https://www.postgresql.org` for documentation. 
3. Open a browser window and access _bookExchange_ at <http://localhost:8080> or open a terminal to curl the server's endpoints. Please not that the front end is still in progress. Therefore, for now, all use cases will have to be curled with request bodies.
4. I recommend using Thunder Client to make curling easier. Use query bodies for any requests, following the routes in the routes folder of the server.
5. Please feel free to contact me at `ianmasilafst@gmail.com` for a live demonstration if needed.
6. Thank you for taking the time to interact with the application!
