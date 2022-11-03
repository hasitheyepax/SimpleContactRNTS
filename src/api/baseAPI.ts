import { baseURL } from "../config";
import Config from "react-native-config";

interface getArgs {
  endpoint: string;
}

export const get = async (args: getArgs): Promise<any> => {
  const headers = new Headers();
  headers.append("X-CoinAPI-Key", `${Config.COINAPI_KEY}`);

  const response = await fetch(`${baseURL}${args.endpoint}`, {
    method: "GET",
    headers,
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
};
