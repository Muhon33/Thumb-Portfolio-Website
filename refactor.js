const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') || f.endsWith('.jsx'));

files.forEach(file => {
  if (file === 'Hero.js' || file === 'Navbar.js' || file === 'About.js') return; // already refactored
  
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  let modified = content
    .replace(/brand-red/g, 'brand-accent')
    .replace(/#FF3131/ig, '#3b82f6')
    .replace(/#FF6B35/ig, '#6366f1');
    
  if (content !== modified) {
    fs.writeFileSync(filePath, modified, 'utf8');
    console.log(`Updated ${file}`);
  }
});
