import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import ThemeContext from "../context/ThemeContext";

const Navbar = () => {
  const { isAuthenticated, clearUser, email, isLoading } =
    useContext(AuthContext);
  const { toggleTheme } = useContext(ThemeContext);

  const handleClick = (e) => {
    clearUser(); // Log the user out by clearing their authentication data
  };

  // Show a loading spinner while the authentication state is being checked
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
        {isAuthenticated ? (
          <div>
            <Link to="/jobs/add-job">Add Job</Link>
            {email && <span>{email}</span>}
            <button onClick={handleClick}>Log out</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
      <button onClick={toggleTheme}>Toggle</button>
    </nav>
  );
};

export default Navbar;
