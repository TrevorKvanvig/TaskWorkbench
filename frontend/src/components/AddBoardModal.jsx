import { useState, useEffect, useRef } from "react";

const AddBoardModal = ({onSubmit, onClose}) => {
  const [boardTitle, setBoardTitle] = useState('');
  const boardModalRef = useRef()

  useEffect(() => {
    const handleModalClicks = (event) => {
      if(boardModalRef && !boardModalRef.current.contains(event.target)){
        console.log('clicked outside');
        onClose();
      }
    }

    document.addEventListener('mousedown', handleModalClicks)

    return () => {
      document.removeEventListener('mousedown', handleModalClicks);
    }
  }, [onClose])

  const handleChange = (event) => {
    const {value} = event.target;
  
    setBoardTitle(value);

  }
  
  return (
    <>
    <div className='overlay-style'></div>
    <form className="add-board-modal modal" ref={boardModalRef}>
      <h2 className="new-ticket-title">ADD BOARD</h2>
      
      <label htmlFor="board-title">New Board Title</label>
      <input maxLength={20} className='ticket-details-title' type="text" id="board-title" name="boardTitle" value={boardTitle} onChange={handleChange}/>
      
      <button className="login-input login-button" type="submit" onClick={(event) => {
        event.preventDefault();
        onSubmit(boardTitle);
        setBoardTitle('');
      }}>Add Board</button>

      <button className="login-input login-button close" onClick={onClose}>close</button>
  </form>  
    </>
  
  );
}

export default AddBoardModal;