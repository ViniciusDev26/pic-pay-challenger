import { inject, injectable } from 'tsyringe'

import { type UserRepository } from '@/domain/bank/contracts/repositories/UserRepository'
import { type CommonUser } from '@/domain/bank/entities/common-user'
import { type ShopkeeperUser } from '@/domain/bank/entities/shopkeeper-user'
import { UserType } from '@/domain/bank/entities/user-types'

import { UserMapper } from '../mappers/UserMapper'
import { PrismaConnection } from './connection'

@injectable()
export class PrismaUserRepository implements UserRepository {
  constructor (
    @inject(PrismaConnection)
    private readonly prisma: PrismaConnection
  ) {}

  async getUserById (userId: string): Promise<CommonUser | ShopkeeperUser | null> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) return null

    return UserMapper.restore({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      document: user.document,
      type: UserType[user.type]
    })
  }
}
