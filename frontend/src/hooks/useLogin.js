import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const {dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    //console.log("before request",email, password);
    try {
      const response = await fetch('https://taskworkbenchbackend.onrender.com/api/users/login',
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });
      //console.log(response);
      const json = await response.json();

      if(!response.ok){
        setError(json.error);
        setIsLoading(false);
      }
      if(response.ok){
        await localStorage.setItem('user', JSON.stringify(json))

        dispatch({
          type: "LOGIN",
          payload: json
        })

        setIsLoading(false);
      }
    } catch(error) {
      //console.log(error.message);
    }
    
  }

  return {login, isLoading, error}
}