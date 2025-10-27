/**
 * 🎓 LEARNING-FOCUSED TESTS
 * Simple examples that teach Jest fundamentals
 * Perfect for understanding testing concepts!
 */

describe('Jest Fundamentals - Learning Examples', () => {
  // Test 1: Basic function testing
  it('should understand basic testing concepts', () => {
    // Arrange
    const add = (a, b) => a + b;

    // Act
    const result = add(2, 3);

    // Assert
    expect(result).toBe(5);
    expect(result).toBeGreaterThan(4);
    expect(typeof result).toBe('number');
  });

  // Test 2: Array and object testing (like your projects data)
  it('should test arrays and objects like project data', () => {
    // This mimics your projects API response structure
    const mockProject = {
      id: 1,
      title: 'My Portfolio',
      technologies: ['React', 'Next.js', 'Tailwind'],
      published: true,
    };

    // Test object properties
    expect(mockProject.title).toBe('My Portfolio');
    expect(mockProject.technologies).toHaveLength(3);
    expect(mockProject.technologies).toContain('React');
    expect(mockProject.published).toBe(true);
  });

  // Test 3: Async operations (like API calls)
  it('should handle async operations', async () => {
    // Simulate an async function like your API calls
    const fetchData = () => {
      return Promise.resolve({
        data: ['project1', 'project2'],
        status: 200,
      });
    };

    // Act
    const result = await fetchData();

    // Assert
    expect(result.status).toBe(200);
    expect(result.data).toHaveLength(2);
  });

  // Test 4: Mocking (essential for testing APIs)
  it('should understand mocking basics', () => {
    // Create a mock function
    const mockCallback = jest.fn();

    // Use the mock
    mockCallback('test-argument');
    mockCallback('another-call');

    // Test the mock was called correctly
    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith('test-argument');
    expect(mockCallback).toHaveBeenLastCalledWith('another-call');
  });

  // Test 5: Error handling
  it('should test error scenarios', () => {
    const throwError = () => {
      throw new Error('Something went wrong');
    };

    expect(() => throwError()).toThrow('Something went wrong');
    expect(() => throwError()).toThrow(Error);
  });
});

/**
 * 🎯 PORTFOLIO-SPECIFIC TESTS
 * Tests that actually relate to your project
 */
describe('Portfolio Data Transformation', () => {
  // This tests your actual data pattern!
  it('should transform JSON strings to arrays (your core pattern)', () => {
    // This is exactly what your API does
    const databaseProject = {
      technologies: '["React", "Next.js"]', // From database as string
      features: '["Auth", "Dashboard"]', // From database as string
    };

    // Transform like your API does
    const transformedProject = {
      technologies: JSON.parse(databaseProject.technologies),
      features: JSON.parse(databaseProject.features),
    };

    // Assert the transformation works
    expect(transformedProject.technologies).toEqual(['React', 'Next.js']);
    expect(transformedProject.features).toEqual(['Auth', 'Dashboard']);
    expect(Array.isArray(transformedProject.technologies)).toBe(true);
  });

  it('should handle empty arrays in JSON strings', () => {
    const emptyProject = {
      technologies: '[]',
      features: '[]',
    };

    const transformed = {
      technologies: JSON.parse(emptyProject.technologies),
      features: JSON.parse(emptyProject.features),
    };

    expect(transformed.technologies).toEqual([]);
    expect(transformed.features).toHaveLength(0);
  });
});
