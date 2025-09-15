export const fetchPosts = async () => {
  const res = await fetch("https://api.freeapi.app/api/v1/social-media/posts"); // Replace with actual endpoint
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch posts");
  return data.data.posts; // Adjust based on API response structure
};
