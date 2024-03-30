import { User, type UserProps } from './user'
import { UserType } from './user-types'

interface ShopkeeperUserProps {
  cnpj: string
}

export class ShopkeeperUser extends User<ShopkeeperUserProps> {
  constructor (params: Omit<UserProps, 'type'> & ShopkeeperUserProps) {
    super({
      ...params,
      type: UserType.SHOPKEEPER
    })
  }
}
