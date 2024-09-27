import React from 'react'

function Formcreation() {
    return (
        <div className='h-screen'>
            <div className='grid grid-cols-6 md:h-screen h-1/2   '>
                <div className='md:col-span-2 col-span-6 flex flex-col justify-center items-center m-5  '>
                    <p className='md:text-3xl text-2xl font-bold mt-20 md:mt-0'>
                        "Create your own form and share it with your friends"
                    </p>
                    <div className='flex flex-col md:text-xl  mt-4'>
                        <span className=' text-red-600'>Note:</span>
                        <h1>If you create a form the previous form will be deleted and the the previous feedback data is deleted</h1>

                    </div>
                </div>
                <div className='md:col-span-4 col-span-6'>
                    <div className="hero md:h-screen">
                        <div className="hero-content text-center flex flex-col m-5">
                            <div className="max-w-md">
                                <h1 className="text-5xl font-bold">Feedback-Form</h1>
                                <p className="py-6">
                                    click on the button below to create your own form
                                </p>
                                <button className="btn btn-primary m-2">Create form link</button>
                                <button className="btn btn-error m-2">delete form link</button>
                               
                            </div>
                            <input type="text" placeholder="Type here" className="input input-bordered w-full " />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Formcreation