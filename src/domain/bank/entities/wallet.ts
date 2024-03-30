import { Entity } from '@/core/entities/Entity'

interface WalletProps {
  balance: number
  userId: string
}

export class Wallet extends Entity<WalletProps> {
  get balance (): number {
    return this.props.balance
  }

  get userId (): string {
    return this.props.userId
  }

  withdraw (amount: number): void {
    if (amount < 0) throw new Error('Invalid amount')
    if (this.props.balance < amount) throw new Error('Insufficient funds')

    this.props.balance -= amount
  }

  deposit (amount: number): void {
    if (amount < 0) throw new Error('Invalid amount')

    this.props.balance += amount
  }
}
