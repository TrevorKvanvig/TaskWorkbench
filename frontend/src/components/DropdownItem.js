import { set } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
const DropdownItem = ({ object, changeTeam }) => {
  const { user, dispatch } = useAuthContext();
  const [isOwner, setIsOwner] = useState(false);



  useEffect(() => {
    // Log user value once it's available
    if (user) {
      const loggedInUserID = user.uID;
      const teamsOwnersID = object.teamOwner;

      if (loggedInUserID === teamsOwnersID) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [user, object.teamOwner]);

  const handleDeleteTeam = async () => {
    const response = await fetch('/api/team/' + object._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const teamDeleted = await response.json();

    //update Dom
    dispatch({
      type: 'UPDATE-TEAMS',
      payload: teamDeleted
    })
    //update localStorage
    const updatedLocalStorageData = {
      ...user,
      team_ids: user.team_ids.filter((id) => id !== teamDeleted.teamID)
    }
    await localStorage.setItem('user', JSON.stringify(updatedLocalStorageData));
  }

  const handleLeaveTeam = async () => {
    //Leave team in DB
    const response = await fetch('/api/users/' + user.uID + '/' + object._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    
    const teamLeft = await response.json();

    //Update Dom  
    if (response.ok) {
      dispatch({
        type: 'UPDATE-TEAMS',
        payload: teamLeft
      })
      //Update local storage
      const updatedLocalStorageData = {
        ...user,
        team_ids: user.team_ids.filter((id) => id !== teamLeft.teamID)
      }
      await localStorage.setItem('user', JSON.stringify(updatedLocalStorageData));

    } else{
      console.log('unable to Leave team');
    }
  }

  return (
    <div className='team-dropdown-item'>
      <li className="change-team-button" onClick={() => { changeTeam(object); }}>
        <div className="dropdown-team-title">{object.teamTitle}</div>
      </li>
      {isOwner && <button className="dropdown-team-button" onClick={handleDeleteTeam}>Delete Team</button>}
      {!isOwner && <button className="dropdown-team-button" onClick={handleLeaveTeam}>Leave Team</button>}
    </div>
  );
}

export default DropdownItem;