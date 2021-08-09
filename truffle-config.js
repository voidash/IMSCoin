require('babel-register');
require('babel-polyfill');
var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic =

  module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "*" // Match any network id
      },
      rinkeby: {
        host: "localhost",
        provider: function () {
          return new HDWalletProvider("bar minute rotate april quality phone tag found coral pact image fabric", "https://rinkeby.infura.io/v3/8364e8cc75e94ee3a3223a7c1c22c4c4");
        },
        network_id: 4
        , gas: 6700000
        , gasPrice: 10000000000
      }
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/abis/',
    compilers: {
      solc: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
