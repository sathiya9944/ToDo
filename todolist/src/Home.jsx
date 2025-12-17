import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs"; // ✅ Import icons
import "./App.css";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
      axios.get("https://todo-eb97.onrender.com/get")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err))
  }, [])

  const handleEdit = (id) => {
    axios.put("https://todo-eb97.onrender.com/update/" + id)
      .then(result => {
        location.reload()
      })
      .catch((err) => console.log(err))
  }
  const handleDelete = (id) => {
    axios.delete("https://todo-eb97.onrender.com/delete/" + id)
      .then(result => {
        location.reload()
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='home'>
      <h1>Todo List</h1>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map(todo => (
          <div className='task'>
            <div className='checkbox' onClick={()=>handleEdit(todo._id)}>
              {todo.done ? 
                <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                :<BsCircleFill className='icon' />
              }
              <p className={todo.done ? "line_through": ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill className='icon' onClick={()=>handleDelete(todo._id)} />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
