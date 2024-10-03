import React from 'react'
import toast from 'react-hot-toast'
function Allfeedback(data) {
    const feedbacks=data.data;
    
    return (
        <div>
            <div>
                <div className="overflow-x-auto ">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className='font-bold text-xl'>
                                <th></th>
                                <th>Email</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                            
                            {feedbacks.map((feedback, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{feedback.email}</td>
                                    <td>{feedback.feedback}</td>                                   
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Allfeedback