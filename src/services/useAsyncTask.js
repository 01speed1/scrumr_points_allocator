import { database } from "../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

const TasksCollection = database.collection("Tasks");

// [value, loading, error]

const queryOption = {
  snapshotListenOptions: { includeMetadataChanges: true }
};

const useGetTasks = () => useCollection(TasksCollection, queryOption);

const useGetATask = TaskID =>
  useDocument(TasksCollection.doc(TaskID), queryOption);

const addTask = newTask => {
  TasksCollection.add(newTask);
};

const updateTask = updatedTask => {
  let taskID = updatedTask.id;
  delete updatedTask.id;

  TasksCollection.doc(taskID).update(updatedTask);
};

const removeTask = taskID => TasksCollection.doc(taskID).delete();

export { useGetTasks, useGetATask, addTask, updateTask, removeTask };
