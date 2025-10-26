import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  imageUrl: z.string().optional().refine((val) => !val || z.string().url().safeParse(val).success, {
    message: "Must be a valid URL or empty"
  }),
  published: z.boolean().default(false),
  author: z.string().default('Admin'),
  tags: z.array(z.string()).default([]),
  readTime: z.number().optional(),
});

// GET /api/blog - Get all published blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published') === 'true';
    const admin = searchParams.get('admin') === 'true';

    const where = admin ? {} : { published: true };

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    // Convert JSON strings back to arrays
    const postsWithArrays = posts.map(post => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : []
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
      tags: JSON.parse(post.tags)
    };

    return NextResponse.json(postWithArray, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error details:', error.errors);
      return NextResponse.json(
        { 
          error: 'Validation error', 
          details: error.errors,
          message: 'Please check the form data and try again'
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
