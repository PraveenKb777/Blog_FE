import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../components/UserDetails/UserDetails";

interface IInitialSlice {
  user: IUser;
  isLoggedIn: boolean;
}

const initialState: IInitialSlice = {
  user: {
    firstname: "",
    lastname: null,
    avatar: null,
    _id: "",
  },
  isLoggedIn: false,
};

const initialSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
    setLogin(state, action: { payload: boolean; type: unknown }) {
      state.isLoggedIn = action.payload;
    },
    logoutFun(state) {
      state.isLoggedIn = false;
      state.user = { ...initialState.user };
      localStorage.removeItem("jwt");
    },
  },
});

export const { setCurrentUser, setLogin, logoutFun } = initialSlice.actions;

const initialReducer = initialSlice.reducer;

export default initialReducer;
