import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { FC } from "react";
import { navigationScreens } from "../config";
import { Login } from "../screens";

const Stack = createNativeStackNavigator();

const AuthNavigator: FC = (): JSX.Element => {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationScreens.LOGIN}
        component={Login}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
