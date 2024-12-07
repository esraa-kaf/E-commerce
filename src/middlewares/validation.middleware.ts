import {NextFunction, Request, RequestHandler, Response} from 'express';
import {validationResult} from 'express-validator';

const validationMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    } else {
        next();
    }
};

export default validationMiddleware;