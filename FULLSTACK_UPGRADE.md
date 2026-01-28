# Full-Stack Upgrade & File Storage Integration

## What's New

Your ExperiAI Labs website has been upgraded from a static frontend to a full-stack application with database integration and file storage capabilities.

## Key Changes

### 1. Backend Server
- **Framework**: Node.js with Express via tRPC
- **Database**: MySQL with Drizzle ORM
- **Authentication**: OAuth integration with user management
- **API**: Type-safe tRPC endpoints for all operations

### 2. Database Integration
- **Users Table**: Manages user authentication and roles
- **Files Table**: Stores file metadata and S3 references
- **Schema**: Located in `drizzle/schema.ts`
- **Migrations**: Automatic schema management via Drizzle Kit

### 3. File Storage System
- **S3 Backend**: Manus-provided storage proxy
- **API Endpoints**: Complete CRUD operations for files
- **Categories**: Team photos, marketing assets, content, and more
- **Admin Panel**: Full-featured file management interface at `/admin`

### 4. Frontend Enhancements
- **Admin Page**: New admin panel for file management
- **File Upload Component**: Reusable upload UI with progress feedback
- **Type Safety**: Full TypeScript support for API calls

## Project Structure

```
experiai-labs-website/
├── client/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Admin.tsx           # Admin file manager
│   │   │   └── ...existing pages
│   │   ├── components/
│   │   │   ├── FileUpload.tsx      # File upload component
│   │   │   └── ...existing components
│   │   └── App.tsx                 # Updated with admin route
│   └── public/
├── server/                          # Backend (Node.js + tRPC)
│   ├── routers/
│   │   ├── fileRouter.ts           # File storage API
│   │   └── fileRouter.test.ts      # File router tests
│   ├── db.ts                        # Database utilities
│   ├── storage.ts                   # S3 storage helpers
│   └── routers.ts                   # API router registration
├── drizzle/                         # Database schema & migrations
│   ├── schema.ts                    # Updated with files table
│   └── migrations/
├── FILE_STORAGE_GUIDE.md            # File storage documentation
├── FULLSTACK_UPGRADE.md             # This file
└── package.json                     # Updated dependencies
```

## Getting Started

### 1. Environment Setup

The following environment variables are automatically configured:
- `BUILT_IN_FORGE_API_KEY`: S3 storage authentication
- `BUILT_IN_FORGE_API_URL`: S3 storage endpoint
- `DATABASE_URL`: MySQL database connection
- `JWT_SECRET`: Authentication token signing
- `OAUTH_SERVER_URL`: OAuth provider URL

### 2. Database Initialization

The database schema is automatically created on first run:

```bash
pnpm db:push
```

This command:
1. Generates migration files from schema
2. Applies migrations to the database
3. Syncs TypeScript types with database schema

### 3. Starting the Development Server

```bash
pnpm dev
```

This starts both the frontend (Vite) and backend (Node.js) servers.

## File Storage API

### Quick Start

Upload a file from the admin panel:
1. Navigate to `/admin`
2. Select file category (Team Photos, Marketing Assets, Content)
3. Click "Click to upload file"
4. Select a file from your computer
5. File is automatically uploaded to S3 and metadata saved to database

### Programmatic Usage

```typescript
import { trpc } from '@/lib/trpc';

// Upload a file
const result = await trpc.files.upload.mutate({
  filename: 'team-photo.jpg',
  fileData: base64EncodedData,
  mimeType: 'image/jpeg',
  category: 'team-photo',
  teamMemberId: 'ashwini-sharma',
});

// List team photos
const photos = await trpc.files.listByCategory.query({
  category: 'team-photo',
});

// Get team member files
const memberFiles = await trpc.files.getTeamMemberFiles.query({
  teamMemberId: 'ashwini-sharma',
});
```

See `FILE_STORAGE_GUIDE.md` for complete API documentation.

## Testing

### Run All Tests

```bash
pnpm test
```

### Run File Storage Tests Only

```bash
pnpm test server/routers/fileRouter.test.ts
```

Expected output:
```
✓ server/routers/fileRouter.test.ts (9 tests) 9ms
Test Files  1 passed (1)
     Tests  9 passed (9)
```

