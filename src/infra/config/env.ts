import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.number().default(3000)
})
export const env = envSchema.parse(process.env)
