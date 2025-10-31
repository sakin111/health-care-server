import z from "zod";


const createPatientSchema = z.object({
    password: z.string(),
    patient:z.object({
    name: z.string(),
    email: z.email(),
    address: z.string().optional()
    })
})


export const userValidation = {
    createPatientSchema
}