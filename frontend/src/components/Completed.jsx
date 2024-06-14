// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiCheck } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const Completed = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const getAllData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}`);
      const res = response.data.atask;
      setData(res);
    };
    getAllData();
  }, []);
  
  const nav_comp = () => {
    navigate('/completed')
  }
  const nav_pending = () => {
    navigate("/pending")
  }
  const all_task_nav = () => {
    navigate("/")
  }
  console.log(data);
  return (
    <main>
      <h1>Completed Tasks</h1>
      <div className="navigation flex items-center gap-[.5rem]">
        <button onClick={all_task_nav}>All Tasks</button>
        <button onClick={nav_comp}>Completed</button>
        <button onClick={nav_pending}>Pending</button>
      </div>
      <div>
      {data
        .filter((item) => item.completed === true)
        .map((items) => (
          <div key={items._id} className="flex gap-[.5rem]">
            <p>{items.task_name}</p>
            <button>
              <HiCheck />
            </button>
          </div>
        ))}
        
        </div>
    </main>
  );
};

export default Completed;
