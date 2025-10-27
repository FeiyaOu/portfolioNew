/**
 * API Tests for /api/projects
 * Tests the core functionality of project CRUD operations
 * Industry Standard: Always test API endpoints first as they're critical business logic
 */

import { GET, POST } from '../../src/app/api/projects/route';
import { NextRequest } from 'next/server';

// Mock Prisma
jest.mock('../../src/lib/prisma', () => ({
  project: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

describe('/api/projects', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/projects', () => {
    it('should return published projects successfully', async () => {
      // Arrange
      const mockProjects = [
        {
          id: 1,
          title: 'Test Project',
          description: 'Test Description',
          technologies: '["React", "Next.js"]',
          features: '["Authentication", "Dashboard"]',
          published: true,
          priority: 1,
        },
      ];

      const { project } = require('../../src/lib/prisma');
      project.findMany.mockResolvedValue(mockProjects);

      // Act
      const request = new NextRequest('http://localhost:3000/api/projects');
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(data[0].technologies).toEqual(['React', 'Next.js']);
      expect(data[0].features).toEqual(['Authentication', 'Dashboard']);
      expect(project.findMany).toHaveBeenCalledWith({
        where: { published: true },
        orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
      });
    });

    it('should handle database errors gracefully', async () => {
      // Arrange
      const { project } = require('../../src/lib/prisma');
      project.findMany.mockRejectedValue(
        new Error('Database connection failed')
      );

      // Act
      const request = new NextRequest('http://localhost:3000/api/projects');
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch projects');
    });

    it('should return empty array when no projects exist', async () => {
      // Arrange
      const { project } = require('../../src/lib/prisma');
      project.findMany.mockResolvedValue([]);

      // Act
      const request = new NextRequest('http://localhost:3000/api/projects');
      const response = await GET(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data).toEqual([]);
    });
  });

  describe('POST /api/projects', () => {
    it('should create a new project successfully', async () => {
      // Arrange
      const projectData = {
        title: 'New Project',
        description: 'New Description',
        technologies: ['React', 'TypeScript'],
        features: ['Auth', 'API'],
        published: false,
        priority: 5,
      };

      const expectedDbData = {
        ...projectData,
        technologies: '["React","TypeScript"]',
        features: '["Auth","API"]',
      };

      const mockCreatedProject = { id: 1, ...expectedDbData };

      const { project } = require('../../src/lib/prisma');
      project.create.mockResolvedValue(mockCreatedProject);

      // Act
      const request = new NextRequest('http://localhost:3000/api/projects', {
        method: 'POST',
        body: JSON.stringify(projectData),
      });

      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(201);
      expect(data.id).toBe(1);
      expect(data.technologies).toEqual(['React', 'TypeScript']);
      expect(data.features).toEqual(['Auth', 'API']);
      expect(project.create).toHaveBeenCalledWith({
        data: expectedDbData,
      });
    });

    it('should handle invalid JSON in request body', async () => {
      // Act
      const request = new NextRequest('http://localhost:3000/api/projects', {
        method: 'POST',
        body: 'invalid json',
      });

      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid JSON in request body');
    });

    it('should handle database creation errors', async () => {
      // Arrange
      const { project } = require('../../src/lib/prisma');
      project.create.mockRejectedValue(
        new Error('Database constraint violation')
      );

      const projectData = {
        title: 'Test Project',
        description: 'Test Description',
        technologies: ['React'],
        features: ['Auth'],
      };

      // Act
      const request = new NextRequest('http://localhost:3000/api/projects', {
        method: 'POST',
        body: JSON.stringify(projectData),
      });

      const response = await POST(request);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to create project');
    });
  });
});
