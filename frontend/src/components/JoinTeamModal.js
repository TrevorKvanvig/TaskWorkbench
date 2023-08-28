import { useState, useEffect, useRef } from "react";

const JoinTeamModal = ({ onSubmit, onClose, joinTeamError }) => {
  const [teamID, setTeamID] = useState('');
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

    setTeamID(value);

  }

  return (
    <>
      <div className='overlay-style'></div>
      <form className="add-team-modal modal" ref={teamModalRef}>
        <h2>ADD team</h2>

        <label htmlFor="team-ID">ID Of Team TO Join</label>
        <input type="text" id="team-title" name="teamTitle" value={teamID} onChange={handleChange} />

        <button type="submit" onClick={(event) => {
          event.preventDefault();
          onSubmit(teamID);
          setTeamID('');
        }}>JOIN Team</button>

        <button onClick={onClose}>close</button>
        {joinTeamError && <h3>{joinTeamError}</h3>}
      </form>
    </>

  );
}

export default JoinTeamModal;