import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../components/UserDetails/UserDetails";

interface IInitialSlice {
  user: IUser;
}

const initialState: IInitialSlice = {
  user: {
    firstname: "",
    lastname: null,
    avatar: null,
    _id: "",
  },
};

const initialSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setCurrentUser } = initialSlice.actions;

const initialReducer = initialSlice.reducer;

export default initialReducer;
