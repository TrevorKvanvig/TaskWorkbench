import { useState } from "react";

const AddTicketModal = ({onSubmit, onClose, boardDetails}) => {
  const [ticketDetails, setTicketDetails] = useState({
    ticketTitle: '',
    ticketDescription: '',
    ticketPriority: ''
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    console.log(ticketDetails);
    setTicketDetails({
      ...ticketDetails,
      [name]: value
    });
  }

  console.log(ticketDetails);
  return (
    <form className="add-board-modal">
      <h2>Add New Ticket to "{boardDetails.boardTitle}"</h2>
      
      <label htmlFor="ticket-title">New Ticket Title</label>
      <input type="text" id="ticket-title" name="ticketTitle" value={ticketDetails.ticketTitle}  onChange={handleChange}/>

      <label htmlFor="ticket-description">New Ticket Description</label>
      <input type="text" id="ticket-description" name="ticketDescription" value={ticketDetails.ticketDescription} onChange={handleChange}/>
      
      <label htmlFor="ticket-priority">New Ticket Priority</label>
      <input type="text" id="ticket-priority" name="ticketPriority" value={ticketDetails.ticketPriority} onChange={handleChange}/>
      
      <button type="submit" onClick={(event) => {
        event.preventDefault();
        onSubmit(ticketDetails, boardDetails._id);

        setTicketDetails({
          ticketTitle: '',
          ticketDescription: '',
          ticketPriority: ''
        });
      }}>Add Ticket</button>

      <button onClick={(event) => {
        event.preventDefault()
        onClose()
      }}>close</button>
    </form>
    
  );
}

export default AddTicketModal;