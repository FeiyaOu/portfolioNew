# Complete Full-Stack Portfolio Development Pipeline

## Overview

You'll build a **production-grade portfolio** and learn the entire software development lifecycle:

**Tech Stack:**
- **Frontend**: Next.js 16 + React 19 + TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Image Storage**: AWS S3
- **Authentication**: NextAuth.js
- **Testing**: Jest + React Testing Library + Playwright
- **CI/CD**: GitHub Actions
- **Deployment**: VPS (DigitalOcean/AWS EC2) with dedicated IP
- **Infrastructure**: Nginx reverse proxy, PM2 process manager

**What You'll Learn:**
1. Full-stack development (frontend + backend + database)
2. Database design and migrations
3. API development and testing
4. Authentication and authorization
5. Cloud storage (AWS S3)
6. Automated testing (unit, integration, E2E)
7. CI/CD pipelines with GitHub Actions
8. Multi-environment deployment (dev/staging/prod)
9. VPS setup and server management
10. Domain configuration and SSL certificates
11. Production monitoring and logging

## Phase 1: Local Development Setup

### 1.1 Database Schema Design

**What You'll Learn:** Database modeling, relationships, Prisma schema

**Tasks:**
1. Install Prisma and PostgreSQL client
2. Set up local PostgreSQL database
3. Design schema for projects:
   - `id` (UUID, primary key)
   - `title` (string)
   - `description` (text)
   - `imageUrl` (string, S3 URL)
   - `category` (string)
   - `technologies` (array of strings)
   - `liveUrl` (optional string)
   - `githubUrl` (optional string)
   - `createdAt` (timestamp)
   - `updatedAt` (timestamp)
   - `published` (boolean)
4. Create Prisma migrations
5. Seed database with sample data

**Files:**
- `prisma/schema.prisma`
- `prisma/migrations/`
- `prisma/seed.js`

### 1.2 Backend API Development

**What You'll Learn:** RESTful API design, CRUD operations, error handling

**API Endpoints:**
```
GET    /api/projects          - List all published projects
GET    /api/projects/:id      - Get single project
POST   /api/projects          - Create project (admin only)
PUT    /api/projects/:id      - Update project (admin only)
DELETE /api/projects/:id      - Delete project (admin only)
POST   /api/upload            - Upload image to S3 (admin only)
```

**Tasks:**
1. Create API route handlers
2. Implement Prisma queries
3. Add input validation (Zod)
4. Add error handling middleware
5. Add request logging

**Files:**
- `src/app/api/projects/route.js`
- `src/app/api/projects/[id]/route.js`
- `src/app/api/upload/route.js`
- `src/lib/prisma.js`
- `src/lib/s3.js`
- `src/lib/validation.js`

### 1.3 AWS S3 Setup

**What You'll Learn:** AWS IAM, S3 bucket policies, presigned URLs

**Tasks:**
1. Create AWS account
2. Create S3 bucket with proper CORS configuration
3. Create IAM user with S3-only permissions
4. Generate access keys
5. Implement upload utility with presigned URLs
6. Add image optimization before upload

**Files:**
- `src/lib/s3.js`
- `src/lib/imageOptimizer.js`

### 1.4 Authentication System

**What You'll Learn:** NextAuth.js, session management, route protection

**Tasks:**
1. Install and configure NextAuth.js
2. Set up credentials provider
3. Create login page
4. Add session management
5. Create middleware to protect admin routes
6. Add role-based access control

**Files:**
- `src/app/api/auth/[...nextauth]/route.js`
- `src/app/admin/login/page.js`
- `src/middleware.js`
- `src/lib/auth.js`

### 1.5 Admin Interface

**What You'll Learn:** Form handling, file uploads, optimistic UI updates

**Features:**
- Dashboard with project list
- Create/Edit project forms
- Image upload with preview
- Delete confirmation modals
- Drag-and-drop image upload
- Rich text editor for descriptions

**Files:**
- `src/app/admin/page.js`
- `src/app/admin/projects/new/page.js`
- `src/app/admin/projects/[id]/edit/page.js`
- `src/components/AdminNav.js`
- `src/components/ProjectForm.js`
- `src/components/ImageUpload.js`
- `src/components/RichTextEditor.js`

### 1.6 Frontend Portfolio Pages

