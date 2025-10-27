/**
 * Component Tests for ResponsiveNavigation
 * Tests responsive navigation behavior and user interactions
 * Industry Standard: Test user-facing components for accessibility and behavior
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResponsiveNavigation from '../../src/components/ResponsiveNavigation';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('ResponsiveNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render brand logo and desktop navigation links', () => {
    // Act
    render(<ResponsiveNavigation currentPage="/" />);

    // Assert
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument(); // This appears twice - brand + nav
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('should highlight the current page correctly', () => {
    // Act
    render(<ResponsiveNavigation currentPage="/about" />);

    // Assert
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toHaveClass('text-gray-900', 'font-medium');
  });

  it('should show hamburger menu button on mobile', () => {
    // Act
    render(<ResponsiveNavigation currentPage="home" />);

    // Assert
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass('md:hidden'); // Only visible on mobile
  });

  it('should toggle mobile menu when hamburger button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<ResponsiveNavigation currentPage="/" />);

    // Act
    const menuButton = screen.getByLabelText('Toggle menu');
    await user.click(menuButton);

    // Assert - Mobile menu should appear
    await waitFor(() => {
      const mobileMenu = screen.getByText((content, element) => {
        return element?.className?.includes('md:hidden mt-4 bg-white');
      });
      expect(mobileMenu).toBeInTheDocument();
    });

    // Act - Click again to close
    await user.click(menuButton);

    // Assert - Mobile menu should disappear
    await waitFor(() => {
      const mobileMenu = screen.queryByText((content, element) => {
        return element?.className?.includes('md:hidden mt-4 bg-white');
      });
      expect(mobileMenu).not.toBeInTheDocument();
    });
  });

  it('should close mobile menu when a link is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<ResponsiveNavigation currentPage="/" />);

    // Act - Open menu
    const menuButton = screen.getByLabelText('Toggle menu');
    await user.click(menuButton);

    // Wait for menu to open
    await waitFor(() => {
      const mobileMenu = screen.getByText((content, element) => {
        return element?.className?.includes('md:hidden mt-4 bg-white');
      });
      expect(mobileMenu).toBeInTheDocument();
    });

    // Act - Click a menu item (get all About links and find the mobile one)
    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    const mobileAboutLink = aboutLinks.find(link =>
      link.className.includes('block px-4 py-2')
    );
    expect(mobileAboutLink).toBeInTheDocument();
    await user.click(mobileAboutLink);

    // Assert - Menu should close
    await waitFor(() => {
      const mobileMenu = screen.queryByText((content, element) => {
        return element?.className?.includes('md:hidden mt-4 bg-white');
      });
      expect(mobileMenu).not.toBeInTheDocument();
    });
  });

  it('should have proper accessibility attributes', () => {
    // Act
    render(<ResponsiveNavigation currentPage="/" />);

    // Assert
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toHaveAttribute('aria-label', 'Toggle menu');

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('should render correct SVG icons for menu states', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<ResponsiveNavigation currentPage="home" />);

    // Assert - Hamburger icon initially
    const menuButton = screen.getByLabelText('Toggle menu');
    const hamburgerPath = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === 'path' &&
        element?.getAttribute('d') === 'M4 6h16M4 12h16M4 18h16'
      );
    });
    expect(hamburgerPath).toBeInTheDocument();

    // Act - Open menu
    await user.click(menuButton);

    // Assert - X icon when menu is open
    await waitFor(() => {
      const xPath = screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === 'path' &&
          element?.getAttribute('d') === 'M6 18L18 6M6 6l12 12'
        );
      });
      expect(xPath).toBeInTheDocument();
    });
  });

  it('should apply hover effects to navigation links', () => {
    // Act
    render(<ResponsiveNavigation currentPage="/" />);

    // Assert
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveClass('hover:text-gray-900', 'transition-colors');
  });

  it('should render with different current page states', () => {
    // Test each page state
    const pages = ['/', '/about', '/portfolio', '/blog'];

    pages.forEach(currentPage => {
      const { unmount } = render(
        <ResponsiveNavigation currentPage={currentPage} />
      );

      // The current page should have different styling
      const pageLabel = currentPage === '/' ? 'Home' : currentPage.slice(1);
      const pageName = pageLabel.charAt(0).toUpperCase() + pageLabel.slice(1);
      const currentPageElement = screen.getByRole('link', { name: pageName });

      if (currentPage !== '/') {
        expect(currentPageElement).toHaveClass('text-gray-900', 'font-medium');
      } else {
        expect(currentPageElement).toHaveClass('text-gray-900', 'font-medium');
      }

      unmount();
    });
  });
});
