import { createSlice } from "@reduxjs/toolkit";

export interface IToastError {
  errorMsg: string;
}

const initialState = {
  errorMsg: "",
  isSuc: false,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorMsg = action.payload;
    },
    setIsSuc: (state, action) => {
      state.isSuc = action.payload;
    },
  },
});

const errorReducer = errorSlice.reducer;
export const { setError, setIsSuc } = errorSlice.actions;
export default errorReducer;
