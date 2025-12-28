# Environment Variables Setup

Copy the database URL to your `.env` file (created by Prisma):

```env
# Database
DATABASE_URL="postgresql://postgres:427811@localhost:5432/asad_db"

# NextAuth
NEXTAUTH_SECRET="asad-web-secret-key-2024-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Strapi (keep for parallel migration)
NEXT_PUBLIC_STRAPI_URL="http://localhost:1337"
STRAPI_API_TOKEN=""
```
