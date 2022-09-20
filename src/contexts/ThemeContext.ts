import { createContext } from "react";
import { lightTheme, Theme } from "../config";

export type ThemeContext = {
  theme: Theme;
  setTheme: Function;
};

const ThemeContext = createContext<ThemeContext>({
  theme: lightTheme,
  setTheme: () => {},
});

export default ThemeContext;
