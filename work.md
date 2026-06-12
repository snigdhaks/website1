You are an expert frontend developer and UI/UX designer.

Create a premium, modern, mobile-first website for:

"Rotaract Club of Model Engineering College, Thrikkakara"

IMPORTANT:
This is ONLY a frontend project.
Do NOT create a backend.
Do NOT create a full-stack application.

The website will be deployed once using Docker, so the frontend must be dynamic.

================================================

TECH STACK

Use the same frontend technology style as:

https://github.com/FossMEC/website

Use:

- React.js
- TypeScript
- Tailwind CSS
- Vite
- Framer Motion
- Modern reusable components

Containerization:

- Docker
- Nginx production build

================================================

DYNAMIC CONTENT ARCHITECTURE

Since there is no backend:

Do not hardcode content directly inside components.

Create a data-driven architecture.

All content should come from:

- JSON files
OR
- External APIs

Example:

/content/coordinators.json
/content/events.json
/content/blogs.json
/content/activities.json

The components should consume these dynamically.

The same UI should work even when data changes.

================================================

DESIGN REFERENCES

Use these websites as inspiration:

Theme:

https://www.rajagiricollege.edu.in/rotaract-club/

https://rotary3205.in/

https://rotonitk.github.io/rotoweb/


Design goal:

Premium international Rotaract website.

NOT a simple college template.

================================================

OVERALL DESIGN

Theme:

- Rotaract inspired
- Professional
- Elegant
- Clean
- Premium feel

Colors:

- White
- Deep blue
- Gold accents
- Subtle gradients

Use:

- Glass cards
- Soft shadows
- Rounded corners
- Modern typography
- Spacious layouts

Avoid:

- Generic bootstrap style
- Overly colorful UI
- Basic cards


================================================

FEATURES

1. SPLASH SCREEN

Create animated splash screen.

Requirements:

- Rotaract logo animation
- Club name reveal
- Smooth transition to homepage
- Loading animation
- Premium cinematic feel


================================================

2. HOMEPAGE


Sections:

Hero section:

- Club name
- Tagline
- Call to action buttons
- Background animation


Include:

- Introduction preview
- Vision & Mission preview
- Upcoming events
- Latest blogs
- Activities preview


================================================

3. INTRODUCTION PAGE


Sections:

Introduction

Vision and Mission

Purpose


Use:

- Beautiful layouts
- Icons
- Animations
- Image sections


================================================

4. COORDINATORS


Dynamic from JSON/API.


Coordinator card:

- Image
- Name
- Role
- Department/year
- Description
- Social links


Example data:

[
 {
  name:"",
  role:"",
  image:"",
  description:""
 }
]


================================================

5. MEMBERSHIP


Dynamic content.


Include:

- Why join Rotaract
- Benefits
- Eligibility
- Membership process
- Join button


================================================

6. ACTIVITIES


Dynamic activity gallery.


Each activity:

- Title
- Description
- Date
- Image
- Category


Create:

- Timeline view
- Grid gallery
- Hover effects


================================================

7. CALENDAR / EVENTS


Fetch events from external API.


Example:

GET /events


Expected response:

[
 {
  title:"",
  description:"",
  date:"",
  location:"",
  image:"",
  registrationLink:""
 }
]


Features:

- Calendar UI
- Upcoming events
- Event cards
- Event details


================================================

8. BLOG SYSTEM


Frontend only.


Create blog display system.


Features:

- Blog listing page
- Individual blog page
- Search
- Categories
- Tags


Blog data:

[
 {
 title:"",
 author:"",
 date:"",
 coverImage:"",
 content:"",
 tags:[]
 }
]


Include markdown rendering support.


================================================

9. ADMIN-LIKE CONTENT SUPPORT


No backend.

Create a structure where future CMS/API can easily replace JSON files.

Example:

services/

eventService.ts

blogService.ts

activityService.ts


All data fetching logic separated.

================================================

PROJECT STRUCTURE


Use clean architecture:


src/

components/

pages/

layouts/

services/

data/

hooks/

utils/

assets/


================================================

ANIMATIONS


Use Framer Motion:


- Page transitions
- Scroll reveal
- Card hover animation
- Smooth loading


================================================

RESPONSIVENESS


Mobile first.


Must look perfect on:

- phones
- tablets
- laptops


Create:

- Mobile navbar
- Hamburger menu
- Touch friendly cards


================================================

DOCKER


Create:


Dockerfile

docker-compose.yml


Use:

React production build
+
Nginx


Deployment:

docker compose up -d


================================================

OUTPUT REQUIRED


Generate:

1. Complete frontend code
2. Folder structure
3. JSON content system
4. API service layer
5. Docker setup
6. Responsive UI
7. Premium animations


The final website should look like an official Rotaract international chapter website with a premium modern feel.
