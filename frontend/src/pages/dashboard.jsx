import { useBoardsContext } from '../hooks/useBoardsContext' 
import { useEffect } from 'react';
import Board from '../components/Board'

const Dashboard = () => {
  const {boards, dispatch} = useBoardsContext();

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
        })
      }

    }
    
    getBoardsfromDB()

  }, [dispatch])

  
  return (
    <div className="board-container">
      {boards && boards.map((board) => {
        return(<Board key={board._id} boardDetails={board}/>);
      })}
    </div>
  );
}
export default Dashboard