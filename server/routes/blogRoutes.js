const express = require("express");
const router = express.Router(); // ✅ Create router instance
const blog = require("../modal/blog");
const Blog = require("../modal/blog");

// get all blog post
router.get("/", async(req, res) => {

  try {
    const allListing = await Blog.find({});
    res.json(allListing)
  } catch (error) {
    console.log(error);
    
    
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await Blog.findById(id); // Await the query

    if (!blogPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// create a blog post
router.post("/create", async (req, res) => {
  try {
    const { title, description, image, author, catagory } = req.body;

    const newBlog = new blog({
      title,
      description,
      image,
      author,
      catagory,
    });

    await newBlog.save();
    res.status(201).json({
      message: "blog created successfully",
      blog: newBlog,
    });

    console.log("a new blog created ", newBlog);
    
  } catch (err) {
    console.log("something wrong", err);
  }
});

// get blog by :id
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    console.log(blog);

    res.status(201).json({
      blog: blog,
    });
  } catch (err) {
    console.log(err);
  }
});

// update a blog post by :id

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, author, category } = req.body;

        // Update the blog post by ID
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, description, image, author, category },
            { new: true } // Ensure that the updated document is returned
        );

        // Check if the blog post was found and updated
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Respond with the updated blog
        res.status(200).json(updatedBlog); // Use 200 OK for successful update
    } catch (err) {
        console.log("Something went wrong during update:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Await the deletion of the blog by ID
        const deletedBlog = await Blog.findByIdAndDelete(id);

        // Check if the blog was found and deleted
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Respond with the deleted blog
        res.status(200).json({ message: "Blog deleted successfully", blog: deletedBlog });

    } catch (err) {
        console.log("Something went wrong during delete:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});




module.exports = router;
