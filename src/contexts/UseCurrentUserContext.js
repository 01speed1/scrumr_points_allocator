import React, { useReducer } from "react";

function emptyDeveloperBuilder(
  { name, status, lead } = {
    lead: false,
    name: "",
    status: "waiting"
  }
) {
  return { name, status, lead };
}

let currentUserReducer = (currentUserState, { action, payload }) => {
  switch (action) {
    case "UPDATE_CURRENT_USER":
      return updateCurrentUser(currentUserState, payload);

    default:
      return currentUserState;
  }
};

// Task Actions
const updateCurrentUser = (currentUserState, updatedUser) => {
  return { ...currentUserState, ...updatedUser };
};

const CurrentUserContext = React.createContext();

const CurrentUserProvider = ({ children }) => {
  const [currentUserState, currentUserDispatch] = useReducer(
    currentUserReducer,
    null
  );

  return (
    <CurrentUserContext.Provider
      value={{ currentUserState, currentUserDispatch }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider, emptyDeveloperBuilder };
