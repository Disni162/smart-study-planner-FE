import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./reducer/counterReducer";
import taskReducer from "./taskSlice"; 

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: taskReducer, // Add task reducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;