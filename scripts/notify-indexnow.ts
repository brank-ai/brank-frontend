/**
 * IndexNow Notification Script
 *
 * Run after deploying to notify search engines about new/updated pages.
 *
 * Usage:
 *   npx tsx scripts/notify-indexnow.ts                # Submit all pages
 *   npx tsx scripts/notify-indexnow.ts /blog/my-post  # Submit specific URLs
 */

const INDEXNOW_KEY = '2beebb0f7fc64b5298064339aec73854';
const SITE_HOST = 'www.brank.ai';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

// All important pages on the site
const ALL_PAGES = [
  '/',
  '/blog',
  '/pricing',
];

async function getBlogSlugs(): Promise<string[]> {
  // Dynamic import of blog data to get all post slugs
  const { blogData } = await import('../src/constants/blogData');
  return blogData.posts.map((post) => `/blog/${post.slug}`);
}

async function submitToIndexNow(urls: string[]) {
  const fullUrls = urls.map((url) =>
    url.startsWith('http') ? url : `https://${SITE_HOST}${url}`
  );

  console.log(`Submitting ${fullUrls.length} URLs to IndexNow...`);
  fullUrls.forEach((url) => console.log(`  - ${url}`));

  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: fullUrls,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok || response.status === 202) {
    console.log(`\nSuccess! ${fullUrls.length} URLs submitted to IndexNow.`);
  } else {
    const errorText = await response.text();
    console.error(`\nFailed: ${response.status} - ${errorText}`);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    // Submit specific URLs passed as arguments
    await submitToIndexNow(args);
  } else {
    // Submit all pages + all blog posts
    const blogSlugs = await getBlogSlugs();
    const allUrls = [...ALL_PAGES, ...blogSlugs];
    await submitToIndexNow(allUrls);
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
