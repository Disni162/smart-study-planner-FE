import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../service/api";

/* GET TASKS */
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await api.get("/tasks");
  return res.data;
});

/* ADD TASK */
export const addTask = createAsyncThunk("tasks/add", async (task: any) => {
  const res = await api.post("/tasks", task);
  return res.data;
});

/* UPDATE TASK */
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }: any) => {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
  }
);

/* DELETE TASK */
export const deleteTask = createAsyncThunk("tasks/delete", async (id: string) => {
  await api.delete(`/tasks/${id}`);
  return id;
});

type Task = any;

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t: any) => t._id === action.payload._id
        );

        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (t: any) => t._id !== action.payload
        );
      });
  },
});

export default taskSlice.reducer;