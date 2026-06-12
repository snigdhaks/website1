# Rotaract Club MEC Thrikkakara - Official Website

A premium, modern, mobile-first website for **Rotaract Club of Model Engineering College, Thrikkakara**. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Animated Splash Screen** - Premium cinematic loading experience
- **Dynamic Content Architecture** - All data driven from JSON files
- **Responsive Design** - Mobile-first approach for all devices
- **Premium Animations** - Smooth transitions and scroll effects
- **Dark Theme** - Professional dark-themed UI with gold accents
- **Blog System** - Full-featured blog with search and filtering
- **Event Management** - Upcoming and past events display
- **Activity Gallery** - Timeline and grid views of activities
- **Membership Portal** - Join information and benefits
- **Coordinator Directory** - Team member profiles
- **Docker Ready** - Production-ready containerization

## 📋 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Cards.tsx        # Card components
│   ├── Common.tsx       # Button, Hero, Section components
│   ├── PageHeader.tsx
│   └── SplashScreen.tsx
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── IntroductionPage.tsx
│   ├── CoordinatorsPage.tsx
│   ├── MembershipPage.tsx
│   ├── ActivitiesPage.tsx
│   ├── EventsPage.tsx
│   ├── BlogPage.tsx
│   └── BlogDetailPage.tsx
├── services/            # API/Data fetching services
│   ├── blogService.ts
│   ├── eventService.ts
│   ├── coordinatorService.ts
│   └── activityService.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx              # Main App component
├── main.tsx             # Entry point
└── index.css            # Global styles

public/
└── data/                # JSON data files
    ├── coordinators.json
    ├── events.json
    ├── blogs.json
    ├── activities.json
    └── content.json
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Markdown**: React Markdown
- **Container**: Docker + Nginx

## 📦 Installation

### Prerequisites
- Node.js >= 18
- npm or yarn
- Docker (optional, for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   cd /home/alestor123/PROJECTS/website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The site will open at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🐳 Docker Deployment

### Build and Run with Docker Compose

1. **Build the Docker image**
   ```bash
   docker-compose build
   ```

2. **Start the container**
   ```bash
   docker-compose up -d
   ```

3. **Access the website**
   - Open http://localhost in your browser

4. **View logs**
   ```bash
   docker-compose logs -f rotaract-website
   ```

5. **Stop the container**
   ```bash
   docker-compose down
   ```

### Manual Docker Commands

```bash
# Build image
docker build -t rotaract-mec:latest .

# Run container
docker run -d -p 80:80 --name rotaract rotaract-mec:latest

# View logs
docker logs -f rotaract

# Stop container
docker stop rotaract
docker rm rotaract
```

## 📊 Data Management

### Adding Content

All content is managed through JSON files in `public/data/`:

#### Coordinators
Edit `coordinators.json` to add/update team members:
```json
{
  "id": "unique-id",
  "name": "Name",
  "role": "Role",
  "department": "Department",
  "year": "Year",
  "description": "Bio",
  "image": "URL",
  "social": { "facebook": "#", "instagram": "#" }
}
```

#### Events
Add events in `events.json`:
```json
{
  "id": "unique-id",
  "title": "Event Title",
  "date": "2024-07-15",
  "time": "09:00 AM",
  "location": "Location",
  "image": "URL",
  "description": "Description",
  "registrationLink": "URL",
  "category": "Summit"
}
```

#### Blog Posts
Add blog posts in `blogs.json`:
```json
{
  "id": "unique-id",
  "title": "Title",
  "author": "Author Name",
  "date": "2024-06-15",
  "coverImage": "URL",
  "excerpt": "Short excerpt",
  "content": "# Full markdown content",
  "tags": ["tag1", "tag2"],
  "category": "Category"
}
```

#### Activities
Update `activities.json`:
```json
{
  "id": "unique-id",
  "title": "Activity Title",
  "description": "Description",
  "date": "2024-06-10",
  "category": "Workshop",
  "image": "URL",
  "details": "Detailed description"
}
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- `primary` - Deep blue
- `gold` - Gold accents
- `dark` - Dark theme background

### Fonts
The site uses:
- **Inter** for body text
- **Space Grotesk** for headings

### Animation Duration
Modify animation timings in component files (e.g., `SplashScreen.tsx`)

## 🌐 Deployment

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

### Vercel
1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

### Self-Hosted
Use the Docker setup as described above.

## 📱 Features Breakdown

### 1. Splash Screen
- Animated Rotaract logo
- Club name reveal animation
- Loading indicators
- Smooth transition to homepage

### 2. Homepage
- Hero section with CTA buttons
- About section with vision/mission
- Upcoming events showcase
- Featured blog posts
- Activities overview
- Membership call-to-action

### 3. Introduction Page
- Club history and story
- Vision and mission statements
- Core values (4 values)
- Impact statistics

### 4. Coordinators
- Team member cards
- Role descriptions
- Social media links
- Leadership roles explained

### 5. Membership
- Benefits showcase
- Eligibility criteria
- Membership process (4 steps)
- FAQ section
- Application form link

### 6. Activities
- Activity grid/timeline
- Category filtering
- Activity details
- Impact statistics

### 7. Events
- Upcoming events
- Past events
- Event registration
- Calendar view
- Featured event

### 8. Blog
- Blog listing with search
- Category filtering
- Featured blog post
- Full blog post reading
- Related posts
- Author information
- Social sharing

## 🔧 Development

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `App.tsx`
3. Add navigation link in `Navbar.tsx`

### Adding Components

Place reusable components in `src/components/` with proper TypeScript types.

### Services

Create new services in `src/services/` for data fetching logic.

## 📋 Performance

- **Gzip Compression** enabled
- **Image Optimization** recommended
- **Code Splitting** via Vite
- **CSS Purging** via Tailwind
- **Caching** configured in Nginx

## 🔒 Security

- Content Security Policy headers
- XSS Protection
- CSRF tokens ready
- Secure dependencies

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Contact

**Rotaract Club MEC Thrikkakara**
- Email: rotaract@mec.ac.in
- Location: Model Engineering College, Thrikkakara, Kerala

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Event registration system
- [ ] Newsletter subscription
- [ ] Multi-language support
- [ ] PWA support
- [ ] CMS integration

---

**Made with 💛 by Rotaract Club MEC Thrikkakara**
