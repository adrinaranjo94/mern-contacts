# MERN APP CONTACT LIST

This project is developed in MERN Stack ( Mongo | Express | React | Node).

## OVERVIEW

## FRONT

Project Client created with CRA (create-react-app)

Dependencies installed:

- Material UI (UI library )
- React Router Dom (Managment routes )
- Axios ( Managment client request API )
- Formik (Managment forms )

## BACK

Node Project with MongoDB and Express.

Endpoints available:

- /users (GET - Shows info all users)
- /users (POST - Add user)
- /users/:id (GET - Show info user)
- /users/:id (PUT - Update info user)
- /users/:id (DELETE - Delete user)

TDD Implemented.

For testing, I add a dependency to install mongodb in memory to erase and install before each test.

Dependencies installed

- Body parser: ( Parse request to json )
- Cors ( Managment CORS )
- Express ( Managment API Node )
- Mongoose ( ODM MongoDB )

DevDependencies installed

- Nodemon ( daemon node for development )
- Supertest ( Test e2e )
- Mongo DB Memory Server ( MongoDB in memory for development )

## Prerequisites

### Concurrently

You should have installed `concurrently` to deploy both packages at the same time.

```
npm i -g concurrently
```

#### Concurrently installed

You can use `npm run install-stack` to install dependencies in both packages

#### Concurrently not installed

You can use these commands to install dependencies

```
npm run install-client && npm run install-server
```

### Envs

You must create .env inside both packages

```
- client
    |- .env
- server
    |- .env
```

#### ENV Client

```
REACT_APP_API_URL= INSERT HERE URL API WITH BASE /api (Example: http://192.168.1.74:5000/api)
```

#### ENV Server

CONNECTION_URI= INSERT HERE URI MONGODB ( Example: mongodb://localhost:27017/mern-contacts)
PORT= INSERT PORT HERE (Take care to use the same port that you use in client's .env)

## TESTS

[x] Server `npm run test-server`

[ ] Client (not implemented)

## START PROJECT

### Development mode

For this mode we will use nodemon in node to reload the app if you make edits.

#### Concurrently installed

You can use `npm run dev` to install dependencies in both packages

#### Concurrently not installed

You can use these commands to install dependencies

```
npm run client-dev && npm run server-dev
```

### PreProduction mode

#### Concurrently installed

You can use `npm run start` to install dependencies in both packages

#### Concurrently not installed

You can use these commands to install dependencies

```
npm run client && npm run server
```

Developed by Adrian Naranjo ©
