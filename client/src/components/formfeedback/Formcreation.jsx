import React from 'react'

function Formcreation() {
    return (
        <div className='h-screen'>
        
        <div className='grid grid-cols-7 h-full '>
            <div className='md:col-span-3 col-span-7 flex justify-center items-center mt-28 md:mt-0'>
                <div className="bg-base-200 shadow-2xl p-10">
                    <h1 className='text-3xl mb-7 font-bold'>Feedback-Form</h1>
                    <div>"create your own feedback catagries then good,bad and neutral"</div>
                    <div className='text-red-600 mt-3'>Note:</div>
                    <div>if you create your new form the old form will be deleted</div>
                </div>
            </div>

            <div className='md:col-span-4 col-span-7 flex justify-center items-center'>


                <div className="hero min-h-screen">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Genrate the feedback form</h1>
                            <p className="py-6">
                                Create your own Feedback-form and analysise the feedback
                            </p>
                            <button className="btn btn-primary m-2">Create Form</button>
                            <button className="btn btn-error m-2">Delete Form</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default Formcreation