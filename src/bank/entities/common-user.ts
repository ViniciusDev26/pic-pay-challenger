import { Entity } from '../../core/entities/Entity'

interface CommonUserProps {
  firstName: string
  lastName: string
  email: string
  password: string
  cpf: string
}

export class CommonUser extends Entity<CommonUserProps> {

}
