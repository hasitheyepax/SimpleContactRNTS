export type ColorsType = {
  textSub?: string;
  primary: string;
  background: string;
  card: string;
  text: string;
  labelText: string;
  buttonBody: string;
};

export type Theme = {
  dark: boolean;
  colors: ColorsType;
  borderRadius: number;
  verticalMargin: number;
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    textSub: "#f8f8f8",
    primary: "rgb(255, 45, 85)",
    background: "#191970",
    card: "#ff6900",
    text: "#f8f8f8",
    labelText: "#f5fee6",
    buttonBody: "#00a4ef",
  },
  borderRadius: 5,
  verticalMargin: 10,
};

const lightTheme: Theme = {
  dark: false,
  colors: {
    textSub: "#f8f8f8",
    primary: "#ef8f8f",
    background: "#eddcc8",
    card: "#0096FF",
    text: "#f8f8f8",
    labelText: "#f5fee6",
    buttonBody: "#00a4ef",
  },
  borderRadius: 5,
  verticalMargin: 10,
};

enum navigationScreens {
  LOGIN = "LOGIN",
  RATE = "RATE",
  SELECTOR = "SELECTOR",
}

export { lightTheme, darkTheme, navigationScreens };
