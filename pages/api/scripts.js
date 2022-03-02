import * as fcl from "@onflow/fcl";

export const getNodeInfo = async (nodeID) => {
    const info = await fcl.query({
        cadence: `
        import FlowIDTableStaking from 0xFlowIDTableStaking

        // This script gets all the info about a node and returns it
        
        pub fun main(nodeID: String): FlowIDTableStaking.NodeInfo {
            return FlowIDTableStaking.NodeInfo(nodeID: nodeID)
        }
        `,
        args: (arg, t) => [arg(nodeID, t.String)]
    })

    return info;
}

export const getApprovedNodes = async () => {
    const info = await fcl.query({
        cadence: `
        import FlowIDTableStaking from 0xFlowIDTableStaking

        // This script returns the current approved list
        
        pub fun main(): [String] {
            return FlowIDTableStaking.getApprovedList()
        }
        `
    })

    return info;
}

export const getAllDelegatorInfo = async (address) => {
    const info = await fcl.query({
        cadence: `
        import FlowStakingCollection from 0xFlowStakingCollection
        import FlowIDTableStaking from 0xFlowIDTableStaking
        
        /// Gets an array of all the delegator metadata for delegators stored in the staking collection
        
        pub fun main(address: Address): [FlowIDTableStaking.DelegatorInfo] {
            return FlowStakingCollection.getAllDelegatorInfo(address: address)
        }
        `,
        args: (arg, t) => [arg(address, t.Address)]
    })

    return info;
}

export const accountInitialzed = async (address) => {
    console.log('Initialized   ... ', address);
    var response = await fcl.query({
        cadence : `
        import sFlowToken4 from 0xsFlowToken4
        import FungibleToken from 0xFungibleToken

        // This script reads the Vault balances of two accounts.
        pub fun main(accountAddress: Address) : Bool {
            // Get the accounts' public account objects
            let account = getAccount(accountAddress)

            let accountRef = account
            .getCapability(/public/sFlowToken4Receiver)
            .borrow<&{FungibleToken.Receiver}>()

            if accountRef == nil {
              return false
            }
            return true
        }
        `,args: (arg, t) => [arg(address, t.Address)]
      },)
    return response;
}

export const getCurrentPrice = async () => {
    var response = await fcl.query({
        cadence : `
        import sFlowStakingManager18 from 0xsFlowStakingManager18

        // This script reads the Vault balances of two accounts.
        pub fun main() : UFix64 {
            let price = sFlowStakingManager18.getCurrentPrice()
            return price
        }
        `
      },)
      return response;
}

export const getFlowBalance = async (address) => {
    const balance = await fcl.query({
        cadence: `
        // This script reads the balance field of an account's FlowToken Balance

        import FungibleToken from 0xFungibleToken
        import FlowToken from 0xFlowToken
        
        pub fun main(account: Address): UFix64 {
        
            let vaultRef = getAccount(account)
                .getCapability(/public/flowTokenBalance)
                .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
                ?? panic("Could not borrow Balance reference to the Vault")
        
            return vaultRef.balance
        }
        `,
        args: (arg, t) => [arg(address, t.Address)]
    })
    return balance;
}

export const getsFlowBalance = async (address) => {
    const balance = await fcl.query({
        cadence: `
        // This script reads the balance field of an account's FlowToken Balance

        import FungibleToken from 0xFungibleToken
        import sFlowToken4 from 0xsFlowToken4
        
        pub fun main(account: Address): UFix64 {
        
            let vaultRef = getAccount(account)
                .getCapability(/public/sFlowToken4Balance)
                .borrow<&sFlowToken4.Vault{FungibleToken.Balance}>()
                ?? panic("Could not borrow Balance reference to the Vault")
        
            return vaultRef.balance
        }
        `,
        args: (arg, t) => [arg(address, t.Address)]
    })
    return balance;
}