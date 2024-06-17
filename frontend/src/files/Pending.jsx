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
        <button onClick={all_task_nav}  className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl"><p className="font-mono">All Tasks</p></button>
        <button onClick={nav_comp} className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl"><p className="font-mono">Completed</p></button>
        <button onClick={nav_pending} className="bg-[#e03131] text-white px-[1rem] py-[.5rem] rounded-2xl"><p className="font-mono">Pending</p></button>
      </div>
      <div>
      {data
        .filter((item) => item.completed === false)
        .map((items) => (
          <div key={items._id} className="flex gap-[.5rem] w-[70vw] bg-[#F5F5F5] justify-between p-[1rem] border-b-2 border-black">
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
{/* <DropdownMenu>
<DropdownMenuTrigger asChild>
  <Button variant="outline">Open</Button>
</DropdownMenuTrigger>
<DropdownMenuContent className="w-56">
  <DropdownMenuLabel>Functions</DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuItem>
      Edit
      <DropdownMenuShortcut><MdEdit/></DropdownMenuShortcut>
    </DropdownMenuItem>
  <DropdownMenuItem onClick={() => { deleteTask(item._id) }}>
      Delete
      <DropdownMenuShortcut><MdDelete/></DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Settings
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Keyboard shortcuts
      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        Invite users
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Email</DropdownMenuItem>
          <DropdownMenuItem>Message</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>More...</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
    <DropdownMenuItem>
      New Team
      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuItem>GitHub</DropdownMenuItem>
  <DropdownMenuItem>Support</DropdownMenuItem>
  <DropdownMenuItem disabled>API</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem>
    Log out
    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
  </DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu> */}