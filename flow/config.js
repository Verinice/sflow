import { config } from "@onflow/fcl";

config({
  "accessNode.api": "https://access-testnet.onflow.org", // Mainnet: "https://access-mainnet-beta.onflow.org"
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
  "0xsFlowToken4": "0x44886dbbf20e893c", // The account address where the smart contract lives
  "0xsFlowStakingManager18": "0x44886dbbf20e893c", // The account address where the smart contract lives
  "0xFlowToken": "0x7e60df042a9c0868",
  "0xFungibleToken": "0x9a0766d93b6608b7"
})