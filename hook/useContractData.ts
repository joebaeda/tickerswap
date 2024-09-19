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
    const [error, setError] = useState<string | null>(null);

    // Fetch data from the API
    const fetchDataFromAPI = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/contractData');
            const result = await response.json();

            if (result.success) {
                setData(result.data);
                // Optionally save to localStorage
                localStorage.setItem('contractData', JSON.stringify(result.data));
            } else {
                setError('Failed to fetch contract data');
            }
        } catch (err) {
            setError('Error occurred while fetching contract data');
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
        await fetchDataFromAPI();
    };

    useEffect(() => {
        // Load from localStorage and fetch from API on mount
        loadFromLocalStorage();
        fetchDataFromAPI();
    }, []);

    return { data, refreshData, loading, error };
};

export default useContractData;
