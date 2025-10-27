import Link from 'next/link';
import { notFound } from 'next/navigation';
import ParticleBackground from '../../../components/ParticleBackground';
import ResponsiveNavigation from '../../../components/ResponsiveNavigation';

async function getProject(id) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/projects/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch project ${id}: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }
}

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen relative">
      {/* Particle background */}
      <ParticleBackground />

      {/* Responsive Navigation */}
      <ResponsiveNavigation currentPage="/portfolio" />

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Back button */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-[var(--avocado-primary)] hover:text-[var(--avocado-dark)] transition-colors mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
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
          Back to Portfolio
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Project Image */}
          <div className="space-y-6">
            <div className="relative h-96 bg-gradient-to-br from-[var(--avocado-muted)] to-[var(--avocado-light)] rounded-2xl flex items-center justify-center overflow-hidden">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="text-8xl mb-4">🖼️</div>
                  <p className="text-[var(--avocado-dark)] font-medium text-lg">
                    {project.title}
                  </p>
                </div>
              )}
            </div>

            {/* Demo and GitHub buttons */}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex space-x-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[var(--avocado-primary)] text-white px-6 py-4 rounded-full font-medium hover:bg-[var(--avocado-dark)] transform hover:scale-105 transition-all duration-300 text-center"
                  >
                    🚀 View Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-[var(--avocado-primary)] text-[var(--avocado-primary)] px-6 py-4 rounded-full font-medium hover:bg-[var(--avocado-primary)] hover:text-white transform hover:scale-105 transition-all duration-300 text-center"
                  >
                    📁 View Code
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-[var(--avocado-primary)] text-white px-4 py-2 rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl font-light text-gray-900 mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.longDescription && (
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  About This Project
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-[var(--avocado-muted)] text-[var(--avocado-dark)] px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[var(--avocado-primary)] mr-3 mt-1 text-xl">
                        ✓
                      </span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
