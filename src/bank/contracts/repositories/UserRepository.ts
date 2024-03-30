import { type CommonUser } from '../../entities/common-user'
import { type ShopkeeperUser } from '../../entities/shopkeeper-user'

export interface UserRepository {
  getUserById: (userId: string) => Promise<CommonUser | ShopkeeperUser | null>
}
