import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET /api/blog/trending - Get trending blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const minLikes = parseInt(searchParams.get('minLikes')) || 10;
    
    // Query database for trending posts
    const trendingPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        isTrending: true,
        likes: {
          gte: minLikes  // Greater than or equal to minLikes
        }
      },
      orderBy: [
        { likes: 'desc' },      // Most liked first
        { viewCount: 'desc' },  // Then most viewed
        { createdAt: 'desc' }   // Then newest
      ],
      take: 10  // Limit to 10 results
    });

    // Convert JSON strings back to arrays
    const postsWithArrays = trendingPosts.map(post => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : []
    }));

    return NextResponse.json({
      count: trendingPosts.length,
      posts: postsWithArrays
    });
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending posts' },
      { status: 500 }
    );
  }
}