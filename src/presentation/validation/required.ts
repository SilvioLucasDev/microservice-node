import { RequiredFieldError } from '@/presentation/errors'
import { type Validator } from '@/presentation/validation'

export class Required implements Validator {
  constructor (
    readonly value: any,
    readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (this.value === null || this.value === undefined || this.value === '') {
      return new RequiredFieldError(this.fieldName)
    }
  }
}

export class RequiredString extends Required {
  constructor (
    readonly value: any,
    readonly fieldName: string
  ) {
    super(value, fieldName)
  }

  validate (): Error | undefined {
    if (super.validate() !== undefined || typeof this.value !== 'string') {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
