import { inject, injectable } from 'tsyringe'

import { type DataUtils } from '../contracts/data-utils'
import { type TransferRepository } from '../contracts/repositories/TransferRepository'
import { type UserRepository } from '../contracts/repositories/UserRepository'
import { type WalletRepository } from '../contracts/repositories/WalletRepository'
import { Transfer } from '../entities/transfer'
import { UserType } from '../entities/user-types'

interface MakeTransferParams {
  payerId: string
  payeeId: string
  amount: number
}

@injectable()
export class MakeTransfer {
  constructor (
    @inject('UserRepository')
    private readonly userRepository: UserRepository,
    @inject('WalletRepository')
    private readonly walletRepository: WalletRepository,
    @inject('TransferRepository')
    private readonly transferRepository: TransferRepository,
    @inject('DataUtils')
    private readonly dataUtils: DataUtils
  ) {}

  async execute (params: MakeTransferParams): Promise<void> {
    if (params.payeeId === params.payerId) throw new Error('Payer and payee cannot be the same user')

    const payerUser = await this.userRepository.getUserById(params.payerId)

    console.log(payerUser)
    if (!payerUser) throw new Error('Payer not found')
    if (payerUser.type === UserType.SHOPKEEPER) throw new Error('Payer cannot make a transfer, because it is a shopkeeper')

    const payerWallet = await this.walletRepository.getWalletByUserId(params.payerId)
    if (!payerWallet) throw new Error('Payer not found')

    const payeeWallet = await this.walletRepository.getWalletByUserId(params.payeeId)
    if (!payeeWallet) throw new Error('Payee not found')

    payerWallet.withdraw(params.amount)
    payeeWallet.deposit(params.amount)

    const transfer = new Transfer({
      payerId: params.payerId,
      payeeId: params.payeeId,
      amount: params.amount
    })

    try {
      await this.dataUtils.beginTransaction()

      await this.walletRepository.save(payerWallet)
      await this.walletRepository.save(payeeWallet)
      await this.transferRepository.save(transfer)

      await this.dataUtils.commitTransaction()
    } catch (err) {
      await this.dataUtils.rollbackTransaction()
    }
  }
}
