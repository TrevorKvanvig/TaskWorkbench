import { useBoardsContext } from '../hooks/useBoardsContext' 
import { useEffect, useState } from 'react';
import Board from '../components/Board'
import AddBoardModal from "../components/AddBoardModal";
import AddTicketModal from '../components/AddTicketModal';

const Dashboard = () => {
  const {boards, dispatch} = useBoardsContext();
  const [isBoardModalOpen, changeBoardModalState] = useState(false);
  const [isTicketModalOpen, changeTicketModalState] = useState(false);

  

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
    getBoardsfromDB();

  }, [dispatch])

  const handleAddBoard = async (boardTitle) => {
    changeBoardModalState(false);
    console.log("board title passed", JSON.stringify(boardTitle) );
    const newBoard = {
      boardTitle: boardTitle
    }

    const response = await fetch('api/boards', {
      method: 'POST',
      body: JSON.stringify(newBoard),
      headers: {
        "Content-Type": 'application/json'
      }
    });

    const boardAdded = await response.json()
    console.log('Board added to Database =>',boardAdded);

    if(response.ok) {
      dispatch({
        type: 'ADD_BOARD',
        payload: boardAdded
      })
    }else{
      console.log("error getting add board resopnse");
    }

  }
  const handleBoardModalOpen = () => {
    changeBoardModalState(true);
  }

  const handleBoardModalClose = () => {
    changeBoardModalState(false);
  }

  const handleAddTicket = () => {

  }

  const handleTicketModalClose = () => {
    changeTicketModalState(false)
  }

  const handleTicketModalOpen = () => {
    changeTicketModalState(true)
  }
  
  return (
    <>
      <div className="board-container">
        <button onClick={handleBoardModalOpen}>Add Board</button>
        {boards && boards.map((board) => {
          return(<Board key={board._id} boardDetails={board} onTicketModalOpen={handleTicketModalOpen}/>);
        })}
      </div>
      {isTicketModalOpen && <AddTicketModal onClose={handleTicketModalClose} onSubmit={handleAddTicket} />}
      {isBoardModalOpen && <AddBoardModal onClose={handleBoardModalClose} onSubmit={handleAddBoard} />}
    </>
    
  );
}

export default Dashboard;