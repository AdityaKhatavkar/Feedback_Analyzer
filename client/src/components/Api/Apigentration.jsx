import React from 'react'

function Apigentration() {
    return (
        <div className='h-screen'>
            <div className='grid grid-cols-7 h-full '>
                <div className='md:col-span-3 col-span-7 flex justify-center items-center mt-28 md:mt-0'>
                    <div className="bg-base-200 shadow-2xl p-10">
                        <pre><code>await axios.post('http://localhost:5000/api/v1/user/login'</code></pre>
                            <pre ><code>,data,emailname,Feedbackname')</code></pre>
                            <pre ><code>.then(send successfully)</code></pre>
                             <pre ><code>.catch(smothing wents wrong)</code></pre>
                    </div>
                </div>

                <div className='md:col-span-4 col-span-7 flex justify-center items-center'>


                    <div className="hero min-h-screen">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <h1 className="text-5xl font-bold">Genrate the feedback api</h1>
                                <p className="py-6">
                                    Create your own api and intergrate in your web 
                                </p>
                                <button className="btn btn-primary m-2">Create Api</button>
                                <button className="btn btn-error m-2">Delete Api</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Apigentration