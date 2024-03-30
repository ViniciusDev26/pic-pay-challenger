import { User } from './user'

interface ShopkeeperUserProps {
  cnpj: string
}

export class ShopkeeperUser extends User<ShopkeeperUserProps> {

}
