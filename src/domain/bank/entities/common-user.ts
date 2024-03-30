import { type UniqueEntityId } from '@/core/entities/UniqueEntityId'

import { User, type UserProps } from './user'
import { UserType } from './user-types'
import { CPF } from './value-objects/cpf'

interface CommonUserProps {
  cpf: string
}

export class CommonUser extends User<CommonUserProps> {
  cpfObject: CPF

  constructor (params: Omit<UserProps, 'type'> & CommonUserProps, id?: UniqueEntityId) {
    super({
      ...params,
      type: UserType.COMMON
    }, id)
    const cpf = new CPF(params.cpf)
    this.cpfObject = cpf
  }

  get cpf (): CPF {
    return this.cpfObject
  }
}
