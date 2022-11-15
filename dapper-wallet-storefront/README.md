# NFT Storefront with Dapper Wallet

This is an NFT Storefront using Dapper Wallet built on Next.js that uses the [Niftory API](https://docs.niftory.com/home/v/api/).

### NFT Purchases

This sample uses Dapper Wallet for the checkout flow, including handling payments.

## Usage

### Configuration

This app uses [dotenv](https://github.com/motdotla/dotenv) for configuration, so you can set your app's environment variables by creating a `.env` file in this directory.

See [.env.example](./.env.example) for an example of how to configure these environment variables.

### Running the app

Once your `.env` file is set up, you can run the app locally with:

```
yarn install
yarn dev
```

## Overview

### Stack:

- Web framework: [Next.js](https://nextjs.org/)
- UI framework: [Chakra UI](https://chakra-ui.com/)
- Auth framework: [NextAuth](https://next-auth.js.org/)
- Graph QL Client: [urql](https://formidable.com/open-source/urql/)
- GraphQL codegen: [graphql-codeg-generator](https://www.graphql-code-generator.com/)

### Authentication

This app demonstrates various forms of authentication in the Niftory API.

#### User authentication

This is a pure dApp -- the "user" is just the Dapper Wallet address. We show how to register this wallet with Niftory and configure it to accept NFTs from this app, and use FCL and cookies to manage the session state for this wallet.

#### API-key-only authentication

The browser's [GraphQL client](src/lib/GraphQLClientProvider.tsx) specifies the project's API key as part of the headers of every request.
This allows users to view available NFTs without signing in.

Before purchasing an NFT, the app will prompt the user to set up their wallet.

## Wallet Setup

This app demonstrates how to take the user through the wallet setup steps with the [Flow client library](https://docs.onflow.org/fcl/).

See the [WalletSetup component](./lib/components/../../components/wallet/WalletSetup.tsx) to explore how this flow works.
