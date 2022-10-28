import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";
import { navigationScreens } from "../config";
import { CoinSelector, Rate } from "../screens";

const Stack = createNativeStackNavigator();

const SessionNavigator: FC = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={navigationScreens.SELECTOR}
        component={CoinSelector}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={navigationScreens.RATE} component={Rate} />
    </Stack.Navigator>
  );
};

export default SessionNavigator;
