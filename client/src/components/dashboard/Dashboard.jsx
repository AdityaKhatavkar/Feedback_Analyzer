import React from 'react'
import Allfeedback from './Allfeedback'


function Dashboard() {
    


    return (
        <div className='h-screen '>
            <div className=' shadow-2xl pt-28 md:pt-40 w-full flex justify-center items-center p-4'>

                <div className="stats stats-vertical lg:stats-horizontal  w-full ">
                    <div className="stat flex justify-center items-center flex-col text-green-600">
                        <div className="stat-title">Good-Feedback</div>
                        <div className="stat-value">200</div>
                        <div className="stat-desc"> (14%)</div>

                    </div>

                    <div className="stat flex justify-center items-center flex-col text-red-600">
                        <div className="stat-title">Bad-Feedback</div>
                        <div className="stat-value">100</div>
                        <div className="stat-desc"> (14%)</div>

                    </div>

                    <div className="stat flex justify-center items-center flex-col text-blue-600">
                        <div className="stat-title">Neutral-Feedback</div>
                        <div className="stat-value">45</div>
                        <div className="stat-desc"> (14%)</div>

                    </div>


                </div>

            </div>
            <div className="divider p-5 ">Feedbacks</div>
            <div className='w-full grid grid-cols-9 justify-center items-center gap-5 mt-4 '>

                <div className='md:col-span-3 col-span-9 flex justify-center items-center p-5 '>

                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <button className="" onClick={() => document.getElementById('my_modal_1').showModal()}>

                        <div className=" bg-base-100 w-full shadow-2xl">
                            <div className="card-body">
                                <h2 className="card-title flex justify-center items-center font-bold text-green-600">Good-Feedback</h2>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga ex eius illo. Veritatis, nisi unde pariatur quaerat vero consequatur inventore dolor quasi cumque voluptate tempora placeat excepturi hic reiciendis voluptates neque! Asperiores recusandae iusto, eius maiores eaque unde fuga provident modi excepturi quod. Quo molestiae iure tenetur nobis, modi cumque quam nisi pariatur aliquam ducimus dicta corrupti delectus. Dolorem, illo assumenda. Eum, adipisci officiis dolor doloribus dolorum inventore? Officiis illum tenetur quasi sed velit necessitatibus numquam! Magnam, porro. Minima, suscipit.</p>

                            </div>
                        </div>


                    </button>
                    <dialog id="my_modal_1" className="modal ">
                        <div className="modal-box  w-11/12 max-w-7xl">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg text-green-600">Good-Feedback</h3>
                            <div className="py-4"><Allfeedback/></div>
                        </div>
                    </dialog>

                </div>

                <div className='md:col-span-3 col-span-9 flex justify-center items-center p-5'>

                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <button className="" onClick={() => document.getElementById('my_modal_2').showModal()}>


                        <div className=" bg-base-100 w-full shadow-2xl">
                            <div className="card-body">
                                <h2 className="card-title flex justify-center items-center font-bold text-red-600">Bad-Feedback</h2>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga ex eius illo. Veritatis, nisi unde pariatur quaerat vero consequatur inventore dolor quasi cumque voluptate tempora placeat excepturi hic reiciendis voluptates neque! Asperiores recusandae iusto, eius maiores eaque unde fuga provident modi excepturi quod. Quo molestiae iure tenetur nobis, modi cumque quam nisi pariatur aliquam ducimus dicta corrupti delectus. Dolorem, illo assumenda. Eum, adipisci officiis dolor doloribus dolorum inventore? Officiis illum tenetur quasi sed velit necessitatibus numquam! Magnam, porro. Minima, suscipit.</p>

                            </div>
                        </div>


                    </button>
                    <dialog id="my_modal_2" className="modal ">
                        <div className="modal-box  w-11/12 max-w-7xl">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg text-red-600">Bad-Feedback</h3>
                            <div className="py-4"><Allfeedback/></div>
                        </div>
                    </dialog>

                </div>

                <div className='md:col-span-3 col-span-9 flex justify-center items-center p-5 '>

                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <button className="" onClick={() => document.getElementById('my_modal_3').showModal()}>


                        <div className=" bg-base-100 w-full shadow-2xl">
                            <div className="card-body">
                                <h2 className="card-title flex justify-center items-center font-bold text-blue-600">Neutral-Feedback</h2>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga ex eius illo. Veritatis, nisi unde pariatur quaerat vero consequatur inventore dolor quasi cumque voluptate tempora placeat excepturi hic reiciendis voluptates neque! Asperiores recusandae iusto, eius maiores eaque unde fuga provident modi excepturi quod. Quo molestiae iure tenetur nobis, modi cumque quam nisi pariatur aliquam ducimus dicta corrupti delectus. Dolorem, illo assumenda. Eum, adipisci officiis dolor doloribus dolorum inventore? Officiis illum tenetur quasi sed velit necessitatibus numquam! Magnam, porro. Minima, suscipit.</p>

                            </div>
                        </div>


                    </button>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box  w-11/12 max-w-7xl">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg text-blue-600">Neutral-Feedback</h3>
                            <div className="py-4"><Allfeedback/></div>
                        </div>
                    </dialog>

                </div>
            </div>


        </div>
    )
}

export default Dashboard