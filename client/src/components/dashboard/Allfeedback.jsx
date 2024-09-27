import React from 'react'

function Allfeedback() {
    return (
        <div>
            <div>
                <div className="overflow-x-auto">
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
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>siddhesh112004@gmail.com</td>
                                <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, sed!</td>

                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>1</th>
                                <td>siddhesh112004@gmail.com</td>
                                <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, sed!</td>

                            </tr>

                            <tr>
                                <th>1</th>
                                <td>siddhesh112004@gmail.com</td>
                                <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, sed!</td>

                            </tr>

                            <tr>
                                <th>1</th>
                                <td>siddhesh112004@gmail.com</td>
                                <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, sed!</td>

                            </tr>


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Allfeedback