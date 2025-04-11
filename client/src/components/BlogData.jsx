import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Blogdata = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blogs");
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch blogs");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh] px-4">
          <div className="p-6 sm:p-8 bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="text-red-500 text-base sm:text-xl font-medium text-center mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-3 sm:px-6 md:px-8">
      <Navbar />
      
      {/* Blog List */}
      <div className="max-w-7xl mx-auto pt-8 sm:pt-12 pb-12 sm:pb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 px-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Blog Posts
            </span>
          </h1>
          <div className="flex gap-2 sm:gap-3 self-start">
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
              Latest
            </button>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors">
              Popular
            </button>
          </div>
        </div>
        
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No blog posts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/post/${blog._id}`}
                className="group bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-40 sm:h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
                    {blog.category}
                  </div>
                </div>
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="inline-block h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-green-500"></span>
                    <span className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 flex-grow">
                    {blog.description}
                  </p>
                  <div className="flex items-center mt-auto pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 sm:mr-3">
                      <span className="text-xs text-gray-700 font-medium">
                        {blog.author?.charAt(0)?.toUpperCase() || 'A'}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-900">
                        {blog.author}
                      </div>
                      <div className="text-xs text-gray-500">
                        Author
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogdata;

