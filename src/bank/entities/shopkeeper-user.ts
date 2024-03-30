import { User, type UserProps } from './user'
import { UserType } from './user-types'
import { CNPJ } from './value-objects/cnpj'

interface ShopkeeperUserProps {
  cnpj: string
}

export class ShopkeeperUser extends User<ShopkeeperUserProps> {
  cnpjObject: CNPJ

  constructor (params: Omit<UserProps, 'type'> & ShopkeeperUserProps) {
    super({
      ...params,
      type: UserType.SHOPKEEPER
    })

    const cnpj = new CNPJ(params.cnpj)
    this.cnpjObject = cnpj
  }

  get cnpj (): CNPJ {
    return this.cnpjObject
  }
}
