import Link from 'next/link';
import ParticleBackground from '../../../components/ParticleBackground';

async function getBlogPost(slug) {
  try {
    // First, get all posts to find the one with matching slug
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blog?published=true`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    const posts = await res.json();
    const post = posts.find(p => p.slug === slug);
    
    if (!post) {
      return null;
    }
    
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return (
      <div className="min-h-screen relative">
        <ParticleBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Blog post not found</p>
            <Link
              href="/blog"
              className="inline-block bg-[var(--avocado-primary)] text-white px-8 py-3 rounded-full font-medium hover:bg-[var(--avocado-dark)] transform hover:scale-105 transition-all duration-300"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Particle background */}
      <ParticleBackground />

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800"
          >
            Portfolio
          </Link>
          <div className="space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              className="text-gray-900 font-medium transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-[var(--avocado-primary)] hover:text-[var(--avocado-dark)] transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Blog post header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
            <div className="flex items-center">
              <span className="font-medium">By {post.author}</span>
            </div>
            <div className="flex items-center">
              <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center">
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[var(--avocado-muted)] text-[var(--avocado-dark)] px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {post.imageUrl && (
            <div className="mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}
        </header>

        {/* Blog post content */}
        <article 
          className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-img:rounded-xl prose-img:shadow-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Blog post footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Written by {post.author}
              </h3>
              <p className="text-gray-600">
                Published on {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a
                href="mailto:alex@example.com"
                className="inline-block bg-[var(--avocado-primary)] text-white px-6 py-2 rounded-full font-medium hover:bg-[var(--avocado-dark)] transform hover:scale-105 transition-all duration-300"
              >
                Contact Author
              </a>
              <Link
                href="/blog"
                className="inline-block border-2 border-[var(--avocado-primary)] text-[var(--avocado-primary)] px-6 py-2 rounded-full font-medium hover:bg-[var(--avocado-primary)] hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                More Posts
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
