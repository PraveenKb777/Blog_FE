import { createSlice } from "@reduxjs/toolkit";

export interface IToastError {
  errorMsg: string;
}

const initialState = {
  errorMsg: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorMsg = action.payload;
    },
  },
});

const errorReducer = errorSlice.reducer;
export const { setError } = errorSlice.actions;
export default errorReducer;
