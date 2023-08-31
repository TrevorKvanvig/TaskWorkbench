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
      <h2 className="new-ticket-title">Add New Ticket to "{boardDetails.boardTitle}"</h2>
      
      <label htmlFor="ticket-title">New Ticket Title</label>
      <input className='ticket-details-title' type="text" id="ticket-title" name="ticketTitle" value={ticketDetails.ticketTitle}  onChange={handleChange}/>

      <label htmlFor="ticket-description">New Ticket Description</label>
      <textarea type='text' className='ticket-details-description' id="ticket-description" name="ticketDescription" value={ticketDetails.ticketDescription} onChange={handleChange} ></textarea>
      
      <button className="login-input login-button" type="submit" onClick={(event) => {
        event.preventDefault();
        onSubmit(ticketDetails, boardDetails._id);
        onClose();
        setTicketDetails({
          ticketTitle: '',
          ticketDescription: '',
          ticketPriority: ''
        });
      }}>Add Ticket</button>

      <button className="login-input login-button close" onClick={(event) => {
        event.preventDefault()
        onClose()
      }}>Close</button>
    </form>
    </>
  );
}

export default AddTicketModal;