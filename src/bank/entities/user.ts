import { Entity } from '../../core/entities/Entity'

interface UserProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export abstract class User<T> extends Entity<UserProps & T> {

}
