
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import TeamBoard from '../components/TeamBoard'
import AddTeamModal from '../components/AddTeamModal';
import DropdownItem from '../components/DropdownItem';



const Dashboard = () => {
  // current state of boards
  const { user } = useAuthContext();

  // use states
  const [isTeamModalOpen, changeTeamModalState] = useState(false);

  const [currentTeamDetails, changeTeamDetails] = useState(null);
  const [allTeams, setAllTeams] = useState(null);

  const [isTeamDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if user exists before making the API call
    if (user) {
      const getTeamFromDB = async () => {
        const response = await fetch('/api/team/' + user.team_ids[0]);
        const team = await response.json();
        console.log(team);

        if (!team) {
          console.log('Could not get team');
        } else {
  
          changeTeamDetails(team);
        }
      }

      const getAllTeamsFromDB = async () => {
        // Create an array of promises that fetch team data
        const fetchPromises = await user.team_ids.map(async teamID => {
          const response = await fetch('/api/team/' + teamID);
          const teamData = await response.json();
          return teamData;
        });
      
        // Wait for all fetch operations to complete
        const allTeamData = await Promise.all(fetchPromises);

    
        await setAllTeams(allTeamData)
      
        
        // Now you have all the team data in the allTeamData array
        console.log(allTeamData);
        // You can continue with your logic here...
      }
  
      getTeamFromDB();
      getAllTeamsFromDB();
    }
  }, [user]);

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

  const changeTeam = (teamToChangeTo) => {
    console.log(teamToChangeTo);
    changeTeamDetails(teamToChangeTo);
  }


  return (
    <>
      {user && <div className='team-info-bar'>
        <div className='team-info-bar-left'>
          <h3 className='team-dropdown' onClick={() => {setDropdownOpen(!isTeamDropdownOpen)}}>Change Team ^</h3>
          {isTeamDropdownOpen && allTeams && <ul className='team-dropdown-list'>
            {allTeams.map((team) => {
              return(<DropdownItem key={team._id} object={team} changeTeam={changeTeam}/>)
            })}
          </ul>}
          <button onClick={handleTeamModalOpen}>CREATE TEAM</button>
        </div>
        <div className='team-info-bar-right'>
          
          <h3 className='team-members-dropdown'>Members</h3>
        </div>
      </div>}

      {(user && user.team_ids.length > 0 && currentTeamDetails) && <TeamBoard key={currentTeamDetails._id} teamDetails={currentTeamDetails} />}

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