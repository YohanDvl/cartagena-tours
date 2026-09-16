// This file now acts as a bridge to load JSON files managed by Decap CMS
const tourFiles = import.meta.glob('./tours/*.json', { eager: true });

export const tours = Object.values(tourFiles).map(file => {
  // Ensure the tour object is correctly extracted from the JSON file
  return file.default || file;
});
