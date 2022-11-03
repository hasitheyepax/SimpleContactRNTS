import { darkTheme, lightTheme } from "./colors";

export const baseURL = "https://rest.coinapi.io/v1/";

enum navigationScreens {
  LOGIN = "LOGIN",
  RATE = "RATE",
  SELECTOR = "SELECTOR",
  REGISTER = "REGISTER",
}

export const ASYNCKEY = "COINKEY";

export { lightTheme, darkTheme, navigationScreens };

export const currencies = [
  "BTC",
  "ETH",
  "USDT",
  "USDC",
  "BNB",
  "XRP",
  "BUSD",
  "ADA",
];
