import React, { useReducer } from "react";
import uuid from "uuid";

const emptyDeveloperBuilder = (
  { id, name, aspects, status } = {
    id: uuid(),
    name: "",
    aspects: [],
    status: "waiting"
  }
) => {
  return { id, name, aspects, status };
};

let TaskReducer = (tasksState, { action, payload }) => {
  let actionResult = [];

  switch (action) {
    case "GET_SYNC_TASK":
      actionResult = payload;
      break;

    case "ADD_EMPTY_TASK":
      actionResult = addEmptyTask(tasksState);
      break;

    case "ADD_NEW_TASK":
      actionResult = addNewTask(tasksState, payload);
      break;

    case "UPDATE_TASK":
      actionResult = updateTask(tasksState, payload);
      break;

    case "REMOVE_TASK":
      actionResult = removeTask(tasksState, payload);
      break;

    case "UPDATE_DEVELOPER":
      actionResult = updateDeveloper(tasksState, payload);
      break;

    case "UPDATE_DEVELOPER_ASPECT":
      actionResult = updateAspects(tasksState, payload);
      break;

    default:
      actionResult = tasksState;
  }
  return actionResult;
};

// Task Actions
const addNewTask = (tasksState, { taskDescription }) => {
  const newTask = { ...emptyTaskBuilder(), description: taskDescription };

  return [...tasksState, newTask];
};

const addEmptyTask = tasksState => {
  return [...tasksState, emptyTaskBuilder()];
};

const updateTask = (tasksState, { updatedTask }) => {
  const taskToReplace = tasksState.find(task => task.id === updatedTask.id);

  const indexTaskToReplace = tasksState.indexOf(taskToReplace);

  return tasksState.splice(indexTaskToReplace, 1, updatedTask);
};

const removeTask = (tasksState, { searchID }) => {
  return tasksState.filter(task => task.id !== searchID);
};

// Update Dev

const updateDeveloper = (tasksState, { taskID, developerUpdated }) => {
  const foundTask = tasksState.find(task => taskID === task.id);

  const developers = foundTask.developers;

  const foundDeveloper = developers.find(
    developer => developer.id === developerUpdated.id
  );

  const foundDeveloperIndex = developers.indexOf(foundDeveloper);

  foundTask.developers.splice(foundDeveloperIndex, 1, developerUpdated);

  return updateTask(tasksState, { updatedTask: foundTask });
};

// Update Requirements
const updateAspects = (tasksState, { developerID, aspectToUpdate }) => {
  const taskToUpdate = tasksState.filter(task =>
    task.developers.filter(developer => developer.id === developerID)
  );

  const developerToUpdate = taskToUpdate.map(task => task.developers[0])[0];

  let aspectsList = [...developerToUpdate.aspects];

  const findedAspect = aspectsList.find(
    aspectData => aspectData.aspect === aspectToUpdate.aspect
  );

  aspectsList = findedAspect
    ? aspectsList.filter(aspect => aspect.aspect !== aspectToUpdate.aspect)
    : [...aspectsList, aspectToUpdate];

  developerToUpdate.aspects = aspectsList;

  return updateDeveloper(tasksState, {
    taskID: taskToUpdate[0].id,
    developerUpdated: developerToUpdate
  });
};

const TaskContext = React.createContext();

const TaskProvider = ({ children }) => {
  const [tasksState, TaskDispatch] = useReducer(TaskReducer, []);

  return (
    <TaskContext.Provider value={{ tasksState, TaskDispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider, emptyDeveloperBuilder };
