import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import coinReducer from "./slices/coinSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coin: coinReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
