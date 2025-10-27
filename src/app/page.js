'use client';

import { useState } from 'react';
import Link from 'next/link';
import ParticleBackground from '../components/ParticleBackground';

export default function Home() {
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
            <div className="text-xl md:text-2xl font-bold text-gray-800">
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
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
                  className="block px-4 py-2 text-gray-700 hover:bg-[var(--avocado-muted)] hover:text-gray-900 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-gray-700 hover:bg-[var(--avocado-muted)] hover:text-gray-900"
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
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-140px)] md:min-h-[calc(100vh-120px)] px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-gray-900 mb-6 md:mb-8 leading-tight">
            Welcome to My
            <span className="block text-gray-600 font-normal mt-2">
              Digital Space
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-12 max-w-xl md:max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
            This is a portfolio page for a front-end developer who creates
            beautiful, functional, and user-friendly web experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center items-center px-4 md:px-0">
            <Link
              href="/about"
              className="w-full sm:w-auto inline-block bg-[var(--avocado-primary)] text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium hover:bg-[var(--avocado-dark)] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
            >
              Learn About Me
            </Link>
            <Link
              href="/portfolio"
              className="w-full sm:w-auto inline-block border-2 border-[var(--avocado-primary)] text-[var(--avocado-primary)] px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-medium hover:bg-[var(--avocado-primary)] hover:text-white transform hover:scale-105 transition-all duration-300 text-center"
            >
              View My Work
            </Link>
          </div>
        </div>
      </main>

      {/* Floating elements for visual interest - desktop only */}
      <div className="hidden lg:block absolute top-1/4 left-10 w-4 h-4 bg-[var(--avocado-light)] rounded-full opacity-60 animate-pulse"></div>
      <div className="hidden lg:block absolute top-1/3 right-20 w-6 h-6 bg-[var(--avocado-primary)] rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="hidden lg:block absolute bottom-1/4 left-1/4 w-3 h-3 bg-[var(--avocado-light)] rounded-full opacity-50 animate-pulse delay-2000"></div>
    </div>
  );
}
