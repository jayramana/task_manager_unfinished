import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Body from "./files/Body.jsx"
import Completed from "./files/Completed.jsx"
import Pending from "./files/Pending.jsx"
import Abandoned from "./files/Abandoned.jsx"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Body />}></Route>
          <Route path='/completed' element={<Completed />}></Route>
          <Route path='/pending' element={<Pending/>} />
          <Route path='/abandoned' element={<Abandoned/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App