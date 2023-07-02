import React from 'react'

const TicketDetails = ({ticketDetails, onClose}) => {
  console.log(onClose);
  return (
  <>
  
  <div className="modal">
    <h3>{ticketDetails.ticketTitle}</h3>
    
    <button onClick={onClose}>close</button>
  </div>
  </>
  );
  
}

export default TicketDetails

