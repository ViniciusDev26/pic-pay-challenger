import { Entity } from '../../core/entities/Entity'
import { type UserType } from './user-types'

export interface UserProps {
  firstName: string
  lastName: string
  email: string
  password: string
  type: UserType
}

export abstract class User<T> extends Entity<UserProps & T> {
  get fullName (): string {
    return `${this.props.firstName} ${this.props.lastName}`
  }

  get type (): UserType {
    return this.props.type
  }
}
