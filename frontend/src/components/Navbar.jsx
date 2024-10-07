import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, token } = useAuth();
  const { toggleTheme } = useTheme();
  const { isLoading, email, clearUser } = useAuth();

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
            <p>Authenticated with token: {token}</p>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <p>Not Authenticated</p>
          </div>
        )}
      </div>
      <button onClick={toggleTheme}>Toggle</button>
    </nav>
  );
};

export default Navbar;
