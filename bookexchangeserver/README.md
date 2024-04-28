# bookExchange

_bookExchange_ is an application for exchanging books online, aimed at giving used books a second life whilst fostering a community of readers.

### Overview

Welcome to the server for _bookExchange_! This server is built using `Node.js`, `Express`, `TypeScript`, `Prisma`, and `PostgreSQL`, forming the foundation of our book exchange platform.

#### Key Technical Decisions

I have made several crucial technical decisions to ensure the efficiency and scalability of our platform:

- **Prisma for ORM and Migrations:** Prisma simplifies database management by providing an intuitive ORM and migration toolset.
- **Microservices Architecture:** I have followed a microservices architecture to enhance modularity and maintainability.
- **Middleware Setup:** Middleware is set up for request pre-processing, anticipating code organization and enhancing security.

Please note that while this preliminary version of the server supports cURL requests, features such as authentication, authorization, and sessions will be implemented in future iterations.

#### Key Product Features

Our platform offers a range of features designed to facilitate book exchange and foster a vibrant reading community:

- **User Registration:** Users can easily create accounts.
- **User Search:** Searching for users is made simple and efficient.
- **Book Management:** Users can create, update, and manage book entries for books in their possession.
- **Book Listing:** Browse through a comprehensive list of all listed books.
- **Book Search:** Find books by title, author, genre, or owner, making book discovery effortless.
- **Bidding:** Interested users can create bids for books they wish to acquire. Owners may decline bids or accept bids to trade books.
- **[FUTURE] Trading with In-App Currency:** Accepted bids will trigger trades, facilitating the exchange of books between users. This process may involve transactions using an in-app coin system, streamlining the payment process and enhancing the community experience.

Our ecosystem is centered around the core mission of _bookExchange_: facilitating book exchanges while building a strong sense of community among readers. Join us in our journey to promote readership, sharing, and community!

### How to run the application locally

To run _bookExchange_ locally, follow the following instructions:

1. Open a terminal in the project's directory, `bookexchangeserver`, and run `npm start` to launch the server.
2. Ensure you have a local `postgres` database running, configured to the following database url: `postgres://postgres:postgres@localhost:5432/bookexchange-db`. Note that the database url follows the following format, `postgres://YourUsername:YourPassword@localhost:YourPortNumber/YourDatabaseName`, so ensure that you create your database to match the database url above. Follow the instructions here to install postgresql, create a local database server, and generate a prisma client to connect the server to the database. Please follow the directions in this post: <https://medium.com/@codethematrix/integrating-prisma-orm-with-postgresql-and-express-3f7b726cecec>. Remember to add a `.env` file with the database url in the root directory.
3. Open a browser window and access _bookExchange_ at <http://localhost:8080/api/v1> or open a terminal to curl the server's endpoints. I recommend using `Thunder Client`, a lightweight Rest API client for VS Code to make curling easier. Use query bodies for your requests, following the routes in the routes folder of the server. See the user journey for a walkthrough.

### User journey

This section will demonstrate an example flow for managing users, book entries, and bids for books. Note that I assume the user is using a REST API client to make a `get` and `post` request to the server with an optional query body. Note that <http://localhost:8080/api/v1> is hereby referred to as `baseurl`.

Feel free to translate to curl statements that can be run on terminal. For example, to check whether the server is running, run `curl -X GET http://localhost:8080/api/v1/test/health`.

1. To check the server is running, _get_ baseurl/test/health.
2. To register a user to _bookExchange_, _post_ baseurl/auth/register with query body

```
{ "username": "your_username", "password": "your_password" }
```

3. To list all registered users, _get_ baseurl/user/list.
4. To search for a user, _post_ baseurl/user with query body

```
{ "id": "optional", "username": "optional" }
```

5. To add a book belonging to a user, _post_ baseurl/book/create with query body

```
{ "username": "string", "title": "string", "author": "string", "genre": ["string optional"],
  "description": "string optional", "photoUrl": "string optional", "locked": "boolean optional"
}
```

