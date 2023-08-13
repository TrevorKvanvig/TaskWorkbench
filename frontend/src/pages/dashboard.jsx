
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import TeamBoard from '../components/TeamBoard'
import AddTeamModal from '../components/AddTeamModal';



const Dashboard = () => {
  // current state of boards
  const { user } = useAuthContext();

  // use states
  const [isTeamModalOpen, changeTeamModalState] = useState(false);
  const [currentTeamindex, changeTeamIndex] = useState(0);
  const [currentTeamDetails, changeTeamDetails] = useState(null);

  useEffect(() => {
    // Check if user exists before making the API call
    if (user) {
      const getTeamFromDB = async () => {
        const response = await fetch('/api/team/' + user.team_ids[currentTeamindex]);
        const team = await response.json();
        console.log(team);

        if (!team) {
          console.log('Could not get team');
        } else {
  
          changeTeamDetails(team);
        }
      }
  
      getTeamFromDB();
    }
  }, [user, currentTeamindex]);

  const handleTeamModalOpen = () => {
    changeTeamModalState(true);
  }

  const handleTeamModalClose = () => {
    changeTeamModalState(false);
  }

  const handleAddTeam = async (teamTitle) => {
    console.log(teamTitle);
    // close board modal
    changeTeamModalState(false);

    const newTeam = {
      teamTitle: teamTitle
    }


    const response = await fetch('api/users/' + user.uID, {
      method: 'POST',
      body: JSON.stringify(newTeam),
      headers: {
        "Content-Type": 'application/json'
      }
    });

    // get board added back from database
    const teamAdded = await response.json()

    // if board sucessfuly added to database
    if (!response.ok) {
      console.log("error getting add team resopnse");
    } else {
      // Update the user data in local storage
      const storedUserData = JSON.parse(localStorage.getItem('user'));
      const updatedLocalStorageData = {
        ...storedUserData,
        team_ids: [...user.team_ids, teamAdded._id]
      }
      await localStorage.setItem('user', JSON.stringify(updatedLocalStorageData));
    }

  }



  return (
    <>
      {user && }

      {(user && user.team_ids.length > 0) && <TeamBoard teamDetails={currentTeamDetails} />}

      {(user && user.team_ids.length === 0) &&
        <div className='no-teams-div'>
          <h1 className='no-teams-mssg'>You Have No Team Please Create One</h1>
        </div>
      }

      {isTeamModalOpen && <AddTeamModal
        onClose={handleTeamModalClose}
        onSubmit={handleAddTeam}
      />}


    </>

  );
}

export default Dashboard;