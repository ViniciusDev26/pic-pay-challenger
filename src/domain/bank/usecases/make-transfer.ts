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

export class MakeTransfer {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly walletRepository: WalletRepository,
    private readonly transferRepository: TransferRepository,
    private readonly dataUtils: DataUtils
  ) {}

  async execute (params: MakeTransferParams): Promise<void> {
    const payerUser = await this.userRepository.getUserById(params.payerId)
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
