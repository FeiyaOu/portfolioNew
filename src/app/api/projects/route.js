import { prisma } from '../../../lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');

    // Build query options
    const where = {};
    if (published !== null) {
      where.published = published === 'true';
    }
    if (featured !== null) {
      where.featured = featured === 'true';
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    // Parse technologies and features JSON strings
    const parsedProjects = projects.map(project => {
      const parsed = {
        ...project,
        technologies: JSON.parse(project.technologies || '[]'),
      };

      // Parse features if it exists
      if (project.features) {
        try {
          parsed.features = JSON.parse(project.features);
        } catch (e) {
          parsed.features = [];
        }
      } else {
        parsed.features = [];
      }

      return parsed;
    });

    return Response.json(parsedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Debug logging
    console.log('POST /api/projects - Raw body:', body);
    console.log('Technologies in body:', body.technologies);
    console.log('Features in body:', body.features);

    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      return Response.json(
        { error: 'Missing required fields: title, description, category' },
        { status: 400 }
      );
    }

    // Remove UI-only fields that aren't in the database schema
    const { techInput, featureInput, ...cleanBody } = body;

    console.log(
      'After removing UI fields - cleanBody technologies:',
      cleanBody.technologies
    );
    console.log(
      'After removing UI fields - cleanBody features:',
      cleanBody.features
    );

    // Convert arrays to JSON strings
    const data = {
      ...cleanBody,
      technologies:
        typeof cleanBody.technologies === 'string'
          ? cleanBody.technologies
          : JSON.stringify(cleanBody.technologies || []),
      features:
        typeof cleanBody.features === 'string'
          ? cleanBody.features
          : JSON.stringify(cleanBody.features || []),
    };

    console.log('Final data to save - technologies:', data.technologies);
    console.log('Final data to save - features:', data.features);

    const project = await prisma.project.create({
      data,
    });

    // Parse arrays for response
    return Response.json(
      {
        ...project,
        technologies: JSON.parse(project.technologies || '[]'),
        features: project.features ? JSON.parse(project.features) : [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return Response.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
