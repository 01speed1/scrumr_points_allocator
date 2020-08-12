import { database } from "../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

const TasksCollection = database.collection("Tasks");

const AspectsCollecition = ({ TaskID, DeveloperID }) => {
  return TasksCollection.doc(TaskID)
    .collection("Developers")
    .doc(DeveloperID)
    .collection("Aspects");
};

// [value, loading, error]

const queryOption = {
  snapshotListenOptions: { includeMetadataChanges: true }
};

const useCheckedAspects = ({ IDs: { TaskID, DeveloperID } }) => {
  return useDocument(
    TasksCollection.doc(TaskID)
      .collection("Developers")
      .doc(DeveloperID)
  );
};

const useGetAspects = ({ IDs }) => {
  return useCollection(AspectsCollecition(IDs), queryOption);
};

const addAspect = ({ IDs: { TaskID, DeveloperID } }, newAspect) => {
  return AspectsCollecition({ TaskID, DeveloperID }).add(newAspect);
};

const removeAspect = ({ IDs: { TaskID, DeveloperID } }, AspectID) => {
  AspectsCollecition({ TaskID, DeveloperID })
    .doc(AspectID)
    .delete()
    .then(aspect => console.log("a aspect was deleted"));
};

const removeAllAspect = ({ IDs: { TaskID, DeveloperID } }) => {
  AspectsCollecition({ TaskID, DeveloperID }).onSnapshot(aspects => {
    return aspects.docs.map(aspect => {
      return removeAspect(
        {
          IDs: { TaskID, DeveloperID }
        },
        aspect.id
      );
    });
  });
};

export {
  useGetAspects,
  addAspect,
  removeAspect,
  removeAllAspect,
  useCheckedAspects
};
