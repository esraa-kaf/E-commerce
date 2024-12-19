import {Router} from 'express';
import authService from "./auth.service";
import authValidation from "./auth.validation";

const authRouter: Router = Router();

authRouter.post('/signup', authValidation.signup, authService.signUp);
authRouter.post('/login', authValidation.login, authService.logIn);
authRouter.post('/admin-login', authValidation.login, authService.adminLogin);
authRouter.post('/forget-password',authValidation.forgetPassword, authService.forgetPassword);
authRouter.post('/verify-code', authService.verifyResetCode);
authRouter.post('/reset-password', authValidation.changePassword,authService.resetPassword);

export default authRouter;
