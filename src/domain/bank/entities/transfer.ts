import { type Optional } from '@prisma/client/runtime/library'

import { Entity } from '../../../core/entities/Entity'

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
}
