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
    <main className="h-screen flex flex-col items-center">
      <h1 className="self-start text-[2rem] font-mono font-bold">Completed Tasks</h1>
      <div className="navigation flex items-center gap-[.5rem] p-[2rem]">
        <button onClick={all_task_nav} className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl"><p className="font-mono">All Tasks</p></button>
        <button onClick={nav_comp} className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl"><p className="font-mono">Completed</p></button>
        <button onClick={nav_pending} className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl"><p className="font-mono">Pending</p></button>
      </div>
      <div>
      {data
        .filter((item) => item.completed === true)
        .map((items) => (
          <div key={items._id} className="flex gap-[.5rem] bg-[#F5F5F5] w-[70vw] justify-between p-[1rem] border-b-2 border-black">
            <p className="font-mono text-[#00693E] text-lg">{items.task_name}</p>
            <button>
            {/* 3EB489 */}
              <HiCheck className="text-[#228B22]" /> 
            </button>
          </div>
        ))}
        
        </div>
    </main>
  );
};

export default Completed;
