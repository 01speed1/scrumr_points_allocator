import React, { useState, useEffect, useContext } from "react";
import TasksTable from "./tasksTable";
import { addTask } from "../services/useAsyncTask";
import { CurrentUserContext } from "../contexts/UseCurrentUserContext";

import { Link } from "react-router-dom";

import { removeUser } from "../services/useAsyncUsers";

const PointsAllocatorBuilder = () => {
  const { currentUserState } = useContext(CurrentUserContext);

  !currentUserState && window.location.assign("/");

  const [description, setDescription] = useState("");

  const [validTask, setValidTask] = useState(false);

  const handleRemoveUser = () => {
    removeUser(currentUserState.name);
  };

  useEffect(() => {
    return () => {
      setValidTask(description.length > 2);
    };
  }, [description.length]);

  const handleOnClick = () => {
    addTask({
      description,
      points: 0
    });
    setDescription("");
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(tasksState, null, 2)} </pre> */}
      <div className="row responsive-padding --sticky-top">
        <div className="col-sm-1 col-sm-offset-11">
          <Link to="/">
            <button onClick={handleRemoveUser} className="nes-btn is-error">
              X
            </button>
          </Link>
        </div>
      </div>

      <div className="nes-container with-title is-dark">
        <p className="title">Add a new Task</p>
        <label htmlFor="textarea_field">Task description:</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          id="textarea_field"
          className="nes-textarea is-dark"
        />
        <div className="action-box">
          {
            <button
              onClick={handleOnClick}
              disabled={!validTask}
              type="button"
              className={`nes-btn ${validTask ? "is-success" : "is-disabled"}`}
            >
              {` ${validTask ? "Add the task now!" : "task please"}`}
            </button>
          }
        </div>
      </div>

      <TasksTable />
    </div>
  );
};

export default PointsAllocatorBuilder;
