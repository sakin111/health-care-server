import { Request } from "express"
import { prisma } from "../../shared/prisma"

import bcrypt from "bcryptjs"
import { fileUploader } from "../../helper/fileUploader"
import { paginationHelper } from "../../helper/calculatePagination";
import { Prisma, UserRole } from "@prisma/client";
import { userSearchField } from "./user.constant";
import config from "../../../config";


const createPatient = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file); 
    req.body.patient.profilePhoto = uploadResult?.secure_url;
  }

  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const result = await prisma.$transaction(async (tnx) => {
   const user = await tnx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashPassword,
      },
    });

  const patient =   await tnx.patient.create({
      data: req.body.patient,
    });

     return { user, patient };
  });

  return result;
};


const createDoctor = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file); 
    req.body.patient.profilePhoto = uploadResult?.secure_url;
  }

  const hashPassword = await bcrypt.hash(req.body.password, config.jwt_salt);

      const userData = {
        email: req.body.doctor.email,
        password: hashPassword,
        role: UserRole.DOCTOR
    }

  
  const result = await prisma.$transaction(async (tnx) => {
   const user = await tnx.user.create({
      data:userData
    });

  const doctor =   await tnx.doctor.create({
      data: req.body.doctor,
    });

     return { user, doctor };
  });

  return result;
};
const createAdmin = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file); 
    req.body.patient.profilePhoto = uploadResult?.secure_url;
  }

  const hashPassword = await bcrypt.hash(req.body.password, config.jwt_salt);
      const userData = {
        email: req.body.admin.email,
        password: hashPassword,
        role: UserRole.ADMIN
    }
  const result = await prisma.$transaction(async (tnx) => {
   const user = await tnx.user.create({
      data:userData
    });

  const admin = await tnx.admin.create({
      data: req.body.admin,
    });

     return { user, admin };
  });

  return result;
};

const getAllUser = async(params:any, option:any) =>{
const {page, skip, sortBy,sortOrder,limit} = paginationHelper.calculatePagination(option)

const andCondition : Prisma.UserWhereInput[] = []

const {searchTerm, ...filterData} = params

if(searchTerm){
  OR: userSearchField.map(field => ({
    [field]:{
      contains: searchTerm,
      mode: "insensitive"
    }
  }))
}

if(Object.keys(filterData).length > 0){
  andCondition.push({
    AND:Object.keys(filterData).map(key => ({
      [key]:{
        equals: (filterData as any)[key]
      }
    }))
  })
}


    const whereConditions: Prisma.UserWhereInput = andCondition.length > 0 ? {
        AND: andCondition
    } : {}

  const result = await prisma.user.findMany({
    skip,
    take:limit,

    where:{
      AND: andCondition
    },
    orderBy:{
      [sortBy] : sortOrder
    }


  });

 const total = await prisma.user.count({
   where: whereConditions
 })


  return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
}


export const UserService = {
createPatient,
createDoctor,
createAdmin,
 getAllUser 
}