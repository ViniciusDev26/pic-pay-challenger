import { User, type UserProps } from './user'
import { UserType } from './user-types'

interface CommonUserProps {
  cpf: string
}

export class CommonUser extends User<CommonUserProps> {
  constructor (params: Omit<UserProps, 'type'> & CommonUserProps) {
    super({
      ...params,
      type: UserType.COMMON
    })
  }
}
