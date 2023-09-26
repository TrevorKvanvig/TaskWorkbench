import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useAuthContext();

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);
    
    const response = await fetch('https://taskworkbenchbackend.onrender.com/api/users', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, email, password})
    });

    const json = await response.json();

    if(!response.ok){
      setError(json.error);
      setIsLoading(false);
      
    }
    if(response.ok) {
      // save user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      dispatch({
        type: "LOGIN",
        payload: json
      })
      setIsLoading(false);
    }
  }

  return { signup, isLoading, error}
}