import { getTickerTokenContracts } from '@/utils/googleSheets';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getTickerTokenContracts();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch contract data' }, { status: 500 });
  }
}
