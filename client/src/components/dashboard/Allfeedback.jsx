import React from 'react';

function Allfeedback(data) {
    const feedbacks = data.data;

    const openGmailCompose = (email, feedbackText) => {
        const subject = `Response for your feedback: ${feedbackText}`;

        // HTML content as plain text for email body
        const body = `
            Thank you for your feedback!

            Dear user,

            We really appreciate you taking the time to provide feedback. Here is our response:

            Your Feedback:
            "${feedbackText}"

            We hope our response meets your expectations. If you have any more questions, feel free to reach out.

            Best Regards,
            Your Feedback Team
        `;

        // Encode the body and subject for URL passing
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.open(gmailUrl, "_blank");
    };

    return (
        <div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* Table Head */}
                        <thead>
                            <tr className="font-bold text-xl">
                                <th>#</th>
                                <th>Email</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((feedback, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <button
                                            onClick={() => openGmailCompose(feedback.email, feedback.feedback)}
                                            className="text-blue-500 hover:underline"
                                            style={{
                                                textDecoration: 'none',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {feedback.email}
                                        </button>
                                    </td>
                                    <td>{feedback.feedback}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Allfeedback;
