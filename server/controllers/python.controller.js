import { spawn } from 'child_process';

const handletrigger = async () => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['script.py']);

        let pythonOutput = '';

        // Capture output from Python script
        pythonProcess.stdout.on('data', (data) => {
            pythonOutput += data.toString();
        });

        // Handle errors from Python script
        pythonProcess.stderr.on('data', (error) => {
            console.error(`Python error: ${error}`);
            reject(`Error from Python script: ${error}`);
        });

        // Resolve the output when Python script finishes
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                resolve(pythonOutput.trim());
            } else {
                reject(`Python process exited with code ${code}`);
            }
        });
    });
};

export {handletrigger};
