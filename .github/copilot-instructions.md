# AI Coding Agent Instructions

## Architecture Overview

This is a **Next.js 16 portfolio application** using App Router with these key architectural decisions:

### Database & Data Flow
- **Database**: SQLite via Prisma ORM (`prisma/dev.db`)
- **Critical Pattern**: `technologies` and `features` fields are stored as **JSON strings** in database but handled as **arrays** in JavaScript
- **Data Transformation**: Always convert arrays ↔ JSON strings at API boundaries:
  ```js
  // Saving to DB
  technologies: JSON.stringify(arrayData)
  // Reading from DB  
  technologies: JSON.parse(project.technologies || '[]')
  ```

### Authentication System
- **Simple localStorage-based auth** for admin routes (`password: 'admin123'`)
- **AdminAuth wrapper component** protects all `/admin/*` routes
- **NOT production-ready** - uses client-side only validation

## Development Workflows

### Essential Commands
```bash
npm run dev                 # Dev server (may need package-lock.json fix)
node prisma/seed.js        # Seed database (no npm script configured)
npm run lint:fix           # Auto-fix ESLint + Prettier issues
```

### Common Debug Steps
1. **"npm run dev fails"**: Move `/Users/oufeiya/package-lock.json` to `.backup` (workspace root conflict)
2. **"Admin updates fail"**: Check API data transformation - arrays must become JSON strings
3. **"Missing project data"**: Ensure `longDescription` and `features` exist and are properly parsed

## Project-Specific Patterns

### API Route Conventions
- **All routes use App Router** (`src/app/api/*/route.js`)
- **Zod validation** for blog posts, none for projects
- **Prisma global singleton** pattern in `src/lib/prisma.js`
- **Error format**: `{ error: "message", details?: string }`

### Data Model Critical Points
```js
// Projects: technologies/features as JSON strings
{ 
  technologies: '["React","Next.js"]',  // String in DB
  features: '["Auth","Dashboard"]'       // String in DB
}

// Blog: tags as JSON strings, computed fields
{
  tags: '["tech","tutorial"]',          // String in DB
  slug: "auto-generated-from-title",    // Computed
  readTime: 5                           // Computed from word count
}
```

### CSS & Theming
- **CSS Variables** for avocado color scheme in `globals.css`:
  ```css
  --avocado-primary: #9acd32
  --avocado-light: #b8e6b8  
  --avocado-dark: #7ba05b
  ```
- **Custom particle system** (not third-party library) using pure CSS animations
- **Tailwind + CSS Variables** pattern: `bg-[var(--avocado-primary)]`

### Component Architecture
- **ParticleBackground**: Custom CSS-based animation system (16 particles, avocado colors)
- **AdminAuth**: Wrapper component for route protection with localStorage
- **Shared navigation**: Repeated across pages (consider extracting to component)

## Integration Points

### Database Seeding
- **No package.json seed script** - run directly: `node prisma/seed.js`
- **Seed data includes** projects with full `longDescription`/`features` arrays as JSON strings
- **Both projects and blog posts** have priority, featured, and analytics fields

### Admin Functionality 
- **Projects CRUD**: `/admin/projects/*` - create, edit, delete, toggle published/featured
- **Blog CRUD**: `/admin/blog/*` - full post management with auto-slug generation
- **No image upload implemented** - placeholder URLs used

### API Data Flow Issues to Avoid
```js
// ❌ WRONG - Will cause database errors
await prisma.project.update({
  data: { technologies: ["React", "Next.js"] } // Array to JSON string column
})

// ✅ CORRECT - Convert arrays before saving
await prisma.project.update({
  data: { 
    technologies: JSON.stringify(["React", "Next.js"]),
    features: JSON.stringify(formData.features)
  }
})
```

## Key Files for Context

- `src/lib/prisma.js` - Database singleton pattern
- `src/components/AdminAuth.js` - Authentication wrapper (password: admin123)
- `src/app/api/projects/[id]/route.js` - Critical data transformation patterns
- `prisma/schema.prisma` - Database schema with JSON string fields
- `src/app/globals.css` - CSS variables and theming system

## Development Gotchas

1. **Array/JSON Transform**: Always convert at API boundaries
2. **Admin Auth**: Use `<AdminAuth>` wrapper for protected routes  
3. **Seeding**: Use `node prisma/seed.js` not npm script
4. **Dev Server**: Check for conflicting package-lock.json files
5. **Color System**: Use CSS variables, not hardcoded hex values