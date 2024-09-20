import { useEffect, useState } from 'react';

interface TokenCardProps {
    tokenAddress: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDescription: string;
    tokenLogoUrls: string;
    tokenChainName: string;
    tokenChainId: number;
    tokenChainHex: string;
    tokenChainLogoUrls: string;
    tokenChainCurrency: string;
    tokenChainRPCUrls: string;
    tokenChainExplorerUrls: string;
    deployer: string;
    timestamp: string;
}

const useContractData = () => {
    const [data, setData] = useState<TokenCardProps[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch data from the API
    const fetchDataFromAPI = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/contractData');
            const result = await response.json();

            if (result.success) {
                setData(result.data);
                // Optionally save to localStorage
                localStorage.setItem('contractData', JSON.stringify(result.data));
            } else {
                console.log('Failed to fetch contract data');
            }
        } catch (err) {
            console.log('Error occurred while fetching contract data');
        } finally {
            setLoading(false);
        }
    };

    // Load from localStorage on mount
    const loadFromLocalStorage = () => {
        const storedData = localStorage.getItem('contractData');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    };

    const refreshData = async () => {
        await fetchDataFromAPI(); // Allow manual refresh or data update
    };

    // Hook to handle runtime data updates
    useEffect(() => {
        // Load from localStorage initially
        loadFromLocalStorage();

        // Fetch new data every X seconds to keep the app up-to-date
        const interval = setInterval(() => {
            fetchDataFromAPI();
        }, 1800000); // Set interval time (e.g., 30 minutes)

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return { data, refreshData, loading };
};

export default useContractData;
