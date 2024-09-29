import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handlelogin = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            toast.error("Please fill all the fields")
            return;
        }
        console.log(email, password);
       
    }
    return (
        <div className='h-screen flex flex-col items-center justify-center gap-4'>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Log in to access detailed feedback analysis and track insights to enhance your service quality.
                        </p>
                        <label className="label">
                            <Link to="/signup" className="label-text-alt link link-hover text-blue-600 text-sm">Dont have account?</Link>
                        </label>

                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input type="username" placeholder="Username" className="input input-bordered" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" onChange={(e) => setPassword(e.target.value)} required />
                               
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handlelogin} className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login