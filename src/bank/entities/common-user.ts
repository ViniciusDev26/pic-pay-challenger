import { User } from './user'

interface CommonUserProps {
  cpf: string
}

export class CommonUser extends User<CommonUserProps> {}
