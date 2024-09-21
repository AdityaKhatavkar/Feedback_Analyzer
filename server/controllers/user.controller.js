import Asynchandler from "../utils/Asynchandler.js"
import ApiError from "../utils/ApiError.js"
import sendverficationcode from "../utils/mailverfication.js";
import User from "../models/user.model.js";
import ApiRespoance from "../utils/ApiResponse.js";


const registerUser = Asynchandler(async (req, res) => {

    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {

        throw new ApiError(400, "Please provide all fields")

    }

    const checkusername = await User.findOne({ username });

    if (checkusername) {

        throw new ApiError(400, "Username already exists")
    }

    const checkemail = await User.findOne({ email });

    if (checkemail) {

        throw new ApiError(400, "Email already exists")

    }
    const code = Math.floor(100000 + Math.random() * 900000);

    const verficationcode = code.toString();

    try {
        sendverficationcode(email, verficationcode);
        
        const user = await User.create(
            {
                name,
                username,
                email,
                password,
                verficationcode
            });

        const finaluser=await User.findById(user._id).select("-password -RefreshToken -verficationcode");
        res
            .status(201)
            .json(
                new ApiRespoance(201, finaluser, "user created")
            );
    }
    catch (error) {
        throw new ApiError(400, "problem in registering user")
    }
})

const verifyemailcode = Asynchandler(async (req, res) => {

    const { verficationcode, email } = req.body;

    if (!verficationcode) {
        throw new ApiError(400, "Please provide verfication code");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "Invalid user");
    }
    if (user.verficationcode !== verficationcode) {
        throw new ApiError(400, "Invalid verfication code");
    }
    user.emailverfied = true;

    user.verficationcode = "";

    await user.save();
    const finaluser=await User.findById(user._id).select("-password -RefreshToken -verficationcode");
    res
        .status(200)
        .json(
            new ApiRespoance(200, finaluser, "user verfied")
        );

});

const loginUser = Asynchandler(async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "Please provide all fields")
    }

    const user = await User.findOne({ username });

    const checkpassword = await user.ispasswordcorrect(password)

    if (!checkpassword) {
        throw new ApiError(400, "Invalid password")
    }

    const finaluser=await User.findById(user._id).select("-password -RefreshToken -verficationcode");


    if (user.emailverfied === false) {

        res.status(400).json(
            new ApiRespoance(400, finaluser, "Please verify your email")
        );

        throw new ApiError(400, "Please verify your email")
    }

    const RefreshToken = await user.getJwtToken();

    user.RefreshToken = RefreshToken;

    await user.save();

    res
        .status(200)
        .cookie("RefreshToken", RefreshToken,
         {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24
        }
    )
        .json(new ApiRespoance(200, finaluser, "user logged in"))

});

const logoutUser = Asynchandler(async (req, res) => {
    
    const user = await User.findById(req.user._id)

    if (!user) {
      throw new ApiError(400, "user is not found")
    }
  
    await User.updateOne({ _id: user._id }, { RefreshToken: undefined });
  
    const logoutuser = await User.findById(user._id).select("-password -RefreshToken")
  
    if (!logoutuser) {
      throw new ApiError(400, "logout user in not found")
    }

    const options = {
      httpOnly: true,
      secure: true
    }
  
  
    return res
      .status(200)
      .clearCookie("RefreshToken", options)
      .json(
        new ApiRespoance(
          200,
          logoutuser,
          "user logout"
        )
      )
})

export { registerUser, verifyemailcode,loginUser,logoutUser };