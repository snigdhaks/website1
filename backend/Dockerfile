FROM node:18-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

WORKDIR /opt/

# Copy package files and install
COPY package.json package-lock.json ./
RUN npm ci

# Copy codebase and compile admin
WORKDIR /opt/app
COPY . .
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
