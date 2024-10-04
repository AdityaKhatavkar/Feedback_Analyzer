import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

function Formcreation() {
    const [id, setid] = useState("");
    const [code, setcode] = useState("");

    const Check = async () => {
        try {
            const response = await axios.post('/user/userinfo', {}, {
                withCredentials: true
            });
            const data = response.data.data;
            setid(data._id);
            setcode(data.verficationcode);
        } catch (err) {
            const ans = err.response.data.message;
            toast.error(ans);
        }
    }

    useEffect(() => {
        Check();
    }, []);

    const createform = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/feedbackformcreation', {}, {
                withCredentials: true
            });
            const content = response.data;
            setid(content.data._id);
            setcode(content.data.verficationcode);
            toast.success("Form created successfully");
        } catch (err) {
            const ans = err.response.data.message;
            toast.error(ans);
        }
    }

    const deleteform = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/feedbackformdelete', {}, {
                withCredentials: true
            });
            setid('');
            setcode('');
            toast.success("Form deleted successfully");
        } catch (err) {
            const ans = err.response.data.message;
            toast.error(ans);
        }
    }

    return (
        <div className='min-h-screen'>
            <div className='grid grid-cols-7 h-full'>
                <div className='md:col-span-3 col-span-7 flex justify-center items-center mt-28 md:mt-0'>
                    <div className="bg-base-200 shadow-2xl p-10">
                        <h1 className='text-3xl mb-7 font-bold'>Feedback-Form</h1>
                        <div>"Create your own feedback categories like good, bad, and neutral"</div>
                        <div className='text-red-600 mt-3'>Note:</div>
                        <div>If you create a new form, the old form will be deleted</div>
                    </div>
                </div>

                <div className='md:col-span-4 col-span-7 flex justify-center items-center'>
                    <div className="hero min-h-screen">
                        <div className="hero-content text-center flex flex-col">
                            <div className="max-w-md">
                                <h1 className="text-5xl font-bold">Generate the Feedback Form</h1>
                                <p className="py-6">Create your own feedback form and analyze the feedback</p>
                                <button onClick={createform} className="btn btn-primary m-2">Create Form</button>
                                <button onClick={deleteform} className="btn btn-error m-2">Delete Form</button>
                            </div>

                            {/* Conditionally rendering the URL if both id and code are not empty */}
                            {id && code && (
                                <div className='overflow-x-auto w-72 md:w-full '>
                                    <a className='text-blue-600 shadow-2xl  ' href={`http://localhost:8000/form/${id}/${code}`} target="_blank" rel="noopener noreferrer">
                                        http://localhost:8000/form/{id}/{code}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Formcreation;
