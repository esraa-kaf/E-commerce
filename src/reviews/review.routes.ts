import {Router} from 'express';
import authService from '../auth/auth.service';
import reviewsService from './review.service';
import reviewsValidation from './review.validation';


const reviewsRouter: Router = Router({mergeParams: true});


reviewsRouter.get('/',reviewsService.filterReviews, reviewsService.getAll)
reviewsRouter.post('/',authService.protectedRoutes, authService.checkActive, authService.allowedTo('user'), reviewsService.setIds, reviewsValidation.createOne, reviewsService.createOne);

reviewsRouter.get('/my', authService.protectedRoutes, authService.checkActive, authService.allowedTo('user'), reviewsService.filterReviews, reviewsService.getAll);

    
    reviewsRouter.get('/:id',reviewsValidation.getOne, reviewsService.getOne)
    reviewsRouter.get('/:id', authService.protectedRoutes, authService.checkActive, authService.allowedTo('user'), reviewsValidation.updateOne, reviewsService.updateOne)
    reviewsRouter.delete('/:id',authService.protectedRoutes, authService.checkActive, authService.allowedTo('user', 'employee', 'admin'), reviewsValidation.deleteOne, reviewsService.deleteOne);

export default reviewsRouter;