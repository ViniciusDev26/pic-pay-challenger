import { UniqueEntityId } from './UniqueEntityId'

export abstract class Entity<T> {
  private readonly _id: UniqueEntityId
  protected props: T

  constructor (props: T, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId()
    this.props = props
  }

  get id (): UniqueEntityId {
    return this._id
  }
}
