import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiClock, FiUser, FiArrowRight } from "react-icons/fi";

const BlogData = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://blog-app-backend-trzs.onrender.com/blogs");
        const sortedBlogs = response.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sortedBlogs);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch blogs");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    if (filter === "latest") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(blog.createdAt) >= oneWeekAgo;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="p-8 bg-white rounded-2xl shadow-lg max-w-md w-full">
          <div className="text-red-500 text-xl font-medium text-center mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Blog Posts
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            {filter === "latest" ? "Latest posts from the past week" : "Discover amazing stories and insights"}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === "all" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Posts
          </button>
          <button 
            onClick={() => setFilter("latest")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === "latest" 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Latest
          </button>
        </div>
      </div>
      
      {filteredBlogs.length === 0 ? (
        <div className="w-full text-center py-16 bg-white rounded-2xl shadow-lg">
          <p className="text-gray-500 text-lg">
            {filter === "latest" 
              ? "No recent posts found" 
              : "No blog posts found"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/post/${blog._id}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {blog.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <FiClock className="w-4 h-4" />
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <FiUser className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {blog.title}
                </h2>
                
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                  {blog.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {blog.author?.charAt(0)?.toUpperCase() || 'A'}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {blog.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all duration-300">
                    <span className="text-sm font-medium">Read More</span>
                    <FiArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogData;

