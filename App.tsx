import React, { useState, useEffect } from "react";
import PrimaryNavigator from "./src/navigation/PrimaryNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "./src/config";
import { Theme } from "./src/config/colors";
import ThemeContext from "./src/contexts/ThemeContext";
import Toast from "react-native-toast-message";

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
      <ThemeContext.Provider value={themeValue}>
        <NavigationContainer>
          <PrimaryNavigator />
        </NavigationContainer>
      </ThemeContext.Provider>
      <Toast />
    </Provider>
  );
};

export default App;
