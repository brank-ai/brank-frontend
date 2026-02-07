import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface BrandInsightRequestBody {
  brand_name: string;
  email: string;
}

/**
 * Proxy endpoint for submitting a brand insight request
 * POST /api/brand-insight-request
 * Body: { brand_name: string, email: string }
 */
export async function POST(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Backend URL is not configured' },
      { status: 500 }
    );
  }

  try {
    const body: BrandInsightRequestBody = await request.json();

    if (!body.brand_name || !body.email) {
      return NextResponse.json(
        { error: 'Missing brand_name or email' },
        { status: 400 }
      );
    }

    const url = new URL('/brand-insight-request', backendUrl);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brand_name: body.brand_name,
        email: body.email,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 400) {
        return NextResponse.json(
          { error: 'Missing brand_name or email' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: `Backend returned ${status}: ${response.statusText}` },
        { status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Brand insight request error:', error);
    return NextResponse.json(
      { error: 'Failed to submit brand insight request' },
      { status: 500 }
    );
  }
}
