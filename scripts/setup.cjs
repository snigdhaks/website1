const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function log(message) {
  console.log(`\x1b[36m[Setup]\x1b[0m ${message}`);
}

function error(message) {
  console.error(`\x1b[31m[Setup Error]\x1b[0m ${message}`);
}

// Helper to generate a random key
function generateSecret(length = 16) {
  return crypto.randomBytes(length).toString('base64');
}

try {
  log('Starting one-command setup for Rotaract MEC website...');

  const rootDir = path.resolve(__dirname, '..');
  const backendDir = path.join(rootDir, 'backend');

  // 1. Set up backend environment variables
  log('Checking backend environment variables (.env)...');
  const backendEnvPath = path.join(backendDir, '.env');
  const backendEnvExamplePath = path.join(backendDir, '.env.example');

  if (!fs.existsSync(backendEnvPath)) {
    log('backend/.env not found. Creating from backend/.env.example...');
    if (!fs.existsSync(backendEnvExamplePath)) {
      throw new Error('backend/.env.example does not exist. Cannot seed env variables.');
    }

    let envContent = fs.readFileSync(backendEnvExamplePath, 'utf8');

    // Generate secure keys for Strapi secrets
    const appKeys = `"${generateSecret()},${generateSecret()}"`;
    const apiTokenSalt = generateSecret();
    const adminJwtSecret = generateSecret();
    const transferTokenSalt = generateSecret();
    const jwtSecret = generateSecret();
    const encryptionKey = generateSecret();

    envContent = envContent
      .replace(/APP_KEYS=.*/g, `APP_KEYS=${appKeys}`)
      .replace(/API_TOKEN_SALT=.*/g, `API_TOKEN_SALT=${apiTokenSalt}`)
      .replace(/ADMIN_JWT_SECRET=.*/g, `ADMIN_JWT_SECRET=${adminJwtSecret}`)
      .replace(/TRANSFER_TOKEN_SALT=.*/g, `TRANSFER_TOKEN_SALT=${transferTokenSalt}`)
      .replace(/JWT_SECRET=.*/g, `JWT_SECRET=${jwtSecret}`)
      .replace(/ENCRYPTION_KEY=.*/g, `ENCRYPTION_KEY=${encryptionKey}`);

    fs.writeFileSync(backendEnvPath, envContent, 'utf8');
    log('backend/.env generated successfully with secure keys.');
  } else {
    log('backend/.env already exists. Skipping generation.');
  }

  // 2. Set up root/frontend environment variables
  log('Checking frontend environment variables (.env)...');
  const rootEnvPath = path.join(rootDir, '.env');
  const rootEnvExamplePath = path.join(rootDir, '.env.example');
  
  if (!fs.existsSync(rootEnvPath)) {
    if (fs.existsSync(rootEnvExamplePath)) {
      log('.env not found in root. Creating from .env.example...');
      fs.copyFileSync(rootEnvExamplePath, rootEnvPath);
    } else {
      log('No .env.example found in root. Skipping root .env generation.');
    }
  } else {
    log('.env already exists in root. Skipping generation.');
  }

  // 3. Install dependencies in the root (frontend)
  log('Installing frontend/root dependencies...');
  execSync('npm install', { cwd: rootDir, stdio: 'inherit' });

  // 4. Install dependencies in the backend
  log('Installing backend dependencies...');
  execSync('npm install', { cwd: backendDir, stdio: 'inherit' });

  // 5. Build the backend to generate the build files
  log('Building Strapi backend...');
  execSync('npm run build', { cwd: backendDir, stdio: 'inherit' });

  // 6. Import backup archive (database content + media uploads)
  const backupFile = 'export-data.tar.gz';
  const backupFilePath = path.join(backendDir, backupFile);

  if (fs.existsSync(backupFilePath)) {
    log('Found data backup archive. Restoring database and media assets...');
    // Using --force to run in non-interactive mode
    execSync(`npm run strapi import -- -f ${backupFile} --force`, { cwd: backendDir, stdio: 'inherit' });
    log('Database and uploads successfully restored from backup.');
  } else {
    log(`WARNING: Backup archive (${backupFile}) not found in backend directory. Skipping database seeding.`);
  }

  log('\x1b[32mSetup completed successfully!\x1b[0m');
  log('You can now start both the frontend and backend concurrently by running:');
  log('\x1b[33mnpm run dev\x1b[0m');

} catch (err) {
  error(`Setup failed: ${err.message}`);
  process.exit(1);
}
