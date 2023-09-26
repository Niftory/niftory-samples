import { config } from "@onflow/fcl"
import { ACCESS_NODE_URLS } from "./constants"
import flowJSON from "./flow.json"

const flowNetwork = "testnet"

console.log("Dapp running on network:", flowNetwork)

// @ts-ignore
config({
  "flow.network": flowNetwork,
  "accessNode.api": ACCESS_NODE_URLS[flowNetwork],
  "discovery.wallet": `https://fcl-discovery.onflow.org/${flowNetwork}/authn`,
  "app.detail.icon": "https://avatars.githubusercontent.com/u/62387156?v=4",
  "app.detail.title": "FCL Next Scaffold",
  // @ts-ignore
}).load({ flowJSON })
