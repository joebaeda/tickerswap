export const supportedNetworks = [
    {
        networkName: "Mainnet",
        chainIdHex: "0x1",
        chainIdNumber: 1,
        rpcUrl: "https://1rpc.io/eth",
        explorer: "https://etherscan.io",
        networkLogo: "/network/ethereum.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Optimism",
        chainIdHex: "0xa",
        chainIdNumber: 10,
        rpcUrl: "https://mainnet.optimism.io",
        explorer: "https://optimistic.etherscan.io",
        networkLogo: "/network/op.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Arbitrum",
        chainIdHex: "0xa4b1",
        chainIdNumber: 42161,
        rpcUrl: "https://arb1.arbitrum.io/rpc",
        explorer: "https://arbiscan.io",
        networkLogo: "/network/arbitrum-one.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Blast",
        chainIdHex: "0x13e31",
        chainIdNumber: 81457,
        rpcUrl: "https://rpc.blast.io",
        explorer: "https://blastscan.io",
        networkLogo: "/network/blast.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Base",
        chainIdHex: "0x2105",
        chainIdNumber: 8453,
        rpcUrl: "https://mainnet.base.org",
        explorer: "https://basescan.org",
        networkLogo: "/network/base.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Scroll",
        chainIdHex: "0x82750",
        chainIdNumber: 534352,
        rpcUrl: "https://1rpc.io/scroll",
        explorer: "https://scrollscan.com",
        networkLogo: "/network/scroll-chain.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "ZKsync",
        chainIdHex: "0x144",
        chainIdNumber: 324,
        rpcUrl: "https://mainnet.era.zksync.io",
        explorer: "https://explorer.zksync.io",
        networkLogo: "/network/zksync.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Linea",
        chainIdHex: "0xe708",
        chainIdNumber: 59144,
        rpcUrl: "https://rpc.linea.build",
        explorer: "https://lineascan.build",
        networkLogo: "/network/linea.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "BSC",
        chainIdHex: "0x38",
        chainIdNumber: 56,
        rpcUrl: "https://bsc-dataseed.bnbchain.org",
        explorer: "https://bscscan.com",
        networkLogo: "/network/bsc.svg",
        nativeCurrency: "BNB",
    },
    {
        networkName: "Avalanche",
        chainIdHex: "0xa86a",
        chainIdNumber: 43114,
        rpcUrl: "https://1rpc.io/avax/c",
        explorer: "https://subnets.avax.network/c-chain",
        networkLogo: "/network/avax.svg",
        nativeCurrency: "AVAX",
    },
    {
        networkName: "Polygon",
        chainIdHex: "0x89",
        chainIdNumber: 137,
        rpcUrl: "https://polygon-mainnet.infura.io",
        explorer: "https://polygonscan.com",
        networkLogo: "/network/polygon.svg",
        nativeCurrency: "POL",
    },
    {
        networkName: "zkEVM",
        chainIdHex: "0x44d",
        chainIdNumber: 1101,
        rpcUrl: "https://zkevm-rpc.com",
        explorer: "https://zkevm.polygonscan.com",
        networkLogo: "/network/polygon.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Mode",
        chainIdHex: "0x868b",
        chainIdNumber: 34443,
        rpcUrl: "https://mainnet.mode.network",
        explorer: "https://explorer.mode.network",
        networkLogo: "/network/mode.svg",
        nativeCurrency: "ETH",
    },
    // Testnet Network
    {
        networkName: "Sepolia",
        chainIdHex: "0xaa36a7",
        chainIdNumber: 11155111,
        rpcUrl: "https://rpc.sepolia.org",
        explorer: "https://sepolia.etherscan.io",
        networkLogo: "/network/ethereum.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "OP Sepolia",
        chainIdHex: "0xaa37dc",
        chainIdNumber: 11155420,
        rpcUrl: "https://sepolia.optimism.io",
        explorer: "https://sepolia-optimistic.etherscan.io",
        networkLogo: "/network/op.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Base Sepolia",
        chainIdHex: "0x14a34",
        chainIdNumber: 84532,
        rpcUrl: "https://sepolia.base.org",
        explorer: "https://sepolia.basescan.org",
        networkLogo: "/network/base.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Blast Sepolia",
        chainIdHex: "0xa0c71fd",
        chainIdNumber: 168587773,
        rpcUrl: "https://sepolia.blast.io",
        explorer: "https://sepolia.blastscan.io",
        networkLogo: "/network/blast.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Linea Sepolia",
        chainIdHex: "0xe705",
        chainIdNumber: 59141,
        rpcUrl: "https://rpc.sepolia.linea.build",
        explorer: "https://sepolia.lineascan.build",
        networkLogo: "/network/linea.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "ZKsync Sepolia",
        chainIdHex: "0x12c",
        chainIdNumber: 300,
        rpcUrl: "https://sepolia.era.zksync.dev",
        explorer: "https://sepolia.explorer.zksync.io",
        networkLogo: "/network/zksync.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Scroll Sepolia",
        chainIdHex: "0x8274f",
        chainIdNumber: 534351,
        rpcUrl: "https://sepolia-rpc.scroll.io",
        explorer: "https://sepolia.scrollscan.com",
        networkLogo: "/network/scroll-chain.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Abstract Testnet",
        chainIdHex: "0x2b74",
        chainIdNumber: 11124,
        rpcUrl: "https://api.testnet.abs.xyz",
        explorer: "https://explorer.testnet.abs.xyz",
        networkLogo: "/network/abstract.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Mode Testnet",
        chainIdHex: "0x397",
        chainIdNumber: 919,
        rpcUrl: "https://sepolia.mode.network",
        explorer: "https://sepolia.explorer.mode.network",
        networkLogo: "/network/mode.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "BSC Tesnet",
        chainIdHex: "0x61",
        chainIdNumber: 97,
        rpcUrl: "https://bsc-testnet-dataseed.bnbchain.org",
        explorer: "https://testnet.bscscan.com",
        networkLogo: "/network/bsc.svg",
        nativeCurrency: "BNB",
    },
    {
        networkName: "Polygon Amoy",
        chainIdHex: "0x13882",
        chainIdNumber: 80002,
        rpcUrl: "https://rpc-amoy.polygon.technology",
        explorer: "https://amoy.polygonscan.com",
        networkLogo: "/network/polygon.svg",
        nativeCurrency: "POL",
    },
    {
        networkName: "zkEVM Cardona",
        chainIdHex: "0x98a",
        chainIdNumber: 2442,
        rpcUrl: "https://etherscan.cardona.zkevm-rpc.com",
        explorer: "https://cardona-zkevm.polygonscan.com",
        networkLogo: "/network/polygon.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "Arbitrum Sepolia",
        chainIdHex: "0x66eee",
        chainIdNumber: 421614,
        rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
        explorer: "https://sepolia.arbiscan.io",
        networkLogo: "/network/arbitrum-one.svg",
        nativeCurrency: "ETH",
    },
    {
        networkName: "AVAX Testnet",
        chainIdHex: "0xa869",
        chainIdNumber: 43113,
        rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
        explorer: "https://subnets-test.avax.network/c-chain",
        networkLogo: "/network/avax.svg",
        nativeCurrency: "AVAX",
    },
]