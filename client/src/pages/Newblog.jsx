import { useForm } from "react-hook-form"
import axios from 'axios'
import { Input } from '@mantine/core';
import { Textarea } from '@mantine/core';
import './newBlog.css'






const Newblog = () => {

  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

 

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/blogs/create', data);
      
      console.log('Form submitted successfully:', response.data);
      // Optionally, handle successful form submission (e.g., display a success image, reset the form, etc.)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally, handle errors (e.g., display an error image)
    }
  };
  return (
    <div className="form-container">
    <form id="submission-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <Input
          id="title"
          type="text"
          className="form-input"
          placeholder="Enter Title"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <p className="error-message">{errors.title.message}</p>}
      </div>
  
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <Textarea
          id="description"
          className="form-textarea"
          resize="vertical"
          
          
          placeholder="Blog Content"
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && <p className="error-message">{errors.description.message}</p>}
      </div>
  
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL:</label>
        <Input
          id="imageUrl"
          type="url"
          className="form-input"
          placeholder="Enter image URL"
          {...register('imageUrl', { required: 'Image URL is required' })}
        />
        {errors.imageUrl && <p className="error-message">{errors.imageUrl.message}</p>}
      </div>
  
      <div className="form-group">
        <label htmlFor="author">Author:</label>
        <Input
          id="author"
          type="text"
          className="form-input"
          placeholder="Enter Author Name"
          {...register('author', { required: 'Author is required' })}
        />
        {errors.author && <p className="error-message">{errors.author.message}</p>}
      </div>
  
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <Input
          id="category"
          type="text"
          className="form-input"
          placeholder="Enter Catagory"
          {...register('category', { required: 'Category is required' })}
        />
        {errors.category && <p className="error-message">{errors.category.message}</p>}
      </div>
  
      <button type="submit" className="submit-button">Submit</button>
    </form>
  </div>
  


  
  )
}

export default Newblog
