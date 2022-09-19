import React from "react";
import PrimaryNavigator from "./src/navigation/PrimaryNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./src/config";

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <NavigationContainer
        theme={colorScheme === "dark" ? darkTheme : lightTheme}
      >
        <PrimaryNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
