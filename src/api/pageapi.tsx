export const fetchPosts = async () => {
  const res = await fetch("https://api.freeapi.app/api/v1/social-media/posts"); // Replace with actual endpoint
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch posts");
  return data.data.posts; // Adjust based on API response structure
};



export const fetchMyProfile = async () => {
  const token = localStorage.getItem("token") || "null";

  const res = await fetch("https://api.freeapi.app/api/v1/social-media/profile", {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    // You can throw a specific error and catch it in useQuery onError
    throw new Error("Unauthorized - Please login again");
  }

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch profile");
  }

  return res.json();
};
