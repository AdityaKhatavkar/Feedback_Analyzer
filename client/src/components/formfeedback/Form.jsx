import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
function Form() {
    const [email, setemail] = useState('')
    const [feedback, setfeedback] = useState('')
    const handleform = async (e) => {
        e.preventDefault();
        if (email === '' || feedback === '') {
            toast.error("Please fill all the fields")
            return;
        }
        try {
            const id = window.location.pathname.split("/")[2]
            const verficationcode = window.location.pathname.split("/")[3]

            const response = await axios.post(`/user/form/${id}/${verficationcode}`, {
                email,
                feedback
            })
            toast.success("Feedback sent successfully")

        } catch (err) {
            const ans = err.response.data.message;
            toast.error(ans);
        }

    }
    return (
        <div className='h-screen w-full flex flex-col justify-center items-center gap-4'>


            <h1 className='text-3xl font-bold'>Enter your feedback</h1>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" onChange={(e) => setemail(e.target.value)} className="grow" placeholder="Email" />
            </label>

            <label className="input input-bordered flex items-center gap-2 w-1/4">

                <input type="text" onChange={(e) => setfeedback(e.target.value)} className="grow" placeholder="Enter the feeback" />
            </label>

            <button onClick={handleform} className='btn btn-primary'>Submit</button>



        </div>
    )
}

export default Form