export class CPF {
  private readonly cpf: string

  constructor (cpf: string) {
    if (!this.validate(cpf)) {
      throw new Error('Invalid CPF')
    }

    this.cpf = cpf
  }

  private validate (cpf: string): boolean {
    if (cpf.length !== 11) {
      return false
    }

    if (cpf === '00000000000') {
      return false
    }

    let sum = 0
    let rest

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }

    rest = (sum * 10) % 11

    if ((rest === 10) || (rest === 11)) {
      rest = 0
    }

    if (rest !== parseInt(cpf.substring(9, 10))) {
      return false
    }

    sum = 0

    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }

    rest = (sum * 10) % 11

    if ((rest === 10) || (rest === 11)) {
      rest = 0
    }

    if (rest !== parseInt(cpf.substring(10, 11))) {
      return false
    }

    return true
  }

  get value (): string {
    return this.cpf
  }

  get formattedValue (): string {
    return this.cpf.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    )
  }
}
