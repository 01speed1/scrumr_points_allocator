import React, { useContext, useState } from "react";
import AspectButton from "../components/aspectButton";
import aspects from "../data/aspects";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/UseCurrentUserContext";
import { useGetATask } from "../services/useAsyncTask";
import {
  useGetADeveloper,
  updateDeveloper
} from "../services/useAsyncDevelopers";

// Children Components
const buildApectButtonsGroup = ({
  TaskID,
  DeveloperID,
  aspectGroupKey,
  aspectsGroup
}) =>
  aspectsGroup.map((aspectData, index) => (
    <AspectButton
      key={`aspect-${aspectGroupKey}-${index}`}
      aspectData={aspectData}
      DeveloperID={DeveloperID}
      TaskID={TaskID}
    />
  ));

// Main Component
const PointsAllocator = ({ location: { pathname } }) => {
  const [, , TaskID, , DeveloperID] = pathname.split("/");

  const [task, ,] = useGetATask(TaskID);
  const [developer, ,] = useGetADeveloper({
    TaskID,
    DeveloperID
  });

  // const IDs = { TaskID, DeveloperID };

  const { currentUserState } = useContext(CurrentUserContext);

  if (!currentUserState) {
    window.location.assign("/");
  }

  const [currenDeveloper, setCurrentDeveloper] = useState(currentUserState);

  const sumAspectsPoints = () => {
    return (
      developer &&
      developer.data().aspects.reduce((accumulator, currentAspect) => {
        return accumulator + currentAspect.points;
      }, 3)
    );
  };

  const calculateHighFibonacci = () => {
    return [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
      .filter(number => number >= sumAspectsPoints())
      .shift();
  };

  const handleStartPointsAllocation = () => {
    const update = { ...currenDeveloper, status: "allocating" };
    setCurrentDeveloper(update);

    updateDeveloper({ TaskID, updatedDeveloper: update });
  };

  const developerIsWaiting = () => currenDeveloper.status === "waiting";
  const developerIsAllocating = () => currenDeveloper.status === "allocating";
  const developerIsReady = () => currenDeveloper.status === "ready";

  const handleReadyUser = () => {
    const update = {
      ...currenDeveloper,
      status: "ready",
      points: calculateHighFibonacci()
    };
    setCurrentDeveloper(update);

    updateDeveloper({ TaskID, updatedDeveloper: update });
  };

  const aspectGroupKeys = Object.keys(aspects);

  return (
    <>
      <div className="actions container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="action-box">
              <Link to="/task/new">
                <a className="nes-btn filled" href="!#">
                  Return
                </a>
              </Link>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="action-box">
              {developerIsAllocating() && (
                <Link to="/task/new" onClick={handleReadyUser}>
                  <button
                    type="button"
                    className="nes-btn is-success filled --sticky-top"
                  >
                    I´m Ready!
                  </button>
                </Link>
              )}
              {developerIsWaiting() && (
                <button
                  className="nes-btn is-primary filled"
                  onClick={handleStartPointsAllocation}
                >
                  Start
                </button>
              )}
              {developerIsReady() && (
                <button
                  className="nes-btn is-primary filled"
                  onClick={handleStartPointsAllocation}
                >
                  Reallocate
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="aspects container">
        {developerIsAllocating() &&
          aspectGroupKeys.map(groupKey => (
            <div key={groupKey}>
              <span className="nes-text is-primary">{groupKey}</span>
              <div className="">
                {buildApectButtonsGroup({
                  TaskID,
                  DeveloperID,
                  aspectGroupKey: groupKey,
                  aspectsGroup: aspects[groupKey]
                })}
              </div>
            </div>
          ))}
      </div>

      <div className="information container --sticky-bottom is-dark">
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-7 hidden-sm hidden-md">
            <div className=" nes-container with-title is-dark">
              <p className="title">Task</p>
              <p className="description">{task && task.data()?.description}</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-2">
            <div className="nes-container with-title is-dark">
              <p className="title">Pts</p>
              <p className="vhidden-md hidden-lg description">
                {task && task.data()?.description}
              </p>
              <p>{calculateHighFibonacci()}</p>
            </div>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-3">
            <div className="nes-container with-title is-dark hidden-sm hidden-md">
              <p className="title">Dev</p>
              <p>{currenDeveloper.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointsAllocator;
