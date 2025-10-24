import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchMyPost } from "../api/postapi";
import Sidebar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const MyPost = () => {
  const Navigate = useNavigate();

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err: Error) => {
      alert(err.message || "Failed to delete post");
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchMyPost,
  });

  const handleDelete = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(postId);
    }
  };

  if (isLoading)
    return <div className="text-center mt-10">Loading posts...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error.message}
      </div>
    );
  const handlePostsubmit = () => {
    Navigate("/addpost");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Sidebar />
      <div className="flex justify-end  mr-10">
        <button
          onClick={handlePostsubmit}
          className=" mt-5 ml-10 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Add Post
        </button>
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-4">
        My Posts
      </h1>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 gap-6">
        {data.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No posts available
          </div>
        ) : (
          data.map((post: any) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.content}
              </h2>
              {post.images && (
                <img
                  src={post.images}
                  alt={post.content}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags &&
                  post.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                    >
                      {" "}
                      #{tag}
                    </span>
                  ))}
              </div>
              <div className="text-xs text-gray-500">
                Posted by {post.author?.firstName} {post.author?.lastName}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {post.updatedAt
                  ? new Date(post.updatedAt).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      hour12: true,
                    })
                  : "No update time available"}
              </div>
              <div className="flex justify-center gap-10 mt-3 text-gray-600">
                <h2> LIKES {post?.likes}</h2>
                <h2> COMMENTS {post?.comments?.length || 0}</h2>
                <button>EDIT</button>
                <button onClick={() => handleDelete(post._id)}>DELETE</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyPost;
