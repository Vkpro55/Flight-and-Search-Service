This is a base Node.js project template, which anyone can use as it has been prepared by keeping some of the most importnat code principles and project management recommendations.

"src"=> Inside thr src folder all the actual source code regarding the project will reside. This will not include any kind of tests (You might want to make seprate test folder).

Let's take a look inside "src" folder:

- `config` => In this folder any set-up of library or modules is done. For example: setting up "dotenv" so that we can use environmental variables anywhere in the application in more cleaner fashion.

- `routes` => In this folder, we register a route and corresponding middlewares and controllers to it.

- `middlewares` => They are just interceptors for incoming request, where we can write our validations, authentications etc.

- `controllers` => They are kind of last middlewares only or last layer of middlewares, where we write our business logic regarding the specific routes. In the controllers we just receive the incoming request and data and then pass it to the business layer. And once business layer returns an output, we structute the API response in controllers.

- `repositories` => This folder contains all the logic using which we can interact with DB by wriying queries, all the raw queries or ORM queries will go here.

- `services` => This folder contains the business logic and interact with repositories for data from DB.

- `utils` => constains helper methods, error classes etc.

### Setup the project

- Download the template form this git repo.
- In the root directory create a `.env` file and put following env variables.
  ```
    PORT= <PORT number of your choice> For Example: PORT= 3000 || 5000 || 8000
  ```
- Install the dependencies:
  ```
    npm install
  ```
- Indise the `src/config` folder, create a file named as `config.json` and write the following code:

  ```
    {
      "development": {
       "username": "root",
       "password": null,
       "database": "database_development",
       "host": "127.0.0.1",
       "dialect": "mysql"
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
    }
  ```

- Go inside the `src` folder and run following command:

  ```
    npx sequelize init
  ```

- If you are setting up your development environment, then write the username and password of your db and in dialect mention the type of database your are using. For Example:
  ```
    one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'
  ```
- If you are setting up the test or production environment, then specify the host(Url where your DB is hosted).

- Start the development server:
  ```
    npm run start
  ```
