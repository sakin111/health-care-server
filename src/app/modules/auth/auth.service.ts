import { Request } from "express"
import { prisma } from "../../shared/prisma"

import bcrypt from "bcryptjs"
import { fileUploader } from "../../helper/fileUploader"


const login = async (req: Request) => {
 
};


export const AuthService = {
login
}