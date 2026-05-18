import { Routes, Route } from "react-router-dom";
import Signup from "./page/Signup";
import Login from "./page/Login"
import './App.css'

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/signup" element= {<Signup/>} />
      <Route path="/login" element= {<Login/>} />
    </Routes>

    </>
  )
}

export default App
