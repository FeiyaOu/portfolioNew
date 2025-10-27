'use client';

import { useState } from 'react';
import Link from 'next/link';
import ParticleBackground from '../../components/ParticleBackground';

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Particle background - only on desktop */}
      <div className="hidden md:block">
        <ParticleBackground />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold text-gray-800"
            >
              Portfolio
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--avocado-primary)]"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="py-2">
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-[var(--avocado-muted)] hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-gray-900 bg-[var(--avocado-muted)] font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/portfolio"
                  className="block px-4 py-2 text-gray-700 hover:bg-[var(--avocado-muted)] hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  href="/blog"
                  className="block px-4 py-2 text-gray-700 hover:bg-[var(--avocado-muted)] hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 md:items-start">
          {/* Profile Image */}
          <div className="text-center md:text-left order-1 md:order-1">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0 mb-6 md:mb-8">
              <div className="w-full h-full bg-[var(--avocado-muted)] rounded-full flex items-center justify-center border-4 border-[var(--avocado-light)]">
                <div className="text-5xl md:text-6xl text-[var(--avocado-primary)]">
                  👨‍💻
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-20 md:h-20 bg-[var(--avocado-primary)] rounded-full flex items-center justify-center">
                <span className="text-xl md:text-2xl">✨</span>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6 md:space-y-8 order-2 md:order-2">
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-3 md:mb-4 leading-tight">
                Hi, I&apos;m Alex Chen
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium">
                Frontend Developer & UI/UX Enthusiast
              </p>
            </div>
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                I&apos;m a passionate frontend developer with 5+ years of
                experience creating beautiful, responsive, and user-friendly web
                applications. I believe in the power of clean code, thoughtful
                design, and seamless user experiences.
              </p>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, or enjoying
                a good cup of coffee while sketching out my next big idea.
              </p>
            </div>
            {/* Skills Section */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-medium text-gray-900 text-center md:text-left">
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700 text-center sm:text-left">
                    Frontend
                  </h4>
                  <ul className="text-gray-600 space-y-1 text-center sm:text-left">
                    <li>• React & Next.js</li>
                    <li>• JavaScript & TypeScript</li>
                    <li>• HTML5 & CSS3</li>
                    <li>• Tailwind CSS</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700 text-center sm:text-left">
                    Tools & More
                  </h4>
                  <ul className="text-gray-600 space-y-1 text-center sm:text-left">
                    <li>• Git & GitHub</li>
                    <li>• Figma & Adobe XD</li>
                    <li>• Node.js & Express</li>
                    <li>• MongoDB & Firebase</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 pt-4 md:pt-6 justify-center md:justify-start">
              <Link
                href="/portfolio"
                className="w-full sm:w-auto text-center bg-[var(--avocado-primary)] text-white px-6 py-3 rounded-full font-medium hover:bg-[var(--avocado-dark)] transform hover:scale-105 transition-all duration-300"
              >
                View My Work
              </Link>
              <a
                href="mailto:alex@example.com"
                className="w-full sm:w-auto text-center border-2 border-[var(--avocado-primary)] text-[var(--avocado-primary)] px-6 py-3 rounded-full font-medium hover:bg-[var(--avocado-primary)] hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>{' '}
            {/* Skills Section */}
            {/* <div className="space-y-4">
              <h3 className="text-2xl font-medium text-gray-900">
                Technical Skills
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Frontend</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• React & Next.js</li>
                    <li>• JavaScript & TypeScript</li>
                    <li>• HTML5 & CSS3</li>
                    <li>• Tailwind CSS</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Tools & More</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Git & GitHub</li>
                    <li>• Figma & Adobe XD</li>
                    <li>• Node.js & Express</li>
                    <li>• MongoDB & Firebase</li>
                  </ul>
                </div>
              </div>
            </div> */}
            {/* CTA Buttons */}
            {/* <div className="flex space-x-4 pt-6">
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
            </div> */}
          </div>
        </div>

        {/* Fun Facts Section */}
        {/* Fun Facts Section */}
        <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          <div className="text-center p-4 md:p-6 bg-[var(--avocado-muted)] rounded-2xl">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">☕</div>
            <h4 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
              Coffee Lover
            </h4>
            <p className="text-sm md:text-base text-gray-600">
              Fueled by caffeine and creativity
            </p>
          </div>
          <div className="text-center p-4 md:p-6 bg-[var(--avocado-muted)] rounded-2xl">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">🌱</div>
            <h4 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
              Always Learning
            </h4>
            <p className="text-sm md:text-base text-gray-600">
              Constantly exploring new technologies
            </p>
          </div>
          <div className="text-center p-4 md:p-6 bg-[var(--avocado-muted)] rounded-2xl sm:col-span-2 md:col-span-1">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">🎨</div>
            <h4 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
              Design Enthusiast
            </h4>
            <p className="text-sm md:text-base text-gray-600">
              Passionate about beautiful interfaces
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
