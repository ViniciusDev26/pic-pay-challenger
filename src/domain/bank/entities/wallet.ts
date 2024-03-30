import { Entity } from '@/core/entities/Entity'
import { type UniqueEntityId } from '@/core/entities/UniqueEntityId'

interface WalletProps {
  balance: number
  userId: UniqueEntityId
}

export class Wallet extends Entity<WalletProps> {
  get balance (): number {
    return this.props.balance
  }

  get userId (): UniqueEntityId {
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
