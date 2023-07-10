import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useBoardsContext } from '../hooks/useBoardsContext';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import TicketDetails from './TicketDetails';

const Ticket = ({ ticket, boardDetails, index }) => {
  const { dispatch } = useBoardsContext();
  const [isTicketOpen, setTicketOpen] = useState(null);


  const handleDeleteTicket = async () => {
    const response = await fetch('api/boards/' + boardDetails._id + "/" + ticket._id, {
      method: 'DELETE'
    })
    const deletedTicket = await response.json()

    if (response.ok) {

      dispatch({
        type: 'DELETE_TICKET',
        payload: {
          deletedTicket,
          boardID: boardDetails._id
        }
      })

    } else {
      console.log(deletedTicket.error);
    }
  }

  const handleTicketClick = (event) => {
    const { name } = event.target;

    //if delete button is pressed dont open modal
    if (name !== 'delete-button') {
      // if it is not pressed open modal
      setTicketOpen(true);
    }

  }

  const handleTicketClose = () => {
    setTicketOpen(false)
  }

  return (
    <>
      <Draggable draggableId={`${ticket._id}`} key={ticket._id} index={index}>
        {(provided, snapshot) => (
          <>
            <div className="ticket" onClick={handleTicketClick}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <h4>{ticket.ticketTitle}</h4>
            <p>{formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</p>
            <button name="delete-button" onClick={handleDeleteTicket}>DELETE</button>
            </div>
            
            {provided.placeholder}
          </>
          
        )}
        
      </Draggable>




      {isTicketOpen && <TicketDetails ticketDetails={ticket} onClose={handleTicketClose} boardID={boardDetails._id} />}
    </>);

}

export default Ticket