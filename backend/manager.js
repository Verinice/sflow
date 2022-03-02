import FlowService from "./flowService.js"
import "./config.js";
import * as scripts from "./scripts.js"
import * as transactions from "./transactions.js"

const accad = "0x44886dbbf20e893c"
const accke = "784bf71b737be0b49652030fcaa78369a60df6fbed57d5e0fbef57aa631e3ec8"
const admin = new FlowService.FlowService(accad, accke , 0);

const account = await admin.getAccount(accad);
const signer = admin.authorizeMinter(account);

await transactions.setManagerCapabilityToAccount(signer, "0xe62fecb1ff22b768")

// await transactions.setupStakeCollection();

// await transactions.registerDelegator("4d617820576f6c74657200ff6e729e24d35ee1aa0a76bc05746f8c99879e8eaf", "500.0");

// getApprovedNodes().then((info) => {
//     for(let i=0; i<info.length; i++)
//     {
//         scripts.getNodeInfo(info[i]).then((info) => {console.log(info)});
//     }
// });
