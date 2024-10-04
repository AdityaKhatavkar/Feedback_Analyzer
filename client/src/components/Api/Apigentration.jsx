import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

function Formcreation() {
    const [id, setid] = useState("");
    const [tokenid, settokenid] = useState("");

    const Check = async () => {
        try {
            const response = await axios.post('/user/userinfo', {}, {
                withCredentials: true
            });
            const data = response.data.data;
            setid(data._id);
            settokenid(data.tokenid);
        } catch (err) {
            const ans = err.response.data.message;
            toast.error(ans);
        }
    }

    useEffect(() => {
        Check();
    }, []);

    const createurl = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/apigenerate', {}, {
                withCredentials: true
            });
            const content = response.data;
            
            console.log(content);
            setid(content.data._id);
            settokenid(content.data.tokenid);
            toast.success("Form created successfully");
        } catch (err) {
            const ans = err.response.data.message;
            toast.error(ans);
        }
    }

    const deleteurl = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/apidelete', {}, {
                withCredentials: true
            });
            setid('');
            settokenid('');

            toast.success("Form deleted successfully");
        } catch (err) {
            const ans = err.response.data.message;
            toast.error(ans);
        }
    }

    return (
        <div className='h-screen'>
            <div className='grid grid-cols-7 h-full'>
                <div className='md:col-span-3 col-span-7 flex justify-center items-center mt-28 md:mt-0'>
                    <div className="bg-base-200 shadow-2xl p-10">
                        <h1 className='text-3xl mb-7 font-bold'>Feedback-url</h1>
                        <div>"Create your own feedback categories like good, bad, and neutral"</div>
                        <div className='text-red-600 mt-3'>Note:</div>
                        <div>If you create a new url, the old url will be deleted</div>
                    </div>
                </div>

                <div className='md:col-span-4 col-span-7 flex justify-center items-center'>
                    <div className="hero min-h-screen">
                        <div className="hero-content text-center flex flex-col">
                            <div className="max-w-md">
                                <h1 className="text-5xl font-bold">Generate the url</h1>
                                <p className="py-6">you can also send the feedback using this url two field email,feedback</p>
                                <button onClick={createurl} className="btn btn-primary m-2">Create url</button>
                                <button onClick={deleteurl} className="btn btn-error m-2">Delete url</button>
                            </div>

                            {/* Conditionally rendering the URL if both id and code are not empty */}
                            {id && tokenid && (
                                <div className='overflow-x-auto w-72 md:w-full shadow-2xl '>
                                    <div className='text-blue-600   ' >
                                        http://localhost:8000/url/{id}/{tokenid}
                                    </div>
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
