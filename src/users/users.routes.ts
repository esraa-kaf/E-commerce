import  { Router } from 'express';
import usersValidation from './users.validation';
import usersService from './users.service';
const usersRouter:Router = Router();


usersRouter.post('/',usersService.uploadImage,usersService.saveImage,usersValidation.createOne, usersService.createOne)
usersRouter.get('/', usersService.getAll)
usersRouter.get('/:id',usersValidation.getOne, usersService.getOne)
usersRouter.put('/:id',usersService.uploadImage,usersService.saveImage,usersValidation.updateOne ,usersService.updateOne)
usersRouter.delete('/:id',usersValidation.deleteOne , usersService.deleteOne)
usersRouter.put('/:id/change-password', usersValidation.changePassword, usersService.changePassword)






export default usersRouter;