import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./todo.css";

export default function TodosApp() {
  const initialData = [];

  const [data, setData] = useState(initialData);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  function addTask() {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        id: new Date().getTime(),
        name: newTask,
      };

      setData((prevData) => [...prevData, newTaskObject]);
      setNewTask("");
    }
  }

  function deleteTask(id) {
    setData((prevData) => prevData.filter((task) => task.id !== id));
  }

  function toggleEdit(id) {
    setEditingTaskId(id === editingTaskId ? null : id);
  }

  function saveTask(id, newName) {
    setData((prevData) =>
      prevData.map((task) =>
        task.id === id ? { ...task, name: newName } : task
      )
    );
    setEditingTaskId(null);
  }

  return (
    <div className="container">
      <h1>My Todos</h1>
      <div className="div1">
        <input
          className="add-data"
          type="text"
          placeholder="Add Something Todo..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-info" onClick={addTask}>
          ADD
        </button>
      </div>

      {data.length === 0 ? (
        <h2 className="empty-message">Nothing to do</h2>
      ) : (
        data.map((todo, index) => (
          <div className="items" key={todo.id}>
            <p
              style={{
                position: "relative",
                top: "7px",
              }}
            >
              {index + 1}.
            </p>
            <input
              className={editingTaskId === todo.id ? "highlighted-input" : ""}
              type="text"
              value={todo.name}
              readOnly={editingTaskId !== todo.id}
              onChange={(e) =>
                setData((prevData) =>
                  prevData.map((task) =>
                    task.id === todo.id
                      ? { ...task, name: e.target.value }
                      : task
                  )
                )
              }
            />
            <button
              className="btn btn-warning btn-sm"
              onClick={() => toggleEdit(todo.id)}
            >
              {editingTaskId === todo.id ? "Save" : "Edit"}
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTask(todo.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

// fetch('https://dummyjson.com/auth/me', {
//   method: 'GET',
//   headers: {
//     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvSmVhbm5lLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcwODA3MTM2MCwiZXhwIjoxNzA4MDc0OTYwfQ.irRPM7YZaulXTsBqdCZ6gSV_ZwFj-baDVrXri1_FKs8', 
//   }, 
// })
// .then(res => res.json())
// .then(console.log);