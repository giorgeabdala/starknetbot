import {Contract, provider, RpcProvider} from "starknet";

const tokens = [
    {
        symbol: "iUNO-c",
        contractAddress: "0x02a3a9d7bcecc6d3121e3b6180b73c7e8f4c5f81c35a90c8dd457a70a842b723",
        decimals: 18
    },
    {
        symbol: "iSTRK-c",
        contractAddress: "0x07c2e1e733f28daa23e78be3a4f6c724c0ab06af65f6a95b5e0545215f1abc1b",
        decimals: 18
    }
];


export default class NostraFactory {

    public  async getContract(provider: RpcProvider, symbol: string): Promise<Contract> {
        const token = tokens.find(t => t.symbol === symbol);
        if (!token) throw new Error("Token not found");
        const contractClass = await provider.getClassAt(token.contractAddress);
        return new Contract(contractClass.abi, token.contractAddress, provider);
    }

}

