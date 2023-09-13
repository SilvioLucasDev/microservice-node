import { UUIDAdapter } from '@/infra/adapters'

import { v4 } from 'uuid'

jest.mock('uuid')

describe('UUIDAdapter', () => {
  let sut: UUIDAdapter

  beforeAll(() =>
    jest.mocked(v4).mockReturnValue('any_uuid')
  )

  beforeEach(() => {
    sut = new UUIDAdapter()
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
