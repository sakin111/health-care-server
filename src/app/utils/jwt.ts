import { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken"

export const generateToken = (payload:JwtPayload,secret:Secret,expiresIn : string,) =>{
    const token = jwt.sign(payload,secret,{
        expiresIn
    } as SignOptions)
    return token
}

 export const verifyTokens = (token: string , secret: Secret) =>{
    const verifiedToken = jwt.verify(token,secret) as JwtPayload
    return verifiedToken
}