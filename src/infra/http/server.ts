import fastify from 'fastify'
import z from 'zod'

import { MakeTransfer } from '@/domain/bank/usecases/make-transfer'

import { env } from '../config/env'
import { PrismaConnection } from '../database/prisma/connection'
import { PrismaDataUtils } from '../database/prisma/prisma-data-utils'
import { PrismaTransferRepository } from '../database/prisma/prisma-transfer-repository'
import { PrismaUserRepository } from '../database/prisma/prisma-user-repository'
import { PrismaWalletRepository } from '../database/prisma/prisma-wallet-repository'

const server = fastify()

const prisma = new PrismaConnection()
const dataUtils = new PrismaDataUtils(prisma)
const userRepository = new PrismaUserRepository(prisma)
const walletRepository = new PrismaWalletRepository(prisma, dataUtils)
const transferRepository = new PrismaTransferRepository(prisma, dataUtils)
const makeTransfer = new MakeTransfer(userRepository, walletRepository, transferRepository, dataUtils)

server.post('/transaction', async (request) => {
  const bodySchema = z.object({
    value: z.coerce.number().min(0),
    payerId: z.string(),
    payeeId: z.string()
  })
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
