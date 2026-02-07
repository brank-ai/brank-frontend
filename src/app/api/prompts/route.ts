import { NextRequest, NextResponse } from 'next/server';
import { PromptsResponse } from '@/types/backend';

export const dynamic = 'force-dynamic';

/**
 * Proxy endpoint for fetching paginated prompts from the backend
 * GET /api/prompts?brand_name=Samsung&page=1&per_page=10
 */
export async function GET(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Backend URL is not configured' },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const brandName = searchParams.get('brand_name');
  const website = searchParams.get('website');
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '10';

  if (!brandName && !website) {
    return NextResponse.json(
      { error: 'Missing brand_name or website parameter' },
      { status: 400 }
    );
  }

  try {
    const url = new URL('/metric/prompts', backendUrl);
    if (brandName) url.searchParams.set('brand_name', brandName);
    if (website) url.searchParams.set('website', website);
    url.searchParams.set('page', page);
    url.searchParams.set('per_page', perPage);

    const response = await fetch(url.toString(), {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 404) {
        return NextResponse.json(
          { error: 'Brand not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: `Backend returned ${status}: ${response.statusText}` },
        { status }
      );
    }

    const data: PromptsResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Prompts fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}
