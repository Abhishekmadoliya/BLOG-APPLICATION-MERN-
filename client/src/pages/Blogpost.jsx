import { TextInput, Card, Image, Text, Badge, Group, Button } from '@mantine/core';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiBookmark } from 'react-icons/fi';
import "./Blogpost.css";

function Blogpost() {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/blogs/");
        const sortedBlogs = response.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlog(sortedBlogs);
        setFilteredBlogs(sortedBlogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter blogs based on search query and category
  useEffect(() => {
    let filtered = [...blog];

    // Apply category filter
    // if (activeCategory !== "All") {
    //   filtered = filtered.filter(bl => 
    //     bl.category.toLowerCase() === activeCategory.toLowerCase()
    //   );
    // }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(bl => 
        bl.title.toLowerCase().includes(query) || 
        bl.description.toLowerCase().includes(query) ||
        bl.author.toLowerCase().includes(query)
      );
    }

    setFilteredBlogs(filtered);
  }, [blog,searchQuery]);

  // const categories = ["All", "Technology", "Environment", "Business"];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Trigger search
      setSearchQuery(e.target.value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto pt-12 pb-8 px-6">
        <h1 className="text-4xl font-bold text-center mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
            Discover Stories
          </span>
        </h1>
        <p className="text-gray-500 text-center max-w-md mx-auto mb-10">
          Explore our collection of thoughtfully crafted articles and stories
        </p>
        
        {/* Search Bar */}
        <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto mb-10">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <TextInput
              size="md"
              radius="xl"
              id="blog-input"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              className="w-full"
              styles={{
                input: {
                  paddingLeft: '2.5rem',
                  height: '48px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.95rem',
                },
              }}
            />
          </div>
          <Button
            size="md"
            radius="xl"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
            onClick={() => setSearchQuery(searchQuery)}
          >
            Search
          </Button>
        </div>
        
        {/* Categories */}
        <div className="flex justify-center mb-12">
          {/* <div className="flex space-x-2 p-1 bg-gray-100 rounded-full">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeCategory === category 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div> */}
        </div>
      </div>
      
      {/* Blog List */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery 
                ? "No articles found matching your search"
                : activeCategory !== "All"
                ? `No articles found in ${activeCategory} category`
                : "No articles found"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {filteredBlogs.map((bl) => (
              <Link to={`/post/${bl._id}`} key={bl._id} className="block">
                <Card 
                  shadow="sm" 
                  padding="lg" 
                  radius="lg" 
                  withBorder={false} 
                  className="overflow-hidden transition-all duration-300 hover:shadow-md bg-white group"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="sm:w-1/3 relative overflow-hidden rounded-lg">
                      <Image
                        src={bl.image}
                        height={200}
                        radius="md"
                        alt={bl.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      {bl.category && (
                        <Badge 
                          className="absolute top-3 left-3" 
                          radius="sm"
                          color="blue"
                          variant="filled"
                        >
                          {bl.category}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="sm:w-2/3 flex flex-col justify-between">
                      <div>
                        <Group className="mb-2 items-center">
                          <Text size="xs" c="dimmed" className="flex items-center">
                            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            {new Date(bl.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {bl.author}
                          </Text>
                        </Group>
                        
                        <Text fw={700} size="lg" className="mb-2 group-hover:text-blue-600 transition-colors">
                          {bl.title}
                        </Text>
                        
                        <Text size="sm" c="dimmed" className="line-clamp-2 mb-4">
                          {bl.description}
                        </Text>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Text 
                          size="sm" 
                          className="text-blue-600 font-medium group-hover:underline"
                        >
                          Read More
                        </Text>
                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                          <FiBookmark size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogpost;
