import { PrismaClient, type PrismaPromise } from '@prisma/client'

import { type DataUtils } from '@/domain/bank/contracts/data-utils'

export class PrismaConnection extends PrismaClient implements DataUtils {
  transaction = false
  transactionOperations: Array<PrismaPromise<any>> = []

  async beginTransaction (): Promise<void> {
    this.transaction = true
  }

  async executeOperation (operation: PrismaPromise<any>): Promise<void> {
    if (!this.transaction) await operation

    this.transactionOperations.push(operation)
  }

  async commitTransaction (): Promise<void> {
    if (this.transaction) {
      await this.$transaction(this.transactionOperations)
    }
  }

  async rollbackTransaction (): Promise<void> {
    this.transaction = false
    this.transactionOperations = []
  }
}
