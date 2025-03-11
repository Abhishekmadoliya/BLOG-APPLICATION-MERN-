import { Link } from "react-router-dom"; // If using React Router

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div id="nav-left">
        <Link to="/">
          <img src="avatar.png" alt="Logo" className="w-10" />
        </Link>
      </div>

      <div id="nav-right">
        <ul className="flex gap-4 text-white">
          <li className="">
            <Link to="/" className="hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-gray-400">Blog</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
