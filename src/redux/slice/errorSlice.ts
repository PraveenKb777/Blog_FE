import { createSlice } from "@reduxjs/toolkit";

export interface IToastError {
  errorMsg: string;
}

const initialState = {
  errorMsg: "",
  isSuc: false,
  globalLoading: false,
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
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

const errorReducer = errorSlice.reducer;
export const { setError, setIsSuc, setGlobalLoading } = errorSlice.actions;
export default errorReducer;
