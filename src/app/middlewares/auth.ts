import { NextFunction, Request, Response } from "express"
import { verifyTokens } from "../utils/jwt"
import config from "../../config"
import ApiError from "../error/ApiError"
import httpStatus from "http-status"


const auth = (...roles: string[]) =>{
  return  async (req:Request& {user?: any}, res:Response, next: NextFunction) =>{
        try {
            const token = req.cookies.accessToken
            if(!token){
                throw new ApiError(httpStatus.UNAUTHORIZED,"token is missing")
            }
            const verify = verifyTokens(token, config.jwt_secret as string)
            req.user = verify

            if(roles.length && !roles.includes(verify.role)){
                 throw new ApiError(httpStatus.UNAUTHORIZED,"you are not authorized")
            }
            next()
        } catch (error) {
            console.log(error,"auth middleware error")
            next(error)
        }
    }
}

export default auth;