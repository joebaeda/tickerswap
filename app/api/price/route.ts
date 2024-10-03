import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const nativeCoinPriceId = searchParams.get('id');

    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${nativeCoinPriceId}&vs_currencies=usd`);
        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch token price' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching token price' }, { status: 500 });
    }
}
