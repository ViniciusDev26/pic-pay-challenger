import { test } from 'vitest'

import { PrismaConnection } from '@/infra/database/prisma/connection'
import { PrismaDataUtils } from '@/infra/database/prisma/prisma-data-utils'
import { PrismaTransferRepository } from '@/infra/database/prisma/prisma-transfer-repository'
import { PrismaUserRepository } from '@/infra/database/prisma/prisma-user-repository'
import { PrismaWalletRepository } from '@/infra/database/prisma/prisma-wallet-repository'

import { MakeTransfer } from './make-transfer'

const prisma = new PrismaConnection()
const dataUtils = new PrismaDataUtils(prisma)
const userRepository = new PrismaUserRepository(prisma)
const walletRepository = new PrismaWalletRepository(prisma, dataUtils)
const transferRepository = new PrismaTransferRepository(prisma, dataUtils)
const makeTransfer = new MakeTransfer(userRepository, walletRepository, transferRepository, dataUtils)

test('make transfer', async () => {
  await makeTransfer.execute({
    payerId: '1',
    payeeId: '2',
    amount: 100
  })
})
