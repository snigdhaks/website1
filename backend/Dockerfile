FROM node:20-alpine

# Install system dependencies needed for sharp and better-sqlite3
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    vips-dev \
    python3 \
    bash \
    git

WORKDIR /app

# Copy package files first (for better layer caching)
COPY package.json package-lock.json ./

# Install ALL dependencies (including dev - needed for Strapi TypeScript build and startup)
RUN npm ci

# Copy the full codebase
COPY . .

# Build the Strapi admin panel
RUN npm run build

# Create necessary directories
RUN mkdir -p public/uploads .tmp

EXPOSE 1337

CMD ["npm", "run", "start"]