**What You'll Learn:** Data fetching, SSR vs CSR, image optimization

**Tasks:**
1. Update portfolio page to fetch from API
2. Add loading states and error handling
3. Implement project detail page
4. Add image optimization with Next.js Image
5. Add animations and transitions

**Files:**
- `src/app/portfolio/page.js`
- `src/app/portfolio/[id]/page.js`
- `src/components/ProjectCard.js`
- `src/components/ProjectDetail.js`

## Phase 2: Testing Implementation

### 2.1 Unit Tests

**What You'll Learn:** Jest, testing utilities, mocking

**Test Coverage:**
- Database utility functions
- S3 upload functions
- Validation schemas
- Helper functions

**Files:**
- `src/lib/__tests__/prisma.test.js`
- `src/lib/__tests__/s3.test.js`
- `src/lib/__tests__/validation.test.js`
- `jest.config.js`
- `jest.setup.js`

### 2.2 Integration Tests

**What You'll Learn:** API testing, database mocking, authentication testing

**Test Coverage:**
- All API endpoints
- Authentication flows
- Database operations
- Error scenarios

**Files:**
- `src/app/api/__tests__/projects.test.js`
- `src/app/api/__tests__/upload.test.js`
- `src/app/api/__tests__/auth.test.js`

### 2.3 End-to-End Tests

**What You'll Learn:** Playwright, user flow testing, visual regression

**Test Scenarios:**
- User visits portfolio and views projects
- Admin logs in
- Admin creates new project with image
- Admin edits existing project
- Admin deletes project
- Unauthorized access attempts

**Files:**
- `e2e/portfolio.spec.js`
- `e2e/admin.spec.js`
- `playwright.config.js`

## Phase 3: CI/CD Pipeline with GitHub Actions

### 3.1 Basic CI Pipeline

**What You'll Learn:** GitHub Actions, workflow syntax, automated testing

**Workflow: On Every Push**
1. Checkout code
2. Set up Node.js
3. Install dependencies
4. Run linter (ESLint)
5. Run unit tests
6. Run integration tests
7. Build application
8. Report test coverage

**Files:**
- `.github/workflows/ci.yml`

### 3.2 Advanced CI/CD Pipeline

**What You'll Learn:** Multi-environment deployment, database migrations, rollback strategies

**Environments:**
- **Development**: Auto-deploy on push to `develop` branch
- **Staging**: Auto-deploy on push to `staging` branch
- **Production**: Auto-deploy on push to `main` branch (with approval)

**Workflow: Development Deployment**
1. Run all tests
2. Build Docker image
3. Push to container registry
4. SSH to dev server
5. Pull new image
6. Run database migrations
7. Restart application
8. Run smoke tests
9. Notify on Slack/Discord

**Workflow: Staging Deployment**
1. All development steps
2. Run E2E tests on staging
3. Generate deployment report
4. Notify team for QA testing

**Workflow: Production Deployment**
1. Require manual approval
2. Create database backup
3. Run all tests on staging
4. Deploy to production with zero-downtime
5. Run database migrations
6. Health check monitoring
7. Automatic rollback on failure
8. Send deployment notification

**Additional Workflows:**
- **Database Backup**: Daily automated backups
- **Security Scan**: Weekly dependency vulnerability scan
- **Performance Test**: Weekly Lighthouse CI
- **Cleanup**: Remove old Docker images

