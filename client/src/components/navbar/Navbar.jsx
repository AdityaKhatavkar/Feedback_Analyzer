import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='flex z-1 fixed w-full '>

            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Feedback</a>
                </div>
                <div className="flex-none">

                    <ul className="menu menu-horizontal px-1 ">
                        
                        <li>
                            <details>
                                <summary>Methods</summary>
                                <ul className="bg-base-100 rounded-t-none p-2 w-36">
                                    <li><Link to='/formcreation' >CREATE-FORM</Link></li> 
                                    <li><a>JSON-DATA</a></li>
                                    <li><a>GENRATE-API</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://imgs.search.brave.com/Jr4F26FmavL_arvWQ51hTUtcX3UgHOWlH0F9fqfo5Cc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/c3ZnLm9yZy9pbWcv/YWJzdHJhY3QtdXNl/ci1mbGF0LTQucG5n" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    ID :123456
                                </a>
                            </li>
                            <li><button>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Navbar