import { RootState } from "./../store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/auth";
import { setError } from "./errorSlice";

interface IPublishState {
  title: string;
  content: string;
  loading: boolean;
}

const initialState: IPublishState = {
  title: "",
  content: "",
  loading: false,
};

interface IPublishPayload {
  content?: string;
  sendThepage: (id: string) => void;
}

export const publishAction = createAsyncThunk(
  "post/publish",
  async (payload: IPublishPayload, { dispatch, getState }) => {
    try {
      const { publishReducer, editorReducer } = getState() as RootState;
      const res = await axiosInstance.post("/blogs", {
        content: payload.content?.toString(),
        title: publishReducer.title,
        images: editorReducer.imageList,
      });
      const data = await res.data;
      payload.sendThepage(data.data.id);
      console.log(data);
    } catch (error) {
      dispatch(setError(error.response.data.message));
      console.log(error.response.data.message);
    }
  }
);

const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    setTitle: (state, { payload }: { payload: string }) => {
      state.title = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(publishAction.fulfilled, () =>
      // state, { payload }
      {}
    );
  },
});

const publishReducer = publishSlice.reducer;

export const { setTitle } = publishSlice.actions;

export default publishReducer;
