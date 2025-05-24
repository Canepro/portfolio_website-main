# PowerShell script to start the development server
Write-Host "Starting Portfolio Development Server..." -ForegroundColor Green
Write-Host "Project Directory: c:\Users\i\portfolio_website-main" -ForegroundColor Yellow
Write-Host ""

Set-Location "c:\Users\i\portfolio_website-main"
npm run dev
