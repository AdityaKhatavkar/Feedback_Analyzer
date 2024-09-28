import React from 'react'

function Jsonfile() {
  return (
    <div>
      <div className='h-screen flex justify-center items-center '>

        <div className="hero  min-h-screen">
          <div className="content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Send Json File</h1>
              <p className="py-6">
                send json file which contain the feedback and along with send the name of the data and feedbackname and email name in your json file
              </p>

              <input type="file" accept=".json" className="file-input file-input-bordered w-full max-w-xs" />
              <input type="text" placeholder="name of the data array in json file" className="input input-bordered w-full max-w-xs m-2" />
              <input type="text" placeholder="name of the email" className="input input-bordered w-full max-w-xs m-2" />
              <input type="text" placeholder="name of the feedback" className="input input-bordered w-full max-w-xs m-2" />

              <button className="btn btn-primary m-3">Get Started</button>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Jsonfile