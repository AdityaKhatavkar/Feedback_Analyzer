import React from 'react'
import Login from './components/login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Emailverification from './components/emailverfication/Emailverification.jsx'
import Formcreation from './components/formfeedback/Formcreation.jsx'
import Navbar from './components/navbar/Navbar.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './components/formfeedback/Form.jsx'
import Apigentration from './components/Api/Apigentration.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import Jsonfile from './components/Fileinput/Jsonfile.jsx'


function App() {
  return (
   
    <BrowserRouter>
       <Navbar/>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/apigenration" element={<Apigentration />} />
        <Route path="/formcreation" element={<Formcreation />} />
        <Route path="/jsondata" element={<Jsonfile />} />
        
       
     </Routes>
     </BrowserRouter>

    

    
  )
}

export default App