// context/ThemeProvider.jsx
import { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Manage dark/light mode

  // Function to toggle the theme between light and dark
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode); // Switch the theme on each click
  };

  // Define the theme values
  const theme = {
    backgroundColor: isDarkMode ? "#f1356d" : "#FFF", // Dark mode: #f1356d, Light mode: white
    color: isDarkMode ? "#FFF" : "#000", // Dark mode: white text, Light mode: black text
    toggleTheme, // Function to switch between dark/light mode
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children} {/* All child components will have access to this theme */}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
