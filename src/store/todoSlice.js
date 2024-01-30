import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../const";
import axios from "axios";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const res = await axios(API);
  return res.data;
});

// redux toolkit заменяет cotext and usereducer
// если прописывается функция, котоорая делает запрос в доп слайсах делают обязательно extrareducers
export const deleteItem = createAsyncThunk(
  "todos/deleteItem",
  async (id, { dispatch }) => {
    try {
      const res = await axios.delete(`${API}/${id}`);
      dispatch(deleteTodo({ id }));
    } catch (error) {
      console.log(error);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      console.log(state);
      console.log(action);
      state.todos.push({
        title: action.payload.todoTitle,
        id: Date.now(),
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((elem) => elem.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo(state, action) {
      const { id, newTitle } = action.payload;
      const editedTodo = state.todos.find((elem) => elem.id == id);
      editedTodo.title = newTitle;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.status = "загрузка данных";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "данные успешно загрузились";
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "ошибка при загрузке данных";
        state.error = action.error;
      });
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
