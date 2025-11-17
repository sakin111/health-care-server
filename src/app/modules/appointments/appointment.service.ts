
import Stripe from "stripe";
import { prisma } from "../../shared/prisma";

import { IJwtPayload } from "../../Types/common";
import { v4 as uuidv4 } from 'uuid';
import { stripe } from "../../helper/stripe";


const createAppointment = async (user: IJwtPayload, payload: { doctorId: string, scheduleId: string }) => {
    const patientData = await prisma.patient.findUniqueOrThrow({
        where: {
            email: user.email
        }
    })
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            id: payload.doctorId,
            isDeleted: false
        }
    })

    const isBookedOrNot = await prisma.doctorSchedules.findFirstOrThrow({
        where: {
            doctorId: payload.doctorId,
            scheduleId: payload.scheduleId,
            isBooked: false
        }
    })

    const videoCallingId = uuidv4()

    const result = await prisma.$transaction(async (tnx) => {
        const appointmentData = await tnx.appointment.create({
            data: {
                patientId: patientData.id,
                doctorId: doctorData.id,
                scheduleId: payload.scheduleId,
                videoCallingId
            }
        })


        await tnx.doctorSchedules.update({
            where: {
                doctorId_scheduleId: {
                    doctorId: doctorData.id,
                    scheduleId: payload.scheduleId,
                }
            },
            data: {
                isBooked: true
            }
        })

        const transactionId = uuidv4()
        await tnx.payment.create({
            data:{
                appointmentId: appointmentData.id,
                amount: doctorData.appointmentFee,
                transactionId
            }
        })

        const session = await stripe.checkout.sessions.create({

            payment_method_types:['card'],
            mode:"payment",
            customer_email: user.email ,
    line_items: [
      {
       price_data:{
        currency:'usd',
        product_data:{
            name:`Appointment with Dr. ${doctorData.name}`
        },
           unit_amount:  doctorData.appointmentFee * 100
       },
       quantity:1
      },
    ],
    success_url: `https://github.com/sakin111`,
    cancel_url:`https://cloudinary.com/documentation/node_integration`
  });

        return appointmentData
    })


return result
};



export const AppointmentService = {
    createAppointment
}