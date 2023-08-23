import { set } from "date-fns";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from "react";
const DropdownItem = ({ object, changeTeam }) => {
  const { user } = useAuthContext();
  const [isOwner, setIsOwner] = useState(false);



  useEffect(() => {
    // Log user value once it's available
    if (user) {
      const loggedInUserID = user.uID;
      const teamsOwnersID = object.teamOwner;
      console.log('user', user.uID);
      console.log('teamOwner', object.teamOwner);

      if (loggedInUserID === teamsOwnersID) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [user, object.teamOwner]);

  const handleDeleteTeam = async () => {
    //const response = a
  }

  const handleLeaveTeam = async () => {

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