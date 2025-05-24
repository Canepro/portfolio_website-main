#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Portfolio Setup Validation\n');

// Check for required files
const requiredFiles = [
  'package.json',
  'next.config.js',
  'src/pages/_app.js',
  'src/pages/_document.js',
  'src/pages/index.js',
  'src/contexts/ThemeContext.js',
  'src/styles/theme.js'
];

let allValid = true;

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    allValid = false;
  }
});

// Check if critters is installed
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));
  const hasCritters = packageJson.dependencies?.critters || packageJson.devDependencies?.critters;
  if (hasCritters) {
    console.log('✅ critters package installed');
  } else {
    console.log('❌ critters package not found');
    allValid = false;
  }
} catch (e) {
  console.log('❌ Could not read package.json');
  allValid = false;
}

console.log('\n' + '='.repeat(50));
if (allValid) {
  console.log('🎉 Setup validation PASSED!');
  console.log('You can now run: npm run dev');
} else {
  console.log('⚠️  Setup validation FAILED!');
  console.log('Please fix the missing files/packages above.');
}
console.log('='.repeat(50));
