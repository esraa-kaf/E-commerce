import asyncHandler from "express-async-handler";
import { Response,Request,NextFunction } from 'express';
import refactorService from '../../refactor.service';
import ApiErrors from '../../utils/api.Errors';
import usersSchema from "../users/users.schema";
import { Users } from "../users/users.interface";
import sharp from "sharp";
import bcrypt from 'bcryptjs';
import { uploadSingleFile } from "../middlewares/uploadFile.middleware";
import createTokens from "../../utils/token";



class ProfileService{
    getOne= refactorService.getOne<Users>(usersSchema);
    setUserId = (req: Request, res: Response, next: NextFunction) => {
        req.params.id = req.user?._id;
        next();
    };
    updateOne= asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: Users | null = await usersSchema.findByIdAndUpdate(req.user._id, {
            name: req.body.name,
            image: req.body.image,
          
        }, {new: true});
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({data: user});
    });
    deleteOne=refactorService.deleteOne<Users>(usersSchema);
    /////////////////////////////////////////////////////////////////////////
    changePassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: Users | null = await usersSchema.findByIdAndUpdate(req.params.id, {
            password: await bcrypt.hash(req.body.password, 13),
            passwordChangedAt: Date.now(),
        }, {new: true});
    const token = createTokens.accessToken(user?._id, user?.role!);
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({token,data: user});
    });
    ///////////////////////////////
    createPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: Users | null = await usersSchema.findOneAndUpdate(           
          {  _id: req.user._id, hasPassword: false  },     
          {password: await bcrypt.hash(req.body.password, 13)},
          {new: true});
        
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({data: user});
    });

    uploadImage = uploadSingleFile(['image'], 'image');
    saveImage = async (req: Request, res: Response, next: NextFunction) => {
        if (req.file) {
            const fileName: string = `user-${Date.now()}-image.webp`;
            await sharp(req.file.buffer)
                .resize(1200, 1200)
                .webp({quality: 95})
                .toFile(`upload/image/users/${fileName}`);
            req.body.image = fileName;
        }
        next();
    }

}
// اسم الكلااس لازم يبقى حرف كابيتال
const profileService =new ProfileService()
export  default profileService;

