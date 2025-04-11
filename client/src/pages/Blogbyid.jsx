import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Blogbyid = () => {
  const [blogpost, setBlogpost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://blog-app-backend-trzs.onrender.com/blogs/post/${id}`);
        setBlogpost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError(error.message || "Failed to fetch blog post");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <div className="text-red-500 text-xl font-medium">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!blogpost) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-xl text-gray-600">Blog post not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center mb-8 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Blog List
        </Link>
        
        {/* Blog Post Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header with Category & Date */}
          <div className="p-6 pb-0 flex items-center justify-between">
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
              {blogpost.catagory}
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500"></span>
              <span className="text-xs text-gray-500">
                {new Date(blogpost.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
          
          {/* Title */}
          <div className="p-6 pt-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {blogpost.title}
            </h1>
          </div>
          
          {/* Image */}
          <div className="w-full">
            <img 
              src={blogpost.image} 
              alt={blogpost.title}
              className="w-full h-72 sm:h-96 object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {blogpost.description}
              </p>
            </div>
          </div>
          
          {/* Author Info */}
          <div className="p-6 sm:p-8 pt-2 sm:pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                <span className="text-gray-700 font-medium">
                  {blogpost.author?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {blogpost.author}
                </div>
                <div className="text-xs text-gray-500">
                  Author
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogbyid;
