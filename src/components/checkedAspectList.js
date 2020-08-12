import React from "react";
import AspectButton from "./aspectButton";
import { useCheckedAspects } from "../services/useAsyncAspects";
import { Link } from "react-router-dom";

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
      disabledClick
    />
  ));

export default function CheckedAspectList({ location: { pathname } }) {
  const [, , TaskID, , DeveloperID] = pathname.split("/");

  const IDs = { TaskID, DeveloperID };

  const [aspects, ,] = useCheckedAspects({ IDs });
  const checkedAspects = aspects?.data()?.aspects;

  const sumAspectsPoints = () => {
    return aspects?.data().aspects.reduce((memory, aspect) => {
      return aspect.points + memory;
    }, 3);
  };

  const calculateHighFibonacci = () => {
    return [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
      .filter(number => number >= sumAspectsPoints())
      .shift();
  };

  return (
    <>
      <div className="actions container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="action-box">
              <a href="#!" className="nes-btn filled">
                points {calculateHighFibonacci()}
              </a>
              <Link to="/task/new">
                <a className="nes-btn filled" href="!#">
                  Return
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="aspects container">
        {checkedAspects &&
          checkedAspects.map(({ aspect, points }, index) => (
            <div key={`ind-${index}`}>
              <div className="">
                <button className={`nes-btn is-warning --fill-parent`}>
                  {aspect}
                  <br />
                  <span className="nes-text is-primary">{points}</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
