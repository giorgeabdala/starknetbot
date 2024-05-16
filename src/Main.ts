import config from "./config";
require('dotenv').config();
import NostraFactory from "./factory/NostraFactory";
import StarknetFactory from "./factory/StarkNetFactory";
import {cairo, Call} from "starknet";

export default class Main {


    public static async main(): Promise<void>    {
        try {
           await this.transferTo();
        } catch (e) {
            console.log(e);

        }

}

    private static async transferTo() {
        try {
            const starknetFactory = new StarknetFactory();
            console.log("Connecting to the provider...");
            const provider = await starknetFactory.getProvider();
            console.log("Connected to the provider")

            console.log("Creating a Mara account...");
            const maraAccount = await starknetFactory.getMaraAccount(provider);

            const nostraFactory = new NostraFactory();
            console.log("Getting the contract...");
            const contractUno = await nostraFactory.getContract(provider, "iUNO-c");

            console.log("Connectiog contract to Mara account...");
            contractUno.connect(maraAccount);

            const recipient = config.abdalaAddress;
            const amountInGwei = BigInt(1000000000000000000);

            console.log("Populating...");
            const myCall: Call = contractUno.populate("transfer", {
                to:  recipient,
                amount: amountInGwei});
            const {transaction_hash: transferTxHash} = await maraAccount.execute(myCall);
            // const res = await contractUno.transfer(myCall.calldata);
            console.log("Waiting for the transaction...");
            await provider.waitForTransaction(transferTxHash);
            console.log("Transaction completed");
            console.log("transferTxHash: ", transferTxHash);
        } catch (e) {
            console.log(e);
        }


    }

}

Main.main().then(r => console.log("Done")).catch(e => console.log(e));