import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  imageUrl: z
    .string()
    .optional()
    .refine(val => !val || z.string().url().safeParse(val).success, {
      message: 'Must be a valid URL or empty',
    }),
  published: z.boolean().default(false),
  author: z.string().default('Admin'),
  tags: z.array(z.string()).default([]),
  readTime: z.number().optional(),
});

// GET /api/blog - Get all published blog posts
// GET /api/blog - Get blog posts with filtering options
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin') === 'true';
    const published = searchParams.get('published');
    const unpublished = searchParams.get('unpublished') === 'true';

    // Build where clause based on parameters
    let where = {};

    if (admin) {
      // Admin can see all posts regardless of published status
      where = {};
    } else if (unpublished) {
      // Get only unpublished posts
      where = { published: false };
    } else if (published === 'false') {
      // Explicitly request unpublished posts
      where = { published: false };
    } else {
      // Default: only published posts
      where = { published: true };
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Convert JSON strings back to arrays following project pattern
    const postsWithArrays = posts.map(post => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
    }));

    return NextResponse.json(postsWithArrays);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create new blog post (admin only)
export async function POST(request) {
  try {
    const body = await request.json();
    const validatedData = blogPostSchema.parse(body);

    // Generate slug from title
    const slug = validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Calculate read time (average 200 words per minute)
    const wordCount = validatedData.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const post = await prisma.blogPost.create({
      data: {
        ...validatedData,
        slug,
        readTime,
        tags: JSON.stringify(validatedData.tags), // Convert array to JSON string
      },
    });

    // Convert back to array for response
    const postWithArray = {
      ...post,
      tags: JSON.parse(post.tags),
    };

    return NextResponse.json(postWithArray, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error details:', error.errors);
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors,
          message: 'Please check the form data and try again',
        },
        { status: 400 }
      );
    }

    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

// Create a partial schema for PATCH operations
const partialBlogPostSchema = blogPostSchema.partial();

// PATCH /api/blog/[id] - Update blog post (admin only)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Use partial validation - allows any subset of fields
    const validatedData = partialBlogPostSchema.parse(body);

    // Generate slug from title if title changed
    let slug = undefined;
    if (validatedData.title) {
      slug = validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Calculate read time if content changed
    let readTime = undefined;
    if (validatedData.content) {
      const wordCount = validatedData.content.split(/\s+/).length;
      readTime = Math.ceil(wordCount / 200);
    }

    // Build update data object
    const updateData = { ...validatedData };

    // Add computed fields if present
    if (slug) updateData.slug = slug;
    if (readTime) updateData.readTime = readTime;

    // Convert tags array to JSON string following project pattern
    if (validatedData.tags && Array.isArray(validatedData.tags)) {
      updateData.tags = JSON.stringify(validatedData.tags);
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    // Convert JSON strings back to arrays for response
    const postWithArray = {
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
    };

    return NextResponse.json(postWithArray);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