6. To update a book with `id` belonging to a user, _post_ baseurl/book/update with query body

```
{ "id": "string", "ownerId": "string optional", "title": "string optional",
  "author": "string optional", "genre": ["string optional"], "description": "string optional",
  "photoUrl": "string optional", "quantity": "number optional", "locked": "boolean optional"
}
```

7. To list all books, _get_ baseurl/book/list
8. To search for a book, _get_ baseurl/book with query body

```
{ "title": "string" }
```

9. To search for books by a certain author, _get_ baseurl/book/author with query body

```
{ "author": "string" }
```

10. To search for books of a certain genre, _get_ baseurl/book/genre with query body

```
{ "genre": ["genre enum string optional"] }
```

11. To search for books owned by a certain user, _get_ baseurl/book/owner with query body

```
{ "username": "string" }
```

12. To express interest in obtaining a book, a user may _bid_ for a book. To create a bid for a book of id `bookId`, _post_ baseurl/bid/create with query body

```
{ "username": "string", "bookId": "string", "amount": "number optional default(0)" }
```

13. To update a bid of `id` , _post_ baseurl/bid/update with query body

```
{ "id": "string", "amount": "number optional default(0)" }
```

14. To delete a bid of `id` , _post_ baseurl/bid/delete with query body

```
{ "id": "string" }
```

15. To list all the bids for a book of `id`, _get_ baseurl/bid/list with query body

```
{ "id": "string" }
```

16. To answer \(accept/decline\) a bid of `id` for a book, _get_ baseurl/bid/answer with query body

```
{ "id": "string", "status": "bid_status enum string" }
```

Note that the application only supports genres and bid statuses listed in `enum genre` and `enum bid_status` of `prisma/schema.prisma` respectively.

### Future Plans

In the future, I have ambitious plans to enhance the _bookExchange_ platform and provide an even better experience for our users:

1. **Containerization with Docker:** I plan to containerise the application using Docker, streamlining the setup process and making deployment more efficient.

2. **Hosting on AWS ECS:** Leveraging AWS ECS (Elastic Container Service), I aim to host the containerized application, ensuring high availability and scalability. Once deployed, users will be able to access _bookExchange_ conveniently from any browser.

3. **Expansion of Microservices Architecture:** I am committed to expanding our microservices architecture to develop more robust and feature-rich functionalities rapidly. By leveraging AWS services, I will ensure better support and scalability for future developments.

4. **Enhanced User Engagement Features:**

   - **Support for Book Images:** I plan to introduce support for book images, allowing users to visually showcase their books.
   - **Integrated Chat Functionality:** Implementing chat functionality using Amazon S3 for storage and Amazon SNS for notifications will enhance user interactions and facilitate communication between users.
   - **Serverless Functions with Amazon Lambda:** I will utilize Amazon Lambda for serverless functions and scheduled jobs, optimizing resource utilization and improving overall system performance.

5. **Enhanced Security with Amazon IAM:** In our ongoing efforts to bolster the security of our application's resources, we plan to leverage Amazon IAM (Identity and Access Management) to implement robust access controls and authentication mechanisms. Below are some key strategies we intend to implement:

   - **Role-Based Access Control (RBAC)**: Define IAM roles for different categories of users or services within our application. Assign permissions based on these roles to restrict access appropriately.

   - **Multi-Factor Authentication (MFA)**: Enforce MFA for IAM users, especially for privileged accounts. This adds an extra layer of security by requiring users to provide additional verification beyond their password.

6. **Completion of React Frontend:** My frontend development efforts will focus on completing the React frontend. Leveraging axios for seamless communication with the server, I aim to enhance the user experience and provide a modern, intuitive interface for _bookExchange_.

These future plans reflect my commitment to continuous improvement and innovation, ensuring that _bookExchange_ establishes itself at the forefront of online book exchange platforms.

### Remarks

Please feel free to contact me via [email](mailto:ianmasilafst@gmail.com). Thank you for using _bookExchange_!
