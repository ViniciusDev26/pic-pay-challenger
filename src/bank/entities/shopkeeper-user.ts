import { Entity } from '../../core/entities/Entity'

interface ShopkeeperUserProps {
  firstName: string
  lastName: string
  email: string
  password: string
  cnpj: string
}

export class ShopkeeperUser extends Entity<ShopkeeperUserProps> {

}
