import { type PrismaClient } from '@prisma/client'

import { type TransferRepository } from '@/domain/bank/contracts/repositories/TransferRepository'
import { type Transfer } from '@/domain/bank/entities/transfer'

export class PrismaTransferRepository implements TransferRepository {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async save (transfer: Transfer): Promise<void> {
    await this.prisma.transfer.upsert({
      where: {
        id: transfer.id.value
      },
      update: {
      },
      create: {
        id: transfer.id.value,
        payerId: transfer.payerId,
        payeeId: transfer.payeeId,
        amount: transfer.amount
      }
    })
  }
}
