const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.blogPost.deleteMany();
  await prisma.project.deleteMany();
  
  // Create sample projects with new fields
  const projects = await prisma.project.createMany({
    data: [
      {
        title: 'E-Commerce Platform',
        description: 'Modern online shopping experience with React and Node.js',
        category: 'Web Application',
        technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Stripe']),
        published: true,
        featured: true,
        order: 1,
        difficulty: 'Advanced',        // NEW FIELD
        estimatedHours: 120,           // NEW FIELD
      },
      {
        title: 'Task Management App',
        description: 'Productivity tool for teams with real-time collaboration',
        category: 'Mobile App',
        technologies: JSON.stringify(['React Native', 'Firebase', 'Redux']),
        published: true,
        featured: false,
        order: 2,
        difficulty: 'Intermediate',    // NEW FIELD
        estimatedHours: 80,            // NEW FIELD
      },
      {
        title: 'Restaurant Website',
        description: 'Beautiful dining experience online with online ordering',
        category: 'Website',
        technologies: JSON.stringify(['Next.js', 'TailwindCSS', 'Sanity CMS']),
        published: true,
        featured: true,
        order: 3,
        difficulty: 'Beginner',        // NEW FIELD
        estimatedHours: 40,            // NEW FIELD
      },
    ],
  });

  // Create sample blog posts with new fields
  const blogPosts = await prisma.blogPost.createMany({
    data: [
      {
        title: 'Getting Started with Next.js 14',
        slug: 'getting-started-with-nextjs-14',
        content: 'Next.js 14 brings amazing new features...',
        excerpt: 'Learn how to build modern web applications with Next.js 14...',
        author: 'Admin',
        tags: JSON.stringify(['Next.js', 'React', 'Web Development']),
        published: true,
        readTime: 5,
        priority: 'High',
        viewCount: 1250,
        likes: 45,                     // NEW FIELD
        isTrending: true,              // NEW FIELD
      },
      {
        title: 'Building Responsive UIs with TailwindCSS',
        slug: 'building-responsive-uis-with-tailwindcss',
        content: 'TailwindCSS makes it easy to build beautiful...',
        excerpt: 'Master the art of responsive design with TailwindCSS...',
        author: 'Admin',
        tags: JSON.stringify(['CSS', 'TailwindCSS', 'Design']),
        published: true,
        readTime: 7,
        priority: 'Medium',
        viewCount: 890,
        likes: 23,                     // NEW FIELD
        isTrending: false,             // NEW FIELD
      },
      {
        title: 'Advanced React Patterns',
        slug: 'advanced-react-patterns',
        content: 'Explore advanced React patterns...',
        excerpt: 'Master advanced React patterns for better code organization...',
        author: 'Admin',
        tags: JSON.stringify(['React', 'JavaScript', 'Patterns']),
        published: true,
        readTime: 12,
        priority: 'High',
        viewCount: 2100,
        likes: 78,                     // NEW FIELD
        isTrending: true,              // NEW FIELD
      },
    ],
  });

  console.log('Seed data created successfully!');
  console.log(`Created ${projects.count} projects`);
  console.log(`Created ${blogPosts.count} blog posts`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });