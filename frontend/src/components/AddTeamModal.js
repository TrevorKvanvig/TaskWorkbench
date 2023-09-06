import { useState, useEffect, useRef } from "react";

const AddTeamModal = ({ onSubmit, onClose, emptyFeilds }) => {
  const [teamTitle, setTeamTitle] = useState('');
  const teamModalRef = useRef()

  useEffect(() => {
    const handleModalClicks = (event) => {
      if (teamModalRef && !teamModalRef.current.contains(event.target)) {
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
    const { value } = event.target;

    setTeamTitle(value);

  }

  return (
    <>
      <div className='overlay-style'></div>
      <form className="add-team-modal modal" ref={teamModalRef}>
        <h2 className="new-ticket-title">Create A Team</h2>

        <label htmlFor="team-title">New Team Title</label>
        <input style={{
        backgroundColor: emptyFeilds.includes('Title') ? '#ff000071' : '',
        border: emptyFeilds.includes('Title') ? 'solid #e7195a 2px' : ''
        }} className='ticket-details-title' type="text" id="team-title" name="teamTitle" value={teamTitle} onChange={handleChange} />

        {emptyFeilds.length > 0 && <div className="error">Please Enter A Title</div>}

        <button className="login-input login-button" type="submit" onClick={(event) => {
          event.preventDefault();
          onSubmit(teamTitle);
          setTeamTitle('');
        }}>Add Team</button>

        <button  className="login-input login-button close" onClick={onClose}>Close</button>
      </form>
    </>

  );
}

export default AddTeamModal;