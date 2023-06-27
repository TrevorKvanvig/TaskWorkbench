import BoardContainer from '../components/BoardContainer';
import { useBoardsContext } from '../hooks/useBoardsContext' 
import { useEffect } from 'react';

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
    <BoardContainer boards={boards}/>
  );
}
export default Dashboard