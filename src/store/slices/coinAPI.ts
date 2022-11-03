import { get } from "../../api/baseAPI";
import { coinArrayType } from "./coinSlice";

export const fetchAssets = () => {
  return new Promise<coinArrayType>(async (resolve, reject) => {
    const response = await get({ endpoint: "assets/icons/200" });
    if (response) {
      resolve(response);
    } else {
      reject(null);
    }
  });
};
