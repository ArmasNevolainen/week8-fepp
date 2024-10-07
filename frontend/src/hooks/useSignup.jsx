import { useState } from "react";
import { useAuth } from "./useAuth";

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const signup = async (object) => {
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

      // Update auth context
      setUser(userData);

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      setIsLoading(false);
      return userData;
    } catch (err) {
      setError("An error occurred while signing up.");
      setIsLoading(false);
      return null;
    }
  };

  return { signup, isLoading, error };
}
