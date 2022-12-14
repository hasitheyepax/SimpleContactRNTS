export type ColorsType = {
  textSub?: string;
  primary: string;
  background: string;
  card: string;
  text: string;
  labelText: string;
  buttonBody: string;
  navigatorHeaderBackground: string;
  disabledButtonBody: string;
  cardBackground: string;
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
    buttonBody: "#0032d6",
    navigatorHeaderBackground: "#0032d6",
    disabledButtonBody: "#5c80f5",
    cardBackground: "#000000",
  },
  borderRadius: 5,
  verticalMargin: 10,
};

const lightTheme: Theme = {
  dark: false,
  colors: {
    textSub: "#f8f8f8",
    primary: "#ef8f8f",
    background: "#a9fff7",
    card: "#0096FF",
    text: "#333",
    labelText: "#f5fee6",
    buttonBody: "#00a4ef",
    navigatorHeaderBackground: "#f8f8f8",
    disabledButtonBody: "#46b7eb",
    cardBackground: "#F2D492",
  },
  borderRadius: 5,
  verticalMargin: 10,
};

export { darkTheme, lightTheme };
