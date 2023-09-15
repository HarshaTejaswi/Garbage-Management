module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Update this to match your Ethereum client's host
      port: 8545,         // Update this to match your Ethereum client's port
      network_id: "*",
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
