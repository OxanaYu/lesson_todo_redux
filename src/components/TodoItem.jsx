import React, { useState } from "react";
import { deleteTodo, editTodo } from "../store/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ title, id }) => {
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState(title);
  const dispatch = useDispatch();
  const handleClickSave = () => {
    dispatch(editTodo({ id, newTitle }));
    setEditId(null);
  };

  return (
    <div>
      <li className="todo">
        <label>
          {editId == id ? (
            <div>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                type="text"
              />
            </div>
          ) : (
            <p>{title}</p>
          )}
          {editId == id ? (
            <div>
              <button onClick={handleClickSave}>Save</button>
            </div>
          ) : (
            <div>
              <button onClick={() => dispatch(deleteTodo({ id }))}>
                Delete
              </button>
              <button onClick={() => setEditId(id)}>Edit</button>
            </div>
          )}
          <input type="checkbox" />
        </label>
      </li>
    </div>
  );
};

export default TodoItem;
