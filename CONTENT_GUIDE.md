# Content Management Guide

## Overview

Content for the Rotaract Club MEC website can be managed dynamically through **Strapi CMS** or locally through **JSON files** located in the `public/data/` directory. If the environment variable `VITE_STRAPI_API_URL` is set, the website loads content from Strapi; otherwise, it falls back to the local JSON files.

---

## Managing Content in Strapi

### 1. Accessing the Admin Panel
1. Open your browser and navigate to the Strapi Admin Panel:
   * Local: `http://localhost:1337/admin`
   * Production: `https://your-strapi-domain.com/admin`
2. Log in using your admin or editor credentials.

### 2. Navigating content types
In the left sidebar, click on the **Content Manager**:
* **Collection Types** (Multi-item data):
  * **Blogs**: Create, edit, or delete articles. Supports Markdown formatting in the content body.
  * **Events**: Add new events with categories, dates, times, locations, and registration links.
  * **Coordinators**: Update team coordinators, titles, departments, and social links.
  * **Activities**: Add recent highlight activities and detail parameters.
* **Single Types** (Single-page layouts):
  * **Introduction**: Update page header values, vision, mission, purpose statements, and core value lists.
  * **Membership**: Update application process step descriptions, eligibility requirements, and emails.

### 3. Creating & Editing Entries
1. Select the content type from the sidebar.
2. Click **Create new entry** or select an existing one to edit it.
3. Fill in the fields:
   * **Images**: Upload directly to the media field. The site will automatically prepend your Strapi base URL.
   * **Markdown**: The main content editor supports rich text markdown syntax.
4. Click **Save** to store changes.

> [!IMPORTANT]
> **Draft vs. Publish:** In Strapi, changes are saved as a "Draft" by default. You MUST click the **Publish** button in the top right for changes to become live and accessible to the website.

### 4. Activating API Permissions (Public Access)
By default, Strapi restricts public access to new content type API endpoints. To make content visible on the website:
1. In the Strapi Admin Panel sidebar, navigate to **Settings** (under the General section).
2. Go to **Users & Permissions Plugin** > **Roles**.
3. Click on the **Public** role.
4. Expand the permissions for each of your content types (Activities, Blogs, Coordinators, Events, Introduction, Membership).
5. Check the boxes for **find** and **findOne** (or **find** only for Single Types).
6. Click **Save** in the top right.

*Note: Alternatively, if you want to keep the endpoints private, you can generate an API Token in **Settings** > **API Tokens** and set it as `VITE_STRAPI_TOKEN` in your `.env` file.*

---

## File Locations

All content files are in: `/public/data/`

- `coordinators.json` - Team members
- `events.json` - Events
- `blogs.json` - Blog posts
- `activities.json` - Activities
- `content.json` - Static content (About, Membership)

## Adding/Editing Coordinators

### File: `coordinators.json`

#### Structure
```json
{
  "id": "unique-identifier",
  "name": "Full Name",
  "role": "Position Title",
  "department": "Department/Year",
  "year": "Year (e.g., Final Year, Second Year)",
  "description": "Short bio or description",
  "image": "URL to image",
  "social": {
    "facebook": "https://facebook.com/profile",
    "instagram": "https://instagram.com/profile",
    "linkedin": "https://linkedin.com/profile"
  }
}
```

#### Example
```json
{
  "id": "1",
  "name": "Rahul Kumar",
  "role": "President",
  "department": "Computer Science",
  "year": "Final Year",
  "description": "Passionate about community service and leadership",
  "image": "https://via.placeholder.com/400x400?text=Rahul+Kumar",
  "social": {
    "facebook": "https://facebook.com/rahulkumar",
    "instagram": "https://instagram.com/rahulkumar",
    "linkedin": "https://linkedin.com/in/rahulkumar"
  }
}
```

