import { BackendMetricResponse } from '@/types/backend';

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
      cache: 'no-store', // Always fetch fresh data
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

