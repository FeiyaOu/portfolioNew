import Link from 'next/link';
import ParticleBackground from '../../components/ParticleBackground';
import ResponsiveNavigation from '../../components/ResponsiveNavigation';

async function getProjects() {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/projects?published=true`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen relative">
      {/* Particle background - will auto-hide on mobile */}
      <ParticleBackground />

      {/* Responsive Navigation */}
      <ResponsiveNavigation currentPage="/portfolio" />

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4 md:mb-6">
            My Work
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl md:max-w-2xl mx-auto px-4 md:px-0">
            A collection of projects that showcase my passion for creating
            beautiful and functional digital experiences.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <div className="text-5xl md:text-6xl mb-4">💼</div>
            <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-4">
              No projects yet
            </h3>
            <p className="text-gray-600 px-4 md:px-0">
              Check back soon for new projects!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map(project => (
              <Link
                key={project.id}
                href={`/portfolio/${project.id}`}
                className="group block"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  {/* Project Image Placeholder */}
                  <div className="relative h-64 bg-gradient-to-br from-[var(--avocado-muted)] to-[var(--avocado-light)] flex items-center justify-center overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-6xl mb-4">🖼️</div>
                        <p className="text-[var(--avocado-dark)] font-medium">
                          {project.title}
                        </p>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-[var(--avocado-primary)] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex items-center text-[var(--avocado-primary)] font-medium">
                      <span>View Details</span>
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
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-[var(--avocado-muted)] rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              Interested in working together?
            </h3>
            <p className="text-gray-600 mb-6">
              I&apos;m always excited to take on new challenges and create
              amazing digital experiences.
            </p>
            <a
              href="mailto:alex@example.com"
              className="inline-block bg-[var(--avocado-primary)] text-white px-8 py-3 rounded-full font-medium hover:bg-[var(--avocado-dark)] transform hover:scale-105 transition-all duration-300"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