#### Guidelines
- Use unique IDs (typically incrementing numbers)
- Keep descriptions under 100 characters
- Image URLs should be HTTPS (use placeholder URLs for testing)
- All social fields are optional

## Adding/Editing Events

### File: `events.json`

#### Structure
```json
{
  "id": "unique-id",
  "title": "Event Title",
  "description": "Event description",
  "date": "YYYY-MM-DD",
  "time": "HH:MM AM/PM",
  "location": "Location Name",
  "image": "URL to image",
  "registrationLink": "URL to registration",
  "category": "Event Category"
}
```

#### Example
```json
{
  "id": "1",
  "title": "Annual Rotaract Summit",
  "description": "A comprehensive summit bringing together leaders",
  "date": "2024-07-15",
  "time": "09:00 AM",
  "location": "MEC Auditorium",
  "image": "https://via.placeholder.com/600x400?text=Summit",
  "registrationLink": "https://forms.google.com/...",
  "category": "Summit"
}
```

#### Event Categories
- Summit
- Workshop
- Community Service
- Education
- Fundraiser
- Sports
- Other

#### Date Format
- Use ISO format: `YYYY-MM-DD`
- Times in 12-hour format: `HH:MM AM/PM`

## Adding/Editing Blog Posts

### File: `blogs.json`

#### Structure
```json
{
  "id": "unique-id",
  "title": "Blog Title",
  "author": "Author Name",
  "date": "YYYY-MM-DD",
  "coverImage": "URL to cover image",
  "excerpt": "Short preview text",
  "content": "# Full Markdown Content",
  "tags": ["tag1", "tag2"],
  "category": "Category"
}
```

#### Example
```json
{
  "id": "1",
  "title": "Impact of Community Service",
  "author": "Rahul Kumar",
  "date": "2024-06-15",
  "coverImage": "https://via.placeholder.com/800x400",
  "excerpt": "Exploring how volunteering transforms individuals...",
  "content": "# Impact of Community Service\n\n## Introduction\nCommunity service...",
  "tags": ["community", "service", "impact"],
  "category": "Service"
}
```

#### Content Formatting (Markdown)

The `content` field supports full Markdown:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
***Bold and italic***

- Bullet point 1
- Bullet point 2

1. Numbered point 1
2. Numbered point 2

