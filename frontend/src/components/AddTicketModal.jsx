import { useState, useEffect, useRef } from "react";


const AddTicketModal = ({onSubmit, onClose, boardDetails, emptyFeilds}) => {
  const ticketModalRef = useRef();

  const [DescriptionError, setDError] = useState(null);
  const [TitleError, setTError] = useState(null);

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
      <input style={{
        backgroundColor: emptyFeilds.includes('Title') ? '#ff000071' : '',
        border: emptyFeilds.includes('Title') ? 'solid #e7195a 2px' : ''
      }} className='ticket-details-title' type="text" id="ticket-title" name="ticketTitle" value={ticketDetails.ticketTitle}  onChange={handleChange}/>

      <label htmlFor="ticket-description">New Ticket Description</label>
      <textarea style={{
        backgroundColor: emptyFeilds.includes('Description') ? '#ff000071' : '',
        border: emptyFeilds.includes('Description') ? 'solid #e7195a 2px' : ''
      }} type='text' className='ticket-details-description' id="ticket-description" name="ticketDescription" value={ticketDetails.ticketDescription} onChange={handleChange} ></textarea>
      
      {emptyFeilds.length > 0 && <div className="error">Please Fill Out These Feilds: {emptyFeilds.map(feildMissing => feildMissing + ' ')}</div>}

      <button className="login-input login-button" type="submit" onClick={(event) => {
        event.preventDefault();
        onSubmit(ticketDetails, boardDetails._id);
        
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