import { configureStore } from "@reduxjs/toolkit";
import taskdetailsreducer from "./reducers/taskdetailsreducer";

export default configureStore({
    // ROOT REDUCER
    reducer: {
     Taskdetails : taskdetailsreducer
    },
  });