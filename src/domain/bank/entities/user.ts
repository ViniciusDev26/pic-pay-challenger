import { Entity } from '@/core/entities/Entity'

import { type UserType } from './user-types'
import { Email } from './value-objects/email'

export interface UserProps {
  firstName: string
  lastName: string
  email: string
  password: string
  type: UserType
}

export abstract class User<T> extends Entity<UserProps & T> {
  emailObject: Email

  constructor (props: UserProps & T) {
    super(props)
    const email = new Email(props.email)
    this.emailObject = email
  }

  get fullName (): string {
    return `${this.props.firstName} ${this.props.lastName}`
  }

  get type (): UserType {
    return this.props.type
  }

  get email (): Email {
    return this.emailObject
  }
}
