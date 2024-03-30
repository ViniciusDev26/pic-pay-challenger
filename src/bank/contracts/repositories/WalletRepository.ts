import { type Wallet } from '../../entities/wallet'

export interface WalletRepository {
  getWalletByUserId: (userId: string) => Promise<Wallet | null>
  save: (wallet: Wallet) => Promise<void>
}
