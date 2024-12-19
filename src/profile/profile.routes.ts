import  { Router } from 'express';
import profileValidation from './profile.validation';
import profileService from './profile.service';
import authService from '../auth/auth.service';
const profileRouter:Router = Router();
profileRouter.use(authService.protectedRoutes, authService.checkActive);

profileRouter.get('/',profileService.setUserId ,profileService.getOne)
profileRouter.put('/',profileService.uploadImage,profileService.saveImage,profileValidation.updateOne ,profileService.updateOne)
profileRouter.delete('/',authService.allowedTo('user'),profileValidation.deleteOne , profileService.deleteOne)
profileRouter.put('/change-password', profileValidation.changePassword, profileService.changePassword)
profileRouter.put('/create-password', profileValidation.createPassword, profileService.changePassword)






export default profileRouter;