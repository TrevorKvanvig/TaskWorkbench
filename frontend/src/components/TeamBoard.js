import { DragDropContext } from 'react-beautiful-dnd'
import { useState, useEffect } from 'react';
import { useBoardsContext } from '../hooks/useBoardsContext'

import AddBoardModal from "../components/AddBoardModal";
import AddTicketModal from '../components/AddTicketModal';
import Board from '../components/Board'


const TeamBoard =  ({ teamDetails }) => {
  const { boards, dispatch } =  useBoardsContext();
  const [isBoardModalOpen, changeBoardModalState] = useState(false);
  const [isTicketModalOpen, changeTicketModalState] = useState(false);
  const [ticketsBoardDetails, setBoardDetails] = useState(null)

  // Whenever dasboard gets loaded run this function once
  useEffect(() => {

    const getBoardsfromDB = async () => {
      if (teamDetails) {
        const response = await fetch('/api/boards/' + teamDetails._id);
        const allBoards = await response.json();

        if (allBoards) {
          dispatch({
            type: 'SET_BOARDS',
            payload: allBoards
          });
        }
      }
    }

    // Check if teamDetails is not null before making the API call

    getBoardsfromDB();


  }, [dispatch, teamDetails]);


  const findTicketInDOM = (sourceBoardID, draggableId) => {
    const boardWhereTicketMovedFrom = boards.find((board) => board._id === sourceBoardID)
    console.log(boardWhereTicketMovedFrom);

    console.log(draggableId);
    const ticketDragged = boardWhereTicketMovedFrom.tickets.find(ticket => ticket._id === draggableId)

    return ticketDragged
  }

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    const sourceBoardID = source.droppableId;
    const destinationBoardID = destination.droppableId;

    console.log(result);

    // if place item is grabbed fro  is the same as where it was placed do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      console.log('dropped in same Place');
      return;
    } else {
      console.log('dropped in different board');
      // steps
      // 1. find ticket in boards database and store it
      const ticketDragged = findTicketInDOM(sourceBoardID, draggableId);
      console.log(ticketDragged);


      // 2. remove ticket from souce board ===============
      const deletedTicket = {
        foundTicket: ticketDragged
      }

      dispatch({
        type: 'MOVE_TICKET',
        payload: {
          deletedTicket,
          sourceBoardID,
          destinationBoardID,
          index: destination.index
        }
      });
      const response = await fetch('api/boards/' + sourceBoardID + '/' + draggableId, {
        method: 'DELETE'
      })
      if (!response.ok) {
        console.log(response.json.error);
      }


      // 3. add ticket at correct index ===============
      const addTicketResponse = await fetch('api/boards/' + destinationBoardID + '?index=' + destination.index, {
        method: 'POST',
        body: JSON.stringify(ticketDragged),
        headers: {
          "Content-Type": 'application/json'
        }
      });
      if (!addTicketResponse) {
        console.log(addTicketResponse.json.error)
      }
    }
  }
  const handleTicketModalClose = () => {
    // close ticket modal
    // reset board details
    changeTicketModalState(false);
    setBoardDetails(null);

  }

  const handleTicketModalOpen = (boardDetails) => {
    // open ticket modal
    // get board details of where to add ticket back from modal
    setBoardDetails(boardDetails);
    changeTicketModalState(true);
  }

  // ticketDetails: ticket details to add to databased passed from modal form
  // boardID: board id of where to add ticket from modal
  const handleAddTicket = async (ticketDetails, boardID) => {

    // try to add ticket to database
    const response = await fetch('api/boards/' + teamDetails._id + "/" + boardID, {
      method: 'POST',
      body: JSON.stringify(ticketDetails),
      headers: {
        "Content-Type": 'application/json'
      }
    });

    // get ticket added back from api response
    const ticketAdded = await response.json()

    // if sucessfully added
    if (response.ok) {
      // add ticked into correct board to dom
      dispatch({
        type: 'ADD_TICKET',
        payload: {
          ticketAdded,
          boardID
        }
      })
    } else {
      console.log(ticketAdded.error);
    }
  }

  const handleAddBoard = async (boardTitle) => {
    // close board modal
    changeBoardModalState(false);

    //create new board to pass into database
    const newBoard = {
      boardTitle: boardTitle
    }

    // send board to database
    const response = await fetch('api/boards/' + teamDetails._id, {
      method: 'POST',
      body: JSON.stringify(newBoard),
      headers: {
        "Content-Type": 'application/json'
      }
    });

    // get board added back from database
    const boardAdded = await response.json()
    console.log(boardAdded);
    // if board sucessfuly added to database
    if (response.ok) {
      // change current state of boards on dom using board contex
      
      await dispatch({
        type: 'ADD_BOARD',
        payload: boardAdded
      });
  

    } else {
      console.log("error getting add board response");
    }
  }

  const handleBoardModalOpen = () => {
    // open board modal
    changeBoardModalState(true);
  }

  const handleBoardModalClose = () => {
    // close board modal
    changeBoardModalState(false);
  }
  

  return (
    <>
      {teamDetails && <h2>{teamDetails.teamTitle}</h2>}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='grid'>
          <div className="board-container">
            
            {teamDetails && boards && boards.map((board) => {
              return (
                  <Board key={board._id} boardDetails={board} onTicketModalOpen={handleTicketModalOpen} teamDetails={teamDetails} />);
    
            })}

            <div className='add-board-btn-container'>
              <button onClick={handleBoardModalOpen} className='add-board-btn'>Add Board</button>
            </div>
          </div>
        </div>
      </DragDropContext>


      {isBoardModalOpen && <AddBoardModal
        onClose={handleBoardModalClose}
        onSubmit={handleAddBoard}
      />}

      {isTicketModalOpen && ticketsBoardDetails && <AddTicketModal
        onClose={handleTicketModalClose}
        onSubmit={handleAddTicket}
        boardDetails={ticketsBoardDetails}
      />}
    </>

  );
}

export default TeamBoard;