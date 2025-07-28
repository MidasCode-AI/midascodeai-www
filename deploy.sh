#!/bin/bash

# MidasCode.AI Website Deployment Script
# This script helps you deploy the website to GitHub Pages

echo "🌟 MidasCode.AI Website Deployment"
echo "=================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "📁 Initializing Git repository..."
    git init
    
    echo "📝 Creating initial commit..."
    git add .
    git commit -m "Initial commit: MidasCode.AI website"
    
    echo "✅ Git repository initialized!"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Create a new repository on GitHub"
    echo "2. Add your repository as remote:"
    echo "   git remote add origin https://github.com/yourusername/your-repo-name.git"
    echo "3. Push to GitHub:"
    echo "   git push -u origin main"
    echo "4. Enable GitHub Pages in repository settings"
    echo ""
    echo "📋 Your website files are ready:"
    ls -la
else
    echo "📝 Adding files to existing repository..."
    git add .
    
    # Check if there are changes to commit
    if git diff --staged --quiet; then
        echo "✅ No changes to commit."
    else
        echo "💾 Committing changes..."
        git commit -m "Update MidasCode.AI website - $(date '+%Y-%m-%d %H:%M:%S')"
        
        echo "🚀 Pushing to GitHub..."
        git push
        
        echo "✅ Website updated successfully!"
    fi
fi

echo ""
echo "🌐 GitHub Pages Setup Instructions:"
echo "1. Go to your GitHub repository"
echo "2. Click 'Settings' tab"
echo "3. Scroll to 'Pages' section"
echo "4. Select 'Deploy from a branch'"
echo "5. Choose 'main' branch and '/ (root)' folder"
echo "6. Click 'Save'"
echo ""
echo "🎉 Your website will be available at:"
echo "https://yourusername.github.io/repository-name"
