export type ColorsType = {
  textSub?: string;
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
};

type Theme = {
  dark: boolean;
  colors: ColorsType;
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    textSub: "#a7ff00",
    primary: "rgb(255, 45, 85)",
    background: "#000",
    card: "#ff6900",
    text: "#FFF",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

const lightTheme: Theme = {
  dark: false,
  colors: {
    textSub: "#5800FF",
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "#0096FF",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

enum navigationScreens {
  LOGIN = "LOGIN",
  RATE = "RATE",
  SELECTOR = "SELECTOR",
}

export { lightTheme, darkTheme, navigationScreens };
