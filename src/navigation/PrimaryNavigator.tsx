import { FC } from "react";
import SessionNavigator from "./SessionNavigator";
import AuthNavigator from "./AuthNavigator";
import { selectAuth } from "../store/slices/authSlice";
import { useAppSelector } from "../store/hooks";

const PrimaryNavigator: FC = (props): JSX.Element => {
  const isLoggedIn = useAppSelector(selectAuth);

  return isLoggedIn ? <SessionNavigator /> : <AuthNavigator />;
};

export default PrimaryNavigator;
