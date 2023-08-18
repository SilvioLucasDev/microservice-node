import { RequiredFieldError } from '@/presentation/errors'
import { type Validator } from '@/presentation/validation'

export class RequiredStringValidator implements Validator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (this.value === '' || this.value === null || this.value === undefined) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
