import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNCKEY } from "../config";
import { userType } from "../types/user";

export const registerUser = async (user: userType) => {
  let users = await getUsers();

  users === undefined ? (users = [user]) : users.push(user);

  const status = await setUsers(users);
  return status;
};

export const getUsers = async (): Promise<[userType] | undefined> => {
  try {
    const jsonUsers = await AsyncStorage.getItem(ASYNCKEY);
    return jsonUsers != null ? JSON.parse(jsonUsers) : undefined;
  } catch (error) {
    console.log(error);
  }
};

export const setUsers = async (users: [userType]): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(ASYNCKEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const clearAllUsers = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ASYNCKEY);
  } catch (error) {
    console.log(error);
  }
};
