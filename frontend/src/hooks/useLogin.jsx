import { useState } from "react";
import { useAuth } from "./useAuth";

export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth(); // Use the setUser function from useAuth

  const login = async (object) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });
      const userData = await response.json();

      if (!response.ok) {
        setError(userData.error);
        setIsLoading(false);
        return null;
      }

      // Update the auth context with the user data
      setUser(userData);

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      setIsLoading(false);
      return userData;
    } catch (err) {
      setError("An error occurred while logging in.");
      setIsLoading(false);
      return null;
    }
  };

  return { login, isLoading, error };
}
