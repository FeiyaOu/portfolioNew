import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { z } from 'zod';

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  imageUrl: z.string().url().optional(),
  published: z.boolean().default(false),
  author: z.string().default('Admin'),
  tags: z.array(z.string()).default([]),
  readTime: z.number().optional(),
});

// GET /api/blog/[id] - Get single blog post
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Convert JSON string back to array
    const postWithArray = {
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : []
    };

    return NextResponse.json(postWithArray);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - Update blog post (admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = blogPostSchema.parse(body);

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

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...validatedData,
        ...(slug && { slug }),
        ...(readTime && { readTime }),
        ...(validatedData.tags && { tags: JSON.stringify(validatedData.tags) }),
      },
    });

    // Convert back to array for response
    const postWithArray = {
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : []
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

// DELETE /api/blog/[id] - Delete blog post (admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
