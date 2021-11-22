import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";

require("dotenv").config();

import { HardhatUserConfig } from "hardhat/types";

const accounts = [`${process.env.ETH_PRIVATE_KEY}`];

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      loggingEnabled: false,
      blockGasLimit: 10000000000,
    },
    arbitrum: {
      url: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts,
      chainId: 42161,
    },
    arbitrum_testnet: {
      url: `https://arb-rinkeby.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts,
      chainId: 421611,
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts,
      chainId: 5,
    },
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`,
  },
  solidity: {
    compilers: [
      {
        version: "0.6.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};

export default config;
