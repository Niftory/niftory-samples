# Basic App

This is a sample app built on Next.js that demonstrates basic usage of the [Niftory API](https://docs.niftory.com/home/v/api/) for an app on the Flow blockchain.

You can see a live demo at [sample.niftory.com](https://sample.niftory.com).

## Setup

The Niftory Sample app is built on NextJS. You'll need NodeJS and NPM on your device to get started: 
- Installers: https://nodejs.org/en/download/
- (Optional) Mac: HomeBrew: https://formulae.brew.sh/formula/node

Next, you'll need Yarn (additional package manager), which is available here: 
- https://yarnpkg.com/getting-started/install

With these two things ready, you can simply run the following on your terminal or console to install all dependencies.

```
yarn install
```

## Usage

### Configuration

This app uses [dotenv](https://github.com/motdotla/dotenv) for configuration, so you can set your app's environment variables by creating a `.env` file in this directory.

See [.env.example](./.env.example) for an example of how to configure these environment variables.

### Running the app

Once your `.env` file is set up, you can run the app locally with:

```
yarn dev
```

## Overview

### Stack:
This is one potential stack, but this API can be plugged into any framework, frontend app or backend. 

- Web framework: [Next.js](https://nextjs.org/)
- Auth framework: [NextAuth](https://next-auth.js.org/)
- Graph QL Client: [graphql-request](https://github.com/prisma-labs/graphql-request)
- React state management: [react-query](https://tanstack.com/query/v4)
- GraphQL codegen: [graphql-codeg-generator](https://www.graphql-code-generator.com/)

### Authentication

This app demonstrates three forms of authentication in the Niftory API.

#### User authentication

We use [NextAuth](https://next-auth.js.org/) to manage user sessions in this app.

[Our configuration](pages/api/auth/[...nextauth].ts) uses Niftory as the only OAuth provider and saves the user's Niftory token in the session.

The browser's [GraphQL client](components/GraphQLClientProvider.tsx) then includes that token in every request to the Niftory API as a bearer token in the `Authorization` header

#### API-key-only authentication

If the user isn't signed in, the above client will make requests without an `Authorization` header. This allows users to view available NFTs without signing in.

Before claiming an NFT, the app will prompt the user to sign in and set up their wallet.

#### Backend authentication

Since transferring NFTs is a privileged operation, this app uses the [client credentials OAuth flow](lib/oauth.ts) to get a token that represents the app itself.

It passes in the client credentials token to the [backend GraphQL client](lib/graphql/backendClient.ts). We use an [API route](pages/api/nft/[nftModelId]/transfer.ts) to validate that the user hasn't already claimed this NFT, and have the GraphQL client initiate the transfer from the backend.

## Wallet Setup

This app demonstrates how to take the user through the wallet setup steps with the [Flow client library](https://docs.onflow.org/fcl/).

See the [WalletSetup component](./lib/components/../../components/wallet/WalletSetup.tsx) to explore how this flow works.
