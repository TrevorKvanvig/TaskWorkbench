import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useBoardsContext } from '../hooks/useBoardsContext';
const Ticket = ({ticket, boardDetails}) => {
  const { dispatch } = useBoardsContext();

  const handleDeleteTicket = async () => {
    
    const response = await fetch('api/boards/' + boardDetails._id + "/" + ticket._id, {
      method: 'DELETE'
    }) 
    const deletedTicket = await response.json()
  
    if(response.ok) {
    
      dispatch({
        type: 'DELETE_TICKET',
        payload: {
          deletedTicket,
          boardID: boardDetails._id
        }
      })

    }else{
      console.log(deletedTicket.error);
    }

  }

  return (<div className="ticket">
    <h4>{ticket.ticketTitle}</h4>
    <p>{formatDistanceToNow(new Date(ticket.createdAt), {addSuffix: true}) }</p>
    <span onClick={handleDeleteTicket}>DELETE</span>
  </div>);

}

export default Ticket