# Mintme Tool

This is Niftory's Minting app built on Next.js that uses the [Niftory API](https://docs.niftory.com/home/v/api/).

## Usage

### Configuration

This app uses [dotenv](https://github.com/motdotla/dotenv) for configuration, so you can set your app's environment variables by creating a `.env` file in this directory.

See [.env.example](./.env.example) for an example of how to configure these environment variables.

### Installing Dependencies

To install the dependencies of this app.

```
yarn install
```

### Running the app

Once your `.env` file is set up, you can run the app locally with:

```
yarn dev
```

## Overview

### Stack:

- Web framework: [Next.js](https://nextjs.org/)
- Auth framework: [NextAuth](https://next-auth.js.org/)
- Graph QL Client: [graphql-request](https://github.com/prisma-labs/graphql-request)
- React state management: [urql](https://formidable.com/open-source/urql/) and [SWR](https://swr.vercel.app/docs/with-nextjs)
- GraphQL codegen: [graphql-codeg-generator](https://www.graphql-code-generator.com/)

### Authentication

This app demonstrates three forms of authentication in the Niftory API.

#### User authentication

We use [NextAuth](https://next-auth.js.org/) to manage user sessions in this app.

[Our configuration](pages/api/auth/[...nextauth].ts) uses Niftory as the only OAuth provider and saves the user's Niftory token in the session.

The browser's [GraphQL client](src/components/GraphQLClientProvider.tsx) then includes that token in every request to the Niftory API as a bearer token in the `Authorization` header

#### App Credentials authentication using NextJS API routes or in your backend.

If you want to make requests using the app's credentials instead of the User's credentials for performing admin only tasks then that can be done using the [Serverside GraphQL Client](src/graphql/getClientForServer.ts).

Note - This client should not be used in the frontend, it should either be used in the backend of your app or in the [NextJS API Routes](https://nextjs.org/docs/api-routes/introduction).


