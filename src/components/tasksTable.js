import React, { useContext, useState } from "react";
import { TaskContext } from "../contexts/UseTasksContext";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/UseCurrentUserContext";
import { useGetTasks, removeTask } from "../services/useAsyncTask";
import ErrorBLock from "./shared/errorBlock";
import {
  useGetDevelopers,
  addDeveloper,
  removeDeveloper
} from "../services/useAsyncDevelopers";
import { removeAllAspect } from "../services/useAsyncAspects";

const anyDeveloper = developers => {
  return developers && developers.docs.length >= 1;
};

const DevBadge = ({ developer, showAllPoints, taskID, isLead }) => {
  let colorStatus = "is-error";

  switch (developer.status) {
    case "allocating":
      colorStatus = "is-warning";
      break;
    case "ready":
      colorStatus = "is-success";
      break;
    default:
      colorStatus = "is-error";
  }

  const revealPoints = () => {
    if (showAllPoints) {
      return ` ${developer.points ? developer.points : "0"}`;
    }
  };

  return (
    <>
      {isLead ? (
        <Link
          to={`/task/${taskID}/developer/${developer.name}/checked_aspects`}
        >
          <a href="#!" class="nes-badge --center-middle --fill-parent">
            <span className={colorStatus}>
              {developer.name}
              {revealPoints()}
            </span>
          </a>
        </Link>
      ) : (
        <a href="#!" class="nes-badge --center-middle --fill-parent">
          <span className={colorStatus}>
            {developer.name}
            {revealPoints()}
          </span>
        </a>
      )}
      {/* <Link to={`/task/${taskID}/developer/${developer.name}/checked_aspects`}>
        <a href="1#" class="nes-badge --center-middle --fill-parent">
          <span className={colorStatus}>
            {developer.name}
            {revealPoints()}
          </span>
        </a>
      </Link> */}
    </>
  );
};

const TaskBlock = ({ task, index }) => {
  const { currentUserState } = useContext(CurrentUserContext);

  const [developers, loading] = useGetDevelopers(task.id);

  const [showAllPoints, setShowAllPoints] = useState(false);

  const showPoints = () => {
    setShowAllPoints(!showAllPoints);
  };

  const handleDeleteTask = () => {
    removeTask(task.id);
  };

  const handleAddDeveloper = () => {
    addDeveloper({
      TaskID: task.id,
      newDeveloper: { ...currentUserState, aspects: [] }
    });
  };

  return (
    <div className="">
      <div className="nes-container is-dark">
        {/*<pre>{JSON.stringify(task.developers, null, 2)}</pre>*/}
        <p>{task.description}</p>
        {loading && <span>Loading Devs...</span>}
        <div className="container">
          <div className="row">
            {developers &&
              developers.docs.map(developer => (
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <div className="relative-position-box">
                    <DevBadge
                      key={developer.id}
                      developer={developer.data()}
                      showAllPoints={showAllPoints}
                      taskID={task.id}
                      isLead={currentUserState.lead}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="actions container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div className="action-box">
                <Link
                  onClick={handleAddDeveloper}
                  to={`/task/${task.id}/developer/${currentUserState.name}`}
                >
                  <a className="nes-btn filled" href="!#">
                    Allocate
                  </a>
                </Link>
              </div>
            </div>

            {anyDeveloper(developers) && currentUserState.lead && (
              <div className="col-sm-12 col-md-6 col-lg-4">
                <div className="action-box ">
                  <button
                    onClick={showPoints}
                    type="button"
                    className="nes-btn is-primary filled"
                  >
                    {!showAllPoints ? "Show" : "Hide"}
                  </button>
                </div>
              </div>
            )}

            <div className="col-sm-12 col-md-6 col-lg-4">
              <div className="action-box ">
                <button
                  onClick={handleDeleteTask}
                  type="button"
                  className="nes-btn is-error filled"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

const TasksTable = () => {
  const [taskList, loading, errors] = useGetTasks();

  return (
    <>
      <ErrorBLock error={errors} />
      {loading && <h3>Loading Task...</h3>}
      <br />
      {taskList &&
        taskList.docs.map(task => (
          <TaskBlock key={task.id} task={{ ...task.data(), id: task.id }} />
        ))}
    </>
  );
};

export default TasksTable;
