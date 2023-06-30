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
    case 'ADD_TICKET':
      const {ticketAdded, boardID: boardIdToFind} = action.payload
    
      // go through eatch board in current state
      const updatedBoards = currentState.boards.map(board => {
        // if board id is the same as the one the ticket got added to
        if(board._id === boardIdToFind){
          //for that board found retrun all the contents of the board with the new ticket passed
          return {
            ...board,
            tickets: [...board.tickets, ticketAdded]
          }
        } 
        // if not a match return the board with no changes
        return board;
      })
      return {
        // once the boards are all checked return the new updated board
        boards: updatedBoards
      }
      case 'DELETE_TICKET':
        const { deletedTicket, boardID } = action.payload;
        console.log("ticket passed =>", deletedTicket);
        console.log("BoardID passed =>", boardID);
        const updatedState = currentState.boards.map(board => {
          if (board._id === boardID) {
            
            return {
              ...board,
              tickets: board.tickets.filter(ticket => ticket._id !== deletedTicket.foundTicket._id)
            };
          }
          return board;
        });
      
        return {
          ...currentState,
          boards: updatedState
        };
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

