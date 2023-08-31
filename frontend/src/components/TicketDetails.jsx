import React, { useRef, useEffect, useState } from 'react'
import { useBoardsContext } from '../hooks/useBoardsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TicketDetails = ({ ticketDetails, onClose, boardID, teamDetails }) => {
  const { dispatch } = useBoardsContext()

  const modalRef = useRef();
  const titleRef = useRef();
  const priRef = useRef();
  const descRef = useRef();

  // use to manage states of ticket value inputs
  const [currentTitle, setCurrentTitle] = useState(ticketDetails.ticketTitle);
  const [currentDesc, setCurrentDesc] = useState(ticketDetails.ticketDescription);
  const [currentPri, setCurrentPri] = useState(ticketDetails.ticketPriority);

  const [isTitleChanging, setTitleChanging] = useState(false);
  const [isDescChanging, setDescChanging] = useState(false);
  const [ispriChanging, setPriChanging] = useState(false);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        //clicked outside div
        // so close modal
        onClose();
      }
      if (titleRef.current && !titleRef.current.contains(event.target)) {

        setCurrentTitle(ticketDetails.ticketTitle);
        setTitleChanging(false);

      }
      if (descRef.current && !descRef.current.contains(event.target)) {

        setCurrentDesc(ticketDetails.ticketDescription);
        setDescChanging(false);

      }
      if (priRef.current && !priRef.current.contains(event.target)) {

        setCurrentPri(ticketDetails.ticketPriority);
        setPriChanging(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, ticketDetails.ticketDescription, ticketDetails.ticketPriority, ticketDetails.ticketTitle]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'currentTitle') {
      setCurrentTitle(value);
      setTitleChanging(true);

    } else if (name === 'currentDesc') {
      setCurrentDesc(value);
      setDescChanging(true);

    } else if (name === 'currentPri') {
      setCurrentPri(value)
      setPriChanging(true);
    }
  }

  // functions to update database
  const handleUpdateTicketTitle = async () => {
    setCurrentTitle(currentTitle)

    const updateObject = {
      ticketTitle: currentTitle
    }

    const response = await fetch('/api/team/' + teamDetails._id + '/' + boardID + '/' + ticketDetails._id, {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateObject)
    });

    const json = await response.json()
    if (response.ok) {
      dispatch({
        type: 'UPDATE_TICKET_TITLE',
        payload: {
          updateObject,
          ticketID: ticketDetails._id,
          boardID
        }
      })
    } else {
      console.log(json.error);
    }
  }

  const handleUpdateTicketPriority = async () => {
    setCurrentPri(currentPri)

    const updateObject = {
      ticketPriority: currentPri
    }

    const response = await fetch('/api/team/' + teamDetails._id + '/' + boardID + '/' + ticketDetails._id, {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateObject)
    });

    const json = await response.json()
    if (response.ok) {
      dispatch({
        type: 'UPDATE_TICKET_PRI',
        payload: {
          updateObject,
          ticketID: ticketDetails._id,
          boardID
        }
      })
    } else {
      console.log(json.error);
    }
  }

  const handleUpdateTicketDescription = async () => {
    setCurrentDesc(currentDesc);

    const updateObject = {
      ticketDescription: currentDesc
    }

    const response = await fetch('/api/team/' + teamDetails._id + '/' + boardID + '/' + ticketDetails._id, {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateObject)
    });

    const json = await response.json()
    if (response.ok) {
      dispatch({
        type: 'UPDATE_TICKET_DESC',
        payload: {
          updateObject,
          ticketID: ticketDetails._id,
          boardID
        }
      })
    } else {
      console.log(json.error);
    }
  }

  return (
    <>
      <div className='overlay-style'></div>
      <div className="modal" ref={modalRef}>
        <label>Title:</label>
        <div className='align-right' ref={titleRef}>
          <input className='ticket-details-title' name="currentTitle" value={currentTitle} onChange={handleChange} />
          {isTitleChanging && <button className='save-btn' onClick={handleUpdateTicketTitle}>Save New Title</button>}
        </div>

        <label>Description:</label>
        <div className='align-right' ref={descRef}>
          <textarea  type='text' className='ticket-details-description' name="currentDesc" value={currentDesc} onChange={handleChange}></textarea>
          {isDescChanging && <button className='save-btn' onClick={handleUpdateTicketDescription}>Save New Description</button>}
        </div>

        <p className='ticket-added-p'>Ticket Added</p>
        <p className='ticket-edited'>{formatDistanceToNow(new Date(ticketDetails.createdAt), { addSuffix: true })}</p>
        <button className="login-input login-button" onClick={onClose}>Close</button>
      </div>
    </>
  );

}

export default TicketDetails;

