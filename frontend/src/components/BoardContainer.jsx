import Board from "./Board";
const BoardContainer = ({boards}) => {
  console.log(boards);
  return (
    <div className="board-container">
      {boards.map(board => (<Board board={board}/>))}
    </div>
  );
}

export default BoardContainer;