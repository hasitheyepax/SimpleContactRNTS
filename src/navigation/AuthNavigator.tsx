import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { FC, useContext } from "react";
import { navigationScreens } from "../config";
import { Login, Register } from "../screens";
import { AuthStackParamsList } from "./Types";
import ThemeContext from "../contexts/ThemeContext";

const Stack = createNativeStackNavigator<AuthStackParamsList>();

const AuthNavigator: FC = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);

  const defaultScreenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  const registerScreenOptions: NativeStackNavigationOptions = {
    title: "Register",
    headerTintColor: theme.colors.text,
    headerStyle: {
      backgroundColor: theme.colors.navigatorHeaderBackground,
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationScreens.LOGIN}
        component={Login}
        options={defaultScreenOptions}
      />
      <Stack.Screen
        name={navigationScreens.REGISTER}
        component={Register}
        options={registerScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
