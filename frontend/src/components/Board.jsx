import Ticket from "./Ticket";
import { useBoardsContext } from "../hooks/useBoardsContext";
import { useEffect, useState, useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ReactComponent as AddLogo } from '../add-square.svg';
import { useAuthContext } from "../hooks/useAuthContext";


const Board = ({ boardDetails, onTicketModalOpen, teamDetails }) => {
  const { dispatch } = useBoardsContext();
  const titleRef = useRef();
  const { user } = useAuthContext();

  // declare states
  const [currentTitle, setBoardTitle] = useState(boardDetails.boardTitle);

  const [isTitleChanging, setIsTitleChanging] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {

      // when a click is detected outside
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

  }, [boardDetails])
  


  const handleDeleteBoard = async () => {
    // when the delete baord button in pressed
    // delete board from database using api
    const response = await fetch('https://taskworkbenchbackend.onrender.com/api/team/' + teamDetails._id + "/" + boardDetails._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    //get response
    const boardDeleted = await response.json()
  
    // if it was sucessful change in dom
    if (response.ok) {
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
    const { value } = event.target;

    // set state of current title to the changes that are being made
    setBoardTitle(value);

  }

  const saveNewBoardTitle = async () => {

    // create object to send changes wanting to be made to database
    const updatedTitle = {
      boardTitle: currentTitle
    }

    // send patch request to api
    const response = await fetch('https://taskworkbenchbackend.onrender.com/api/boards/' + teamDetails._id + '/' + boardDetails._id, {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(updatedTitle)
    })

    // if sucessful 
    if (response.ok) {

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



  // return this jsx code to browser
  return (
    <div className="board"
      style={{
        background: '#0191C8'
      }}
    >

      <div className="board-title" ref={titleRef}>
        <input className="board-title-input" value={currentTitle} onChange={handleTitleChange} maxLength='20' />
        {isTitleChanging && <button onClick={saveNewBoardTitle}>save</button>}
      </div>

      {boardDetails && (<Droppable droppableId={boardDetails._id}>
        {(provided, snapshot) => {
          // Calculate total height of tickets
          let totalTicketHeight = 0;
          if (boardDetails && boardDetails.tickets) {
            totalTicketHeight = boardDetails.tickets.length * 74; // Assuming each ticket has a height of 100px
          }

          return (<div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              minHeight: totalTicketHeight !== 0 ? `${totalTicketHeight}px` : '74px',
              borderRadius: '7px',
              backgroundColor: snapshot.isDraggingOver ? 'lightblue' : '#0191C8',
              margin: '0px 0px 10px 0px'
            }}
          >
            {boardDetails.tickets.map((ticket, index) => {
              return (<Ticket key={ticket._id}
                teamDetails={teamDetails}
                ticket={ticket}
                boardDetails={boardDetails}
                index={index} />)
            })}
            {provided.placeholder}
          </div>);
        }}
      </Droppable>
      )}

      <div className="end-board-buttons">

        <button className="board-delete" onClick={handleDeleteBoard}>Delete Board</button>
        <button className="add-board-button" onClick={() => {
          onTicketModalOpen(boardDetails)
        }}><AddLogo /></button>
      </div>

    </div>



  );

}

export default Board;