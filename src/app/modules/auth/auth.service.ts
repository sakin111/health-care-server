
import { prisma } from "../../shared/prisma";
import { UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs"
import { generateToken } from "../../utils/jwt";
import config from "../../../config";





const login = async (payload: {email:string, password :string}) => {
 const user = await prisma.user.findFirstOrThrow({
    where:{
        email:payload.email,
        status: UserStatus.ACTIVE
    }
 })
 const validatePassword = await bcrypt.compare(payload.password, user.password)
 if(!validatePassword){
    throw new Error("password is incorrect")
 }

 const userPayload = {
    email:payload.email,
    role:user.role
 }

 const accessToken = await generateToken(userPayload,config.jwt_secret as string, "1h")
 const refreshToken = await generateToken(userPayload,config.jwt_secret as string, "90d")

 return {
    accessToken,
    refreshToken,
    changePassword:user.needPasswordChange
 }
};


export const AuthService = {
login
}