import { database } from "../firebase";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";

const UsersCollection = database.collection("Users");

// [value, loading, error]

const queryOption = {
  snapshotListenOptions: { includeMetadataChanges: true }
};

const useGetUsers = () => useCollection(UsersCollection, queryOption);

const useGetAUser = ({ UserID }) =>
  useDocument(UsersCollection.doc(UserID), queryOption);

const addUser = newUser => {
  const name = newUser.name;
  delete newUser.name;

  UsersCollection.doc(name).set(newUser);
};

const removeUser = UserID => UsersCollection.doc(UserID).delete();

export { useGetUsers, useGetAUser, addUser, removeUser };
