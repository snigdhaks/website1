# Deployment Guide - Rotaract Club MEC Website

## Overview

This document provides comprehensive instructions for deploying the Rotaract Club MEC website to various environments.

## Quick Start - Docker (Recommended)

### Prerequisites
- Docker
- Docker Compose

### Steps

1. **Navigate to project directory**
   ```bash
   cd /home/alestor123/PROJECTS/website
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the website**
   - Open http://localhost in your browser

4. **View container logs**
   ```bash
   docker-compose logs -f rotaract-website
   ```

5. **Stop the container**
   ```bash
   docker-compose down
   ```

## Development Deployment

### Local Development Server

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Access the website**
   - Opens automatically at http://localhost:5173

## Production Deployment

### Build for Production

1. **Build the project**
   ```bash
   npm run build
   ```

   This creates a `dist/` folder with optimized production files.

2. **Preview production build locally**
   ```bash
   npm run preview
   ```

### Manual Docker Deployment

1. **Build Docker image**
   ```bash
   docker build -t rotaract-mec:latest .
   ```

2. **Run the container**
   ```bash
   docker run -d \
     --name rotaract \
     -p 80:80 \
     --restart unless-stopped \
     rotaract-mec:latest
   ```

3. **Access the website**
   - http://your-domain.com

4. **View logs**
   ```bash
   docker logs -f rotaract
   ```

5. **Stop the container**
   ```bash
   docker stop rotaract
   docker rm rotaract
   ```

## Cloud Deployments

### Deploy to Vercel

1. **Connect to Vercel**
   - Push your repository to GitHub
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository

2. **Configure project**
   - Framework: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Deploy**
   - Vercel automatically deploys on push

### Deploy to Netlify

1. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Select GitHub repository

2. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy**
   - Netlify automatically deploys on push

### Deploy to GitHub Pages

1. **Update vite.config.ts** (if using a subpath)
   ```typescript
   export default defineConfig({
     base: '/repository-name/',
     // ... rest of config
   })
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy to GitHub Pages**
   - Create a GitHub Actions workflow or
   - Manually push `dist/` folder to `gh-pages` branch

### Deploy to AWS (EC2)

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - Minimum: t3.small

2. **SSH into instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Docker**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker ubuntu
   ```

4. **Clone repository**
   ```bash
   git clone your-repo-url
   cd website
   ```

5. **Run with Docker**
   ```bash
   docker-compose up -d
   ```

6. **Set up reverse proxy** (optional)
   ```bash
   sudo apt install nginx
   # Configure nginx to proxy to Docker container
   ```

### Deploy to DigitalOcean

1. **Create Droplet**
   - Ubuntu 22.04
   - Enable Docker

2. **SSH into Droplet**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Docker Compose**
   ```bash
   curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   chmod +x /usr/local/bin/docker-compose
   ```

4. **Clone and deploy**
   ```bash
   git clone your-repo-url
   cd website
   docker-compose up -d
   ```

5. **Add domain**
   - Point domain to Droplet IP
   - Set up SSL with Let's Encrypt

## Environment Configuration

### Create .env file
```bash
cp .env.example .env.production
```

### Update environment variables
```env
VITE_APP_NAME=Rotaract Club MEC Thrikkakara
VITE_API_URL=https://api.yourdomain.com
VITE_ENABLE_ANALYTICS=true
```

## SSL/HTTPS Setup

### Using Let's Encrypt with Nginx

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Generate certificate**
   ```bash
   sudo certbot certonly --standalone -d yourdomain.com
   ```

3. **Update Nginx configuration**
   ```nginx
   listen 443 ssl http2;
   ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
   ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
   ```

4. **Auto-renewal**
   ```bash
   sudo certbot renew --dry-run
   ```

## Database & CDN (Future)

When integrating a backend:

1. **Environment variables**
   ```env
   VITE_API_URL=https://api.yourdomain.com
   ```

2. **CDN for static assets**
   - Configure in build process
   - Update asset paths in code

## Monitoring & Maintenance

### Container Health

```bash
docker ps
docker logs rotaract-website
docker stats
```

### Disk Usage

```bash
docker system df
docker system prune
```

### Update Containers

```bash
docker pull node:18-alpine
docker-compose build --no-cache
docker-compose up -d
```

## Troubleshooting

### Container won't start
```bash
docker logs rotaract-website
docker-compose logs
```

### Port already in use
```bash
lsof -i :80
kill -9 <PID>
```

### Clear cache
```bash
docker system prune -a
npm cache clean --force
```

## Backup & Restore

### Backup data
```bash
docker exec rotaract-website tar czf /tmp/backup.tar.gz /usr/share/nginx/html
docker cp rotaract-website:/tmp/backup.tar.gz ./backup.tar.gz
```

### Restore data
```bash
docker cp backup.tar.gz rotaract-website:/tmp/
docker exec rotaract-website tar xzf /tmp/backup.tar.gz -C /usr/share/nginx/html
```

## Performance Optimization

1. **Enable Gzip compression** ✓ (Already configured in nginx.conf)
2. **Cache static assets** ✓ (Configured for 30 days)
3. **Minified CSS/JS** ✓ (Vite production build)
4. **Image optimization** - Use optimized image formats
5. **CDN integration** - Recommend CloudFlare or similar

## Security

✓ X-Frame-Options header set
✓ X-Content-Type-Options header set
✓ Security headers configured
✓ Health checks enabled
✓ Proper restart policies

## Support

For issues or questions:
- Email: rotaract@mec.ac.in
- GitHub Issues: Your repository URL

---

**Happy Deploying! 🚀**
