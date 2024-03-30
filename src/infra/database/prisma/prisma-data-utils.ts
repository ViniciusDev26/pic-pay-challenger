import { type PrismaPromise } from '@prisma/client'

import { type DataUtils } from '@/domain/bank/contracts/data-utils'

import { type PrismaConnection } from './connection'

export class PrismaDataUtils implements DataUtils {
  constructor (
    private readonly prisma: PrismaConnection
  ) {}

  transaction = false
  transactionOperations: Array<PrismaPromise<any>> = []

  async beginTransaction (): Promise<void> {
    this.transaction = true
  }

  async executeOperation (operation: unknown): Promise<void> {
    const promise = operation as PrismaPromise<any>
    if (!this.transaction) await promise

    this.transactionOperations.push(promise)
  }

  async commitTransaction (): Promise<void> {
    if (this.transaction) {
      await this.prisma.$transaction(this.transactionOperations)
    }
  }

  async rollbackTransaction (): Promise<void> {
    this.transaction = false
    this.transactionOperations = []
  }
}
