require('dotenv').config();

const config = {
    nodeUrl: 'https://starknet-mainnet.g.alchemy.com/v2/qKE3jkHmwsw4d8lZZmmDx5X2YpmkEqJX',
    privateKey: process.env.PRIVATE_KEY || "",
    accountAddress: process.env.ACCOUNT_ADDRESS || "",
    abdalaAddress: process.env.ABDALA_ADDRESS || "",

}

export default config;