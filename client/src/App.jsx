import "./App.css";
import { Routes, Route } from "react-router-dom";
import Blogdata from "./components/Blogdata";
// import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blogpost from "./pages/Blogpost";
import Newblog from "./pages/Newblog";
import Blogbyid from "./pages/Blogbyid";


// import Dashboard from "./components/Dashboard/Dashboard";
// import Blogform from "./components/Newblog/Blogform.jsx";

function App() {

  return (
    <div className="app">
      {/* <Header /> */}
    
      <main>
        <Routes>
          <Route path="/" element={<Blogdata />} />
          <Route path="/new" element={<Newblog />} />
          <Route path="/blogs" element={< Blogpost/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/post/:id" element={<Blogbyid />} />
          {/* <Route path="/:user/dashboard" element={<Dashboard  />}  />
          <Route path="/:user/new" element={<Blogform />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
