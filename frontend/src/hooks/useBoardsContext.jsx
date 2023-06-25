import { BoardsContext } from "../contexts/BoardsContext";
import { useContext } from "react";

// function to be able to acess context
export const useBoardsContext = () => {
  const context = useContext(BoardsContext);

  // if unable to use context
  if(!context){
    throw Error('useBoardsContext must be used in a boards context provider')
  }

  // return context to be used
  return context
}

