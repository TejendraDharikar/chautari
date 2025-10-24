export const fetchPosts = async () => {
  const res = await fetch("https://api.freeapi.app/api/v1/social-media/posts",{
    method: "GET"
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch posts");
  console.log("posts:",data.data.posts);
  
  return data.data.posts; 
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




export type Profile = {
  firstName: string;
  lastName: string;
  bio: string;
  location: string;

};
// edit profile
export const updateProfile = async (payload: Profile):Promise<Profile> => {
   const token = localStorage.getItem("token") || "null";
  const res = await fetch("https://api.freeapi.app/api/v1/social-media/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({
      ...payload,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update profile");

  return data.data.profile; 
};



// Like a post
export const likePost = async (postId: string): Promise<{ success: boolean; likes: number }> => {
  const token = localStorage.getItem("token") || "null";

  const res = await fetch(`https://api.freeapi.app/api/v1/social-media/posts/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to like post");

  return data.data; // assuming it returns { success: true, likes: updatedCount }
};