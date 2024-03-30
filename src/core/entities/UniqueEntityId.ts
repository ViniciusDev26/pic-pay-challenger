import { randomUUID } from 'crypto'

export class UniqueEntityId {
  private readonly _value: string

  constructor (id?: string) {
    this._value = id ?? randomUUID()
  }

  get value (): string {
    return this._value
  }
}
