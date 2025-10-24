export const fetchMyPost = async () => {

  const res = await fetch("https://api.freeapi.app/api/v1/social-media/posts/get/my", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || "null"}`,
    },
  });


  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch posts");
console.log("fetched daata:",json.data.posts);
  return json.data.posts; //  return the actual array
};

export const createPost = async (formData: FormData) => {
  const token = localStorage.getItem("token") || "null";

  const res = await fetch("https://api.freeapi.app/api/v1/social-media/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create post");

  return data.data;
};

export const deletePost = async (postId: string) => {
  const token = localStorage.getItem("token") || "null";  
  const res = await fetch(`https://api.freeapi.app/api/v1/social-media/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete post");

  return data.data;
}


export const updatePost=async(postId:string,formData: FormData) => {
   const token = localStorage.getItem("token") || "null"; 

  const res = await fetch(`https://api.freeapi.app/api/v1/social-media/posts/${postId}`, {
    method: "PATCH",
    headers: { 
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }); 
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update post");
  return data.data;
};