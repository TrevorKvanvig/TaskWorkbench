import { useState, useEffect, useRef } from "react";

const AddTeamModal = ({ onSubmit, onClose }) => {
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
        <h2 className="new-ticket-title">ADD team</h2>

        <label htmlFor="team-title">New team Title</label>
        <input className='ticket-details-title' type="text" id="team-title" name="teamTitle" value={teamTitle} onChange={handleChange} />

        <button className="login-input login-button" type="submit" onClick={(event) => {
          event.preventDefault();
          onSubmit(teamTitle);
          setTeamTitle('');
        }}>Add Team</button>

        <button  className="login-input login-button close" onClick={onClose}>close</button>
      </form>
    </>

  );
}

export default AddTeamModal;