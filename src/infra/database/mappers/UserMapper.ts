import { UniqueEntityId } from '@/core/entities/UniqueEntityId'
import { CommonUser } from '@/domain/bank/entities/common-user'
import { ShopkeeperUser } from '@/domain/bank/entities/shopkeeper-user'
import { UserType } from '@/domain/bank/entities/user-types'

interface RestoreParams {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  document: string
  type: UserType
}

export abstract class UserMapper {
  // Factory method
  static restore (params: RestoreParams): CommonUser | ShopkeeperUser {
    if (params.type === UserType.COMMON) {
      return new CommonUser({
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        password: params.password,
        cpf: params.document
      }, new UniqueEntityId(params.id))
    }

    return new ShopkeeperUser({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      password: params.password,
      cnpj: params.document
    }, new UniqueEntityId(params.id))
  }
}
