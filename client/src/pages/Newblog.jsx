import { useForm } from "react-hook-form"
import axios from 'axios'
import { Input, Textarea, Button } from '@mantine/core';
import { useState } from "react";
import './newBlog.css'
import Navbar from "../components/Navbar"
import { FiImage, FiUser, FiTag, FiFileText, FiCheck } from 'react-icons/fi';

const Newblog = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      
      // Map form fields to match server expectations
      const blogData = {
        title: data.title,
        description: data.description,
        image: data.imageUrl,
        author: data.author,
        catagory: data.category
      };
      
      const response = await axios.post('https://blog-app-backend-trzs.onrender.com/blogs/create', blogData);
      console.log('Form submitted successfully:', response.data);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
     
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Create New Blog
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Share your thoughts and ideas with the world</p>
        </div>
        
        {submitSuccess ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center transform transition-all duration-500 hover:scale-[1.02]">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="text-green-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-3">Successfully Published!</h2>
            <p className="text-gray-600 dark:text-gray-300">Your blog post has been published successfully.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Title Section */}
              <div className="space-y-3">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <Input
                  id="title"
                  icon={<FiFileText className="text-gray-400" />}
                  size="lg"
                  radius="lg"
                  placeholder="Enter a catchy title for your blog"
                  className="w-full focus:ring-2 focus:ring-blue-500 text-white"
                  {...register('title', { required: 'Title is required' })}
                  error={errors.title?.message}
                />
              </div>
              
              {/* Content Section */}
              <div className="space-y-3">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <Textarea
                  id="description"
                  size="lg"
                  radius="lg"
                  minRows={14}
                  className="w-full focus:ring-2 focus:ring-blue-500 resize-none text-white"
                  {...register('description', { required: 'Description is required' })}
                  error={errors.description?.message}
                  placeholder="Write your blog content here..."/>
              </div>

              
              
              {/* Image and Author Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Image URL
                  </label>
                  <Input
                    id="imageUrl"
                    icon={<FiImage className="text-gray-400" />}
                    size="lg"
                    radius="lg"
                    placeholder="Enter image URL"
                    className="w-full focus:ring-2 focus:ring-blue-500 text-white"
                    {...register('imageUrl', { required: 'Image URL is required' })}
                    error={errors.imageUrl?.message}
                  />
                </div>
                
                <div className="space-y-3">
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Author
                  </label>
                  <Input
                    id="author"
                    icon={<FiUser className="text-gray-400" />}
                    size="lg"
                    radius="lg"
                    placeholder="Your name"
                    className="w-full focus:ring-2 focus:ring-blue-500 text-white"
                    {...register('author', { required: 'Author name is required' })}
                    error={errors.author?.message}
                  />
                </div>
              </div>
              
              {/* Category Section */}
              <div className="space-y-3">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <Input
                  id="category"
                  icon={<FiTag className="text-gray-400" />}
                  size="lg"
                  radius="lg"
                  placeholder="E.g. Technology, Health, Travel"
                  className="w-full focus:ring-2 focus:ring-blue-500 text-white"
                  {...register('category', { required: 'Category is required' })}
                  error={errors.category?.message}
                />
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  loading={submitting}
                  fullWidth
                  radius="lg"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white  py-4 px-7 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl "
                >
                  {submitting ? 'Publishing...' : 'Publish Blog Post'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Newblog;
