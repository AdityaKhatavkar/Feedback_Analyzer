import React from 'react'

function Emailverification() {
    return (
        <div className='h-screen flex flex-col items-center justify-center gap-4'>
            <div className='font-bold text-2xl'>Email verification</div>
            <div className='font-bold text-2xl flex flex-row gap-4'>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-primary">Primary</button>
            </div>
            <p>check your email for verification code</p>
        </div>
    )
}

export default Emailverification