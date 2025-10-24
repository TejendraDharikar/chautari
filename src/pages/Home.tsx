import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, likePost } from "../api/pageapi";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/navbar";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";

const Home = () => {
  const { isLoggedIn, token, login } = useAuthStore();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading)
    return <div className="text-center mt-10">Loading posts...</div>;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error.message}
      </div>
    );

  const handleLogin = () => {
    login(token ?? "");
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    queryClient.clear();
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <Sidebar />
        <div>
          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
              title="Login"
            >
              <IoLogInOutline className="text-xl" />
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="items-center px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
              title="Logout"
            >
              <IoLogOutOutline className="text-xl" />
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-4">
        Latest Posts
      </h1>

      {/* Posts */}
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
                {post.title}
              </h2>
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
              )}
              <p className="text-gray-700 text-sm mb-3">{post.content}</p>
              <div className="text-xl text-gray-500">
                Posted by {post.author?.firstName} {post.author?.lastName}
              </div>
              <div className="text-xl text-gray-400 mt-1">
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
              <div className="flex justify-center gap-50 mt-3  text-gray-600">
                <button
                  onClick={() => likeMutation.mutate(post._id)}
                  disabled={likeMutation.isPending}
                  className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded"
                >
                  Like ({post.likes ?? 2})
                </button>

                <button>comment</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
