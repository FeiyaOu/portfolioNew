import Link from 'next/link';
import ParticleBackground from '../../components/ParticleBackground';

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern online shopping experience',
      image: '/api/placeholder/400/300',
      category: 'Web Application',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Productivity tool for teams',
      image: '/api/placeholder/400/300',
      category: 'Mobile App',
    },
    {
      id: 3,
      title: 'Restaurant Website',
      description: 'Beautiful dining experience online',
      image: '/api/placeholder/400/300',
      category: 'Website',
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'Real-time weather information',
      image: '/api/placeholder/400/300',
      category: 'Dashboard',
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Creative showcase platform',
      image: '/api/placeholder/400/300',
      category: 'Website',
    },
    {
      id: 6,
      title: 'Social Media App',
      description: 'Connect and share with friends',
      image: '/api/placeholder/400/300',
      category: 'Mobile App',
    },
  ];

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
              className="text-gray-900 font-medium transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-6">
            My Work
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of projects that showcase my passion for creating
            beautiful and functional digital experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                {/* Project Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-[var(--avocado-muted)] to-[var(--avocado-light)] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🖼️</div>
                    <p className="text-[var(--avocado-dark)] font-medium">
                      Project Image {project.id}
                    </p>
                    <p className="text-sm text-[var(--avocado-primary)] mt-2">
                      Click to replace with your image
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-[var(--avocado-primary)] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
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
