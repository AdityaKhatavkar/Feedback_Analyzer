import React from 'react'
import Login from './components/login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Emailverification from './components/emailverfication/Emailverification.jsx'
import Formcreation from './components/formfeedback/Formcreation.jsx'
import Navbar from './components/navbar/Navbar.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
   
    <BrowserRouter>
       <Navbar/>
      <Routes>

        <Route path="/formcreation" element={<Formcreation />} />
        
       
     </Routes>
     </BrowserRouter>
    

  )
}

export default App