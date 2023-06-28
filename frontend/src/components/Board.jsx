import Ticket from "./Ticket";
const Board = ({boardDetails}) => {
  

  return(<div className="board">
    <h3>{boardDetails.boardTitle}</h3>
    {boardDetails.tickets.map((ticket) => {
  
      
      return(<Ticket key={ticket._id} ticket={ticket} />)
    })}
    
  </div>);
  
}

export default Board;