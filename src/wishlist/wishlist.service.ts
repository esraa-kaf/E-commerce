import asyncHandler from "express-async-handler";
import { Response,Request,NextFunction } from 'express';
import ApiErrors from '../../utils/api.Errors';
import usersSchema from "../users/users.schema";
import { Users } from "../users/users.interface";




class WishlistService{
    getWishlist = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: Users | null = await usersSchema.findById(req.user._id).populate('wishlist');
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({length: user.wishlist.length, data: user.wishlist});
    });

    /////////////////////////////////////////////
    addToWishlist = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: Users | null = await usersSchema.findByIdAndUpdate(req.user._id, {$addToSet: {wishlist: req.body.productId}}, {new: true});
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        await user.populate('wishlist');
        res.status(200).json({length: user.wishlist.length, data: user.wishlist});
    });
    //////////////////////////////////////
    deleteFromWishlist = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: Users | null = await usersSchema.findByIdAndUpdate(req.user._id, {$pull: {wishlist: req.params.productId}}, {new: true});
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        await user.populate('wishlist');
        res.status(200).json({length: user.wishlist.length, data: user.wishlist});
    });
 
  


}
// اسم الكلااس لازم يبقى حرف كابيتال
const wishlistService =new WishlistService()
export  default wishlistService;

