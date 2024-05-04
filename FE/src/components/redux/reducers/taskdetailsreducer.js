import { createSlice } from "@reduxjs/toolkit";

const taskDetailsSlice = createSlice({
  name: "taskdetails",
  initialState: {
    data: [],
    selectedStatus: '' 
  },
  reducers: {
    storeTasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    storeTasksSuccess: (state, action) => {
      if (action.payload) {
        state.data = [...action.payload]; // Create a new array using spread syntax
      } else {
        state.data = [];
      }
    },
    storeediteddata: (state, action) => {
      if (action.payload) {
        const updatedItem = action.payload;
        state.data = state.data.map(item => {
          return item._id === updatedItem._id ? updatedItem : item;
        });
      }
    },
    
    







    storeTasksFailure: (state, action) => {
      state.error = action.payload;
    },
    updateSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    }
  },
});

export const { storeTasksRequest, storeTasksSuccess, storeTasksFailure, updateSelectedStatus  , storeediteddata} = taskDetailsSlice.actions;
export default taskDetailsSlice.reducer;
