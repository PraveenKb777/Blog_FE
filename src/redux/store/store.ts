import { configureStore } from "@reduxjs/toolkit";
import publishReducer from "../slice/publishSlice";
import errorReducer from "../slice/errorSlice";
import editorReducer from "../slice/editorSlice";
const store = configureStore({
  reducer: {
    publishReducer,
    errorReducer,
    editorReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
