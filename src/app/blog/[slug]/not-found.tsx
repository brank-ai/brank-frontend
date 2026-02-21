import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="text-text-primary text-4xl sm:text-5xl font-semibold mb-4 tracking-tight">
          Post not found
        </h1>
        <p className="text-text-muted text-base sm:text-lg mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-accent-success hover:text-brand-blue-400 transition-colors duration-200 text-sm font-medium"
        >
          &larr; Back to blog
        </Link>
      </main>
      <Footer />
    </div>
  );
}
