import { addMinutes,addHours, format } from "date-fns";
import { prisma } from "../../shared/prisma";
import { IOption, paginationHelper } from "../../helper/calculatePagination";
import { Prisma } from "@prisma/client";
import { IJwtPayload } from "../../Types/common";


const insertIntoDb = async (payload:any) => {
  const {startTime,endTime, startDate, endDate} = payload;
  const intervalTime = 30
  const schedules : any = []
  const currentDate = new Date(startDate)
  const lastDate = new Date(endDate)

  while(currentDate <= lastDate){
    const startDateTime = new Date(
        addMinutes(
            addHours(
                `${format(currentDate, 'yyyy-MM-dd')}`,
                Number(startTime.split(":")[0])
            ),
              Number(startTime.split(":")[1])
        )
    )
    const endDateTime = new Date(
        addMinutes(
            addHours(
                `${format(currentDate,'yyyy-MM-dd')}`,
                Number(endTime.split(":")[0])
            ),
            Number(endTime.split(":")[1])
        )
    )

    while(startDateTime < endDateTime){
        const slotStartDateTime = startDateTime
        const slotEndDateTime = addMinutes(startDateTime, intervalTime)

        const scheduleData = {
            startDateTime: slotStartDateTime,
            endDateTime: slotEndDateTime
        }

        const existingSchedule = await prisma.schedule.findFirst({
            where:scheduleData
        })
        if(!existingSchedule){
            const result = await prisma.schedule.create({
                data: scheduleData
            })
        }
        slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + intervalTime)
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return schedules
};



const scheduleForDoctor = async (option:IOption, filter:any, user: IJwtPayload) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(option);
  const {startDateTime:filterStart, endDateTime: filterEnd} = filter;
    const andConditions: Prisma.ScheduleWhereInput[] = [];
  if(filterStart && filterEnd){
    andConditions.push({
        AND:[
            {
                startDateTime:{
                    gte:filterStart
                }
            },
            {
                endDateTime:{
                    lte:filterEnd
                }
            }
        ]
    })
  }
    const whereConditions: Prisma.ScheduleWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}

    const doctorSchedules = await prisma.doctorSchedules.findMany({
        where:{
            doctor:{
                email:user.email
            }
        },
        select:{
            scheduleId:true
        }
    })

    const scheduleIds = doctorSchedules.map(schedule => schedule.scheduleId)

       const result = await prisma.schedule.findMany({
        skip,
        take: limit,

        where: {
            ...whereConditions,
            id:{
                notIn: scheduleIds
            }
        },
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = await prisma.schedule.count({
           where: {
            ...whereConditions,
            id:{
                notIn: scheduleIds
            }
        },
    })
      return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};

const deleteScheduleFromDb = async (id:string) =>{
  return await prisma.schedule.delete({
    where:{
        id
    }
  })
}


export const schedulesService = {
insertIntoDb,
scheduleForDoctor,
deleteScheduleFromDb

}