**Files:**
- `.github/workflows/ci.yml`
- `.github/workflows/deploy-dev.yml`
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-prod.yml`
- `.github/workflows/backup.yml`
- `.github/workflows/security-scan.yml`
- `.github/workflows/performance.yml`

## Phase 4: VPS Setup and Deployment

### 4.1 VPS Provisioning

**What You'll Learn:** Linux server administration, security hardening

**Provider Options:**
- DigitalOcean Droplet ($6/month)
- AWS EC2 t2.micro (free tier for 12 months)
- Linode ($5/month)

**Tasks:**
1. Create VPS instance (Ubuntu 22.04 LTS)
2. Get dedicated IP address (automatically assigned)
3. Set up SSH key authentication
4. Disable password authentication
5. Configure firewall (UFW)
6. Set up fail2ban for security
7. Create non-root user with sudo privileges

**What You Get:**
- Dedicated IP address (e.g., `123.45.67.89`)
- Full root access to server
- Complete control over environment

### 4.2 Server Environment Setup

**What You'll Learn:** Node.js deployment, process management, reverse proxy

**Tasks:**
1. Install Node.js (via nvm)
2. Install PostgreSQL
3. Install Nginx (reverse proxy)
4. Install PM2 (process manager)
5. Configure environment variables
6. Set up log rotation
7. Configure PostgreSQL with proper security

**Files on Server:**
- `/etc/nginx/sites-available/portfolio`
- `/etc/systemd/system/portfolio.service`
- `/var/www/portfolio/.env.production`

### 4.3 Domain and SSL Configuration

**What You'll Learn:** DNS configuration, SSL certificates, HTTPS

**Tasks:**
1. (Optional) Purchase domain name (~$12/year)
2. Configure DNS A record to point to your IP
3. Install Certbot
4. Generate Let's Encrypt SSL certificate (free)
5. Configure Nginx for HTTPS
6. Set up automatic certificate renewal
7. Configure HSTS and security headers

**Result:**
- Access via IP: `https://123.45.67.89`
- Access via domain: `https://yourportfolio.com` (if purchased)

### 4.4 Database Setup on VPS

**What You'll Learn:** PostgreSQL administration, database security

**Tasks:**
1. Create PostgreSQL database and user
2. Configure PostgreSQL for remote access (if needed)
3. Set up database backups
4. Run Prisma migrations on production
5. Seed initial data

### 4.5 Application Deployment

**What You'll Learn:** Production builds, environment configuration, process management

**Deployment Methods:**

**Option A: Direct Deployment (Simpler)**
1. Clone repository on server
2. Install dependencies
3. Build Next.js app
4. Configure environment variables
5. Start with PM2
6. Configure Nginx reverse proxy

**Option B: Docker Deployment (More Professional)**
1. Build Docker image locally
2. Push to Docker Hub
3. Pull on server
4. Run with Docker Compose
5. Nginx reverse proxy to container

**Tasks:**
1. Create production build
2. Configure PM2 ecosystem file
3. Set up Nginx reverse proxy
4. Configure environment variables
5. Start application
6. Verify health checks

**Files:**
- `ecosystem.config.js` (PM2 config)
- `Dockerfile`
- `docker-compose.yml`
- `.env.production`

## Phase 5: Monitoring and Maintenance

### 5.1 Application Monitoring

**What You'll Learn:** Logging, error tracking, performance monitoring

**Tools:**
1. PM2 monitoring dashboard
2. Nginx access/error logs
3. PostgreSQL query logs
4. Application logging (Winston/Pino)
5. (Optional) Sentry for error tracking
6. (Optional) Uptime monitoring (UptimeRobot - free)

**Files:**
- `src/lib/logger.js`
- `src/middleware/logging.js`

### 5.2 Database Backups

**What You'll Learn:** Backup strategies, disaster recovery

**Tasks:**
1. Set up automated daily backups
2. Store backups on S3
3. Test restoration process
4. Document recovery procedures

**Files:**
- `scripts/backup-db.sh`
- `.github/workflows/backup.yml`

### 5.3 Performance Optimization

**What You'll Learn:** Caching, CDN, database optimization

**Tasks:**
1. Add Redis caching (optional)
2. Configure Nginx caching
3. Optimize database queries
4. Add database indexes
5. Configure Next.js image optimization
6. Set up CloudFlare CDN (optional, free)

## Environment Variables

### Local Development (`.env.local`)
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_dev

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-dev-secret-key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-dev-password

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET_NAME=portfolio-images-dev
NEXT_PUBLIC_AWS_S3_BUCKET_URL=https://portfolio-images-dev.s3.amazonaws.com
```

### Staging (`.env.staging`)
```bash
DATABASE_URL=postgresql://user:password@staging-db:5432/portfolio_staging
NEXTAUTH_URL=https://staging.yourportfolio.com
# ... other vars
```

### Production (`.env.production`)
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_prod
NEXTAUTH_URL=https://yourportfolio.com
# ... other vars
```

## Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-dev.yml
│       ├── deploy-staging.yml
│       ├── deploy-prod.yml
│       ├── backup.yml
│       └── security-scan.yml
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.js
│   │   │   ├── projects/route.js
│   │   │   ├── projects/[id]/route.js
│   │   │   ├── blog/route.js
│   │   │   ├── blog/[id]/route.js
│   │   │   └── upload/route.js
│   │   ├── admin/
│   │   │   ├── login/page.js
│   │   │   ├── page.js
│   │   │   ├── projects/
│   │   │   └── blog/
│   │   ├── blog/
│   │   │   ├── page.js
│   │   │   └── [slug]/page.js
│   │   ├── portfolio/
│   │   │   ├── page.js
│   │   │   └── [id]/page.js
│   │   └── page.js
│   ├── components/
│   ├── lib/
│   │   ├── prisma.js
│   │   ├── s3.js
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── logger.js
│   └── middleware.js
├── e2e/
│   ├── portfolio.spec.js
│   ├── admin.spec.js
│   └── blog.spec.js
├── scripts/
│   ├── backup-db.sh
│   └── deploy.sh
├── Dockerfile
├── docker-compose.yml
├── ecosystem.config.js
├── jest.config.js
├── playwright.config.js
└── .env.example
```

## Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| VPS (DigitalOcean) | $6/month | Dedicated IP included |
| AWS S3 | $0 first year, then ~$0.50/month | Free tier: 5GB storage |
| PostgreSQL | $0 | Self-hosted on VPS |
| Domain (optional) | ~$12/year | yourportfolio.com |
| SSL Certificate | $0 | Let's Encrypt (free) |
| **Total** | **$6/month** | **$84/year** (+ $12 if domain) |

## Learning Outcomes

After completing this project, you'll understand:

1. **Full-Stack Development**: Frontend, backend, and database integration
2. **Database Management**: Schema design, migrations, queries, backups
3. **Cloud Services**: AWS S3, IAM, security best practices
4. **Authentication**: Session management, route protection, security
5. **Testing**: Unit, integration, and E2E testing strategies
6. **CI/CD**: Automated testing, multi-environment deployment, rollback strategies
7. **DevOps**: Server setup, Nginx, PM2, Docker, monitoring
8. **Security**: SSL, firewall, authentication, environment variables
9. **Production Deployment**: Zero-downtime deployment, health checks, logging
10. **System Administration**: Linux, SSH, database administration

## Deployment Flow Visualization

```
Local Development
    ↓ (git push to develop)
GitHub Actions CI
    ↓ (tests pass)
Development Server (auto-deploy)
    ↓ (git push to staging)
Staging Server (auto-deploy)
    ↓ (QA approval + git push to main)
Manual Approval Required
    ↓ (approved)
Production Deployment
    ↓
Live at https://123.45.67.89 or https://yourportfolio.com
```

## Next Steps After Completion

1. Add more features (blog, contact form, analytics)
2. Implement caching with Redis
3. Add monitoring with Grafana/Prometheus
4. Set up load balancing for high traffic
5. Implement blue-green deployment
6. Add feature flags
7. Implement A/B testing

### To-dos

**Phase 1: Local Development**
- [ ] Set up local development environment with PostgreSQL and all dependencies
- [ ] Design and implement Prisma schema with migrations and seed data
- [ ] Build RESTful API routes for CRUD operations with validation
- [ ] Configure AWS S3 bucket, IAM user, and implement upload utility
- [ ] Implement NextAuth.js with credentials provider and route protection
- [ ] Build complete admin dashboard with project management UI
- [ ] Update portfolio pages to fetch from API with proper loading states
- [ ] Add blog section with posts management

**Phase 2: Testing**
- [ ] Write unit tests for utilities, validation, and helper functions
- [ ] Write integration tests for all API endpoints
- [ ] Implement E2E tests with Playwright for critical user flows

**Phase 3: CI/CD**
- [ ] Set up GitHub Actions for automated testing on every push
- [ ] Implement multi-environment CI/CD with dev, staging, and prod pipelines

**Phase 4: Deployment**
- [ ] Provision VPS, configure security, and set up server environment
- [ ] Configure Nginx reverse proxy and PM2 process manager
- [ ] Set up SSL certificate and optionally configure custom domain
- [ ] Deploy application to production VPS with database setup

**Phase 5: Monitoring**
- [ ] Set up logging, monitoring, and automated backups
- [ ] Create comprehensive documentation for setup, deployment, and maintenance
