# Construction Budget Tool - Setup Script for Windows

Write-Host "Construction Budget Tool - Setup Script" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Backend setup
Write-Host "`nSetting up backend..." -ForegroundColor Yellow
Set-Location server

# Install dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
npm install

# Create .env file if it doesn't exist
if (!(Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Cyan
    @"
DATABASE_URL=postgresql://postgres:password@localhost:5432/budget_tool
PORT=3001
NODE_ENV=development
"@ | Out-File -FilePath .env -Encoding UTF8
    Write-Host ".env file created. Please update the database credentials." -ForegroundColor Yellow
}

# Frontend setup
Write-Host "`nSetting up frontend..." -ForegroundColor Yellow
Set-Location ../client

# Install dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
npm install

Set-Location ..

Write-Host "`nSetup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Create a PostgreSQL database named 'budget_tool'"
Write-Host "2. Update the database credentials in server/.env"
Write-Host "3. Run database migrations: cd server && npm run db:migrate"
Write-Host "4. Start the backend: cd server && npm run dev"
Write-Host "5. Start the frontend: cd client && npm run dev"
Write-Host "`nThe application will be available at http://localhost:3000" -ForegroundColor Cyan 