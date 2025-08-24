#!/bin/bash

# Vercel Build Script for CodyPool
echo "🚀 Starting CodyPool build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

# Verify build output
echo "✅ Verifying build output..."
if [ -d "dist" ]; then
    echo "✅ Build successful! dist/ directory created."
    ls -la dist/
else
    echo "❌ Build failed! dist/ directory not found."
    exit 1
fi

# Check for critical files
echo "🔍 Checking critical files..."
required_files=("index.html" "manifest.webmanifest" "service-worker.js")
for file in "${required_files[@]}"; do
    if [ -f "dist/$file" ]; then
        echo "✅ $file found"
    else
        echo "⚠️ $file not found in dist/"
    fi
done

echo "🎉 Build process completed successfully!"
