import FlowService from "./flowService.js"
import "./config.js";
import * as scripts from "./scripts.js"
import * as transactions from "./transactions.js"

const accad = "0xe62fecb1ff22b768"
const accke = "dd25736b4e8e7bfcc82b970b94e67c9ce02a53f94f8d2d298983bb4de64f6f6d"
const manager = new FlowService.FlowService(accad, accke , 0);

const account = await manager.getAccount(accad);
const signer = manager.authorizeMinter(account);


// await transactions.setupManagerAccount(signer)

const managing = async () => {
    let info = await scripts.getAllDelegatorInfo("0x44886dbbf20e893c");
    console.log(info);

    let balance = await scripts.getFlowBalance("0x44886dbbf20e893c");
    console.log(balance);

    try{
        await transactions.manageCollection(signer);
    } catch (error) {
        console.log(error)
    }
    setTimeout(managing, 5000);
}

setTimeout(managing, 5000);