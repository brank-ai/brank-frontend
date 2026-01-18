import { BackendMetricResponse, LandingPageResponse } from '@/types/backend';

/**
 * Maps frontend brand display names to backend API keys
 */
export const BRAND_KEY_MAP: Record<string, string> = {
  'Asics': 'asics',
  'Coinbase': 'coinbase',
  'Cult': 'cult.fit',
  'Decathlon': 'decathlon',
  'LeetCode': 'leetcode',
  'Nothing': 'nothing',
  'Zerodha': 'zerodha',
};

/**
 * Get metrics for a brand from the backend API
 * @param website - The brand name/website to query
 * @returns Backend metric response
 * @throws Error if BACKEND_URL is not configured or fetch fails
 */
export async function getMetrics(website: string): Promise<BackendMetricResponse> {
  const backendUrl = process.env.BACKEND_URL;
  
  if (!backendUrl) {
    throw new Error('BACKEND_URL environment variable is not configured');
  }

  const url = new URL('/metric', backendUrl);
  url.searchParams.set('website', website);

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 300 }, // Cache for 5 minutes to support prefetching
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend API returned ${response.status}: ${response.statusText}`);
    }

    const data: BackendMetricResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch metrics: ${error.message}`);
    }
    throw new Error('Failed to fetch metrics: Unknown error');
  }
}

/**
 * Get landing page brand data from the backend API
 * @returns Landing page response with brand percentages
 * @throws Error if BACKEND_URL is not configured or fetch fails
 */
export async function getLandingPageData(): Promise<LandingPageResponse> {
  const backendUrl = process.env.BACKEND_URL;
  
  if (!backendUrl) {
    throw new Error('BACKEND_URL environment variable is not configured');
  }

  const url = new URL('/metrics/landingPage', backendUrl);

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend API returned ${response.status}: ${response.statusText}`);
    }

    const data: LandingPageResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch landing page data: ${error.message}`);
    }
    throw new Error('Failed to fetch landing page data: Unknown error');
  }
}

