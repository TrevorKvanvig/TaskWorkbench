import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const {dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/users/login',
    {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });

    const json = await response.json();

    if(!response.ok){
      setError(json.error);
      setIsLoading(false);
    }
    if(response.ok){
      localStorage.setItem('user', JSON.stringify(json))

      dispatch({
        type: "LOGIN",
        payload: json
      })

      setIsLoading(false);
    }
  }

  return {login, isLoading, error}
}