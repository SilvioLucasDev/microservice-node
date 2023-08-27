import { Required, RequiredString } from '@/presentation/validation'
import { RequiredFieldError } from '@/presentation/errors'

describe('RequiredFields', () => {
  let field: string

  beforeAll(() => {
    field = 'any_field'
  })

  describe('Required', () => {
    it('should return RequiredFieldError if value is empty', () => {
      const sut = new Required('', field)

      const error = sut.validate()

      expect(error).toEqual(new RequiredFieldError(field))
    })

    it('should return RequiredFieldError if value is null', () => {
      const sut = new Required(null as any, field)

      const error = sut.validate()

      expect(error).toEqual(new RequiredFieldError(field))
    })

    it('should return RequiredFieldError if value is undefined', () => {
      const sut = new Required(undefined as any, field)

      const error = sut.validate()

      expect(error).toEqual(new RequiredFieldError(field))
    })
  })

  describe('RequiredString', () => {
    it('should return RequiredFieldError if value is not string', () => {
      const sut = new RequiredString(1234, field)

      const error = sut.validate()

      expect(error).toEqual(new RequiredFieldError(field))
    })
  })
})
