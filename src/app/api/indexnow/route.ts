import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = '2beebb0f7fc64b5298064339aec73854';
const SITE_HOST = 'www.brank.ai';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls } = body as { urls?: string[] };

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'urls array is required' },
        { status: 400 }
      );
    }

    // IndexNow supports batch submission via POST
    const payload = {
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls.map((url) =>
        url.startsWith('http') ? url : `https://${SITE_HOST}${url}`
      ),
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // IndexNow returns 200 for success, 202 for accepted
    if (response.ok || response.status === 202) {
      return NextResponse.json({
        success: true,
        submitted: payload.urlList.length,
        urls: payload.urlList,
      });
    }

    const errorText = await response.text();
    return NextResponse.json(
      { error: 'IndexNow API error', status: response.status, detail: errorText },
      { status: response.status }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to notify IndexNow', detail: String(error) },
      { status: 500 }
    );
  }
}
