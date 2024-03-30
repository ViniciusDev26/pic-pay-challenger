import { type UniqueEntityId } from '@/core/entities/UniqueEntityId'

import { User, type UserProps } from './user'
import { UserType } from './user-types'
import { CNPJ } from './value-objects/cnpj'

interface ShopkeeperUserProps {
  cnpj: string
}

export class ShopkeeperUser extends User<ShopkeeperUserProps> {
  cnpjObject: CNPJ

  constructor (params: Omit<UserProps, 'type'> & ShopkeeperUserProps, id?: UniqueEntityId) {
    super({
      ...params,
      type: UserType.SHOPKEEPER
    }, id)

    const cnpj = new CNPJ(params.cnpj)
    this.cnpjObject = cnpj
  }

  get cnpj (): CNPJ {
    return this.cnpjObject
  }
}
