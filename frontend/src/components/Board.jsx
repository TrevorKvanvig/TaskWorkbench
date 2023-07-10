import Ticket from "./Ticket";
import { useBoardsContext } from "../hooks/useBoardsContext";
import { useEffect, useState, useRef } from "react";
import { Droppable } from "react-beautiful-dnd";



const Board = ({boardDetails, onTicketModalOpen}) => {
  const { dispatch } = useBoardsContext();
  const titleRef = useRef()

  // declare states
  const [currentTitle, setBoardTitle] = useState(boardDetails.boardTitle);
  const [isTitleChanging, setIsTitleChanging] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {

      // when a click is detected 
      // if it is not the title div
      if (!titleRef.current.contains(event.target)) {
        // set is title changing to false removing save button
        setIsTitleChanging(false);
        // set board title back to title in database
        setBoardTitle(boardDetails.boardTitle)
      }
    };

    // set current title state to title from database 
    setBoardTitle(boardDetails.boardTitle)
    
    // create a listener for the entire dom that will detect clicks and call function
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    
  }, [boardDetails.boardTitle])



  const handleDeleteBoard = async () => {
    // when the delete baord button in pressed
    // delete board from database using api
    const response = await fetch('api/boards/' + boardDetails._id, {
      method: 'DELETE'
    }) 

    //get response
    const boardDeleted = await response.json()

    // if it was sucessful change in dom
    if(response.ok){
      dispatch({
        type: 'DELETE_BOARD',
        payload: boardDeleted
      })
    }
  }

  const handleTitleChange = (event) => {
    // when a change in title is detected
    // show save button
    setIsTitleChanging(true);
    const {value} = event.target;
    
    // set state of current title to the changes that are being made
    setBoardTitle(value);
  
  }

  const saveNewBoardTitle = async () => {

    // create object to send changes wanting to be made to database
    const updatedTitle = {
      boardTitle: currentTitle
    }
    
    // send patch request to api
    const response = await fetch('/api/boards/' + boardDetails._id, {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTitle)
    })

    // if sucessful 
    if(response.ok){  
      
      //update dom with new title from database using board context
      dispatch({
        type: 'UPDATE_BOARD_TITLE',
        payload: {
          title: currentTitle,
          boardID: boardDetails._id
        }
      })
    }
    // remove save button
    setIsTitleChanging(false);
  }
  
  return(
  <div className="board">
    <div className="board-title" ref={titleRef}>
      <input value={currentTitle} onChange={handleTitleChange} maxLength='20'  />
      {isTitleChanging && <button onClick={saveNewBoardTitle}>save</button>}
    </div>
    <Droppable droppableId={boardDetails._id}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} >
          {
            boardDetails.tickets.map((ticket, index) => {
            return(<Ticket key={ticket._id} ticket={ticket} boardDetails={boardDetails} index={index}/>)
            })
          }

          <button onClick={() => {
            onTicketModalOpen(boardDetails)
          }}>ADD TICKET</button>

          <button onClick={handleDeleteBoard}>Delete Entire Board</button>
          
          {provided.placeholder}
        </div>
      )}
    </Droppable>

  </div>
  );
  
}

export default Board;