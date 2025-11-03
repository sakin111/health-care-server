import { NextFunction, Request, Response } from "express"
import { verifyTokens } from "../utils/jwt"


const auth = (...roles: string[]) =>{
  return  async (req:Request& {user?: any}, res:Response, next: NextFunction) =>{
        try {
            const token = req.cookies.accessToken
            if(!token){
                throw new Error("token is missing")
            }
            const verify = verifyTokens(token, "moonlight1")
            req.user = verify

            if(roles.length && !roles.includes(verify.role)){
                 throw new Error("you are not authorized")
            }
            next()
        } catch (error) {
            console.log(error,"auth middleware error")
            next(error)
        }
    }
}

export default auth;