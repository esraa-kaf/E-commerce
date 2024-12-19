import jwt from 'jsonwebtoken';

class CreateTokens {
    accessToken = (id: any, role: string) =>
        jwt.sign({_id: id, role}, process.env.SECRET_KEY!, {expiresIn: process.env.EXPIRE_TIME})
    resetToken = (id: any) =>
        jwt.sign({_id: id}, process.env.SECRET_KEY_RESET!, {expiresIn: process.env.EXPIRE_TIME_RESET})
}


const createTokens = new CreateTokens();
export default createTokens;