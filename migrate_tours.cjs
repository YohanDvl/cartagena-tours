const fs = require('fs');
const path = require('path');

// Mocking the export to read it in Node
const toursFileContent = fs.readFileSync(path.join(__dirname, 'src/data/tours.js'), 'utf8');
const toursArrayMatch = toursFileContent.match(/export const tours = (\[[\s\S]*?\]);/);

if (toursArrayMatch) {
  // Use eval safely-ish here as it's a migration script controlled by the AI
  const tours = eval(toursArrayMatch[1]);
  
  tours.forEach(tour => {
    const filePath = path.join(__dirname, `src/data/tours/${tour.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(tour, null, 2));
    console.log(`Created ${filePath}`);
  });
} else {
  console.error("Could not find tours array in src/data/tours.js");
}
