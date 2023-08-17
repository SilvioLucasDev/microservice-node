import { type UUIDGenerator } from '@/domain/contracts/adapters'

import { v4 } from 'uuid'

jest.mock('uuid')

class UUIDHandler implements UUIDGenerator {
  uuid (): UUIDGenerator.Output {
    return v4()
  }
}

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
})
