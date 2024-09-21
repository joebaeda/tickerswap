import { saveTickerTokenContracts } from '@/utils/googleSheets';
import { NextRequest, NextResponse } from 'next/server';

interface TokenContract {
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
    deployedTime: string;
}

export async function POST(request: NextRequest) {
    try {
        // Parse the request body to get tokenInfo
        const tokenInfo: TokenContract = await request.json();

        // Ensure the received data matches the TokenContract interface
        if (!tokenInfo || typeof tokenInfo !== 'object') {
            return NextResponse.json({ success: false, error: 'Invalid data format' }, { status: 400 });
        }

        // Call the function to save the data to Google Sheets
        await saveTickerTokenContracts(tokenInfo);

        // Return success response
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving token contracts:', error);

        // Return error response
        return NextResponse.json(
            { success: false, error: 'Failed to save contract data' },
            { status: 500 }
        );
    }
}
