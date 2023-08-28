
import { useEffect, useState, useRef } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import TeamBoard from '../components/TeamBoard'
import AddTeamModal from '../components/AddTeamModal';
import DropdownItem from '../components/DropdownItem';
import JoinTeamModal from '../components/JoinTeamModal';
import { useBoardsContext } from '../hooks/useBoardsContext';



const Dashboard = () => {
  // current state of boards
  const { user, dispatch } = useAuthContext();
  const { dispatch: bDispatch } = useBoardsContext();
  const teamDropdownRef = useRef();
  const changeTeamButton = useRef();
  const viewIDButton = useRef();
  const idDropdownRef = useRef();
  // use states
  const [isTeamModalOpen, changeTeamModalState] = useState(false);
  const [currentTeamDetails, changeTeamDetails] = useState(null);
  const [allTeams, setAllTeams] = useState(null);
  const [isTeamDropdownOpen, setDropdownOpen] = useState(false);
  const [isJoinTeamModalOpen, setJoinTeamModal] = useState(false);
  const [joinTeamError, setJoinTeamError] = useState(null);
  const [isIdOpen, setIdOpen ] = useState(null);

  useEffect(() => {
    // Check if user exists before making the API call
    if (user) {

      const handleClickOutside = (event) => {
        // if user clicks outside of form close modal
        if (teamDropdownRef.current && !teamDropdownRef.current.contains(event.target) && !changeTeamButton.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      const handleClickOutsideID = (event) => {
        // if user clicks outside of form close modal
        if (idDropdownRef.current && !idDropdownRef.current.contains(event.target) && !viewIDButton.current.contains(event.target)) {
          setIdOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutsideID);

      const getTeamFromDB = async () => {
        if (!JSON.parse(localStorage.getItem('teamID'))) {
          console.log('no Team ID');
          const response = await fetch('/api/team/' + user.team_ids[0]);
          const team = await response.json();

          if (!team) {
            console.log('Could not get team');
          } else {
            changeTeamDetails(team);
            await localStorage.setItem('teamID', JSON.stringify(team._id))
          }

        } else {
          const currentID = JSON.parse(localStorage.getItem('teamID'));
          const response = await fetch('/api/team/' + currentID);
          const team = await response.json();

          if (!team) {
            console.log('Could not get team');
          } else {
            changeTeamDetails(team);
            await localStorage.setItem('teamID', JSON.stringify(team._id))
          }
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
      }
      getTeamFromDB();
      getAllTeamsFromDB();
      console.log(allTeams);
    }
  }, [user]);

  const handleTeamModalOpen = () => {
    changeTeamModalState(true);
  }

  const handleTeamModalClose = () => {
    changeTeamModalState(false);
  }

  const handleJoinTeamModalOpen = () => {
    setJoinTeamModal(true);
  }
  const handleJoinTeamModalClose = () => {
    setJoinTeamModal(false);
  }

  const handleJoinTeam = async (joinTeamID) => {
    console.log(joinTeamID);
    console.log(user.team_ids);
    if (user.team_ids.includes(joinTeamID)) {
      // The joinTeamID is in the user.team_ids array
      // Perform the action you want for joining the team
      setJoinTeamError('You are already in that team');
    } else {
      // add team to user on database
      const response = await fetch('/api/users/' + user.uID + '/' + joinTeamID,
        {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          }
        })
      const updatedUser = await response.json();
      const updatedTeamIDS = await updatedUser.team_ids;
      console.log(updatedTeamIDS);

      if (!response.ok) {
        console.log('failed');
        setJoinTeamError('Team Does Not Exist')

      } else {// if sucessful
        // add new team to user.team_ids
        // add new tean to DOM
        dispatch({
          type: 'ADD-TEAM',
          payload: joinTeamID
        })

        const response = await fetch('/api/team/' + joinTeamID);
        const teamJoined = await response.json();

        if (!teamJoined) {
          console.log('Could not get team');
        } else {
          setAllTeams([...allTeams, teamJoined])
          console.log(allTeams);
        }

        // Update the user data in local storage
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        const updatedLocalStorageData = {
          ...storedUserData,
          team_ids: [...user.team_ids, joinTeamID]
        }
        await localStorage.setItem('user', JSON.stringify(updatedLocalStorageData));

        setJoinTeamModal(false);
        setJoinTeamError(null);
      }
    }
  }

  const handleAddTeam = async (teamTitle) => {
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

    dispatch({
      type: 'ADD-TEAM',
      payload: teamAdded._id
    })

    setAllTeams([...allTeams, teamAdded])
    console.log(allTeams);
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

  const changeTeam = async (teamToChangeTo) => {
    changeTeamDetails(teamToChangeTo);
    bDispatch({
      type: 'SET_BOARDS',
      payload: teamToChangeTo.boards
    });
    await localStorage.setItem('teamID', JSON.stringify(teamToChangeTo._id))
  }

  return (
    <>
      {user && currentTeamDetails && <div className='team-info-bar'>
        <div className='team-info-bar-left'>
          <h3 className='team-dropdown' ref={changeTeamButton} onClick={() => { setDropdownOpen(!isTeamDropdownOpen) }}>Change Team ^</h3>

          {isTeamDropdownOpen && allTeams && <ul ref={teamDropdownRef} className='team-dropdown-list'>
            {allTeams.map((team) => {
              return (<DropdownItem key={team._id} object={team} changeTeam={changeTeam} />)
            })}
          </ul>}

          <button onClick={handleTeamModalOpen} className='create-team-button dropdown-team-button'>CREATE TEAM</button>
          <button onClick={handleJoinTeamModalOpen} className='join-team-button dropdown-team-button'>JOIN TEAM</button>
        </div>
        <div className='team-info-bar-right'>

          
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

      {isJoinTeamModalOpen && <JoinTeamModal onClose={handleJoinTeamModalClose}
        onSubmit={handleJoinTeam} joinTeamError={joinTeamError} />}
    </>
  );
}

export default Dashboard;