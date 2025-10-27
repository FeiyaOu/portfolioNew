import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

// GET /api/blog/priority/[priority] - Get blog posts by priority
export async function GET(request, { params }) {
  try {
    const { priority } = await params;

    console.log('Received priority:', priority, 'Type:', typeof priority);

    // Validate priority value
    const validPriorities = ['High', 'Medium', 'Low'];
    if (!validPriorities.includes(priority)) {
      return NextResponse.json(
        {
          error: `Invalid priority: "${priority}". Must be High, Medium, or Low`,
        },
        { status: 400 }
      );
    }

    // Query database for posts with specific priority
    const posts = await prisma.blogPost.findMany({
      where: {
        priority: priority,
        published: true,
      },
      orderBy: [
        { viewCount: 'desc' }, // Most viewed first
        { createdAt: 'desc' }, // Then newest first
      ],
    });

    // Convert JSON strings back to arrays
    const postsWithArrays = posts.map(post => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
    }));

    return NextResponse.json({
      priority,
      count: posts.length,
      posts: postsWithArrays,
    });
  } catch (error) {
    console.error('Error fetching blog posts by priority:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
