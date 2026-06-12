# Architecture Documentation

## Project Architecture Overview

This document describes the overall architecture of the Rotaract Club MEC website.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React 18 Application                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │   Components     │         │     Pages        │          │
│  ├──────────────────┤         ├──────────────────┤          │
│  │ • Navbar         │         │ • HomePage       │          │
│  │ • Footer         │         │ • Introduction   │          │
│  │ • Cards          │         │ • Coordinators   │          │
│  │ • Common (Hero)  │         │ • Membership     │          │
│  │ • SplashScreen   │         │ • Activities     │          │
│  └────────┬─────────┘         │ • Events         │          │
│           │                    │ • Blog           │          │
│           │                    │ • BlogDetail     │          │
│           ▼                    └────────┬─────────┘          │
│  ┌─────────────────────────────────────┘                    │
│  │                                                            │
│  │        ┌─────────────────────────────┐                   │
│  ├───────▶│   Services Layer            │                   │
│  │        ├─────────────────────────────┤                   │
│  │        │ • blogService               │                   │
│  │        │ • eventService              │                   │
│  │        │ • coordinatorService        │                   │
│  │        │ • activityService           │                   │
│  │        └────────────┬────────────────┘                   │
│  │                     │                                     │
│  │                     ▼                                     │
│  │        ┌─────────────────────────────┐                   │
│  │        │   JSON Data Files (public/) │                   │
│  │        ├─────────────────────────────┤                   │
│  │        │ • blogs.json                │                   │
│  │        │ • events.json               │                   │
│  │        │ • coordinators.json         │                   │
│  │        │ • activities.json           │                   │
│  │        │ • content.json              │                   │
│  │        └─────────────────────────────┘                   │
│  │                                                            │
│  └────────────────────────────────────────────────────────┬──┘
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
        ┌──────────────────────────────────┐
        │     Tailwind CSS Styling         │
        │     Framer Motion Animations     │
        │     React Router Navigation      │
        └──────────────────────────────────┘
```

## Component Hierarchy

### Layout Components
```
App
├── Navbar
├── SplashScreen
├── Routes
│   ├── HomePage
│   ├── IntroductionPage
│   ├── CoordinatorsPage
│   ├── MembershipPage
│   ├── ActivitiesPage
│   ├── EventsPage
│   ├── BlogPage
│   └── BlogDetailPage
└── Footer
```

### Reusable Components
- **Card Components**: GlassCard, CoordinatorCard, EventCard, BlogCard, ActivityCard
- **Layout Components**: Hero, Section, PageHeader
- **UI Components**: Button, AnimatedCounter
- **Features**: CardGrid for responsive grid layouts

## Data Flow

### 1. Static Data Loading
```
JSON Files (public/data/)
    │
    ▼
Service Layer (fetch & filter)
    │
    ▼
Components (useEffect)
    │
    ▼
UI Rendering
```

### 2. User Interactions
```
User Action (click, search, filter)
    │
    ▼
Component State Update
    │
    ▼
Service Method Call
    │
    ▼
Re-render UI
```

## File Structure

```
project/
├── public/
│   └── data/
│       ├── coordinators.json
│       ├── events.json
│       ├── blogs.json
│       ├── activities.json
│       └── content.json
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Cards.tsx
│   │   ├── Common.tsx
│   │   ├── PageHeader.tsx
│   │   ├── SplashScreen.tsx
│   │   └── index.ts
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── IntroductionPage.tsx
│   │   ├── CoordinatorsPage.tsx
│   │   ├── MembershipPage.tsx
│   │   ├── ActivitiesPage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── BlogPage.tsx
│   │   └── BlogDetailPage.tsx
│   │
│   ├── services/
│   │   ├── blogService.ts
│   │   ├── eventService.ts
│   │   ├── coordinatorService.ts
│   │   └── activityService.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── hooks/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   └── helpers.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **React Markdown** - Blog rendering

### Build & Dev
- **Vite** - Build tool
- **ESLint** - Code linting
- **npm** - Package manager

### Deployment
- **Docker** - Containerization
- **Nginx** - Web server
- **Docker Compose** - Orchestration

## Styling Approach

### Dark Theme
- Background: `dark-950` to `dark-800`
- Primary: `primary-600` deep blue
- Accent: `gold-400` to `gold-500`
- Text: `white` and `gray-300`

### Components Styling
- Glass morphism effect with `glass-card-dark`
- Soft shadows and rounded corners
- Smooth transitions on interactions
- Responsive grid layouts

## Animation Strategy

### Framer Motion Variants
- **Splash Screen**: Logo rotation, text reveal
- **Page Transitions**: Fade and scale effects
- **Card Hover**: Y-axis movement
- **Scroll Reveal**: Staggered animations
- **Button Interactions**: Scale and tap effects

### Performance Considerations
- Use `viewport` on `whileInView` to prevent unnecessary animations
- Implement `transition` with appropriate durations
- Use `lazy` loading for images

## State Management

### Component State
- Local state for UI interactions (open/close modals, filters)
- useState for form inputs and tabs
- No global state management needed (data is read-only)

### Future Scaling
When adding a backend:
1. Consider Redux or Zustand for global state
2. Implement React Query for server state
3. Add authentication context

## Service Layer Design

### Pattern
Each service follows the same pattern:
```typescript
service.getAll() → all items
service.getById(id) → specific item
service.getRecent(limit) → limited set
service.getBy*(filter) → filtered items
service.search(query) → search items
```

### Error Handling
- Try-catch blocks in all services
- Console logging for debugging
- Return empty arrays on error
- Graceful fallbacks in UI

## Future Enhancements

### Backend Integration
1. Replace services to fetch from API
2. Keep same service interface
3. Update data types as needed
4. Add authentication

### Performance Optimization
1. Image lazy loading
2. Code splitting per route
3. Service worker for PWA
4. Lighthouse optimization

### Features
1. User authentication
2. Admin dashboard
3. Event registration
4. Newsletter subscription
5. Multi-language support
6. Search functionality
7. Comments on blogs

## Security Considerations

### Current
✓ CSP headers configured
✓ XSS protection enabled
✓ Secure dependencies
✓ No API keys exposed

### Future
- Input validation
- Rate limiting
- CORS configuration
- JWT authentication
- Environment secrets management

## Performance Metrics

### Build Size
- CSS: ~5.15 KB (gzipped)
- JS: ~149.58 KB (gzipped)
- Total: ~155 KB

### Lighthouse Targets
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 95+

## Testing Strategy (Future)

```typescript
// Unit Tests
- Service functions
- Utility functions
- Component rendering

// Integration Tests
- Page navigation
- Data fetching
- User interactions

// E2E Tests
- Complete user flows
- Forms submission
- Search functionality
```

---

For questions about architecture, see README.md or contact rotaract@mec.ac.in
