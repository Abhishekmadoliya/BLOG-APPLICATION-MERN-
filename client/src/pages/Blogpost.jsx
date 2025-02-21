import { TextInput } from '@mantine/core';
import { Card, Image, Text, Badge, Group} from '@mantine/core';




import "./Blogpost.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Blogpost() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/blogs/");
        setBlog(response.data); // Ensure correct data assignment
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []); // Empty dependency array runs this effect only once


 
 
 
  
  return (
    <div className="main-container">
      <div className="main-left">
        <div className="search-input">
          <p>For you</p>
          <TextInput
      size="xs"
      radius="xl"
      id="blog-input"
      
      placeholder="Search articles"
      
    />
        </div>

        <div className="blog-navigation">
          <li>
            <a href="">All</a>
          </li>
          <li>
            <a href="">Technology</a>
          </li>
          <li>
            <a href="">Envirnment</a>
          </li>
          <li>
            <a href="">Buisness</a>
          </li>
        </div>

        <div className="all-blogs">
          {blog.map((bl) => (

            <div className="blog"key={bl.id} >
              <Card shadow="sm" padding="lg" radius="md" withBorder >
              <Card.Section component="a"  className="blog-content">

              <div className="image-side">
                <Image
                  src={bl.image}
                  height={160}
                  alt="Norway"
                />
                </div>

                <div className="content-right">

                <Text size="sm" c="dimmed">
                {bl.description}
              </Text>
              

                <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Norway Fjord Adventures</Text>
                <Badge color="pink">On Sale</Badge>
              </Group>
                </div>
              </Card.Section>
        
              
        
              
        
              {/* <Button color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
              </Button> */}
            </Card>
            </div>
          ))}
        </div>
      </div>


      <div className="main-right">
            <div className="create-account">
              <button id='create-account'>Create Account</button>
            </div>

            <div className="trending">
              <p>its trending section</p>
            </div>
      </div>
    </div>
  );
}

export default Blogpost;
