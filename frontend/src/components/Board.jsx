import Ticket from "./Ticket";
import { useBoardsContext } from "../hooks/useBoardsContext";
import { useEffect, useState } from "react";


const Board = ({boardDetails, onTicketModalOpen}) => {
  const { dispatch } = useBoardsContext();
  const [currentTitle, setBoardTitle] = useState('No Title')
  const [revertedTitle, setrevertedTitle] = useState('No Title')
  const [isTitleChanging, setIsTitleChanging] = useState(false)

  useEffect(() => {
    setBoardTitle(boardDetails.boardTitle)
    setrevertedTitle(boardDetails.boardTitle)

    
  }, [boardDetails.boardTitle])

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

  const handleTitleChange = async (event) => {
    setIsTitleChanging(true);
    const {value} = event.target;
    
    setBoardTitle(value);
  }

  const saveNewBoardTitle = async () => {
    setIsTitleChanging(false);
  }
  
  
  return(
  <div className="board">
    <div className="board-title">
      <input value={currentTitle} onChange={handleTitleChange}/>
      {isTitleChanging && <button onClick={saveNewBoardTitle}>save</button>}
    </div>
    

    {boardDetails.tickets.map((ticket) => {
      return(<Ticket key={ticket._id} ticket={ticket} boardDetails={boardDetails}/>)
    })}
    <button onClick={() => {
      onTicketModalOpen(boardDetails)
    }}>ADD TICKET</button>
    <button onClick={handleDeleteBoard}>Delete Entire Board</button>
    
  </div>);
  
}

export default Board;