// scripts/generate-placeholders.js
// This script creates placeholder images for projects that don't have images yet

const fs = require('fs');
const path = require('path');

// List of required images based on our projects
const requiredImages = [
  'chat-observability.png',
  'rocketchat-local.png', 
  'rc-troubleshooting.png',
  'log-analysis-dashboard.png'
];

// Existing images we can use as placeholders
const existingImages = {
  'chat-observability.png': 'projects.jpeg',
  'rocketchat-local.png': '1.png',
  'rc-troubleshooting.png': '2.png',
  'log-analysis-dashboard.png': '3.jpg'
};

const imagesDir = path.join(process.cwd(), 'public', 'images');

console.log('Creating placeholder images for missing project images...\n');

requiredImages.forEach(imageName => {
  const targetPath = path.join(imagesDir, imageName);
  
  if (!fs.existsSync(targetPath)) {
    const sourceName = existingImages[imageName];
    const sourcePath = path.join(imagesDir, sourceName);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✅ Created placeholder: ${imageName} (from ${sourceName})`);
    } else {
      console.log(`❌ Could not create ${imageName} - source ${sourceName} not found`);
    }
  } else {
    console.log(`✓ ${imageName} already exists`);
  }
});

console.log('\nPlaceholder generation complete!');
console.log('Note: Replace these with actual project screenshots when available.');
