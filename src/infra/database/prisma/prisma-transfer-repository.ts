import { inject, injectable } from 'tsyringe'

import { type DataUtils } from '@/domain/bank/contracts/data-utils'
import { type TransferRepository } from '@/domain/bank/contracts/repositories/TransferRepository'
import { type Transfer } from '@/domain/bank/entities/transfer'

import { PrismaConnection } from './connection'

@injectable()
export class PrismaTransferRepository implements TransferRepository {
  constructor (
    @inject(PrismaConnection)
    private readonly prisma: PrismaConnection,
    @inject('DataUtils')
    private readonly dataUtils: DataUtils
  ) {}

  async save (transfer: Transfer): Promise<void> {
    const promise = this.prisma.transfer.upsert({
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

    await this.dataUtils.executeOperation(promise)
  }
}
