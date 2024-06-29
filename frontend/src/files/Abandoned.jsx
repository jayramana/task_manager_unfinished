// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBan } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaB } from "react-icons/fa6";

const Abandoned = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllData = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}`);
      const res = response.data.atask;
      setData(res);
    };
    getAllData();
  }, []);

  console.log(data);
  return (
    <main className="h-screen flex flex-col items-center gap-[2rem]">
      <h1 className="self-start font-mono text-[2rem] font-bold">
        Pending Tasks
      </h1>
      <div className="self-start pl-[2rem]">
        <Select
          onValueChange={(e) => {
            navigate(`${e}`);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="/">All Tasks</SelectItem>
              <SelectItem value="/completed">Completed</SelectItem>
              <SelectItem value="/pending">Pending</SelectItem>
              <SelectItem value="/abandoned">Abandoned</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-[2rem]">
        {data
          .filter((item) => item.status === "abandoned")
          .map((items) => (
            <div
              key={items._id}
              className="flex gap-[.5rem] w-[70vw] bg-[#F5F5F5] justify-between p-[1rem] rounded-xl shadow-lg"
            >
              <p className="font-mono text-[#f03e3e] text-lg">
                {items.task_name}
              </p>
              <button>
                <FaBan className="text-[#f03e3e]" />
              </button>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Abandoned;
