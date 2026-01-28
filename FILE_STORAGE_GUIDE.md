# File Storage Integration Guide

## Overview

ExperiAI Labs website now includes a comprehensive file storage system that allows you to upload, manage, and serve files for team photos, marketing assets, and content. The system uses S3 storage with database metadata tracking.

## Architecture

### Components

1. **Database Schema** (`drizzle/schema.ts`)
   - `files` table: Stores file metadata and S3 references
   - Tracks filename, S3 key, URL, MIME type, file size, uploader, category, and team member association

2. **API Router** (`server/routers/fileRouter.ts`)
   - `upload`: Upload files to S3 and save metadata
   - `getById`: Retrieve file metadata by ID
   - `listByCategory`: List files by category (team-photo, marketing-asset, content, other)
   - `getTeamMemberFiles`: Get files associated with a specific team member
   - `delete`: Delete files (admin only)

3. **Frontend Components**
   - `FileUpload.tsx`: Reusable file upload component with progress feedback
   - `Admin.tsx`: Admin panel for managing files across categories

4. **Storage Backend**
   - Uses Manus-provided S3 proxy via `storagePut()` and `storageGet()` helpers
   - Automatic authentication via `BUILT_IN_FORGE_API_KEY` and `BUILT_IN_FORGE_API_URL`

## File Categories

The system supports four file categories:

- **team-photo**: Team member profile photos (1:1 aspect ratio recommended)
- **marketing-asset**: Marketing materials, banners, promotional images
- **content**: Blog posts, articles, PDFs, documents
- **other**: Miscellaneous files

## API Endpoints

### Upload File

**Endpoint**: `POST /api/trpc/files.upload`

**Input**:
```typescript
{
  filename: string;           // Original filename (max 255 chars)
  fileData: string;           // Base64 encoded file data
  mimeType?: string;          // MIME type (default: application/octet-stream)
  category: 'team-photo' | 'marketing-asset' | 'content' | 'other';
  teamMemberId?: string;      // Optional team member association
}
```

**Response**:
```typescript
{
  success: boolean;
  filename: string;
  url: string;                // Public URL to access the file
  s3Key: string;              // S3 storage key
  fileSize: number;           // File size in bytes
}
```

### Get File by ID

**Endpoint**: `GET /api/trpc/files.getById`

**Input**:
```typescript
{
  fileId: number;
}
```

**Response**:
```typescript
{
  id: number;
  filename: string;
  s3Key: string;
  url: string;
  mimeType: string;
  fileSize: number;
  uploadedBy: number;
  category: string;
  teamMemberId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### List Files by Category

**Endpoint**: `GET /api/trpc/files.listByCategory`

**Input**:
```typescript
{
  category: 'team-photo' | 'marketing-asset' | 'content' | 'other';
  limit?: number;             // Default: 50
}
```

**Response**: Array of file objects

### Get Team Member Files

**Endpoint**: `GET /api/trpc/files.getTeamMemberFiles`

**Input**:
```typescript
{
  teamMemberId: string;
}
```

**Response**: Array of file objects for the team member

### Delete File

**Endpoint**: `POST /api/trpc/files.delete`

**Input**:
```typescript
{
  fileId: number;
}
```

**Response**:
```typescript
{
  success: boolean;
  deletedFileId: number;
}
```

**Note**: Only admin users can delete files.

## Admin Panel

Access the admin file manager at `/admin`:

1. **Tab Navigation**: Switch between Team Photos, Marketing Assets, and Content Files
2. **Upload Section**: Click to upload files with guidelines
3. **Recent Uploads**: View and manage uploaded files

### Upload Guidelines

- Maximum file size: 10MB
- Supported formats: JPG, PNG, PDF, DOC, DOCX
- Team photos should be 1:1 aspect ratio
- Use descriptive filenames

## Usage Examples

### Upload a Team Photo

```typescript
// In a React component
import { trpc } from '@/lib/trpc';

const uploadTeamPhoto = async (file: File, teamMemberId: string) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64Data = (e.target?.result as string).split(',')[1];
    
    const result = await trpc.files.upload.mutate({
      filename: file.name,
      fileData: base64Data,
      mimeType: file.type,
      category: 'team-photo',
      teamMemberId,
    });
    
    console.log('Uploaded:', result.url);
  };
  reader.readAsDataURL(file);
};
```

### Retrieve Team Member Files

```typescript
const teamMemberFiles = await trpc.files.getTeamMemberFiles.query({
  teamMemberId: 'ashwini-sharma',
});

console.log('Team member files:', teamMemberFiles);
```

### List All Team Photos

```typescript
const teamPhotos = await trpc.files.listByCategory.query({
  category: 'team-photo',
  limit: 50,
});

console.log('Team photos:', teamPhotos);
```

## Database Schema

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

## Security Considerations

1. **Authentication**: All file operations require user authentication
2. **Authorization**: Delete operations are restricted to admin users
3. **File Validation**: Implement client-side validation for file types and sizes
4. **S3 Access**: Files are stored in S3 with automatic authentication via Manus proxy
5. **URL Expiration**: Consider implementing presigned URL expiration for sensitive files

## Best Practices

1. **Naming Conventions**: Use descriptive, lowercase filenames with hyphens
   - Good: `team-ashwini-sharma-2024.jpg`
   - Bad: `photo.jpg`, `IMG_1234.JPG`

2. **File Organization**: Use categories to organize files logically
   - Team photos in `team-photo` category
   - Marketing materials in `marketing-asset` category
   - Blog content in `content` category

3. **Team Member Association**: Link team photos to team members for easy retrieval
   - Use consistent team member IDs
   - Example: `ashwini-sharma`, `shailendra-kumar`

4. **File Size Optimization**: Compress images before uploading
   - Recommended max: 2-3MB per image
   - Use WebP format for better compression

5. **Backup Strategy**: Regularly backup file metadata from the database
   - Export file list monthly
   - Verify S3 access logs

## Troubleshooting

### Upload Fails with 401 Error
- Check `BUILT_IN_FORGE_API_KEY` and `BUILT_IN_FORGE_API_URL` environment variables
- Verify credentials are correctly set in project settings

### File Not Found After Upload
- Check database for file metadata
- Verify S3 key is correct
- Check file URL is accessible

### Large File Upload Timeout
- Increase request timeout in server configuration
- Split large files into chunks (implement chunked upload)
- Compress files before uploading

## Future Enhancements

1. **Chunked Upload**: Support for large file uploads (>100MB)
2. **Image Optimization**: Automatic image resizing and format conversion
3. **Virus Scanning**: Integrate antivirus scanning for uploaded files
4. **CDN Integration**: Use CDN for faster file delivery
5. **File Versioning**: Track file versions and allow rollback
6. **Batch Upload**: Upload multiple files at once
7. **Drag & Drop**: Implement drag-and-drop file upload UI

## Testing

Run the file storage tests:

```bash
pnpm test server/routers/fileRouter.test.ts
```

All 9 tests should pass:
- ✓ upload: File upload and metadata saving
- ✓ upload: Error handling for unavailable database
- ✓ upload: Base64 data handling
- ✓ getById: File retrieval by ID
- ✓ getById: Null return for missing files
- ✓ listByCategory: Category-based file listing
- ✓ delete: Admin-only file deletion
- ✓ delete: Non-admin deletion rejection
- ✓ getTeamMemberFiles: Team member file retrieval

## Support

For issues or questions about file storage:
1. Check this guide's Troubleshooting section
2. Review API error messages in browser console
3. Check server logs for detailed error information
4. Contact support at support@experiailabs.com
