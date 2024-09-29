import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
function Signup() {
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
      

    const handlesignup=async(e)=>{
        e.preventDefault();
        if(fullname===''||username===''||email===''||password===''){
            toast.error("Please fill all the fields")
            return ;
        }
        try{
              
        }
        catch{
            
        }
        

    }


    return (
        <div className='h-screen flex flex-col items-center justify-center gap-4'>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign-Up now!</h1>
                        <p className="py-6">
                            "Analyze user feedback through our website to gain insights and improve services. Sign up now!"
                        </p>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover text-blue-600 text-sm">Already have an account?</a>
                        </label>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Fullname</span>
                                </label>
                                <input type="name" placeholder="fullname" onChange={(e) => setFullname(e.target.value)} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input type="email" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} className="input input-bordered" required />

                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handlesignup} className="btn btn-primary">Sign-Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup