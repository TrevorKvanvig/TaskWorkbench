import { useBoardsContext } from '../hooks/useBoardsContext' 
import { useEffect, useState } from 'react';
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd'

import Board from '../components/Board'
import AddBoardModal from "../components/AddBoardModal";
import AddTicketModal from '../components/AddTicketModal';


const Dashboard = () => {
  // current state of boards
  const {boards, dispatch} = useBoardsContext();

  // use states
  const [isBoardModalOpen, changeBoardModalState] = useState(false);
  const [isTicketModalOpen, changeTicketModalState] = useState(false);
  const [ticketsBoardDetails, setBoardDetails] = useState(null)

  
  // Whenever dasboard gets loaded run this function once
  useEffect(() => {
    
    const getBoardsfromDB = async () => {
      //get response object
      const response = await fetch('/api/boards');
      // get boards from the response object
      const allBoards = await response.json();
      
      if(!allBoards.ok){
        dispatch({
          type: 'SET_BOARDS',
          payload: allBoards
        });
      }

    }

    // call async function
    getBoardsfromDB();

  }, [dispatch])

  
  const handleAddBoard = async (boardTitle) => {
    // close board modal
    changeBoardModalState(false);
    
    //create new board to pass into database
    const newBoard = {
      boardTitle: boardTitle
    }

    // send board to database
    const response = await fetch('api/boards', {
      method: 'POST',
      body: JSON.stringify(newBoard),
      headers: {
        "Content-Type": 'application/json'
      }
    });

    // get board added back from database
    const boardAdded = await response.json()

    // if board sucessfuly added to database
    if(response.ok) {
      // change current state of boards on dom using board contex
      dispatch({
        type: 'ADD_BOARD',
        payload: boardAdded
      })
    }else{
      console.log("error getting add board resopnse");
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

  // ticketDetails: ticket details to dadd to databased passed from modal form
  // boardID: board id of where to add ticket from modal
  const handleAddTicket = async (ticketDetails, boardID) => {

    // try to add ticket to database
    const response = await fetch('api/boards/' + boardID, {
      method: 'POST',
      body: JSON.stringify(ticketDetails),
      headers: {
        "Content-Type": 'application/json'
      }
    });

    // get ticket added back from api response
    const ticketAdded = await response.json()

    // if sucessfully added
    if(response.ok) {
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

  const findTicketInDOM = (sourceBoardID, draggableId ) => {
    const boardWhereTicketMovedFrom = boards.find((board) => board._id === sourceBoardID)
    console.log(boardWhereTicketMovedFrom);

    console.log(draggableId);
    const ticketDragged = boardWhereTicketMovedFrom.tickets.find(ticket => ticket._id === draggableId)

    return ticketDragged
  }

  const handleDragEnd = (result) => {
    console.log("restult =>", result);
    const { destination, source, draggableId } = result;
    const sourceBoardID = source.droppableId;
    const destinationBoardID = destination.droppableId;

    console.log("source board ID: ",sourceBoardID);
    console.log("destination board id", destinationBoardID);

    // if place item is grabbed fro  is the same as where it was placed do nothing
    if (source.droppableId === destination.droppableId){
      console.log('dropped in same Board');
      return;


    } else {
      console.log('dropped in different board');
      // steps
      // 1. find ticket in boards database and store it
      const ticketDragged = findTicketInDOM(sourceBoardID, draggableId);
      console.log(ticketDragged);
      
      
      // 2. remove ticket from souce board
      const deletedTicket = {
        foundTicket: ticketDragged
      }

      dispatch({
        type: 'DELETE_TICKET',
        payload: {
          deletedTicket, 
          boardID: sourceBoardID
        }
      })
      // 3. add it into destination board at correct index
    }


  }
  
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board-container">
        <button onClick={handleBoardModalOpen}>Add Board</button>
        {boards && boards.map((board) => {
          return(<Board key={board._id} boardDetails={board} onTicketModalOpen={handleTicketModalOpen}/>);
        })}
      </div>
      </DragDropContext>
      




      {isTicketModalOpen && ticketsBoardDetails && <AddTicketModal 
      onClose={handleTicketModalClose} 
      onSubmit={handleAddTicket} 
      boardDetails={ticketsBoardDetails}
      />}
      {isBoardModalOpen && <AddBoardModal 
      onClose={handleBoardModalClose} 
      onSubmit={handleAddBoard} 
      />}
    </>
    
  );
}

export default Dashboard;