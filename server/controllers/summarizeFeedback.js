import { spawn } from 'child_process';

async function summarizeFeedback(feedbacks) {
    return new Promise((resolve, reject) => {
        // Spawn the Python process
        const pythonProcess = spawn('python', ['summarize_feedback.py']);

        // Send the feedbacks data to Python
        pythonProcess.stdin.write(JSON.stringify(feedbacks));
        pythonProcess.stdin.end();

        let result = '';
        let error = '';

        // Handle Python script output
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        // Handle Python script errors
        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        // Handle process close
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    resolve(JSON.parse(result)); // Parse Python's JSON response
                } catch (err) {
                    reject(`Error parsing Python response: ${err}`);
                }
            } else {
                reject(`Python process exited with code ${code}: ${error}`);
            }
        });

        // Handle unexpected process errors
        pythonProcess.on('error', (err) => {
            reject(`Failed to start Python process: ${err}`);
        });
    });
}

export default summarizeFeedback;
