import { Request } from "express";
import { prisma } from "../../shared/prisma";
import { IJwtPayload } from "../../Types/common";



const doctorInsertIntoDb = async (payload:{scheduleId:string[]}, user:IJwtPayload) => {
    
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where:{
            email: user.email
        }
    })
    const doctorScheduleData = payload.scheduleId.map(scheduleId =>({
        doctorId: doctorData.id,
        scheduleId: scheduleId
    }))

   return await prisma.doctorSchedules.createMany({
        data: doctorScheduleData
    })

}





export const doctorScheduleService = {
doctorInsertIntoDb
}