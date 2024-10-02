import { Router } from "express";
import { userinfo,registerUser, verifyemailcode, loginUser, logoutUser } from "../controllers/user.controller.js";
import authverfication from "../middlewares/auth.middlewares.js";
import { feedbackcollection, feedbackformcreation, feedbackformdelete, formcollection,apigenerate,apifeedback,apidelete } from "../controllers/feedback.controller.js";
import { allfeedback ,allsummary} from "../controllers/data.controller.js";

const router = Router();

router.route('/userinfo').post(authverfication, userinfo);

router.route('/register').post(registerUser);

router.route('/veficationcode/:id').post(verifyemailcode);

router.route('/login').post(loginUser);

router.route('/logout').post(authverfication, logoutUser);

router.route('/directfeedback').post(authverfication, feedbackcollection);

router.route('/feedbackformcreation').post(authverfication, feedbackformcreation);

router.route('/feedbackformdelete').post(authverfication, feedbackformdelete);

router.route('/form/:id/:verficationcode').post(formcollection);

router.route('/apigenerate').post(authverfication,apigenerate);

router.route('/:id/:tokenid').post(apifeedback);

router.route('/apidelete').post(authverfication, apidelete);

router.route('/allfeedback').post(authverfication,allfeedback);

router.route('/allsummary').post(authverfication,allsummary);
export default router;