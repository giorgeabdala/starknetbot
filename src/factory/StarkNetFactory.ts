import {Account, BigNumberish, constants, RpcProvider} from 'starknet';
import config from "../config";

export default class StarknetFactory {

    public  async getProvider(): Promise<RpcProvider> {
        console.log('Connecting to the provider...');
        const provider =  new RpcProvider({nodeUrl: config.nodeUrl});
        console.log('Connected to the provider');
       return provider;

    }

    public  async getMaraAccount(provider: RpcProvider): Promise<Account> {
        console.log('Creating a Mara account...');
        const privateKey = config.privateKey;
        const accountAddress = config.accountAddress;
        const account = new Account(provider, accountAddress, privateKey, undefined, constants.TRANSACTION_VERSION.V3);
        console.log('Account created');
        return account;
    }




}