import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "../api/pageapi";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
const {isLoggedIn,login}=useAuthStore();
 const logout = useAuthStore((state) => state.logout);
const navigate=useNavigate();
   const queryClient = useQueryClient();

const handleLogin=()=>{
  login();
  navigate("/login");
};

const handleLogout=()=>{
  logout();
   queryClient.clear();
  navigate("/login");
}

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-end items-center p-4 bg-white shadow-md">
 {!isLoggedIn?(
        <button 
        onClick={handleLogin}
       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"

        >LOGIN</button>
      ) : (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"

        >
          LOGOUT
        </button>
      )}
      </div>
     

      <h1 className="text-2xl font-bold text-center"> Latest Posts</h1>

      {data.length === 0 ? (
        <div className="text-center text-gray-500">No posts available</div>
      ) : (
        data.map((post: any) => (
          <div key={post._id} className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <img src="{post.coverImage}" alt="#"></img>

            <p className="text-sm text-gray-700 mt-2">{post.content}</p>

            <div className="text-xs text-gray-500 mt-1">
              Posted by {post.author?.firstName} {post.author?.lastName}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
