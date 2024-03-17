# Feedback Hub

This project is a feedback hub built using a Turborepo architecture. It leverages various technologies and frameworks including:

- Turborepo: A monorepo setup that allows for managing multiple packages and apps in a single repository.
- GraphQL: The server is built on top of Fastify and Mercurius, providing a powerful and flexible API for data retrieval and manipulation.
- TypeScript: The entire project is written in TypeScript, providing static type checking and improved developer productivity.
- Remix: The frontend interface is built using Remix, a modern web framework that combines server-rendered HTML with client-side interactivity.
- Tailwind CSS: The styling of the web interface is done using Tailwind CSS, a utility-first CSS framework.
- DaisyUI: DaisyUI is a plugin for Tailwind CSS that provides a set of ready-to-use components and styles.
- Vite: The project uses Vite as the build tool, providing fast and efficient development and production builds.
- JWT Authentication: User authentication is implemented using JSON Web Tokens (JWT), ensuring secure access to protected routes.
- Real-time Updates: The app utilizes Server-Sent Events (SSE) to provide real-time updates to the users' feed. Whenever a new post is placed, the feed is automatically updated without the need for manual refreshing.

The app consists of four main pages:

1. Home: This page displays the feedbacks feed, showing the latest posts from users.
2. Login: Users can log in to access the app and create new feedback.
3. Register: New users can register an account to gain access to the app.
4. Create New Feedback: Once logged in, users can create new feedback to share their thoughts and opinions.

To get started with the app, follow these steps:

1. Install the dependencies by running the following command in your terminal:

```sh
yarn install
```

### 2. create database

```
yarn db:update
```

### 3. start the apps on dev mode

```sh
yarn start
```

it will expose the the web app `7000` for the web and `7001` to fot the server


### 4. Create the events

open [https://localhost:7001/graphiql](https://localhost:7001/graphiql) in you browser and execute the mutation bellow 
to create some events and users.

```gql
mutation Populate {
  # Users
  user1: createUser(input: { name: "matheus ale", username: "user1", password: "123456" }) {
    user {
      username
    }
  }
  
  user2: createUser(input: { name: "matheus silva", username: "user2", password: "123456" }) {
    user {
      username
    }
  }
  
  #Events
  event1: createEvent(input: { name: "Websummit" }) {
    id
    name
  }
  
  event2: createEvent(input: { name: "CES" }) {
    id
    name
  }
  
  event3: createEvent(input: { name: "Rock in Rio" }) {
    id
    name
  }
  
  event4: createEvent(input: { name: "AWS Summit" }) {
    id
    name
  }
  
  event5: createEvent(input: { name: "AI Summit" }) {
    id
    name
  }
}
```

### 5. Start using it 🚀

just hit [http://localhost:7000](http://localhost:7000)

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `server`: GraphQL build on top of Fastify and Mercurius 
- `web`: Remix frontend interface using tailwind and DaisyUI for styling
- `@repo/db`: Database schema and data validation using Drizzle and zod
- `@repo/sse-types`: Typescript interfaces collection to describe SSE events contracts
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
