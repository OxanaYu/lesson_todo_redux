import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { useDispatch } from "react-redux";
import { addTodo, getTodos } from "./store/todoSlice";

const App = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addTodo({ todoTitle }));
    setTodoTitle("");
  };

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <div>
      <div className="container">
        <h1>Todo app</h1>
        <div className="input-field">
          <input
            onChange={(e) => setTodoTitle(e.target.value)}
            value={todoTitle}
            type="text"
          />
          <p>TodoName</p>
          <button onClick={handleClick}>Add</button>
        </div>
      </div>
      <TodoList />
    </div>
  );
};

export default App;
