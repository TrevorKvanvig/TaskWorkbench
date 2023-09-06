
import { useBoardsContext } from '../hooks/useBoardsContext';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useAuthContext } from "../hooks/useAuthContext";
import TicketDetails from './TicketDetails';
import { ReactComponent as TrashLogo } from '../trash.svg';
const Ticket = ({ teamDetails, ticket, boardDetails, index }) => {
  const { dispatch } = useBoardsContext();
  const [isTicketOpen, setTicketOpen] = useState(null);


  const handleDeleteTicket = async (event) => {
    event.stopPropagation();
    const response = await fetch('api/team/' + teamDetails._id + '/' + boardDetails._id + "/" + ticket._id, {
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
    console.log(name);
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
      {ticket &&<Draggable
        key={ticket._id}
        draggableId={ticket._id}
        index={index}
      >
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                userSelect: 'none',
                backgroundColor: snapshot.isDraging ? 'green' : '#74C2E1',
                ...provided.draggableProps.style
              
              }}
              className="ticket"
              onClick={handleTicketClick}
            >
              <h4 className='ticket-title'>{ticket.ticketTitle}</h4>
        
              <button className="ticket-delete" name="delete-button" onClick={handleDeleteTicket}>
                <TrashLogo/>
              </button>
              {provided.placeholder}
            </div>
          );

        }}

      </Draggable>}
      

      {isTicketOpen && <TicketDetails teamDetails={teamDetails} ticketDetails={ticket} onClose={handleTicketClose} boardID={boardDetails._id} />}
    </>);

}

export default Ticket