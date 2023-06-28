import Board from "./Board";
import { useBoardsContext } from "../hooks/useBoardsContext";

const BoardContainer = () => {
  const {boards} = useBoardsContext()

  console.log(boards);
  return (
    <div className="board-container">
    
      {boards && boards.map((board) => {
        return(<Board key={board._id} boardDetails={board}/>);
        
      })}
    </div>
  );
}

export default BoardContainer;