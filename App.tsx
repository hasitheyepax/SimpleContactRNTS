import React, { useState, useEffect } from "react";
import PrimaryNavigator from "./src/navigation/PrimaryNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { persistedStore, store } from "./src/store/store";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./src/config";
import { Theme } from "./src/config/colors";
import ThemeContext from "./src/contexts/ThemeContext";
import Toast from "react-native-toast-message";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(
    colorScheme === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
  }, [colorScheme]);

  const themeValue = {
    theme,
    setTheme,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ThemeContext.Provider value={themeValue}>
          <NavigationContainer>
            <PrimaryNavigator />
          </NavigationContainer>
        </ThemeContext.Provider>
      </PersistGate>
      <Toast />
    </Provider>
  );
};

export default App;
