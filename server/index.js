import dotenv from "dotenv";
import { app } from './app.js';
import connectDB from './database/dbconnection.js';
dotenv.config({
    path: '../.env'
})



const PORT = process.env.PORT;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })


