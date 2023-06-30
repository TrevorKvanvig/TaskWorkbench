import { useState } from "react";

const AddTicketModal = ({onSubmit, onClose}) => {
  const [ticketDetails, setTicketDetails] = useState({
    ticketTitle: '',
    ticketDescription: '',
    ticketPriority: ''
  });

  const handleChange = (event) => {
    const {name, value} = event.target;

    setTicketDetails({
      ...ticketDetails,
      [name]: value
    });

    console.log(ticketDetails);

  }


  return (
    <form className="add-board-modal">
      <h2>Add New Ticket</h2>
      
      <label htmlFor="ticket-title">New Board Title</label>
      <input type="text" id="ticket-title" name="ticketTitle"  onChange={handleChange}/>

      <label htmlFor="ticket-description">New Board Title</label>
      <input type="text" id="ticket-description" name="ticketDescription" onChange={handleChange}/>
      
      <label htmlFor="ticket-priority">New Board Title</label>
      <input type="text" id="ticket-priority" name="ticketPriority" onChange={handleChange}/>
      
      <button type="submit" onClick={(event) => {
        event.preventDefault();
        onSubmit(ticketDetails);

        setTicketDetails({
          ticketTitle: '',
          ticketDescription: '',
          ticketPriority: ''
        });
      }}>Add Board</button>

      <button onClick={(event) => {
        event.preventDefault()
        onClose()
      }}>close</button>
    </form>
    
  );
}

export default AddTicketModal;