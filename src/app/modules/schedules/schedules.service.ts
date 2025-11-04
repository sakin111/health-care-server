import { addMinutes,addHours, format } from "date-fns";


const insertIntoDb = async (payload:any) => {
  const {startTime,endTime, startDate, endDate} = payload;
  const intervalTime = 30
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
    }
  }
};




export const schedulesService = {
insertIntoDb
}