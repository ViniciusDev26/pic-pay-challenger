export class Email {
  private readonly email: string

  constructor (email: string) {
    if (!this.validate(email)) throw new Error('Invalid email')
    this.email = email
  }

  private validate (email: string): boolean {
    if (!email) return false

    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/
    return regexEmail.test(email)
  }

  get value (): string {
    return this.email
  }
}
