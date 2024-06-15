// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaExclamation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Pending = () => {
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
    <main className="h-screen flex flex-col items-center">
      <h1 className="self-start font-mono text-[2rem] font-bold">Pending Tasks</h1>
      <div className="navigation flex items-center gap-[.5rem] p-[2rem]">
        <button onClick={all_task_nav}  className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl">All Tasks</button>
        <button onClick={nav_comp} className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl">Completed</button>
        <button onClick={nav_pending} className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl">Pending</button>
      </div>
      <div>
      {data
        .filter((item) => item.completed === false)
        .map((items) => (
          <div key={items._id} className="flex gap-[.5rem] w-[70vw] bg-[#F5F5F5] justify-between">
            <p className="font-mono text-[#CE2029] text-lg">{items.task_name}</p>
            <button>
              <FaExclamation className="text-[#A91101]"/>
            </button>
          </div>
        ))}
        
        </div>
    </main>
  );
};

export default Pending;
