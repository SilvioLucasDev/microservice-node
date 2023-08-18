import { RequiredString } from '@/presentation/validation'
import { RequiredFieldError } from '@/presentation/errors'

describe('RequiredString', () => {
  it('should return RequiredFieldError if value is empty', () => {
    const sut = new RequiredString('', 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is null', () => {
    const sut = new RequiredString(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new RequiredString(undefined as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })
})
