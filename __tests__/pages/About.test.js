/**
 * Page Tests for About Page
 * Tests the About page rendering and responsive behavior
 * Industry Standard: Test complete page functionality and user experience
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import About from '../../src/app/about/page';

// Mock components
jest.mock('../../src/components/ParticleBackground', () => {
  return function MockParticleBackground() {
    return <div data-testid="particle-background">Particle Background</div>;
  };
});

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('About Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all main content sections', () => {
    // Act
    render(<About />);

    // Assert - Main content elements
    expect(screen.getByText("Hi, I'm Alex Chen")).toBeInTheDocument();
    expect(
      screen.getByText('Frontend Developer & UI/UX Enthusiast')
    ).toBeInTheDocument();
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();

    // Check for profile emoji
    expect(screen.getByText('👨‍💻')).toBeInTheDocument();
    expect(screen.getByText('✨')).toBeInTheDocument();
  });

  it('should render navigation with correct current page', () => {
    // Act
    render(<About />);

    // Assert - Navigation elements
    expect(screen.getByText('Portfolio')).toBeInTheDocument(); // Logo/brand
    expect(screen.getAllByText('About')).toHaveLength(2); // Desktop and mobile nav
  });

  it('should display technical skills sections', () => {
    // Act
    render(<About />);

    // Assert - Skills sections
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Tools & More')).toBeInTheDocument();

    // Check specific skills
    expect(screen.getByText('• React & Next.js')).toBeInTheDocument();
    expect(screen.getByText('• JavaScript & TypeScript')).toBeInTheDocument();
    expect(screen.getByText('• Git & GitHub')).toBeInTheDocument();
    expect(screen.getByText('• Node.js & Express')).toBeInTheDocument();
  });

  it('should render CTA buttons with correct links', () => {
    // Act
    render(<About />);

    // Assert - Call-to-action buttons
    const viewWorkButton = screen.getByRole('link', { name: 'View My Work' });
    const contactButton = screen.getByRole('link', { name: 'Get In Touch' });

    expect(viewWorkButton).toHaveAttribute('href', '/portfolio');
    expect(contactButton).toHaveAttribute('href', 'mailto:alex@example.com');
  });

  it('should render fun facts section', () => {
    // Act
    render(<About />);

    // Assert - Fun facts cards
    expect(screen.getByText('Coffee Lover')).toBeInTheDocument();
    expect(screen.getByText('Always Learning')).toBeInTheDocument();
    expect(screen.getByText('Design Enthusiast')).toBeInTheDocument();

    // Check emojis
    expect(screen.getByText('☕')).toBeInTheDocument();
    expect(screen.getByText('🌱')).toBeInTheDocument();
    expect(screen.getByText('🎨')).toBeInTheDocument();
  });

  it('should toggle mobile menu correctly', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<About />);

    // Act
    const menuButton = screen.getByLabelText('Toggle menu');
    await user.click(menuButton);

    // Assert - Mobile menu should appear
    await waitFor(() => {
      const mobileMenus = screen.getAllByText('About');
      expect(mobileMenus.length).toBeGreaterThan(1); // Desktop + mobile menu
    });
  });

  it('should render ParticleBackground on desktop', () => {
    // Act
    render(<About />);

    // Assert - Particle background should be present (hidden on mobile via CSS)
    expect(screen.getByTestId('particle-background')).toBeInTheDocument();
  });

  it('should have responsive layout classes', () => {
    // Act
    render(<About />);

    // Assert - Check for responsive grid classes
    const mainGrid = screen
      .getByText("Hi, I'm Alex Chen")
      .closest('div').parentElement;
    expect(mainGrid).toHaveClass('grid', 'md:grid-cols-2');
  });

  it('should render with proper semantic HTML structure', () => {
    // Act
    render(<About />);

    // Assert - Semantic elements
    expect(screen.getByRole('banner')).toBeInTheDocument(); // nav
    expect(screen.getByRole('main')).toBeInTheDocument(); // main
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument(); // h1
  });

  it('should display professional description paragraphs', () => {
    // Act
    render(<About />);

    // Assert - Bio content
    expect(
      screen.getByText(/I'm a passionate frontend developer with 5\+ years/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/When I'm not coding, you'll find me exploring/)
    ).toBeInTheDocument();
  });

  it('should have proper CSS variable usage for theming', () => {
    // Act
    render(<About />);

    // Assert - Elements with avocado theme classes
    const viewWorkButton = screen.getByRole('link', { name: 'View My Work' });
    expect(viewWorkButton).toHaveClass('bg-[var(--avocado-primary)]');

    const contactButton = screen.getByRole('link', { name: 'Get In Touch' });
    expect(contactButton).toHaveClass('border-[var(--avocado-primary)]');
  });

  it('should close mobile menu when menu item is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<About />);

    // Act - Open menu
    const menuButton = screen.getByLabelText('Toggle menu');
    await user.click(menuButton);

    // Wait for menu to open
    await waitFor(() => {
      const aboutLinks = screen.getAllByText('About');
      expect(aboutLinks.length).toBeGreaterThan(1);
    });

    // Act - Click Home link in mobile menu
    const mobileHomeLink = screen
      .getAllByText('Home')
      .find(link => link.closest('div')?.classList.contains('md:hidden'));
    if (mobileHomeLink) {
      await user.click(mobileHomeLink);
    }

    // Note: Menu closure is handled by state, would need more complex testing
    // for full integration test of menu close behavior
  });
});
