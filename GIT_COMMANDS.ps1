# NexGame Casino - Git Commands PowerShell Script
# Run this script to deploy your game to GitHub

Write-Host ""
Write-Host "  ███╗   ██╗███████╗██╗  ██╗    ██████╗  █████╗ ███████╗██╗███╗   ██╗██╗   ██╗" -ForegroundColor Cyan
Write-Host "  ████╗  ██║██╔════╝╚██╗██╔╝   ██╔════╝ ██╔══██╗██╔════╝██║████╗  ██║██║   ██║" -ForegroundColor Cyan
Write-Host "  ██╔██╗ ██║█████╗   ╚███╔╝    ██║  ███╗███████║███████╗██║██╔██╗ ██║██║   ██║" -ForegroundColor Cyan
Write-Host "  ██║╚██╗██║██╔══╝   ██╔██╗    ██║   ██║██╔══██║╚════██║██║██║╚██╗██║██║   ██║" -ForegroundColor Cyan
Write-Host "  ██║ ╚████║███████╗██╔╝ ██╗   ╚██████╔╝██║  ██║███████║██║██║ ╚████║╚██████╔╝" -ForegroundColor Cyan
Write-Host "  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "  ██████╗  █████╗ ███████╗██╗███╗   ██╗██╗   ██╗" -ForegroundColor Yellow
Write-Host "  ██╔════╝ ██╔══██╗██╔════╝██║████╗  ██║██║   ██║" -ForegroundColor Yellow
Write-Host "  ██║  ███╗███████║███████╗██║██╔██╗ ██║██║   ██║" -ForegroundColor Yellow
Write-Host "  ██║   ██║██╔══██║╚════██║██║██║╚██╗██║██║   ██║" -ForegroundColor Yellow
Write-Host "  ╚██████╔╝██║  ██║███████║██║██║ ╚████║╚██████╔╝" -ForegroundColor Yellow
Write-Host "   ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝" -ForegroundColor Yellow
Write-Host ""
Write-Host "================================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "                    🚀 GitHub Deployment Commands 🚀" -ForegroundColor Magenta
Write-Host ""
Write-Host "================================================================================" -ForegroundColor Green
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "  ✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Git is not installed!" -ForegroundColor Red
    Write-Host "  📥 Please install Git from: https://git-scm.com/downloads" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Check if we're in a git repository
try {
    git status | Out-Null
    Write-Host "  ✅ Git repository found" -ForegroundColor Green
} catch {
    Write-Host "  🔧 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "  ✅ Git repository initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "  📋 Available Commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  1. 📤 Upload to GitHub (First Time)" -ForegroundColor White
Write-Host "  2. 🔄 Update GitHub Repository" -ForegroundColor White
Write-Host "  3. 🌐 Deploy to GitHub Pages" -ForegroundColor White
Write-Host "  4. 📊 Check Repository Status" -ForegroundColor White
Write-Host "  5. 🏷️  Create Release Tag" -ForegroundColor White
Write-Host "  6. ❌ Exit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Choose an option (1-6)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "  📤 First Time Upload to GitHub" -ForegroundColor Cyan
        Write-Host "  ================================" -ForegroundColor Cyan
        Write-Host ""
        
        $username = Read-Host "Enter your GitHub username"
        $repo = Read-Host "Enter repository name (default: nexgame-casino)"
        if ([string]::IsNullOrEmpty($repo)) { $repo = "nexgame-casino" }
        
        Write-Host ""
        Write-Host "  🔧 Setting up repository..." -ForegroundColor Yellow
        
        git add .
        git commit -m "Initial commit: NexGame Casino Professional Slot Machine Game"
        git branch -M main
        git remote add origin "https://github.com/$username/$repo.git"
        git push -u origin main
        
        Write-Host ""
        Write-Host "  ✅ Repository uploaded successfully!" -ForegroundColor Green
        Write-Host "  🌐 Your game will be available at: https://$username.github.io/$repo/" -ForegroundColor Magenta
    }
    
    "2" {
        Write-Host ""
        Write-Host "  🔄 Updating GitHub Repository" -ForegroundColor Cyan
        Write-Host "  ==============================" -ForegroundColor Cyan
        Write-Host ""
        
        git add .
        $message = Read-Host "Enter commit message"
        git commit -m $message
        git push origin main
        
        Write-Host ""
        Write-Host "  ✅ Repository updated successfully!" -ForegroundColor Green
    }
    
    "3" {
        Write-Host ""
        Write-Host "  🌐 Deploying to GitHub Pages" -ForegroundColor Cyan
        Write-Host "  =============================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "  📋 Steps to enable GitHub Pages:" -ForegroundColor Yellow
        Write-Host "  1. Go to your repository on GitHub" -ForegroundColor White
        Write-Host "  2. Click on 'Settings'" -ForegroundColor White
        Write-Host "  3. Scroll down to 'Pages'" -ForegroundColor White
        Write-Host "  4. Under 'Source', select 'Deploy from a branch'" -ForegroundColor White
        Write-Host "  5. Select 'main' branch and '/ (root)' folder" -ForegroundColor White
        Write-Host "  6. Click 'Save'" -ForegroundColor White
        Write-Host ""
        Write-Host "  ⏳ It may take 5-10 minutes for the site to be available" -ForegroundColor Yellow
    }
    
    "4" {
        Write-Host ""
        Write-Host "  📊 Repository Status" -ForegroundColor Cyan
        Write-Host "  ====================" -ForegroundColor Cyan
        Write-Host ""
        git status
        Write-Host ""
        git log --oneline -5
    }
    
    "5" {
        Write-Host ""
        Write-Host "  🏷️  Create Release Tag" -ForegroundColor Cyan
        Write-Host "  =======================" -ForegroundColor Cyan
        Write-Host ""
        
        $version = Read-Host "Enter version number (e.g., v1.0.0)"
        $message = Read-Host "Enter release message"
        
        git tag -a $version -m $message
        git push origin $version
        
        Write-Host ""
        Write-Host "  ✅ Release tag created successfully!" -ForegroundColor Green
    }
    
    "6" {
        Write-Host ""
        Write-Host "  👋 Thank you for using NexGame Casino!" -ForegroundColor Magenta
        exit 0
    }
    
    default {
        Write-Host ""
        Write-Host "  ❌ Invalid choice! Please select 1-6" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "  🎉 Operation completed!" -ForegroundColor Green
Write-Host ""
Write-Host "  📚 For more help, check DEPLOYMENT_GUIDE.md" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit"
