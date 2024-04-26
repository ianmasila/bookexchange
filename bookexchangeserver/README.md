# bookExchange

_bookExchange_ is an application for exchanging books online, aimed at giving used books a second life whilst fostering a community of readers.

### Notes

The application's frontend found at `bookexchange` directory is a skeleton and will require future development to bring it to a usable state. Therefore, users should use the server, found at `bookexchangeserver` exclusively, _curling_ to make requests, according to the routing in `src/routes`. The server uses `Node.js`, `Express`, `TypeScript`, `Prisma`, and `PostgreSQL` as the core technologies.

Note that one must install postgresql, create a local database server, and generate a prisma client to connect the server to the database. Please follow the directions in this post: `https://medium.com/@codethematrix/integrating-prisma-orm-with-postgresql-and-express-3f7b726cecec`. Please note that authentication and authorisation will be implemented later on with sessions.

In future, I plan to containerise the application with Docker to make the setup much easier. Please bear with me for now. Moreover, I plan to use `AWS ECS` to host the containerised application and leverage AWS services such as S3 for cloud storage of book images. Users will be able to access _bookEchange_ on any browser once hosting is done.

### How to run the application locally

To run _bookExchange_ locally, follow the following instructions:

1. Open a terminal in the project's directory, `bookexchangeserver`, and run `npm start`.
2. Ensure you have a local `postgres` database running, configured to the url set in the `.env` file.
3. Open a browser window and access _bookExchange_ at <http://localhost:8080/api/v1> or open a terminal to curl the server's endpoints. Please note that the front end is still in progress. Therefore, for now, all use cases will have to be curled with request bodies. For example, run the following command to register a user: `curl -X POST -H "Content-Type: application/json" -d '{
        "username": "your_username",
        "password": "your_password"
      }' http://localhost:8080/api/v1/auth/register
`.
4. I recommend using Thunder Client extension on VS Code to make curling easier. Use query bodies for your requests, following the routes in the routes folder of the server.
5. Please feel free to contact me at `ianmasilafst@gmail.com` for a live demonstration if needed.
6. Thank you for taking the time to interact with the application!
