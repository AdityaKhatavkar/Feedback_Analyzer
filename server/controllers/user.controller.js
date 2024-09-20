import Asynchandler from "../utils/Asynchandler.js"

const registerUser = Asynchandler(async (req, res) => {
    console.log("register user");
    res.send("register user");
})


export {registerUser}