import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useBoardsContext } from '../hooks/useBoardsContext';
import { useState } from 'react';
import TicketDetails from './TicketDetails';
const Ticket = ({ticket, boardDetails}) => {
  const { dispatch } = useBoardsContext();
  const [isTicketOpen, setTicketOpen] = useState(null);


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

  const handleTicketClick = (event) => {
    const {name} = event.target;

    //if delete button is pressed dont open modal
    if (name !== 'delete-button') {
      // if it is not pressed open modal
      setTicketOpen(true);
    }
    
  }

  const handleTicketClose = () => {
    console.log('clicked close button');
    setTicketOpen(false)
  }

  return (
  <>
  <div className="ticket" onClick={handleTicketClick}>
    <h4>{ticket.ticketTitle}</h4>
    <p>{formatDistanceToNow(new Date(ticket.createdAt), {addSuffix: true}) }</p>
    <button name="delete-button" onClick={handleDeleteTicket}>DELETE</button>
  </div>
  {isTicketOpen && <TicketDetails ticketDetails={ticket} onClose={handleTicketClose} />}
  
  </>);

}

export default Ticket