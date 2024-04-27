# bookExchange

_bookExchange_ is an application for exchanging books online, aimed at giving used books a second life whilst fostering a community of readers.

### Overview

This is the server for _bookExchange_. The application's frontend found at `bookexchange` directory is a skeleton and will require future development to bring it to a usable state. Therefore, users should use the server, found at `bookexchangeserver` exclusively, _curling_ to make requests, according to the routing in `src/routes`. The server uses `Node.js`, `Express`, `TypeScript`, `Prisma`, and `PostgreSQL` as the core technologies.

Note that one must install postgresql, create a local database server, and generate a prisma client to connect the server to the database. Please follow the directions in this post: <https://medium.com/@codethematrix/integrating-prisma-orm-with-postgresql-and-express-3f7b726cecec>.

Please note that authentication and authorisation will be implemented later on with sessions.

### How to run the application locally

To run _bookExchange_ locally, follow the following instructions:

1. Open a terminal in the project's directory, `bookexchangeserver`, and run `npm start`.
2. Ensure you have a local `postgres` database running, configured to the following database url: `postgres://postgres:postgres@localhost:5432/bookexchange-db`. Note that the database url follows the following format, `postgres://YourUsername:YourPassword@localhost:YourPortNumber/YourDatabaseName`, so ensure that you create your database to match the database url above.
3. Open a browser window and access _bookExchange_ at <http://localhost:8080/api/v1> or open a terminal to curl the server's endpoints.
4. I recommend using `Thunder Client`, a lightweight Rest API client for VS Code to make curling easier. Use query bodies for your requests, following the routes in the routes folder of the server. See the user journey for a walkthrough.

### User journey

This section will demonstrate an example use case flow once the server and database are up and running. Note that I assume the user is using a REST API client to make a `get` and `post` request to the server with an optional query body. Note that <http://localhost:8080/api/v1> is hereby referred to as `base_url`.

Feel free to translate to curl statements that can be run on terminal. For example, to check whether the server is running, run `curl -X POST -H "Content-Type: application/json" -d '{ "username": "your_username", "password": "your_password" }' http://localhost:8080/api/v1/auth/register`.

1. To check the server is running, _get_ base_url/test/health.
2. To register a user to _bookExchange_, _post_ base_url/auth/register with query body

```
{ "username": "your_username", "password": "your_password" }
```

3. To list all registered users, _get_ base_url/user/list.
4. To search for a user, _post_ base*url/user with query \_body*

```
{ "id": "optional", "username": "optional" }
```

5. To add a book belonging to a user, _post_ base*url/book/create with query \_body*

```
{ "username": "string", "title": "string", "author": "string", "genre": ["string optional"],
  "description": "string optional", "photoUrl": "string optional", "locked": "boolean optional"
}
```

6. To update a book with `id` belonging to a user, _post_ base*url/book/update with query \_body*

```
{ "id": "string", "ownerId": "string optional", "title": "string optional",
  "author": "string optional", "genre": ["string optional"], "description": "string optional",
  "photoUrl": "string optional", "quantity": "number optional", "locked": "boolean optional"
}
```

7. To list all books, _get_ base_url/book/list
8. To search for a book, _get_ base*url/book with query \_body*

```
{ "title": "string" }
```

9. To search for books by a certain author, _get_ base*url/book/author with query \_body*

```
{ "author": "string" }
```

10. To search for books of a certain genre, _get_ base*url/book/genre with query \_body*

```
{ "genre": ["genre enum string optional"] }
```

11. To search for books owned by a certain user, _get_ base*url/book/owner with query \_body*

```
{ "username": "string" }
```

12. To express interest in obtaining a book, a user may _bid_ for a book. To create a bid for a book of id `bookId`, _post_ base*url/bid/create with query \_body*

```
{ "username": "string", "bookId": "string", "amount": "number optional default(0)" }
```

13. To update a bid of `id` , _post_ base*url/bid/update with query \_body*

```
{ "id": "string", "amount": "number optional default(0)" }
```

14. To delete a bid of `id` , _post_ base*url/bid/delete with query \_body*

```
{ "id": "string" }
```

15. To list all the bids for a book of `id`, _get_ base*url/bid/list with query \_body*

```
{ "id": "string" }
```

16. To answer \(accept/decline\) a bid of `id` for a book, _get_ base\*url/bid/list with query _body_

```
{ "id": "string", "status": "bid_status enum string" }
```

Note that the application only supports genres and bid statuses listed in `enum genre` and `enum bid_status` of `prisma/schema.prisma` respectively.

### Future plans

In future, I plan to containerise the application with Docker to make the setup much easier and use `AWS ECS` to host the containerised application. Users will be able to conveniently access _bookEchange_ on any browser once hosting is done. I intend to expand on the microservices architecture to develop more robust and supported features faster by leveraging AWS services.

To increase user engagement, I plan to support book images and chats with `Amazon S3` for storage, `Amazon SNS` for notifications, and `Amazon Lambda` for serverless functions and scheduled jobs. I also plan to complete the React frontend, leveraging axios to communicate with the server to make the user experience better.

### Remarks

Please feel free to [email](mailto:ianmasilafst@gmail.com)
for a live demonstration if needed. Thank you for taking the time to interact with the application!
