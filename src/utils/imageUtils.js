// Helper function to get the full URL for book covers
// If cover is already a full URL or starts with http, return as is
// If cover starts with /assets, prepend backend URL
// Otherwise return as is (for imported images)
export const getCoverUrl = (cover) => {
  if (!cover) return null;
  
  // If it's already a full URL or data URL, return as is
  if (cover.startsWith('http://') || cover.startsWith('https://') || cover.startsWith('data:')) {
    return cover;
  }
  
  // If it's a path starting with /assets, prepend backend URL
  if (cover.startsWith('/assets/')) {
    return `http://localhost:4000${cover}`;
  }
  
  // Otherwise, assume it's an imported image path (for React)
  return cover;
};

