import { configureStore } from "@reduxjs/toolkit";
import publishReducer from "../slice/publishSlice";
import errorReducer from "../slice/errorSlice";
const store = configureStore({
  reducer: {
    publishReducer,
    errorReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
