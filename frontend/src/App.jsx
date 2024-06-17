/* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { MdEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";

// function App() {
//   const [data, setData] = useState([]);
//   const [addTask, setAddTask] = useState("");
//   console.log(`${import.meta.env.VITE_BACKEND_URI}`);
//   useEffect(() => {
//     const getAlldata = async () => {

//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}`);
//       const get_Data = response.data.atask;
//       console.log(get_Data);
//       setData(get_Data);
//     };

//     getAlldata();
//   }, []);

//   const edit_Checked = async (id) => {
//     const edit_obj = data.filter((item) => item._id === id);
//     edit_obj.map(async (new_item) => {
//       const new_obj = {
//         completed: !new_item.completed,
//       };
//       const obj_id = new_item._id;
//       const time_stamp = obj_id.getTimestamp();
//       console.log(time_stamp)
//       console.log(obj_id)
//       const response = await axios.patch(
//         `${import.meta.env.VITE_BACKEND_URI}/${id}`,
//         new_obj
//       );
//       const upd = response.data.task;
//       console.log(upd);
//       setData((prevData) =>
//         prevData.map((item) => (item._id === id ? upd : item))
//       );
//     });
//   };

//   const add_Task = async () => {
//     const new_obj = { task_name: addTask };
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URI}`,
//         new_obj
//       );
//       setData((prevData) => [...prevData, response.data.task]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteTask = async (id) => {
//     data.map(async (item) => {
//       if (item._id === id) {
//         const res = await axios.delete(
//           `${import.meta.env.VITE_BACKEND_URI}/${id}`
//         );
//         const response = res.data.task;
//         console.log(response);
//       }
//     });
//     setData((prevData)=> prevData.filter((item)=> item._id !== id))
//   };

//   console.log(data);
//   return (
//     <main>
//       {data.length > 0 ? (
//         <div>
//           <h1>Task Manager</h1>
//           <section className="alltasks">
//             <div className="add">
//               <input
//                 type="text"
//                 name=""
//                 id=""
//                 placeholder="Add a task"
//                 onChange={(e) => setAddTask(e.target.value)}
//               />
//               <button onClick={add_Task}>Add</button>
//             </div>
//             <ul>
//               {data.map((item) => (
//                 <div key={item._id}>
//                   <li>
//                     <input
//                       type="checkbox"
//                       name=""
//                       id=""
//                       onChange={() => edit_Checked(item._id)}
//                       checked={item.completed}
//                     />
//                     {item.task_name}
//                     <MdEdit />
//                     <MdDelete onClick={()=> deleteTask(item._id)} />
//                   </li>
//                 </div>
//               ))}
//             </ul>
//           </section>
//         </div>
//       ) : (
//           <div>
//             <button>Add a Task</button>
//           </div>
//       )}
//     </main>
//   );
// }

// export default App;
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Body from "./files/Body.jsx"
import Completed from "./files/Completed.jsx"
import Pending from "./files/Pending.jsx"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Body />}></Route>
          <Route path='/completed' element={<Completed />}></Route>
          <Route path='/pending' element={<Pending/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App