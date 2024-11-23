import React, { useEffect, useState } from 'react';
import Allfeedback from './Allfeedback';
import toast from 'react-hot-toast';
import axios from 'axios';

function Dashboard() {
    const [badsummary, setBadsummary] = useState(null);
    const [goodsummary, setGoodsummary] = useState(null);
    const [allfeedback, setAllfeedback] = useState([]);
    const [goodfeedback, setGoodfeedback] = useState([]);
    const [badfeedback, setBadfeedback] = useState([]);

    useEffect(() => {
        feedbacksummary();
        collectallfeedback();
    }, []);

    const feedbacksummary = async () => {
        try {
            const response = await axios.post('/user/allsummary', {}, {
                withCredentials: true,
            });
            const content = response.data;
            setGoodsummary(content.data.goodsummary);
            setBadsummary(content.data.badsummary);
        } catch (err) {
            if (err.response.status !== 401) {
                const ans = err.response.data.message;
                toast.error(ans);
            }
        }
    };

    const collectallfeedback = async () => {
        try {
            const response = await axios.post('/user/allfeedback', {}, {
                withCredentials: true,
            });
            const content = response.data.data;

            const good = [];
            const bad = [];

            content.forEach((feedback) => {
                if (feedback.catagry === 'good') {
                    good.push(feedback);
                } else if (feedback.catagry === 'bad') {
                    bad.push(feedback);
                }
            });

            setGoodfeedback(good);
            setBadfeedback(bad);
            setAllfeedback(content);
        } catch (err) {
            if (err.response.status !== 401) {
                const ans = err.response.data.message;
                toast.error(ans);
            }
        }
    };

    const handlesummarizefeedback = async () => {
        const loaderToast = toast.loading('Summarizing feedback...');
        try {
            const response = await axios.post('/user/summarizingfeedback', {}, {
                withCredentials: true,
            });
            const content = response.data;
            setGoodsummary(content.data.good);
            setBadsummary(content.data.bad);
            toast.success(content.message);
        } catch (err) {
            if (err.response.status !== 401) {
                const ans = err.response.data.message;
                toast.error(ans);
            }
        } finally {
            toast.dismiss(loaderToast);
        }
    };

    const analyziefeedback = async () => {
        const loaderToast = toast.loading('Analyzing feedback...');
        try {
            const response = await axios.post('/user/analyzingfeedback', {}, {
                withCredentials: true,
            });
            const content = response.data;
            toast.success(content.message);
            collectallfeedback();
        } catch (err) {
            if (err.response.status !== 401) {
                const ans = err.response.data.message;
                toast.error(ans);
            }
        } finally {
            toast.dismiss(loaderToast);
        }
    };

    return (
        <div className='min-h-screen'>
            <div className='shadow-2xl pt-28 md:pt-40 w-full flex justify-center items-center p-4'>
                <div className="stats stats-vertical lg:stats-horizontal w-full">
                    <div className="stat flex justify-center items-center flex-col text-green-600">
                        <div className="stat-title font-bold text-xl">Positive-Feedback</div>
                        <div className="stat-value">{goodfeedback.length}</div>
                        <div className="stat-desc">({(goodfeedback.length / allfeedback.length) * 100 || 0}%)</div>
                    </div>

                    <div className="stat flex justify-center items-center flex-col text-red-600">
                        <div className="stat-title font-bold text-xl">Negative-Feedback</div>
                        <div className="stat-value">{badfeedback.length}</div>
                        <div className="stat-desc">({(badfeedback.length / allfeedback.length) * 100 || 0}%)</div>
                    </div>
                </div>
            </div>

            <div className="divider p-5">Feedbacks</div>

            <div className='w-full grid grid-cols-6 justify-center items-center gap-5 mt-4'>
                <div className='md:col-span-3 col-span-6 flex justify-center items-center p-5'>
                    <button className="" onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <div className="bg-base-100 w-full shadow-2xl">
                            <div className="card-body">
                                <h2 className="card-title flex justify-center items-center font-bold text-green-600">Good-Feedback</h2>
                                <p>{goodsummary}</p>
                            </div>
                        </div>
                    </button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box w-11/12 max-w-7xl">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg text-green-600">Positive-Feedback</h3>
                            <div className="py-4"><Allfeedback data={goodfeedback} /></div>
                        </div>
                    </dialog>
                </div>

                <div className='md:col-span-3 col-span-6 flex justify-center items-center p-5'>
                    <button className="" onClick={() => document.getElementById('my_modal_2').showModal()}>
                        <div className="bg-base-100 w-full shadow-2xl">
                            <div className="card-body">
                                <h2 className="card-title flex justify-center items-center font-bold text-red-600">Negative-Feedback</h2>
                                <p>{badsummary}</p>
                            </div>
                        </div>
                    </button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box w-11/12 max-w-7xl">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg text-red-600">Negative-Feedback</h3>
                            <div className="py-4"><Allfeedback data={badfeedback} /></div>
                        </div>
                    </dialog>
                </div>
            </div>

            <div className="flex justify-center items-center mt-10 space-x-4">
                <button
                    className="btn btn-primary"
                    onClick={analyziefeedback}
                >
                    Analyze Feedback
                </button>
                <button
                    className="btn btn-secondary"
                    onClick={handlesummarizefeedback}
                >
                    Summarize Feedback
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
    