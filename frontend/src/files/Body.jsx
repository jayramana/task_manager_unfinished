// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { TfiCheck } from "react-icons/tfi";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { FaBan } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { TfiArrowDown } from "react-icons/tfi";
import "../styles.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaClock } from "react-icons/fa6";
import { TfiArrowUp } from "react-icons/tfi";
// eslint-disable-next-line no-unused-vars
import "../index.css";
const Body = () => {
  const [data, setData] = useState([]);
  const [addTask, setAddTask] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, seteditId] = useState(0);
  const [oldname, setOldname] = useState("");
  const [newObj, setObj] = useState([]);
  const [editname, setEditname] = useState("");
  const navigate = useNavigate();
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
      setAddTask("");
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

  const updateTaskDetails = async (id) => {
    const newobj = { task_name: editname, status: status, priority: priority };
    console.log(id);
    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URI}/${id}`,
      newobj
    );
    const response = res.data.task;
    console.log(response);
    setData((prevData) =>
      prevData.map((item) => (item._id === id ? response : item))
    );
    setEdit(false);
    setEditname("");
    setStatus(""); // Reset status
    setPriority(""); // Reset priority
    //   console.log("Updated data:", data);
    //   console.log(`Error updating task: ${error}`);
  };
  const Cross = () => {
    setData((prevData) => prevData.map((item) => item));
    setEdit(false);
  };

  const nav_comp = () => {
    navigate("/completed");
  };
  const nav_pending = () => {
    navigate("/pending");
  };
  const all_task_nav = () => {
    navigate("/");
  };
  console.log(data);
  return (
    <main className="body flex-col flex-align">
      <h1
        style={{ alignSelf: "start" }}
        className="text-[2rem] font-mono font-bold"
      >
        Task Manager
      </h1>
      <div className="navigation flex items-center gap-[.5rem] p-[2rem]">
        <button
          onClick={all_task_nav}
          className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl"
        >
          <p className="font-mono">All Tasks</p>
        </button>
        <button
          onClick={nav_comp}
          className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl"
        >
          <p className="font-mono">Completed</p>
        </button>
        <button
          onClick={nav_pending}
          className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl"
        >
          <p className="font-mono">Pending</p>
        </button>
      </div>
      <div className="add flex gap-[.5rem] items-baseline">
        <input
          type="text"
          name=""
          id=""
          value={addTask}
          placeholder="Add a Task"
          className="bg-[#f1f3f5] focus:outline-none px-[.8rem] py-[.4rem] rounded-lg font-mono w-[40vw] mb-[2rem]"
          onChange={(e) => {
            setAddTask(e.target.value);
          }}
        />
        <button
          onClick={add_Task}
          className="flex items-center px-[.8rem] py-[.4rem] rounded-md hover:bg-[#37b24d]"
        >
          <IoIosAdd />
          <p className="font-mono">Add</p>
        </button>
      </div>
      <div className=" w-[70vw] flex flex-col gap-[1rem]">
        {data.map((item) => (
          <div
            className="flex bg-[#e9ecef] shadow-lg  rounded-lg items-center  justify-between p-[.5rem] gap-[.5rem]"
            key={item._id}
          >
            
            {edit && editId === item._id ? (
              <div className="flex gap-[.5rem]">
                <input
                  type="text"
                  value={event.target.value}
                  className="self-start"
                  onChange={(e) => {
                    setEditname(e.target.value);
                  }}
                />
              </div>
            ) : (
              <p className="w-[100%] pl-[1rem] mt-[.3rem] self-start font-mono text-lg">
                {item.task_name}
              </p>
            )}
            <div>
              {item.status === "Pending".toLowerCase() ? (
                <div className="flex items-center gap-[.1rem]">
                  <FaClock className="text-[#ED9121]" />
                  <p className="text-[#ED9121] font-400 font-mono">Pending</p>
                </div>
              ) : item.status === "Completed".toLowerCase() ? (
                <div className="flex items-center gap-[.1rem]">
                  <SiTicktick className="text-[#00A550]"/>
                  <p className="text-[#00A550] font-400 font-mono">Completed</p>
                </div>
              ) : item.status === "Abandoned".toLowerCase() ? (
                <div className="flex items-center gap-[.1rem]">
                  <FaBan className="text-[#f03e3e]" />
                  <p className="text-[#f03e3e] font-400 font-mono">Abandoned</p>
                </div>
              ) : null}
            </div>
            <div>
              {item.priority === "High".toLowerCase() ? (
                <div className="flex items-center">
                  <TfiArrowUp />
                  <p className="font-mono font-400">High</p>
                </div>
              ) : item.priority === "Low".toLowerCase() ? (
                <div className="flex items-center">
                  <TfiArrowDown />
                  <p className="font-mono font-400">Low</p>
                </div>
              ) : null}
            </div>
            <div className="flex gap-[.5rem]">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      seteditId(item._id);
                      setOldname(item.task_name);
                    }}
                    className="transition-all duration-300 hover:text-[#FFBF00]"
                  >
                    <MdEdit  />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="font-mono text-xl">
                      Edit Task Details
                    </DialogTitle>
                    <DialogDescription className="font-mono">
                      Make changes to your task here. Click save when you are
                      done
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right font-mono">
                        Task Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue={oldname}
                        onChange={(e) => setEditname(e.target.value)}
                        className="col-span-3 font-mono"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="username"
                        className="text-right font-mono"
                      >
                        Status
                      </Label>
                      <Select onValueChange={(e) => setStatus(e)}>
                        <SelectTrigger className="w-[340%]">
                          <SelectValue placeholder="Select a Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup value={status}>
                            <SelectLabel className="font-mono">
                              Available Status
                            </SelectLabel>
                            <SelectItem value="completed" className="font-mono">
                              Completed
                            </SelectItem>
                            <SelectItem value="pending" className="font-mono">
                              Pending
                            </SelectItem>
                            <SelectItem value="abandoned" className="font-mono">
                              Abandoned
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="username"
                        className="text-right font-mono"
                      >
                        Priority
                      </Label>
                      <Select onValueChange={(e) => setPriority(e)}>
                        <SelectTrigger className="w-[340%]">
                          <SelectValue placeholder="Select a Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup value={priority}>
                            <SelectLabel className="font-mono">
                              Available Priorities
                            </SelectLabel>
                            <SelectItem value="high" className="font-mono">
                              High
                            </SelectItem>
                            <SelectItem value="low" className="font-mono">
                              Low
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogTrigger asChild>
                      <Button
                        type="submit"
                        onClick={() => {
                          updateTaskDetails(item._id);
                        }}
                      >
                        Save changes
                      </Button>
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="transition-all duration-300 hover:text-[#FF0000]"><MdDelete/></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { deleteTask(item._id) }} className="hover:bg-[#FF0000]">Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Body;
