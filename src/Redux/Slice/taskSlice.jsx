import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    allTask: [],
    taskLoading: false,
    singleTask: "",
    search: "",
  },
  reducers: {
    setAllTask: (state, action) => {
      state.allTask = action.payload;
    },
    setTaskLoading: (state, action) => {
      state.taskLoading = action.payload;
    },
    setSingleTask: (state, action) => {
      state.singleTask = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setAllTask, setTaskLoading, setSingleTask, setSearch } =
  taskSlice.actions;
export default taskSlice.reducer;
