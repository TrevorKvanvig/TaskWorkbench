
const Board = ({board}) => {
  <div className="board">
    <h3>Board.boardTitle</h3>
    {board.tickets.map((t) => {
      return(
        <div className="ticket-container">
          <p>t.ticketTitle</p>
          <p>t.ticketDescription</p>
          <p>t.ticketPriority</p>
        </div>
      );
    })}
  </div>
}

export default Board;