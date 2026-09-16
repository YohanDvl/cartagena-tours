const fs = require('fs');
const path = require('path');

const toursDir = path.join(__dirname, 'src/data/tours');
const imagesDir = path.join(__dirname, 'public/images/downloads');

// Get all images
const images = fs.readdirSync(imagesDir).filter(file => /\.(png|jpe?g|heic)$/i.test(file));
const imageUrls = images.map(img => `/images/downloads/${img}`);

if (imageUrls.length === 0) {
  console.log('No images found to assign.');
  process.exit(0);
}

// Get all tours
const tours = fs.readdirSync(toursDir).filter(file => file.endsWith('.json'));

let imageIndex = 0;

tours.forEach(tourFile => {
  const tourPath = path.join(toursDir, tourFile);
  const data = JSON.parse(fs.readFileSync(tourPath, 'utf8'));
  
  // Assign 2 images to each tour, wrap around if needed
  data.images = [
    imageUrls[imageIndex % imageUrls.length],
    imageUrls[(imageIndex + 1) % imageUrls.length]
  ];
  
  // If the tour has "price": 0, make sure it stays 0 so our frontend hides it
  // (already handled by the JSON, we just write it back)
  
  fs.writeFileSync(tourPath, JSON.stringify(data, null, 2));
  console.log(`Assigned images to ${data.title}`);
  
  imageIndex += 2;
});

console.log('Done!');
