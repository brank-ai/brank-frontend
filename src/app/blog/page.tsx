import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BlogListingGrid } from '@/components/blog';
import { getAllPosts, getAllTags } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on AI brand visibility, LLM optimization, and how AI recommends brands. Learn strategies to improve your brand presence in ChatGPT, Gemini, and other AI models.',
  alternates: {
    canonical: 'https://www.brank.ai/blog',
  },
  openGraph: {
    title: 'Blog | Brank.AI',
    description:
      'Insights on AI brand visibility, LLM optimization, and how AI recommends brands.',
    url: 'https://www.brank.ai/blog',
    type: 'website',
    siteName: 'Brank.AI',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@brank_ai',
    title: 'Blog | Brank.AI',
    description:
      'Insights on AI brand visibility, LLM optimization, and how AI recommends brands.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-bg-base">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <h1 className="text-text-primary text-3xl sm:text-4xl md:text-5xl font-semibold mb-2 tracking-tight">
          Blog
        </h1>
        <p className="text-text-muted text-sm sm:text-base mb-8 sm:mb-12">
          Insights on AI brand visibility and optimization.
        </p>
        <BlogListingGrid posts={posts} tags={tags} />
      </main>
      <Footer />
    </div>
  );
}
