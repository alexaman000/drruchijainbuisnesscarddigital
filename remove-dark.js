const fs = require('fs');
const path = require('path');

const pageFile = path.join(__dirname, 'src', 'app', 'page.tsx');
const layoutFile = path.join(__dirname, 'src', 'app', 'layout.tsx');
const globalsFile = path.join(__dirname, 'src', 'app', 'globals.css');

// 1. Remove all dark: classes from page.tsx and layout.tsx
[pageFile, layoutFile].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Regex to remove dark:something 
  content = content.replace(/dark:[a-zA-Z0-9\-\/\[\]\.]+/g, '');
  // Clean up double spaces
  content = content.replace(/  +/g, ' ');
  fs.writeFileSync(file, content);
});

// 2. Remove dark mode media queries from globals.css
let globals = fs.readFileSync(globalsFile, 'utf8');
// This regex matches @media (prefers-color-scheme: dark) { ... } assuming non-nested braces inside except the first level.
// Safer way: just remove the specific blocks we know exist
globals = globals.replace(/@media \(prefers-color-scheme: dark\) \{[\s\S]*?\}\n\}/g, '');
fs.writeFileSync(globalsFile, globals);

console.log("Successfully removed dark mode!");
