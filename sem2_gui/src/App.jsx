import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from './Components/Navigationbar';
import Home from '../Pages/Home';
import Curd from './Components/Curd';
import Form from './Components/Form';
import Events from '../Pages/Events';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Healthy from '../Pages/Healthy';
import Details from '../Pages/Details';
import UpdateForm from '../Pages/Update';
import Profile from '../Pages/Profile';
import './App.css'

function App() {


  return (
    <>
      <div >
      
      <Routes>
      <Route index element={<Home/>}></Route>
      <Route path='/create' element={<Form/>}></Route>
      <Route path="/details/:id" element={<Details/>} ></Route>
      <Route path="/events" element={<Events/>} ></Route>
      <Route path="/login" element={<Login />} />
      <Route path='/healthy'element={<Healthy/>}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/update/:id" element={<UpdateForm />} />
      <Route path="/profile" element={<Profile />} />
      </Routes>
      
      </div>
      
      
      
    </>
  )
}

export default App
