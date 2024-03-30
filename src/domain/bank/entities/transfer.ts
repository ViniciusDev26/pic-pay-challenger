import { Entity } from '@/core/entities/Entity'
import { type Optional } from '@/core/types/optional'

interface TransferProps {
  payerId: string
  payeeId: string
  amount: number
  ocurredAt: Date
}

export class Transfer extends Entity<TransferProps> {
  constructor (props: Optional<TransferProps, 'ocurredAt'>) {
    super({
      ...props,
      ocurredAt: props.ocurredAt ?? new Date()
    })
  }

  get payerId (): string {
    return this.props.payerId
  }

  get payeeId (): string {
    return this.props.payeeId
  }

  get amount (): number {
    return this.props.amount
  }
}
