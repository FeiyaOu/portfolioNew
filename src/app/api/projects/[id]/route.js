import { prisma } from '../../../../lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }

    // Parse technologies and features JSON strings
    const parsedProject = {
      ...project,
      technologies: JSON.parse(project.technologies || '[]'),
    };

    // Parse features if it exists
    if (project.features) {
      try {
        parsedProject.features = JSON.parse(project.features);
      } catch (e) {
        parsedProject.features = [];
      }
    } else {
      parsedProject.features = [];
    }

    return Response.json(parsedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    return Response.json(
      { error: 'Failed to fetch project', details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Remove UI-only fields that aren't in the database schema
    const { techInput, featureInput, ...updateData } = body;

    // Convert technologies array to JSON string if it exists
    if (updateData.technologies && Array.isArray(updateData.technologies)) {
      updateData.technologies = JSON.stringify(updateData.technologies);
    }

    // Convert features array to JSON string if it exists
    if (updateData.features && Array.isArray(updateData.features)) {
      updateData.features = JSON.stringify(updateData.features);
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    // Parse for response
    return Response.json({
      ...project,
      technologies: JSON.parse(project.technologies || '[]'),
      features: project.features ? JSON.parse(project.features) : [],
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return Response.json(
      { error: 'Failed to update project', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return Response.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
