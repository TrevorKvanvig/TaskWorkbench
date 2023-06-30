import { useReducer, createContext } from "react";

export const BoardsContext = createContext()

export const boardsReducer = (currentState, action) => {
  
  switch(action.type) {
    case 'SET_BOARDS':
      return { // sets workouts key to array of all current workouts in database when dispach is called from home.js with SET_WORKOUTS as action type
        boards: action.payload
      }
    case 'DELETE_BOARD':
      return {
        boards: currentState.boards.filter(board => action.payload._id !== board._id)
      }
    case 'ADD_BOARD':
      return {
        boards: [...currentState.boards, action.payload]
      }
    default:
      return currentState
  }
  
  
}

export const BoardsContextProvider = ({children}) => { // children is everything wrapped in provider
  
  const [currentState, dispatch] = useReducer(boardsReducer, {
    boards: null
  })

  return (
    <BoardsContext.Provider value={{...currentState, dispatch}} >
      {children}
    </BoardsContext.Provider>
  );
}

