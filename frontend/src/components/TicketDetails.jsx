import React, { useRef, useEffect, useState }  from 'react'


const TicketDetails = ({ticketDetails, onClose}) => {
  const modalRef = useRef();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        //clicked outside div
        // so close modal
        onClose();
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef.current]);

  return (
  <>
  <div className='overlay-style'></div>
  <div className="modal" ref={modalRef}>
    <label>Title:</label>
    <input value ={ticketDetails.ticketTitle}/>

    <label>Description:</label>
    <input value ={ticketDetails.ticketDescription}/>

    <label>Priority:</label>
    <input value ={ticketDetails.ticketPriority}/>
    
    <button onClick={onClose}>close</button>
  </div>
  </>
  );
  
}

export default TicketDetails;

