import { useState } from "react";

const AddBoardModal = ({onSubmit, onClose}) => {
  const [boardTitle, setBoardTitle] = useState('');

  const handleChange = (event) => {
    const {value} = event.target;
  
    setBoardTitle(value);

  }
  console.log(boardTitle);
  return (
  <form className="add-board-modal">
    <h2>ADD BOARD</h2>
    
    <label htmlFor="board-title">New Board Title</label>
    <input type="text" id="board-title" name="boardTitle" value={boardTitle} onChange={handleChange}/>
    
    <button type="submit" onClick={(event) => {
      event.preventDefault();
      onSubmit(boardTitle);
      setBoardTitle('');
    }}>Add Board</button>

    <button onClick={onClose}>close</button>
  </form>
  );
}

export default AddBoardModal;