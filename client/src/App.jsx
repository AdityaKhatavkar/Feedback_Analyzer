import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Login from './components/login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Emailverification from './components/emailverfication/Emailverification.jsx';
import Formcreation from './components/formfeedback/Formcreation.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Form from './components/formfeedback/Form.jsx';
import Apigentration from './components/Api/Apigentration.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Jsonfile from './components/Fileinput/Jsonfile.jsx';

function App() {
  const [theme, setTheme] = useState('dark'); // State to track the theme
  
  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'pastel' : 'dark'));
  };

  return (
    <div data-theme={theme} className='h-full'> {/* Apply the theme dynamically */}
      <BrowserRouter>
        <Routes>
          {/* Routes with Navbar */}
          <Route
            element={
              <>
               
                <Navbar toggleTheme={toggleTheme} /> 
                <Outlet /> 
              </>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/apigenration" element={<Apigentration />} />
            <Route path="/formcreation" element={<Formcreation />} />
            <Route path="/jsondata" element={<Jsonfile />} />
          </Route>

          {/* Routes without Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emailverfication/:id" element={<Emailverification />} />
          <Route path="/form/:id/:verficationcode" element={<Form />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
