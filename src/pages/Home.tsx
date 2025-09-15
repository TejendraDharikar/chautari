import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/pageapi";

const Home = () => {
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
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
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