## Admin Panel Features

Access the admin panel at `https://your-domain.com/admin`

### Features:
- **Tab Navigation**: Switch between file categories
- **File Upload**: Drag-and-drop or click to upload
- **Recent Uploads**: View recently uploaded files
- **File Management**: View, organize, and manage files
- **Guidelines**: Upload recommendations and best practices

### User Roles:
- **Admin**: Can upload, view, and delete files
- **User**: Can view files (delete restricted)

## Database Schema

### Files Table

```sql
CREATE TABLE files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  s3Key VARCHAR(512) NOT NULL UNIQUE,
  url TEXT NOT NULL,
  mimeType VARCHAR(100),
  fileSize INT,
  uploadedBy INT REFERENCES users(id),
  category VARCHAR(50),
  teamMemberId VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Security

### Authentication
- All API endpoints require user authentication
- OAuth-based login system
- JWT token-based session management

### Authorization
- File deletion restricted to admin users
- User can only access their own uploaded files (future enhancement)
- S3 access controlled via Manus proxy

### File Validation
- File type validation on frontend and backend
- File size limits enforced
- Filename sanitization

## Performance Optimization

### Current Implementation
- S3 storage for scalability
- Database indexing on frequently queried fields
- Lazy loading of file lists

### Recommendations
1. Implement CDN for file delivery
2. Add image optimization (resize, format conversion)
3. Implement chunked upload for large files
4. Add caching for frequently accessed files

## Troubleshooting

### Database Connection Issues
```
Error: Database not available
```
**Solution**: Check `DATABASE_URL` environment variable and ensure MySQL server is running.

### File Upload Fails
```
Error: Storage upload failed (401)
```
**Solution**: Verify `BUILT_IN_FORGE_API_KEY` and `BUILT_IN_FORGE_API_URL` are correctly set.

### Admin Panel Not Accessible
```
404 Not Found
```
**Solution**: Ensure you're logged in and have admin privileges. Navigate to `/admin` after authentication.

## Next Steps

1. **Upload Team Photos**: Use the admin panel to upload team member photos
2. **Organize Marketing Assets**: Create and organize marketing materials
3. **Implement Blog**: Use content files for blog articles
4. **Customize Upload Guidelines**: Modify guidelines in Admin.tsx
5. **Add Batch Upload**: Implement multi-file upload feature

## Migration from Static to Full-Stack

### What Changed
- Frontend remains mostly the same (React + Vite)
- Backend server now handles API requests
- Database stores user and file data
- Authentication required for certain operations

### What Stayed the Same
- All existing pages and routes
- Design and styling
- SEO optimization
- Team member profiles
- Contact forms

### Backward Compatibility
- All existing pages work as before
- Static assets still served from `/public`
- No breaking changes to existing functionality

## Support & Documentation

- **File Storage Guide**: See `FILE_STORAGE_GUIDE.md` for detailed API documentation
- **Database Schema**: See `drizzle/schema.ts` for database structure
- **API Router**: See `server/routers/fileRouter.ts` for implementation details
- **Tests**: See `server/routers/fileRouter.test.ts` for usage examples

## Deployment

### Pre-Deployment Checklist
- [ ] All tests passing: `pnpm test`
- [ ] No TypeScript errors: `pnpm type-check`
- [ ] Database migrations applied: `pnpm db:push`
- [ ] Environment variables configured
- [ ] Admin panel tested
- [ ] File upload tested

### Deployment Steps
1. Push code to repository
2. Configure environment variables in production
3. Run database migrations
4. Deploy to hosting platform
5. Test all functionality in production

## Version History

- **v2.0.0** (Current): Full-stack upgrade with file storage
  - Upgraded from static to full-stack
  - Added file storage system
  - Implemented admin panel
  - Added database integration
  - Created comprehensive documentation

- **v1.0.0**: Initial static website
  - React + Vite frontend
  - SEO optimization
  - Team member profiles
  - Contact forms

## Questions?

For questions or issues:
1. Check the troubleshooting section above
2. Review `FILE_STORAGE_GUIDE.md` for API details
3. Check server logs for error messages
4. Contact support at support@experiailabs.com
