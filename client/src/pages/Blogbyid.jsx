import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './Blogbyid.css'


const Blogbyid = () => {

    const [blogpost, setBlogpost] = useState(null);
    const { id } = useParams();



    useEffect(() => {
        const fetchBlog = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/blogs/post/${id}`);
            setBlogpost(response.data);
          } catch (error) {
            console.error("Error fetching blog post:", error);
          }
        };
    
        fetchBlog();
      }, [id]); // Run effect when `id` changes
    
      if (!blogpost) {
        return <p>Loading...</p>;
      }

    

  return (
    <div className="parent">

        <div className="main">
        <h2>{blogpost.title}</h2>
        

        <p>{blogpost.description}</p>
     
        <img src={blogpost.image} alt=""/>
        <p>{blogpost.author}</p>
        <p>{blogpost.catagory}</p>


      </div>

    </div>
  )
}

export default Blogbyid
