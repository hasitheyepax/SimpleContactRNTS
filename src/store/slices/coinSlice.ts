import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currencies } from "../../config";
import { RootState } from "../store";
import { fetchAssets } from "./coinAPI";

export type coinType = {
  asset_id: string;
  url: string;
};

export type coinArrayType = coinType[];

export interface CoinState {
  coinsArray?: coinArrayType;
  status: "idle" | "loading" | "failed";
}

const initialState: CoinState = {
  coinsArray: undefined,
  status: "idle",
};

export const loadCoinsAsync = createAsyncThunk("assets/icons", async () => {
  const response = await fetchAssets();
  return response;
});

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<coinArrayType>) => {
      state.coinsArray = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCoinsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCoinsAsync.fulfilled, (state, action) => {
        const allCoins: coinArrayType = action.payload;
        const selection = allCoins.filter((e) =>
          currencies.includes(e.asset_id)
        );
        state.coinsArray = selection;
        state.status = "idle";
      })
      .addCase(loadCoinsAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setCoins } = coinSlice.actions;

export const selectCoins = (state: RootState) => state.coin.coinsArray;
export const selectStatus = (state: RootState) => state.coin.status;

export default coinSlice.reducer;
