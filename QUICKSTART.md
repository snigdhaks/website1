# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Run with Docker (Recommended)

```bash
cd /home/alestor123/PROJECTS/website
docker-compose up -d
```

Then open: **http://localhost**

### Option 2: Local Development

```bash
cd /home/alestor123/PROJECTS/website
npm install
npm run dev
```

Then open: **http://localhost:5173**

### Option 3: Production Build

```bash
npm run build
npm run preview
```

## 📋 What You Get

✅ **8 Beautiful Pages**
- Splash Screen with animations
- Homepage with hero section
- About/Introduction page
- Team Coordinators directory
- Membership information
- Activities gallery
- Events calendar
- Full-featured blog

✅ **Features**
- Dark theme with gold accents
- Fully responsive (mobile-first)
- Smooth animations with Framer Motion
- Data-driven from JSON files
- Blog with markdown support
- Event management
- Activity filtering

✅ **Ready for Production**
- Docker containerization
- Nginx web server
- Security headers
- Gzip compression
- Performance optimized

## 📁 Project Structure

```
website/
├── public/data/              # JSON content files
├── src/
│   ├── components/           # Reusable UI components
│   ├── pages/                # Page components
│   ├── services/             # Data fetching services
│   └── utils/                # Helper functions
├── Dockerfile                # Docker configuration
└── README.md                 # Full documentation
```

## 🎨 Customization

### Change Site Name
Edit `public/data/content.json`:
```json
"title": "Your Club Name"
```

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { ... },    // Deep blue
  gold: { ... },       // Gold accent
  dark: { ... }        // Dark background
}
```

### Add New Content

#### Add a Coordinator
Edit `public/data/coordinators.json`:
```json
{
  "id": "7",
  "name": "Your Name",
  "role": "Your Role",
  "image": "https://...",
  ...
}
```

#### Add an Event
Edit `public/data/events.json`:
```json
{
  "id": "7",
  "title": "Event Title",
  "date": "2024-07-20",
  ...
}
```

#### Add a Blog Post
Edit `public/data/blogs.json`:
```json
{
  "id": "7",
  "title": "Blog Title",
  "content": "# Markdown content here",
  ...
}
```

For detailed content editing, see [CONTENT_GUIDE.md](CONTENT_GUIDE.md)

## 🐳 Docker Commands

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Rebuild
docker-compose build --no-cache
docker-compose up -d
```

## 📚 Documentation

- **[README.md](README.md)** - Complete overview
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guides
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture
- **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)** - Content management

## 🔗 Pages & Routes

| Page | Route | Files |
|------|-------|-------|
| Splash | - | SplashScreen.tsx |
| Home | / | HomePage.tsx |
| About | /introduction | IntroductionPage.tsx |
| Team | /coordinators | CoordinatorsPage.tsx |
| Membership | /membership | MembershipPage.tsx |
| Activities | /activities | ActivitiesPage.tsx |
| Events | /events | EventsPage.tsx |
| Blog | /blog | BlogPage.tsx |
| Blog Post | /blog/:id | BlogDetailPage.tsx |

## 🎯 Key Features

### 1. Splash Screen
- Animated logo and text reveal
- Loading indicators
- Smooth transition to home

### 2. Responsive Design
- Mobile-first approach
- Works on all devices
- Hamburger menu on mobile

### 3. Animations
- Page transitions
- Scroll reveal effects
- Card hover animations
- Framer Motion throughout

### 4. Blog System
- Full markdown support
- Search functionality
- Category filtering
- Related posts
- Social sharing ready

### 5. Event Management
- Upcoming & past events
- Featured event section
- Calendar view
- Registration links

### 6. Activity Gallery
- Grid and timeline views
- Category filtering
- Impact statistics

## 💡 Development Tips

### Hot Reload
Development server auto-reloads on file changes:
```bash
npm run dev
```

### Build Optimization
Production build is optimized:
- Minified CSS/JS
- Asset hashing
- Tree shaking
- Code splitting

### Debug Mode
Check console for logs:
```bash
# Browser DevTools → Console
```

## 🔒 Security

✅ Security headers configured
✅ XSS protection enabled
✅ Content Security Policy set
✅ Secure dependencies

## 📊 Performance

- **CSS**: 5.15 KB (gzipped)
- **JS**: 149.58 KB (gzipped)
- **Total**: ~155 KB

Lighthouse scores target: 90+

## 🐛 Troubleshooting

### Port Already in Use
```bash
lsof -i :80
kill -9 <PID>
```

### Container Won't Start
```bash
docker-compose logs
docker-compose down
docker-compose up -d
```

### Build Errors
```bash
rm -rf node_modules dist
npm install
npm run build
```

## 📞 Support

- **Email**: rotaract@mec.ac.in
- **GitHub**: Your repo URL
- **Issues**: GitHub Issues

## 🚀 Next Steps

1. **Customize Content**
   - Edit JSON files in `public/data/`
   - Update club information
   - Add your events and activities

2. **Deploy**
   - Use Docker for easy deployment
   - See DEPLOYMENT.md for options
   - Deploy to cloud (Vercel, Netlify, etc.)

3. **Add Features** (Optional)
   - Integrate backend API
   - Add user authentication
   - Create admin dashboard
   - Add event registration

4. **Optimize**
   - Use CDN for images
   - Add analytics
   - Monitor performance
   - Collect feedback

## 📝 License

MIT License - Free to use and modify

---

**That's it! Your Rotaract website is ready. 🎉**

For more details, see the full documentation files.
