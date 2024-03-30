import { UniqueEntityId } from '@/core/entities/UniqueEntityId'
import { type WalletRepository } from '@/domain/bank/contracts/repositories/WalletRepository'
import { Wallet } from '@/domain/bank/entities/wallet'

import { type PrismaConnection } from './connection'

export class PrismaWalletRepository implements WalletRepository {
  constructor (
    private readonly prisma: PrismaConnection
  ) {}

  async getWalletByUserId (userId: string): Promise<Wallet | null> {
    const wallet = await this.prisma.wallet.findFirst({
      where: {
        userId
      }
    })
    if (!wallet) return null

    return new Wallet({
      balance: wallet.balance,
      userId: new UniqueEntityId(wallet.userId)
    })
  }

  async save (wallet: Wallet): Promise<void> {
    const promise = this.prisma.wallet.upsert({
      where: {
        userId: wallet.userId.value
      },
      update: {
        balance: wallet.balance
      },
      create: {
        id: wallet.id.value,
        balance: wallet.balance,
        userId: wallet.userId.value
      }
    })

    await this.prisma.executeOperation(
      promise
    )
  }
}
