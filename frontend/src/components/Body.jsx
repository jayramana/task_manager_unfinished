// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { TfiCheck } from "react-icons/tfi";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import "../styles.css"
// eslint-disable-next-line no-unused-vars
import "../index.css";
const Body = () => {
  const [data, setData] = useState([]);
  const [addTask, setAddTask] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, seteditId] = useState(0);
  const [editname, setEditname] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    const getAlldata = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}`);
      const get_Data = response.data.atask;
      console.log(get_Data);
      setData(get_Data);
    };

    getAlldata();
  }, []);

  const edit_Checked = async (id) => {
    const edit_obj = data.filter((item) => item._id === id);
    edit_obj.map(async (new_item) => {

      const new_obj = {
        completed: !new_item.completed,
      };
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URI}/${id}`,
        new_obj
      );
      const upd = response.data.task;
      console.log(upd);
      setData((prevData) =>
        prevData.map((item) => (item._id === id ? upd : item))
      );
    });
  };
  useEffect(() => {
    console.log(edit);
  }, [edit]);

  const add_Task = async () => {
    const new_obj = { task_name: addTask };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}`,
        new_obj
      );
      setData((prevData) => [...prevData, response.data.task]);
      setAddTask("")
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    data.map(async (item) => {
      if (item._id === id) {
        const res = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URI}/${id}`
        );
        // eslint-disable-next-line no-unused-vars
        const response = res.data.task;
      }
    });
    setData((prevData) => prevData.filter((item) => item._id !== id));
  };

  const updateTaskname = async (id) => {
    const newobj = { task_name: editname}
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URI}/${id}`, newobj)
      const response = res.data.task
      setData((prevData) => prevData.map((item) => item._id === id ? response : item))      
      setEdit(false)
      setEditname("")

    }
    catch {
      console.log(`error`)
    }
    
  }
  const Cross = () => {
    setData((prevData) => prevData.map((item) => item))
    setEdit(false)

  }

  const nav_comp = () => {
    navigate('/completed')
  }
  const nav_pending = () => {
    navigate("/pending")
  }
  const all_task_nav = () => {
    navigate("/")
  }
  console.log(data)
  return (
    <main className="body flex-col flex-align">
      <h1 style={{ alignSelf: "start" }}>Task Manager</h1>
      <div className="navigation flex items-center gap-[.5rem]">
        <button onClick={all_task_nav}>All Tasks</button>
        <button onClick={nav_comp}>Completed</button>
        <button onClick={nav_pending}>Pending</button>
      </div>
      <div className="add">
        <input
          type="text"
          name=""
          id=""
          value={addTask}
          placeholder="Add a Task"
          onChange={(e) => {
            setAddTask(e.target.value);
          }}
        />
        <button onClick={add_Task}>Add</button>
      </div>
      <div className="all-tasks">
        {data.map((item) => (
          <div className="flex items-center" key={item._id}>
            <input
              type="checkbox"
              name=""
              id=""
              checked={item.completed}
              onChange={() => edit_Checked(item._id)}
            />
            {edit && editId === item._id ? (
              <div className="flex gap-[.5rem]">
                <input type="text" value={item.task_name} onChange={(e)=>{setEditname(e.target.value)}} />
                <TfiCheck onClick={()=>updateTaskname(item._id)} />
                <TfiClose onClick={()=>Cross()} />
              </div>
            ) : (
              <p>{item.task_name}</p>
            )}
            <div className="flex gap-[.5rem]">
              <button
                className={`${edit && editId === item._id ? `invisible` : `visible`} h-fit`}
                onClick={() => {
                  setEdit(true);
                  seteditId(item._id);
                }}
              >
                <MdEdit />
              </button>
              <button
                className={`${edit && editId=== item._id? `invisible` : `visible`} h-fit`}
                onClick={() => {
                  deleteTask(item._id);
                }}
              >
                <MdDelete  />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Body;
