import { google } from 'googleapis';
import { getGoogleAuth } from './googleAuth';

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
  timestamp: string;
}

export async function getTickerTokenContracts(): Promise<TokenContract[]> {
  const auth = getGoogleAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID!,
    range: "Sheet1!A:N",
  });

  const rows = response.data.values;
  if (rows && rows.length) {
    // Map rows to an array of objects based on the TokenContract interface
    return rows.map(row => ({
      tokenAddress: row[0],
      tokenName: row[1],
      tokenSymbol: row[2],
      tokenDescription: row[3],
      tokenLogoUrls: row[4],
      tokenChainName: row[5],
      tokenChainId: row[6],
      tokenChainHex: row[7],
      tokenChainLogoUrls: row[8],
      tokenChainCurrency: row[9],
      tokenChainRPCUrls: row[10],
      tokenChainExplorerUrls: row[11],
      deployer: row[12],
      timestamp: row[13],
    })) as TokenContract[];
  }

  return [];
}
