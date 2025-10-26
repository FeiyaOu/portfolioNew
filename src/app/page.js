import Link from 'next/link';
import ParticleBackground from '../components/ParticleBackground';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Particle background */}
      <ParticleBackground />

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Portfolio</div>
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
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 leading-tight">
            Welcome to My
            <span className="block text-gray-600 font-normal">
              Digital Space
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            This is a portfolio page for a front-end developer who creates
            beautiful, functional, and user-friendly web experiences.
          </p>

          <div className="space-x-4">
            <Link
              href="/about"
              className="inline-block bg-[var(--avocado-primary)] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[var(--avocado-dark)] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Learn About Me
            </Link>
            <Link
              href="/portfolio"
              className="inline-block border-2 border-[var(--avocado-primary)] text-[var(--avocado-primary)] px-8 py-4 rounded-full text-lg font-medium hover:bg-[var(--avocado-primary)] hover:text-white transform hover:scale-105 transition-all duration-300"
            >
              View My Work
            </Link>
          </div>
        </div>
      </main>

      {/* Floating elements for visual interest */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-[var(--avocado-light)] rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-6 h-6 bg-[var(--avocado-primary)] rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-[var(--avocado-light)] rounded-full opacity-50 animate-pulse delay-2000"></div>
    </div>
  );
}
