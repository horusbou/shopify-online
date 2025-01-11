import { useState } from "react";
import { useGlobalContext } from "../context/context";
import { login as apiLogin } from "../utils/api";
import { UserType } from "../types";
import { jwtDecode } from "jwt-decode";

export function useLogin() {
  const [error, setError] = useState<string | null>(null);  
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const { login } = useGlobalContext();

  const localLogin = async (email: string, password: string) => {
    
    setIsLoading(true)
    setError(null);
    try {
      const response = await apiLogin({ email, password });
      setIsLoading(false);

      if (response && response.accessToken) {
        const user: UserType = jwtDecode(response.accessToken);
        login(user);
        localStorage.setItem("accessToken", response.accessToken);
        return true;
      } else {
        setError("Unexpected response format");
        return false;
      }
    } catch (err: any) {
      setIsLoading(false);  

      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during login");
      }
      return false;
    }
  };

  return { login: localLogin, isLoading, error };
}
