import { Router } from "express";
import { registerUser,verifyemailcode ,loginUser,logoutUser} from "../controllers/user.controller.js";
import authverfication from "../middlewares/auth.middlewares.js";
import { feedbackcollection } from "../controllers/feedback.controller.js";
const router=Router();

router.route('/register').post(registerUser);

router.route('/veficationcode').post(verifyemailcode);

router.route('/login').post(loginUser);

router.route('/logout').post(authverfication,logoutUser);

router.route('/feedback').post(authverfication,feedbackcollection);

export default router;