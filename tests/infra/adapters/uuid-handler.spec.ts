import { UUIDHandler } from '@/infra/adapters'

import { v4 } from 'uuid'

jest.mock('uuid')

describe('UUIDHandler', () => {
  let sut: UUIDHandler

  beforeAll(() =>
    jest.mocked(v4).mockReturnValue('any_uuid')
  )

  beforeEach(() => {
    sut = new UUIDHandler()
  })

  it('should call uuid.v4', () => {
    sut.uuid()

    expect(v4).toHaveBeenCalledTimes(1)
  })

  it('should return correct uuid', () => {
    const uuid = sut.uuid()

    expect(uuid).toBe('any_uuid')
  })
})
