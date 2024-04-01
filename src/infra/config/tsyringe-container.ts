import { container as tsyringeContainer } from 'tsyringe'

import { type DataUtils } from '@/domain/bank/contracts/data-utils'
import { type TransferRepository } from '@/domain/bank/contracts/repositories/TransferRepository'
import { type UserRepository } from '@/domain/bank/contracts/repositories/UserRepository'
import { type WalletRepository } from '@/domain/bank/contracts/repositories/WalletRepository'

import { PrismaConnection } from '../database/prisma/connection'
import { PrismaDataUtils } from '../database/prisma/prisma-data-utils'
import { PrismaTransferRepository } from '../database/prisma/prisma-transfer-repository'
import { PrismaUserRepository } from '../database/prisma/prisma-user-repository'
import { PrismaWalletRepository } from '../database/prisma/prisma-wallet-repository'

export const container = tsyringeContainer

container.register<PrismaConnection>(PrismaConnection, {
  useClass: PrismaConnection
})

container.register<TransferRepository>('TransferRepository', {
  useClass: PrismaTransferRepository
})

container.register<UserRepository>('UserRepository', {
  useClass: PrismaUserRepository
})

container.register<WalletRepository>('WalletRepository', {
  useClass: PrismaWalletRepository
})

container.register<DataUtils>('DataUtils', {
  useClass: PrismaDataUtils
})
