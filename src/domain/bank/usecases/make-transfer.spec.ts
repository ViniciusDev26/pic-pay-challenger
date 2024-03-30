import { test } from 'vitest'

import { PrismaConnection } from '@/infra/database/prisma/connection'
import { PrismaTransferRepository } from '@/infra/database/prisma/prisma-transfer-repository'
import { PrismaUserRepository } from '@/infra/database/prisma/prisma-user-repository'
import { PrismaWalletRepository } from '@/infra/database/prisma/prisma-wallet-repository'

import { MakeTransfer } from './make-transfer'

const dataUtil = new PrismaConnection()
const userRepository = new PrismaUserRepository(dataUtil)
const walletRepository = new PrismaWalletRepository(dataUtil)
const transferRepository = new PrismaTransferRepository(dataUtil)
const makeTransfer = new MakeTransfer(userRepository, walletRepository, transferRepository, dataUtil)

test('make transfer', async () => {
  await makeTransfer.execute({
    payerId: '1',
    payeeId: '2',
    amount: 100
  })
})
