import Link from 'next/link';
import Image from 'next/image';
import ParticleBackground from '../../components/ParticleBackground';

export default function About() {
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
              className="text-gray-900 font-medium transition-colors"
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
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="text-center">
            <div className="relative w-80 h-80 mx-auto mb-8">
              <div className="w-full h-full bg-[var(--avocado-muted)] rounded-full flex items-center justify-center border-4 border-[var(--avocado-light)]">
                <div className="text-6xl text-[var(--avocado-primary)]">👨‍💻</div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[var(--avocado-primary)] rounded-full flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-light text-gray-900 mb-4">
                Hi, I&apos;m Alex Chen
              </h1>
              <p className="text-2xl text-gray-600 font-medium">
                Frontend Developer & UI/UX Enthusiast
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                I&apos;m a passionate frontend developer with 5+ years of
                experience creating beautiful, responsive, and user-friendly web
                applications. I believe in the power of clean code, thoughtful
                design, and seamless user experiences.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, or enjoying
                a good cup of coffee while sketching out my next big idea.
              </p>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-medium text-gray-900">
                Technical Skills
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">
                    Frontend
                  </h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• React & Next.js</li>
                    <li>• JavaScript & TypeScript</li>
                    <li>• HTML5 & CSS3</li>
                    <li>• Tailwind CSS</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">
                    Tools & More
                  </h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Git & GitHub</li>
                    <li>• Figma & Adobe XD</li>
                    <li>• Node.js & Express</li>
                    <li>• MongoDB & Firebase</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex space-x-4 pt-6">
              <Link
                href="/portfolio"
                className="bg-[var(--avocado-primary)] text-white px-6 py-3 rounded-full font-medium hover:bg-[var(--avocado-dark)] transform hover:scale-105 transition-all duration-300"
              >
                View My Work
              </Link>
              <a
                href="mailto:alex@example.com"
                className="border-2 border-[var(--avocado-primary)] text-[var(--avocado-primary)] px-6 py-3 rounded-full font-medium hover:bg-[var(--avocado-primary)] hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-[var(--avocado-muted)] rounded-2xl">
            <div className="text-4xl mb-4">☕</div>
            <h4 className="text-xl font-medium text-gray-900 mb-2">
              Coffee Lover
            </h4>
            <p className="text-gray-600">
              Fueled by caffeine and creativity
            </p>
          </div>
          <div className="text-center p-6 bg-[var(--avocado-muted)] rounded-2xl">
            <div className="text-4xl mb-4">🌱</div>
            <h4 className="text-xl font-medium text-gray-900 mb-2">
              Always Learning
            </h4>
            <p className="text-gray-600">
              Constantly exploring new technologies
            </p>
          </div>
          <div className="text-center p-6 bg-[var(--avocado-muted)] rounded-2xl">
            <div className="text-4xl mb-4">🎨</div>
            <h4 className="text-xl font-medium text-gray-900 mb-2">
              Design Enthusiast
            </h4>
            <p className="text-gray-600">
              Passionate about beautiful interfaces
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
