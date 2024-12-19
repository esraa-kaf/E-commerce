import bcrypt  from 'bcryptjs';
import crypto from 'crypto';
import  asyncHandler  from 'express-async-handler';
import { Request, Response , NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import usersSchema from '../users/users.schema';
import createTokens from '../../utils/token';
import sanitization from '../../utils/sanitization';
import ApiErrors from '../../utils/api.Errors';
import sendMail from '../../utils/sendMail';
class AuthService{
   signUp= asyncHandler(async(req:Request ,res:Response,next:NextFunction)=>{
    const user = await usersSchema.create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        image: req.body.image
    });
    const token = createTokens.accessToken(user._id, user.role);
    res.status(201).json({token, data: sanitization.User(user)});
           
   })
////////////////////////////////////////////////////////////////////////////
logIn = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersSchema.findOne({$or: [{username: req.body.username}, {email: req.body.username}]});
    if (!user || user.hasPassword == false || !(await bcrypt.compare(req.body.password, user.password)))
        return next(new ApiErrors(`${req.__('invalid_login')}`, 400));
    const token = createTokens.accessToken(user._id, user.role);
    res.status(200).json({token, data: sanitization.User(user)});
});
// إذا لم يتم العثور على المستخدم (!user)، أو إذا كان المستخدم لا يحتوي على كلمة مرور (ربما في حالة مستخدمين غير مُكملين بياناتهم أو حذف كلمة المرور من قاعدة البيانات)، أو إذا كانت كلمة المرور المدخلة لا تطابق كلمة مرور المستخدم في قاعدة البيانات:
//sanitization.User(user) يُستخدم لتنظيف بيانات المستخدم قبل إرسالها (مثل إزالة أو استبدال معلومات حساسة)
//createTokens.accessToken() ينشئ توكن JWT للمصادقة
////////////////////////////////////////////////////////////////////////////////////////

adminLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersSchema.findOne({
        $or: [{username: req.body.username}, {email: req.body.username}],
        role: {$in: ['admin', 'employee']}
    });
    if (!user || user.hasPassword == false || !(await bcrypt.compare(req.body.password, user.password)))
        return next(new ApiErrors(`${req.__('invalid_login')}`, 400));
    const token = createTokens.accessToken(user._id, user.role);
    res.status(200).json({token, data: sanitization.User(user)});
});

// بالإضافة إلى ذلك، يتم التأكد من أن المستخدم الذي يتم العثور عليه يجب أن يكون من نوع "admin" أو "employee" عن طريق role: {$in: ['admin', 'employee']}

////////////////////////////////////////////////////////////////////////////

//يتحقق من صحة التوكن (JWT)
//يتم فحص الـ Authorization header الذي يحتوي على التوكن المرسل من العميل (عادةً ما يكون في شكل "Bearer <token>").
// ذا كان هناك Authorization header ويبدأ بـ Bearer، يتم استخراج التوكن عن طريق تقسيمه من المسافة (split(' ')[1]).

////////////////////////////////////////////////////////////////////////////////////////////////////
protectedRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    else return next(new ApiErrors(`${req.__('check_login')}`, 401));
                                   ////////////////////////
    //بعد استخراج التوكن، يتم التحقق من صلاحيته باستخدام مكتبة jwt.verify(). يقوم هذا بتفكيك التوكن وتحديد ما إذا كان صحيحًا أم لا.
    //decoded يحتوي على المعلومات المستخلصة من التوكن (مثل معرف المستخدم _id
                                  
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);
                                    ////////////////////////////
    const user = await usersSchema.findById(decoded._id);
    if (!user) return next(new ApiErrors(`${req.__('check_login')}`, 401));


    //يقوم هذا الجزء بالتحقق إذا كانت هناك تاريخ تغيير كلمة المرور (passwordChangedAt) في بيانات المستخدم
    // decoded = _id , iat--- الوقت
    // decoded.iat = الوقت الذي تم التصديق به على التوكن (عادة�� ما يكون في الوقت الذي تم التصديق على التوكن)
    // user.passwordChangedAt = تاريخ تغيير كلمة المرور
    // decoded.iat > user.passwordChangedAt.getTime() / 1000 تفكيك التوقت الذي تم التغيير كلمة المرور في بيانات المستخدم ��ذا كانت هذه التاريخ أكبر من الوقت الذي تم التصديق به على التوكن
    // trunc = يقوم بتحويل تاريخ تغيير كلمة المرور إلى الوقت بالثواني (بعد حذف الكسر).
    if (user.passwordChangedAt instanceof Date) {
        const changedPasswordTime: number = Math.trunc(user.passwordChangedAt.getTime() / 1000);
        if (changedPasswordTime > decoded.iat) return next(new ApiErrors(`${req.__('check_password_changed')}`, 401));
    }

    req.user = user;
    next();
})
/////////////////////////////////////////////////////////////////////////////////////////////////
allowedTo = (...roles: string[]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) return next(new ApiErrors(`${req.__('allowed_to')}`, 403));
        next();
    })
    //////////////////////////////////////////////////////////////////////////////
    checkActive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user.active) return next(new ApiErrors(`${req.__('check_active')}`, 403));
        next();
    })    
////////////////////////////////////////////////////////////////////////////////////////////////
forgetPassword =asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const user: any = await usersSchema.findOne({email: req.body.email});
    if (!user) return next(new ApiErrors(`${req.__('check_email')}`, 404));
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const cryptedCode = crypto.createHash('sha256').update(resetCode).digest('hex');
    const message = `Your reset code is: ${resetCode}`;
    const options = {
        message,
        email: user.email,
        subject: 'Reset password'
    }
    try {
        await sendMail(options);
        user.passwordResetCode = cryptedCode;
        user.passwordResetCodeExpires = Date.now() + (15 * 60 * 1000);
        user.passwordResetCodeVerify = false;
        if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
        await user.save({validateModifiedOnly: true});
    } catch (e) {
        console.log(e);
        return next(new ApiErrors(`${req.__('send_email')}`, 500));
    }
    const token = createTokens.resetToken(user._id);
    res.status(200).json({token, success: true});

})
//////////////////////////////////////////////////////////////////////////////////////////////
verifyResetCode = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    else return next(new ApiErrors(`${req.__('check_verify_code')}`, 403));

    const decoded: any = jwt.verify(token, process.env.SECRET_KEY_RESET!);
    const hashedResetCode: string = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
    const user: any = await usersSchema.findOne({
        _id: decoded._id,
        passwordResetCode: hashedResetCode,
        passwordResetCodeExpires: {$gt: Date.now()}
    });
    if (!user) return next(new ApiErrors(`${req.__('check_code_valid')}`, 403));

    user.passwordResetCodeVerify = true;
    if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
    await user.save({validateModifiedOnly: true});

    res.status(200).json({success: true});
})
/////////////////////////////////////////////////////////////////////////////////////////////
resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    else return next(new ApiErrors(`${req.__('check_reset_code')}`, 403));

    const decoded: any = jwt.verify(token, process.env.SECRET_KEY_RESET!);
    const user: any = await usersSchema.findOne({
        _id: decoded._id,
        passwordResetCodeVerify: true,
    });
    if (!user) return next(new ApiErrors(`${req.__('check_code_verify')}`, 403));

    user.password = req.body.password;
    user.passwordResetCodeExpires = undefined;
    user.passwordResetCode = undefined;
    user.passwordResetCodeVerify = undefined;
    user.passwordChangedAt = Date.now();
    if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
    await user.save({validateModifiedOnly: true});

    res.status(200).json({success: true});
})



















}

const authService =new AuthService()
export default authService