import { useReducer, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    case 'UPDATE-TEAMS':
      console.log(action.payload);
      console.log(state);

      if (state.user && state.user.team_ids) {
        return {
          user: {
            ...state.user,
            team_ids: state.user.team_ids.filter((id) => id !== action.payload.teamID)
          }
        };
      } else {
        // If state.user or state.user.team_ids is undefined, return the current state
        return state;
      }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: user
      })
    }
  }, [])



  console.log('AuthContext state: ' + state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}