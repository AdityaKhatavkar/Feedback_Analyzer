import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Jsonfile() {
  const [file, setFile] = useState(null);
  const [emailField, setEmailField] = useState('');
  const [feedbackName, setFeedbackName] = useState('');

  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file || !emailField || !feedbackName) {
      toast.error('Please fill all the fields');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        
        const feedbackData = JSON.parse(e.target.result);
         console.log(feedbackData);
        const data = [];
        feedbackData.map((feedback) => {
          data.push({ email: feedback[emailField], feedback: feedback[feedbackName] });
        });
        
        
        
          
        const response = await axios.post('user/directfeedback', 
          {
            data:data
          }
        , {
          withCredentials: true
        });
          console.log(response);

        toast.success('Feedback sent successfully!');
      } catch (err) {
        const ans=err.response.data;
    
        toast.error(ans.message);
       
       
      }
    };
    
    reader.readAsText(file);
    
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className="hero min-h-screen">
        <div className="content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Send Json File</h1>
            <p className="py-6">
              Send a JSON file that contains feedback, along with providing the name of the email field and feedback name in your JSON file.
            </p>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".json"
              className="file-input file-input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              onChange={(e) => setEmailField(e.target.value)}
              placeholder="Enter the name of email field"
              className="input input-bordered w-full max-w-xs m-2"
            />
            <input
              type="text"
              onChange={(e) => setFeedbackName(e.target.value)}
              placeholder="Enter the name of feedback"
              className="input input-bordered w-full max-w-xs m-2"
            />

            <button onClick={handleSubmit} className="btn btn-primary m-3">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jsonfile;
