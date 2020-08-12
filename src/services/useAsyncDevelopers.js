import { database } from "../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

const TasksCollection = database.collection("Tasks");

const DevelopersCollecition = TaskID => {
  return TasksCollection.doc(TaskID).collection("Developers");
};

// [value, loading, error]

const queryOption = {
  snapshotListenOptions: { includeMetadataChanges: true }
};

const useGetDevelopers = TaskID =>
  useCollection(DevelopersCollecition(TaskID), queryOption);

const useGetADeveloper = ({ TaskID, DeveloperID }) =>
  useDocument(DevelopersCollecition(TaskID).doc(DeveloperID), queryOption);

const addDeveloper = ({ TaskID, newDeveloper }) => {
  DevelopersCollecition(TaskID)
    .doc(newDeveloper.name)
    .set(newDeveloper);
};

const setDeveloper = ({ TaskID, setedDeveloper }) => {
  let DeveloperID = setedDeveloper.name;

  DevelopersCollecition(TaskID)
    .doc(DeveloperID)
    .set(setedDeveloper);
};

const updateDeveloper = ({ TaskID, updatedDeveloper }) => {
  let DeveloperID = updatedDeveloper.name;
  delete { ...updatedDeveloper }.name;

  DevelopersCollecition(TaskID)
    .doc(DeveloperID)
    .update(updatedDeveloper);
};

const removeDeveloper = (TaskID, DeveloperID) => {
  DevelopersCollecition(TaskID)
    .doc(DeveloperID)
    .delete()
    .then(() => {
      console.log("Developer removed");
    })
    .catch(() => {
      console.log("Developer not Found");
    });
};

export {
  useGetDevelopers,
  useGetADeveloper,
  addDeveloper,
  updateDeveloper,
  removeDeveloper,
  setDeveloper
};
