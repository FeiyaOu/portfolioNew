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
        description:
          'A modern, responsive e-commerce platform built with React and Node.js, featuring a clean user interface and seamless shopping experience.',
        longDescription:
          'This comprehensive e-commerce solution includes user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built with modern web technologies and best practices for performance and security.',
        category: 'Web Application',
        technologies: JSON.stringify([
          'React',
          'Node.js',
          'MongoDB',
          'Stripe API',
          'Tailwind CSS',
        ]),
        features: JSON.stringify([
          'User authentication and authorization',
          'Product catalog with search and filtering',
          'Shopping cart and checkout process',
          'Payment integration with Stripe',
          'Admin dashboard for inventory management',
          'Responsive design for all devices',
        ]),
        published: true,
        featured: true,
        order: 1,
        difficulty: 'Advanced',
        liveUrl: 'https://demo-ecommerce.example.com',
        githubUrl: 'https://github.com/username/ecommerce-platform',
      },
      {
        title: 'Task Management App',
        description:
          'A collaborative task management application designed for teams to organize, track, and complete projects efficiently.',
        longDescription:
          'This productivity tool helps teams stay organized with features like task assignment, progress tracking, deadline management, and team collaboration. Built with a focus on user experience and team productivity.',
        category: 'Mobile App',
        technologies: JSON.stringify([
          'React Native',
          'Firebase',
          'Redux',
          'Expo',
          'TypeScript',
        ]),
        features: JSON.stringify([
          'Task creation and assignment',
          'Real-time collaboration',
          'Progress tracking and analytics',
          'Deadline reminders and notifications',
          'Team member management',
          'Cross-platform mobile support',
        ]),
        published: true,
        featured: false,
        order: 2,
        difficulty: 'Intermediate',
        liveUrl: 'https://demo-taskmanager.example.com',
        githubUrl: 'https://github.com/username/task-manager',
      },
      {
        title: 'Restaurant Website',
        description:
          'An elegant restaurant website showcasing menu, reservations, and dining experience with beautiful imagery and smooth interactions.',
        longDescription:
          'This restaurant website combines stunning visuals with practical functionality, including online menu browsing, reservation system, location information, and customer reviews. Designed to enhance the dining experience.',
        category: 'Website',
        technologies: JSON.stringify([
          'Next.js',
          'Sanity CMS',
          'Framer Motion',
          'Tailwind CSS',
          'Vercel',
        ]),
        features: JSON.stringify([
          'Interactive menu with categories',
          'Online reservation system',
          'Location and contact information',
          'Customer reviews and testimonials',
          'Photo gallery and virtual tour',
          'SEO optimized for local search',
        ]),
        published: true,
        featured: true,
        order: 3,
        difficulty: 'Beginner',
        liveUrl: 'https://demo-restaurant.example.com',
        githubUrl: 'https://github.com/username/restaurant-website',
      },
      {
        title: 'Weather Dashboard',
        description:
          'A comprehensive weather dashboard providing real-time weather data, forecasts, and interactive maps for multiple locations.',
        longDescription:
          'This weather application provides detailed meteorological information with beautiful data visualizations, interactive maps, and personalized weather alerts. Built with real-time data integration and responsive design.',
        category: 'Dashboard',
        technologies: JSON.stringify([
          'Vue.js',
          'Chart.js',
          'OpenWeather API',
          'Leaflet',
          'PWA',
        ]),
        features: JSON.stringify([
          'Real-time weather data',
          '7-day weather forecast',
          'Interactive weather maps',
          'Location-based weather alerts',
          'Historical weather data',
          'Progressive Web App features',
        ]),
        published: true,
        featured: false,
        order: 4,
        difficulty: 'Intermediate',
        liveUrl: 'https://demo-weather.example.com',
        githubUrl: 'https://github.com/username/weather-dashboard',
      },
      {
        title: 'Portfolio Website',
        description:
          'A creative portfolio website showcasing projects, skills, and professional experience with modern design and smooth animations.',
        longDescription:
          'This personal portfolio website demonstrates creative design skills and technical expertise. Features include project showcases, skill demonstrations, contact forms, and blog integration for sharing insights.',
        category: 'Website',
        technologies: JSON.stringify([
          'Next.js',
          'Framer Motion',
          'Tailwind CSS',
          'MDX',
          'Vercel',
        ]),
        features: JSON.stringify([
          'Project showcase with case studies',
          'Interactive skill demonstrations',
          'Contact form with email integration',
          'Blog section for articles',
          'Dark/light mode toggle',
          'Performance optimized',
        ]),
        published: true,
        featured: true,
        order: 5,
        difficulty: 'Beginner',
        liveUrl: 'https://demo-portfolio.example.com',
        githubUrl: 'https://github.com/username/portfolio-website',
      },
      {
        title: 'Social Media App',
        description:
          'A modern social media application connecting users through posts, messages, and community features with real-time updates.',
        longDescription:
          'This social platform enables users to share content, connect with friends, join communities, and engage through likes, comments, and direct messaging. Built with scalability and user engagement in mind.',
        category: 'Mobile App',
        technologies: JSON.stringify([
          'React',
          'Socket.io',
          'Node.js',
          'PostgreSQL',
          'AWS',
        ]),
        features: JSON.stringify([
          'User profiles and authentication',
          'Post creation and sharing',
          'Real-time messaging',
          'Community groups and forums',
          'Content moderation tools',
          'Mobile-responsive design',
        ]),
        published: true,
        featured: false,
        order: 6,
        difficulty: 'Advanced',
        liveUrl: 'https://demo-social.example.com',
        githubUrl: 'https://github.com/username/social-media-app',
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
        excerpt:
          'Learn how to build modern web applications with Next.js 14...',
        author: 'Admin',
        tags: JSON.stringify(['Next.js', 'React', 'Web Development']),
        published: true,
        readTime: 5,
        priority: 'High',
        viewCount: 1250,
        likes: 45, // NEW FIELD
        isTrending: true, // NEW FIELD
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
        likes: 23, // NEW FIELD
        isTrending: false, // NEW FIELD
      },
      {
        title: 'Advanced React Patterns',
        slug: 'advanced-react-patterns',
        content: 'Explore advanced React patterns...',
        excerpt:
          'Master advanced React patterns for better code organization...',
        author: 'Admin',
        tags: JSON.stringify(['React', 'JavaScript', 'Patterns']),
        published: true,
        readTime: 12,
        priority: 'High',
        viewCount: 2100,
        likes: 78, // NEW FIELD
        isTrending: true, // NEW FIELD
      },
    ],
  });

  console.log('Seed data created successfully!');
  console.log(`Created ${projects.count} projects`);
  console.log(`Created ${blogPosts.count} blog posts`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
