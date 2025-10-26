import Link from 'next/link';
import { notFound } from 'next/navigation';
import ParticleBackground from '../../../components/ParticleBackground';

// Project data - in a real app, this would come from a database or API
const projects = {
  1: {
    title: 'E-Commerce Platform',
    description:
      'A modern, responsive e-commerce platform built with React and Node.js, featuring a clean user interface and seamless shopping experience.',
    longDescription:
      'This comprehensive e-commerce solution includes user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built with modern web technologies and best practices for performance and security.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Tailwind CSS'],
    features: [
      'User authentication and authorization',
      'Product catalog with search and filtering',
      'Shopping cart and checkout process',
      'Payment integration with Stripe',
      'Admin dashboard for inventory management',
      'Responsive design for all devices',
    ],
    demoUrl: 'https://demo-ecommerce.example.com',
    githubUrl: 'https://github.com/username/ecommerce-platform',
    category: 'Web Application',
    duration: '3 months',
  },
  2: {
    title: 'Task Management App',
    description:
      'A collaborative task management application designed for teams to organize, track, and complete projects efficiently.',
    longDescription:
      'This productivity tool helps teams stay organized with features like task assignment, progress tracking, deadline management, and team collaboration. Built with a focus on user experience and team productivity.',
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo', 'TypeScript'],
    features: [
      'Task creation and assignment',
      'Real-time collaboration',
      'Progress tracking and analytics',
      'Deadline reminders and notifications',
      'Team member management',
      'Cross-platform mobile support',
    ],
    demoUrl: 'https://demo-taskmanager.example.com',
    githubUrl: 'https://github.com/username/task-manager',
    category: 'Mobile App',
    duration: '2 months',
  },
  3: {
    title: 'Restaurant Website',
    description:
      'An elegant restaurant website showcasing menu, reservations, and dining experience with beautiful imagery and smooth interactions.',
    longDescription:
      'This restaurant website combines stunning visuals with practical functionality, including online menu browsing, reservation system, location information, and customer reviews. Designed to enhance the dining experience.',
    technologies: [
      'Next.js',
      'Sanity CMS',
      'Framer Motion',
      'Tailwind CSS',
      'Vercel',
    ],
    features: [
      'Interactive menu with categories',
      'Online reservation system',
      'Location and contact information',
      'Customer reviews and testimonials',
      'Photo gallery and virtual tour',
      'SEO optimized for local search',
    ],
    demoUrl: 'https://demo-restaurant.example.com',
    githubUrl: 'https://github.com/username/restaurant-website',
    category: 'Website',
    duration: '1 month',
  },
  4: {
    title: 'Weather Dashboard',
    description:
      'A comprehensive weather dashboard providing real-time weather data, forecasts, and interactive maps for multiple locations.',
    longDescription:
      'This weather application provides detailed meteorological information with beautiful data visualizations, interactive maps, and personalized weather alerts. Built with real-time data integration and responsive design.',
    technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Leaflet', 'PWA'],
    features: [
      'Real-time weather data',
      '7-day weather forecast',
      'Interactive weather maps',
      'Location-based weather alerts',
      'Historical weather data',
      'Progressive Web App features',
    ],
    demoUrl: 'https://demo-weather.example.com',
    githubUrl: 'https://github.com/username/weather-dashboard',
    category: 'Dashboard',
    duration: '1.5 months',
  },
  5: {
    title: 'Portfolio Website',
    description:
      'A creative portfolio website showcasing projects, skills, and professional experience with modern design and smooth animations.',
    longDescription:
      'This personal portfolio website demonstrates creative design skills and technical expertise. Features include project showcases, skill demonstrations, contact forms, and blog integration for sharing insights.',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'MDX', 'Vercel'],
    features: [
      'Project showcase with case studies',
      'Interactive skill demonstrations',
      'Contact form with email integration',
      'Blog section for articles',
      'Dark/light mode toggle',
      'Performance optimized',
    ],
    demoUrl: 'https://demo-portfolio.example.com',
    githubUrl: 'https://github.com/username/portfolio-website',
    category: 'Website',
    duration: '2 weeks',
  },
  6: {
    title: 'Social Media App',
    description:
      'A modern social media application connecting users through posts, messages, and community features with real-time updates.',
    longDescription:
      'This social platform enables users to share content, connect with friends, join communities, and engage through likes, comments, and direct messaging. Built with scalability and user engagement in mind.',
    technologies: ['React', 'Socket.io', 'Node.js', 'PostgreSQL', 'AWS'],
    features: [
      'User profiles and authentication',
      'Post creation and sharing',
      'Real-time messaging',
      'Community groups and forums',
      'Content moderation tools',
      'Mobile-responsive design',
    ],
    demoUrl: 'https://demo-social.example.com',
    githubUrl: 'https://github.com/username/social-media-app',
    category: 'Mobile App',
    duration: '4 months',
  },
};

export default async function ProjectDetail({ params }) {
  const { id } = await params;
  const project = projects[id];

  if (!project) {
    notFound();
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
              className="text-gray-900 font-medium transition-colors"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </nav>

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
            <div className="relative h-96 bg-gradient-to-br from-[var(--avocado-muted)] to-[var(--avocado-light)] rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🖼️</div>
                <p className="text-[var(--avocado-dark)] font-medium text-lg">
                  Project Screenshot
                </p>
                <p className="text-sm text-[var(--avocado-primary)] mt-2">
                  Replace with your project image
                </p>
              </div>
            </div>

            {/* Demo and GitHub buttons */}
            <div className="flex space-x-4">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[var(--avocado-primary)] text-white px-6 py-4 rounded-full font-medium hover:bg-[var(--avocado-dark)] transform hover:scale-105 transition-all duration-300 text-center"
              >
                🚀 View Demo
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border-2 border-[var(--avocado-primary)] text-[var(--avocado-primary)] px-6 py-4 rounded-full font-medium hover:bg-[var(--avocado-primary)] hover:text-white transform hover:scale-105 transition-all duration-300 text-center"
              >
                📁 View Code
              </a>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-[var(--avocado-primary)] text-white px-4 py-2 rounded-full text-sm font-medium">
                  {project.category}
                </span>
                <span className="text-gray-600">
                  Duration: {project.duration}
                </span>
              </div>
              <h1 className="text-4xl font-light text-gray-900 mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                About This Project
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

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

            <div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                Key Features
              </h3>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[var(--avocado-primary)] mr-3 mt-1">
                      ✓
                    </span>
                      <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
