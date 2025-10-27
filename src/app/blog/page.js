import Link from 'next/link';
import ParticleBackground from '../../components/ParticleBackground';
import ResponsiveNavigation from '../../components/ResponsiveNavigation';

async function getBlogPosts() {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blog?published=true`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen relative">
      {/* Particle background - will auto-hide on mobile */}
      <ParticleBackground />

      {/* Responsive Navigation */}
      <ResponsiveNavigation currentPage="/blog" />

      {/* Main content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-6">My Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, technology,
            and the creative process.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              No blog posts yet
            </h3>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 h-full">
                  {/* Blog Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[var(--avocado-muted)] to-[var(--avocado-light)] flex items-center justify-center">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl mb-2">📝</div>
                        <p className="text-[var(--avocado-dark)] font-medium">
                          Blog Post
                        </p>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-[var(--avocado-primary)] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.readTime} min read
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-auto">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>By {post.author}</span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-[var(--avocado-muted)] text-[var(--avocado-dark)] px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center text-[var(--avocado-primary)] font-medium">
                        <span>Read More</span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-[var(--avocado-muted)] rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6">
              Follow along for the latest posts about web development, design,
              and technology insights.
            </p>
            <a
              href="mailto:alex@example.com"
              className="inline-block bg-[var(--avocado-primary)] text-white px-8 py-3 rounded-full font-medium hover:bg-[var(--avocado-dark)] transform hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
