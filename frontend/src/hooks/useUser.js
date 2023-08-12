import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useUser = () => {
  const { user } = useAuthContext();
  const [hasTeams, changeHasTeams] = useState(false);

  if(user && user.team_ids) {
    if(!user.team_ids.length) {
      console.log("user has no Teams");
      changeHasTeams(false);
    }else {
      console.log('User Has Teams');
    }
  }

  return {user, hasTeams}
}