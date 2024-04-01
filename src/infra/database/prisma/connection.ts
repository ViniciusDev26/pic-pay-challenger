import { PrismaClient } from '@prisma/client'
import { singleton } from 'tsyringe'

@singleton()
export class PrismaConnection extends PrismaClient {}
