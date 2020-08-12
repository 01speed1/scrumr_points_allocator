import React, { useContext, useState, useEffect } from "react";
import {
  CurrentUserContext,
  emptyDeveloperBuilder
} from "../../contexts/UseCurrentUserContext";
import { Link } from "react-router-dom";
import { useGetUsers, addUser } from "../../services/useAsyncUsers";

//move to other site
const trasformeToArcadeName = name => name.substring(0, 3).toUpperCase();

export default function Portal() {
  const { currentUserDispatch } = useContext(CurrentUserContext);

  const [currentUser, setCurrentUser] = useState(emptyDeveloperBuilder());
  const [validateEnter, setValidateEnter] = useState(false);

  const handleOnChageName = e => {
    let name = trasformeToArcadeName(e.target.value);
    setCurrentUser({ ...currentUser, name });
  };

  const handleOnChageLead = e => {
    setCurrentUser({
      ...currentUser,
      lead: e.target.value === "true" ? true : false
    });
  };

  const handleOnSelectSavedName = e => {
    setCurrentUser({ ...currentUser, name: e.target.firstChild.data });
  };

  useEffect(() => {
    setValidateEnter(currentUser.name.length > 0);
    return () => {
      setValidateEnter(currentUser.name.length > 0);
    };
  }, [currentUser.name]);

  const handleSaveCurrentUser = () => {
    addUser({ ...currentUser });

    currentUserDispatch({
      action: "UPDATE_CURRENT_USER",
      payload: currentUser
    });
  };

  const [users, loading] = useGetUsers();

  return (
    <div className="m-portalContainer">
      <div className="nes-container with-title is-dark">
        <p className="title">Hi! Dev</p>
        <p>Scrumr: Scrum points allocator, a HT Dev Team Tool.</p>
      </div>
      <br />
      <div className="nes-container is-dark">
        <div className="nes-field">
          <label htmlFor="name_field">What´s your DevName</label>
          <input
            value={currentUser.name}
            type="text"
            id="name_field"
            className="nes-input is-dark"
            placeholder="AAA"
            onChange={handleOnChageName}
          />
          <br />
          <p>You are a leader?</p>
          <label>
            <input
              value={true}
              checked={currentUser.lead}
              onChange={handleOnChageLead}
              type="radio"
              className="nes-radio is-dark"
              name="lead"
            />
            <span>Yes</span>
          </label>

          <label>
            <input
              value={false}
              checked={!currentUser.lead}
              onChange={handleOnChageLead}
              type="radio"
              className="nes-radio is-dark"
              name="lead"
            />
            <span>No</span>
          </label>
        </div>
        {validateEnter && (
          <Link to="/task/new">
            <button
              onClick={handleSaveCurrentUser}
              type="button"
              className={"nes-btn is-success is-dark"}
            >
              Let´s Go!!
            </button>
          </Link>
        )}
      </div>
      <br />
      {users && users.docs.length > 0 && (
        <div className="nes-container with-title is-dark">
          <span className="title">Actual Users</span>
          <div className="container">
            <div className="row">
              {loading && <span>Loading users ...</span>}
              {users &&
                users.docs.map(user => (
                  <div className="col-sm-6 col-md-3 col-lg-2">
                    <span
                      onClick={handleOnSelectSavedName}
                      key={user.id}
                      className="nes-text --hand-pointer"
                    >
                      {trasformeToArcadeName(user.id)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <br />
      {/* <pre>{JSON.stringify(currentUser, null, 2)}</pre> */}
    </div>
  );
}
