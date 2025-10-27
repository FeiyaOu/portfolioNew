/**
 * Simple API Test Example - Industry Standard
 * Focus on testing the CORE business logic and data transformation
 * This is what companies test first!
 */

// Mock Next.js server components for testing environment
global.Request = class MockRequest {
  constructor(url, options = {}) {
    this.url = url;
    this.method = options.method || 'GET';
    this.body = options.body;
  }

  async json() {
    return JSON.parse(this.body || '{}');
  }
};

global.Response = class MockResponse {
  constructor(body, options = {}) {
    this.body = body;
    this.status = options.status || 200;
  }

  static json(data, options = {}) {
    return {
      json: async () => data,
      status: options.status || 200,
    };
  }
};

// Mock the actual API route
const mockProjects = [
  {
    id: 1,
    title: 'Test Project',
    description: 'A test project',
    technologies: '["React", "Next.js"]', // JSON string from database
    features: '["Auth", "Dashboard"]', // JSON string from database
    published: true,
  },
];

// Mock Prisma
const mockPrismaProject = {
  findMany: jest.fn(),
  create: jest.fn(),
};

jest.mock('../../src/lib/prisma', () => ({
  project: mockPrismaProject,
}));

describe('Projects API - Core Business Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should transform JSON strings to arrays when fetching projects', async () => {
    // This tests the CRITICAL data transformation pattern in your app

    // Arrange
    mockPrismaProject.findMany.mockResolvedValue(mockProjects);

    // Import the actual GET function
    const { GET } = require('../../src/app/api/projects/route');

    // Act
    const request = new NextRequest('http://localhost:3000/api/projects');
    const response = await GET(request);
    const data = await response.json();

    // Assert - This is what matters for your business logic!
    expect(data[0].technologies).toEqual(['React', 'Next.js']); // Array, not string!
    expect(data[0].features).toEqual(['Auth', 'Dashboard']); // Array, not string!
    expect(response.status).toBe(200);
  });

  it('should handle empty project list', async () => {
    // Arrange
    mockPrismaProject.findMany.mockResolvedValue([]);

    // Import the actual GET function
    const { GET } = require('../../src/app/api/projects/route');

    // Act
    const request = new NextRequest('http://localhost:3000/api/projects');
    const response = await GET(request);
    const data = await response.json();

    // Assert
    expect(data).toEqual([]);
    expect(response.status).toBe(200);
  });

  it('should handle database errors gracefully', async () => {
    // Arrange
    mockPrismaProject.findMany.mockRejectedValue(
      new Error('Database connection failed')
    );

    // Import the actual GET function
    const { GET } = require('../../src/app/api/projects/route');

    // Act
    const request = new NextRequest('http://localhost:3000/api/projects');
    const response = await GET(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to fetch projects');
  });
});
