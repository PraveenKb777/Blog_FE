import { createSlice } from "@reduxjs/toolkit";

interface EditorState {
  imageList: string[];
  // Other properties in your state if any
}

const initialState: EditorState = {
  imageList: [],
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setImageList: (state, action) => {
      const a: string[] = [...state.imageList];

      if (action.payload) {
        a.push(action.payload);
      }
      state.imageList = a;
    },
  },
});

export const { setImageList } = editorSlice.actions;

const editorReducer = editorSlice.reducer;

export default editorReducer;
