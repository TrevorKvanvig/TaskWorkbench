import lightFormat from 'date-fns/esm/fp/lightFormat/index.js';
import React, { useRef, useEffect, useState }  from 'react'
import { useBoardsContext } from '../hooks/useBoardsContext';


const TicketDetails = ({ticketDetails, onClose, boardID}) => {
  const {dispatch} = useBoardsContext()

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
        console.log("clicked outside title");
        setCurrentTitle(ticketDetails.ticketTitle);
        setTitleChanging(false);

      }
      if (descRef.current && !descRef.current.contains(event.target)) {
        console.log("clicked outside Desc");
        setCurrentDesc(ticketDetails.ticketDescription);
        setDescChanging(false);

      }
      if (priRef.current && !priRef.current.contains(event.target)) {
        console.log("clicked outside Pri");
        setCurrentPri(ticketDetails.ticketPriority);
        setPriChanging(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef.current, titleRef.current, priRef.current, descRef.current]);

  const handleChange = (event) => {
    const {name, value} = event.target;

    if(name === 'currentTitle'){
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
    console.log('Clicked');
    const updateObject = {
      ticketTitle: currentTitle
    }

    const response = await fetch('/api/boards/' + boardID + '/' +ticketDetails._id, {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateObject)
    });

    const json = await response.json()
    if(response.ok){
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
    console.log('Clicked');
    const updateObject = {
      ticketPriority: currentPri
    }

    const response = await fetch('/api/boards/' + boardID + '/' +ticketDetails._id, {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateObject)
    });
    
    const json = await response.json()
    if(response.ok){
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
    console.log('Clicked');
    const updateObject = {
      ticketDescription: currentDesc
    }

    const response = await fetch('/api/boards/' + boardID + '/' +ticketDetails._id, {
      method: 'PATCH',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateObject)
    });
    
    const json = await response.json()
    if(response.ok){
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
    <div ref={titleRef}>
      <input name="currentTitle" value ={currentTitle} onChange={handleChange}/>
      {isTitleChanging && <button onClick={handleUpdateTicketTitle}>Save New Title</button>}
    </div>

    <label>Description:</label>
    <div ref={descRef}>
      <input name="currentDesc" value={currentDesc} onChange={handleChange}/>
      {isDescChanging && <button onClick={handleUpdateTicketDescription}>Save New Description</button>}
    </div>

    <label>Priority:</label>
    <div ref={priRef}>
      <input name="currentPri" value={currentPri} onChange={handleChange}/>
      {ispriChanging && <button onClick={handleUpdateTicketPriority}>Save New Priority</button>}
    </div>
    
    <button onClick={onClose}>close</button>
  </div>
  </>
  );
  
}

export default TicketDetails;

