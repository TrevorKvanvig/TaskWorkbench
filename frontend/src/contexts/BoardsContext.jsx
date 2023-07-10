import { useReducer, createContext } from "react";

export const BoardsContext = createContext()

export const boardsReducer = (currentState, action) => {

  switch (action.type) {
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
      const { ticketAdded, boardID: boardIdToFind } = action.payload

      // go through eatch board in current state
      const updatedBoards = currentState.boards.map(board => {
        // if board id is the same as the one the ticket got added to
        if (board._id === boardIdToFind) {
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
      console.log(deletedTicket);
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

    case 'UPDATE_BOARD_TITLE':
      return {
        boards: currentState.boards.map(board => {
          if (board._id === action.payload.boardID) {
            return {
              ...board,
              boardTitle: action.payload.title
            }
          } else {
            return board
          }

        })
      }
    case 'UPDATE_TICKET_TITLE':
      return {
        boards: currentState.boards.map(board => {
          if (board._id === action.payload.boardID) {
            return {
              ...board,
              tickets: board.tickets.map(ticket => {
                if (ticket._id === action.payload.ticketID) {
                  return {
                    ...ticket,
                    ticketTitle: action.payload.updateObject.ticketTitle
                  };
                }
                return ticket;
              })
            };
          }
          return board;
        })
      }
    case 'UPDATE_TICKET_DESC':
      return {
        boards: currentState.boards.map(board => {
          if (board._id === action.payload.boardID) {
            return {
              ...board,
              tickets: board.tickets.map(ticket => {
                if (ticket._id === action.payload.ticketID) {
                  return {
                    ...ticket,
                    ticketDescription: action.payload.updateObject.ticketDescription
                  };
                }
                return ticket;
              })
            };
          }
          return board;
        })
      }
    case 'UPDATE_TICKET_PRI':
      return {
        boards: currentState.boards.map(board => {
          if (board._id === action.payload.boardID) {
            return {
              ...board,
              tickets: board.tickets.map(ticket => {
                if (ticket._id === action.payload.ticketID) {
                  return {
                    ...ticket,
                    ticketPriority: action.payload.updateObject.ticketPriority
                  };
                }
                return ticket;
              })
            };
          }
          return board;
        })
      }
    case 'MOVE_TICKET':
      const {sourceBoardID, destinationBoardID, index } = action.payload;

      // Delete the ticket from the source board
      const updatedSourceBoard = currentState.boards.map(board => {
        if (board._id === sourceBoardID) {
          return {
            ...board,
            tickets: board.tickets.filter(ticket => ticket._id !== action.payload.deletedTicket.foundTicket._id)
          };
        }
        return board;
      });

      // Insert the ticket into the destination board at the specified index
      const updatedDestinationBoard = updatedSourceBoard.map(board => {
        if (board._id === destinationBoardID) {
          const updatedTickets = [...board.tickets];
          updatedTickets.splice(index, 0, action.payload.deletedTicket.foundTicket);

          return {
            ...board,
            tickets: updatedTickets
          };
        }
        return board;
      });

      return {
        boards: updatedDestinationBoard
      };
    default:
      return currentState
  }


}

export const BoardsContextProvider = ({ children }) => { // children is everything wrapped in provider

  const [currentState, dispatch] = useReducer(boardsReducer, {
    boards: null
  })

  return (
    <BoardsContext.Provider value={{ ...currentState, dispatch }} >
      {children}
    </BoardsContext.Provider>
  );
}

