import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

// function to be able to acess context
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  // if unable to use context
  if(!context){
    throw Error('useAuthContext must be used in a Auth context provider')
  }

  // return context to be used
  return context
}