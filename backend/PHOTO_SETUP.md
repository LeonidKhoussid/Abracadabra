# 📸 Property Photos Setup Guide

## 🔧 Yandex Object Storage Configuration

### 1. Create Yandex Cloud Account & Bucket
1. Go to [Yandex Cloud Console](https://console.cloud.yandex.com/)
2. Create a new bucket in Object Storage:
   - Name: `domli-properties` (or your preferred name)
   - Region: `ru-central1`
   - Access: Public read

### 2. Get Access Keys
1. Go to Service Accounts in Yandex Cloud
2. Create a service account with `storage.editor` role
3. Create access keys for the service account
4. Save the Access Key ID and Secret Access Key

### 3. Environment Variables
Add these to your `.env` file in the backend directory:

```env
# Yandex Object Storage Configuration
YANDEX_ACCESS_KEY_ID=your_access_key_id_here
YANDEX_SECRET_ACCESS_KEY=your_secret_access_key_here
YANDEX_BUCKET_NAME=domli-properties
```

## 📁 Photo Organization

### Expected Folder Structure for Bulk Upload:
```
backend/photos/
├── property-1/
│   ├── main.jpg          # Main property photo
│   ├── gallery-1.jpg     # Gallery photo 1
│   ├── gallery-2.jpg     # Gallery photo 2
│   ├── gallery-3.jpg     # Gallery photo 3
│   └── floor-plan.jpg    # Floor plan image
├── property-2/
│   ├── main.jpg
│   ├── gallery-1.jpg
│   └── floor-plan.jpg
└── property-N/
    └── ...
```

### Photo Types:
- **main.jpg** - Primary property photo (required)
- **gallery-N.jpg** - Additional photos for property gallery
- **floor-plan.jpg** - Floor plan or layout image

## 🚀 Usage

### 1. Bulk Upload Photos
```bash
# Place your photos in the expected folder structure
mkdir -p backend/photos/property-1
# Copy your photos to the appropriate folders

# Run the bulk upload script
cd backend
node scripts/upload-property-photos.js
```

### 2. API Endpoints

#### Upload Single Photo
```bash
POST /api/photos/upload
Content-Type: multipart/form-data

Body:
- photo: [file]
- propertyId: "1"
- photoType: "main" | "gallery" | "floor-plan"
```

#### Upload Multiple Photos
```bash
POST /api/photos/upload-multiple
Content-Type: multipart/form-data

Body:
- photos: [file array, max 10]
- propertyId: "1"
```

#### Delete Photo
```bash
DELETE /api/photos/delete
Content-Type: application/json

Body:
{
  "fileName": "property-photos/1/main-uuid.jpg"
}
```

#### Generate Presigned URL
```bash
POST /api/photos/presigned-url
Content-Type: application/json

Body:
{
  "propertyId": "1",
  "fileType": "jpg",
  "photoType": "main"
}
```

## 📊 Updated CSV Structure

The new CSV includes these photo columns:
- `main_photo_url` - URL to the main property photo
- `gallery_photos_urls` - Comma-separated URLs for gallery photos
- `floor_plan_url` - URL to the floor plan image

Example:
```csv
developer_name,project_name,...,main_photo_url,gallery_photos_urls,floor_plan_url
Ava Dom,Режиссёр,...,https://domli-properties.storage.yandexcloud.net/property-photos/1/main.jpg,"https://domli-properties.storage.yandexcloud.net/property-photos/1/gallery-1.jpg,https://domli-properties.storage.yandexcloud.net/property-photos/1/gallery-2.jpg",https://domli-properties.storage.yandexcloud.net/property-photos/1/floor-plan.jpg
```

## 🔒 Security Notes

- Photos are uploaded with `public-read` ACL for direct access
- File uploads are limited to 10MB per file
- Only image files (JPEG, PNG, WebP) are allowed
- Each photo gets a unique UUID in the filename to prevent conflicts

## 🎯 Next Steps

1. Set up your Yandex Object Storage bucket
2. Configure environment variables
3. Organize your photos in the expected folder structure
4. Run the bulk upload script
5. Update your properties endpoints to use the new CSV with photo URLs

The photo URLs will be automatically generated and can be used directly in your frontend React components! 