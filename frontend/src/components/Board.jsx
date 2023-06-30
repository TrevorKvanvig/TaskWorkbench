import Ticket from "./Ticket";
import { useBoardsContext } from "../hooks/useBoardsContext";



const Board = ({boardDetails}) => {
  const { dispatch } = useBoardsContext();

  const handleDeleteBoard = async () => {
    const response = await fetch('api/boards/' + boardDetails._id, {
      method: 'DELETE'
    }) 
    const boardDeleted = await response.json()

    if(response.ok){
      dispatch({
        type: 'DELETE_BOARD',
        payload: boardDeleted
      })
    }
  }
  
  function handleAddTicket() {

  }

  return(<div className="board">
    <h3>{boardDetails.boardTitle}</h3>
    {boardDetails.tickets.map((ticket) => {
      return(<Ticket key={ticket._id} ticket={ticket} />)
    })}
    <button>ADD TICKET</button>
    <button onClick={handleDeleteBoard}>Delete Entire Board</button>
    
  </div>);
  
}

export default Board;