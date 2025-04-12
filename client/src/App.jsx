import "./App.css";
import { Routes, Route } from "react-router-dom";
import BlogData from "./components/BlogData";
// import Header from "./components/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Blogpost from "./pages/BlogPost";
import NewBlog from "./pages/NewBlog";
import BlogbyId from "./pages/BlogbyId";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

    
      <main className=" mt-15">
        <Routes>
          <Route path="/" element={<BlogData />} />
          <Route path="/new" element={<NewBlog />} />
          <Route path="/blogs" element={<Blogpost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/post/:id" element={<BlogbyId />} />
          {/* Catch all route for 404 */}
          <Route path="*" element={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">404</h1>
                <p className="text-xl text-gray-600 mt-4">Page not found</p>
              </div>
            </div>
          } />
          
          {/* <Route path="/:user/dashboard" element={<Dashboard  />}  />
          <Route path="/:user/new" element={<Blogform />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;


// check the newblog page