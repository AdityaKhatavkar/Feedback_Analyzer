import { Router } from "express";
import { registerUser,verifyemailcode ,loginUser} from "../controllers/user.controller.js";


const router=Router();

router.route('/register').post(registerUser);
router.route('/veficationcode').post(verifyemailcode);
router.route('/login').post(loginUser);

export default router;