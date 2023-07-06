import { useState, useEffect, useRef } from "react";


const AddTicketModal = ({onSubmit, onClose, boardDetails}) => {
  const ticketModalRef = useRef();

  useEffect(() => {

    const handleClickOutside = (event) => {
      // if user clicks outside of form close modal
      if(ticketModalRef.current && !ticketModalRef.current.contains(event.target)){
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    } 
  }, [onClose]);

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
  }


  return(
    <>
      <div className='overlay-style'></div>
      <form className="add-board-modal modal" ref={ticketModalRef}>
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
    </>
  );
}

export default AddTicketModal;