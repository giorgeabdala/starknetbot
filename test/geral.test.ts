require('dotenv').config();

import {describe} from "vitest";
import StarknetFactory from "../src/factory/StarkNetFactory";
import TokenUtils from "../src/TokenUtils";
import NostraFactory from "../src/factory/NostraFactory";
import {Account, RpcProvider, shortString} from "starknet";
import * as process from "process";
const startnetFactory: StarknetFactory = new StarknetFactory();
const nostraFactory: NostraFactory = new NostraFactory();

const iUnoContract = "0x02a3a9d7bcecc6d3121e3b6180b73c7e8f4c5f81c35a90c8dd457a70a842b723";
const decimals = 18;
const symbol = "iUNO-c";


const config = {
    nodeUrl: 'https://starknet-mainnet.g.alchemy.com/v2/qKE3jkHmwsw4d8lZZmmDx5X2YpmkEqJX',
    privateKey: process.env.PRIVATE_KEY || "",
    accountAddress: process.env.ACCOUNT_ADDRESS || "",
    abdalaAddress: process.env.ABDALA_ADDRESS || "",

}


describe("StarknetProvider", () => {
    it("should get a provider", async () => {
        const provider = await startnetFactory.getProvider();
        const chainId = await provider.getChainId();
        expect(provider).toBeDefined();
        expect(chainId).toBe("0x534e5f4d41494e");
    });

    it("should get a rpc version", async () => {
        //each rpc version has an equivalent starknet lib version
        const provider = await startnetFactory.getProvider();
        const rpcVersion = await provider.getSpecVersion();
        console.log("RPC version: ", rpcVersion);
        expect(rpcVersion).toBe("0.6.0");
    } );

    it ("should get an Mara account", async () => {
        const provider = await startnetFactory.getProvider();
        const account = await startnetFactory.getMaraAccount(provider);
        const nonce = await account.getNonce();
        expect(account.address).toBe(config.accountAddress);
        expect(nonce).toBeDefined();
    } );

} );

describe("Token", () => {
    it("should create a token", async () => {
        const token =  TokenUtils.getAmount(symbol, decimals);
        expect(token).toBeDefined();
    });

    it("should get the amount", async () => {
        const amount = TokenUtils.getAmount("1", decimals);
        expect(amount).toBe("1000000000000000000");
    });

    it("should get the amount", async () => {
        const amount =  TokenUtils.getAmount("1.25", decimals);
        expect(amount).toBe("1250000000000000000");
    });

    it("should get the amount", async () => {
        const amount = TokenUtils.getAmount("10.456", decimals);
        expect(amount).toBe("10456000000000000000");
    });
} );

describe("NostraFactory", () => {
    it("should get a contract", async () => {
        const provider = await startnetFactory.getProvider();
        const contract = await nostraFactory.getContract(provider, symbol);
        const contractSymbol = await contract.symbol();
        const decodedSymbol = shortString.decodeShortString(contractSymbol);
        expect(decodedSymbol).toBe("iUNO-c");
        expect(contract).toBeDefined();
    });

    it("should connecttion contract on account", async () => {
        const provider = await startnetFactory.getProvider();
        const maraAccount = await startnetFactory.getMaraAccount(provider);
        const contract = await nostraFactory.getContract(provider, symbol);
        contract.connect(maraAccount);
        expect(contract).toBeDefined();
    } );

    it("should get the balanceof account", async () => {
        const provider = await startnetFactory.getProvider();
        const contract = await nostraFactory.getContract(provider, symbol);
        const maraAccount = await startnetFactory.getMaraAccount(provider);
        contract.connect(maraAccount);
        const balance = await contract.balanceOf(maraAccount.address);
        expect(balance).toBeDefined();
        //teste. Retirar apos primeira execução com sucesso de transfer
        // @ts-ignore
        //expect(balance).toBe(BigInt(51117698476249102247n));
    } );

} );







