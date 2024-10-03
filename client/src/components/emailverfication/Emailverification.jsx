import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Emailverification() {
    const [code, setCode] = useState('');

    const navigate=useNavigate();
    const handlesubmit = async(e) => {
        e.preventDefault();
        if (code === '') {
            toast.error("Please fill the code")
            return;
        }
        try {
            const id=window.location.pathname.split("/")[2]
            const response = await axios.post(`/user/veficationcode/${id}`, {
                verficationcode:code
            }, {
                withCredentials: true
            })
            toast.success("Email verified successfully")
            navigate("/login");

        }  catch (err) {
            const ans=err.response.data.message
            
            toast.error(ans)
            
        }
    }
    return (
        <div className='h-screen flex flex-col items-center justify-center gap-4'>
            <div className='font-bold text-2xl'>Email verification</div>
            <div className='font-bold text-2xl flex flex-row gap-4'>
                <input type="text" placeholder="Verification code" onChange={(e)=>{setCode(e.target.value)}} className="input input-bordered w-full max-w-xs" />
                <button onClick={handlesubmit} className="btn btn-primary" >verify</button>
            </div>
            <p>check your email for verification code</p>
        </div>
    )
}

export default Emailverification