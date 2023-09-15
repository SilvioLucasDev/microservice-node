import { Required, RequiredNumber, RequiredString, ValidationBuilder } from '@/presentation/validation'

describe('ValidationBuilder', () => {
  it('should return a Required', () => {
    const validators = ValidationBuilder
      .of({ value: null, fieldName: 'anyVariable' })
      .required()
      .build()

    expect(validators).toEqual([new Required(null, 'anyVariable')])
  })

  it('should return a RequiredString', () => {
    const validators = ValidationBuilder
      .of({ value: 123, fieldName: 'anyVariable' })
      .requiredString()
      .build()

    expect(validators).toEqual([new RequiredString(123, 'anyVariable')])
  })

  it('should return a RequiredNumber', () => {
    const validators = ValidationBuilder
      .of({ value: 'abc', fieldName: 'anyVariable' })
      .requiredNumber()
      .build()

    expect(validators).toEqual([new RequiredNumber('abc', 'anyVariable')])
  })
})
