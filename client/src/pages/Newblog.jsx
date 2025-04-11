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
      
      const response = await axios.post('http://localhost:3000/blogs/create', blogData);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              Create New Blog
            </span>
          </h1>
          <p className="text-gray-500">Share your thoughts and ideas with the world</p>
        </div>
        
        {submitSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="text-green-500 text-2xl" />
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Successfully Published!</h2>
            <p className="text-green-600">Your blog post has been published successfully.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Input
                  id="title"
                  icon={<FiFileText />}
                  size="md"
                  radius="md"
                  placeholder="Enter a catchy title for your blog"
                  className="w-full"
                  {...register('title', { required: 'Title is required' })}
                  error={errors.title?.message}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <Textarea
                  id="description"
                  size="md"
                  radius="md"
                  minRows={8}
                  placeholder="Write your blog content here..."
                  className="w-full"
                  {...register('description', { required: 'Content is required' })}
                  error={errors.description?.message}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <Input
                    id="imageUrl"
                    icon={<FiImage />}
                    size="md"
                    radius="md"
                    placeholder="Enter image URL"
                    {...register('imageUrl', { required: 'Image URL is required' })}
                    error={errors.imageUrl?.message}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                    Author
                  </label>
                  <Input
                    id="author"
                    icon={<FiUser />}
                    size="md"
                    radius="md"
                    placeholder="Your name"
                    {...register('author', { required: 'Author name is required' })}
                    error={errors.author?.message}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <Input
                  id="category"
                  icon={<FiTag />}
                  size="md"
                  radius="md"
                  placeholder="E.g. Technology, Health, Travel"
                  {...register('category', { required: 'Category is required' })}
                  error={errors.category?.message}
                />
              </div>
              
              <Button
                type="submit"
                loading={submitting}
                fullWidth
                radius="md"
                size="md"
                className="bg-blue-600 hover:bg-blue-700 transition-colors mt-4"
              >
                Publish Blog Post
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Newblog;
