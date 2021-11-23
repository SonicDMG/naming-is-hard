import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

//const initialState = [];
//const initialState = {"labels": [], "dataset": []};
const initialState = [
  { 
    labels: '',
    dataset: '',
  },
];

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action) => {
      // console.log("state: ", action.payload.labels);
      state.push(action.payload);
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { addData, reset } = dataSlice.actions;

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});
