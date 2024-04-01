import 'reflect-metadata'

import fastify from 'fastify'
import z from 'zod'

import { MakeTransfer } from '@/domain/bank/usecases/make-transfer'

import { env } from '../config/env'
import { container } from '../config/tsyringe-container'

const server = fastify()

const makeTransfer = container.resolve(MakeTransfer)

server.post('/transaction', async (request) => {
  const bodySchema = z.object({
    value: z.coerce.number().min(0),
    payerId: z.string(),
    payeeId: z.string()
  })
  console.log(makeTransfer)
  const data = bodySchema.parse(request.body)

  await makeTransfer.execute({
    ...data,
    amount: data.value
  })
})

server.listen({
  port: env.PORT
}, () => {
  console.log('Server is running on port 3000')
})
