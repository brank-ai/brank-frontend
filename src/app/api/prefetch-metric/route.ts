import { NextRequest, NextResponse } from 'next/server';
import { getMetrics } from '@/lib/backend';

// Mark this route as dynamic to prevent static optimization during build
export const dynamic = 'force-dynamic';

/**
 * Prefetch endpoint to warm backend cache before user reaches analytics page
 * This is a fire-and-forget request from the Hero form submission
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const website = searchParams.get('website');

    if (!website) {
      return NextResponse.json(
        { error: 'Missing website parameter' },
        { status: 400 }
      );
    }

    // Fetch metrics to warm cache (fire-and-forget, best-effort)
    await getMetrics(website);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Silently fail - this is just a cache warmup
    console.error('Prefetch failed (non-critical):', error);
    return new NextResponse(null, { status: 204 });
  }
}

