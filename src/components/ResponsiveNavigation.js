'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResponsiveNavigation({ currentPage = '' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
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
            {navigationItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  currentPage === href
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            ))}
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
              {navigationItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`block px-4 py-2 transition-colors ${
                    currentPage === href
                      ? 'text-gray-900 bg-[var(--avocado-muted)] font-medium'
                      : 'text-gray-700 hover:bg-[var(--avocado-muted)] hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
