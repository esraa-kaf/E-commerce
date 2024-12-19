import {Request, Response, Router} from 'express';
import passport from "passport";
import './google.service'
const googleRouter: Router = Router();
googleRouter.get('/', passport.authenticate('google', {scope: ['profile', 'email']}));
googleRouter.get('/callback', passport.authenticate('google', {session: false}), (req: Request, res: Response) => {
    const token = req.user.token;
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict', // same domain 
        maxAge: 24 * 60 * 60 * 1000 // time of cookie
    });

    res.status(200).redirect(`http://localhost:3000`)
});

export default googleRouter;