[Link text](https://example.com)

> Blockquote text

`inline code`

\`\`\`
code block
\`\`\`

![Image alt text](image-url)
```

#### Blog Categories
- Service
- News
- Membership
- Education
- Impact
- Other

#### Guidelines
- Keep excerpt under 150 characters
- Use relevant tags for searchability
- Write content in Markdown
- Include at least 2-3 paragraphs
- Add images where appropriate

## Adding/Editing Activities

### File: `activities.json`

#### Structure
```json
{
  "id": "unique-id",
  "title": "Activity Title",
  "description": "Activity description",
  "date": "YYYY-MM-DD",
  "category": "Category",
  "image": "URL to image",
  "details": "More details about the activity"
}
```

#### Example
```json
{
  "id": "1",
  "title": "Skill Development Workshop",
  "description": "Workshop on communication and leadership",
  "date": "2024-06-10",
  "category": "Workshop",
  "image": "https://via.placeholder.com/600x400",
  "details": "Learn essential skills from industry experts"
}
```

#### Activity Categories
- Workshop
- Health
- Environment
- Youth
- Relief
- Education
- Sports
- Women
- Other

## Editing Static Content

### File: `content.json`

#### Introduction Page Content
```json
{
  "introduction": {
    "title": "Page Title",
    "vision": "Vision statement",
    "mission": "Mission statement",
    "purpose": "Purpose description",
    "history": "Historical information",
    "values": [
      {
        "title": "Value Name",
        "description": "Value description"
      }
    ]
  }
}
```

#### Membership Page Content
```json
{
  "membership": {
    "title": "Page Title",
    "tagline": "Catchy tagline",
    "introduction": "Introduction text",
    "benefits": [
      {
        "title": "Benefit Title",
        "description": "Benefit description",
        "icon": "emoji"
      }
    ],
    "eligibility": ["criterion 1", "criterion 2"],
    "process": [
      {
        "step": 1,
        "title": "Step Title",
        "description": "Step description"
      }
    ],
    "joinButtonText": "Button Text",
    "contactEmail": "email@example.com"
  }
}
```

## Image Management

### Image URLs

#### Using External URLs
```json
"image": "https://example.com/image.jpg"
```

#### Using Placeholder Images
```json
"image": "https://via.placeholder.com/600x400?text=Event+Title"
```

### Image Best Practices
- Use HTTPS URLs only
- Optimize images before uploading
- Use descriptive alt text
- Recommended formats: JPG, PNG, WebP
- Recommended sizes:
  - Coordinators: 400x400px
  - Events: 600x400px
  - Blogs: 800x400px
  - Activities: 600x400px

## Adding New Features/Sections

### Create New Data File

If you need to add a new section:

1. Create new JSON file in `public/data/`
2. Create corresponding service in `src/services/`
3. Create components and pages as needed
4. Update Router in `App.tsx`

### Example: News Section

1. Create `public/data/news.json`
2. Create `src/services/newsService.ts`
3. Create `src/pages/NewsPage.tsx`
4. Update `src/App.tsx` routes
5. Update `src/components/Navbar.tsx`

## Best Practices

### 1. JSON Formatting
```json
// ✅ Good
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com"
}

// ❌ Bad
{id:"1",name:"John Doe",email:"john@example.com"}
```

### 2. Data Validation
- Always use unique IDs
- Ensure dates are in YYYY-MM-DD format
- Verify URLs are valid HTTPS
- Keep descriptions concise

### 3. Consistency
- Use same category names consistently
- Follow naming conventions
- Use consistent formatting
- Update modified dates appropriately

### 4. URL Management
- Use full URLs (include protocol)
- Test all links
- Use secure HTTPS URLs
- Backup external links

## Common Issues & Solutions

### Issue: JSON validation error
**Solution**: Use a JSON validator like JSONLint
```bash
# Online: https://jsonlint.com/
```

### Issue: Images not loading
**Solution**: 
- Check if URL is accessible
- Ensure it's HTTPS
- Try different image service

### Issue: Markdown not rendering
**Solution**:
- Verify markdown syntax
- Check for unescaped quotes
- Use proper code block syntax

### Issue: Duplicate IDs
**Solution**:
- Use unique identifiers
- Check for duplicates with search
- Use UUID generator if needed

## Version Control

### Backup Before Changes
```bash
# Create backup
cp public/data/events.json public/data/events.json.backup

# After verification, remove backup
rm public/data/events.json.backup
```

## Migration & Export

### Export Data to CSV
```bash
# Install csvjson globally
npm install -g csvjson

# Convert JSON to CSV
csvjson public/data/coordinators.json > export.csv
```

### Import from External Source
1. Export data from existing system
2. Convert to appropriate JSON format
3. Validate structure
4. Test in development
5. Deploy to production

## Tools & Resources

### JSON Editors
- [JSON Editor Online](https://jsoneditoronline.org/)
- [JSONLint](https://jsonlint.com/)
- VS Code with JSON extensions

### Markdown Resources
- [Markdown Guide](https://www.markdownguide.org/)
- [CommonMark](https://commonmark.org/)
- Markdown cheatsheet in code editor

### Image Tools
- [TinyPNG](https://tinypng.com/) - Image compression
- [Placeholder](https://via.placeholder.com/) - Test images
- [Unsplash](https://unsplash.com/) - Free images

## Support

For questions or issues:
- Email: rotaract@mec.ac.in
- Check README.md for general guidance
- Refer to ARCHITECTURE.md for technical details

---

**Last Updated**: June 2024
**Version**: 1.0
