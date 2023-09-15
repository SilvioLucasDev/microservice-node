import { Required, RequiredNumber, RequiredString, type Validator } from '@/presentation/validation'

export class ValidationBuilder {
  private constructor (
    private readonly value: any,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ value, fieldName }: { value: any, fieldName: string }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new Required(this.value, this.fieldName))
    return this
  }

  requiredString (): ValidationBuilder {
    this.validators.push(new RequiredString(this.value, this.fieldName))
    return this
  }

  requiredNumber (): ValidationBuilder {
    this.validators.push(new RequiredNumber(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
